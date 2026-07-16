import { afterEach, describe, expect, it, vi } from "vitest";
import { Resend } from "resend";

import { sendBookingAcceptedNotification, sendBookingNotifications, sendEnquiryNotifications } from "@/lib/email";

// Mock the Resend library
vi.mock("resend", () => {
  const mockSend = vi.fn().mockResolvedValue({ id: "mock-id" });
  function MockResend() {
    return {
      emails: {
        send: mockSend
      }
    };
  }
  return {
    Resend: vi.fn().mockImplementation(MockResend)
  };
});

describe("email integration", () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = { ...originalEnv };
    vi.clearAllMocks();
  });

  const mockBooking = {
    patientName: "John Doe",
    patientEmail: "john@doe.com",
    patientPhone: "+447700900123",
    customerName: null,
    relationshipToPatient: null,
    countryCode: "+44",
    dob: "1980-01-01",
    serviceCategory: "neurological",
    medicalLegalReferralType: null,
    bookingDate: "2026-06-10T10:00",
    preferredLanguage: "en",
    isHomeVisit: true,
    ukPostcode: "SW1A 1AA",
    addressDetails: "10 Downing Street",
    acknowledgeCoordinatorOnly: true,
    consentContact: true,
    acknowledgeEmergencyAdvice: true,
    status: "new_request",
    consentedAt: "2026-06-01T10:00:00.000Z"
  } as any;

  it("skips sending if Resend config is missing", async () => {
    delete process.env.RESEND_API_KEY;

    const result = await sendBookingNotifications(mockBooking);
    expect(result.skipped).toBe(true);
    expect(result.reason).toBe("Resend is not configured");
  });

  it("sends booking emails to the customer and physio inbox when configured", async () => {
    process.env.RESEND_API_KEY = "re_123";
    delete process.env.RESEND_FROM_EMAIL;
    process.env.P2C_PHYSIO_INBOX = "medicoexpert@p2cgrowths.co.uk";

    const result = await sendBookingNotifications(mockBooking);

    expect(result.skipped).toBe(false);
    expect(Resend).toHaveBeenCalledWith("re_123");

    const resendInstance = vi.mocked(Resend).mock.results[0].value;
    expect(resendInstance.emails.send).toHaveBeenCalledTimes(2);
    expect(resendInstance.emails.send).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        from: "P2C Health <medicoexpert@p2cgrowths.co.uk>",
        to: "john@doe.com",
        subject: expect.stringContaining("physiotherapy request"),
        html: expect.stringContaining("John Doe"),
        text: expect.stringContaining("John Doe")
      })
    );
    expect(resendInstance.emails.send).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        from: "P2C Health <medicoexpert@p2cgrowths.co.uk>",
        to: "medicoexpert@p2cgrowths.co.uk",
        replyTo: "john@doe.com",
        subject: expect.stringContaining("New physiotherapy booking request"),
        text: expect.stringContaining("Service: neurological")
      })
    );
  });

  it("sends enquiry emails to the customer and general inbox when configured", async () => {
    process.env.RESEND_API_KEY = "re_123";
    delete process.env.RESEND_FROM_EMAIL;
    process.env.P2C_GENERAL_INBOX = "partnertocustomer@p2cgrowths.co.uk";

    const result = await sendEnquiryNotifications({
      name: "Jane Smith",
      email: "jane@example.com",
      company: "Smith Ltd",
      message: "I need help with a booking workflow."
    });

    expect(result.skipped).toBe(false);
    const resendInstance = vi.mocked(Resend).mock.results[0].value;
    expect(resendInstance.emails.send).toHaveBeenCalledTimes(2);
    expect(resendInstance.emails.send).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        from: "P2C Growth <partnertocustomer@p2cgrowths.co.uk>",
        to: "jane@example.com",
        subject: "P2C Growth received your enquiry",
        html: expect.stringContaining("Jane Smith")
      })
    );
    expect(resendInstance.emails.send).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        from: "P2C Growth <partnertocustomer@p2cgrowths.co.uk>",
        to: "partnertocustomer@p2cgrowths.co.uk",
        replyTo: "jane@example.com",
        subject: "New website enquiry - Jane Smith",
        text: expect.stringContaining("Smith Ltd")
      })
    );
  });

  it("sends accepted booking confirmation from the physio sender", async () => {
    process.env.RESEND_API_KEY = "re_123";
    delete process.env.RESEND_FROM_EMAIL;
    process.env.P2C_PHYSIO_INBOX = "medicoexpert@p2cgrowths.co.uk";

    const result = await sendBookingAcceptedNotification({
      id: "booking-1",
      patient_name: "John Doe",
      customer_name: null,
      relationship_to_patient: null,
      patient_phone: "+447700900123",
      patient_email: "john@doe.com",
      dob: "1980-01-01",
      service_category: "neurological",
      booking_date: "2026-06-10T10:00",
      preferred_language: "en",
      is_home_visit: false,
      uk_postcode: null,
      address_details: null,
      status: "appointment_confirmed",
      assigned_partner_name: "P2C Physio",
      internal_notes: null,
      missing_information: null,
      priority_level: "medium",
      provider_reason: null,
      acknowledge_coordinator_only: true,
      consent_contact: true,
      acknowledge_emergency_advice: true,
      consented_at: "2026-06-01T10:00:00.000Z",
      updated_at: "2026-06-01T10:00:00.000Z",
      created_at: "2026-06-01T10:00:00.000Z"
    });

    expect(result.skipped).toBe(false);
    const resendInstance = vi.mocked(Resend).mock.results[0].value;
    expect(resendInstance.emails.send).toHaveBeenCalledWith(
      expect.objectContaining({
        from: "P2C Health <medicoexpert@p2cgrowths.co.uk>",
        to: "john@doe.com",
        subject: "Your physiotherapy booking has been accepted",
        text: expect.stringContaining("Your physiotherapy booking request has been accepted")
      })
    );
  });
});
