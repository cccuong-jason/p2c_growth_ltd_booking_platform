import { AdminLogin } from "@/components/admin/admin-login";
import { hasSupabasePublicConfig } from "@/lib/env";

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-porcelain px-5 pb-16 pt-32 flex flex-col items-center justify-center font-sans relative overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ocean/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto mb-10 max-w-md text-center relative z-10">
        <p className="text-[11px] font-bold uppercase tracking-widest text-ocean mb-3">Internal Operations</p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-ink tracking-tight mb-4">Admin Sign In</h1>
        <p className="text-sm font-medium leading-relaxed text-slate-500 max-w-xs mx-auto">
          Supabase Auth protects the internal dispatch dashboard.
        </p>
      </div>
      
      <div className="relative z-10 w-full max-w-md">
        <AdminLogin configured={hasSupabasePublicConfig()} />
      </div>
    </main>
  );
}