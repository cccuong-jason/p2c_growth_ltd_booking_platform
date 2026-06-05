"use client";

import Link from "next/link";
import { ArrowLeft, Rocket } from "lucide-react";
import { Reveal } from "@/components/home/motion-primitives";

export default function ComingSoonPage() {
  return (
    <main className="relative bg-white overflow-hidden selection:bg-blue-100 selection:text-blue-900 font-sans min-h-[85vh] flex items-center justify-center">
      <div className="absolute inset-0 tech-grid opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ocean/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 px-4 sm:px-6 text-center max-w-2xl mx-auto">
        <Reveal>
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-ocean/10 text-ocean shadow-sm">
            <Rocket className="h-10 w-10" />
          </div>
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-ocean mb-4">Under Construction</p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-ink tracking-tight leading-[1.05] display-heading mb-6">
            Coming Soon
          </h1>
          <p className="text-lg font-medium leading-relaxed text-slate-500 mb-10">
            We are currently building this service module. Our primary focus right now is the Medical Experts Booking MVP. Check back later for updates on this feature.
          </p>
          <Link 
            href="/" 
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 px-8 text-sm font-bold text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-ink active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" /> Return Home
          </Link>
        </Reveal>
      </div>
    </main>
  );
}