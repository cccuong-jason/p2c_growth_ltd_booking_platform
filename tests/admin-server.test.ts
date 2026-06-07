import { describe, expect, it, vi, beforeEach } from "vitest";

import { updateBookingOperationalData, getAdminProfile, verifyAdminRole } from "@/lib/admin-server";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

// Mock Supabase admin client
vi.mock("@/lib/supabase/server", () => ({
  createSupabaseAdminClient: vi.fn(),
}));

describe("admin server logic", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("updateBookingOperationalData", () => {
    it("mocks the update when Supabase client is missing", async () => {
      vi.mocked(createSupabaseAdminClient).mockReturnValue(null as any);
      
      const result = await updateBookingOperationalData("booking-1", { status: "confirmed" });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBeDefined();
      }
    });

    it("executes the update when Supabase client is present", async () => {
      const mockUpdate = vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({ error: null })
      });
      const mockSupabase = {
        from: vi.fn().mockReturnValue({ update: mockUpdate })
      };
      
      vi.mocked(createSupabaseAdminClient).mockReturnValue(mockSupabase as any);

      const result = await updateBookingOperationalData("booking-1", { status: "confirmed" });
      expect(result.success).toBe(true);
      expect(mockSupabase.from).toHaveBeenCalledWith("bookings");
      expect(mockUpdate).toHaveBeenCalledWith(expect.objectContaining({ status: "confirmed" }));
    });

    it("returns an error if the DB update fails", async () => {
      const mockUpdate = vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({ error: { message: "DB Error" } })
      });
      const mockSupabase = {
        from: vi.fn().mockReturnValue({ update: mockUpdate })
      };
      
      vi.mocked(createSupabaseAdminClient).mockReturnValue(mockSupabase as any);

      const result = await updateBookingOperationalData("booking-1", { status: "confirmed" });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe("DB Error");
      }
    });
  });

  describe("getAdminProfile", () => {
    it("returns a mocked profile if Supabase client is missing", async () => {
      vi.mocked(createSupabaseAdminClient).mockReturnValue(null as any);
      
      const result = await getAdminProfile("user-1");
      expect(result.success).toBe(true);
      if (result.success && result.data) {
        expect(result.data.id).toBe("user-1");
      }
    });

    it("fetches the profile from Supabase when available", async () => {
      const mockSingle = vi.fn().mockResolvedValue({
        data: { id: "user-1", role: "super_admin" },
        error: null
      });
      const mockEq = vi.fn().mockReturnValue({ single: mockSingle });
      const mockSelect = vi.fn().mockReturnValue({ eq: mockEq });
      const mockSupabase = {
        from: vi.fn().mockReturnValue({ select: mockSelect })
      };
      
      vi.mocked(createSupabaseAdminClient).mockReturnValue(mockSupabase as any);

      const result = await getAdminProfile("user-1");
      expect(result.success).toBe(true);
      if (result.success && result.data) {
        expect(result.data.role).toBe("super_admin");
      }
    });
  });

  describe("verifyAdminRole", () => {
    it("verifies the user has one of the allowed roles", async () => {
      // Mocking getAdminProfile via the Supabase mock above
      const mockSupabase = {
        from: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: { role: "dispatcher" },
                error: null
              })
            })
          })
        })
      };
      vi.mocked(createSupabaseAdminClient).mockReturnValue(mockSupabase as any);

      expect(await verifyAdminRole("user-1", ["dispatcher"])).toBe(true);
      expect(await verifyAdminRole("user-1", ["super_admin"])).toBe(false);
    });
  });
});
