import { describe, expect, it, vi, beforeEach } from "vitest";
import { revalidatePath } from "next/cache";

import { acceptBookingAction, updateBookingStatusAction, updateBookingDetailsAction } from "@/lib/actions";
import { getBookingById, updateBookingOperationalData } from "@/lib/admin-server";
import { sendBookingAcceptedNotification } from "@/lib/email";

// Mock dependencies
vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("@/lib/admin-server", () => ({
  getBookingById: vi.fn().mockResolvedValue({ success: true, data: { id: "b-1", patient_email: "customer@example.com" } }),
  updateBookingOperationalData: vi.fn().mockResolvedValue({ success: true }),
}));

vi.mock("@/lib/email", () => ({
  sendBookingAcceptedNotification: vi.fn().mockResolvedValue({ skipped: false }),
}));

describe("administrative server actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });


  describe("acceptBookingAction", () => {
    it("confirms a booking and sends the accepted email", async () => {
      const formData = new FormData();
      formData.append("bookingId", "b-1");

      const result = await acceptBookingAction(formData);

      expect(result.ok).toBe(true);
      expect(getBookingById).toHaveBeenCalledWith("b-1");
      expect(updateBookingOperationalData).toHaveBeenCalledWith("b-1", { status: "appointment_confirmed" });
      expect(sendBookingAcceptedNotification).toHaveBeenCalledWith(expect.objectContaining({
        id: "b-1",
        status: "appointment_confirmed"
      }));
      expect(revalidatePath).toHaveBeenCalledWith("/admin");
      expect(revalidatePath).toHaveBeenCalledWith("/admin/physio");
    });
  });

  describe("updateBookingStatusAction", () => {
    it("updates status and revalidates path", async () => {
      const formData = new FormData();
      formData.append("bookingId", "b-1");
      formData.append("status", "appointment_confirmed");

      await updateBookingStatusAction(formData);

      expect(updateBookingOperationalData).toHaveBeenCalledWith("b-1", { status: "appointment_confirmed" });
      expect(revalidatePath).toHaveBeenCalledWith("/admin");
    });
  });

  describe("updateBookingDetailsAction", () => {
    it("updates full operational data and revalidates path", async () => {
      const formData = new FormData();
      formData.append("bookingId", "b-2");
      formData.append("status", "awaiting_provider");
      formData.append("assigned_partner_name", "Partner X");
      formData.append("internal_notes", "Some notes");
      formData.append("booking_date", "2026-07-01");

      await updateBookingDetailsAction(formData);

      expect(updateBookingOperationalData).toHaveBeenCalledWith("b-2", {
        status: "awaiting_provider",
        assigned_partner_name: "Partner X",
        internal_notes: "Some notes",
        missing_information: null,
        priority_level: "medium",
        provider_reason: null,
        booking_date: "2026-07-01",
      });
      expect(revalidatePath).toHaveBeenCalledWith("/admin");
    });

    it("handles nulls for optional fields", async () => {
      const formData = new FormData();
      formData.append("bookingId", "b-3");
      formData.append("status", "new_request");
      // partner and notes left empty

      await updateBookingDetailsAction(formData);

      expect(updateBookingOperationalData).toHaveBeenCalledWith("b-3", expect.objectContaining({
        assigned_partner_name: null,
        internal_notes: null
      }));
    });
  });
});
