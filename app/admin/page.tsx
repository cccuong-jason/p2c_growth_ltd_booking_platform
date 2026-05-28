import { redirect } from "next/navigation";

import { AdminDashboard, type AdminBooking, type AdminEnquiry } from "@/components/admin/admin-dashboard";
import { isAdminEmailAllowed } from "@/lib/admin";
import { getEnv, hasSupabasePublicConfig, hasSupabaseServiceConfig } from "@/lib/env";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getAdminData() {
  const adminClient = createSupabaseAdminClient();

  if (!adminClient) {
    return { bookings: [], enquiries: [] };
  }

  const [bookings, enquiries] = await Promise.all([
    adminClient.from("bookings").select("*").order("created_at", { ascending: false }).limit(100),
    adminClient.from("enquiries").select("*").order("created_at", { ascending: false }).limit(100)
  ]);

  return {
    bookings: (bookings.data || []) as AdminBooking[],
    enquiries: (enquiries.data || []) as AdminEnquiry[]
  };
}

export default async function AdminPage() {
  if (!hasSupabasePublicConfig() || !hasSupabaseServiceConfig()) {
    return (
      <main className="min-h-screen bg-porcelain px-5 pb-16 pt-32">
        <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ocean">Configuration needed</p>
          <h1 className="mt-4 text-3xl font-extrabold text-ink display-heading tracking-tight">Admin dashboard is ready for credentials.</h1>
          <p className="mt-6 leading-7 text-slate-600 font-medium">
            Add Supabase public keys, service role key, and ADMIN_EMAIL_ALLOWLIST to enable protected live data access.
          </p>
        </div>
      </main>
    );
  }

  const serverClient = createSupabaseServerClient();
  const { data } = serverClient ? await serverClient.auth.getUser() : { data: { user: null } };
  const email = data.user?.email;

  if (!data.user) {
    redirect("/admin/login");
  }

  if (!isAdminEmailAllowed(email, getEnv("ADMIN_EMAIL_ALLOWLIST"))) {
    return (
      <main className="min-h-screen bg-porcelain px-5 pb-16 pt-32">
        <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-500">Access denied</p>
          <h1 className="mt-4 text-3xl font-extrabold text-ink display-heading tracking-tight">This account is not on the admin allowlist.</h1>
        </div>
      </main>
    );
  }

  const { bookings, enquiries } = await getAdminData();

  return <AdminDashboard bookings={bookings} enquiries={enquiries} />;
}
