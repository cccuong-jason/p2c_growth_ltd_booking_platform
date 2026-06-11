import { Zap } from "lucide-react";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { B2BClient } from "@/components/admin/b2b-client";

export const dynamic = "force-dynamic";

export default async function AutomationDashboard() {
  const supabase = createSupabaseAdminClient();
  const { data: records } = supabase 
    ? await supabase.from("b2b_projects").select("*").eq("service_type", "automation").order("created_at", { ascending: false })
    : { data: [] };

  const projects = records || [];

  return (
    <div className="p-6 md:p-10 lg:p-14 space-y-8 bg-slate-50/50 min-h-screen">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Booking & Email Automation
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Manage automated workflows for business partners.
          </p>
        </div>
      </header>

      <B2BClient initialProjects={projects} title="Automation" icon={Zap} />
    </div>
  );
}
