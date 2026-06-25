"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Activity, 
  LayoutDashboard, 
  Users, 
  Settings, 
  ChevronLeft,
  Menu,
  ShieldCheck,
  CalendarCheck,
  Zap,
  Monitor,
  MessageSquareText
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const handleLogout = async () => {
    const supabase = createSupabaseBrowserClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className={cn(
      "border-r border-slate-200 bg-white flex flex-col h-auto md:h-screen md:sticky md:top-0 z-20 transition-all duration-300",
      isCollapsed ? "w-full md:w-[88px]" : "w-full md:w-[260px]"
    )}>
      <div className={cn(
        "p-6 border-b border-slate-100 flex items-center h-[88px]",
        isCollapsed ? "justify-center" : "justify-between gap-3"
      )}>
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
            <Activity className="h-5 w-5" />
          </span>
          {!isCollapsed && (
            <div className="whitespace-nowrap transition-opacity duration-300">
              <p className="text-sm font-extrabold tracking-tight text-slate-900">P2C Growth</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Admin Platform</p>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <button 
            onClick={() => setIsCollapsed(true)}
            className="hidden md:flex p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-colors shrink-0"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="p-4 flex-1 space-y-8 overflow-y-auto overflow-x-hidden">
        {isCollapsed && (
          <div className="flex justify-center mb-4">
            <button 
              onClick={() => setIsCollapsed(false)}
              className="hidden md:flex p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 rounded-xl transition-colors shrink-0"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Main Nav */}
        <nav className="space-y-1">
          <Link
            href="/admin"
            className={cn(
              "flex items-center rounded-xl py-2.5 font-bold transition-all",
              isCollapsed ? "justify-center px-0" : "gap-3 px-4",
              pathname === "/admin" ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            )}
            title={isCollapsed ? "Overview" : undefined}
          >
            <LayoutDashboard className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span className="text-sm whitespace-nowrap">Overview</span>}
          </Link>
        </nav>

        {/* B2B Services */}
        <div className="space-y-2">
          {!isCollapsed && <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Solutions</p>}
          <nav className="space-y-1">
            <Link
              href="/admin/physio"
              className={cn(
                "flex items-center rounded-xl py-2.5 font-bold transition-all",
                isCollapsed ? "justify-center px-0" : "gap-3 px-4",
                isActive("/admin/physio") ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
              title={isCollapsed ? "P2C Health" : undefined}
            >
              <CalendarCheck className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span className="text-sm whitespace-nowrap">P2C Health</span>}
            </Link>
            <Link
              href="/admin/automation"
              className={cn(
                "flex items-center rounded-xl py-2.5 font-bold transition-all",
                isCollapsed ? "justify-center px-0" : "gap-3 px-4",
                isActive("/admin/automation") ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
              title={isCollapsed ? "Booking & Email Automation" : undefined}
            >
              <Zap className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span className="text-sm whitespace-nowrap">Automation</span>}
            </Link>
            <Link
              href="/admin/web-dev"
              className={cn(
                "flex items-center rounded-xl py-2.5 font-bold transition-all",
                isCollapsed ? "justify-center px-0" : "gap-3 px-4",
                isActive("/admin/web-dev") ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
              title={isCollapsed ? "Website Development" : undefined}
            >
              <Monitor className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span className="text-sm whitespace-nowrap">Website Dev</span>}
            </Link>
          </nav>
        </div>

        {/* CRM & Comm */}
        <div className="space-y-2">
          {!isCollapsed && <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Relationship</p>}
          <nav className="space-y-1">
            <Link
              href="/admin/customers"
              className={cn(
                "flex items-center rounded-xl py-2.5 font-bold transition-all",
                isCollapsed ? "justify-center px-0" : "gap-3 px-4",
                isActive("/admin/customers") ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
              title={isCollapsed ? "Customers" : undefined}
            >
              <Users className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span className="text-sm whitespace-nowrap">Customers</span>}
            </Link>
            <Link
              href="/admin/messages"
              className={cn(
                "flex items-center rounded-xl py-2.5 font-bold transition-all",
                isCollapsed ? "justify-center px-0" : "gap-3 px-4",
                isActive("/admin/messages") ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
              title={isCollapsed ? "Messages" : undefined}
            >
              <MessageSquareText className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span className="text-sm whitespace-nowrap">Messages</span>}
            </Link>
          </nav>
        </div>

        {/* Management */}
        <div className="space-y-2">
          {!isCollapsed && <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Settings</p>}
          <nav className="space-y-1">
            <Link
              href="/admin/teams"
              className={cn(
                "flex items-center rounded-xl py-2.5 font-bold transition-all",
                isCollapsed ? "justify-center px-0" : "gap-3 px-4",
                isActive("/admin/teams") ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
              title={isCollapsed ? "Teams" : undefined}
            >
              <ShieldCheck className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span className="text-sm whitespace-nowrap">Teams</span>}
            </Link>
            <Link
              href="/admin/settings"
              className={cn(
                "flex items-center rounded-xl py-2.5 font-bold transition-all",
                isCollapsed ? "justify-center px-0" : "gap-3 px-4",
                isActive("/admin/settings") ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
              title={isCollapsed ? "System Settings" : undefined}
            >
              <Settings className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span className="text-sm whitespace-nowrap">System</span>}
            </Link>
          </nav>
        </div>
      </div>
    </aside>
  );
}
