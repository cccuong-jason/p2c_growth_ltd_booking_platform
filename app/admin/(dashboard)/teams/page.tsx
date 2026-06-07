import { Search, Plus, MoreVertical, Shield, User, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const MOCK_TEAM = [
  { id: 1, name: "Jason Admin", email: "jason@p2cgrowth.com", role: "Super Admin", lastActive: "Just now", initial: "J", color: "bg-blue-100 text-blue-700" },
  { id: 2, name: "Sarah Connor", email: "sarah@p2cgrowth.com", role: "Dispatcher", lastActive: "2 hours ago", initial: "S", color: "bg-emerald-100 text-emerald-700" },
  { id: 3, name: "Mike Ross", email: "mike@p2cgrowth.com", role: "Clinical Reviewer", lastActive: "Yesterday", initial: "M", color: "bg-purple-100 text-purple-700" },
  { id: 4, name: "Emily Chen", email: "emily@p2cgrowth.com", role: "Dispatcher", lastActive: "3 days ago", initial: "E", color: "bg-amber-100 text-amber-700" },
];

export default function TeamsPage() {
  return (
    <div className="p-6 md:p-10 lg:p-14 space-y-8 bg-slate-50/50 min-h-screen">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Team Management
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Manage internal staff access and roles.
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="rounded-xl bg-blue-600 font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" /> Invite Member
          </Button>
        </div>
      </header>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/30">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search members by name or email..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
            />
          </div>
        </div>

        {/* Member Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {MOCK_TEAM.map((member) => (
            <div key={member.id} className="rounded-2xl border border-slate-200 p-6 flex flex-col hover:border-blue-200 hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg ${member.color}`}>
                  {member.initial}
                </div>
                <button className="text-slate-400 hover:text-slate-900 transition-colors p-1 rounded-md hover:bg-slate-100">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mt-1">
                  <Mail className="h-3.5 w-3.5" /> {member.email}
                </div>
              </div>

              <div className="mt-auto space-y-3 border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-500 font-medium">
                    <Shield className="h-4 w-4" /> Role
                  </span>
                  <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${
                    member.role === 'Super Admin' ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {member.role}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-500 font-medium">
                    <Calendar className="h-4 w-4" /> Last Active
                  </span>
                  <span className="font-bold text-slate-900">
                    {member.lastActive}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}