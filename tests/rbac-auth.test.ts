import { describe, expect, it, vi } from "vitest";

import { verifyAdminRole } from "@/lib/admin-server";

describe("RBAC Role Verification", () => {
  it("allows a super_admin to perform super_admin actions", async () => {
    // Mock user with super_admin role
    const mockUser = { id: "super-123", role: "super_admin" };
    
    const isAllowed = await verifyAdminRole(mockUser.id, ["super_admin"]);
    expect(isAllowed).toBe(true);
  });

  it("denies a dispatcher from performing super_admin actions", async () => {
    // Mock user with dispatcher role
    const mockUser = { id: "dispatch-123", role: "dispatcher" };
    
    const isAllowed = await verifyAdminRole(mockUser.id, ["super_admin"]);
    expect(isAllowed).toBe(false);
  });

  it("allows both roles to perform common dispatcher actions", async () => {
    const isSuperAllowed = await verifyAdminRole("super-123", ["super_admin", "dispatcher"]);
    const isDispatchAllowed = await verifyAdminRole("dispatch-123", ["super_admin", "dispatcher"]);
    
    expect(isSuperAllowed).toBe(true);
    expect(isDispatchAllowed).toBe(true);
  });
});
