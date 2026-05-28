"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Zap,
  Activity,
  UserCheck,
  Globe2,
  Workflow,
  Shield,
  FileCheck2,
  LayoutDashboard,
  MailCheck,
  MessageSquareQuote,
  Clock,
  MapPin,
  Languages,
  MousePointer2,
  Smartphone,
  CreditCard,
  TrendingUp,
  PieChart,
  Lock,
  Search,
  Plus
} from "lucide-react";

import { 
  Reveal, 
  SpringReveal, 
  Magnetic, 
  ParallaxStage, 
  MotionDiv, 
  TextJump, 
  VerticalMarquee, 
  ScrollScale 
} from "@/components/home/motion-primitives";
import RippleGrid from "@/components/home/ripple-grid";
import { getDictionary } from "@/lib/i18n/dictionary";

// --- SUB-COMPONENTS FOR MOCKUPS ---

const DetailedFizenCard = ({ className = "" }: { className?: string }) => (
  <div className={`relative w-80 h-48 rounded-[2rem] bg-gradient-to-br from-blue-600 to-blue-800 p-6 shadow-2xl overflow-hidden flex flex-col justify-between group transition-transform duration-500 hover:scale-[1.02] ${className}`}>
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-colors" />
    <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 rounded-full blur-[80px] -translate-x-1/4 translate-y-1/4" />
    
    <div className="relative z-10 flex justify-between items-start">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
           <Activity className="h-5 w-5 text-white/90" />
           <span className="text-white font-black italic tracking-tighter text-lg">P2C Growth</span>
        </div>
        <div className="h-8 w-11 rounded-lg bg-gradient-to-br from-yellow-300 to-yellow-500 border border-white/20 shadow-inner mt-2" />
      </div>
      <div className="flex gap-1 opacity-50">
        <div className="h-6 w-6 rounded-full bg-white" />
        <div className="h-6 w-6 rounded-full bg-white -ml-3" />
      </div>
    </div>

    <div className="relative z-10 space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Available Balance</p>
          <p className="text-2xl font-bold text-white tracking-tight">£14,842.00</p>
        </div>
        <div className="text-right">
          <p className="text-[8px] font-bold text-white/50 uppercase tracking-[0.2em]">Exp Date</p>
          <p className="text-xs font-bold text-white tracking-widest">05/29</p>
        </div>
      </div>
      <div className="flex justify-between items-center pt-2 border-t border-white/10">
        <p className="text-[11px] font-mono text-white/70 tracking-[0.25em]">•••• •••• •••• 5318</p>
        <div className="h-4 w-4 rounded-full border border-white/20 flex items-center justify-center">
          <Lock className="h-2 w-2 text-white/50" />
        </div>
      </div>
    </div>
  </div>
);

const DetailedAreaChart = ({ className = "" }: { className?: string }) => (
  <div className={`bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-premium ${className}`}>
    <div className="flex justify-between items-center mb-10">
      <div>
        <h4 className="text-lg font-bold text-ink tracking-tight">Financial Growth</h4>
        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Performance Matrix</p>
      </div>
      <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-full px-3 py-1.5">
        <TrendingUp className="h-3.5 w-3.5 text-mint" />
        <span className="text-xs font-bold text-mint">+24.8%</span>
      </div>
    </div>

    <div className="relative h-48 w-full mt-4">
       <svg className="w-full h-full overflow-visible" viewBox="0 0 400 150" preserveAspectRatio="none">
          <defs>
             <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1264ff" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#1264ff" stopOpacity="0" />
             </linearGradient>
          </defs>
          <path 
            d="M0,130 C40,120 60,140 100,90 C140,40 180,60 220,30 C260,0 300,50 340,40 C380,30 400,10 400,10 L400,150 L0,150 Z" 
            fill="url(#chartGradient)"
          />
          <path 
            d="M0,130 C40,120 60,140 100,90 C140,40 180,60 220,30 C260,0 300,50 340,40 C380,30 400,10 400,10" 
            fill="none" 
            stroke="#1264ff" 
            strokeWidth="3" 
            strokeLinecap="round"
          />
          <circle cx="220" cy="30" r="6" fill="#1264ff" className="animate-pulse" />
          <circle cx="220" cy="30" r="10" stroke="#1264ff" strokeWidth="2" fill="none" opacity="0.3" />
       </svg>
       
       <div className="absolute top-0 left-[220px] -translate-x-1/2 -translate-y-full mb-4 z-20">
          <div className="bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap flex items-center gap-2">
             <span>MARCH PEAK:</span>
             <span className="text-cyan">£82,400</span>
          </div>
          <div className="w-px h-12 bg-slate-200 mx-auto" />
       </div>
    </div>

    <div className="flex justify-between mt-8">
       {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'].map(m => (
         <span key={m} className="text-[10px] font-bold text-slate-300 tracking-widest">{m}</span>
       ))}
    </div>
  </div>
);

const DetailedPhoneFrame = ({ className = "" }: { className?: string }) => (
  <div className={`relative w-[300px] h-[600px] bg-slate-950 rounded-[3rem] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-[8px] border-slate-900 ${className}`}>
    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-32 bg-slate-950 rounded-b-2xl z-30 flex items-center justify-center gap-1.5 px-4">
       <div className="h-1.5 w-10 bg-slate-800 rounded-full" />
       <div className="h-1.5 w-1.5 rounded-full bg-slate-800" />
    </div>
    
    <div className="w-full h-full bg-porcelain rounded-[2.2rem] overflow-hidden flex flex-col pt-10 px-6 pb-6 relative z-10">
       <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Good morning,</p>
            <p className="text-xl font-bold text-ink">Jason Lee</p>
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
                   <p className="text-sm font-bold text-ink">Physio Intake</p>
                   <p className="text-xs text-slate-500">Elderly Mobility Assessment</p>
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
          <p className="text-white text-xs font-bold">New Notification</p>
          <p className="text-blue-100 text-[10px]">Your report is ready to view</p>
       </div>
    </div>
  </div>
);

export default function HomePage() {
  const { home } = getDictionary();

  return (
    <main className="relative bg-white overflow-hidden selection:bg-blue-100 selection:text-blue-900 font-sans">
      
      {/* --- RIPPLE GRID HERO SECTION --- */}
      <section className="relative min-h-[95vh] flex flex-col items-center justify-center pt-32 pb-20 md:pt-48 md:pb-40 bg-porcelain overflow-hidden">
        
        {/* React Bits Ripple Grid */}
        <div className="absolute inset-0 opacity-40">
           <RippleGrid 
              gridColor="#1264ff" 
              gridSize={0.06} 
              gridThickness={0.012} 
              rippleIntensity={0.04} 
              mouseInteractionRadius={0.6}
              glowIntensity={0.05}
           />
        </div>

        {/* Hero Content */}
        <div className="flex flex-col items-center text-center relative z-10 px-4 sm:px-6 max-w-7xl mx-auto">
          <SpringReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/50 backdrop-blur-xl px-4 py-1.5 text-[11px] font-bold text-slate-500 mb-8 uppercase tracking-[0.2em] shadow-premium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ocean opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-ocean"></span>
              </span>
              {home.eyebrow}
            </div>
          </SpringReveal>

          <div className="max-w-5xl mx-auto">
             <TextJump className="text-5xl md:text-[5.5rem] font-extrabold text-ink tracking-tight leading-[1] justify-center display-heading">
                The operating layer for modern healthcare.
             </TextJump>
          </div>

          <Reveal delay={0.6}>
            <p className="mt-10 text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
              Cinematic booking, consent, and dispatch for elite UK practitioners. Premium infrastructure for high-trust teams.
            </p>
          </Reveal>

          <Reveal delay={0.8}>
            <div className="mt-14 flex flex-col sm:flex-row items-center gap-6">
              <Magnetic>
                <Link href="/services/physiotherapy" className="inline-flex h-16 items-center justify-center gap-3 rounded-full bg-ocean px-12 text-base font-extrabold text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-105 hover:bg-blue-600 active:scale-95">
                  {home.primaryCta}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Magnetic>
              <Link href="/services" className="inline-flex h-16 items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-10 text-base font-extrabold text-slate-600 transition-all hover:bg-slate-50 hover:text-ink active:scale-95 shadow-sm">
                {home.secondaryCta}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* HERO MOCKUPS (Detailed & Impressive) */}
        <div className="relative mt-32 w-full max-w-7xl mx-auto px-4 min-h-[500px]">
          <ParallaxStage>
            {({ ySlow, yFast }) => {
              return (
                <div className="relative w-full flex items-center justify-center">
                  
                  {/* Background Dashboard Frame */}
                  <MotionDiv 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="w-full max-w-5xl aspect-[16/10] rounded-[3rem] bg-white border border-slate-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col p-2"
                  >
                    <div className="flex-1 rounded-[2.6rem] bg-porcelain/30 overflow-hidden flex flex-col border border-slate-50">
                       <div className="h-12 border-b border-slate-100 bg-white/50 flex items-center px-8 gap-4">
                          <div className="flex gap-2">
                             <div className="h-3 w-3 rounded-full bg-slate-100" />
                             <div className="h-3 w-3 rounded-full bg-slate-100" />
                             <div className="h-3 w-3 rounded-full bg-slate-100" />
                          </div>
                          <div className="mx-auto h-7 w-64 bg-slate-50 rounded-full border border-slate-100 flex items-center px-4">
                             <div className="h-1.5 w-full bg-slate-100 rounded-full" />
                          </div>
                       </div>
                       <div className="p-10 flex-1 grid grid-cols-12 gap-10">
                          <div className="col-span-3 space-y-8">
                             <div className="h-12 w-full bg-white rounded-2xl shadow-sm border border-slate-50" />
                             <div className="space-y-4">
                                {[1, 2, 3, 4].map(i => (
                                  <div key={i} className="h-3 w-full bg-slate-100/50 rounded-full" />
                                ))}
                             </div>
                          </div>
                          <div className="col-span-9 space-y-10">
                             <div className="grid grid-cols-3 gap-6">
                                {[1, 2, 3].map(i => (
                                  <div key={i} className="h-32 bg-white rounded-3xl border border-slate-50 shadow-sm" />
                                ))}
                             </div>
                             <div className="h-64 bg-white rounded-[2.5rem] border border-slate-50 shadow-sm" />
                          </div>
                       </div>
                    </div>
                  </MotionDiv>

                  {/* Floating Elements (Detailed) */}
                  <MotionDiv 
                    style={{ y: yFast, x: -100 }}
                    className="absolute top-0 left-0 z-20"
                  >
                    <DetailedFizenCard className="-rotate-12" />
                  </MotionDiv>

                  <MotionDiv 
                    style={{ y: ySlow, x: 100 }}
                    className="absolute -bottom-20 right-0 z-20"
                  >
                    <DetailedAreaChart className="rotate-6 w-[400px]" />
                  </MotionDiv>

                  <MotionDiv
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="absolute -top-10 -right-20 z-30"
                  >
                     <DetailedPhoneFrame className="scale-75" />
                  </MotionDiv>

                </div>
              );
            }}
          </ParallaxStage>
        </div>
      </section>

      {/* --- MARQUEE --- */}
      <section className="py-16 border-y border-slate-100 bg-white flex overflow-hidden">
        <div className="flex w-full overflow-hidden mask-horizontal-fade">
          <div className="flex w-max min-w-full animate-marquee items-center gap-20 px-10">
            {[1, 2, 3].map((set) => (
              <div key={set} className="flex items-center gap-20 lg:gap-32">
                <span className="flex items-center gap-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] whitespace-nowrap"><ShieldCheck className="h-6 w-6 text-ocean"/> HCPC Registered</span>
                <span className="flex items-center gap-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] whitespace-nowrap"><Languages className="h-6 w-6 text-ocean"/> Multi-lingual</span>
                <span className="flex items-center gap-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] whitespace-nowrap"><Workflow className="h-6 w-6 text-ocean"/> Workflow Logic</span>
                <span className="flex items-center gap-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] whitespace-nowrap"><Zap className="h-6 w-6 text-ocean"/> Instant Dispatch</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- STANDOUT FEATURES (Detailed Cards) --- */}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
           
           {/* Detailed Card Section */}
           <Reveal className="bg-porcelain rounded-[3rem] p-12 relative overflow-hidden flex flex-col items-center justify-center min-h-[600px] border border-slate-100 group">
              <div className="absolute inset-0 tech-grid opacity-30" />
              <div className="relative z-10 space-y-12 w-full max-w-md">
                 <div className="flex items-center justify-center">
                    <DetailedFizenCard className="rotate-3 group-hover:rotate-0 transition-transform duration-700" />
                 </div>
                 <div className="text-center">
                    <h3 className="text-2xl font-bold text-ink tracking-tight">Financial Infrastructure</h3>
                    <p className="mt-4 text-slate-500 leading-relaxed font-medium">
                       Manage every transaction and coordination with enterprise-grade clinical precision.
                    </p>
                 </div>
              </div>
           </Reveal>

           {/* Savings Goals Section */}
           <Reveal delay={0.2} className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-premium flex flex-col justify-center min-h-[600px] relative overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-ocean/5 rounded-full blur-3xl" />
              <div className="relative z-10 space-y-10">
                 <div>
                    <h3 className="text-3xl font-bold text-ink tracking-tight">Smart Savings Goals</h3>
                    <p className="mt-4 text-slate-500 font-medium">Set specific targets and track progress with automated dispatch logic.</p>
                 </div>
                 
                 <div className="space-y-4">
                    {[
                      { icon: Activity, label: "Buying Car", target: "£13,500", progress: "+£1,500", color: "text-ocean", bg: "bg-ocean/10" },
                      { icon: Clock, label: "House Savings", target: "£237,000", progress: "+£14,000", color: "text-mint", bg: "bg-mint/10" }
                    ].map((item, i) => (
                      <div key={i} className="bg-white border border-slate-100 p-6 rounded-3xl shadow-panel flex items-center justify-between group-hover:translate-x-2 transition-transform duration-500">
                         <div className="flex items-center gap-5">
                            <div className={`h-14 w-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center`}>
                               <item.icon className="h-7 w-7" />
                            </div>
                            <div>
                               <p className="text-lg font-bold text-ink">{item.label}</p>
                               <p className="text-xs font-bold text-slate-400 mt-0.5">10.02.2024</p>
                            </div>
                         </div>
                         <div className="text-right">
                            <p className="text-xl font-bold text-ink">{item.target}</p>
                            <p className={`text-xs font-bold ${item.color} mt-1`}>{item.progress}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </Reveal>
        </div>
      </section>

      {/* --- ANALYTICS (Phone & Chart) --- */}
      <section className="py-24 md:py-32 bg-porcelain relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
           <div className="grid lg:grid-cols-[1fr_1.2fr] gap-20 items-center">
              <div>
                 <Reveal>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-ink tracking-tight leading-[1.1] display-heading">
                       Financial <br />Analytics
                    </h2>
                    <p className="mt-8 text-slate-500 text-lg leading-relaxed font-medium max-w-sm">
                       Generate detailed reports and visualizations to analyze every operational touchpoint.
                    </p>
                    <div className="mt-12 flex gap-4">
                       <Link href="/services" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-ink text-white px-8 text-sm font-bold shadow-xl shadow-slate-900/20 hover:scale-105 transition-all">
                          View Demo
                       </Link>
                    </div>
                 </Reveal>
              </div>

              <div className="relative">
                 <ParallaxStage>
                    {({ ySlow, yFast }) => (
                      <div className="relative flex items-center justify-center h-[700px]">
                         <MotionDiv 
                           style={{ y: ySlow }}
                           className="z-10"
                         >
                            <DetailedPhoneFrame />
                         </MotionDiv>
                         <MotionDiv 
                           style={{ y: yFast }}
                           className="absolute -bottom-10 -left-20 z-20"
                         >
                            <div className="glass-panel-dark rounded-[2.5rem] p-8 w-[400px] border border-white/10 shadow-2xl overflow-hidden">
                               <div className="flex justify-between items-center mb-6">
                                  <p className="text-white font-bold tracking-tight">Report Expense</p>
                                  <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center">
                                     <Activity className="h-3 w-3 text-white" />
                                  </div>
                               </div>
                               <div className="h-40 w-full relative">
                                  <svg className="w-full h-full" viewBox="0 0 400 150">
                                     <path 
                                       d="M0,150 L0,100 C40,80 80,120 120,60 C160,20 200,40 240,10 C280,0 320,50 400,30 L400,150 Z" 
                                       fill="rgba(18, 100, 255, 0.4)" 
                                     />
                                     <path 
                                       d="M0,100 C40,80 80,120 120,60 C160,20 200,40 240,10 C280,0 320,50 400,30" 
                                       fill="none" 
                                       stroke="#1264ff" 
                                       strokeWidth="4" 
                                     />
                                  </svg>
                               </div>
                               <div className="flex justify-between mt-6">
                                  {['APR 05', 'APR 06', 'APR 07'].map(d => (
                                    <span key={d} className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{d}</span>
                                  ))}
                               </div>
                            </div>
                         </MotionDiv>
                      </div>
                    )}
                 </ParallaxStage>
              </div>
           </div>
        </div>
      </section>

      {/* --- THE FUTURE OF FINANCE (Detailed Section) --- */}
      <section className="py-24 md:py-48 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20 md:mb-32">
           <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full bg-ocean/5 border border-ocean/10 px-4 py-1.5 mb-6">
                 <ShieldCheck className="h-4 w-4 text-ocean" />
                 <span className="text-[11px] font-bold text-ocean uppercase tracking-[0.2em]">The Vision</span>
              </div>
              <h2 className="text-4xl md:text-[5.5rem] font-extrabold text-ink tracking-tight leading-[1] display-heading">
                 Experience The <br /><span className="text-ocean">Future of Finance.</span>
              </h2>
           </Reveal>
        </div>

        <div className="bg-porcelain/50 border border-slate-100 rounded-[4rem] p-12 md:p-20 grid lg:grid-cols-[1.2fr_1fr] gap-20 items-center overflow-hidden relative">
           <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
           
           <Reveal className="relative z-10">
              <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-premium flex flex-col items-center">
                 <div className="flex justify-between items-center w-full mb-10">
                    <p className="text-lg font-bold text-ink">Activity</p>
                    <div className="h-8 w-24 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">Month</div>
                 </div>
                 <div className="relative h-64 w-64 flex items-center justify-center">
                    <svg className="h-full w-full rotate-[-90deg]" viewBox="0 0 100 100">
                       <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="12" />
                       <circle cx="50" cy="50" r="40" fill="none" stroke="#1264ff" strokeWidth="12" strokeDasharray="188 251" strokeLinecap="round" />
                       <circle cx="50" cy="50" r="40" fill="none" stroke="#a855f7" strokeWidth="12" strokeDasharray="60 251" strokeDashoffset="-188" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                       <p className="text-4xl font-black text-ink">75%</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Goal Reached</p>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-10 mt-10 w-full">
                    <div className="flex items-center gap-3">
                       <div className="h-3 w-3 rounded-full bg-ocean" />
                       <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Physio</p>
                          <p className="text-base font-bold text-ink">55%</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="h-3 w-3 rounded-full bg-purple-500" />
                       <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Enquiries</p>
                          <p className="text-base font-bold text-ink">20%</p>
                       </div>
                    </div>
                 </div>
                 <button className="mt-12 w-full h-14 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold text-ink hover:bg-white transition-all">
                    View all activity
                 </button>
              </div>
           </Reveal>

           <div className="space-y-12 relative z-10">
              <Reveal delay={0.2}>
                 <p className="text-sm font-bold text-ocean uppercase tracking-widest mb-4 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-ocean" /> Time and Stress Reduction
                 </p>
                 <h3 className="text-4xl font-bold text-ink tracking-tight">Save your time and reduce <br />financial anxiety</h3>
                 <p className="mt-6 text-slate-500 text-lg leading-relaxed font-medium">
                    Automate tasks like budgeting, tracking, and saving, freeing up your time for more important things.
                 </p>
                 <div className="mt-10 space-y-4">
                    <div className="flex items-center gap-4">
                       <div className="h-6 w-6 rounded-full bg-ocean/10 text-ocean flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4" />
                       </div>
                       <p className="text-sm font-bold text-ink">Stay on top of your budget.</p>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="h-6 w-6 rounded-full bg-ocean/10 text-ocean flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4" />
                       </div>
                       <p className="text-sm font-bold text-ink">Automate your finances for less stress.</p>
                    </div>
                 </div>
              </Reveal>
           </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-24 md:py-32 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
           <Reveal>
              <h2 className="text-4xl md:text-[4.5rem] font-extrabold text-ink tracking-tight display-heading">Our Users <br /><span className="text-ocean">Talk About Us.</span></h2>
           </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           {home.testimonials.map((t, i) => (
             <Reveal key={i} delay={0.1 * i}>
                <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-premium flex flex-col h-full hover:-translate-y-2 transition-transform duration-500">
                   <div className="flex gap-1 mb-8">
                      {[1, 2, 3, 4, 5].map(s => <span key={s} className="text-ocean text-lg">★</span>)}
                   </div>
                   <p className="text-ink text-lg leading-relaxed font-semibold italic flex-1">
                      &quot;{t.quote}&quot;
                   </p>
                   <div className="mt-10 pt-8 border-t border-slate-100 flex items-center gap-4">
                      <div className="h-14 w-14 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center">
                         <UserCheck className="h-7 w-7 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-ink">{t.name}</p>
                        <p className="text-[10px] font-bold text-ocean uppercase tracking-widest mt-1">{t.role}</p>
                      </div>
                   </div>
                </div>
             </Reveal>
           ))}
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="px-4 sm:px-6 pb-24 md:pb-32 max-w-7xl mx-auto">
        <ScrollScale>
          <div className="bg-ocean rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden group shadow-2xl shadow-blue-500/30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent opacity-60" />
            <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight leading-[1] display-heading">
                Ready to launch <br />your operations?
              </h2>
              <p className="mt-10 text-lg md:text-xl text-blue-100 max-w-2xl mx-auto font-medium">
                Join the platform designed for high-trust teams who refuse to compromise on quality or speed.
              </p>
              <div className="mt-14 flex flex-col sm:flex-row justify-center gap-6">
                <Magnetic>
                  <Link href="/services/physiotherapy" className="inline-flex h-16 items-center justify-center gap-3 rounded-full bg-white px-12 text-base font-extrabold text-ocean shadow-xl transition-all hover:scale-105 active:scale-95">
                    Get Started Now
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>
        </ScrollScale>
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
