"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ChevronRight,
  Contact,
  FileText,
  Languages,
  LayoutTemplate,
  Monitor,
  SearchCheck,
  Smartphone
} from "lucide-react";

import { Reveal } from "@/components/home/motion-primitives";
import { SectionBadge } from "@/components/ui/section-badge";
import type { ServicePageProps } from "@/components/services/service-page-primitives";

const websiteImage = "/assets/homepage/what-we-build/website-development.webp";
const icons = [LayoutTemplate, Monitor, FileText, Contact, Smartphone, Languages, SearchCheck];

export function WebsiteServicePage({ content, primaryHref, secondaryHref, secondaryLabel }: ServicePageProps) {
  return (
    <main className="relative overflow-hidden bg-white pb-24 font-sans selection:bg-blue-100 selection:text-blue-900 md:pb-32">
      <section className="relative flex min-h-[520px] items-center justify-center overflow-hidden bg-porcelain px-4 pb-16 pt-28 sm:px-6 md:pt-36">
        <div className="absolute inset-0">
          <Image
            src={websiteImage}
            alt={content.hero.eyebrow}
            fill
            priority
            className="object-cover opacity-25"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-porcelain/88 backdrop-blur-[1px]" />
        <div className="absolute inset-0 tech-grid opacity-30" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <Reveal>
            <SectionBadge icon={Monitor}>{content.hero.eyebrow}</SectionBadge>
            <h1 className="page-heading mx-auto mb-6 mt-4 max-w-4xl text-3xl font-black leading-tight tracking-tight text-gradient md:text-5xl">
              {content.hero.title}
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-base font-semibold leading-relaxed text-slate-600 md:text-lg">
              {content.hero.subtitle}
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={primaryHref}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-ocean px-6 text-sm font-black text-white shadow-md transition-all hover:scale-[1.02] hover:bg-blue-600 active:scale-[0.98] sm:w-auto"
              >
                {content.hero.primaryCta}
                <ChevronRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href={secondaryHref}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-black text-slate-600 shadow-sm transition-all hover:scale-[1.02] hover:bg-slate-50 active:scale-[0.98] sm:w-auto"
              >
                {content.hero.secondaryCta || secondaryLabel}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative z-20 mx-auto mt-12 max-w-5xl px-4 sm:px-6">
        <Reveal>
          <div className="grid overflow-hidden rounded-3xl border border-blue-100 bg-[#f0f7ff]/70 shadow-sm md:grid-cols-[0.9fr_1.1fr]">
            <div className="p-6 md:p-8">
              <SectionBadge size="sm">{content.overview.title}</SectionBadge>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
                {content.overview.intro}
              </h2>
              <p className="mt-4 text-sm font-bold leading-relaxed text-slate-600">
                {content.overview.body}
              </p>
            </div>
            <div className="relative min-h-[280px] bg-white">
              <Image
                src={websiteImage}
                alt={content.overview.title}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 520px, 100vw"
              />
            </div>
          </div>
        </Reveal>
      </section>

      <section className="relative mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow={content.capabilitiesTitle} title={content.supportStripTitle} />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.capabilities.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <Reveal key={item.title} delay={index * 0.04}>
                <div className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-premium transition-all duration-300 hover:border-ocean/30">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-ocean/10 bg-ocean/5 text-ocean transition-colors group-hover:bg-ocean group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="text-base font-extrabold uppercase tracking-wide text-ink">{item.title}</h3>
                  <p className="mt-3 text-xs font-bold leading-relaxed text-slate-600">{item.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="relative mx-auto mt-28 max-w-7xl rounded-[3rem] border border-slate-200 bg-slate-50 px-4 py-16 sm:px-6 md:py-20">
        <SectionHeading eyebrow={content.processTitle} title={content.finalCta.title} />
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {content.process.map((step, index) => (
            <Reveal key={step.step} delay={index * 0.06}>
              <div className="relative flex h-full flex-col items-center rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-premium">
                <div className="absolute -top-4 rounded-full bg-ocean px-3 py-1 text-xs font-black text-white shadow-md">
                  {step.step}
                </div>
                <h3 className="mt-4 text-sm font-black uppercase tracking-wider text-ink">{step.title}</h3>
                <p className="mt-3 text-[11px] font-bold leading-relaxed text-slate-600">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative mx-auto mt-28 max-w-5xl rounded-[3rem] border border-blue-100 bg-[#f0f7ff] p-10 text-center shadow-premium sm:px-6 md:p-16">
        <div className="absolute inset-0 tech-grid opacity-10" />
        <Reveal>
          <h2 className="text-xl font-extrabold tracking-tight text-ink md:text-3xl">{content.finalCta.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-xs font-semibold leading-relaxed text-slate-600 md:text-sm">
            {content.finalCta.body}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={primaryHref}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-ocean px-8 text-sm font-black text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-blue-600 active:scale-[0.98]"
            >
              {content.finalCta.primaryCta}
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href={secondaryHref}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-blue-100 bg-white px-8 text-sm font-black text-slate-600 shadow-sm transition-all hover:bg-slate-50"
            >
              {secondaryLabel}
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      <Reveal>
        <SectionBadge>{eyebrow}</SectionBadge>
        <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-ink md:text-4xl">{title}</h2>
      </Reveal>
    </div>
  );
}
