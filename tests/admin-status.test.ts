import { describe, expect, it } from "vitest";

import { isBookingStatus, normalizeStatus } from "@/lib/admin";

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
