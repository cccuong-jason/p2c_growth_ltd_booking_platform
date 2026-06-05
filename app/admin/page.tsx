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
      <main className="min-h-screen bg-porcelain px-5 pb-16 pt-32 flex flex-col items-center justify-center font-sans">
        <div className="w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-10 md:p-14 shadow-premium text-center">
          <p className="text-[11px] font-bold uppercase tracking-widest text-ocean mb-3">Configuration needed</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink tracking-tight mb-6">Dashboard is ready for credentials.</h1>
          <p className="text-base font-medium leading-relaxed text-slate-500 max-w-lg mx-auto">
            Add Supabase public keys, service role key, and ADMIN_EMAIL_ALLOWLIST to enable protected live data access.
          </p>
        </div>
      </main>
    );
  }

  const serverClient = await createSupabaseServerClient();
  const { data } = serverClient ? await serverClient.auth.getUser() : { data: { user: null } };
  const email = data.user?.email;

  if (!data.user) {
    redirect("/admin/login");
  }

  if (!isAdminEmailAllowed(email, getEnv("ADMIN_EMAIL_ALLOWLIST"))) {
    return (
      <main className="min-h-screen bg-porcelain px-5 pb-16 pt-32 flex flex-col items-center justify-center font-sans">
        <div className="w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-10 md:p-14 shadow-premium text-center">
          <p className="text-[11px] font-bold uppercase tracking-widest text-rose-500 mb-3">Access denied</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink tracking-tight">Account not authorized.</h1>
        </div>
      </main>
    );
  }

  const { bookings, enquiries } = await getAdminData();

  return <AdminDashboard bookings={bookings} enquiries={enquiries} />;
}