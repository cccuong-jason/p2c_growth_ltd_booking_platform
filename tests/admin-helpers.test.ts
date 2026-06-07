import { describe, expect, it } from "vitest";

import { getStatusLabel, isAdminEmailAllowed } from "@/lib/admin";

describe("admin utility helpers", () => {
  describe("getStatusLabel", () => {
    it("formats snake_case statuses to Title Case", () => {
      expect(getStatusLabel("pending")).toBe("Pending");
      expect(getStatusLabel("partner_assigned")).toBe("Partner Assigned");
    });
  });

  describe("isAdminEmailAllowed", () => {
    const allowlist = "admin@p2c.com, boss@p2c.com , STAFF@p2C.COM";

    it("allows emails in the list (case-insensitive and trimmed)", () => {
      expect(isAdminEmailAllowed("admin@p2c.com", allowlist)).toBe(true);
      expect(isAdminEmailAllowed("BOSS@P2C.COM", allowlist)).toBe(true);
      expect(isAdminEmailAllowed(" staff@p2c.com ", allowlist)).toBe(true);
    });

    it("denies emails not in the list", () => {
      expect(isAdminEmailAllowed("intruder@gmail.com", allowlist)).toBe(false);
      expect(isAdminEmailAllowed("admin@other.com", allowlist)).toBe(false);
    });

    it("denies access if email or allowlist is missing", () => {
      expect(isAdminEmailAllowed(undefined, allowlist)).toBe(false);
      expect(isAdminEmailAllowed("admin@p2c.com", undefined)).toBe(false);
      expect(isAdminEmailAllowed("", "")).toBe(false);
    });
  });
});
