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
    <form onSubmit={onSubmit} className="mx-auto grid max-w-md gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-panel">
      <label className="field-label">
        Email
        <input className="field-input" value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
      </label>
      <label className="field-label">
        Password
        <input
          className="field-input"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          required
        />
      </label>
      {message ? <p className="rounded-md bg-rose-50 p-3 text-sm text-rose-700">{message}</p> : null}
      <button className="button-primary justify-center" disabled={pending}>
        {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <LogIn className="h-4 w-4" aria-hidden />}
        Sign in
      </button>
    </form>
  );
}
