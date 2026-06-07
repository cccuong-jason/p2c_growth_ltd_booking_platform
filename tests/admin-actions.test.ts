import { describe, expect, it, vi, beforeEach } from "vitest";
import { revalidatePath } from "next/cache";

import { updateBookingStatusAction, updateBookingDetailsAction } from "@/lib/actions";
import { updateBookingOperationalData } from "@/lib/admin-server";

// Mock dependencies
vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("@/lib/admin-server", () => ({
  updateBookingOperationalData: vi.fn().mockResolvedValue({ success: true }),
}));

describe("administrative server actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("updateBookingStatusAction", () => {
    it("updates status and revalidates path", async () => {
      const formData = new FormData();
      formData.append("bookingId", "b-1");
      formData.append("status", "confirmed");

      await updateBookingStatusAction(formData);

      expect(updateBookingOperationalData).toHaveBeenCalledWith("b-1", { status: "confirmed" });
      expect(revalidatePath).toHaveBeenCalledWith("/admin");
    });
  });

  describe("updateBookingDetailsAction", () => {
    it("updates full operational data and revalidates path", async () => {
      const formData = new FormData();
      formData.append("bookingId", "b-2");
      formData.append("status", "partner_assigned");
      formData.append("assigned_partner_name", "Partner X");
      formData.append("internal_notes", "Some notes");
      formData.append("booking_date", "2026-07-01");

      await updateBookingDetailsAction(formData);

      expect(updateBookingOperationalData).toHaveBeenCalledWith("b-2", {
        status: "partner_assigned",
        assigned_partner_name: "Partner X",
        internal_notes: "Some notes",
        booking_date: "2026-07-01"
      });
      expect(revalidatePath).toHaveBeenCalledWith("/admin");
    });

    it("handles nulls for optional fields", async () => {
      const formData = new FormData();
      formData.append("bookingId", "b-3");
      formData.append("status", "pending");
      // partner and notes left empty

      await updateBookingDetailsAction(formData);

      expect(updateBookingOperationalData).toHaveBeenCalledWith("b-3", expect.objectContaining({
        assigned_partner_name: null,
        internal_notes: null
      }));
    });
  });
});
