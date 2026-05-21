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
      <main className="min-h-screen bg-slate-950 px-5 py-16 text-white">
        <div className="mx-auto max-w-2xl rounded-lg border border-white/10 bg-white/5 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Configuration needed</p>
          <h1 className="mt-3 text-3xl font-semibold">Admin dashboard is ready for credentials.</h1>
          <p className="mt-4 leading-7 text-slate-300">
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
      <main className="min-h-screen bg-slate-950 px-5 py-16 text-white">
        <div className="mx-auto max-w-2xl rounded-lg border border-white/10 bg-white/5 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-300">Access denied</p>
          <h1 className="mt-3 text-3xl font-semibold">This account is not on the admin allowlist.</h1>
        </div>
      </main>
    );
  }

  const { bookings, enquiries } = await getAdminData();

  return <AdminDashboard bookings={bookings} enquiries={enquiries} />;
}
