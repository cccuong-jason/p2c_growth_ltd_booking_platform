"use client";

import { AlertTriangle, CheckCircle2, MapPin, ShieldCheck, Activity } from "lucide-react";
import { BookingWizard } from "@/components/booking/booking-wizard";
import { Reveal } from "@/components/home/motion-primitives";
import { SectionBadge } from "@/components/ui/section-badge";

export default function PhysiotherapyPage() {
  return (
    <main className="relative bg-white overflow-hidden selection:bg-blue-100 selection:text-blue-900 font-sans pb-24 md:pb-32">
      {/* Hero Header */}
      <section className="relative pt-32 pb-16 md:pt-48 bg-porcelain overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-50" />
        <div className="relative z-10 w-full px-4 sm:px-6 max-w-5xl mx-auto text-center">
          <Reveal>
            <SectionBadge icon={Activity}>P2C Health</SectionBadge>
            <h1 className="text-4xl md:text-6xl font-extrabold text-ink tracking-tight leading-[1.05] display-heading mb-6">
              Book medical expert <span className="text-ocean">support.</span>
            </h1>
            <p className="text-lg font-medium leading-relaxed text-slate-500 max-w-3xl mx-auto">
              Submit your details and P2C Growth will coordinate follow-up with a suitable medical expert or professional partner.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Wizard Area */}
      <section className="relative z-20 px-4 sm:px-6 max-w-7xl mx-auto -mt-10">
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          <div className="w-full">
            <BookingWizard />
          </div>

          {/* Right Sidebar Trust Signals */}
          <aside className="space-y-6 lg:sticky lg:top-32">
             <Reveal delay={0.2}>
               <div className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
                  <h3 className="text-sm font-black uppercase tracking-widest text-ink mb-6">Trust Signals</h3>
                  <div className="space-y-6">
                    {[
                      [CheckCircle2, "Structured intake", "Clean medical data capture."],
                      [MapPin, "Legal referrals", "Case-specific routing."],
                      [ShieldCheck, "Consent stop", "Mandatory acknowledgements."]
                    ].map(([Icon, title, body], idx) => (
                      <div key={idx} className="flex gap-4 items-start">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ocean/5 text-ocean">
                          {/* @ts-ignore */}
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-ink uppercase tracking-wider">{title as string}</h4>
                          <p className="mt-1 text-xs font-medium text-slate-500">{body as string}</p>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
             </Reveal>

             <Reveal delay={0.3}>
                <div className="rounded-[2rem] border border-amber-100 bg-amber-50/50 p-6 shadow-sm flex items-start gap-4">
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-600" aria-hidden="true" />
                  <p className="text-[11px] font-medium leading-relaxed text-amber-900">
                    P2C Growth is a coordination platform. Clinical opinions are provided by qualified professionals.
                  </p>
                </div>
             </Reveal>
          </aside>
        </div>
      </section>
    </main>
  );
}