import { AdminLogin } from "@/components/admin/admin-login";
import { hasSupabasePublicConfig } from "@/lib/env";

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-porcelain px-5 py-16">
      <div className="mx-auto mb-8 max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ocean">Internal</p>
        <h1 className="mt-3 text-3xl font-semibold text-ink">Admin sign in</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Supabase Auth protects the internal dispatch dashboard.
        </p>
      </div>
      <AdminLogin configured={hasSupabasePublicConfig()} />
    </main>
  );
}
