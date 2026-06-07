"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Activity, 
  LayoutDashboard, 
  Users, 
  Settings, 
  ChevronRight,
  ChevronLeft,
  Menu,
  LogOut,
  ShieldCheck,
  Package
} from "lucide-react";
import { getAllWorkspaces } from "@/lib/admin/registry";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();
  const workspaces = getAllWorkspaces();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

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
          <Link
            href="/admin/crm"
            className={cn(
              "flex items-center rounded-xl py-2.5 font-bold transition-all",
              isCollapsed ? "justify-center px-0" : "gap-3 px-4",
              isActive("/admin/crm") ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            )}
            title={isCollapsed ? "CRM" : undefined}
          >
            <Users className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span className="text-sm whitespace-nowrap">CRM</span>}
          </Link>
        </nav>

        {/* Workspaces */}
        <div className="space-y-2">
          {!isCollapsed && <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Services</p>}
          <nav className="space-y-1">
            {workspaces.map((ws) => (
              <Link
                key={ws.id}
                href={`/admin/workspaces/${ws.id}`}
                className={cn(
                  "group flex items-center rounded-xl py-2.5 font-bold transition-all",
                  isCollapsed ? "justify-center px-0" : "justify-between px-4",
                  isActive(`/admin/workspaces/${ws.id}`) ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
                title={isCollapsed ? ws.label : undefined}
              >
                <div className="flex items-center gap-3">
                  <ws.icon className="h-5 w-5 shrink-0" />
                  {!isCollapsed && <span className="text-sm whitespace-nowrap">{ws.label}</span>}
                </div>
                {!isCollapsed && (
                  <ChevronRight className={cn(
                    "h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0",
                    isActive(`/admin/workspaces/${ws.id}`) && "opacity-100"
                  )} />
                )}
              </Link>
            ))}
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

      <div className="p-4 mt-auto border-t border-slate-100">
        <button className={cn(
          "w-full flex items-center rounded-xl py-2.5 font-bold text-rose-500 hover:bg-rose-50 transition-all",
          isCollapsed ? "justify-center px-0" : "gap-3 px-4"
        )}
        title={isCollapsed ? "Logout" : undefined}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!isCollapsed && <span className="text-sm whitespace-nowrap">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
