"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Loader2, Send } from "lucide-react";

import { submitEnquiry, type ActionState } from "@/lib/actions";

const initialState: ActionState = { ok: false, message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="button-primary justify-center" disabled={pending}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
      Send enquiry
    </button>
  );
}

export function ContactForm() {
  const [state, action] = useFormState(submitEnquiry, initialState);

  return (
    <form action={action} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
      <label className="field-label">
        Name
        <input className="field-input" name="name" required />
      </label>
      <label className="field-label">
        Email
        <input className="field-input" name="email" type="email" required />
      </label>
      <label className="field-label">
        Company
        <input className="field-input" name="company" />
      </label>
      <label className="field-label">
        Message
        <textarea className="field-input min-h-36" name="message" required />
      </label>
      {state.message ? (
        <p className={`rounded-md p-3 text-sm ${state.ok ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
          {state.message}
        </p>
      ) : null}
      <SubmitButton />
    </form>
  );
}
