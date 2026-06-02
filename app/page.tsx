"use client";

import { useState } from "react";
import Link from "next/link";
import type { COBEOptions } from "cobe";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Activity,
  UserCheck,
  Workflow,
  LayoutDashboard,
  MailCheck,
  ClipboardList,
  MessageSquareQuote,
  Languages,
  Smartphone,
  Search,
  Plus,
  Command,
  Monitor,
  Filter,
  Rocket
} from "lucide-react";

import { 
  Reveal, 
  SpringReveal, 
  Magnetic, 
  ParallaxStage, 
  MotionDiv
} from "@/components/home/motion-primitives";
import { Globe } from "@/components/ui/globe";
import { Marquee } from "@/components/ui/marquee";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { AnimatedList } from "@/components/magicui/animated-list";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { ProgressiveBlur } from "@/components/magicui/progressive-blur";
import { Ripple } from "@/components/ui/ripple";
import { BlurFade } from "@/components/ui/blur-fade";
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

const ANALYTICS_BEAM_NODES = [
  {
    title: "Planning",
    body: "Map request source, service category, language, visit type, and postcode before dispatch work begins.",
    icon: Command,
    nodeClassName: "left-4 top-24 md:left-10 md:top-[210px]",
    side: "left",
    path: "M150 118 C210 88 244 84 314 132",
  },
  {
    title: "Prototype",
    body: "Preview the operational journey with intake, validation, queue, and confirmation states in one flow.",
    icon: Monitor,
    nodeClassName: "left-4 top-[450px] md:left-8 md:top-[470px]",
    side: "left",
    path: "M154 294 C220 316 248 274 318 242",
  },
  {
    title: "Refinement",
    body: "Review consent coverage, home visit rules, status quality, and follow-up gaps before handoff.",
    icon: Filter,
    nodeClassName: "right-4 top-24 md:right-6 md:top-[210px]",
    side: "right",
    path: "M290 118 C230 88 196 84 126 132",
  },
  {
    title: "Scale and support",
    body: "Reuse the same dispatch model as new services, languages, and partner operations come online.",
    icon: Rocket,
    nodeClassName: "right-4 top-[450px] md:right-6 md:top-[480px]",
    side: "right",
    path: "M286 300 C220 320 190 278 122 242",
  },
];

const DetailedPhoneFrame = ({ className = "" }: { className?: string }) => (
  <Iphone className={`w-[310px] ${className}`} screenClassName="bg-porcelain">
    <div className="flex h-full flex-col px-5 pb-5 pt-10">
       <div className="mb-7 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Internal queue</p>
            <p className="text-xl font-bold text-ink">Physio Dispatch</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center">
             <UserCheck className="h-5 w-5 text-ocean" />
          </div>
       </div>

       <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
             <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">ACTIVE SERVICE</span>
                <div className="h-5 w-12 rounded-full bg-ocean/10 text-ocean text-[9px] font-bold flex items-center justify-center">LIVE</div>
             </div>
             <div className="flex gap-4">
                <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                   <Activity className="h-6 w-6 text-ocean" />
                </div>
                <div className="space-y-1">
                   <p className="text-sm font-bold text-ink">Home Visit Intake</p>
                   <p className="text-xs text-slate-500">SW1A postcode captured</p>
                </div>
             </div>
          </div>

          <div className="space-y-3">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">QUICK ACTIONS</p>
             <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Plus, label: "Book" },
                  { icon: Search, label: "Find" },
                  { icon: MailCheck, label: "Inbox" },
                  { icon: Smartphone, label: "Support" }
                ].map((item, i) => (
                  <div key={i} className="h-24 rounded-2xl bg-white border border-slate-100 flex flex-col items-center justify-center gap-2 group hover:border-ocean transition-colors">
                     <item.icon className="h-6 w-6 text-slate-300 group-hover:text-ocean transition-colors" />
                     <span className="text-xs font-bold text-slate-500">{item.label}</span>
                  </div>
                ))}
             </div>
          </div>
       </div>

       <div className="mt-auto h-20 rounded-2xl bg-ocean flex flex-col items-center justify-center gap-1 shadow-lg shadow-blue-500/20">
          <p className="text-white text-xs font-bold">Confirmation Email</p>
          <p className="text-blue-100 text-[10px]">Queued after saved request</p>
       </div>
    </div>
  </Iphone>
);

export default function HomePage() {
  const { home } = getDictionary();
  const [activeAnalyticsNode, setActiveAnalyticsNode] = useState(ANALYTICS_BEAM_NODES[0].title);
  const activeAnalytics = ANALYTICS_BEAM_NODES.find((node) => node.title === activeAnalyticsNode) ?? ANALYTICS_BEAM_NODES[0];

  return (
    <main className="relative bg-white overflow-hidden selection:bg-blue-100 selection:text-blue-900 font-sans">
      
      {/* --- HERO SECTION WITH GLOBE --- */}
      <section className="relative min-h-[95vh] flex flex-col items-center justify-center pt-32 pb-20 md:pt-48 md:pb-40 bg-porcelain overflow-hidden">
        
        {/* Direct COBE globe */}
        <div className="pointer-events-none absolute left-1/2 top-[47%] z-0 w-[760px] max-w-[132vw] -translate-x-1/2 -translate-y-1/2 opacity-85 md:w-[980px]">
          <Globe config={HERO_GLOBE_CONFIG} className="mx-auto" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(247,251,255,0.68)_0%,rgba(247,251,255,0.42)_28%,rgba(247,251,255,0)_54%),radial-gradient(circle_at_50%_74%,rgba(247,251,255,0)_20%,rgba(247,251,255,0.88)_68%)]" />
        </div>

        {/* Hero Content */}
        <div className="flex flex-col items-center text-center relative z-20 px-4 sm:px-6 max-w-7xl mx-auto mb-32">
          <SpringReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/50 backdrop-blur-xl px-4 py-1.5 text-[11px] font-bold text-slate-500 mb-8 uppercase tracking-[0.2em] shadow-premium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ocean opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-ocean"></span>
              </span>
              {home.eyebrow}
            </div>
          </SpringReveal>

          <div className="max-w-5xl mx-auto min-h-[140px] flex items-center justify-center">
             <TypingAnimation 
                className="text-5xl md:text-[5.5rem] font-extrabold text-ink tracking-tight leading-[1.1] justify-center display-heading"
                duration={50}
             >
                The operating layer for modern healthcare.
             </TypingAnimation>
          </div>

          <Reveal delay={0.6}>
            <p className="mt-10 text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
              Cinematic booking, consent, and dispatch for elite UK practitioners. Premium infrastructure for high-trust teams.
            </p>
          </Reveal>

          <div className="mt-12 grid w-full max-w-3xl grid-cols-3 gap-6 text-center">
            {[
              { value: 6, label: "physio service categories" },
              { value: 3, label: "language-ready intake paths" },
              { value: 5, label: "dispatch statuses tracked" }
            ].map((stat, index) => (
              <BlurFade key={stat.label} delay={0.12 * index + 0.65} inView blur="10px" direction="up">
                <div>
                  <NumberTicker
                    value={stat.value}
                    delay={0.16 * index}
                    className="text-4xl font-black tracking-tight text-ink sm:text-5xl"
                  />
                  <p className="mx-auto mt-3 max-w-36 text-[10px] font-bold uppercase leading-relaxed tracking-[0.16em] text-slate-400 sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              </BlurFade>
            ))}
          </div>

          <Reveal delay={0.8}>
            <div className="mt-14 flex flex-col sm:flex-row items-center gap-6">
              <Magnetic>
                <Link href="/services/physiotherapy" className="inline-flex h-16 items-center justify-center gap-3 rounded-full bg-ocean px-12 text-base font-extrabold text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-105 hover:bg-blue-600 active:scale-95">
                  {home.primaryCta}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Magnetic>
              <Link href="/services" className="inline-flex h-16 items-center justify-center gap-3 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md px-10 text-base font-extrabold text-slate-600 transition-all hover:bg-white hover:text-ink active:scale-95 shadow-sm">
                {home.secondaryCta}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
        <ProgressiveBlur className="bottom-0 z-30 h-28" />
      </section>

      {/* --- STANDOUT FEATURES (Bento Grid) --- */}
      <section className="py-24 md:py-32 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20 md:mb-32">
          <Reveal>
             <div className="inline-flex items-center gap-2 rounded-full bg-ocean/5 border border-ocean/10 px-4 py-1.5 mb-6">
                <Activity className="h-4 w-4 text-ocean" />
                <span className="text-[11px] font-bold text-ocean uppercase tracking-[0.2em]">Key Features</span>
             </div>
             <h2 className="text-4xl md:text-[5.5rem] font-extrabold text-ink tracking-tight leading-[1] display-heading">
                Explore Our <br /><span className="text-ocean">Standout Features.</span>
             </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
          <Reveal className="md:col-span-2 lg:col-span-7">
            <article className="group relative h-full min-h-[500px] overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-6 sm:p-8 shadow-premium transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(18,100,255,0.12),transparent_34%),linear-gradient(135deg,rgba(248,250,252,1),rgba(255,255,255,0.65))]" />
              <div className="relative z-10 grid h-full gap-8 xl:grid-cols-[0.88fr_1.12fr]">
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-ocean text-white shadow-lg shadow-blue-500/25">
                      <Activity className="h-6 w-6" />
                    </div>
                    <p className="text-[11px] font-black uppercase tracking-[0.22em] text-ocean">Patient request engine</p>
                    <h3 className="mt-4 text-3xl font-extrabold tracking-tight text-ink">Guided intake that captures the useful details first.</h3>
                    <p className="mt-5 text-sm font-medium leading-7 text-slate-500">
                      Service category, DOB, preferred language, visit type, timing, and contact consent are collected before the team starts follow-up.
                    </p>
                  </div>
                  <Link href="/services/physiotherapy" className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-ocean">
                    Start request <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="relative min-h-[360px] overflow-hidden rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4 sm:p-5">
                  <div className="absolute inset-0 tech-grid opacity-70" />
                  <div className="relative z-10 overflow-hidden rounded-[1.25rem] border border-slate-100 bg-white shadow-soft-xl">
                    <div className="flex items-center justify-between border-b border-slate-100 bg-white px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      </div>
                      <span className="rounded-full bg-ocean/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-ocean">
                        Intake live
                      </span>
                    </div>

                    <div className="p-4">
                      <div className="mb-4 flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Request</p>
                          <p className="mt-1 text-sm font-black text-ink">Home Visit Intake</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ocean text-white shadow-lg shadow-blue-500/20">
                          <Activity className="h-6 w-6" />
                        </div>
                      </div>

                      <AnimatedList>
                        {[
                          ["Service", "Elderly mobility assessment", "Captured"],
                          ["Visit type", "Home · SW1A postcode required", "Required"],
                          ["Language", "Vietnamese preference", "Ready"],
                          ["Consent", "3 legal acknowledgements", "Complete"],
                        ].map(([label, value, status], index) => (
                          <div
                            key={label}
                            className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 rounded-2xl border border-slate-100 bg-white px-3 py-3 shadow-sm"
                          >
                            <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black ${
                              index === 0 ? "bg-ocean text-white" : "bg-slate-50 text-ocean"
                            }`}>
                              0{index + 1}
                            </span>
                            <div className="min-w-0">
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
                              <p className="mt-1 truncate text-sm font-black text-ink">{value}</p>
                            </div>
                            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-emerald-600">
                              {status}
                            </span>
                          </div>
                        ))}
                      </AnimatedList>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-2 lg:col-span-5">
            <article className="group relative h-full min-h-[500px] overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-6 text-ink shadow-premium transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(18,100,255,0.10),transparent_34%),linear-gradient(180deg,#ffffff,#f8fbff)]" />
              <div className="absolute inset-0 tech-grid opacity-60" />
              <div className="relative z-20 flex h-full flex-col">
                <div>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-ocean text-white shadow-lg shadow-blue-500/20">
                    <Workflow className="h-6 w-6" />
                  </div>
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-ocean">Dispatch cockpit</p>
                  <h3 className="mt-4 text-3xl font-extrabold tracking-tight">Status queue without scattered follow-up.</h3>
                </div>

                <div className="relative mt-8 h-64 overflow-hidden rounded-[1.5rem] border border-slate-100 bg-slate-50/80 shadow-inner">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(18,100,255,0.12),transparent_48%)]" />
                  <div className="absolute inset-5 rounded-[1.25rem] border border-ocean/10 bg-white/30" />
                  <AnimatedBeam
                    className="opacity-90"
                    path="M82 86 C132 92 164 142 204 178"
                    duration={3.6}
                    strokeWidth={4}
                  />
                  <AnimatedBeam
                    className="opacity-90"
                    path="M358 86 C308 92 276 142 236 178"
                    duration={4}
                    strokeWidth={4}
                  />
                  <AnimatedBeam
                    className="opacity-80"
                    path="M82 294 C132 284 164 238 204 202"
                    duration={4.4}
                    reverse
                    strokeWidth={4}
                  />
                  <AnimatedBeam
                    className="opacity-80"
                    path="M358 294 C308 284 276 238 236 202"
                    duration={4.8}
                    reverse
                    strokeWidth={4}
                  />
                  <div className="absolute left-1/2 top-1/2 z-20 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl bg-white text-ocean shadow-2xl shadow-blue-500/15 ring-1 ring-ocean/10">
                    <LayoutDashboard className="h-8 w-8" />
                  </div>
                  {[
                    { label: "Intake", meta: "Pending", icon: ClipboardList, className: "left-7 top-8", tone: "bg-amber-100 text-amber-700" },
                    { label: "Consent", meta: "Verified", icon: ShieldCheck, className: "right-7 top-8", tone: "bg-emerald-100 text-emerald-700" },
                    { label: "Partner", meta: "Assigned", icon: UserCheck, className: "left-7 bottom-8", tone: "bg-ocean/10 text-ocean" },
                    { label: "Email", meta: "Queued", icon: MailCheck, className: "right-7 bottom-8", tone: "bg-blue-100 text-ocean" },
                  ].map((node) => (
                    <div
                      key={node.label}
                      className={`absolute z-30 flex items-center gap-2 rounded-2xl border border-white/80 bg-white/95 px-3 py-2 shadow-lg shadow-blue-500/10 ${node.className}`}
                    >
                      <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${node.tone}`}>
                        <node.icon className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400">{node.label}</span>
                        <span className="block text-xs font-black text-ink">{node.meta}</span>
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 space-y-3">
                  <AnimatedList>
                    {["Pending", "Partner assigned", "Confirmed", "Completed"].map((status, index) => (
                      <div key={status} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm transition group-hover:translate-x-1">
                        <span className="text-sm font-bold">{status}</span>
                        <span className="text-xs font-black text-ocean">0{index + 1}</span>
                      </div>
                    ))}
                  </AnimatedList>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-4">
            <article className="group relative h-full min-h-[360px] overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-6 sm:p-8 shadow-premium transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
              <div className="grid h-full gap-8 sm:grid-cols-[1fr_0.9fr] sm:items-center lg:grid-cols-1 lg:items-start">
                <div className="relative z-10">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <Languages className="h-6 w-6" />
                  </div>
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-600">Language readiness</p>
                  <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-ink">Built for UK families who need clear communication.</h3>
                  <p className="mt-4 text-sm font-medium leading-6 text-slate-500">English-first now, structured for Chinese and Vietnamese expansion.</p>
                </div>
                <div className="relative z-10 lg:mt-auto">
                  <AnimatedList>
                    {[
                      ["EN", "Default English intake"],
                      ["ZH", "Chinese-ready labels"],
                      ["VI", "Vietnamese preference"]
                    ].map(([label, body], index) => (
                      <div
                        key={label}
                        className={`flex items-center gap-3 rounded-2xl border border-slate-100 p-3 shadow-sm ${
                          index === 2 ? "bg-ocean text-white" : "bg-slate-50 text-ink"
                        }`}
                      >
                        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-black ${index === 2 ? "bg-white/15" : "bg-white"}`}>{label}</span>
                        <span className={`text-xs font-bold ${index === 2 ? "text-blue-50" : "text-slate-500"}`}>{body}</span>
                      </div>
                    ))}
                  </AnimatedList>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.2} className="lg:col-span-4">
            <article className="group relative h-full min-h-[360px] overflow-hidden rounded-[2rem] border border-slate-100 bg-porcelain p-6 sm:p-8 shadow-premium transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
              <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "repeating-linear-gradient(-45deg, #cbd5e1 0, #cbd5e1 1px, transparent 1px, transparent 14px)" }} />
              <div className="relative z-10">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-ocean/10 text-ocean">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-ocean">Trust boundaries</p>
                <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-ink">P2C coordinates. Qualified professionals deliver care.</h3>
                <p className="mt-4 text-sm font-medium leading-6 text-slate-500">The UX keeps clinical liability, emergency advice, and HCPC/CSP trust language visible.</p>
                <AnimatedList className="mt-8">
                  {[
                    ["Liability", "Coordinator language stays explicit"],
                    ["Emergency", "Hard-stop acknowledgement retained"],
                    ["Credentials", "HCPC/CSP assets stay customer supplied"],
                  ].map(([title, body], index) => (
                    <div key={title} className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white/80 p-3 shadow-sm backdrop-blur">
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${index === 1 ? "bg-ocean/10 text-ocean" : "bg-emerald-50 text-emerald-600"}`}>
                        <ShieldCheck className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest text-slate-500">{title}</p>
                        <p className="mt-1 text-xs font-medium leading-5 text-slate-500">{body}</p>
                      </div>
                    </div>
                  ))}
                </AnimatedList>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.25} className="lg:col-span-4">
            <article className="group relative h-full min-h-[360px] overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-6 sm:p-8 shadow-premium transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
              <div className="relative z-10">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan/10 text-ocean">
                  <LayoutDashboard className="h-6 w-6" />
                </div>
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-ocean">Mini CRM</p>
                <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-ink">Contact context lands with the booking.</h3>
                <p className="mt-4 text-sm font-medium leading-6 text-slate-500">Patient details, enquiry source, language, and status stay visible for internal follow-up.</p>
                <div className="mt-7 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-3 shadow-sm">
                  <AnimatedList>
                    {[
                      ["Home Visit Intake", "SW1A · Vietnamese · Pending", "HV", "bg-ocean text-white"],
                      ["Language preference", "Chinese labels ready for follow-up", "ZH", "bg-emerald-50 text-emerald-600"],
                      ["Consent record", "Emergency acknowledgement complete", "OK", "bg-blue-50 text-ocean"],
                      ["Confirmation email", "Queued after saved request", "@", "bg-slate-100 text-slate-500"]
                    ].map(([title, meta, badge, badgeClass]) => (
                      <div key={title} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
                        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xs font-black ${badgeClass}`}>
                          {badge}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-black text-ink">{title}</p>
                          <p className="mt-1 truncate text-[10px] font-bold text-slate-400">{meta}</p>
                        </div>
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      </div>
                    ))}
                  </AnimatedList>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* --- ANALYTICS (Reference Phone Orbit) --- */}
      <section className="relative overflow-hidden bg-porcelain px-4 py-24 text-ink sm:px-6 md:py-32">
        <div className="absolute inset-0 tech-grid opacity-70" />
        <div className="absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ocean/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <Reveal>
            <div className="text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-ocean/5 border border-ocean/10 px-4 py-1.5">
                <LayoutDashboard className="h-4 w-4 text-ocean" />
                <span className="text-[11px] font-bold text-ocean uppercase tracking-[0.2em]">Operational Analytics</span>
              </div>
              <h2 className="text-4xl md:text-[5.5rem] font-extrabold text-ink tracking-tight leading-[1] display-heading">
                Operational signals, <br /><span className="text-ocean">centered around dispatch.</span>
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
                        <div className="mb-5 flex items-center justify-between text-xs font-semibold text-slate-500">
                          <span>9:41</span>
                          <span className="rounded-full bg-ocean/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-ocean">Live</span>
                        </div>
                        <div className="rounded-[1.6rem] border border-slate-100 bg-white p-5 shadow-premium">
                          <div className="mb-5 flex items-center justify-between">
                            <p className="text-sm font-black">Dispatch</p>
                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-600">Synced</span>
                          </div>
                          {[
                            ["Request", "Home Visit", "SW1A"],
                            ["Queue", "Partner", "Assigned"],
                          ].map(([label, title, meta]) => (
                            <div key={label} className="mb-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
                              <div className="mt-2 flex items-center justify-between">
                                <span className="text-base font-black">{title}</span>
                                <span className="text-xs font-bold text-ocean">{meta}</span>
                              </div>
                            </div>
                          ))}
                          <div className="mt-5 grid grid-cols-2 gap-3">
                            <div className="rounded-2xl bg-ocean/10 p-4">
                              <p className="text-2xl font-black text-ocean">63%</p>
                              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">Home visits</p>
                            </div>
                            <div className="rounded-2xl bg-emerald-50 p-4">
                              <p className="text-2xl font-black text-emerald-600">100%</p>
                              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">Consent</p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-auto rounded-2xl bg-ocean px-5 py-4 text-center text-sm font-bold text-white shadow-lg shadow-blue-500/20">
                          Review workflow
                        </div>
                      </div>
                    </Iphone>
                  </MotionDiv>
                )}
              </ParallaxStage>
            </div>

            <div className="pointer-events-none absolute left-1/2 top-[42%] z-30 hidden w-52 -translate-x-[-92px] -translate-y-1/2 rounded-[1.5rem] border border-white/80 bg-white/95 p-4 shadow-2xl shadow-blue-500/15 backdrop-blur md:block">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ocean text-white shadow-lg shadow-blue-500/20">
                  <Workflow className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Beam hub</p>
                  <p className="text-sm font-black text-ink">{activeAnalytics.title}</p>
                </div>
              </div>
              <p className="mt-4 text-xs font-medium leading-5 text-slate-500">
                {activeAnalytics.body}
              </p>
            </div>

            <div className="grid gap-6 pt-[620px] md:block md:pt-0">
              {ANALYTICS_BEAM_NODES.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActiveAnalyticsNode(item.title)}
                  aria-pressed={activeAnalyticsNode === item.title}
                  className={`group flex items-center gap-4 rounded-2xl border p-5 text-left shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-premium focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean/40 md:absolute md:w-80 ${item.side === "left" ? "md:flex-row-reverse md:text-right" : "md:flex-row"} ${item.nodeClassName} ${activeAnalyticsNode === item.title ? "border-ocean/25 bg-white shadow-premium" : "border-slate-100 bg-white/80"}`}
                >
                  <span className={`order-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition md:order-none ${activeAnalyticsNode === item.title ? "bg-ocean text-white" : "bg-ocean/10 text-ocean group-hover:bg-ocean group-hover:text-white"}`}>
                    <item.icon className="h-6 w-6" />
                  </span>
                  <span className="block">
                    <span className="block text-xl font-bold text-ink">{item.title}</span>
                    <span className="mt-2 block text-sm leading-6 text-slate-500">{item.body}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- VISION (Detailed Section) --- */}
      <section className="py-24 md:py-48 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20 md:mb-32">
           <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full bg-ocean/5 border border-ocean/10 px-4 py-1.5 mb-6">
                 <ShieldCheck className="h-4 w-4 text-ocean" />
                 <span className="text-[11px] font-bold text-ocean uppercase tracking-[0.2em]">The Vision</span>
              </div>
              <h2 className="text-4xl md:text-[5.5rem] font-extrabold text-ink tracking-tight leading-[1] display-heading">
                 Experience The <br /><span className="text-ocean">Future of Care.</span>
              </h2>
           </Reveal>
        </div>

        <div className="bg-porcelain/50 border border-slate-100 rounded-[4rem] p-12 md:p-20 grid lg:grid-cols-[1.2fr_1fr] gap-20 items-center overflow-hidden relative group">
           <BorderBeam colorFrom="#1264ff" colorTo="#10b981" duration={8} borderWidth={2} />
           <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
           
           <Reveal className="relative z-10">
              <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-premium flex flex-col items-center relative overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-ocean/5 rounded-full blur-[80px] pointer-events-none" />
                 <div className="flex justify-between items-center w-full mb-10 relative z-10">
                    <p className="text-lg font-bold text-ink">Care loop</p>
                    <div className="h-8 w-28 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">Phase 1 MVP</div>
                 </div>
                 <div className="relative z-10 flex h-64 w-64 items-center justify-center">
                    <AnimatedCircularProgressBar
                      value={75}
                      max={100}
                      min={0}
                      gaugePrimaryColor="#1264ff"
                      gaugeSecondaryColor="#dbeafe"
                      className="size-64 text-4xl font-black text-ink"
                    />
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pt-14">
                       <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Core handoffs</p>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-10 mt-10 w-full relative z-10">
                    <div className="flex items-center gap-3">
                       <div className="h-3 w-3 rounded-full bg-ocean animate-pulse" />
                       <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Public</p>
                          <p className="text-base font-bold text-ink">Request</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" style={{ animationDelay: '1s' }} />
                       <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Internal</p>
                          <p className="text-base font-bold text-ink">Dispatch</p>
                       </div>
                    </div>
                 </div>
                 <div className="mt-12 grid w-full grid-cols-2 gap-3 relative z-10">
                    {["Request", "Validate", "Route", "Confirm"].map((step) => (
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
                    <div className="h-1.5 w-1.5 rounded-full bg-ocean animate-ping" /> Scalable coordination infrastructure
                 </div>
                 <h3 className="text-4xl font-bold text-ink tracking-tight">Start with physiotherapy, then reuse the operating model.</h3>
                 <p className="mt-6 text-slate-500 text-lg leading-relaxed font-medium">
                    The requirement is not just a booking form. It is a reusable customer-to-partner layer: public intake, rule-based validation, secure internal queue, status tracking, and follow-up visibility.
                 </p>
                 <div className="mt-10 space-y-4">
                    {[
                      "Centralize enquiries that would otherwise arrive through calls, email, and messaging.",
                      "Protect Home Visit operations with postcode and address requirements before dispatch.",
                      "Keep P2C positioned as the coordinator while HCPC/CSP professionals handle clinical delivery.",
                      "Prepare the platform for future CRM and partner-routing workflows without adding Phase 1 vendor portals."
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

      {/* --- TESTIMONIALS --- */}
      <section className="py-24 md:py-32 overflow-hidden bg-white relative">
        <div className="text-center mb-20 px-4 sm:px-6 max-w-7xl mx-auto relative z-20">
           <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-100 px-4 py-1.5 mb-6">
                 <MessageSquareQuote className="h-4 w-4 text-slate-400" />
                 <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Wall of Love</span>
              </div>
              <h2 className="text-4xl md:text-[4.5rem] font-extrabold text-ink tracking-tight display-heading">Trusted by <br /><span className="text-ocean">Elite Clinics.</span></h2>
           </Reveal>
        </div>

        <div className="relative flex flex-col items-center justify-center overflow-hidden py-10 w-full max-w-[100vw]">
          
          <Marquee pauseOnHover className="[--duration:40s]">
             {home.testimonials.slice(0, Math.ceil(home.testimonials.length / 2)).map((t, i) => (
                <div key={i} className="mx-4 flex w-[400px] flex-col justify-between bg-porcelain rounded-[2rem] p-8 border border-slate-100 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-premium relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-ocean/5 rounded-full blur-3xl group-hover:bg-ocean/10 transition-colors" />
                   <div className="relative z-10 flex gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map(s => <span key={s} className="text-ocean text-lg">★</span>)}
                   </div>
                   <p className="relative z-10 text-ink text-base leading-relaxed font-semibold italic flex-1">
                      &quot;{t.quote}&quot;
                   </p>
                   <div className="relative z-10 mt-8 pt-6 border-t border-slate-200/50 flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                         <UserCheck className="h-5 w-5 text-ocean" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-ink">{t.name}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{t.role}</p>
                      </div>
                   </div>
                </div>
             ))}
          </Marquee>

          <Marquee reverse pauseOnHover className="[--duration:40s] mt-8">
             {home.testimonials.slice(Math.ceil(home.testimonials.length / 2)).map((t, i) => (
                <div key={i + 100} className="mx-4 flex w-[400px] flex-col justify-between bg-porcelain rounded-[2rem] p-8 border border-slate-100 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-premium relative overflow-hidden group">
                   <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors" />
                   <div className="relative z-10 flex gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map(s => <span key={s} className="text-ocean text-lg">★</span>)}
                   </div>
                   <p className="relative z-10 text-ink text-base leading-relaxed font-semibold italic flex-1">
                      &quot;{t.quote}&quot;
                   </p>
                   <div className="relative z-10 mt-8 pt-6 border-t border-slate-200/50 flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                         <UserCheck className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-ink">{t.name}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{t.role}</p>
                      </div>
                   </div>
                </div>
             ))}
          </Marquee>

          {/* Strong Fade Gradients to hide the edges perfectly */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-white via-white/80 to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[15%] bg-gradient-to-l from-white via-white/80 to-transparent z-10"></div>
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
                          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-blue-100">Public intake</p>
                          <p className="mt-1 text-xl font-black">Request saved</p>
                        </div>
                        <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest text-ocean">Live</span>
                      </div>
                      <div className="space-y-3">
                        {[
                          ["Service", "Elderly mobility"],
                          ["Visit", "Home · SW1A"],
                          ["Language", "Vietnamese"],
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
                    <p className="mb-5 text-[11px] font-black uppercase tracking-[0.24em] text-blue-100">Local review milestone</p>
                    <h2 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight leading-[1] display-heading">
                      Ready to launch <br />your operations?
                    </h2>
                    <p className="mt-8 text-lg md:text-xl text-blue-100 max-w-xl font-medium">
                      Start with the request engine, then connect Supabase, Resend, and admin credentials when the production handoff is ready.
                    </p>
                    <div className="mt-10 flex flex-col gap-4 sm:flex-row lg:justify-start">
                      <Magnetic>
                        <Link href="/services/physiotherapy" className="inline-flex h-16 items-center justify-center gap-3 rounded-full bg-white px-12 text-base font-extrabold text-ocean shadow-xl transition-all hover:scale-105 active:scale-95">
                          Get Started Now
                          <ArrowRight className="h-5 w-5" />
                        </Link>
                      </Magnetic>
                    </div>
                  </div>

                  <MotionDiv style={{ y: ySlow, scale, opacity }} className="order-3">
                    <div className="rounded-[2rem] border border-white/20 bg-white p-4 text-left shadow-2xl">
                      <div className="mb-5 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Admin dispatch</p>
                          <p className="mt-1 text-xl font-black text-ink">Queue cockpit</p>
                        </div>
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-600">Assigned</span>
                      </div>
                      <div className="overflow-hidden rounded-2xl border border-slate-100">
                        {[
                          ["Pending", "02"],
                          ["Partner assigned", "01"],
                          ["Confirmed", "03"],
                          ["Completed", "04"],
                        ].map(([status, count]) => (
                          <div key={status} className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-4 py-3 last:border-b-0">
                            <div>
                              <p className="text-sm font-black text-ink">{status}</p>
                              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Physio workflow</p>
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
      <section className="py-24 md:py-32 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
           <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-100 px-4 py-1.5 mb-6">
                 <MessageSquareQuote className="h-4 w-4 text-slate-400" />
                 <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">FAQ</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-ink tracking-tight display-heading">Frequently Asked <span className="text-ocean">Questions.</span></h2>
           </Reveal>
        </div>
        
        <div className="space-y-4">
           {[
             { q: "How often should I review my operational data?", a: "We recommend reviewing your data at least once a week. Regular check-ins help you stay on top of dispatch efficiency and partner coordination." },
             { q: "What kind of clinical data can I track?", a: "You can track patient intake, consent timestamps, language preferences, and treatment categories securely." },
             { q: "Can I manage partner matching automatically?", a: "Yes, our system includes smart routing logic to match patients with the most appropriate professional partners." }
           ].map((item, i) => (
             <Reveal key={i} delay={0.1 * i}>
                <div className="bg-white border border-slate-100 rounded-3xl p-8 hover:border-ocean/30 transition-colors group cursor-pointer">
                   <div className="flex justify-between items-center gap-6">
                      <p className="text-lg font-bold text-ink">{item.q}</p>
                      <div className="h-8 w-8 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-ocean group-hover:text-white transition-all">
                         <Plus className="h-4 w-4" />
                      </div>
                   </div>
                </div>
             </Reveal>
           ))}
        </div>
      </section>

    </main>
  );
}
