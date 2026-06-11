"use client";

import { useState, useMemo } from "react";
import { Search, Filter, MoreHorizontal, Building2, X, Activity, Save, Loader2, Plus, Calendar } from "lucide-react";
import { updateB2BProject } from "@/lib/admin-actions";
import { Button } from "@/components/ui/button";
import { type B2BProjectRow } from "@/lib/supabase/schema";
import { cn } from "@/lib/utils";

export function B2BClient({ 
  initialProjects, 
  title, 
  icon: Icon 
}: { 
  initialProjects: B2BProjectRow[],
  title: string,
  icon: any
}) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<B2BProjectRow | null>(null);
  
  // Slide-over state
  const [milestones, setMilestones] = useState<{ title: string; completed: boolean; date: string }[]>([]);
  const [projectStatus, setProjectStatus] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [newMilestoneTitle, setNewMilestoneTitle] = useState("");

  const filteredProjects = useMemo(() => {
    return initialProjects
      .filter((p) => statusFilter === "all" || p.status.toLowerCase() === statusFilter.toLowerCase())
      .filter((p) => {
        const haystack = `${p.client_name} ${p.core_objective} ${p.id}`.toLowerCase();
        return haystack.includes(query.toLowerCase());
      });
  }, [initialProjects, query, statusFilter]);

  const openPanel = (project: B2BProjectRow) => {
    setSelectedProject(project);
    setMilestones(project.milestones || []);
    setProjectStatus(project.status);
  };

  const addMilestone = () => {
    if (!newMilestoneTitle.trim()) return;
    setMilestones([...milestones, { 
      title: newMilestoneTitle, 
      completed: false, 
      date: new Date().toISOString().split('T')[0] 
    }]);
    setNewMilestoneTitle("");
  };

  const toggleMilestone = (index: number) => {
    const updated = [...milestones];
    updated[index].completed = !updated[index].completed;
    setMilestones(updated);
  };

  const handleSave = async () => {
    if (!selectedProject) return;
    setIsPending(true);
    await updateB2BProject(selectedProject.id, milestones, projectStatus);
    setIsPending(false);
    setSelectedProject(null);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by client or objective..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
          />
        </div>
        <div className="flex w-full sm:w-auto gap-3">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all appearance-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="lead">Lead</option>
            <option value="active">Active</option>
            <option value="in testing">In Testing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-white border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Core Objective</th>
              <th className="px-6 py-4">Budget</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredProjects.map((item) => (
              <tr 
                key={item.id} 
                onClick={() => openPanel(item)}
                className="transition-colors hover:bg-slate-50/50 group cursor-pointer"
              >
                <td className="px-6 py-4 font-bold text-slate-500 text-xs">#{item.id.slice(0, 8).toUpperCase()}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                     <Icon className="h-4 w-4 text-slate-400" />
                     <span className="font-bold text-slate-900">{item.client_name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-slate-600">{item.core_objective}</td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border",
                    item.estimated_budget?.includes('0') ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-purple-50 text-purple-600 border-purple-100"
                  )}>
                    {item.estimated_budget || 'Standard'}
                  </span>
                </td>
                <td className="px-6 py-4">
                   <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest border border-slate-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
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
            {filteredProjects.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-medium italic">
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Slide-over Detail View */}
      {selectedProject && (
        <>
          <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity" onClick={() => setSelectedProject(null)} />
          <aside className="fixed right-0 top-0 h-full w-full max-w-md bg-white border-l border-slate-200 z-50 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Project Timeline</h2>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">{selectedProject.client_name}</p>
              </div>
              <button onClick={() => setSelectedProject(null)} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white">
              
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Activity className="h-3 w-3" />
                  Overall Status
                </label>
                <select 
                  value={projectStatus}
                  onChange={(e) => setProjectStatus(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all appearance-none cursor-pointer"
                >
                  <option value="Lead">Lead</option>
                  <option value="Active">Active</option>
                  <option value="In Testing">In Testing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  Milestones
                </label>

                <div className="space-y-2">
                  {milestones.map((ms, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50">
                      <input 
                        type="checkbox" 
                        checked={ms.completed}
                        onChange={() => toggleMilestone(idx)}
                        className="h-4 w-4 rounded border-slate-300 text-ocean focus:ring-ocean cursor-pointer"
                      />
                      <div className="flex flex-col">
                        <span className={cn("text-sm font-bold", ms.completed ? "text-slate-400 line-through" : "text-slate-900")}>
                          {ms.title}
                        </span>
                        <span className="text-[10px] font-medium text-slate-400">{ms.date}</span>
                      </div>
                    </div>
                  ))}
                  {milestones.length === 0 && (
                    <p className="text-xs text-slate-400 italic py-2">No milestones defined yet.</p>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input 
                    type="text" 
                    placeholder="New milestone..." 
                    value={newMilestoneTitle}
                    onChange={(e) => setNewMilestoneTitle(e.target.value)}
                    className="flex-1 bg-white border border-slate-200 rounded-lg py-2 px-3 text-sm outline-none focus:border-ocean focus:ring-2 focus:ring-ocean/10 transition-all"
                  />
                  <Button type="button" onClick={addMilestone} size="sm" className="rounded-lg bg-slate-900 text-white hover:bg-slate-800">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

            </div>

            <div className="p-6 bg-white border-t border-slate-100 flex gap-3">
              <Button type="button" variant="outline" onClick={() => setSelectedProject(null)} className="flex-1 rounded-xl font-bold border-slate-200 text-slate-600 hover:bg-slate-50">
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isPending} className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-200">
                {isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                Save Timeline
              </Button>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
