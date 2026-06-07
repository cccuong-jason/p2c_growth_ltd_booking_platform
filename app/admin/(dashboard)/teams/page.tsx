import { redirect } from "next/navigation";
import { Search, MoreVertical, Shield, User, Mail, Calendar } from "lucide-react";
import { createSupabaseServerClient, createSupabaseAdminClient } from "@/lib/supabase/server";
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
  if (!supabase) {
    redirect("/admin/login");
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/admin/login");
  }

  // Parallelize role verification and data fetching
  const [isSuperAdmin, adminClient] = await Promise.all([
    verifyAdminRole(user.id, ["super_admin"]),
    Promise.resolve(createSupabaseAdminClient())
  ]);

  if (!isSuperAdmin) {
    return (
      <div className="flex h-full min-h-screen items-center justify-center p-8 bg-slate-50/50">
        <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-premium">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-50 mb-3">Access Restricted</p>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">Insufficient Permissions</h1>
          <p className="text-slate-500 text-sm font-medium">You need Super Admin privileges to view and manage teams.</p>
        </div>
      </div>
    );
  }

  if (!adminClient) {
    return <div className="p-10 text-rose-500 font-bold">Admin client configuration missing.</div>;
  }

  const { data: profiles } = await adminClient.from("admin_profiles").select("*").order("created_at", { ascending: false });
  
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
        <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search members by name or email..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
            />
          </div>
        </div>

        {/* Member Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <tr>
                <th className="px-6 py-4">Member</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Added</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {teamMembers.map((member) => (
                <tr key={member.id} className="transition-colors hover:bg-slate-50/50 group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-xs ${member.color}`}>
                        {member.initial}
                      </div>
                      <span className="font-bold text-slate-900">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">
                    {member.email}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      member.role === 'Super Admin' ? 'bg-rose-50 text-rose-700 border border-rose-100' : 'bg-slate-100 text-slate-700 border border-slate-200'
                    } border`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {member.status === "pending" ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest border border-amber-100">
                        <span className="h-1 w-1 rounded-full bg-amber-600 animate-pulse" />
                        Pending
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                        <span className="h-1 w-1 rounded-full bg-emerald-600" />
                        Active
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-medium">
                    {member.lastActive}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {member.status === "pending" && (
                        <form action={async () => {
                          "use server";
                          await revokeTeamMember(member.id);
                        }}>
                          <button className="text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-600 hover:text-white px-3 py-1.5 rounded-lg border border-rose-100 hover:border-rose-600 transition-all shadow-sm">
                            Revoke
                          </button>
                        </form>
                      )}
                      <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {teamMembers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-medium italic">
                    No team members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}