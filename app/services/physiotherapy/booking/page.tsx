"use client";

import Link from "next/link";
import { ChevronLeft, Activity } from "lucide-react";
import { BookingWizard } from "@/components/booking/booking-wizard";
import { Reveal } from "@/components/home/motion-primitives";
import { SectionBadge } from "@/components/ui/section-badge";
import { useLocale } from "@/components/providers/locale-provider";
import { getDictionary } from "@/lib/i18n/dictionary";

export default function PhysiotherapyBookingPage() {
  const { locale } = useLocale();
  const d = getDictionary(locale);
  const wizardCopy = d.physiotherapy.bookingWizard;

  return (
    <main className="relative bg-white min-h-screen overflow-hidden selection:bg-blue-100 selection:text-blue-900 font-sans pt-28 pb-24 md:pb-32">
      <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />
      
      <div className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/services/physiotherapy"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-ocean transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            {wizardCopy.backToLanding}
          </Link>
        </div>

        {/* Form Container */}
        <div className="bg-slate-50 rounded-[2.5rem] border border-slate-200 p-6 md:p-12 shadow-premium">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <Reveal>
              <SectionBadge icon={Activity} size="lg">
                {wizardCopy.requestSystem}
              </SectionBadge>
              <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-ink mt-2 mb-4">
                {wizardCopy.submitTitle}
              </h1>
              <p className="text-sm font-semibold text-slate-500 leading-relaxed">
                {wizardCopy.submitDesc}
              </p>
            </Reveal>
          </div>
          <div className="relative z-30">
            <BookingWizard />
          </div>
        </div>
      </div>
    </main>
  );
}
