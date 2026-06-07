"use client";

import { X, Save, Activity, User, ClipboardList, Info } from "lucide-react";
import { Workspace } from "@/lib/admin/registry";
import { Button } from "@/components/ui/button";

interface FulfillmentPanelProps {
  workspace: Workspace;
  item: any;
  onClose: () => void;
  onSave: (formData: FormData) => Promise<void>;
}

export function FulfillmentPanel({ workspace, item, onClose, onSave }: FulfillmentPanelProps) {
  if (!item) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity" 
        onClick={onClose} 
      />
      
      {/* Panel */}
      <aside className="fixed right-0 top-0 h-full w-full max-w-lg bg-white border-l border-slate-200 z-50 shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Lead Dispatch</h2>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Ref: {item.id?.slice(0, 8)} • {workspace.label}
                </p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-slate-50 text-slate-400 transition-colors border border-transparent hover:border-slate-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form action={onSave} className="flex-1 overflow-y-auto p-8 space-y-10">
            <input type="hidden" name="bookingId" value={item.id} />
            <input type="hidden" name="workspace_id" value={workspace.id} />
            
            {/* Status Selection */}
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                <Activity className="h-3 w-3 text-blue-500" />
                Workflow Status
              </label>
              <div className="relative">
                <select 
                  name="status"
                  defaultValue={item.status}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-300 transition-all appearance-none cursor-pointer"
                >
                  {workspace.statuses.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                   <Activity className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Common Fulfillment Fields */}
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                <User className="h-3 w-3 text-blue-500" />
                Partner Assignment
              </label>
              <input 
                type="text"
                name="assigned_partner_name"
                defaultValue={item.assigned_partner_name || ""}
                placeholder="Assign a fulfillment partner..."
                className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-300 transition-all shadow-sm"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                <ClipboardList className="h-3 w-3 text-blue-500" />
                Internal Dispatch Notes
              </label>
              <textarea 
                name="internal_notes"
                rows={6}
                defaultValue={item.internal_notes || ""}
                placeholder="Add coordination logs or special instructions..."
                className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium text-slate-700 outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-300 transition-all resize-none shadow-sm"
              />
            </div>

            {/* Dynamic Details based on metadata */}
            <div className="pt-10 border-t border-slate-100 space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                <Info className="h-3 w-3 text-blue-500" />
                Payload Metadata
              </h4>
              <div className="grid grid-cols-2 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                {Object.entries(workspace.metadataSchema).map(([key, type]) => (
                  <div key={key} className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 capitalize">{key.replace(/_/g, ' ')}</p>
                    <p className="text-xs font-black text-slate-700">
                      {String(item[key] || item.metadata?.[key] || 'N/A')}
                    </p>
                  </div>
                ))}
                <div className="col-span-2 space-y-1 pt-2">
                    <p className="text-[10px] font-bold text-slate-400">Requesting Account</p>
                    <p className="text-xs font-black text-blue-600">{item.patient_email || item.email}</p>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 pt-6 pb-2 bg-white flex gap-3">
              <Button type="submit" className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 shadow-lg shadow-blue-100">
                <Save className="h-4 w-4 mr-2" />
                Commit Changes
              </Button>
              <Button type="button" variant="outline" onClick={onClose} className="rounded-xl border-slate-200 text-slate-500 font-bold h-12 hover:bg-slate-50">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </aside>
    </>
  );
}
