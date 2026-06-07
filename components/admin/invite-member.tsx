"use client";

import { useState } from "react";
import { Plus, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { inviteTeamMember } from "@/lib/admin-actions";
import { cn } from "@/lib/utils";

export function InviteMemberModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function onSubmit(formData: FormData) {
    setIsPending(true);
    setMessage(null);
    
    const result = await inviteTeamMember(formData);
    
    if (result?.error) {
      setMessage({ type: "error", text: result.error });
      setIsPending(false);
    } else if (result?.success) {
      setMessage({ type: "success", text: "Member invited successfully!" });
      setTimeout(() => {
        setIsOpen(false);
        setIsPending(false);
        setMessage(null);
      }, 1500);
    }
  }

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="rounded-xl bg-blue-600 font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700"
      >
        <Plus className="mr-2 h-4 w-4" /> Invite Member
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-ink">Invite Team Member</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form action={onSubmit} className="space-y-4">
              <label className="block">
                <span className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Full Name</span>
                <input 
                  type="text" 
                  name="fullName"
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-ocean focus:ring-4 focus:ring-ocean/10"
                />
              </label>
              
              <label className="block">
                <span className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Email Address</span>
                <input 
                  type="email" 
                  name="email"
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-ocean focus:ring-4 focus:ring-ocean/10"
                />
              </label>

              <label className="block">
                <span className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Role</span>
                <select 
                  name="role"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-ink focus:outline-none focus:border-ocean focus:ring-4 focus:ring-ocean/10 appearance-none bg-white"
                >
                  <option value="dispatcher">Dispatcher</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </label>

              <label className="block">
                <span className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Temporary Password</span>
                <input 
                  type="text" 
                  name="password"
                  required
                  minLength={6}
                  placeholder="Set an initial password"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-ocean focus:ring-4 focus:ring-ocean/10"
                />
              </label>

              {message && (
                <div className={cn("p-4 rounded-xl text-sm font-medium flex items-center gap-3", 
                  message.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"
                )}>
                  {message.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  {message.text}
                </div>
              )}

              <Button disabled={isPending} className="w-full mt-2 rounded-xl bg-ocean font-bold text-white hover:bg-blue-600 transition-all h-11">
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Create Account
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}