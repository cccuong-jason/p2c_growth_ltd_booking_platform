"use client";

import { useState } from "react";
import { User, Key, Save, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { updateProfile, changePassword } from "@/lib/admin-actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProfileForm({ initialName, email }: { initialName: string; email: string }) {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function onSubmit(formData: FormData) {
    setIsPending(true);
    setMessage(null);
    const result = await updateProfile(formData);
    
    if (result?.error) {
      setMessage({ type: "error", text: result.error });
    } else if (result?.success) {
      setMessage({ type: "success", text: "Profile updated successfully!" });
    }
    setIsPending(false);
  }

  return (
    <form action={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <label className="block">
          <span className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Email Address</span>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="email" 
              defaultValue={email}
              disabled
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-2.5 text-sm text-slate-500 cursor-not-allowed"
            />
          </div>
        </label>
        <label className="block">
          <span className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Full Name</span>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <input 
              type="text" 
              name="fullName"
              defaultValue={initialName}
              required
              className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
            />
          </div>
        </label>
      </div>

      {message && (
        <div className={cn("p-4 rounded-xl text-sm font-medium flex items-center gap-3", 
          message.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"
        )}>
          {message.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          {message.text}
        </div>
      )}

      <Button disabled={isPending} className="rounded-xl bg-blue-600 font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 w-full sm:w-auto">
        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
        Save Changes
      </Button>
    </form>
  );
}

export function PasswordForm() {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function onSubmit(formData: FormData) {
    setIsPending(true);
    setMessage(null);
    const result = await changePassword(formData);
    
    if (result?.error) {
      setMessage({ type: "error", text: result.error });
    } else if (result?.success) {
      setMessage({ type: "success", text: "Password changed successfully!" });
      // Reset form
      const form = document.getElementById("password-form") as HTMLFormElement;
      if (form) form.reset();
    }
    setIsPending(false);
  }

  return (
    <form id="password-form" action={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <label className="block">
          <span className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">New Password</span>
          <div className="relative group">
            <Key className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <input 
              type="password" 
              name="newPassword"
              required
              minLength={6}
              className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
            />
          </div>
        </label>
        <label className="block">
          <span className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Confirm New Password</span>
          <div className="relative group">
            <Key className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <input 
              type="password" 
              name="confirmPassword"
              required
              minLength={6}
              className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
            />
          </div>
        </label>
      </div>

      {message && (
        <div className={cn("p-4 rounded-xl text-sm font-medium flex items-center gap-3", 
          message.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"
        )}>
          {message.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          {message.text}
        </div>
      )}

      <Button disabled={isPending} className="rounded-xl bg-slate-900 font-bold text-white shadow-lg transition-all hover:bg-slate-800 w-full sm:w-auto">
        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Key className="mr-2 h-4 w-4" />}
        Update Password
      </Button>
    </form>
  );
}

// Need to import Mail locally for the ProfileForm
import { Mail } from "lucide-react";