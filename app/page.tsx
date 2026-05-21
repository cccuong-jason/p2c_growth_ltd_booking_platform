import Link from "next/link";
import { ArrowRight, Bot, CalendarClock, Network, ShieldCheck } from "lucide-react";

import { PageBand, SectionHeading } from "@/components/site-shell";
import { getDictionary } from "@/lib/i18n/dictionary";

const stats = [
  ["Phase", "Physio MVP"],
  ["Model", "Lead coordination"],
  ["Focus", "UK communities"]
];

export default function HomePage() {
  const copy = getDictionary().home;

  return (
    <main>
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_50%_0%,rgba(18,100,255,0.18),transparent_62%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-[1fr_0.9fr] md:py-28">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ocean">{copy.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-tight text-ink md:text-7xl">{copy.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{copy.subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/services/physiotherapy" className="button-primary justify-center">
                Start physio request <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link href="/services" className="button-secondary justify-center">
                Explore systems
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-porcelain p-5 shadow-soft-xl">
            <div className="rounded-lg bg-ink p-5 text-white">
              <div className="grid gap-3">
                {[
                  ["Booking intake", "Structured request forms, consent, and validation"],
                  ["Partner routing", "Operational dashboard for internal dispatch"],
                  ["Workflow comms", "Email acknowledgements and follow-up clarity"]
                ].map(([title, body]) => (
                  <div key={title} className="rounded-md border border-white/10 bg-white/5 p-4">
                    <p className="font-semibold">{title}</p>
                    <p className="mt-1 text-sm text-slate-300">{body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {stats.map(([label, value]) => (
                <div key={label} className="rounded-md border border-slate-200 bg-white p-3">
                  <p className="text-xs uppercase text-slate-500">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-ink">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PageBand>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            [CalendarClock, "Booking systems", "Fast request capture with operational handoff."],
            [Bot, "Workflow automation", "Email and CRM flows that reduce manual chasing."],
            [Network, "Partner platforms", "Customer-partner matching for service networks."],
            [ShieldCheck, "Compliance clarity", "Consent, privacy, and disclaimer-first experiences."]
          ].map(([Icon, title, body]) => (
            <article key={String(title)} className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
              <Icon className="h-6 w-6 text-ocean" aria-hidden />
              <h2 className="mt-5 font-semibold text-ink">{title as string}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{body as string}</p>
            </article>
          ))}
        </div>
      </PageBand>

      <PageBand className="pt-0">
        <SectionHeading
          eyebrow="Phase 1"
          title="A focused physiotherapy request engine."
          description="No payments, no marketplace complexity, no vendor portal. Phase 1 captures high-quality patient requests and gives P2C a controlled internal dispatch workflow."
        />
      </PageBand>
    </main>
  );
}
