import { describe, expect, it, vi, beforeEach } from "vitest";
import { revalidatePath } from "next/cache";

import {
  submitAutomationRequest,
  submitBooking,
  submitEnquiry,
  submitWebsiteRequest
} from "@/lib/actions";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { sendBookingConfirmation } from "@/lib/email";

// Mock dependencies
vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  createSupabaseAdminClient: vi.fn(),
}));

vi.mock("@/lib/email", () => ({
  sendBookingConfirmation: vi.fn().mockResolvedValue({ skipped: false }),
}));

describe("public server actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("submitBooking", () => {
    const validFormData = new FormData();
    validFormData.append("patientName", "Mai Nguyen");
    validFormData.append("countryCode", "+44");
    validFormData.append("patientPhone", "7000000000");
    validFormData.append("patientEmail", "mai@example.com");
    validFormData.append("dob", "1990-01-01");
    validFormData.append("serviceCategory", "neurological");
    validFormData.append("bookingDate", "2026-06-10");
    validFormData.append("preferredLanguage", "vi");
    validFormData.append("visitType", "clinic");
    validFormData.append("acknowledgeCoordinatorOnly", "true");
    validFormData.append("consentContact", "true");
    validFormData.append("acknowledgeEmergencyAdvice", "true");

    it("returns error on validation failure", async () => {
      const invalidData = new FormData();
      const result = await submitBooking({ ok: false, message: "" }, invalidData);
      expect(result.ok).toBe(false);
      expect(result.message).toContain("review the highlighted booking details");
    });

    it("handles local validation success when Supabase is missing", async () => {
      vi.mocked(createSupabaseAdminClient).mockReturnValue(null as any);
      const result = await submitBooking({ ok: false, message: "" }, validFormData);
      expect(result.ok).toBe(true);
      expect(result.message).toContain("validated locally");
    });

    it("inserts record and sends confirmation when Supabase is available", async () => {
      const mockInsert = vi.fn().mockResolvedValue({ error: null });
      const mockSupabase = { from: vi.fn().mockReturnValue({ insert: mockInsert }) };
      vi.mocked(createSupabaseAdminClient).mockReturnValue(mockSupabase as any);

      const result = await submitBooking({ ok: false, message: "" }, validFormData);
      
      expect(result.ok).toBe(true);
      expect(mockSupabase.from).toHaveBeenCalledWith("bookings");
      expect(mockInsert).toHaveBeenCalled();
      expect(sendBookingConfirmation).toHaveBeenCalled();
    });
  });

  describe("submitEnquiry", () => {
    const validEnquiryData = new FormData();
    validEnquiryData.append("name", "John Corp");
    validEnquiryData.append("email", "john@corp.com");
    validEnquiryData.append("message", "We need a custom booking system.");

    it("returns error on validation failure", async () => {
      const invalidData = new FormData();
      const result = await submitEnquiry({ ok: false, message: "" }, invalidData);
      expect(result.ok).toBe(false);
      expect(result.message).toContain("review the enquiry details");
    });

    it("inserts record when Supabase is available", async () => {
      const mockInsert = vi.fn().mockResolvedValue({ error: null });
      const mockSupabase = { from: vi.fn().mockReturnValue({ insert: mockInsert }) };
      vi.mocked(createSupabaseAdminClient).mockReturnValue(mockSupabase as any);

      const result = await submitEnquiry({ ok: false, message: "" }, validEnquiryData);
      
      expect(result.ok).toBe(true);
      expect(mockInsert).toHaveBeenCalledWith(expect.objectContaining({ name: "John Corp" }));
    });
  });

  describe("submitWebsiteRequest", () => {
    const validWebsiteData = new FormData();
    validWebsiteData.append("name", "John Corp");
    validWebsiteData.append("phone", "07700900123");
    validWebsiteData.append("email", "john@corp.com");
    validWebsiteData.append("businessName", "John Corp Ltd");
    validWebsiteData.append("websiteType", "new_business_website");

    it("returns error on validation failure", async () => {
      const invalidData = new FormData();
      const result = await submitWebsiteRequest({ ok: false, message: "" }, invalidData);
      expect(result.ok).toBe(false);
      expect(result.message).toContain("review the website request details");
    });

    it("serializes the structured request into enquiries", async () => {
      const mockInsert = vi.fn().mockResolvedValue({ error: null });
      const mockSupabase = { from: vi.fn().mockReturnValue({ insert: mockInsert }) };
      vi.mocked(createSupabaseAdminClient).mockReturnValue(mockSupabase as any);

      const result = await submitWebsiteRequest({ ok: false, message: "" }, validWebsiteData);

      expect(result.ok).toBe(true);
      expect(mockInsert).toHaveBeenCalledWith(expect.objectContaining({
        name: "John Corp",
        company: "John Corp Ltd",
        message: expect.stringContaining("Type: new_business_website")
      }));
    });
  });

  describe("submitAutomationRequest", () => {
    const validAutomationData = new FormData();
    validAutomationData.append("name", "Jane Ops");
    validAutomationData.append("phone", "07700900123");
    validAutomationData.append("email", "jane@ops.com");
    validAutomationData.append("systemType", "full_system");
    validAutomationData.append("contactChannels", "phone");
    validAutomationData.append("contactChannels", "whatsapp");
    validAutomationData.append("automatedEmails", "customer_confirmation");
    validAutomationData.append("automatedEmails", "internal_notification");
    validAutomationData.append("dashboardNeed", "yes");
    validAutomationData.append("bookingVolume", "20_50");
    validAutomationData.append("currentTools", "gmail");
    validAutomationData.append("currentTools", "google_sheets");
    validAutomationData.append("notes", "We need auto confirmations.");

    it("returns error on validation failure", async () => {
      const invalidData = new FormData();
      const result = await submitAutomationRequest({ ok: false, message: "" }, invalidData);
      expect(result.ok).toBe(false);
      expect(result.message).toContain("review the system request details");
    });

    it("serializes multi-select values into enquiries", async () => {
      const mockInsert = vi.fn().mockResolvedValue({ error: null });
      const mockSupabase = { from: vi.fn().mockReturnValue({ insert: mockInsert }) };
      vi.mocked(createSupabaseAdminClient).mockReturnValue(mockSupabase as any);

      const result = await submitAutomationRequest({ ok: false, message: "" }, validAutomationData);

      expect(result.ok).toBe(true);
      expect(mockInsert).toHaveBeenCalledWith(expect.objectContaining({
        name: "Jane Ops",
        company: null,
        message: expect.stringContaining("Contact channels: phone, whatsapp")
      }));
    });
  });
});
