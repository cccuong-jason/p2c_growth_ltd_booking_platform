"use client";

import { ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/home/motion-primitives";

export default function TermsPage() {
  return (
    <main className="relative bg-white overflow-hidden selection:bg-blue-100 selection:text-blue-900 font-sans pb-24 md:pb-32">
      <section className="relative pt-32 pb-20 md:pt-40 bg-porcelain">
        <div className="absolute inset-0 tech-grid opacity-50" />
        <div className="relative z-10 px-4 sm:px-6 max-w-4xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full bg-ocean/5 border border-ocean/10 px-4 py-1.5 mb-6">
              <ShieldCheck className="h-4 w-4 text-ocean" />
              <span className="text-[11px] font-bold text-ocean uppercase tracking-[0.2em]">Terms</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-ink tracking-tight leading-[1.1] display-heading mb-6">
              Terms & Conditions
            </h1>
            <p className="text-lg font-medium leading-relaxed text-slate-600 mb-10">
              P2C Growth is a technology and coordination platform. Bookings are requests, not confirmed appointments or clinical advice.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-4 sm:px-6 max-w-4xl mx-auto mt-16">
        <Reveal delay={0.1}>
          <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-ink prose-p:text-slate-600 prose-p:leading-relaxed prose-p:font-medium">
            <p>
              No online payment is collected in Phase 1. Any clinical service, pricing, appointment confirmation, or treatment plan is handled by the relevant professional partner.
            </p>
            <p>
              Users must provide accurate contact and visit information. Emergency or urgent medical situations should be directed to 999, NHS 111, or urgent care.
            </p>
          </div>
        </Reveal>
      </section>
    </main>
  );
}