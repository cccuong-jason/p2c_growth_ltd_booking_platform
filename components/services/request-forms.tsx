"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, Send } from "lucide-react";

import {
  submitAutomationRequest,
  submitWebsiteRequest,
  type ActionState
} from "@/lib/actions";

const initialState: ActionState = { ok: false, message: "" };

type Option = { value: string; label: string };

interface WebsiteRequestContent {
  successMessage: string;
  submit: string;
  sending: string;
  fields: {
    name: string;
    namePlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    businessName: string;
    businessNamePlaceholder: string;
    websiteType: string;
    websiteTypePlaceholder: string;
  };
  websiteTypeOptions: Option[] | readonly Option[];
}

interface AutomationRequestContent {
  successMessage: string;
  submit: string;
  sending: string;
  fields: {
    name: string;
    namePlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    systemType: string;
    systemTypePlaceholder: string;
    contactChannels: string;
    automatedEmails: string;
    dashboardNeed: string;
    bookingVolume: string;
    bookingVolumePlaceholder: string;
    currentTools: string;
    notes: string;
    notesPlaceholder: string;
  };
  systemTypeOptions: Option[] | readonly Option[];
  contactChannelOptions: Option[] | readonly Option[];
  automatedEmailOptions: Option[] | readonly Option[];
  dashboardOptions: Option[] | readonly Option[];
  bookingVolumeOptions: Option[] | readonly Option[];
  currentToolOptions: Option[] | readonly Option[];
}

function ErrorText({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 text-xs font-bold text-rose-600">{message}</p>;
}

function SubmitButton({ label, sending }: { label: string; sending: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-ocean px-6 text-sm font-black text-white shadow-md transition-all hover:bg-blue-600 hover:scale-[1.01] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
      disabled={pending}
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
      {pending ? sending : label}
    </button>
  );
}

function TextField({
  name,
  label,
  placeholder,
  type = "text",
  error,
  required = true
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: "text" | "email" | "tel";
  error?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-slate-500">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-ink placeholder:text-slate-400 focus:border-ocean focus:outline-none focus:ring-4 focus:ring-ocean/10"
      />
      <ErrorText message={error} />
    </label>
  );
}

function TextAreaField({
  name,
  label,
  placeholder,
  error
}: {
  name: string;
  label: string;
  placeholder: string;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-slate-500">{label}</span>
      <textarea
        name={name}
        rows={5}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-ink placeholder:text-slate-400 focus:border-ocean focus:outline-none focus:ring-4 focus:ring-ocean/10"
      />
      <ErrorText message={error} />
    </label>
  );
}

function SelectField({
  name,
  label,
  placeholder,
  options,
  error
}: {
  name: string;
  label: string;
  placeholder: string;
  options: Option[] | readonly Option[];
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-slate-500">{label}</span>
      <select
        name={name}
        required
        defaultValue=""
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-ink focus:border-ocean focus:outline-none focus:ring-4 focus:ring-ocean/10"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ErrorText message={error} />
    </label>
  );
}

function ChoiceGroup({
  name,
  label,
  options,
  type,
  error
}: {
  name: string;
  label: string;
  options: Option[] | readonly Option[];
  type: "checkbox" | "radio";
  error?: string;
}) {
  return (
    <div>
      <p className="mb-3 block text-xs font-black uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 text-sm font-bold text-slate-700 transition-colors hover:border-ocean/40 hover:bg-blue-50/40"
          >
            <input
              type={type}
              name={name}
              value={option.value}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-ocean focus:ring-ocean"
            />
            <span className="leading-6">{option.label}</span>
          </label>
        ))}
      </div>
      <ErrorText message={error} />
    </div>
  );
}

export function WebsiteRequestForm({ content }: { content: WebsiteRequestContent }) {
  const [state, action] = useActionState(submitWebsiteRequest, initialState);

  return (
    <form action={action} className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <TextField
          name="name"
          label={content.fields.name}
          placeholder={content.fields.namePlaceholder}
          error={state.errors?.name?.[0]}
        />
        <TextField
          name="phone"
          type="tel"
          label={content.fields.phone}
          placeholder={content.fields.phonePlaceholder}
          error={state.errors?.phone?.[0]}
        />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <TextField
          name="email"
          type="email"
          label={content.fields.email}
          placeholder={content.fields.emailPlaceholder}
          error={state.errors?.email?.[0]}
        />
        <TextField
          name="businessName"
          label={content.fields.businessName}
          placeholder={content.fields.businessNamePlaceholder}
          error={state.errors?.businessName?.[0]}
        />
      </div>
      <SelectField
        name="websiteType"
        label={content.fields.websiteType}
        placeholder={content.fields.websiteTypePlaceholder}
        options={content.websiteTypeOptions}
        error={state.errors?.websiteType?.[0]}
      />
      {state.message ? (
        <p
          className={`rounded-xl border p-4 text-sm font-semibold ${
            state.ok
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-rose-200 bg-rose-50 text-rose-700"
          }`}
        >
          {state.ok ? content.successMessage : state.message}
        </p>
      ) : null}
      <SubmitButton label={content.submit} sending={content.sending} />
    </form>
  );
}

export function AutomationRequestForm({ content }: { content: AutomationRequestContent }) {
  const [state, action] = useActionState(submitAutomationRequest, initialState);

  return (
    <form action={action} className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <TextField
          name="name"
          label={content.fields.name}
          placeholder={content.fields.namePlaceholder}
          error={state.errors?.name?.[0]}
        />
        <TextField
          name="phone"
          type="tel"
          label={content.fields.phone}
          placeholder={content.fields.phonePlaceholder}
          error={state.errors?.phone?.[0]}
        />
      </div>
      <TextField
        name="email"
        type="email"
        label={content.fields.email}
        placeholder={content.fields.emailPlaceholder}
        error={state.errors?.email?.[0]}
      />
      <SelectField
        name="systemType"
        label={content.fields.systemType}
        placeholder={content.fields.systemTypePlaceholder}
        options={content.systemTypeOptions}
        error={state.errors?.systemType?.[0]}
      />
      <ChoiceGroup
        name="contactChannels"
        type="checkbox"
        label={content.fields.contactChannels}
        options={content.contactChannelOptions}
        error={state.errors?.contactChannels?.[0]}
      />
      <ChoiceGroup
        name="automatedEmails"
        type="checkbox"
        label={content.fields.automatedEmails}
        options={content.automatedEmailOptions}
        error={state.errors?.automatedEmails?.[0]}
      />
      <ChoiceGroup
        name="dashboardNeed"
        type="radio"
        label={content.fields.dashboardNeed}
        options={content.dashboardOptions}
        error={state.errors?.dashboardNeed?.[0]}
      />
      <SelectField
        name="bookingVolume"
        label={content.fields.bookingVolume}
        placeholder={content.fields.bookingVolumePlaceholder}
        options={content.bookingVolumeOptions}
        error={state.errors?.bookingVolume?.[0]}
      />
      <ChoiceGroup
        name="currentTools"
        type="checkbox"
        label={content.fields.currentTools}
        options={content.currentToolOptions}
        error={state.errors?.currentTools?.[0]}
      />
      <TextAreaField
        name="notes"
        label={content.fields.notes}
        placeholder={content.fields.notesPlaceholder}
        error={state.errors?.notes?.[0]}
      />
      {state.message ? (
        <p
          className={`rounded-xl border p-4 text-sm font-semibold ${
            state.ok
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-rose-200 bg-rose-50 text-rose-700"
          }`}
        >
          {state.ok ? content.successMessage : state.message}
        </p>
      ) : null}
      <SubmitButton label={content.submit} sending={content.sending} />
    </form>
  );
}
