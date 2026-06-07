"use client";

import { useState } from "react";
import { Workspace } from "@/lib/admin/registry";
import { DynamicDataTable } from "@/components/admin/dynamic-data-table";
import { FulfillmentPanel } from "@/components/admin/fulfillment-panel";
import { updateBookingDetailsAction } from "@/lib/actions";

interface WorkspaceContentProps {
  workspace: Workspace;
  initialData: any[];
}

export function WorkspaceContent({ workspace, initialData }: WorkspaceContentProps) {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const handleSave = async (formData: FormData) => {
    await updateBookingDetailsAction(formData);
    setSelectedItem(null);
  };

  return (
    <div className="p-6 md:p-10 lg:p-14 space-y-10 bg-slate-50/50 min-h-screen">
      <header className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{workspace.label}</h1>
        <p className="text-slate-500 text-sm font-medium">{workspace.description}</p>
      </header>

      <DynamicDataTable 
        workspace={workspace} 
        data={initialData} 
        onRowClick={setSelectedItem}
      />

      <FulfillmentPanel 
        workspace={workspace}
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onSave={handleSave}
      />
    </div>
  );
}
