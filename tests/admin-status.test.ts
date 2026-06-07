import { describe, expect, it, vi } from "vitest";

import { isBookingStatus, normalizeStatus } from "@/lib/admin";
import { updateBookingOperationalData } from "@/lib/admin-server";

describe("admin booking status helpers", () => {
  it("accepts the Phase 1 status contract", () => {
    expect(isBookingStatus("pending")).toBe(true);
    expect(isBookingStatus("partner_assigned")).toBe(true);
    expect(isBookingStatus("confirmed")).toBe(true);
    expect(isBookingStatus("completed")).toBe(true);
    expect(isBookingStatus("cancelled")).toBe(true);
  });

  it("rejects unknown status values", () => {
    expect(isBookingStatus("paid")).toBe(false);
    expect(() => normalizeStatus("paid")).toThrow("Invalid booking status");
  });
});

describe("admin operational mutations", () => {
  it("validates that operational data can be updated", async () => {
    // This will fail initially because updateBookingOperationalData is not defined/exported
    const mockUpdate = vi.fn().mockResolvedValue({ success: true });
    
    const result = await updateBookingOperationalData("booking-123", {
      status: "partner_assigned",
      assigned_partner_name: "John Doe",
      internal_notes: "Call patient tomorrow"
    });

    expect(result.success).toBe(true);
  });
});
