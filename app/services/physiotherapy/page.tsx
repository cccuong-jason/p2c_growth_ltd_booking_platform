import { AlertTriangle, CheckCircle2, MapPin, ShieldCheck } from "lucide-react";

import { BookingWizard } from "@/components/booking/booking-wizard";
import { PageBand, SectionHeading } from "@/components/site-shell";

export default function PhysiotherapyPage() {
  return (
    <main>
      <section className="premium-mesh relative overflow-hidden pt-28">
        <div className="tech-grid absolute inset-0" aria-hidden />
        <PageBand className="relative">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Physiotherapy MVP"
              title="Request coordinated physiotherapy support."
              description="Submit your details and P2C Growth will coordinate follow-up with a suitable professional partner. Home visits require postcode and address details."
            />
            <div className="mt-8 grid gap-3">
              {[
                [CheckCircle2, "Structured intake", "Service category, language, visit type, and preferred timing."],
                [MapPin, "Home visit logic", "Postcode and address become mandatory when home visit is selected."],
                [ShieldCheck, "Consent hard stop", "Coordinator-only, contact consent, and emergency advice acknowledgements."]
              ].map(([Icon, title, body]) => (
                <div key={String(title)} className="glass-panel rounded-lg p-4">
                  <div className="flex gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-md bg-blue-50 text-ocean">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <p className="font-semibold text-ink">{title as string}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{body as string}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50/90 p-4 text-sm leading-6 text-amber-900 shadow-sm">
              <AlertTriangle className="mb-3 h-5 w-5" aria-hidden />
              P2C Growth LTD does not diagnose or treat medical conditions. Clinical care is provided by qualified professionals. For emergencies, call 999 or NHS urgent care.
            </div>
          </div>
          <BookingWizard />
        </div>
        </PageBand>
      </section>
    </main>
  );
}
