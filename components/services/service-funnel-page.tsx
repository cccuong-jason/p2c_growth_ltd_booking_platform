"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Layers3,
  Monitor,
  Sparkles,
  Workflow,
  MailCheck,
  Bell,
  ClipboardList,
  PanelsTopLeft,
  LayoutTemplate,
  Languages,
  Smartphone,
  Gauge,
  MessagesSquare
} from "lucide-react";

import { Reveal } from "@/components/home/motion-primitives";
import { BentoCard } from "@/components/ui/bento-card";
import { SectionBadge } from "@/components/ui/section-badge";

interface FunnelCardItem {
  title: string;
  body: string;
}

interface FunnelProcessItem extends FunnelCardItem {
  step: string;
}

interface FunnelContent {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  overview: {
    title: string;
    intro: string;
    body: string;
  };
  capabilitiesTitle: string;
  capabilities: readonly FunnelCardItem[];
  reasonsTitle: string;
  reasons: readonly FunnelCardItem[];
  fitTitle: string;
  fitItems: readonly string[];
  processTitle: string;
  process: readonly FunnelProcessItem[];
  supportStripTitle: string;
  supportStrip: readonly string[];
  finalCta: {
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
  };
}

const websiteIcons = [LayoutTemplate, Monitor, Sparkles, PanelsTopLeft, Languages, Smartphone, Gauge];
const automationIcons = [ClipboardList, MailCheck, Bell, Workflow, Layers3, MessagesSquare, Gauge];

export function ServiceFunnelPage({
  content,
  primaryHref,
  secondaryHref,
  secondaryLabel,
  accent = "website"
}: {
  content: FunnelContent;
  primaryHref: string;
  secondaryHref: string;
  secondaryLabel: string;
  accent?: "website" | "automation";
}) {
  const isAutomation = accent === "automation";
  const capabilityIcons = isAutomation ? automationIcons : websiteIcons;
  const featuredCapabilities = content.capabilities.slice(0, isAutomation ? 3 : 2);
  const remainingCapabilities = content.capabilities.slice(isAutomation ? 3 : 2);

  return (
    <main className="relative overflow-hidden bg-white pb-24 font-sans selection:bg-blue-100 selection:text-blue-900 md:pb-32">
      <section className="relative overflow-hidden bg-porcelain px-4 pb-20 pt-32 sm:px-6 md:pb-24 md:pt-44">
        <div className="absolute inset-0 tech-grid opacity-40" />
        <div
          className={`absolute inset-x-0 top-0 h-[560px] ${
            isAutomation
              ? "bg-[radial-gradient(circle_at_top_right,rgba(11,78,199,0.18),transparent_44%),radial-gradient(circle_at_top_left,rgba(15,23,42,0.08),transparent_34%)]"
              : "bg-[radial-gradient(circle_at_top_left,rgba(11,78,199,0.14),transparent_44%),radial-gradient(circle_at_top_right,rgba(0,153,204,0.12),transparent_34%)]"
          }`}
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <Reveal>
              <div>
                <SectionBadge icon={isAutomation ? Workflow : Monitor}>{content.hero.eyebrow}</SectionBadge>
                <h1 className="page-heading mb-6 max-w-3xl text-ink">{content.hero.title}</h1>
                <p className="max-w-2xl text-base font-semibold leading-8 text-slate-600 md:text-lg">
                  {content.hero.subtitle}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={primaryHref}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-ocean px-6 text-sm font-black text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] hover:bg-blue-600 active:scale-[0.98]"
                  >
                    {content.hero.primaryCta}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <Link
                    href={secondaryHref}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-black text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-[0.98]"
                  >
                    {content.hero.secondaryCta || secondaryLabel}
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {content.supportStrip.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-black text-slate-600 shadow-sm backdrop-blur"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              {isAutomation ? (
                <AutomationHeroVisual content={content} />
              ) : (
                <WebsiteHeroVisual content={content} />
              )}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6 md:mt-20">
        <Reveal>
          <SectionBadge size="sm">{content.capabilitiesTitle}</SectionBadge>
        </Reveal>

        {isAutomation ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <BentoCard className="rounded-[2rem] border-slate-200 bg-slate-950 p-7 text-white shadow-[0_24px_60px_rgba(15,23,42,0.16)] md:p-8">
                <div className="grid gap-4 sm:grid-cols-3">
                  {featuredCapabilities.map((item, index) => {
                    const Icon = capabilityIcons[index % capabilityIcons.length];
                    return (
                      <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-cyan-300">
                          <Icon className="h-5 w-5" aria-hidden />
                        </div>
                        <h2 className="text-sm font-extrabold uppercase tracking-wide text-white">{item.title}</h2>
                        <p className="mt-3 text-xs font-semibold leading-6 text-slate-300">{item.body}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                  <div className="space-y-3">
                    {content.process.map((item) => (
                      <div key={item.step} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-400/15 text-xs font-black text-cyan-300">
                          {item.step}
                        </div>
                        <div>
                          <p className="text-sm font-extrabold text-white">{item.title}</p>
                          <p className="mt-1 text-xs font-semibold leading-6 text-slate-300">{item.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </BentoCard>
            </Reveal>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {remainingCapabilities.map((item, index) => {
                const Icon = capabilityIcons[(index + featuredCapabilities.length) % capabilityIcons.length];
                return (
                  <Reveal key={item.title} delay={index * 0.05}>
                    <BentoCard className="rounded-[1.75rem] p-6">
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-ocean/10 text-ocean">
                        <Icon className="h-5 w-5" aria-hidden />
                      </div>
                      <h3 className="text-base font-extrabold tracking-tight text-ink">{item.title}</h3>
                      <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.body}</p>
                    </BentoCard>
                  </Reveal>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <BentoCard className="h-full rounded-[2.2rem] overflow-hidden border-slate-200 p-0 shadow-premium">
                <div className="grid h-full gap-0 md:grid-cols-[0.92fr_1.08fr]">
                  <div className="flex flex-col justify-between bg-slate-950 p-7 text-white md:p-8">
                    <div>
                      <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-cyan-300">
                        {content.overview.title}
                      </div>
                      <h2 className="text-2xl font-extrabold tracking-tight">{featuredCapabilities[0]?.title}</h2>
                      <p className="mt-4 text-sm font-semibold leading-7 text-slate-300">{featuredCapabilities[0]?.body}</p>
                    </div>
                    <div className="mt-8 grid gap-3">
                      {content.supportStrip.slice(0, 4).map((item) => (
                        <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-slate-100">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative min-h-[320px] bg-white">
                    <Image
                      src="/assets/homepage/what-we-build/website-development.webp"
                      alt="Website design preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/18 to-white/0" />
                    <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/80 bg-white/92 p-5 shadow-xl backdrop-blur">
                      <p className="text-[11px] font-black uppercase tracking-[0.24em] text-ocean">{featuredCapabilities[1]?.title}</p>
                      <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{featuredCapabilities[1]?.body}</p>
                    </div>
                  </div>
                </div>
              </BentoCard>
            </Reveal>

            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              {remainingCapabilities.map((item, index) => {
                const Icon = capabilityIcons[(index + featuredCapabilities.length) % capabilityIcons.length];
                return (
                  <Reveal key={item.title} delay={index * 0.05}>
                    <BentoCard className="rounded-[1.75rem] p-6">
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-ocean/10 text-ocean">
                        <Icon className="h-5 w-5" aria-hidden />
                      </div>
                      <h3 className="text-base font-extrabold tracking-tight text-ink">{item.title}</h3>
                      <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.body}</p>
                    </BentoCard>
                  </Reveal>
                );
              })}
            </div>
          </div>
        )}
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <Reveal>
            <BentoCard className={`h-full rounded-[2rem] p-8 md:p-10 ${isAutomation ? "bg-white" : "bg-slate-950 text-white"}`}>
              <SectionBadge size="sm" className={isAutomation ? "" : "border-white/10 bg-white/10 text-white"}>
                {content.reasonsTitle}
              </SectionBadge>
              <div className="mt-3 space-y-5">
                {content.reasons.map((reason, index) => (
                  <div
                    key={reason.title}
                    className={`flex gap-4 ${index < content.reasons.length - 1 ? isAutomation ? "border-b border-slate-100 pb-5" : "border-b border-white/10 pb-5" : ""}`}
                  >
                    <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${isAutomation ? "bg-emerald-50 text-emerald-600" : "bg-white/10 text-cyan-300"}`}>
                      <CheckCircle2 className="h-4 w-4" aria-hidden />
                    </div>
                    <div>
                      <h3 className={`text-sm font-extrabold uppercase tracking-wide ${isAutomation ? "text-ink" : "text-white"}`}>{reason.title}</h3>
                      <p className={`mt-2 text-sm font-semibold leading-7 ${isAutomation ? "text-slate-600" : "text-slate-300"}`}>{reason.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </BentoCard>
          </Reveal>

          <Reveal delay={0.06}>
            <BentoCard className="h-full rounded-[2rem] p-8 md:p-10">
              <SectionBadge size="sm">{content.fitTitle}</SectionBadge>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {content.fitItems.map((item) => (
                  <div
                    key={item}
                    className={`rounded-2xl border px-4 py-4 text-sm font-bold leading-6 ${isAutomation ? "border-slate-200 bg-slate-50/80 text-slate-700" : "border-blue-100 bg-blue-50/50 text-slate-700"}`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </BentoCard>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <Reveal>
            <BentoCard className="rounded-[2rem] p-8 md:p-10">
              <SectionBadge size="sm">{content.processTitle}</SectionBadge>
              <div className="mt-5 space-y-4">
                {content.process.map((item) => (
                  <div key={item.step} className="flex gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ocean text-sm font-black text-white">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold tracking-tight text-ink">{item.title}</h3>
                      <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </BentoCard>
          </Reveal>

          <Reveal delay={0.06}>
            {isAutomation ? (
              <BentoCard className="rounded-[2rem] border-slate-200 bg-slate-950 p-8 text-white shadow-premium md:p-10">
                <SectionBadge size="sm" className="border-white/10 bg-white/10 text-white">
                  {content.supportStripTitle}
                </SectionBadge>
                <div className="mt-6 grid gap-3">
                  {content.supportStrip.map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                      <ChevronRight className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden />
                      <span className="text-sm font-bold leading-6 text-slate-100">{item}</span>
                    </div>
                  ))}
                </div>
              </BentoCard>
            ) : (
              <BentoCard className="rounded-[2rem] border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-ocean p-8 text-white shadow-premium md:p-10">
                <SectionBadge size="sm" className="border-white/10 bg-white/10 text-white">
                  {content.supportStripTitle}
                </SectionBadge>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {content.supportStrip.map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-sm font-bold leading-6 text-white/90 backdrop-blur">
                      {item}
                    </div>
                  ))}
                </div>
              </BentoCard>
            )}
          </Reveal>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className={`overflow-hidden rounded-[2.5rem] px-6 py-10 shadow-[0_30px_80px_rgba(11,78,199,0.18)] md:px-10 md:py-14 ${isAutomation ? "bg-ocean text-white" : "bg-white border border-slate-200"}`}>
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <p className={`text-[11px] font-black uppercase tracking-[0.24em] ${isAutomation ? "text-blue-100" : "text-ocean"}`}>P2C Growth</p>
                <h2 className={`mt-4 text-3xl font-extrabold tracking-tight md:text-4xl ${isAutomation ? "text-white" : "text-ink"}`}>{content.finalCta.title}</h2>
                <p className={`mt-4 max-w-2xl text-sm font-semibold leading-7 md:text-base ${isAutomation ? "text-blue-50" : "text-slate-600"}`}>{content.finalCta.body}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link
                  href={primaryHref}
                  className={`inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-black shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] ${isAutomation ? "bg-white text-ocean" : "bg-ocean text-white"}`}
                >
                  {content.finalCta.primaryCta}
                </Link>
                <Link
                  href={secondaryHref}
                  className={`inline-flex h-12 items-center justify-center gap-2 rounded-xl border px-6 text-sm font-black transition-all hover:bg-slate-50 active:scale-[0.98] ${isAutomation ? "border-white/20 bg-white/10 text-white hover:bg-white/15" : "border-slate-200 bg-white text-slate-700"}`}
                >
                  {secondaryLabel}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

function WebsiteHeroVisual({ content }: { content: FunnelContent }) {
  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
        <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-4">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
          <div className="ml-3 rounded-full bg-slate-100 px-4 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
            p2cgrowth.com
          </div>
        </div>
        <div className="grid gap-0 md:grid-cols-[1.08fr_0.92fr]">
          <div className="relative min-h-[320px] bg-slate-950">
            <Image
              src="/assets/homepage/what-we-build/website-development.webp"
              alt="Website presentation"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
          </div>
          <div className="flex flex-col justify-between p-6 md:p-7">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-ocean">{content.overview.title}</p>
              <p className="mt-4 text-lg font-extrabold leading-8 text-ink">{content.overview.intro}</p>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">{content.overview.body}</p>
            </div>
            <div className="mt-6 grid gap-3">
              {content.supportStrip.slice(0, 3).map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-sm font-bold text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AutomationHeroVisual({ content }: { content: FunnelContent }) {
  return (
    <div className="relative overflow-hidden rounded-[2.2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_30px_80px_rgba(15,23,42,0.18)] md:p-7">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_30%)]" />
      <div className="relative">
        <div className="grid gap-4 md:grid-cols-3">
          {content.process.slice(0, 3).map((item) => (
            <div key={item.step} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/15 text-xs font-black text-cyan-300">
                {item.step}
              </div>
              <p className="text-sm font-extrabold text-white">{item.title}</p>
              <p className="mt-2 text-xs font-semibold leading-6 text-slate-300">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-[1.75rem] border border-white/10 bg-white/5 p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {content.capabilities.slice(0, 4).map((item, index) => {
              const Icon = automationIcons[index % automationIcons.length];
              return (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-4">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-2xl bg-white/10 text-cyan-300">
                    <Icon className="h-4 w-4" aria-hidden />
                  </div>
                  <p className="text-sm font-extrabold text-white">{item.title}</p>
                  <p className="mt-2 text-xs font-semibold leading-6 text-slate-300">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
