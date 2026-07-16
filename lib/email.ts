import type { BookingPayload, EnquiryPayload } from "@/lib/booking";
import { getGeneralInboxEmail, getGeneralSenderEmail, getPhysioInboxEmail, getPhysioSenderEmail } from "@/lib/env";
import { type BookingRow } from "@/lib/supabase/schema";
import {
  sendRecoverableEmails,
  type EmailDeliveryResult,
  type RecoverableEmailMessage
} from "@/lib/email-deliveries";

const CONTACT_PHONE = "07541428585";
const CONTACT_WHATSAPP = "07541428585";

type BookingEmailDetails = BookingPayload & {
  id?: string;
  assignedPartnerName?: string | null;
  providerReason?: string | null;
};


function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatDateTime(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/London"
  });
}

function formatBoolean(value: boolean): string {
  return value ? "Yes" : "No";
}

function line(label: string, value: string | null | undefined): string[] {
  return value ? [`${label}: ${value}`] : [];
}

function htmlShell(title: string, intro: string, rows: Array<[string, string | null | undefined]>, footer: string): string {
  const renderedRows = rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#475569;font-weight:700;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a;">${escapeHtml(value ?? "")}</td>
        </tr>`
    )
    .join("");

  return `<!doctype html>
<html>
  <body style="margin:0;background:#f8fafc;font-family:Arial,sans-serif;color:#0f172a;">
    <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
      <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:28px;">
        <p style="margin:0 0 8px;color:#2563eb;font-size:12px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;">P2C Growth</p>
        <h1 style="margin:0 0 16px;font-size:24px;line-height:1.25;color:#0f172a;">${escapeHtml(title)}</h1>
        <p style="margin:0 0 20px;color:#334155;line-height:1.6;">${escapeHtml(intro)}</p>
        <table style="width:100%;border-collapse:collapse;border-top:1px solid #e2e8f0;">${renderedRows}</table>
        <p style="margin:24px 0 0;color:#475569;line-height:1.6;">${escapeHtml(footer)}</p>
      </div>
    </div>
  </body>
</html>`;
}

function buildBookingCustomerEmail(from: string, booking: BookingEmailDetails): RecoverableEmailMessage {
  const visitType = booking.isHomeVisit ? "Home visit" : "Clinic visit";
  const rows: Array<[string, string | null | undefined]> = [
    ["Patient", booking.patientName],
    ["Service", booking.serviceCategory],
    ["Preferred time", formatDateTime(booking.bookingDate)],
    ["Visit type", visitType],
    ["Postcode", booking.ukPostcode],
    ["Phone", booking.patientPhone],
    ["Email", booking.patientEmail]
  ];
  const text = [
    `Hello ${booking.patientName},`,
    "",
    "Thank you for contacting P2C Growth. We have received your physiotherapy coordination request.",
    "Our team will review your details and contact you by phone, email, or WhatsApp to confirm the next steps.",
    "",
    `Service: ${booking.serviceCategory}`,
    `Preferred time: ${formatDateTime(booking.bookingDate)}`,
    `Visit type: ${visitType}`,
    ...line("Postcode", booking.ukPostcode),
    "",
    `Phone: ${CONTACT_PHONE}`,
    `WhatsApp: ${CONTACT_WHATSAPP}`,
    "",
    "P2C Growth is a booking and coordination platform, not a medical clinic. If this is an emergency, call 999 or NHS urgent care.",
    "",
    "P2C Growth LTD"
  ].join("\n");

  return {
    from,
    to: booking.patientEmail,
    subject: "P2C Growth received your physiotherapy request",
    notificationType: "booking_customer_confirmation",
    sourceType: "booking",
    sourceId: booking.id ?? null,
    text,
    html: htmlShell(
      "We received your physiotherapy request",
      "Our team will review your details and contact you by phone, email, or WhatsApp to confirm the next steps.",
      rows,
      "P2C Growth is a booking and coordination platform, not a medical clinic. If this is an emergency, call 999 or NHS urgent care."
    )
  };
}

function buildBookingInternalEmail(from: string, booking: BookingEmailDetails): RecoverableEmailMessage {
  const visitType = booking.isHomeVisit ? "Home visit" : "Clinic visit";
  const customer = booking.customerName
    ? `${booking.customerName}${booking.relationshipToPatient ? ` (${booking.relationshipToPatient})` : ""}`
    : "Self-booking";
  const rows: Array<[string, string | null | undefined]> = [
    ["Patient", booking.patientName],
    ["Customer", customer],
    ["Phone", booking.patientPhone],
    ["Email", booking.patientEmail],
    ["Preferred language", booking.preferredLanguage],
    ["Service", booking.serviceCategory],
    ["Medico-legal referral", booking.medicalLegalReferralType],
    ["Preferred time", formatDateTime(booking.bookingDate)],
    ["Visit type", visitType],
    ["Postcode", booking.ukPostcode],
    ["Address", booking.addressDetails],
    ["Coordinator acknowledgement", formatBoolean(booking.acknowledgeCoordinatorOnly)],
    ["Contact consent", formatBoolean(booking.consentContact)],
    ["Emergency acknowledgement", formatBoolean(booking.acknowledgeEmergencyAdvice)],
    ["Consented at", booking.consentedAt]
  ];
  const text = [
    `New physiotherapy booking request - ${booking.patientName}`,
    "",
    `Patient: ${booking.patientName}`,
    `Customer: ${customer}`,
    `Phone: ${booking.patientPhone}`,
    `Email: ${booking.patientEmail}`,
    `Preferred language: ${booking.preferredLanguage}`,
    `Service: ${booking.serviceCategory}`,
    ...line("Medico-legal referral", booking.medicalLegalReferralType),
    `Preferred time: ${formatDateTime(booking.bookingDate)}`,
    `Visit type: ${visitType}`,
    ...line("Postcode", booking.ukPostcode),
    ...line("Address", booking.addressDetails),
    "",
    `Coordinator acknowledgement: ${formatBoolean(booking.acknowledgeCoordinatorOnly)}`,
    `Contact consent: ${formatBoolean(booking.consentContact)}`,
    `Emergency acknowledgement: ${formatBoolean(booking.acknowledgeEmergencyAdvice)}`,
    `Consented at: ${booking.consentedAt}`,
    "",
    "Follow up in the admin dashboard and contact the customer by their preferred available channel."
  ].join("\n");

  return {
    from,
    to: getPhysioInboxEmail(),
    replyTo: booking.patientEmail,
    subject: `New physiotherapy booking request - ${booking.patientName}`,
    notificationType: "booking_internal_notification",
    sourceType: "booking",
    sourceId: booking.id ?? null,
    text,
    html: htmlShell(
      `New physiotherapy booking request - ${booking.patientName}`,
      "Follow up in the admin dashboard and contact the customer by their preferred available channel.",
      rows,
      "This message was generated after a successful booking submission."
    )
  };
}

function buildBookingAcceptedCustomerEmail(from: string, booking: BookingEmailDetails): RecoverableEmailMessage {
  const visitType = booking.isHomeVisit ? "Home visit" : "Clinic visit";
  const rows: Array<[string, string | null | undefined]> = [
    ["Patient", booking.patientName],
    ["Confirmed time", formatDateTime(booking.bookingDate)],
    ["Visit type", visitType],
    ["Provider", booking.assignedPartnerName],
    ["Postcode", booking.ukPostcode],
    ["Service", booking.serviceCategory]
  ];
  const text = [
    `Hello ${booking.patientName},`,
    "",
    "Your physiotherapy booking request has been accepted.",
    "Our team will contact you if any final coordination detail is needed before the appointment.",
    "",
    `Confirmed time: ${formatDateTime(booking.bookingDate)}`,
    `Visit type: ${visitType}`,
    ...line("Provider", booking.assignedPartnerName),
    ...line("Postcode", booking.ukPostcode),
    `Service: ${booking.serviceCategory}`,
    "",
    `Phone: ${CONTACT_PHONE}`,
    `WhatsApp: ${CONTACT_WHATSAPP}`,
    "",
    "P2C Growth LTD"
  ].join("\n");

  return {
    from,
    to: booking.patientEmail,
    subject: "Your physiotherapy booking has been accepted",
    notificationType: "booking_customer_accepted",
    sourceType: "booking",
    sourceId: booking.id ?? null,
    text,
    html: htmlShell(
      "Your physiotherapy booking has been accepted",
      "Your request is now confirmed by our coordination team. We will contact you if any final detail is needed before the appointment.",
      rows,
      `For questions, contact us by phone or WhatsApp on ${CONTACT_PHONE}.`
    )
  };
}

function bookingRowToEmailDetails(booking: BookingRow): BookingEmailDetails {
  return {
    id: booking.id,
    patientName: booking.patient_name,
    customerName: booking.customer_name,
    relationshipToPatient: booking.relationship_to_patient,
    countryCode: "",
    patientPhone: booking.patient_phone,
    patientEmail: booking.patient_email,
    dob: booking.dob,
    serviceCategory: booking.service_category,
    medicalLegalReferralType: null,
    bookingDate: booking.booking_date,
    preferredLanguage: booking.preferred_language,
    isHomeVisit: booking.is_home_visit,
    ukPostcode: booking.uk_postcode,
    addressDetails: booking.address_details,
    acknowledgeCoordinatorOnly: booking.acknowledge_coordinator_only,
    consentContact: booking.consent_contact,
    acknowledgeEmergencyAdvice: booking.acknowledge_emergency_advice,
    status: booking.status,
    consentedAt: booking.consented_at,
    missingInformation: booking.missing_information,
    priorityLevel: booking.priority_level,
    assignedPartnerName: booking.assigned_partner_name,
    providerReason: booking.provider_reason
  };
}

function buildEnquiryCustomerEmail(from: string, enquiry: EnquiryPayload): RecoverableEmailMessage {
  const rows: Array<[string, string | null | undefined]> = [
    ["Name", enquiry.name],
    ["Company", enquiry.company],
    ["Email", enquiry.email],
    ["Message", enquiry.message]
  ];
  const text = [
    `Hello ${enquiry.name},`,
    "",
    "Thank you for contacting P2C Growth. We have received your enquiry.",
    "Our team will review your message and get back to you shortly.",
    "",
    ...line("Company", enquiry.company),
    `Message: ${enquiry.message}`,
    "",
    `Phone: ${CONTACT_PHONE}`,
    `WhatsApp: ${CONTACT_WHATSAPP}`,
    "",
    "P2C Growth LTD"
  ].join("\n");

  return {
    from,
    to: enquiry.email,
    subject: "P2C Growth received your enquiry",
    notificationType: "enquiry_customer_confirmation",
    sourceType: "enquiry",
    text,
    html: htmlShell(
      "We received your enquiry",
      "Our team will review your message and get back to you shortly.",
      rows,
      `You can also contact us by phone or WhatsApp on ${CONTACT_PHONE}.`
    )
  };
}

function buildEnquiryInternalEmail(from: string, enquiry: EnquiryPayload): RecoverableEmailMessage {
  const rows: Array<[string, string | null | undefined]> = [
    ["Name", enquiry.name],
    ["Company", enquiry.company],
    ["Email", enquiry.email],
    ["Message", enquiry.message]
  ];
  const text = [
    `New website enquiry - ${enquiry.name}`,
    "",
    `Name: ${enquiry.name}`,
    ...line("Company", enquiry.company),
    `Email: ${enquiry.email}`,
    `Message: ${enquiry.message}`,
    "",
    "Reply directly to the customer or follow up from the admin dashboard."
  ].join("\n");

  return {
    from,
    to: getGeneralInboxEmail(),
    replyTo: enquiry.email,
    subject: `New website enquiry - ${enquiry.name}`,
    notificationType: "enquiry_internal_notification",
    sourceType: "enquiry",
    text,
    html: htmlShell(
      `New website enquiry - ${enquiry.name}`,
      "Reply directly to the customer or follow up from the admin dashboard.",
      rows,
      "This message was generated after a successful enquiry submission."
    )
  };
}

export async function sendBookingNotifications(booking: BookingPayload): Promise<EmailDeliveryResult> {
  const from = getPhysioSenderEmail();
  return sendRecoverableEmails([
    buildBookingCustomerEmail(from, booking),
    buildBookingInternalEmail(from, booking)
  ]);
}

export async function sendBookingAcceptedNotification(booking: BookingRow): Promise<EmailDeliveryResult> {
  return sendRecoverableEmails([
    buildBookingAcceptedCustomerEmail(getPhysioSenderEmail(), bookingRowToEmailDetails(booking))
  ]);
}

export async function sendEnquiryNotifications(enquiry: EnquiryPayload): Promise<EmailDeliveryResult> {
  const from = getGeneralSenderEmail();
  return sendRecoverableEmails([
    buildEnquiryCustomerEmail(from, enquiry),
    buildEnquiryInternalEmail(from, enquiry)
  ]);
}

export async function sendBookingConfirmation(booking: BookingPayload): Promise<EmailDeliveryResult> {
  return sendBookingNotifications(booking);
}
