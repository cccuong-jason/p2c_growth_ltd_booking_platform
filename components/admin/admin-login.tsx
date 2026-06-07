"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogIn } from "lucide-react";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function AdminLogin({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");

    const supabase = createSupabaseBrowserClient();

    if (!configured || !supabase) {
      setMessage("Supabase public credentials are required for admin sign-in.");
      setPending(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setMessage(error.message);
      setPending(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-8 md:p-12 shadow-premium">
      <div className="space-y-4">
        <label className="block space-y-2">
          <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Administrative Email</span>
          <input 
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-bold text-slate-900 transition-all focus:border-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-50 placeholder:text-slate-300" 
            value={email} 
            onChange={(event) => setEmail(event.target.value)} 
            type="email" 
            placeholder="admin@p2cgrowth.com"
            required 
          />
        </label>
        <label className="block space-y-2">
          <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Secret Password</span>
          <input
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-bold text-slate-900 transition-all focus:border-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-50"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            required
          />
        </label>
      </div>

      {message ? (
        <div className="rounded-xl border border-rose-100 bg-rose-50 p-4 flex items-start gap-3">
          <div className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
          <p className="text-xs font-bold text-rose-700 leading-relaxed">{message}</p>
        </div>
      ) : null}

      <button 
        className="h-12 w-full flex items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 text-sm font-black text-white shadow-lg shadow-blue-100 transition-all hover:bg-blue-700 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none" 
        disabled={pending}
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
        Enter Console
      </button>
    </form>
  );
}
