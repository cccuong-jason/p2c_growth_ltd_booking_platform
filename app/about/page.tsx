"use client";

import { Activity, Users, Shield, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/home/motion-primitives";
import { SectionBadge } from "@/components/ui/section-badge";

export default function AboutPage() {
  return (
    <main className="relative bg-white overflow-hidden selection:bg-blue-100 selection:text-blue-900 font-sans pb-32">
      
      {/* Background elements */}
      <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 md:pt-48 max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="max-w-3xl">
            <SectionBadge icon={Activity}>About P2C Growth</SectionBadge>
            <h1 className="text-4xl md:text-7xl font-extrabold text-ink tracking-tight leading-[1.05] display-heading mb-6 mt-4">
              Connecting businesses, <br />partners, and customers.
            </h1>
            <p className="text-lg font-semibold leading-relaxed text-slate-600 md:text-xl">
              P2C Growth LTD is a UK-based technology and software company that designs and builds practical digital systems to help businesses, partners, and customers connect more easily.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Core Split Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Information */}
          <Reveal>
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-ink tracking-tight mb-4">
                  Partner to Customer (P2C) Journey
                </h2>
                <p className="text-base font-semibold text-slate-500 leading-relaxed">
                  We don't replace professional service providers. Instead, we develop workflow tools and coordination platforms to make business execution simpler, faster, and more reliable.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ocean/10 text-ocean shadow-sm border border-ocean/5">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ink uppercase tracking-wider">Workflow Automation</h3>
                    <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-500">
                      Booking systems, email automation, status tracking, and mini CRM tools that keep operations moving without manual chasing.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shadow-sm border border-emerald-100/30">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ink uppercase tracking-wider">Partner Connection</h3>
                    <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-500">
                      Dedicated platforms that connect end-customers directly and securely with suitable professional partners and internal teams.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-ocean shadow-sm border border-blue-100/30">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ink uppercase tracking-wider">Focus on Execution</h3>
                    <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-500">
                      Clean data capture, consent stop checks, and structured intake pipelines that minimize administrative work.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/services"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-ocean px-6 text-sm font-black text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] hover:bg-blue-600 active:scale-[0.98]"
                >
                  Explore services
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Right Column: 2 Images */}
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-6 relative">
              {/* Image 1: Clinical Referral Placeholder */}
              <div className="relative aspect-[3/4] w-full rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-xl transition-transform duration-500 hover:scale-[1.02] mt-8">
                <Image 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80" 
                  alt="Clinical Partner Network" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-black text-ink shadow-sm border border-slate-100 uppercase tracking-widest">
                  Clinical model
                </div>
              </div>

              {/* Image 2: Digital Systems Dashboard Placeholder */}
              <div className="relative aspect-[3/4] w-full rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-xl transition-transform duration-500 hover:scale-[1.02]">
                <Image 
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80" 
                  alt="Operations Dashboard" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-black text-ink shadow-sm border border-slate-100 uppercase tracking-widest">
                  Tech operations
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

    </main>
  );
}