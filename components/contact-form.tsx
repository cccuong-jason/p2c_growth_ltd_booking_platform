"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, Send } from "lucide-react";

import { submitEnquiry, type ActionState } from "@/lib/actions";

const initialState: ActionState = { ok: false, message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-ocean px-6 text-sm font-black text-white shadow-md transition-all hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none" 
      disabled={pending}
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
      {pending ? "Sending..." : "Send enquiry"}
    </button>
  );
}

export function ContactForm() {
  const [state, action] = useActionState(submitEnquiry, initialState);

  return (
    <form action={action} className="grid gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <label className="block">
          <span className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Full Name</span>
          <input 
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink placeholder-slate-400 transition-colors focus:border-ocean focus:outline-none focus:ring-4 focus:ring-ocean/10" 
            name="name" 
            placeholder="John Doe"
            required 
          />
        </label>
        <label className="block">
          <span className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Work Email</span>
          <input 
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink placeholder-slate-400 transition-colors focus:border-ocean focus:outline-none focus:ring-4 focus:ring-ocean/10" 
            name="email" 
            type="email" 
            placeholder="john@company.com"
            required 
          />
        </label>
      </div>
      <label className="block">
        <span className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Company Name (Optional)</span>
        <input 
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink placeholder-slate-400 transition-colors focus:border-ocean focus:outline-none focus:ring-4 focus:ring-ocean/10" 
          name="company" 
          placeholder="Acme Corp"
        />
      </label>
      <label className="block">
        <span className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">How can we help?</span>
        <textarea 
          className="w-full min-h-[160px] resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink placeholder-slate-400 transition-colors focus:border-ocean focus:outline-none focus:ring-4 focus:ring-ocean/10" 
          name="message" 
          placeholder="Tell us about your current workflow, the problems you are facing, and what you are looking to build."
          required 
        />
      </label>
      {state.message ? (
        <p className={`rounded-xl p-4 text-sm font-semibold border ${state.ok ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700"}`}>
          {state.message}
        </p>
      ) : null}
      <div className="pt-2">
        <SubmitButton />
      </div>
    </form>
  );
}