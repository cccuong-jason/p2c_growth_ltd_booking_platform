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
    <form onSubmit={onSubmit} className="grid gap-5 rounded-[2rem] border border-slate-100 bg-white p-8 md:p-10 shadow-premium">
      <label className="block">
        <span className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">Email address</span>
        <input 
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink transition-colors focus:border-ocean focus:outline-none focus:ring-4 focus:ring-ocean/10" 
          value={email} 
          onChange={(event) => setEmail(event.target.value)} 
          type="email" 
          required 
        />
      </label>
      <label className="block">
        <span className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">Password</span>
        <input
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink transition-colors focus:border-ocean focus:outline-none focus:ring-4 focus:ring-ocean/10"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          required
        />
      </label>
      {message ? <p className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">{message}</p> : null}
      <div className="pt-2">
        <button 
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-ocean px-6 text-sm font-black text-white shadow-md transition-all hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none" 
          disabled={pending}
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <LogIn className="h-4 w-4" aria-hidden />}
          Sign in
        </button>
      </div>
    </form>
  );
}