import { z } from "zod";

import { bookingStatuses, type BookingStatus } from "@/lib/admin";

export const serviceCategories = [
  {
    id: "elderly",
    title: "Elderly mobility",
    description: "Strength, balance, falls prevention, and confidence at home."
  },
  {
    id: "neurological",
    title: "Neurological / stroke",
    description: "Post-stroke and neurological rehabilitation coordination."
  },
  {
    id: "post_surgery",
    title: "Post-surgery recovery",
    description: "Rehabilitation support after orthopaedic or general procedures."
  },
  {
    id: "sports_gym",
    title: "Sports and gym injuries",
    description: "Assessment requests for strains, overload, and return-to-training plans."
  },
  {
    id: "occupational",
    title: "Office and occupational pain",
    description: "Back, neck, posture, desk-related, and repetitive strain concerns."
  },
  {
    id: "medico_legal",
    title: "Medical legal referrals",
    description: "Referral coordination for injury, insurance, and legal evidence support."
  }
] as const;

export const medicalLegalReferralTypes = [
  {
    id: "personal_injury_claim",
    label: "Personal injury claim (e.g., car accident, workplace injury)"
  },
  {
    id: "insurance_claim",
    label: "Insurance claim"
  },
  {
    id: "legal_proceedings",
    label: "Legal proceedings (supporting evidence)"
  }
] as const;

export const languages = ["en", "zh-Hant", "zh-Hans", "vi"] as const;

export type ServiceCategory = (typeof serviceCategories)[number]["id"];
export type PreferredLanguage = (typeof languages)[number];
export type MedicalLegalReferralType = (typeof medicalLegalReferralTypes)[number]["id"];

const serviceCategoryIds = serviceCategories.map((service) => service.id) as [
  ServiceCategory,
  ...ServiceCategory[]
];

const medicalLegalReferralTypeIds = medicalLegalReferralTypes.map((type) => type.id) as [
  MedicalLegalReferralType,
  ...MedicalLegalReferralType[]
];

const bookingSchema = z
  .object({
    patientName: z.string().trim().min(2, "Full name is required"),
    customerName: z.string().trim().optional().nullable(),
    relationshipToPatient: z.string().trim().optional().nullable(),
    countryCode: z.string().trim().min(1, "Country code is required"),
    patientPhone: z.string().trim().regex(/^\d{7,15}$/, "Enter a valid phone number (7-15 digits)"),
    patientEmail: z.string().trim().email("Enter a valid email address"),
    dob: z
      .string()
      .trim()
      .min(1, "Date of birth is required")
      .refine((val) => {
        const birthDate = new Date(val);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        return age >= 0 && age <= 150;
      }, "Please enter a valid date of birth (max 150 years)"),
    serviceCategory: z.enum(serviceCategoryIds),
    medicalLegalReferralType: z.preprocess(
      (value) => (typeof value === "string" && value.trim() === "" ? null : value),
      z.enum(medicalLegalReferralTypeIds).nullable().optional()
    ),
    bookingDate: z.string().trim().min(1, "Preferred date/time is required"),
    preferredLanguage: z.enum(languages),
    isHomeVisit: z.coerce.boolean(),
    ukPostcode: z.string().trim().optional().nullable(),
    addressDetails: z.string().trim().optional().nullable(),
    acknowledgeCoordinatorOnly: z.boolean().refine((value) => value, "required"),
    consentContact: z.boolean().refine((value) => value, "required"),
    acknowledgeEmergencyAdvice: z.boolean().refine((value) => value, "required"),
    // Admin fields (optional during public submission)
    missingInformation: z.string().trim().optional().nullable(),
    priorityLevel: z.string().trim().optional().default("medium"),
    providerReason: z.string().trim().optional().nullable()
  })
  .superRefine((data, context) => {
    if (data.serviceCategory === "medico_legal" && !data.medicalLegalReferralType) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "required",
        path: ["medicalLegalReferralType"]
      });
    }

    if (!data.isHomeVisit) {
      return;
    }

    if (!data.ukPostcode) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "required",
        path: ["ukPostcode"]
      });
    }

    if (!data.addressDetails) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "required",
        path: ["addressDetails"]
      });
    }
  });

export type BookingInput = z.input<typeof bookingSchema>;
export type BookingPayload = z.output<typeof bookingSchema> & {
  status: BookingStatus;
  consentedAt: string;
};

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: Record<string, string[]> };

export function validateBookingInput(input: BookingInput): ValidationResult<BookingPayload> {
  const result = bookingSchema.safeParse(input);

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  return {
    success: true,
    data: {
      ...result.data,
      ukPostcode: result.data.ukPostcode || null,
      addressDetails: result.data.addressDetails || null,
      status: "new_request",
      consentedAt: new Date().toISOString()
    }
  };
}

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: z.string().trim().email("Valid email is required"),
  company: z.string().trim().optional().nullable(),
  message: z.string().trim().min(10, "Message is required")
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type EnquiryPayload = z.output<typeof enquirySchema>;

export function validateEnquiryInput(input: EnquiryInput): ValidationResult<EnquiryPayload> {
  const result = enquirySchema.safeParse(input);

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  return {
    success: true,
    data: {
      ...result.data,
      company: result.data.company || null
    }
  };
}
