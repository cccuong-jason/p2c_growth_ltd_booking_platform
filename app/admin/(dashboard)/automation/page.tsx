import { Search, Zap, MoreHorizontal, CheckCircle2, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

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

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search business partners..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Business</th>
                <th className="px-6 py-4">Automation Stack</th>
                <th className="px-6 py-4">Complexity</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((item) => (
                <tr key={item.id} className="transition-colors hover:bg-slate-50/50 group">
                  <td className="px-6 py-4 font-bold text-slate-500 text-xs">#{item.id.slice(0, 8)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <Building2 className="h-4 w-4 text-slate-400" />
                       <span className="font-bold text-slate-900">{item.client_name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-600">{item.core_objective}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${
                      item.estimated_budget === 'Advanced' ? 'bg-purple-50 text-purple-600 border border-purple-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                    } border`}>
                      {item.estimated_budget || 'Standard'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                     <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                        <CheckCircle2 className="h-3 w-3" />
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
                    No automation projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
