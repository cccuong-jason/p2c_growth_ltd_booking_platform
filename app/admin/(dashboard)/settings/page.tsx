import { Bell, Shield, Key, Building2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="p-6 md:p-10 lg:p-14 space-y-8 bg-slate-50/50 min-h-screen">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            System Settings
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Manage global configuration and platform rules.
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="rounded-xl bg-blue-600 font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700">
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
      </header>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col md:flex-row">
        {/* Navigation Sidebar */}
        <div className="w-full md:w-64 bg-slate-50/50 border-b md:border-b-0 md:border-r border-slate-100 p-6">
          <nav className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-700 font-bold text-sm transition-colors">
              <Building2 className="h-4 w-4" /> General
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-bold text-sm transition-colors">
              <Bell className="h-4 w-4" /> Notifications
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-bold text-sm transition-colors">
              <Shield className="h-4 w-4" /> Security
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-bold text-sm transition-colors">
              <Key className="h-4 w-4" /> API Keys
            </button>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 p-6 md:p-10">
          <div className="max-w-2xl space-y-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">Platform Identity</h3>
              <div className="space-y-4">
                <label className="block">
                  <span className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Platform Name</span>
                  <input 
                    type="text" 
                    defaultValue="P2C Growth"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                  />
                </label>
                <label className="block">
                  <span className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Support Email</span>
                  <input 
                    type="email" 
                    defaultValue="support@p2cgrowth.com"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                  />
                </label>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Localization</h3>
              <div className="space-y-4">
                <label className="block">
                  <span className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Default Timezone</span>
                  <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all appearance-none">
                    <option>Europe/London (GMT/BST)</option>
                    <option>America/New_York (EST/EDT)</option>
                    <option>Asia/Ho_Chi_Minh (ICT)</option>
                  </select>
                </label>
                <label className="block">
                  <span className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Currency</span>
                  <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all appearance-none">
                    <option>GBP (£)</option>
                    <option>USD ($)</option>
                    <option>VND (₫)</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Danger Zone</h3>
              <div className="p-5 rounded-2xl border border-rose-200 bg-rose-50 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-rose-900">Maintenance Mode</p>
                  <p className="text-xs font-medium text-rose-700 mt-1">Suspend all public bookings temporarily.</p>
                </div>
                <button className="px-4 py-2 bg-white text-rose-600 text-xs font-bold rounded-lg border border-rose-200 hover:bg-rose-50 shadow-sm transition-colors">
                  Enable
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}