"use client";

import { useMemo, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import {
  Accessibility,
  ArrowLeft,
  ArrowRight,
  Brain,
  BriefcaseBusiness,
  Check,
  Dumbbell,
  HeartPulse,
  Home,
  Loader2,
  MapPin,
  ShieldCheck,
  Stethoscope
} from "lucide-react";

import { submitBooking, type ActionState } from "@/lib/actions";
import { serviceCategories, type ServiceCategory } from "@/lib/booking";

const initialState: ActionState = { ok: false, message: "" };

const serviceIcons = {
  elderly: Accessibility,
  neurological: Brain,
  post_surgery: HeartPulse,
  sports_gym: Dumbbell,
  occupational: BriefcaseBusiness,
  medico_legal: Stethoscope
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="button-primary w-full justify-center md:w-auto" disabled={pending}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Check className="h-4 w-4" aria-hidden />}
      Submit request
    </button>
  );
}

export function BookingWizard() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState<ServiceCategory>(serviceCategories[0].id);
  const [visitType, setVisitType] = useState<"clinic" | "home">("clinic");
  const [state, action] = useFormState(submitBooking, initialState);

  const steps = useMemo(() => ["Service", "Details", "Consent"], []);

  return (
    <div className="glass-panel overflow-hidden rounded-xl">
      <div className="bg-ink p-5 text-white md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">Guided intake</p>
            <h2 className="mt-2 text-2xl font-bold">Physio request cockpit</h2>
          </div>
          <span className="w-fit rounded-md border border-cyan-200/30 bg-cyan-200/10 px-3 py-1 text-xs font-semibold text-cyan-100">
            Consent-first flow
          </span>
        </div>
      </div>

      <div className="p-4 md:p-6">
      <div className="mb-6 grid grid-cols-3 gap-2">
        {steps.map((label, index) => (
          <button
            key={label}
            type="button"
            onClick={() => setStep(index)}
            className={`rounded-lg border p-3 text-left transition ${
              index <= step ? "border-blue-200 bg-blue-50 text-ocean" : "border-slate-200 bg-white text-slate-500"
            }`}
            aria-label={label}
          >
            <span className="block text-xs font-bold uppercase tracking-wide">Step {index + 1}</span>
            <span className="mt-1 block text-sm font-semibold">{label}</span>
          </button>
        ))}
      </div>

      <form action={action} className="space-y-6">
        <input type="hidden" name="serviceCategory" value={service} />
        <input type="hidden" name="visitType" value={visitType} />

        {step === 0 ? (
          <div className="space-y-5">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-ink">Choose treatment area</h2>
              <p className="mt-2 text-sm text-slate-600">
                Select the closest category. P2C will coordinate the request with a qualified professional partner.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {serviceCategories.map((item) => {
                const Icon = serviceIcons[item.id];

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setService(item.id)}
                    className={`group rounded-lg border p-4 text-left transition hover:-translate-y-1 ${
                      service === item.id
                        ? "border-ocean bg-blue-50 shadow-soft-xl"
                        : "border-slate-200 bg-white hover:border-ocean hover:shadow-panel"
                    }`}
                  >
                    <span className={`grid h-10 w-10 place-items-center rounded-md ${
                      service === item.id ? "bg-ocean text-white" : "bg-slate-100 text-ocean group-hover:bg-blue-50"
                    }`}>
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="mt-4 block font-semibold text-ink">{item.title}</span>
                    <span className="mt-2 block text-sm leading-6 text-slate-600">{item.description}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="space-y-5">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-ink">Patient and visit details</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                These details help P2C route the request cleanly before a partner follow-up.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="field-label">
                Full name
                <input className="field-input" name="patientName" required />
              </label>
              <label className="field-label">
                Date of birth
                <input className="field-input" name="dob" type="date" required />
              </label>
              <label className="field-label">
                Phone
                <input className="field-input" name="patientPhone" required />
              </label>
              <label className="field-label">
                Email
                <input className="field-input" name="patientEmail" type="email" required />
              </label>
              <label className="field-label">
                Preferred language
                <select className="field-input" name="preferredLanguage" defaultValue="en">
                  <option value="en">English</option>
                  <option value="zh-Hant">Traditional Chinese</option>
                  <option value="zh-Hans">Simplified Chinese</option>
                  <option value="vi">Vietnamese</option>
                </select>
              </label>
              <label className="field-label">
                Preferred date/time
                <input className="field-input" name="bookingDate" type="datetime-local" required />
              </label>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <button
                type="button"
                onClick={() => setVisitType("clinic")}
                className={`choice-button min-h-20 ${visitType === "clinic" ? "choice-active" : ""}`}
              >
                <span className="grid h-10 w-10 place-items-center rounded-md bg-white text-ocean shadow-sm">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <span className="block">In-clinic</span>
                  <span className="mt-1 block text-xs font-medium text-slate-500">No address routing needed</span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => setVisitType("home")}
                className={`choice-button min-h-20 ${visitType === "home" ? "choice-active" : ""}`}
              >
                <span className="grid h-10 w-10 place-items-center rounded-md bg-white text-ocean shadow-sm">
                  <Home className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <span className="block">Home visit</span>
                  <span className="mt-1 block text-xs font-medium text-slate-500">Requires postcode and address</span>
                </span>
              </button>
            </div>
            {visitType === "home" ? (
              <div className="rounded-lg border border-cyan-200 bg-cyan-50/70 p-4">
                <div className="mb-4 flex items-start gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-md bg-cyan-200 text-slate-950">
                    <MapPin className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold text-ink">Home visit routing</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Postcode and address are required so P2C can assess partner coverage before follow-up.
                    </p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="field-label">
                    UK postcode
                    <input className="field-input" name="ukPostcode" required />
                  </label>
                  <label className="field-label">
                    Address details
                    <textarea className="field-input min-h-24" name="addressDetails" required />
                  </label>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-5">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-ink">Required acknowledgements</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Submission stays blocked until all legal confirmations are accepted.
              </p>
            </div>
            {[
              ["acknowledgeCoordinatorOnly", "I acknowledge P2C Growth is a booking and coordination platform, not a medical clinic."],
              ["consentContact", "I consent to be contacted by phone, email, or WhatsApp about this request."],
              ["acknowledgeEmergencyAdvice", "I acknowledge that emergencies require 999 or NHS urgent care."]
            ].map(([name, label]) => (
              <label key={name} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm transition hover:border-blue-200">
                <input name={name} type="checkbox" required className="mt-1 h-4 w-4 accent-ocean" />
                <span>
                  <ShieldCheck className="mb-2 h-5 w-5 text-ocean" aria-hidden />
                  {label}
                </span>
              </label>
            ))}
          </div>
        ) : null}

        {state.message ? (
          <p className={`rounded-md p-3 text-sm ${state.ok ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
            {state.message}
          </p>
        ) : null}

        <div className="flex flex-col-reverse gap-3 md:flex-row md:items-center md:justify-between">
          <button
            type="button"
            onClick={() => setStep((current) => Math.max(0, current - 1))}
            className="button-secondary justify-center"
            disabled={step === 0}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back
          </button>
          {step < 2 ? (
            <button type="button" onClick={() => setStep((current) => current + 1)} className="button-primary justify-center">
              Continue <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          ) : (
            <SubmitButton />
          )}
        </div>
      </form>
      </div>
    </div>
  );
}
