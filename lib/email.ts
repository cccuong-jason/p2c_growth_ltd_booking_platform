import { Resend } from "resend";

import type { BookingPayload } from "@/lib/booking";
import { getEnv, hasResendConfig } from "@/lib/env";

export async function sendBookingConfirmation(booking: BookingPayload) {
  if (!hasResendConfig()) {
    return { skipped: true, reason: "Resend is not configured" };
  }

  const resend = new Resend(getEnv("RESEND_API_KEY"));

  await resend.emails.send({
    from: getEnv("RESEND_FROM_EMAIL")!,
    to: booking.patientEmail,
    subject: "P2C Growth received your physiotherapy request",
    text: [
      `Hello ${booking.patientName},`,
      "",
      "Thank you for contacting P2C Growth. We have received your physiotherapy coordination request.",
      "Our team will review your details and contact you by phone, email, or WhatsApp to confirm the next steps.",
      "",
      "P2C Growth is a booking and coordination platform, not a medical clinic. If this is an emergency, call 999 or NHS urgent care.",
      "",
      "P2C Growth LTD"
    ].join("\n")
  });

  return { skipped: false };
}
