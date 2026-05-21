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
    title: "Medico-legal assessments",
    description: "Coordination for qualified physiotherapy assessments and reports."
  }
] as const;

export const languages = ["en", "zh-Hant", "zh-Hans", "vi"] as const;

export type ServiceCategory = (typeof serviceCategories)[number]["id"];
export type PreferredLanguage = (typeof languages)[number];

const serviceCategoryIds = serviceCategories.map((service) => service.id) as [
  ServiceCategory,
  ...ServiceCategory[]
];

const bookingSchema = z
  .object({
    patientName: z.string().trim().min(2, "Full name is required"),
    patientPhone: z.string().trim().min(7, "Phone number is required"),
    patientEmail: z.string().trim().email("Valid email is required"),
    dob: z.string().trim().min(1, "Date of birth is required"),
    serviceCategory: z.enum(serviceCategoryIds),
    bookingDate: z.string().trim().min(1, "Preferred date/time is required"),
    preferredLanguage: z.enum(languages),
    isHomeVisit: z.coerce.boolean(),
    ukPostcode: z.string().trim().optional().nullable(),
    addressDetails: z.string().trim().optional().nullable(),
    acknowledgeCoordinatorOnly: z.boolean().refine((value) => value, "required"),
    consentContact: z.boolean().refine((value) => value, "required"),
    acknowledgeEmergencyAdvice: z.boolean().refine((value) => value, "required")
  })
  .superRefine((data, context) => {
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
      status: bookingStatuses[0],
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
