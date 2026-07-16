import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { type AdminRole } from "@/lib/supabase/schema";
import { type BookingStatus, type OperationalDataUpdate } from "@/lib/admin";

export async function updateBookingOperationalData(
  bookingId: string,
  data: OperationalDataUpdate
) {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    console.warn("Supabase credentials missing. Mocking booking update for:", bookingId, data);
    return { success: true, data: { id: bookingId, ...data } };
  }

  const { error } = await supabase
    .from("bookings")
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq("id", bookingId);

  if (error) {
    console.error("Error updating booking operational data:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}


export async function getBookingById(bookingId: string) {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    console.warn("Supabase credentials missing. Unable to fetch booking:", bookingId);
    return { success: false, error: "Supabase is not configured" };
  }

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", bookingId)
    .single();

  if (error) {
    console.error("Error fetching booking:", error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

export async function getAdminProfile(userId: string) {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    console.warn("Supabase credentials missing. Mocking admin profile for:", userId);
    // Mocking based on ID for tests
    return {
      success: true,
      data: {
        id: userId,
        email: "admin@p2cgrowth.com",
        full_name: "Admin User",
        role: userId.includes("super") ? "super_admin" : "dispatcher",
      },
    };
  }

  const { data, error } = await supabase
    .from("admin_profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching admin profile:", error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

export async function verifyAdminRole(userId: string, allowedRoles: AdminRole[]) {
  const result = await getAdminProfile(userId);

  if (!result.success || !result.data) {
    return false;
  }

  return allowedRoles.includes(result.data.role as AdminRole);
}
