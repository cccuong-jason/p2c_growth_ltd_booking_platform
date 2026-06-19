"use client";

import Link from "next/link";
import { ArrowRight, LayoutDashboard, Monitor, Workflow, UserCheck, Activity } from "lucide-react";
import { Reveal } from "@/components/home/motion-primitives";
import { BorderBeam } from "@/components/ui/border-beam";
import { ProgressiveBlur } from "@/components/magicui/progressive-blur";
import { SectionBadge } from "@/components/ui/section-badge";
import { BentoCard } from "@/components/ui/bento-card";

const services = [
  {
    title: "P2C Health",
    body: "A guided booking and referral workflow for patients, legal cases, insurers, and expert follow-up.",
    href: "/services/physiotherapy",
    icon: Activity,
    isPrimary: true,
  },
  {
    title: "Website Development",
    body: "Premium conversion-focused websites for UK service businesses.",
    href: "/coming-soon",
    icon: Monitor,
    isPrimary: false,
  },
  {
    title: "Booking System & Email Automation",
    body: "Forms, workflows, confirmations, notifications, and operational handoff.",
    href: "/coming-soon",
    icon: Workflow,
    isPrimary: false,
  },
  {
    title: "Mini CRM",
    body: "Lightweight dashboards for teams managing high-trust customer relationships.",
    href: "/coming-soon",
    icon: LayoutDashboard,
    isPrimary: false,
  },
  {
    title: "Customer-Partner Platform",
    body: "A reusable coordination layer between customers, internal teams, and professional partners.",
    href: "/coming-soon",
    icon: UserCheck,
    isPrimary: false,
  }
];

export default function ServicesPage() {
  return (
    <main className="relative bg-white overflow-hidden selection:bg-blue-100 selection:text-blue-900 font-sans pb-24">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-porcelain overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-50" />
        <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-5xl mx-auto">
          <Reveal>
            <SectionBadge icon={LayoutDashboard}>Our Services</SectionBadge>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="page-heading text-ink mb-6">
              Technology services for <br /><span className="text-ocean">service businesses.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-2xl text-lg font-semibold leading-relaxed text-slate-600 md:text-xl">
              P2C Growth LTD builds practical digital systems: websites, booking workflows, CRM tools, and partner coordination platforms.
            </p>
          </Reveal>
        </div>
        <ProgressiveBlur className="bottom-0 z-30 h-28" />
      </section>

      {/* Services Bento Grid */}
      <section className="relative z-40 -mt-10 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Primary Service (MVP) */}
          <Reveal delay={0.3} className="lg:col-span-2">
            <BentoCard className="group h-full flex flex-col p-8 md:p-10">
              <BorderBeam colorFrom="var(--ocean)" colorTo="var(--cyanline)" duration={12} borderWidth={1.5} />
              <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-ocean/5 blur-[80px] pointer-events-none transition-colors group-hover:bg-ocean/10" />
              
              <div className="relative z-10 mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-ocean text-white shadow-lg shadow-blue-500/20">
                <Activity className="h-8 w-8" />
              </div>
              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-ocean mb-3">Core Product</p>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-ink mb-4">{services[0].title}</h2>
                <p className="max-w-md text-base font-semibold leading-relaxed text-slate-500 mb-8">
                  {services[0].body}
                </p>
              </div>
              <div className="relative z-10 mt-auto">
                <Link href={services[0].href!} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-ocean px-6 text-sm font-black text-white shadow-md transition-all hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98]">
                  Start booking
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </BentoCard>
          </Reveal>
          {/* Website Development */}
          <Reveal delay={0.4} className="lg:col-span-1">
            <BentoCard className="group h-full flex flex-col p-8 bg-white border border-slate-200">
              <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />
              <div className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-ocean shadow-sm">
                <Monitor className="h-5 w-5" />
              </div>
              <h3 className="relative z-10 text-xl font-extrabold tracking-tight text-ink mb-3">{services[1].title}</h3>
              <p className="relative z-10 text-sm font-semibold leading-relaxed text-slate-500 mb-6">
                {services[1].body}
              </p>
              {services[1].href && (
                <div className="relative z-10 mt-auto">
                   <Link href={services[1].href} className="inline-flex items-center gap-2 text-sm font-black text-ocean transition-colors hover:text-blue-700">
                      View details <ArrowRight className="h-4 w-4" />
                   </Link>
                </div>
              )}
            </BentoCard>
          </Reveal>

          {/* Grouped Other Features */}
          <Reveal delay={0.5} className="lg:col-span-3">
            <BentoCard className="group relative overflow-hidden bg-white p-8 md:p-10 border border-slate-200">
              <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
              
              <div className="relative z-10 mb-8">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-ocean mb-2">Operational Suite</p>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-ink">Integrated Business Systems</h2>
              </div>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 pt-8 border-t border-slate-100">
                {services.slice(2).map((service) => {
                  const Icon = service.icon;
                  return (
                    <div key={service.title} className="flex flex-col h-full">
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-ocean shadow-sm">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-extrabold tracking-tight text-ink mb-2">{service.title}</h3>
                      <p className="text-xs font-semibold leading-relaxed text-slate-500 mb-4 flex-1">
                        {service.body}
                      </p>
                      {service.href && (
                        <Link href={service.href} className="inline-flex items-center gap-1.5 text-xs font-black text-ocean transition-colors hover:text-blue-700 mt-auto">
                          View details <ArrowRight className="h-3 w-3" />
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </BentoCard>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
