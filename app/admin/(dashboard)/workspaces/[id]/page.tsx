import { notFound } from "next/navigation";
import { Plus, Search, Filter, MoreHorizontal } from "lucide-react";
import { getWorkspaceById } from "@/lib/admin/registry";
import { Button } from "@/components/ui/button";

export default async function WorkspacePage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const workspace = getWorkspaceById(id);

  if (!workspace) {
    notFound();
  }

  // Generate some mock data based on the workspace type
  const mockData = Array.from({ length: 5 }).map((_, i) => {
    const record: any = { id: i + 1 };
    workspace.columns.forEach(col => {
      if (col.type === "contact") record[col.key] = `User ${i + 1}`;
      else if (col.type === "badge") record[col.key] = workspace.statuses[i % workspace.statuses.length].label;
      else if (col.type === "date") record[col.key] = "2026-06-05";
      else if (col.type === "boolean") record[col.key] = i % 2 === 0 ? "Yes" : "No";
      else record[col.key] = "Sample Text";
    });
    return record;
  });

  return (
    <div className="p-6 md:p-10 lg:p-14 space-y-8 bg-slate-50/50 min-h-screen">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-sm">
            <workspace.icon className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              {workspace.label}
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              {workspace.description}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button className="rounded-xl bg-blue-600 font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" /> Create Record
          </Button>
        </div>
      </header>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/30">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search records..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
            />
          </div>
          <Button variant="outline" className="w-full sm:w-auto rounded-xl border-slate-200 font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50">
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <tr>
                <th className="px-6 py-4">ID</th>
                {workspace.columns.map(col => (
                  <th key={col.key} className="px-6 py-4">{col.label}</th>
                ))}
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockData.map((record) => (
                <tr key={record.id} className="transition-colors hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-bold text-slate-500">
                    #{1000 + record.id}
                  </td>
                  {workspace.columns.map(col => (
                    <td key={col.key} className="px-6 py-4">
                      {col.type === "badge" ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                          {record[col.key]}
                        </span>
                      ) : col.type === "contact" ? (
                        <span className="font-bold text-slate-900">{record[col.key]}</span>
                      ) : (
                        <span className="font-medium text-slate-600">{record[col.key]}</span>
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm font-medium text-slate-500 bg-slate-50/30">
          <span>Showing 1 to 5 of 5 records</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-lg h-8 border-slate-200 text-slate-600 font-bold hover:bg-slate-50">Previous</Button>
            <Button variant="outline" size="sm" className="rounded-lg h-8 border-slate-200 text-slate-600 font-bold hover:bg-slate-50">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}