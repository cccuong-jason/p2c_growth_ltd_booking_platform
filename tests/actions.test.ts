import { describe, expect, it, vi, beforeEach } from "vitest";
import { revalidatePath } from "next/cache";

import { submitBooking, submitEnquiry } from "@/lib/actions";
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
});
