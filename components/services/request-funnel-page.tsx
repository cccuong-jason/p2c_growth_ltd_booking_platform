"use client";

import Link from "next/link";
import { ArrowLeft, MessageCircle, PhoneCall } from "lucide-react";

import { Reveal } from "@/components/home/motion-primitives";
import { BentoCard } from "@/components/ui/bento-card";
import { SectionBadge } from "@/components/ui/section-badge";

interface RequestContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  formTitle: string;
  formDescription: string;
  nextStepsTitle: string;
  nextSteps: readonly string[];
  contactTitle: string;
  contactBody: string;
  phoneLabel: string;
  whatsappLabel: string;
  consentNote: string;
  backLabel: string;
}

export function RequestFunnelPage({
  content,
  backHref,
  children
}: {
  content: RequestContent;
  backHref: string;
  children: React.ReactNode;
}) {
  return (
    <main className="relative overflow-hidden bg-white pb-24 font-sans selection:bg-blue-100 selection:text-blue-900 md:pb-32">
      <section className="relative overflow-hidden bg-porcelain px-4 pb-14 pt-28 sm:px-6 md:pb-16 md:pt-40">
        <div className="absolute inset-0 tech-grid opacity-40" />
        <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top_left,rgba(11,78,199,0.12),transparent_42%),radial-gradient(circle_at_top_right,rgba(0,153,204,0.1),transparent_36%)]" />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <Link
              href={backHref}
              className="mb-6 inline-flex items-center gap-2 text-sm font-black text-slate-600 transition-colors hover:text-ocean"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              {content.backLabel}
            </Link>
            <SectionBadge>{content.eyebrow}</SectionBadge>
            <h1 className="page-heading max-w-4xl text-ink">{content.title}</h1>
            <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-600 md:text-lg">
              {content.subtitle}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto -mt-6 max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Reveal>
            <BentoCard className="rounded-[2rem] p-7 md:p-10">
              <h2 className="text-2xl font-extrabold tracking-tight text-ink">{content.formTitle}</h2>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{content.formDescription}</p>
              <div className="mt-8">{children}</div>
            </BentoCard>
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={0.04}>
              <BentoCard className="rounded-[2rem] p-7 md:p-8">
                <h3 className="text-lg font-extrabold tracking-tight text-ink">{content.nextStepsTitle}</h3>
                <div className="mt-5 space-y-4">
                  {content.nextSteps.map((step, index) => (
                    <div key={step} className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ocean text-xs font-black text-white">
                        {index + 1}
                      </div>
                      <p className="text-sm font-semibold leading-6 text-slate-700">{step}</p>
                    </div>
                  ))}
                </div>
              </BentoCard>
            </Reveal>

            <Reveal delay={0.08}>
              <BentoCard className="rounded-[2rem] bg-slate-950 p-7 text-white md:p-8">
                <h3 className="text-lg font-extrabold tracking-tight">{content.contactTitle}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-200">{content.contactBody}</p>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                    <PhoneCall className="h-4 w-4 text-cyan-300" aria-hidden />
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-100">{content.phoneLabel}</p>
                      <p className="mt-1 text-sm font-bold text-white">+44 (0) 20 1234 5678</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                    <MessageCircle className="h-4 w-4 text-cyan-300" aria-hidden />
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-100">{content.whatsappLabel}</p>
                      <p className="mt-1 text-sm font-bold text-white">+44 (0) 20 1234 5678</p>
                    </div>
                  </div>
                </div>
                <p className="mt-6 text-xs font-bold leading-6 text-slate-300">{content.consentNote}</p>
              </BentoCard>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
