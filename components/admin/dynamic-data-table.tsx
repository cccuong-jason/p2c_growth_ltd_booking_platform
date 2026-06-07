"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, MoreHorizontal, Calendar, CheckCircle2, User, Mail, Phone, ChevronRight } from "lucide-react";
import { Workspace, WorkspaceColumn } from "@/lib/admin/registry";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DynamicDataTableProps {
  workspace: Workspace;
  data: any[];
  onRowClick?: (row: any) => void;
}

export function DynamicDataTable({ workspace, data, onRowClick }: DynamicDataTableProps) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredData = useMemo(() => {
    return data
      .filter((item) => statusFilter === "all" || item.status === statusFilter)
      .filter((item) => {
        const searchString = Object.values(item).join(" ").toLowerCase();
        return searchString.includes(query.toLowerCase());
      });
  }, [data, query, statusFilter]);

  const renderCell = (column: WorkspaceColumn, item: any) => {
    const value = item[column.key];

    switch (column.type) {
      case "contact":
        return (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400 border border-slate-200">
              {(item.patient_name || item.name || "U").charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 leading-none">{item.patient_name || item.name || item.full_name}</span>
              <span className="text-[10px] font-medium text-slate-400 mt-1">{item.patient_email || item.email}</span>
            </div>
          </div>
        );
      case "badge":
        if (column.key === "status") {
          const statusCfg = workspace.statuses.find(s => s.value === value);
          return (
            <div className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 border text-[10px] font-black uppercase tracking-tight 
              ${statusCfg?.color === 'amber' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                statusCfg?.color === 'blue' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                statusCfg?.color === 'cyan' ? 'bg-cyan-50 text-cyan-600 border-cyan-100' :
                statusCfg?.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                'bg-slate-50 text-slate-500 border-slate-100'}`}>
              <span className={`h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_4px_currentColor]`} />
              {statusCfg?.label || value}
            </div>
          );
        }
        return <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-md leading-none">{value}</Badge>;
      case "date":
        return (
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <Calendar className="h-3.5 w-3.5 text-slate-300" />
            {new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
          </div>
        );
      case "boolean":
        return value ? (
          <span className="inline-flex items-center gap-1.5 text-blue-600 text-[10px] font-black bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
            <CheckCircle2 className="h-3 w-3" /> YES
          </span>
        ) : (
          <span className="text-slate-400 text-[10px] font-bold px-2">No</span>
        );
      default:
        return <span className="text-slate-600 font-medium">{value}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text"
            placeholder={`Search ${workspace.label}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-11 pr-4 text-sm font-medium focus:ring-4 focus:ring-blue-50 focus:border-blue-300 outline-none transition-all shadow-sm placeholder:text-slate-400"
          />
        </div>
        <div className="relative md:w-64">
          <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-11 pr-4 text-sm font-bold text-slate-700 appearance-none outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-300 transition-all cursor-pointer shadow-sm"
          >
            <option value="all">All Statuses</option>
            {workspace.statuses.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-bold uppercase tracking-widest">
                {workspace.columns.map(col => (
                  <th key={col.key} className="px-6 py-4">{col.label}</th>
                ))}
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredData.map((item, idx) => (
                <tr 
                  key={item.id || idx} 
                  className="group hover:bg-slate-50/50 transition-colors cursor-pointer"
                  onClick={() => onRowClick?.(item)}
                >
                  {workspace.columns.map(col => (
                    <td key={col.key} className="px-6 py-4">
                      {renderCell(col, item)}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredData.length === 0 && (
            <div className="p-20 text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-slate-50 mx-auto flex items-center justify-center">
                <Search className="h-6 w-6 text-slate-200" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-400">No results found</p>
                <p className="text-xs text-slate-300">Try adjusting your filters or keywords.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
