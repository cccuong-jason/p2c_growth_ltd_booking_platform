"use client";

import Link from "next/link";
import {
  Bell,
  CalendarClock,
  Check,
  ChevronRight,
  ClipboardList,
  Database,
  Gauge,
  MailCheck,
  MessageSquareText,
  Phone,
  Rows3,
  Sheet,
  Workflow
} from "lucide-react";

import { Reveal } from "@/components/home/motion-primitives";
import { SectionBadge } from "@/components/ui/section-badge";
import type { ServicePageProps } from "@/components/services/service-page-primitives";

const sourceIcons = [Phone, MessageSquareText, MailCheck, Sheet];
const moduleIcons = [ClipboardList, MailCheck, Bell, Rows3, Database, Gauge, CalendarClock];

export function AutomationServicePage({ content, primaryHref, secondaryHref, secondaryLabel }: ServicePageProps) {
  const channels = getChannelLabels(content);

  return (
    <main className="relative overflow-hidden bg-white pb-24 font-sans selection:bg-blue-100 selection:text-blue-900 md:pb-32">
      <section className="relative flex min-h-[520px] items-center justify-center overflow-hidden bg-porcelain px-4 pb-16 pt-28 sm:px-6 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(11,78,199,0.14),transparent_34%),radial-gradient(circle_at_80%_8%,rgba(0,153,204,0.14),transparent_30%)]" />
        <div className="absolute inset-0 tech-grid opacity-30" />

        <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <div className="text-center lg:text-left">
              <SectionBadge icon={Workflow}>{content.hero.eyebrow}</SectionBadge>
              <h1 className="page-heading mb-6 mt-4 max-w-4xl text-3xl font-black leading-tight tracking-tight text-gradient md:text-5xl">
                {content.hero.title}
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-base font-semibold leading-relaxed text-slate-600 md:text-lg lg:mx-0">
                {content.hero.subtitle}
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row lg:items-start">
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
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <WorkflowPreview content={content} channels={channels} />
          </Reveal>
        </div>
      </section>

      <section className="relative z-20 mx-auto mt-12 max-w-5xl px-4 sm:px-6">
        <Reveal>
          <div className="rounded-3xl border border-blue-100 bg-[#f0f7ff]/70 p-6 shadow-sm md:p-8">
            <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-center">
              <div>
                <SectionBadge size="sm">{content.overview.title}</SectionBadge>
                <h2 className="text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
                  {content.overview.intro}
                </h2>
              </div>
              <p className="text-sm font-bold leading-relaxed text-slate-600">
                {content.overview.body}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="relative mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow={content.capabilitiesTitle} title={content.supportStripTitle} />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.capabilities.map((item, index) => {
            const Icon = moduleIcons[index % moduleIcons.length];
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
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
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

      <section className="relative mx-auto mt-28 max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow={content.fitTitle} title={content.reasonsTitle} />
        <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-3">
          {content.fitItems.map((item) => (
            <span
              key={item}
              className="rounded-full border border-blue-100 bg-[#f0f7ff] px-4 py-2 text-xs font-black leading-6 text-slate-700"
            >
              {item}
            </span>
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

function WorkflowPreview({
  content,
  channels
}: {
  content: ServicePageProps["content"];
  channels: string[];
}) {
  return (
    <div className="rounded-3xl border border-blue-100 bg-white/80 p-5 shadow-premium backdrop-blur">
      <div className="grid gap-4 sm:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-3">
          {channels.map((channel, index) => {
            const Icon = sourceIcons[index % sourceIcons.length];
            return (
              <div key={channel} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <Icon className="h-4 w-4 text-ocean" aria-hidden />
                <span className="text-xs font-black text-slate-700">{channel}</span>
              </div>
            );
          })}
        </div>
        <div className="rounded-3xl border border-blue-100 bg-[#f0f7ff] p-5">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ocean text-white">
              <Workflow className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-ocean">{content.processTitle}</p>
              <h3 className="text-base font-extrabold text-ink">{content.capabilities[0]?.title}</h3>
            </div>
          </div>
          <div className="space-y-3">
            {content.process.slice(0, 4).map((step) => (
              <div key={step.step} className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-white p-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ocean text-[10px] font-black text-white">
                  {step.step}
                </div>
                <span className="text-xs font-black text-slate-700">{step.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
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

function getChannelLabels(content: ServicePageProps["content"]) {
  const labels = content.request?.contactChannelOptions?.slice(0, 4).map((option) => option.label);
  return labels && labels.length >= 4 ? labels : content.supportStrip.slice(0, 4);
}
