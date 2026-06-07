"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient, createSupabaseAdminClient } from "@/lib/supabase/server";

export async function updateProfile(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: "Supabase not configured." };

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized." };

  const fullName = formData.get("fullName")?.toString() || "";

  if (!fullName.trim()) {
    return { error: "Full name is required." };
  }

  const { error } = await supabase
    .from("admin_profiles")
    .update({ full_name: fullName })
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/profile");
  revalidatePath("/admin", "layout");
  return { success: true };
}

export async function changePassword(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: "Supabase not configured." };

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized." };

  const newPassword = formData.get("newPassword")?.toString() || "";
  const confirmPassword = formData.get("confirmPassword")?.toString() || "";

  if (newPassword.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  if (newPassword !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  const { error } = await supabase.auth.updateUser({
    password: newPassword
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function inviteTeamMember(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: "Supabase not configured." };

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized." };

  const adminClient = createSupabaseAdminClient();
  if (!adminClient) return { error: "Server admin client not configured." };

  // Verify super_admin role using admin client (bypasses RLS)
  const { data: profile } = await adminClient.from("admin_profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "super_admin") return { error: "Forbidden. Super Admin required." };

  const email = formData.get("email")?.toString() || "";
  const fullName = formData.get("fullName")?.toString() || "";
  const role = formData.get("role")?.toString() || "dispatcher";
  const password = formData.get("password")?.toString() || "";

  if (!email || !fullName || !password) {
    return { error: "Email, full name, and temporary password are required." };
  }

  // 1. Create the user in Auth
  const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (authError) {
    return { error: authError.message };
  }

  // 2. Insert into admin_profiles
  const { error: profileError } = await adminClient.from("admin_profiles").insert({
    id: authData.user.id,
    email,
    full_name: fullName,
    role,
    status: "pending"
  });

  if (profileError) {
    // Attempt rollback if profile fails (best effort)
    await adminClient.auth.admin.deleteUser(authData.user.id);
    return { error: "Failed to create profile record. " + profileError.message };
  }

  revalidatePath("/admin/teams");
  return { success: true };
}

export async function revokeTeamMember(userId: string) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: "Supabase not configured." };

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized." };

  const adminClient = createSupabaseAdminClient();
  if (!adminClient) return { error: "Server admin client not configured." };

  // Verify requester is super_admin
  const { data: requesterProfile } = await adminClient.from("admin_profiles").select("role").eq("id", user.id).single();
  if (requesterProfile?.role !== "super_admin") return { error: "Forbidden. Super Admin required." };

  // 1. Delete from Auth (this triggers cascade delete to admin_profiles if configured, but let's be explicit)
  const { error: authError } = await adminClient.auth.admin.deleteUser(userId);
  if (authError) return { error: authError.message };

  // 2. Explicitly delete from profile just in case cascade is missing
  await adminClient.from("admin_profiles").delete().eq("id", userId);

  revalidatePath("/admin/teams");
  return { success: true };
}
