import { Search, Filter, Monitor, Calendar, MoreHorizontal, Terminal, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function WebDevDashboard() {
  const supabase = createSupabaseAdminClient();
  const { data: records } = supabase 
    ? await supabase.from("b2b_projects").select("*").eq("service_type", "web-dev").order("created_at", { ascending: false })
    : { data: [] };

  const projects = records || [];

  return (
    <div className="p-6 md:p-10 lg:p-14 space-y-8 bg-slate-50/50 min-h-screen">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Website Development
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Manage business clients requiring custom digital platforms.
          </p>
        </div>
      </header>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search clients or projects..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <tr>
                <th className="px-6 py-4">Project ID</th>
                <th className="px-6 py-4">Client Name</th>
                <th className="px-6 py-4">Core Objective</th>
                <th className="px-6 py-4">Est. Budget</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((item) => (
                <tr key={item.id} className="transition-colors hover:bg-slate-50/50 group">
                  <td className="px-6 py-4 font-bold text-slate-500 text-xs">#{item.id.slice(0, 8)}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">{item.client_name}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{item.core_objective}</td>
                  <td className="px-6 py-4 font-black text-ink">{item.estimated_budget}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider border border-blue-100">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-medium italic">
                    No web development projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-blue-50 bg-blue-50/30 p-6 flex items-start gap-4">
         <div className="h-10 w-10 shrink-0 rounded-xl bg-white shadow-sm border border-blue-100 flex items-center justify-center text-blue-600">
            <Terminal className="h-5 w-5" />
         </div>
         <div>
            <h4 className="text-sm font-bold text-ink">B2B Integration Note</h4>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed max-w-2xl">
               This module tracks complex engineering projects. In Phase 2, we will add a &quot;Project Timeline&quot; view to help the P2C team track implementation milestones and delivery dates for external partners.
            </p>
         </div>
      </div>
    </div>
  );
}
