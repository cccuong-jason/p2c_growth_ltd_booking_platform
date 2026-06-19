"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import type { COBEOptions } from "cobe";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Activity,
  UserCheck,
  Workflow,
  LayoutDashboard,
  MailCheck,
  MessageSquareQuote,
  Plus,
  Command,
  Monitor,
  Filter,
  Rocket,
  ShieldCheck,
  CalendarCheck,
  Bell,
  QrCode,
  Puzzle,
  Send,
  Database,
  FileText
} from "lucide-react";

import { SectionBadge } from "@/components/ui/section-badge";
import { BentoCard } from "@/components/ui/bento-card";
import { GlassOverlay } from "@/components/ui/glass-overlay";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import {
  Reveal,
  SpringReveal,
  Magnetic,
  ParallaxStage,
  MotionDiv
} from "@/components/home/motion-primitives";
import { Globe } from "@/components/ui/globe";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { ProgressiveBlur } from "@/components/magicui/progressive-blur";
import { Ripple } from "@/components/ui/ripple";
import { BorderBeam } from "@/components/ui/border-beam";
import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar";
import { Iphone } from "@/registry/magicui/iphone";
import { getDictionary } from "@/lib/i18n/dictionary";

// --- SUB-COMPONENTS FOR MOCKUPS ---

const HERO_GLOBE_CONFIG: COBEOptions = {
  width: 1000,
  height: 1000,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 6.28,
  theta: 0.5,
  dark: 0.15,
  diffuse: 3,
  mapSamples: 26000,
  mapBrightness: 3.5,
  mapBaseBrightness: 0,
  scale: 1.2,
  offset: [0, 0],
  baseColor: [0.92, 0.96, 1],
  markerColor: [16 / 255, 185 / 255, 129 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [51.5072, -0.1276], size: 0.13 },
    { location: [53.4808, -2.2426], size: 0.09 },
    { location: [52.4862, -1.8904], size: 0.085 },
    { location: [21.0285, 105.8542], size: 0.095 },
    { location: [10.8231, 106.6297], size: 0.105 },
    { location: [39.9042, 116.4074], size: 0.092 },
    { location: [31.2304, 121.4737], size: 0.092 },
    { location: [22.3193, 114.1694], size: 0.082 },
  ],
};

const HOME_SERVICE_BOXES = [
  {
    eyebrow: "Medical",
    title: "P2C Health",
    body: "A guided booking and referral workflow for patients, legal cases, insurers, and expert follow-up.",
    href: "/services/physiotherapy",
    icon: Activity,
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=85",
  },
  {
    eyebrow: "Design",
    title: "Website Development",
    body: "Premium websites for UK service companies that need clear offers, trust, and conversion paths.",
    href: "/coming-soon",
    icon: Monitor,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85",
  },
  {
    eyebrow: "Automation",
    title: "Booking System & Email Automation",
    body: "Forms, status handoff, confirmation emails, and internal operations without manual chasing.",
    href: "/coming-soon",
    icon: Workflow,
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=85",
  },
  {
    eyebrow: "CRM",
    title: "Customer Management / Mini CRM",
    body: "Simple customer, enquiry, status, and partner context for teams that need visibility fast.",
    href: "/coming-soon",
    icon: LayoutDashboard,
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85",
  },
  {
    eyebrow: "Platform",
    title: "Customer-Partner Platform",
    body: "A reusable software layer for routing customers to professional partners and tracking outcomes.",
    href: "/coming-soon",
    icon: UserCheck,
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
  },
  {
    eyebrow: "Custom",
    title: "Tailored Solutions",
    body: "Custom integrations, API links, and specialized databases built around your specific dispatching rules.",
    href: "/contact",
    icon: Workflow,
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85",
  },
];

const ANALYTICS_BEAM_NODES = [
  {
    title: "Discover workflow",
    body: "Map enquiry sources, service types, team responsibilities, customer touchpoints, and the current manual follow-up load.",
    icon: Command,
    nodeClassName: "left-4 top-24 md:left-10 md:top-[210px]",
    side: "left",
    path: "M150 118 C210 88 244 84 314 132",
  },
  {
    title: "Design interface",
    body: "Turn the workflow into clear screens for customers, internal teams, and partners before build effort is committed.",
    icon: Monitor,
    nodeClassName: "left-4 top-[450px] md:left-8 md:top-[470px]",
    side: "left",
    path: "M154 294 C220 316 248 274 318 242",
  },
  {
    title: "Build system",
    body: "Implement the website, forms, status views, email triggers, and lightweight CRM records around the approved flow.",
    icon: Filter,
    nodeClassName: "right-4 top-24 md:right-6 md:top-[210px]",
    side: "right",
    path: "M290 118 C230 88 196 84 126 132",
  },
  {
    title: "Launch and iterate",
    body: "Release the first version, review real usage, and improve the system as the business adds services or partners.",
    icon: Rocket,
    nodeClassName: "right-4 top-[450px] md:right-6 md:top-[480px]",
    side: "right",
    path: "M286 300 C220 320 190 278 122 242",
  },
];

const BUILD_FEATURES = [
  {
    label: "Website",
    title: "Website development",
    body: "Service pages and enquiry capture shaped around how customers decide.",
    reportTitle: "Website enquiries are clearer.",
    reportBody: "Visitors choose the right service path, submit structured details, and land in one owner-ready queue.",
    focus: "Front door",
    status: "Captured",
    progress: "76%",
    icon: Monitor,
    accentClassName: "bg-ocean text-white",
    softClassName: "bg-ocean/10 text-ocean",
  },
  {
    label: "Booking",
    title: "Booking workflow",
    body: "Rules, owner assignment, customer confirmation, and status tracking.",
    reportTitle: "Booking requests are moving.",
    reportBody: "New requests are routed to the right internal owner with clear next steps and customer updates.",
    focus: "Scheduling",
    status: "Queued",
    progress: "68%",
    icon: CalendarCheck,
    accentClassName: "bg-emerald-500 text-white",
    softClassName: "bg-emerald-50 text-emerald-700",
  },
  {
    label: "Email",
    title: "Email automation",
    body: "Useful customer and internal updates without manual chasing.",
    reportTitle: "Follow-up is automated.",
    reportBody: "Customers receive confirmation while the team gets the right internal context at each workflow step.",
    focus: "Updates",
    status: "Sent",
    progress: "82%",
    icon: Send,
    accentClassName: "bg-amber-400 text-ink",
    softClassName: "bg-amber-50 text-amber-700",
  },
  {
    label: "CRM",
    title: "Mini CRM",
    body: "Simple customer records, ownership, status, and partner context.",
    reportTitle: "Customer records stay visible.",
    reportBody: "Every enquiry keeps its owner, status, and handoff history in a lightweight operating view.",
    focus: "Records",
    status: "Synced",
    progress: "71%",
    icon: Database,
    accentClassName: "bg-slate-900 text-white",
    softClassName: "bg-slate-100 text-slate-700",
  },
] as const;

const FAQ_ITEMS = [
  {
    question: "What does P2C Growth build?",
    answer: "Websites, booking workflows, email automation, lightweight CRM tools, and customer-partner platforms for UK service businesses.",
  },
  {
    question: "Can you improve an existing workflow?",
    answer: "Yes. We can map the current enquiry, booking, follow-up, and handoff process, then rebuild the parts that create the most manual work.",
  },
  {
    question: "Is P2C Health the whole business?",
    answer: "No. It is one service offering. The homepage represents P2C Growth LTD as a broader technology and software company.",
  },
] as const;

export default function HomePage() {
  const { home } = getDictionary();
  const servicesScrollRef = useRef<HTMLDivElement>(null);

  const scrollServices = (direction: "left" | "right") => {
    if (servicesScrollRef.current) {
      const scrollAmount = servicesScrollRef.current.clientWidth;
      servicesScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const [activeAnalyticsNode, setActiveAnalyticsNode] = useState(ANALYTICS_BEAM_NODES[0].title);
  const [hasSelectedAnalyticsNode, setHasSelectedAnalyticsNode] = useState(false);
  const activeAnalytics = ANALYTICS_BEAM_NODES.find((node) => node.title === activeAnalyticsNode) ?? ANALYTICS_BEAM_NODES[0];
  const activeAnalyticsIndex = ANALYTICS_BEAM_NODES.findIndex((node) => node.title === activeAnalytics.title);
  const ActiveAnalyticsIcon = activeAnalytics.icon;

  useEffect(() => {
    if (hasSelectedAnalyticsNode) {
      return;
    }

    const rotation = window.setInterval(() => {
      setActiveAnalyticsNode((currentTitle) => {
        const currentIndex = ANALYTICS_BEAM_NODES.findIndex((node) => node.title === currentTitle);
        const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % ANALYTICS_BEAM_NODES.length;

        return ANALYTICS_BEAM_NODES[nextIndex].title;
      });
    }, 3600);

    return () => window.clearInterval(rotation);
  }, [hasSelectedAnalyticsNode]);

  return (
    <main className="relative bg-white overflow-hidden selection:bg-blue-100 selection:text-blue-900 font-sans">

      {/* --- HERO SECTION WITH GLOBE --- */}
      <section className="relative min-h-[95vh] flex flex-col items-center justify-center pt-32 pb-20 md:pt-48 md:pb-40 bg-porcelain overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-[47%] z-0 w-[760px] max-w-[132vw] -translate-x-1/2 -translate-y-1/2 opacity-55 md:w-[980px]">
          <Globe config={HERO_GLOBE_CONFIG} className="mx-auto" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_33%,rgba(247,251,255,0.92)_0%,rgba(247,251,255,0.72)_30%,rgba(247,251,255,0.22)_56%),radial-gradient(circle_at_50%_74%,rgba(247,251,255,0.18)_20%,rgba(247,251,255,0.94)_68%)]" />
        </div>

        {/* Hero Content */}
        <div className="flex flex-col items-center text-center relative z-20 px-4 sm:px-6 max-w-7xl mx-auto mb-32">
          <SpringReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 backdrop-blur-xl px-4 py-1.5 text-[11px] font-bold text-slate-700 mb-8 uppercase tracking-[0.2em] shadow-premium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ocean opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-ocean"></span>
              </span>
              UK technology and software company
            </div>
          </SpringReveal>

          <div className="max-w-5xl mx-auto min-h-[140px] flex items-center justify-center">
             <TypingAnimation
                className="text-5xl md:text-[5.5rem] font-extrabold text-ink tracking-tight leading-[1.1] justify-center display-heading"
                duration={50}
             >
                Software systems for modern UK service companies.
             </TypingAnimation>
          </div>

          <Reveal delay={0.6}>
            <p className="mt-10 max-w-2xl text-lg font-semibold leading-relaxed text-slate-700 md:text-xl">
              P2C Growth LTD designs and builds websites, booking workflows, email automation, CRM tools, and customer-partner platforms for businesses that need clean digital operations.
            </p>
          </Reveal>

          <Reveal delay={0.8}>
            <div className="mt-12 flex flex-col sm:flex-row items-center gap-6">
              <Magnetic>
                <Link href="/services" className="inline-flex h-16 items-center justify-center gap-3 rounded-full bg-ocean px-12 text-base font-extrabold text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-105 hover:bg-blue-600 active:scale-95">
                  Explore services
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Magnetic>
            </div>
          </Reveal>

        </div>
        <ProgressiveBlur className="bottom-0 z-30 h-28" />
      </section>

      {/* --- SERVICES CAROUSEL --- */}
      <section className="bg-white px-4 py-24 sm:px-6 md:py-32 overflow-hidden relative">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <Reveal>
              <SectionBadge icon={LayoutDashboard}>Our services</SectionBadge>
            </Reveal>
          </div>

          {/* Desktop Layout (Hidden on mobile) */}
          <div className="hidden md:block relative px-1">
            <article className="group relative w-full rounded-[2.5rem] border border-slate-200 bg-white p-8 md:p-12 shadow-premium hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col md:flex-row justify-between gap-8 md:items-center">
              <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
              <div className="relative z-10 flex-1 max-w-xl">
                <span className="rounded-lg bg-blue-50 text-[10px] font-black uppercase tracking-widest text-ocean px-3 py-1.5 inline-block mb-6">
                  Medical
                </span>
                <h3 className="text-3xl md:text-5xl font-black text-ink tracking-tight mb-4 leading-none">P2C Health</h3>
                <p className="text-sm md:text-base font-semibold leading-relaxed text-slate-500 mb-8">
                  A guided booking and referral workflow for patients, legal cases, insurers, and expert follow-up.
                </p>
                <div className="flex items-center gap-3">
                  <Link
                    href="/services/physiotherapy"
                    className="inline-flex h-12 items-center gap-2 rounded-xl bg-ocean px-6 text-sm font-black text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105 hover:bg-blue-600 active:scale-95"
                  >
                    Book expert <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-slate-200 text-ocean shadow-sm hover:bg-slate-50 transition active:scale-95 cursor-pointer">
                    <Activity className="h-5 w-5" />
                  </div>
                </div>
              </div>
              <div className="relative w-full md:w-[48%] h-[200px] md:h-[280px] rounded-2xl overflow-hidden border border-slate-100 shadow-sm z-10 flex-shrink-0">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=85)` }}
                />
              </div>
            </article>

            <div className="relative mt-6">
              <div
                ref={servicesScrollRef}
                className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-2"
              >
                <div className="w-full flex-none snap-start">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Website Development */}
                  <article className="group relative w-full rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8 shadow-premium hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col sm:flex-row justify-between gap-6">
                    <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
                    <div className="relative z-10 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="rounded-md bg-blue-50 text-[9px] font-black uppercase tracking-widest text-ocean px-2.5 py-1 inline-block mb-4">
                          Design
                        </span>
                        <h3 className="text-xl md:text-2xl font-black text-ink tracking-tight mb-2 leading-tight">Website Development</h3>
                        <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-500 mb-6">
                          Premium websites for UK service companies that need clear offers, trust, and conversion paths.
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50/50 border border-blue-100 text-ocean shadow-sm">
                          <Monitor className="h-5 w-5" />
                        </div>
                        <Link
                          href="/coming-soon"
                          className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-4 text-xs font-bold text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-ink active:scale-95"
                        >
                          View More <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                      </div>
                    </div>
                    <div className="relative w-full sm:w-[40%] h-[140px] sm:h-[180px] rounded-xl overflow-hidden border border-slate-100 shadow-sm z-10 flex-shrink-0 self-center">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85)` }}
                      />
                    </div>
                  </article>

                  {/* Booking System & Email Automation */}
                  <article className="group relative w-full rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8 shadow-premium hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col sm:flex-row justify-between gap-6">
                    <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
                    <div className="relative z-10 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="rounded-md bg-blue-50 text-[9px] font-black uppercase tracking-widest text-ocean px-2.5 py-1 inline-block mb-4">
                          Automation
                        </span>
                        <h3 className="text-xl md:text-2xl font-black text-ink tracking-tight mb-2 leading-tight">Booking & Email Automation</h3>
                        <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-500 mb-6">
                          Forms, status handoff, confirmation emails, and internal operations without manual chasing.
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50/50 border border-blue-100 text-ocean shadow-sm">
                          <Workflow className="h-5 w-5" />
                        </div>
                        <Link
                          href="/coming-soon"
                          className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-4 text-xs font-bold text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-ink active:scale-95"
                        >
                          View More <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                      </div>
                    </div>
                    <div className="relative w-full sm:w-[40%] h-[140px] sm:h-[180px] rounded-xl overflow-hidden border border-slate-100 shadow-sm z-10 flex-shrink-0 self-center">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=85)` }}
                      />
                    </div>
                  </article>
                </div>
              </div>

                <div className="w-full flex-none snap-start">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Customer Management / Mini CRM */}
                  <article className="group relative w-full rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8 shadow-premium hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col sm:flex-row justify-between gap-6">
                    <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
                    <div className="relative z-10 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="rounded-md bg-blue-50 text-[9px] font-black uppercase tracking-widest text-ocean px-2.5 py-1 inline-block mb-4">
                          CRM
                        </span>
                        <h3 className="text-xl md:text-2xl font-black text-ink tracking-tight mb-2 leading-tight">Customer Management / Mini CRM</h3>
                        <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-500 mb-6">
                          Simple customer, enquiry, status, and partner context for teams that need visibility fast.
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50/50 border border-blue-100 text-ocean shadow-sm">
                          <LayoutDashboard className="h-5 w-5" />
                        </div>
                        <Link
                          href="/coming-soon"
                          className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-4 text-xs font-bold text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-ink active:scale-95"
                        >
                          View More <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                      </div>
                    </div>
                    <div className="relative w-full sm:w-[40%] h-[140px] sm:h-[180px] rounded-xl overflow-hidden border border-slate-100 shadow-sm z-10 flex-shrink-0 self-center">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85)` }}
                      />
                    </div>
                  </article>

                  {/* Customer-Partner Platform */}
                  <article className="group relative w-full rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8 shadow-premium hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col sm:flex-row justify-between gap-6">
                    <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
                    <div className="relative z-10 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="rounded-md bg-blue-50 text-[9px] font-black uppercase tracking-widest text-ocean px-2.5 py-1 inline-block mb-4">
                          Platform
                        </span>
                        <h3 className="text-xl md:text-2xl font-black text-ink tracking-tight mb-2 leading-tight">Customer-Partner Platform</h3>
                        <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-500 mb-6">
                          A reusable software layer for routing customers to professional partners and tracking outcomes.
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50/50 border border-blue-100 text-ocean shadow-sm">
                          <UserCheck className="h-5 w-5" />
                        </div>
                        <Link
                          href="/coming-soon"
                          className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-4 text-xs font-bold text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-ink active:scale-95"
                        >
                          View More <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                      </div>
                    </div>
                    <div className="relative w-full sm:w-[40%] h-[140px] sm:h-[180px] rounded-xl overflow-hidden border border-slate-100 shadow-sm z-10 flex-shrink-0 self-center">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85)` }}
                      />
                    </div>
                  </article>
                </div>
              </div>

                <div className="w-full flex-none snap-start">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Tailored Solutions */}
                  <article className="group relative w-full rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8 shadow-premium hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col sm:flex-row justify-between gap-6">
                    <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
                    <div className="relative z-10 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="rounded-md bg-blue-50 text-[9px] font-black uppercase tracking-widest text-ocean px-2.5 py-1 inline-block mb-4">
                          Custom
                        </span>
                        <h3 className="text-xl md:text-2xl font-black text-ink tracking-tight mb-2 leading-tight">Tailored Solutions</h3>
                        <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-500 mb-6">
                          Custom integrations, API links, and specialized databases built around your specific dispatching rules.
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50/50 border border-blue-100 text-ocean shadow-sm">
                          <Workflow className="h-5 w-5" />
                        </div>
                        <Link
                          href="/contact"
                          className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-4 text-xs font-bold text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-ink active:scale-95"
                        >
                          Contact Us <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                      </div>
                    </div>
                    <div className="relative w-full sm:w-[40%] h-[140px] sm:h-[180px] rounded-xl overflow-hidden border border-slate-100 shadow-sm z-10 flex-shrink-0 self-center">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85)` }}
                      />
                    </div>
                  </article>
                </div>
              </div>
            </div>

              {/* Absolute side navigation controls */}
              <button
                type="button"
                onClick={() => scrollServices("left")}
                aria-label="Scroll left"
                className="absolute -left-4 lg:-left-7 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full border border-slate-200 bg-white/95 text-slate-800 shadow-xl backdrop-blur-sm transition-all hover:bg-slate-50 hover:text-ink active:scale-95 flex items-center justify-center z-40"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={() => scrollServices("right")}
                aria-label="Scroll right"
                className="absolute -right-4 lg:-right-7 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full border border-slate-200 bg-white/95 text-slate-800 shadow-xl backdrop-blur-sm transition-all hover:bg-slate-50 hover:text-ink active:scale-95 flex items-center justify-center z-40"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile Layout (Touch friendly scroll list, hidden on desktop) */}
          <div className="block md:hidden relative">
            <div className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth no-scrollbar px-4">
              {HOME_SERVICE_BOXES.map((service) => {
                const isP2CHealth = service.title === "P2C Health";
                const Icon = service.icon;
                return (
                  <article
                    key={service.title}
                    className="snap-start flex-none w-[290px] h-[450px] rounded-[2rem] border border-slate-200 bg-white p-6 relative overflow-hidden flex flex-col justify-between shadow-premium transition-all duration-500"
                  >
                    <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
                    <div className="relative z-10">
                      <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-ocean">
                        {service.eyebrow}
                      </span>
                      <h3 className="mt-4 text-xl font-extrabold tracking-tight text-ink">{service.title}</h3>
                      <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-500 line-clamp-3">{service.body}</p>
                    </div>

                    <div className="relative w-full h-32 my-3 rounded-xl overflow-hidden border border-slate-100 shadow-sm z-10">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${service.image})` }}
                      />
                    </div>

                    <div className="relative z-10 mt-auto flex justify-between items-center">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 border border-slate-200 text-ocean shadow-sm">
                        <Icon className="h-5 w-5" />
                      </div>

                      {isP2CHealth ? (
                        <Link
                          href="/services/physiotherapy"
                          className="inline-flex h-11 items-center gap-1.5 rounded-xl bg-ocean px-5 text-xs font-black text-white shadow-lg shadow-blue-500/20"
                        >
                          Book expert <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      ) : (
                        <Link
                          href={service.href}
                          className="inline-flex h-11 items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-5 text-xs font-bold text-slate-600 shadow-sm"
                        >
                          {service.title === "Tailored Solutions" ? "Contact Us" : "View More"} <ArrowRight className="h-3 w-3" />
                        </Link>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* --- WHAT WE BUILD (Simplified Grid) --- */}
      <section className="py-24 md:py-32 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20 md:mb-24">
          <Reveal>
             <SectionBadge icon={LayoutDashboard}>What We Build</SectionBadge>
             <h2 className="section-heading text-ink">
                Practical systems <br className="hidden md:inline" /><span className="text-ocean">for service teams.</span>
             </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Card: Website Development */}
          <Reveal className="lg:col-span-7 flex">
            <article className="group relative w-full rounded-[2.5rem] border border-slate-200/80 bg-white p-8 md:p-10 shadow-premium hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between">
              <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-full">
                <div className="md:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    <span className="rounded-md bg-blue-50 text-[9px] font-black uppercase tracking-widest text-ocean px-2.5 py-1 inline-block mb-6 w-max">
                      Website Development
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-ink tracking-tight leading-tight mb-4">
                      A sharper digital front door for your business.
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8">
                      Clear service pages, enquiry capture, and conversion-focused journeys built for service businesses.
                    </p>
                  </div>
                  <Link
                    href="/services"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-ocean px-6 text-sm font-black text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105 hover:bg-blue-600 active:scale-95 w-max mt-auto"
                  >
                    View website builds <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Mockup Graphic */}
                <div className="md:col-span-5 flex justify-center md:justify-end h-full items-center">
                  <div className="relative w-full max-w-[210px] aspect-[4/5] bg-white border border-slate-200/80 rounded-2xl shadow-xl p-3 flex flex-col gap-2 transition-transform duration-500 group-hover:scale-105">
                    {/* Browser Dots */}
                    <div className="flex gap-1 mb-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
                    </div>
                    {/* Header bar */}
                    <div className="h-4 w-full bg-blue-50/50 rounded flex items-center px-1.5">
                      <div className="h-1 w-8 bg-ocean/20 rounded" />
                    </div>
                    {/* Hero title lines */}
                    <div className="h-2 w-3/4 bg-slate-100 rounded mt-2" />
                    <div className="h-2 w-1/2 bg-slate-100 rounded" />
                    {/* Body content lines */}
                    <div className="h-1 w-full bg-slate-50 rounded mt-3" />
                    <div className="h-1 w-full bg-slate-50 rounded" />
                    <div className="h-1 w-5/6 bg-slate-50 rounded" />
                    {/* Placeholder image grid */}
                    <div className="grid grid-cols-2 gap-2 mt-4 flex-grow">
                      <div className="bg-slate-50/80 rounded-lg p-1.5 flex flex-col justify-end">
                        <div className="h-1.5 w-6 bg-slate-200 rounded" />
                      </div>
                      <div className="bg-slate-50/80 rounded-lg p-1.5 flex flex-col justify-end">
                        <div className="h-1.5 w-6 bg-slate-200 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>

          {/* Right Column: Stack of 3 Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
            {/* Card 1: Booking Workflow Hub */}
            <Reveal delay={0.05} className="flex-1 flex">
              <article className="group relative w-full rounded-3xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-premium hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between">
                <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
                <div className="relative z-10 flex-grow">
                  <span className="rounded-md bg-blue-50 text-[9px] font-black uppercase tracking-widest text-ocean px-2 py-0.5 inline-block mb-3">
                    Workflow
                  </span>
                  <h3 className="text-xl font-extrabold text-ink tracking-tight mb-2 leading-tight">
                    Booking Workflow Hub
                  </h3>
                  <p className="text-xs font-semibold leading-relaxed text-slate-500 mb-4">
                    Manage intake, routing, confirmation, and internal handoff in one simple flow.
                  </p>
                </div>
                <div className="relative z-10 mt-auto flex justify-between items-center">
                  <Link
                    href="/coming-soon"
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-ocean active:scale-95"
                  >
                    Get started <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                  </Link>
                </div>
              </article>
            </Reveal>

            {/* Card 2: Share with partners */}
            <Reveal delay={0.1} className="flex-1 flex">
              <article className="group relative w-full rounded-3xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-premium hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between">
                <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
                <div className="relative z-10 flex-grow">
                  <span className="rounded-md bg-blue-50 text-[9px] font-black uppercase tracking-widest text-ocean px-2 py-0.5 inline-block mb-3">
                    Collaboration
                  </span>
                  <h3 className="text-xl font-extrabold text-ink tracking-tight mb-2 leading-tight">
                    Share with partners
                  </h3>
                  <p className="text-xs font-semibold leading-relaxed text-slate-500 mb-4">
                    Send structured updates and handoff links to partner teams and reviewers.
                  </p>
                </div>
                <div className="relative z-10 mt-auto flex justify-between items-center">
                  <Link
                    href="/coming-soon"
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-ocean active:scale-95"
                  >
                    Learn more <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                  </Link>
                </div>
              </article>
            </Reveal>

            {/* Card 3: Instant updates */}
            <Reveal delay={0.15} className="flex-1 flex">
              <article className="group relative w-full rounded-3xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-premium hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between">
                <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
                <div className="relative z-10 flex-grow">
                  <span className="rounded-md bg-blue-50 text-[9px] font-black uppercase tracking-widest text-ocean px-2 py-0.5 inline-block mb-3">
                    Updates
                  </span>
                  <h3 className="text-xl font-extrabold text-ink tracking-tight mb-2 leading-tight">
                    Instant updates
                  </h3>
                  <p className="text-xs font-semibold leading-relaxed text-slate-500 mb-4">
                    Notify customers and internal owners when a workflow changes.
                  </p>
                </div>
                <div className="relative z-10 mt-auto flex justify-between items-center">
                  <Link
                    href="/coming-soon"
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-ocean active:scale-95"
                  >
                    Learn more <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                  </Link>
                </div>
              </article>
            </Reveal>
          </div>

          {/* Bottom Card: Integrations */}
          <Reveal delay={0.2} className="lg:col-span-12">
            <article className="group relative w-full rounded-[2.5rem] border border-slate-200/80 bg-white p-8 shadow-premium hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
              <div className="relative z-10 flex-grow">
                <span className="rounded-md bg-blue-50 text-[9px] font-black uppercase tracking-widest text-ocean px-2.5 py-1 inline-block mb-4 w-max">
                  Integrations
                </span>
                <h3 className="text-2xl font-extrabold text-ink tracking-tight mb-2 leading-tight">
                  Works with tools you already use.
                </h3>
                <p className="text-slate-500 text-xs md:text-sm font-semibold leading-relaxed mb-6 max-w-xl">
                  Connect your website and workflow to the platforms your team already uses.
                </p>
                <Link
                  href="/coming-soon"
                  className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-ocean"
                >
                  See integrations <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Logo container */}
              <div className="relative z-10 flex flex-wrap gap-4 items-center justify-center">
                {/* Salesforce */}
                <div className="bg-white border border-slate-100 shadow-sm rounded-2xl h-14 w-14 flex items-center justify-center transition hover:scale-105" title="Salesforce">
                  <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#00a1e0] fill-current">
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                  </svg>
                </div>
                {/* Pipedrive */}
                <div className="bg-white border border-slate-100 shadow-sm rounded-2xl h-14 w-14 flex items-center justify-center transition hover:scale-105" title="Pipedrive">
                  <span className="text-[#00b853] font-black text-xl font-display">P</span>
                </div>
                {/* HubSpot */}
                <div className="bg-white border border-slate-100 shadow-sm rounded-2xl h-14 w-14 flex items-center justify-center transition hover:scale-105" title="HubSpot">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#ff7a59] fill-current">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                </div>
                {/* Intercom */}
                <div className="bg-white border border-slate-100 shadow-sm rounded-2xl h-14 w-14 flex items-center justify-center transition hover:scale-105" title="Intercom">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#0057ff] fill-current">
                    <path d="M12 2C6.477 2 2 6.484 2 12.016 2 14.816 3.12 17.352 4.96 19.184l-.16 2.016c-.016.176.08.336.24.4.048.016.096.032.144.032.112 0 .224-.048.304-.128l2.064-2.064C10.384 21.36 11.184 21.52 12 21.52c5.523 0 10-4.484 10-10.016S17.523 2 12 2zm3.328 12.56c-.208.336-.592.512-.96.448l-2.064-.336c-.304-.048-.56-.24-.688-.512l-1.04-2.064c-.16-.336-.112-.736.128-1.008l1.456-1.6c.256-.288.688-.336 1.008-.128l1.68 1.12c.272.176.432.48.432.8v2.4c0 .32-.144.608-.384.768z" />
                  </svg>
                </div>
                {/* Zapier */}
                <div className="bg-white border border-slate-100 shadow-sm rounded-2xl h-14 w-14 flex items-center justify-center transition hover:scale-105" title="Zapier">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#ff4f00] fill-current">
                    <path d="M12 2c5.522 0 10 4.477 10 10s-4.478 10-10 10S2 17.523 2 12 6.478 2 12 2zm0 3.6c-3.535 0-6.4 2.865-6.4 6.4s2.865 6.4 6.4 6.4 6.4-2.865 6.4-6.4-2.865-6.4-6.4-6.4zm-1.8 3.6h3.6V11H10.2V9.2zm0 3.6h3.6V14.6H10.2v-1.8z" />
                  </svg>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* --- DELIVERY PROCESS (Reference Phone Orbit) --- */}
      <section className="relative overflow-hidden bg-porcelain px-4 py-24 text-ink sm:px-6 md:py-32">
        <div className="absolute inset-0 tech-grid opacity-70" />
        <div className="absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ocean/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <Reveal>
            <div className="text-center">
              <SectionBadge icon={LayoutDashboard}>Delivery Process</SectionBadge>
              <h2 className="section-heading text-ink">
                From messy workflow <br /><span className="text-ocean">to working system.</span>
              </h2>
            </div>
          </Reveal>

          <div className="relative mx-auto mt-16 min-h-[760px] max-w-6xl">
            <div className="pointer-events-none absolute left-1/2 top-[52%] hidden h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 text-ocean/40 md:block">
              <Ripple mainCircleSize={260} mainCircleOpacity={0.24} numCircles={9} />
            </div>
            <div className="pointer-events-none absolute left-1/2 top-[52%] hidden h-[620px] w-[720px] -translate-x-1/2 -translate-y-1/2 md:block">
              <AnimatedBeam path="M150 118 C210 88 244 84 314 132" duration={3.8} />
              <AnimatedBeam path="M154 294 C220 316 248 274 318 242" duration={4.4} reverse />
              <AnimatedBeam path="M290 118 C230 88 196 84 126 132" duration={4.1} />
              <AnimatedBeam path="M286 300 C220 320 190 278 122 242" duration={4.7} reverse />
            </div>

            <div className="absolute left-1/2 top-8 z-20 w-[330px] -translate-x-1/2 sm:w-[380px]">
              <ParallaxStage>
                {({ ySlow }) => (
                  <MotionDiv style={{ y: ySlow }}>
                    <Iphone className="w-full" screenClassName="bg-porcelain">
                      <div className="flex h-full flex-col bg-porcelain px-6 pb-8 pt-11 text-ink">
                        <div className="mb-5 flex items-center justify-between text-xs font-bold text-slate-700">
                          <span>9:41</span>
                          <span className="rounded-full bg-ocean/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-ocean">Live</span>
                        </div>
                        <div className="rounded-[1.6rem] border border-slate-100 bg-white p-5 shadow-premium">
                          <div className="mb-5 flex items-center justify-between">
                            <p className="text-sm font-black">Project flow</p>
                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-600">
                              {hasSelectedAnalyticsNode ? "Selected" : "Auto"}
                            </span>
                          </div>
                          <div className="rounded-2xl border border-ocean/15 bg-ocean/5 p-4">
                            <div className="mb-4 flex items-start gap-3">
                              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ocean text-white shadow-lg shadow-blue-500/20">
                                <ActiveAnalyticsIcon className="h-5 w-5" />
                              </span>
                              <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-ocean">Active step</p>
                                <p className="mt-1 text-base font-black leading-tight">{activeAnalytics.title}</p>
                              </div>
                            </div>
                            <p className="text-xs font-semibold leading-5 text-slate-600">{activeAnalytics.body}</p>
                            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white ring-1 ring-slate-100">
                              <div
                                className="h-full rounded-full bg-ocean transition-all duration-700"
                                style={{ width: `${((activeAnalyticsIndex + 1) / ANALYTICS_BEAM_NODES.length) * 100}%` }}
                              />
                            </div>
                          </div>
                          <div className="mt-4 space-y-3">
                            {ANALYTICS_BEAM_NODES.map((node, index) => (
                              <div key={node.title} className={`rounded-2xl border px-4 py-3 transition ${activeAnalytics.title === node.title ? "border-ocean/20 bg-blue-50" : "border-slate-100 bg-slate-50"}`}>
                                <div className="flex items-center justify-between gap-3">
                                  <p className="text-xs font-black text-ink">{node.title}</p>
                                  <span className={`h-2.5 w-2.5 rounded-full ${activeAnalytics.title === node.title ? "bg-ocean" : "bg-slate-300"}`} />
                                </div>
                                <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                  Step {String(index + 1).padStart(2, "0")}
                                </p>
                              </div>
                            ))}
                          </div>
                          <div className="mt-5 grid grid-cols-2 gap-3">
                            <div className="rounded-2xl bg-ocean/10 p-4">
                              <p className="text-2xl font-black text-ocean">{String(activeAnalyticsIndex + 1).padStart(2, "0")}</p>
                              <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-700">Current step</p>
                            </div>
                            <div className="rounded-2xl bg-emerald-50 p-4">
                              <p className="text-2xl font-black text-emerald-600">{String(ANALYTICS_BEAM_NODES.length).padStart(2, "0")}</p>
                              <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-700">Process steps</p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-auto rounded-2xl bg-ocean px-5 py-4 text-center text-sm font-bold text-white shadow-lg shadow-blue-500/20">
                          Review launch path
                        </div>
                      </div>
                    </Iphone>
                  </MotionDiv>
                )}
              </ParallaxStage>
            </div>

            <div className="grid gap-6 pt-[620px] md:block md:pt-0">
              {ANALYTICS_BEAM_NODES.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => {
                    setHasSelectedAnalyticsNode(true);
                    setActiveAnalyticsNode(item.title);
                  }}
                  aria-pressed={activeAnalyticsNode === item.title}
                  className={`group flex items-center gap-4 rounded-2xl border p-5 text-left shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-premium focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean/40 md:absolute md:w-80 ${item.side === "left" ? "md:flex-row-reverse md:text-right" : "md:flex-row"} ${item.nodeClassName} ${activeAnalyticsNode === item.title ? "border-ocean/25 bg-white shadow-premium" : "border-slate-100 bg-white/95 shadow-md"}`}
                >
                  <span className={`order-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition md:order-none ${activeAnalyticsNode === item.title ? "bg-ocean text-white" : "bg-ocean/10 text-ocean group-hover:bg-ocean group-hover:text-white"}`}>
                    <item.icon className="h-6 w-6" />
                  </span>
                  <span className="block">
                    <span className="block text-xl font-bold text-ink">{item.title}</span>
                    <span className="mt-2 block text-sm font-semibold leading-6 text-slate-700">{item.body}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- PURPOSE (Detailed Section) --- */}
      <section className="py-24 md:py-48 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20 md:mb-32">
           <Reveal>
              <SectionBadge icon={Workflow}>Company Purpose</SectionBadge>
              <h2 className="section-heading text-ink">
                 Digital infrastructure <br /><span className="text-ocean">that fits real work.</span>
              </h2>
           </Reveal>
        </div>

        <div className="bg-porcelain/50 border border-slate-100 rounded-[4rem] p-12 md:p-20 grid lg:grid-cols-[1.2fr_1fr] gap-20 items-center overflow-hidden relative group">
           <BorderBeam colorFrom="var(--ocean)" colorTo="var(--mint)" duration={8} borderWidth={2} />
           <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />

           <Reveal className="relative z-10">
              <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-premium flex flex-col items-center relative overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-ocean/5 rounded-full blur-[80px] pointer-events-none" />
                 <div className="flex justify-between items-center w-full mb-10 relative z-10">
                    <p className="text-lg font-bold text-ink">Operating loop</p>
                    <div className="h-8 w-28 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">Service stack</div>
                 </div>
                 <div className="relative z-10 flex h-64 w-64 items-center justify-center">
                    <AnimatedCircularProgressBar
                      value={75}
                      max={100}
                      min={0}
                      gaugePrimaryColor="var(--ocean)"
                      gaugeSecondaryColor="color-mix(in srgb, var(--ocean) 14%, white)"
                      className="size-64 text-4xl font-black text-ink"
                    />
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pt-14">
                       <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Core workflow</p>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-10 mt-10 w-full relative z-10">
                    <div className="flex items-center gap-3">
                       <div className="h-3 w-3 rounded-full bg-ocean animate-pulse" />
                       <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Public</p>
                          <p className="text-base font-bold text-ink">Enquiry</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" style={{ animationDelay: '1s' }} />
                       <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Internal</p>
                          <p className="text-base font-bold text-ink">Action</p>
                       </div>
                    </div>
                 </div>
                 <div className="mt-12 grid w-full grid-cols-2 gap-3 relative z-10">
                    {["Capture", "Qualify", "Route", "Update"].map((step) => (
                      <div key={step} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-center text-xs font-black uppercase tracking-widest text-slate-500">
                        {step}
                      </div>
                    ))}
                 </div>
              </div>
           </Reveal>

           <div className="space-y-12 relative z-10">
              <Reveal delay={0.2}>
                 <div className="text-sm font-bold text-ocean uppercase tracking-widest mb-4 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-ocean animate-ping" /> Practical digital infrastructure
                 </div>
                 <h3 className="text-4xl font-bold text-ink tracking-tight">Build the tools your service business actually needs.</h3>
                 <p className="mt-6 text-slate-500 text-lg leading-relaxed font-medium">
                    P2C Growth focuses on the practical systems behind a UK service business: a clear website, a reliable enquiry path, useful automation, visible customer records, and partner handoff where needed.
                 </p>
                 <div className="mt-10 space-y-4">
                    {[
                      "Centralise enquiries that would otherwise arrive through calls, email, forms, and messaging.",
                      "Give teams a simple status view so every request has an owner and next step.",
                      "Automate useful customer and internal updates without hiding the human service experience.",
                      "Prepare the platform for future CRM and partner-routing workflows without overbuilding early."
                    ].map((item) => (
                    <div key={item} className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-3 rounded-2xl border border-slate-100 shadow-sm">
                       <div className="h-8 w-8 rounded-full bg-ocean/10 text-ocean flex items-center justify-center shrink-0">
                          <CheckCircle2 className="h-5 w-5" />
                       </div>
                       <p className="text-sm font-bold text-ink">{item}</p>
                    </div>
                    ))}
                 </div>
              </Reveal>
           </div>
        </div>
      </section>

      {/* --- WHY TEAMS CHOOSE P2C GROWTH --- */}
      <section className="py-24 md:py-32 overflow-hidden bg-white relative">
        <div className="text-center mb-20 px-4 sm:px-6 max-w-7xl mx-auto relative z-20">
           <Reveal>
              <SectionBadge icon={MessageSquareQuote}>Why teams choose P2C Growth</SectionBadge>
              <h2 className="section-heading text-ink">Less manual work, <br /><span className="text-ocean">clearer operations.</span></h2>
           </Reveal>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-4 sm:px-6 md:grid-cols-3">
          {[
            {
              icon: Monitor,
              title: "One clear digital front door",
              body: "Bring service pages, enquiry capture, booking requests, and contact routes into a website customers can understand quickly.",
            },
            {
              icon: Workflow,
              title: "Workflow before software",
              body: "Start with how the team actually works, then build screens and automation around the real operating path.",
            },
            {
              icon: LayoutDashboard,
              title: "Simple systems teams can run",
              body: "Keep customer records, ownership, status, and partner context visible without forcing a heavy enterprise tool too early.",
            },
          ].map((item, index) => (
            <Reveal key={item.title} delay={index * 0.1}>
              <article className="group relative h-full overflow-hidden rounded-[2rem] border border-slate-100 bg-porcelain p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-premium">
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-ocean/5 blur-3xl transition-colors group-hover:bg-ocean/10" />
                <div className="relative z-10 mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-ocean shadow-sm">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="relative z-10 text-2xl font-extrabold tracking-tight text-ink">{item.title}</h3>
                <p className="relative z-10 mt-5 text-sm font-semibold leading-7 text-slate-600">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="px-4 sm:px-6 pb-24 md:pb-32 max-w-7xl mx-auto">
        <ParallaxStage>
          {({ scale, ySlow, yFast, rotate, opacity }) => (
            <MotionDiv style={{ scale }} className="origin-center">
              <div className="relative overflow-hidden rounded-[4rem] bg-ocean p-8 text-center shadow-2xl shadow-blue-500/30 md:p-12 lg:p-14">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.26),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(0,194,255,0.28),transparent_32%)]" />
                <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />

                <div className="relative z-10 grid gap-8 lg:grid-cols-[0.86fr_1fr_0.86fr] lg:items-center">
                  <MotionDiv style={{ y: yFast, rotate, opacity }} className="order-2 lg:order-1">
                    <div className="rounded-[2rem] border border-white/20 bg-white/15 p-4 text-left text-white shadow-2xl backdrop-blur-xl">
                      <div className="mb-5 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-blue-100">Website enquiry</p>
                          <p className="mt-1 text-xl font-black">Request captured</p>
                        </div>
                        <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest text-ocean">Live</span>
                      </div>
                      <div className="space-y-3">
                        {[
                          ["Service", "Booking workflow"],
                          ["Source", "Website form"],
                          ["Next step", "Discovery call"],
                        ].map(([label, value]) => (
                          <div key={label} className="rounded-2xl border border-white/15 bg-white/15 p-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-blue-100">{label}</p>
                            <p className="mt-1 text-sm font-black">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </MotionDiv>

                  <div className="order-1 lg:order-2">
                    <p className="mb-5 text-[11px] font-black uppercase tracking-[0.24em] text-blue-100">Start the conversation</p>
                    <h2 className="section-heading text-white">
                      Ready to improve <br />your digital workflow?
                    </h2>
                    <p className="mt-8 text-lg md:text-xl text-blue-100 max-w-xl font-medium">
                      Talk to P2C Growth about your website, booking workflow, automation, CRM system, or customer-partner platform.
                    </p>
                    <div className="mt-10 flex flex-col gap-4 sm:flex-row lg:justify-start">
                      <Magnetic>
                        <Link href="/contact" className="inline-flex h-16 items-center justify-center gap-3 rounded-full bg-white px-12 text-base font-extrabold text-ocean shadow-xl transition-all hover:scale-105 active:scale-95">
                          Contact P2C Growth
                          <ArrowRight className="h-5 w-5" />
                        </Link>
                      </Magnetic>
                    </div>
                  </div>

                  <MotionDiv style={{ y: ySlow, scale, opacity }} className="order-3">
                    <div className="rounded-[2rem] border border-white/20 bg-white p-4 text-left shadow-2xl">
                      <div className="mb-5 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Internal view</p>
                          <p className="mt-1 text-xl font-black text-ink">Workflow board</p>
                        </div>
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-600">Active</span>
                      </div>
                      <div className="overflow-hidden rounded-2xl border border-slate-100">
                        {[
                          ["New enquiry", "02"],
                          ["Owner assigned", "01"],
                          ["Customer updated", "03"],
                          ["Completed", "04"],
                        ].map(([status, count]) => (
                          <div key={status} className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-4 py-3 last:border-b-0">
                            <div>
                              <p className="text-sm font-black text-ink">{status}</p>
                              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Service workflow</p>
                            </div>
                            <span className="text-lg font-black text-ocean">{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </MotionDiv>
                </div>
              </div>
            </MotionDiv>
          )}
        </ParallaxStage>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 md:py-32 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
           <Reveal>
              <SectionBadge icon={MessageSquareQuote}>FAQ</SectionBadge>
              <h2 className="section-heading text-ink mb-4">Frequently Asked <span className="text-ocean">Questions.</span></h2>
              <p className="text-lg font-medium text-slate-500 mb-10 max-w-2xl mx-auto">Clear answers to common questions about our platform, features, and support.</p>
           </Reveal>
        </div>

        <FaqAccordion items={FAQ_ITEMS} />
      </section>

    </main>
  );
}
