import { redirect } from "next/navigation";
import { UserCircle } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAdminProfile } from "@/lib/admin-server";
import { ProfileForm, PasswordForm } from "@/components/admin/profile-forms";

export default async function ProfilePage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = supabase ? await supabase.auth.getUser() : { data: { user: null } };

  if (!user) {
    redirect("/admin/login");
  }

  const profileResult = await getAdminProfile(user.id);
  
  if (!profileResult.success || !profileResult.data) {
    return (
      <div className="p-6 md:p-10 lg:p-14 bg-slate-50/50 min-h-screen">
        <p>Error loading profile.</p>
      </div>
    );
  }

  const profile = profileResult.data;

  return (
    <div className="p-6 md:p-10 lg:p-14 space-y-8 bg-slate-50/50 min-h-screen">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            My Profile
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Manage your personal settings and security.
          </p>
        </div>
      </header>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
        <div className="space-y-8">
          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 md:p-10">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-6">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-sm">
                <UserCircle className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Personal Details</h2>
                <p className="text-sm text-slate-500 font-medium">Update your name and contact information.</p>
              </div>
            </div>
            
            <ProfileForm initialName={profile.full_name} email={profile.email} />
          </section>

          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 md:p-10">
            <div className="mb-6 border-b border-slate-100 pb-6">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Security</h2>
              <p className="text-sm text-slate-500 font-medium">Update your password to keep your account secure.</p>
            </div>
            
            <PasswordForm />
          </section>
        </div>

        <aside className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6">Account Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Role</span>
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                  profile.role === 'super_admin' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-slate-100 text-slate-700 border border-slate-200'
                }`}>
                  {profile.role === 'super_admin' ? 'Super Admin' : 'Dispatcher'}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Joined</span>
                <span className="font-bold text-slate-900">{new Date(profile.created_at).toLocaleDateString('en-GB')}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
