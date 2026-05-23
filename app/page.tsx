import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CalendarClock,
  CheckCircle2,
  Languages,
  Network,
  Radar,
  ShieldCheck,
  Sparkles,
  Workflow
} from "lucide-react";

import { PageBand, SectionHeading } from "@/components/site-shell";
import { getDictionary } from "@/lib/i18n/dictionary";

const stats = [
  ["42 sec", "guided intake"],
  ["4 lanes", "dispatch queue"],
  ["EN+", "language-ready"]
];

const cockpitRows = [
  ["New request", "Elderly mobility", "Home visit", "Live"],
  ["Coordinator", "Partner matching", "Clinic route", "Queued"],
  ["Follow-up", "Email acknowledgement", "Consent logged", "Sent"]
];

const workflowSteps = [
  ["01", "Capture", "Structured forms collect consent, language, visit type, and clinical context."],
  ["02", "Route", "Internal dispatch sees clean queues and home-visit location requirements."],
  ["03", "Coordinate", "P2C follows up with professional partners and keeps the request traceable."]
];

export default function HomePage() {
  const copy = getDictionary().home;

  return (
    <main>
      <section className="orbital-hero relative overflow-hidden pt-32 text-white">
        <div className="orbital-stars absolute inset-0" aria-hidden />
        <div className="absolute left-1/2 top-[-38rem] h-[78rem] w-[78rem] -translate-x-1/2 opacity-95 md:top-[-44rem] md:h-[96rem] md:w-[96rem]" aria-hidden>
          <div className="orbital-globe relative h-full w-full" />
        </div>
        <svg className="pointer-events-none absolute left-1/2 top-12 hidden h-[38rem] w-[70rem] -translate-x-1/2 opacity-80 md:block" viewBox="0 0 1120 608" aria-hidden>
          <path className="orbit-line" d="M112 386 C 292 148, 652 92, 1012 306" />
          <path className="orbit-line orbit-line-secondary" d="M220 300 C 440 458, 754 430, 938 202" />
          <path className="orbit-line" d="M334 132 C 478 244, 690 262, 826 142" />
        </svg>
        <span className="orbit-node absolute left-[18%] top-[27%] hidden h-3 w-3 rounded-full bg-cyan-200 md:block" aria-hidden />
        <span className="orbit-node absolute left-[61%] top-[19%] hidden h-2.5 w-2.5 rounded-full bg-emerald-200 md:block" style={{ animationDelay: "0.8s" }} aria-hidden />
        <span className="orbit-node absolute right-[16%] top-[35%] hidden h-3 w-3 rounded-full bg-blue-200 md:block" style={{ animationDelay: "1.4s" }} aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#f6fbff]" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-24 pt-10 lg:grid-cols-[0.86fr_1fr] lg:items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-md border border-cyan-200/20 bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100 shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4" aria-hidden />
              {copy.eyebrow}
            </div>
            <h1 className="display-heading mt-6 max-w-4xl text-5xl font-bold leading-[1.02] text-white md:text-7xl">
              Next-gen booking infrastructure for <span className="text-cyan-200">high-trust service teams.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{copy.subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/services/physiotherapy" className="button-primary justify-center">
                Start physio request <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link href="/services" className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-white/20 bg-white px-5 text-sm font-semibold text-ink shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-50">
                Explore systems
              </Link>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              {stats.map(([value, label]) => (
                <div key={value} className="rounded-lg border border-cyan-100/15 bg-slate-950/45 p-4 shadow-sm backdrop-blur">
                  <p className="text-lg font-bold text-white">{value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-cyan-100">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="pulse-soft absolute -right-4 top-8 h-28 w-28 rounded-full border border-cyan-200 bg-cyan-100/50 blur-xl" />
            <div className="float-slow absolute -left-4 top-24 z-20 hidden rounded-lg border border-white/60 bg-white/90 p-4 shadow-soft-xl backdrop-blur md:block">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-md bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">Consent captured</p>
                  <p className="text-xs text-slate-500">Legal hard-stop passed</p>
                </div>
              </div>
            </div>
            <div className="cockpit-panel rounded-xl p-4 text-white md:p-6">
              <div className="relative z-10 rounded-lg border border-white/10 bg-white/8 p-4">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">Dispatch cockpit</p>
                    <h2 className="mt-2 text-2xl font-bold">P2C Growth OS</h2>
                  </div>
                  <span className="rounded-md bg-cyan-300 px-3 py-1 text-xs font-bold text-slate-950">Live MVP</span>
                </div>
                <div className="grid gap-3 md:grid-cols-[1fr_0.7fr]">
                  <div className="rounded-lg border border-white/10 bg-white/8 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <p className="font-semibold">Request pipeline</p>
                      <Workflow className="h-5 w-5 text-cyan-200" aria-hidden />
                    </div>
                    <div className="space-y-3">
                      {cockpitRows.map(([lane, title, meta, status]) => (
                        <div key={title} className="grid grid-cols-[1fr_auto] gap-3 rounded-md border border-white/10 bg-slate-950/35 p-3">
                          <div>
                            <p className="text-xs uppercase tracking-wide text-slate-400">{lane}</p>
                            <p className="mt-1 text-sm font-semibold">{title}</p>
                            <p className="mt-1 text-xs text-slate-300">{meta}</p>
                          </div>
                          <span className="h-fit rounded-md bg-white/10 px-2 py-1 text-xs text-cyan-100">{status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-3">
                    {[
                      [Languages, "Language-ready", "EN, zh-Hant, zh-Hans, vi"],
                      [Radar, "Home routing", "Postcode + address logic"],
                      [ShieldCheck, "Compliance", "Consent timestamps"]
                    ].map(([Icon, title, body]) => (
                      <div key={String(title)} className="rounded-lg border border-white/10 bg-white/8 p-4">
                        <Icon className="h-5 w-5 text-cyan-200" aria-hidden />
                        <p className="mt-3 text-sm font-semibold">{title as string}</p>
                        <p className="mt-1 text-xs text-slate-300">{body as string}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageBand className="-mt-6">
        <div className="grid gap-4 lg:grid-cols-4">
          {[
            [CalendarClock, "Booking systems", "Fast request capture with operational handoff.", "lg:col-span-2"],
            [Bot, "Workflow automation", "Email and CRM flows that reduce manual chasing.", ""],
            [Network, "Partner platforms", "Customer-partner matching for service networks.", ""],
            [ShieldCheck, "Compliance clarity", "Consent, privacy, and disclaimer-first experiences.", "lg:col-span-2"],
            [Workflow, "Internal ops", "A private dispatch layer for queues, statuses, and follow-up.", ""],
            [Sparkles, "Premium web presence", "A product-quality interface for high-trust healthcare coordination.", ""]
          ].map(([Icon, title, body, span]) => (
            <article key={String(title)} className={`glass-panel rounded-lg p-6 transition hover:-translate-y-1 ${span as string}`}>
              <Icon className="h-6 w-6 text-ocean" aria-hidden />
              <h2 className="mt-5 font-semibold text-ink">{title as string}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{body as string}</p>
            </article>
          ))}
        </div>
      </PageBand>

      <PageBand className="pt-0">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <SectionHeading
            eyebrow="Phase 1"
            title="A focused physiotherapy request engine."
            description="No payments, no marketplace complexity, no vendor portal. Phase 1 captures high-quality patient requests and gives P2C a controlled internal dispatch workflow."
          />
          <div className="grid gap-3">
            {workflowSteps.map(([number, title, body]) => (
              <div key={number} className="group grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-panel transition hover:-translate-y-1 hover:border-blue-200 md:grid-cols-[72px_1fr]">
                <span className="grid h-14 w-14 place-items-center rounded-md bg-slate-950 text-lg font-bold text-cyan-200">{number}</span>
                <div>
                  <h2 className="font-semibold text-ink">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageBand>

      <PageBand className="pt-0">
        <div className="relative overflow-hidden rounded-xl bg-ink p-6 text-white shadow-soft-xl md:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_26%,rgba(69,221,255,0.28),transparent_30%)]" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">Ready for local review</p>
              <h2 className="display-heading mt-3 max-w-2xl text-3xl font-bold md:text-5xl">A sharper product surface for P2C Growth Phase 1.</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                The UI now centers the actual booking and dispatch product rather than a generic service website.
              </p>
            </div>
            <Link href="/services/physiotherapy" className="button-primary justify-center bg-cyan-300 text-slate-950 hover:bg-cyan-200">
              Open booking flow <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </PageBand>
    </main>
  );
}
