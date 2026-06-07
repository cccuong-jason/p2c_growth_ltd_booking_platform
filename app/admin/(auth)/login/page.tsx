import { AdminLogin } from "@/components/admin/admin-login";
import { hasSupabasePublicConfig } from "@/lib/env";

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 pb-16 pt-32 flex flex-col items-center justify-center font-sans relative overflow-hidden">
      {/* Background decoration to match design system */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto mb-10 max-w-md text-center relative z-10 space-y-2">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Secure Access</p>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Console Login</h1>
        <p className="text-sm font-medium leading-relaxed text-slate-500 max-w-xs mx-auto">
          Authenticate with your administrative account to access the P2C orchestration engine.
        </p>
      </div>
      
      <div className="relative z-10 w-full max-w-md">
        <AdminLogin configured={hasSupabasePublicConfig()} />
      </div>
    </main>
  );
}
