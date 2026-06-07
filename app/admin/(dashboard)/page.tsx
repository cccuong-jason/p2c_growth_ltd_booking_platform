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
      avgVelocity: "1.4h",
      conversionRate: "24.5%",
      velocityChange: "+12%",
      conversionChange: "+2.1%",
    };
  }

  const [totalResult, pendingResult] = await Promise.all([
    supabase.from("bookings").select("*", { count: "exact", head: true }),
    supabase.from("bookings").select("*", { count: "exact", head: true }).eq("status", "pending")
  ]);

  return {
    totalLeads: totalResult.count || 0,
    pendingLeads: pendingResult.count || 0,
    avgVelocity: "1.2h",
    conversionRate: "18.2%",
    velocityChange: "-5%",
    conversionChange: "+0.4%",
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
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-10 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center space-y-4">
          <div className="h-16 w-16 rounded-2xl bg-slate-50 flex items-center justify-center">
            <Activity className="h-8 w-8 text-slate-300" />
          </div>
          <div>
            <p className="text-slate-900 text-lg font-extrabold">Weekly Lead Volume</p>
            <p className="text-slate-400 text-sm font-medium max-w-xs mt-2">Visualized performance trends and marketplace activity will appear here.</p>
          </div>
          <Button variant="outline" className="rounded-xl border-slate-100 text-slate-400 font-bold pointer-events-none">
            Analytics Module Pending
          </Button>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col">
          <h3 className="text-slate-900 font-extrabold mb-6">Recent Activity</h3>
          <div className="space-y-6 flex-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-slate-300" />
                </div>
                <div className="space-y-1">
                  <div className="h-2 w-24 bg-slate-100 rounded-full animate-pulse" />
                  <div className="h-2 w-32 bg-slate-50 rounded-full" />
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="mt-6 w-full text-blue-600 font-bold hover:bg-blue-50">
            View all logs
          </Button>
        </div>
      </div>
    </div>
  );
}
