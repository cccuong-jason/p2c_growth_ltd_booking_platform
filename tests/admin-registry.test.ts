import { describe, expect, it } from "vitest";
import { getWorkspaceById, getAllWorkspaces } from "@/lib/admin/registry";

describe("Admin Workspace Registry", () => {
  it("returns the correct metadata for the physio workspace", () => {
    const workspace = getWorkspaceById("physio");
    expect(workspace).toBeDefined();
    expect(workspace?.label).toBe("Physiotherapy");
    expect(workspace?.columns).toContainEqual(expect.objectContaining({ key: "status" }));
  });

  it("returns undefined for non-existent workspaces", () => {
    const workspace = getWorkspaceById("non-existent");
    expect(workspace).toBeUndefined();
  });

  it("lists all available workspaces", () => {
    const workspaces = getAllWorkspaces();
    expect(workspaces.length).toBeGreaterThanOrEqual(2); // Physio and Tech
    expect(workspaces.map(w => w.id)).toContain("physio");
    expect(workspaces.map(w => w.id)).toContain("tech");
  });
});
