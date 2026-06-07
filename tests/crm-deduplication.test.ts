import { describe, expect, it, vi, beforeEach } from "vitest";
import { getOrCreateContact } from "@/lib/admin/crm";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

vi.mock("@/lib/supabase/server", () => ({
  createSupabaseAdminClient: vi.fn(),
}));

describe("CRM Contact Deduplication", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("links to existing contact if email matches", async () => {
    const mockSupabase = {
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            maybeSingle: vi.fn().mockResolvedValue({ data: { id: "existing-uuid" }, error: null })
          })
        })
      })
    };
    vi.mocked(createSupabaseAdminClient).mockReturnValue(mockSupabase as any);

    const result = await getOrCreateContact({
      email: "EXIsTiNG@example.com",
      phone: "12345",
      name: "Test"
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.contactId).toBe("existing-uuid");
    }
  });

  it("creates a new contact if no email or phone matches", async () => {
    const mockMaybeSingle = vi.fn().mockResolvedValue({ data: null, error: null });
    const mockSingle = vi.fn().mockResolvedValue({ data: { id: "new-uuid" }, error: null });
    
    const mockSupabase = {
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            maybeSingle: mockMaybeSingle
          })
        }),
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: mockSingle
          })
        })
      })
    };
    vi.mocked(createSupabaseAdminClient).mockReturnValue(mockSupabase as any);

    const result = await getOrCreateContact({
      email: "new@example.com",
      phone: "99999",
      name: "New User"
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.contactId).toBe("new-uuid");
    }
  });
});
