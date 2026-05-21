"use client";

import { useMemo, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { ArrowLeft, ArrowRight, Check, Home, Loader2, MapPin } from "lucide-react";

import { submitBooking, type ActionState } from "@/lib/actions";
import { serviceCategories, type ServiceCategory } from "@/lib/booking";

const initialState: ActionState = { ok: false, message: "" };

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
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-panel md:p-6">
      <div className="mb-6 grid grid-cols-3 gap-2">
        {steps.map((label, index) => (
          <button
            key={label}
            type="button"
            onClick={() => setStep(index)}
            className={`h-2 rounded-full ${index <= step ? "bg-ocean" : "bg-slate-200"}`}
            aria-label={label}
          />
        ))}
      </div>

      <form action={action} className="space-y-6">
        <input type="hidden" name="serviceCategory" value={service} />
        <input type="hidden" name="visitType" value={visitType} />

        {step === 0 ? (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-semibold text-ink">Choose treatment area</h2>
              <p className="mt-2 text-sm text-slate-600">
                Select the closest category. P2C will coordinate the request with a qualified professional partner.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {serviceCategories.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setService(item.id)}
                  className={`rounded-lg border p-4 text-left transition ${
                    service === item.id
                      ? "border-ocean bg-blue-50 shadow-soft-xl"
                      : "border-slate-200 bg-white hover:border-ocean"
                  }`}
                >
                  <span className="font-semibold text-ink">{item.title}</span>
                  <span className="mt-2 block text-sm leading-6 text-slate-600">{item.description}</span>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold text-ink">Patient and visit details</h2>
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
                className={`choice-button ${visitType === "clinic" ? "choice-active" : ""}`}
              >
                <MapPin className="h-5 w-5" aria-hidden />
                In-clinic
              </button>
              <button
                type="button"
                onClick={() => setVisitType("home")}
                className={`choice-button ${visitType === "home" ? "choice-active" : ""}`}
              >
                <Home className="h-5 w-5" aria-hidden />
                Home visit
              </button>
            </div>
            {visitType === "home" ? (
              <div className="grid gap-4 rounded-lg border border-cyanline bg-cyan-50 p-4 md:grid-cols-2">
                <label className="field-label">
                  UK postcode
                  <input className="field-input" name="ukPostcode" required />
                </label>
                <label className="field-label">
                  Address details
                  <textarea className="field-input min-h-24" name="addressDetails" required />
                </label>
              </div>
            ) : null}
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold text-ink">Required acknowledgements</h2>
            {[
              ["acknowledgeCoordinatorOnly", "I acknowledge P2C Growth is a booking and coordination platform, not a medical clinic."],
              ["consentContact", "I consent to be contacted by phone, email, or WhatsApp about this request."],
              ["acknowledgeEmergencyAdvice", "I acknowledge that emergencies require 999 or NHS urgent care."]
            ].map(([name, label]) => (
              <label key={name} className="flex gap-3 rounded-lg border border-slate-200 p-4 text-sm text-slate-700">
                <input name={name} type="checkbox" required className="mt-1 h-4 w-4 accent-ocean" />
                {label}
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
  );
}
