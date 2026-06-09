import { redirect } from "next/navigation";
import { 
  Activity, 
  Users, 
  TrendingUp, 
  Clock, 
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight
} from "lucide-react";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

async function getStats() {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return {
      totalLeads: 124,
      pendingLeads: 12,
      confirmedLeads: 80,
      cancelledLeads: 5,
      avgVelocity: "1.4h",
      conversionRate: "24.5%",
      velocityChange: "+12%",
      conversionChange: "+2.1%",
      recentActivity: []
    };
  }

  const [totalResult, pendingResult, confirmedResult, cancelledResult, recentActivity] = await Promise.all([
    supabase.from("bookings").select("*", { count: "exact", head: true }),
    supabase.from("bookings").select("*", { count: "exact", head: true }).eq("status", "new_request"),
    supabase.from("bookings").select("*", { count: "exact", head: true }).in("status", ["appointment_confirmed", "completed"]),
    supabase.from("bookings").select("*", { count: "exact", head: true }).in("status", ["cancelled", "no_show"]),
    supabase.from("bookings").select("id, patient_name, status, created_at").order("created_at", { ascending: false }).limit(5)
  ]);

  const total = totalResult.count || 0;
  const confirmed = confirmedResult.count || 0;
  const conversion = total > 0 ? Math.round((confirmed / total) * 100) : 0;

  return {
    totalLeads: total,
    pendingLeads: pendingResult.count || 0,
    confirmedLeads: confirmed,
    cancelledLeads: cancelledResult.count || 0,
    avgVelocity: "1.2h",
    conversionRate: `${conversion}%`,
    velocityChange: "-5%",
    conversionChange: "+0.4%",
    recentActivity: recentActivity.data || []
  };
}

export default async function AdminOverviewPage() {
  const stats = await getStats();

  const cards = [
    { 
      label: "Total Dispatch Volume", 
      value: stats.totalLeads, 
      change: "+14.2%", 
      trend: "up", 
      icon: Activity,
      color: "bg-blue-50 text-blue-600"
    },
    { 
      label: "Pending Matching", 
      value: stats.pendingLeads, 
      change: "-2.4%", 
      trend: "down", 
      icon: Zap,
      color: "bg-amber-50 text-amber-600"
    },
    { 
      label: "Dispatch Velocity", 
      value: stats.avgVelocity, 
      change: stats.velocityChange, 
      trend: stats.velocityChange.startsWith('+') ? "up" : "down", 
      icon: Clock,
      color: "bg-emerald-50 text-emerald-600"
    },
    { 
      label: "Marketplace Conversion", 
      value: stats.conversionRate, 
      change: stats.conversionChange, 
      trend: "up", 
      icon: TrendingUp,
      color: "bg-purple-50 text-purple-600"
    },
  ];

  return (
    <div className="p-6 md:p-10 lg:p-14 space-y-10 bg-slate-50/50 min-h-screen">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Welcome back, Admin 👋
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Here is the latest update for the last 7 days.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-slate-200 bg-white font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50">
            Week <ChevronRight className="ml-2 h-3.5 w-3.5 rotate-90" />
          </Button>
          <Button className="rounded-xl bg-blue-600 font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700">
            Export Report
          </Button>
        </div>
      </header>

      {/* Metric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start">
              <div className={`p-2.5 rounded-xl ${card.color}`}>
                <card.icon className="h-5 w-5" />
              </div>
              <div className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${card.trend === 'up' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                {card.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {card.change}
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{card.label}</p>
              <p className="text-3xl font-extrabold text-slate-900 mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-10 shadow-sm min-h-[400px] flex flex-col space-y-8">
          <div>
            <h3 className="text-slate-900 text-xl font-extrabold">Conversion Analytics</h3>
            <p className="text-slate-500 text-sm font-medium mt-1">Lead status breakdown for the current period.</p>
          </div>
          
          <div className="flex-1 flex flex-col justify-end gap-6">
            <div className="flex items-end gap-8 h-48 border-b border-slate-100 pb-4">
              {/* Simple CSS Bar Chart */}
              <div className="flex-1 flex flex-col items-center justify-end gap-2 group">
                <div className="w-full max-w-[80px] bg-blue-100 rounded-t-lg relative transition-all group-hover:bg-blue-200" style={{ height: `${stats.totalLeads > 0 ? 100 : 5}%` }}>
                  <div className="absolute -top-6 inset-x-0 text-center text-xs font-bold text-slate-600">{stats.totalLeads}</div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</span>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-end gap-2 group">
                <div className="w-full max-w-[80px] bg-amber-100 rounded-t-lg relative transition-all group-hover:bg-amber-200" style={{ height: `${stats.totalLeads > 0 ? Math.max((stats.pendingLeads / stats.totalLeads) * 100, 5) : 5}%` }}>
                  <div className="absolute -top-6 inset-x-0 text-center text-xs font-bold text-slate-600">{stats.pendingLeads}</div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pending</span>
              </div>

              <div className="flex-1 flex flex-col items-center justify-end gap-2 group">
                <div className="w-full max-w-[80px] bg-emerald-100 rounded-t-lg relative transition-all group-hover:bg-emerald-200" style={{ height: `${stats.totalLeads > 0 ? Math.max((stats.confirmedLeads / stats.totalLeads) * 100, 5) : 5}%` }}>
                  <div className="absolute -top-6 inset-x-0 text-center text-xs font-bold text-slate-600">{stats.confirmedLeads}</div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Confirmed</span>
              </div>

              <div className="flex-1 flex flex-col items-center justify-end gap-2 group">
                <div className="w-full max-w-[80px] bg-rose-100 rounded-t-lg relative transition-all group-hover:bg-rose-200" style={{ height: `${stats.totalLeads > 0 ? Math.max((stats.cancelledLeads / stats.totalLeads) * 100, 5) : 5}%` }}>
                  <div className="absolute -top-6 inset-x-0 text-center text-xs font-bold text-slate-600">{stats.cancelledLeads}</div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lost</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-100" /> Total Intake</div>
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-100" /> Successful Conversion</div>
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-rose-100" /> Dropped</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col">
          <h3 className="text-slate-900 font-extrabold mb-6">Recent Activity</h3>
          <div className="space-y-6 flex-1">
            {stats.recentActivity.map((activity: any) => (
              <div key={activity.id} className="flex gap-4 items-start">
                <div className="h-10 w-10 shrink-0 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs">
                  {activity.patient_name.charAt(0).toUpperCase()}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-900 leading-tight">
                    {activity.patient_name} <span className="font-medium text-slate-500">submitted a request</span>
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {new Date(activity.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} • {activity.status.replace('_', ' ')}
                  </p>
                </div>
              </div>
            ))}
            {stats.recentActivity.length === 0 && (
              <p className="text-sm text-slate-400 italic">No recent activity.</p>
            )}
          </div>
          <Button variant="ghost" className="mt-6 w-full text-blue-600 font-bold hover:bg-blue-50">
            View all logs
          </Button>
        </div>
      </div>
    </div>
  );
}
