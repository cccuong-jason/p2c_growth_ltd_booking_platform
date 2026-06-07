import { redirect } from "next/navigation";
import { isAdminEmailAllowed } from "@/lib/admin";
import { getAdminProfile } from "@/lib/admin-server";
import { getEnv, hasSupabasePublicConfig, hasSupabaseServiceConfig } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hasConfig = hasSupabasePublicConfig() && hasSupabaseServiceConfig();

  // Determine the content to render
  let content = children;

  if (!hasConfig) {
    content = (
      <div className="flex h-full items-center justify-center p-8">
        <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-premium">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-3">System Configuration</p>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">Credentials Required</h1>
          <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-md mx-auto">
            Please configure your Supabase and Admin environment variables to enable live data orchestration.
          </p>
        </div>
      </div>
    );
  } else {
    const serverClient = await createSupabaseServerClient();
    const { data } = serverClient ? await serverClient.auth.getUser() : { data: { user: null } };

    if (!data.user) {
      redirect("/admin/login");
    }

    const email = data.user.email;
    const allowlist = getEnv("ADMIN_EMAIL_ALLOWLIST");

    if (!isAdminEmailAllowed(email, allowlist)) {
      content = (
        <div className="flex h-full items-center justify-center p-8">
          <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-premium">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 mb-3">Access Restricted</p>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">Account Not Authorized</h1>
            <p className="text-slate-500 text-sm font-medium">Your email ({email}) is not authorized for administrative access.</p>
          </div>
        </div>
      );
    } else {
      const profileResult = await getAdminProfile(data.user.id);
      if (!profileResult.success) {
        content = (
          <div className="flex h-full items-center justify-center p-8">
            <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-premium">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 mb-3">Profile Error</p>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">Administrative Profile Missing</h1>
              <p className="text-slate-500 text-sm font-medium">Failed to retrieve your role and permissions from the registry.</p>
            </div>
          </div>
        );
      }
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 text-slate-400 text-[11px] font-bold uppercase tracking-widest">
            <span>Admin</span>
            <span className="h-1 w-1 rounded-full bg-slate-200" />
            <span className="text-slate-900">Operations Console</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="h-8 w-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                A
             </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-x-hidden">
          {content}
        </main>
      </div>
    </div>
  );
}
