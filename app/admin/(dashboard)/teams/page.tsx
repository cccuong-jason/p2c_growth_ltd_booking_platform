import { redirect } from "next/navigation";
import { Search, MoreVertical, Shield, User, Mail, Calendar } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { verifyAdminRole } from "@/lib/admin-server";
import { InviteMemberModal } from "@/components/admin/invite-member";
import { type AdminRole } from "@/lib/supabase/schema";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
  initial: string;
  color: string;
}

const colorPool = [
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-purple-100 text-purple-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700"
];

import { revokeTeamMember } from "@/lib/admin-actions";

export default async function TeamsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  
  if (!user || !supabase) {
    redirect("/admin/login");
  }

  const isSuperAdmin = await verifyAdminRole(user.id, ["super_admin"]);

  if (!isSuperAdmin) {
    return (
      <div className="flex h-full min-h-screen items-center justify-center p-8 bg-slate-50/50">
        <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-premium">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 mb-3">Access Restricted</p>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">Insufficient Permissions</h1>
          <p className="text-slate-500 text-sm font-medium">You need Super Admin privileges to view and manage teams.</p>
        </div>
      </div>
    );
  }

  // Fetch real team members
  const { data: profiles, error } = await supabase.from("admin_profiles").select("*").order("created_at", { ascending: false });
  
  const teamMembers: TeamMember[] = (profiles || []).map((p, index) => ({
    id: p.id,
    name: p.full_name,
    email: p.email,
    role: p.role === "super_admin" ? "Super Admin" : "Dispatcher",
    status: p.status || "active",
    lastActive: new Date(p.created_at).toLocaleDateString('en-GB'),
    initial: p.full_name.charAt(0).toUpperCase() || "?",
    color: colorPool[index % colorPool.length]
  }));

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
          <InviteMemberModal />
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
          {teamMembers.map((member) => (
            <div key={member.id} className="rounded-2xl border border-slate-200 p-6 flex flex-col hover:border-blue-200 hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg ${member.color}`}>
                  {member.initial}
                </div>
                <div className="flex gap-2">
                  {member.status === "pending" && (
                    <form action={async () => {
                      "use server";
                      await revokeTeamMember(member.id);
                    }}>
                      <button className="text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 px-2 py-1 rounded-md border border-rose-100 transition-colors">
                        Revoke
                      </button>
                    </form>
                  )}
                  <button className="text-slate-400 hover:text-slate-900 transition-colors p-1 rounded-md hover:bg-slate-100">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                  {member.status === "pending" && (
                    <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest border border-amber-100">
                      Pending
                    </span>
                  )}
                </div>
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
                    <Calendar className="h-4 w-4" /> Added
                  </span>
                  <span className="font-bold text-slate-900">
                    {member.lastActive}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {teamMembers.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-400 font-medium">
              No team members found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}