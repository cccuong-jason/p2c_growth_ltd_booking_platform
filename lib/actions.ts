"use server";

import { revalidatePath } from "next/cache";

import { normalizeStatus } from "@/lib/admin";
import { getBookingById, updateBookingOperationalData } from "@/lib/admin-server";
import {
  validateAutomationRequestInput,
  validateBookingInput,
  validateEnquiryInput,
  validateWebsiteRequestInput,
  type AutomationRequestInput,
  type BookingInput,
  type EnquiryInput,
  type WebsiteRequestInput
} from "@/lib/booking";
import { sendBookingAcceptedNotification, sendBookingNotifications, sendEnquiryNotifications } from "@/lib/email";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export type ActionState = {
  ok: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

function checkboxValue(formData: FormData, name: string): boolean {
  return formData.get(name) === "on" || formData.get(name) === "true";
}

function appendSection(lines: string[], label: string, value: string | string[] | null | undefined) {
  if (Array.isArray(value)) {
    if (value.length > 0) {
      lines.push(`${label}: ${value.join(", ")}`);
    }
    return;
  }

  if (value) {
    lines.push(`${label}: ${value}`);
  }
}

function buildWebsiteRequestMessage(input: {
  phone: string;
  email: string;
  websiteType: string;
}) {
  const lines = ["Service: website-development"];
  appendSection(lines, "Phone", input.phone);
  appendSection(lines, "Email", input.email);
  appendSection(lines, "Type", input.websiteType);
  return lines.join("\n");
}

function buildAutomationRequestMessage(input: {
  phone: string;
  email: string;
  systemType: string;
  contactChannels: string[];
  automatedEmails: string[];
  dashboardNeed: string;
  bookingVolume: string;
  currentTools: string[];
  notes: string | null;
}) {
  const lines = ["Service: booking-automation"];
  appendSection(lines, "Phone", input.phone);
  appendSection(lines, "Email", input.email);
  appendSection(lines, "System type", input.systemType);
  appendSection(lines, "Contact channels", input.contactChannels);
  appendSection(lines, "Automated emails", input.automatedEmails);
  appendSection(lines, "Dashboard", input.dashboardNeed);
  appendSection(lines, "Monthly volume", input.bookingVolume);
  appendSection(lines, "Current tools", input.currentTools);
  appendSection(lines, "Notes", input.notes);
  return lines.join("\n");
}

async function persistEnquiry(payload: EnquiryInput): Promise<ActionState> {
  const validation = validateEnquiryInput(payload);

  if (!validation.success) {
    return { ok: false, message: "Please review the enquiry details.", errors: validation.errors };
  }

  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return {
      ok: true,
      message: "Enquiry validated locally. Add Supabase credentials to persist contact requests."
    };
  }

  const { error } = await supabase.from("enquiries").insert(validation.data);

  if (error) {
    return { ok: false, message: `Unable to save enquiry: ${error.message}` };
  }

  await sendEnquiryNotifications(validation.data);

  return { ok: true, message: "Thanks. P2C Growth will follow up with you shortly." };
}

export async function submitBooking(_: ActionState, formData: FormData): Promise<ActionState> {
  const input: BookingInput = {
    patientName: String(formData.get("patientName") || ""),
    customerName: String(formData.get("customerName") || "") || null,
    relationshipToPatient: String(formData.get("relationshipToPatient") || "") || null,
    countryCode: String(formData.get("countryCode") || ""),
    patientPhone: String(formData.get("patientPhone") || ""),
    patientEmail: String(formData.get("patientEmail") || ""),
    dob: String(formData.get("dob") || ""),
    serviceCategory: String(formData.get("serviceCategory") || "") as BookingInput["serviceCategory"],
    medicalLegalReferralType: String(formData.get("medicalLegalReferralType") || "") as BookingInput["medicalLegalReferralType"],
    bookingDate: String(formData.get("bookingDate") || ""),
    preferredLanguage: String(formData.get("preferredLanguage") || "en") as BookingInput["preferredLanguage"],
    isHomeVisit: formData.get("visitType") === "home",
    ukPostcode: String(formData.get("ukPostcode") || ""),
    addressDetails: String(formData.get("addressDetails") || ""),
    acknowledgeCoordinatorOnly: checkboxValue(formData, "acknowledgeCoordinatorOnly"),
    consentContact: checkboxValue(formData, "consentContact"),
    acknowledgeEmergencyAdvice: checkboxValue(formData, "acknowledgeEmergencyAdvice")
  };

  const validation = validateBookingInput(input);

  if (!validation.success) {
    return {
      ok: false,
      message: "Please review the highlighted booking details.",
      errors: validation.errors
    };
  }

  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return {
      ok: true,
      message:
        "Booking validated locally. Add Supabase and Resend credentials to persist requests and send confirmations."
    };
  }

  const { error } = await supabase.from("bookings").insert({
    patient_name: validation.data.patientName,
    customer_name: validation.data.customerName,
    relationship_to_patient: validation.data.relationshipToPatient,
    patient_phone: `${validation.data.countryCode}${validation.data.patientPhone}`,
    patient_email: validation.data.patientEmail,
    dob: validation.data.dob,
    service_category: validation.data.serviceCategory,
    booking_date: validation.data.bookingDate,
    preferred_language: validation.data.preferredLanguage,
    is_home_visit: validation.data.isHomeVisit,
    uk_postcode: validation.data.ukPostcode,
    address_details: validation.data.addressDetails,
    status: validation.data.status,
    acknowledge_coordinator_only: validation.data.acknowledgeCoordinatorOnly,
    consent_contact: validation.data.consentContact,
    acknowledge_emergency_advice: validation.data.acknowledgeEmergencyAdvice,
    consented_at: validation.data.consentedAt
  });

  if (error) {
    return { ok: false, message: `Unable to save booking: ${error.message}` };
  }

  await sendBookingNotifications(validation.data);

  return { ok: true, message: "Booking request received. P2C Growth will contact you shortly." };
}

export async function submitEnquiry(_: ActionState, formData: FormData): Promise<ActionState> {
  return persistEnquiry({
    name: String(formData.get("name") || ""),
    email: String(formData.get("email") || ""),
    company: String(formData.get("company") || ""),
    message: String(formData.get("message") || "")
  });
}

export async function submitWebsiteRequest(_: ActionState, formData: FormData): Promise<ActionState> {
  const input: WebsiteRequestInput = {
    name: String(formData.get("name") || ""),
    phone: String(formData.get("phone") || ""),
    email: String(formData.get("email") || ""),
    businessName: String(formData.get("businessName") || ""),
    websiteType: String(formData.get("websiteType") || "") as WebsiteRequestInput["websiteType"]
  };

  const validation = validateWebsiteRequestInput(input);

  if (!validation.success) {
    return {
      ok: false,
      message: "Please review the website request details.",
      errors: validation.errors
    };
  }

  return persistEnquiry({
    name: validation.data.name,
    email: validation.data.email,
    company: validation.data.businessName,
    message: buildWebsiteRequestMessage(validation.data)
  });
}

export async function submitAutomationRequest(_: ActionState, formData: FormData): Promise<ActionState> {
  const input: AutomationRequestInput = {
    name: String(formData.get("name") || ""),
    phone: String(formData.get("phone") || ""),
    email: String(formData.get("email") || ""),
    systemType: String(formData.get("systemType") || "") as AutomationRequestInput["systemType"],
    contactChannels: formData.getAll("contactChannels").map(String) as AutomationRequestInput["contactChannels"],
    automatedEmails: formData.getAll("automatedEmails").map(String) as AutomationRequestInput["automatedEmails"],
    dashboardNeed: String(formData.get("dashboardNeed") || "") as AutomationRequestInput["dashboardNeed"],
    bookingVolume: String(formData.get("bookingVolume") || "") as AutomationRequestInput["bookingVolume"],
    currentTools: formData.getAll("currentTools").map(String) as AutomationRequestInput["currentTools"],
    notes: String(formData.get("notes") || "")
  };

  const validation = validateAutomationRequestInput(input);

  if (!validation.success) {
    return {
      ok: false,
      message: "Please review the system request details.",
      errors: validation.errors
    };
  }

  return persistEnquiry({
    name: validation.data.name,
    email: validation.data.email,
    company: null,
    message: buildAutomationRequestMessage(validation.data)
  });
}


export async function acceptBookingAction(formData: FormData): Promise<ActionState> {
  const bookingId = String(formData.get("bookingId") || "");

  if (!bookingId) {
    return { ok: false, message: "Missing booking id." };
  }

  const bookingResult = await getBookingById(bookingId);
  if (!bookingResult.success || !bookingResult.data) {
    return { ok: false, message: bookingResult.error ?? "Unable to load booking." };
  }

  const updateResult = await updateBookingOperationalData(bookingId, {
    status: "appointment_confirmed"
  });

  if (!updateResult.success) {
    return { ok: false, message: updateResult.error ?? "Unable to accept booking." };
  }

  const emailResult = await sendBookingAcceptedNotification({
    ...bookingResult.data,
    status: "appointment_confirmed",
    updated_at: new Date().toISOString()
  });

  revalidatePath("/admin");
  revalidatePath("/admin/physio");

  if (emailResult.skipped) {
    return {
      ok: true,
      message: `Booking accepted. Confirmation email was not sent: ${emailResult.reason}.`
    };
  }

  if (emailResult.errors?.length) {
    return {
      ok: true,
      message: "Booking accepted. Confirmation email is queued for retry."
    };
  }

  return { ok: true, message: "Booking accepted and customer confirmation sent." };
}

export async function updateBookingStatusAction(formData: FormData): Promise<void> {
  const bookingId = String(formData.get("bookingId") || "");
  const status = normalizeStatus(String(formData.get("status") || ""));

  await updateBookingOperationalData(bookingId, { status });
  revalidatePath("/admin");
}

export async function updateBookingDetailsAction(formData: FormData): Promise<void> {
  const bookingId = String(formData.get("bookingId") || "");
  const status = normalizeStatus(String(formData.get("status") || ""));
  const assigned_partner_name = String(formData.get("assigned_partner_name") || "") || null;
  const internal_notes = String(formData.get("internal_notes") || "") || null;
  const missing_information = String(formData.get("missing_information") || "") || null;
  const priority_level = String(formData.get("priority_level") || "medium");
  const provider_reason = String(formData.get("provider_reason") || "") || null;
  const booking_date = String(formData.get("booking_date") || "");

  if (!bookingId) return;

  await updateBookingOperationalData(bookingId, {
    status,
    assigned_partner_name,
    internal_notes,
    missing_information,
    priority_level,
    provider_reason,
    booking_date
  });

  revalidatePath("/admin");
}
