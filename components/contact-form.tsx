"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, Send } from "lucide-react";

import { submitEnquiry, type ActionState } from "@/lib/actions";
import { useLocale } from "@/components/providers/locale-provider";
import { getDictionary } from "@/lib/i18n/dictionary";

const initialState: ActionState = { ok: false, message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  const { locale } = useLocale();
  const d = getDictionary(locale);
  const f = d.contact.form;

  return (
    <button 
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-ocean px-6 text-sm font-black text-white shadow-md transition-all hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none" 
      disabled={pending}
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
      {pending ? f.sending : f.btn}
    </button>
  );
}

export function ContactForm() {
  const [state, action] = useActionState(submitEnquiry, initialState);
  const { locale } = useLocale();
  const d = getDictionary(locale);
  const f = d.contact.form;

  return (
    <form action={action} className="grid gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <label className="block">
          <span className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">{f.name}</span>
          <input 
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink placeholder-slate-400 transition-colors focus:border-ocean focus:outline-none focus:ring-4 focus:ring-ocean/10" 
            name="name" 
            placeholder="John Doe"
            required 
          />
        </label>
        <label className="block">
          <span className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">{f.email}</span>
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
        <span className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">{f.company}</span>
        <input 
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink placeholder-slate-400 transition-colors focus:border-ocean focus:outline-none focus:ring-4 focus:ring-ocean/10" 
          name="company" 
          placeholder="Acme Corp"
        />
      </label>
      <label className="block">
        <span className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">{f.help}</span>
        <textarea 
          className="w-full min-h-[160px] resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink placeholder-slate-400 transition-colors focus:border-ocean focus:outline-none focus:ring-4 focus:ring-ocean/10" 
          name="message" 
          placeholder={f.helpPlaceholder}
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