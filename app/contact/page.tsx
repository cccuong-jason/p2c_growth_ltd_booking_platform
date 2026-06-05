"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageSquare, MapPin, Phone, ArrowRight, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/home/motion-primitives";
import { SectionBadge } from "@/components/ui/section-badge";
import { BentoCard } from "@/components/ui/bento-card";
import { DottedMap, type Marker } from "@/components/ui/dotted-map";
import { FaqAccordion } from "@/components/ui/faq-accordion";

type MyMarker = Marker & {
  overlay: {
    countryCode: string;
    label: string;
  };
};

const markers: MyMarker[] = [
  {
    lat: 51.5074,
    lng: -0.1278,
    size: 1.2,
    pulse: true,
    overlay: { countryCode: "gb", label: "London" },
  },
  {
    lat: 14.0285,
    lng: 95.8542,
    size: 1.2,
    overlay: { countryCode: "vn", label: "Hanoi" },
  },
  {
    lat: 26.3193,
    lng: 125.1694,
    size: 1.2,
    overlay: { countryCode: "hk", label: "Hong Kong" },
  },
];

export default function ContactPage() {
  const id = React.useId();

  return (
    <main className="relative bg-white overflow-hidden selection:bg-blue-100 selection:text-blue-900 font-sans">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-10 md:pt-40 md:pb-12 text-center px-4 sm:px-6 max-w-4xl mx-auto z-20">
        <Reveal>
          <SectionBadge className="bg-white">Contact us</SectionBadge>
          <h1 className="text-4xl md:text-6xl font-extrabold text-ink tracking-tight leading-[1.05] display-heading mb-6">
            Get in touch with our team
          </h1>
          <p className="text-lg font-medium leading-relaxed text-slate-500 mb-10">
            We have the team and know-how to help you scale your operations 10x faster.
          </p>
        </Reveal>
      </section>

      {/* Map Section */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 h-[300px] md:h-[500px] z-10 flex items-center justify-center -mt-10 overflow-hidden">
        <Reveal className="w-full h-full" delay={0.1}>
          <div className="relative h-full w-full">
            <div className="absolute inset-0 bg-radial from-transparent to-white to-70% z-10 pointer-events-none" />
            <DottedMap<MyMarker>
              markers={markers}
              dotColor="#94a3b8"
              markerColor="var(--ocean)"
              renderMarkerOverlay={({ marker, x, y, r, index }) => {
                const { countryCode, label } = marker.overlay;
                const href = `https://flagcdn.com/w80/${countryCode}.webp`;

                const clipId = `${id}-flag-clip-${index}`.replace(/:/g, "-");
                const imgR = r * 1.5;

                const fontSize = r * 1.8;
                const pillH = r * 3;
                const pillW = label.length * (fontSize * 0.62) + r * 2.8;
                const pillX = x + r + r * 1.2;
                const pillY = y - pillH / 2;

                return (
                  <g style={{ pointerEvents: "auto", cursor: "pointer" }} onClick={() => console.log(`Clicked ${label}`)}>
                    <clipPath id={clipId}>
                      <circle cx={x} cy={y} r={imgR} />
                    </clipPath>

                    <title>{label}</title>

                    <image
                      href={href}
                      x={x - imgR}
                      y={y - imgR}
                      width={imgR * 2}
                      height={imgR * 2}
                      preserveAspectRatio="xMidYMid slice"
                      clipPath={`url(#${clipId})`}
                    />
                  </g>
                );
              }}
            />
          </div>
        </Reveal>
      </section>

      {/* Contact Cards */}
      <section className="relative z-30 px-4 sm:px-6 max-w-6xl mx-auto -mt-16 md:-mt-32 mb-24 md:mb-32">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Reveal delay={0.15}>
            <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-premium transition-all hover:-translate-y-1 hover:shadow-xl flex flex-col h-full">
              <div className="h-10 w-10 rounded-xl border border-slate-100 flex items-center justify-center mb-8 bg-slate-50">
                <MessageCircle className="h-5 w-5 text-slate-600" />
              </div>
              <h3 className="text-lg font-bold text-ink mb-2">Chat to sales</h3>
              <p className="text-sm font-medium text-slate-500 mb-8">Speak to our friendly team.</p>
              <a href="mailto:sales@p2cgrowth.com" className="mt-auto w-full inline-flex items-center justify-center h-11 rounded-xl bg-ocean text-white text-sm font-bold shadow-sm transition hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98]">
                sales@p2cgrowth.com
              </a>
            </div>
          </Reveal>
          
          <Reveal delay={0.2}>
            <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-premium transition-all hover:-translate-y-1 hover:shadow-xl flex flex-col h-full">
              <div className="h-10 w-10 rounded-xl border border-slate-100 flex items-center justify-center mb-8 bg-slate-50">
                <MessageSquare className="h-5 w-5 text-slate-600" />
              </div>
              <h3 className="text-lg font-bold text-ink mb-2">Chat to support</h3>
              <p className="text-sm font-medium text-slate-500 mb-8">We&apos;re here to help.</p>
              <a href="mailto:support@p2cgrowth.com" className="mt-auto w-full inline-flex items-center justify-center h-11 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-bold shadow-sm transition hover:bg-slate-50 hover:text-ink active:scale-[0.98]">
                support@p2cgrowth.com
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-premium transition-all hover:-translate-y-1 hover:shadow-xl flex flex-col h-full">
              <div className="h-10 w-10 rounded-xl border border-slate-100 flex items-center justify-center mb-8 bg-slate-50">
                <MapPin className="h-5 w-5 text-slate-600" />
              </div>
              <h3 className="text-lg font-bold text-ink mb-2">Visit us</h3>
              <p className="text-sm font-medium text-slate-500 mb-8">Visit our office HQ.</p>
              <a href="#" className="mt-auto w-full inline-flex items-center justify-center h-11 gap-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-bold shadow-sm transition hover:bg-slate-50 hover:text-ink active:scale-[0.98]">
                View on Google Maps
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-premium transition-all hover:-translate-y-1 hover:shadow-xl flex flex-col h-full">
              <div className="h-10 w-10 rounded-xl border border-slate-100 flex items-center justify-center mb-8 bg-slate-50">
                <Phone className="h-5 w-5 text-slate-600" />
              </div>
              <h3 className="text-lg font-bold text-ink mb-2">Call us</h3>
              <p className="text-sm font-medium text-slate-500 mb-8">Mon-Fri from 8am to 5pm.</p>
              <a href="tel:+442012345678" className="mt-auto w-full inline-flex items-center justify-center h-11 gap-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-bold shadow-sm transition hover:bg-slate-50 hover:text-ink active:scale-[0.98]">
                +44 (0) 20 1234 5678
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Form Section */}
      <section className="px-4 sm:px-6 max-w-3xl mx-auto mb-32">
        <Reveal>
          <div className="text-center mb-10">
             <h2 className="text-3xl font-extrabold text-ink tracking-tight display-heading">Send an enquiry</h2>
             <p className="text-base font-medium text-slate-500 mt-4">Prefer to write? Fill out the form below and we&apos;ll get back to you.</p>
          </div>
          <BentoCard className="p-8 md:p-10 shadow-soft-xl border-slate-200">
             <ContactForm />
          </BentoCard>
        </Reveal>
      </section>

      {/* FAQ Section */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto mb-32">
        <div className="text-center mb-16">
          <Reveal>
            <SectionBadge>FAQ</SectionBadge>
            <h2 className="text-4xl md:text-5xl font-extrabold text-ink tracking-tight leading-[1.1] display-heading mb-4">Frequently Asked Questions</h2>
            <p className="text-lg font-medium text-slate-500 mb-10 max-w-2xl mx-auto">Clear answers to common questions about our platform, features, and support.</p>
          </Reveal>
        </div>
        
        <FaqAccordion items={[
          {
            question: "Is there a free trial available?",
            answer: "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free 30-minute onboarding call to get you up and running."
          },
          {
            question: "Can I change my plan later?",
            answer: "Of course you can! Our pricing scales with your company. Chat to our friendly team to find a solution that works for you as you grow."
          },
          {
            question: "What is your cancellation policy?",
            answer: "We understand that things change. You can cancel your plan at any time and we'll refund you the difference already paid."
          },
          {
            question: "Can other info be added to an invoice?",
            answer: "At the moment, the only way to add additional information to invoices is to add the information to the workspace's name manually."
          },
          {
            question: "How does billing work?",
            answer: "Plans are per workspace, not per account. You can upgrade one workspace, and still have any number of free workspaces."
          },
          {
            question: "How do I change my account email?",
            answer: "You can change the email address associated with your account by going to account settings from a laptop or desktop."
          }
        ]} />

        <Reveal delay={0.3}>
          <div className="mt-16 bg-slate-50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-100">
            <div className="flex items-center gap-4">
               <div className="flex -space-x-2">
                 <Image className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" alt="Support" width={48} height={48} />
               </div>
               <div>
                  <h4 className="text-base font-bold text-ink">Still have questions?</h4>
                  <p className="text-sm font-medium text-slate-500 mt-1">Can&apos;t find the answer you&apos;re looking for? Please chat to our friendly team.</p>
               </div>
            </div>
            <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
               <button className="flex-1 md:flex-none h-11 px-5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm">
                 Documentation
               </button>
               <button className="flex-1 md:flex-none h-11 px-5 rounded-xl bg-ocean text-sm font-bold text-white hover:bg-blue-600 transition shadow-sm">
                 Get in touch
               </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA Footer Block */}
      <section className="bg-ocean py-24 md:py-32 px-4 sm:px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.15)_0%,transparent_60%)]" />
        
        <Reveal className="relative z-10 max-w-4xl mx-auto">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md mb-8 shadow-2xl border border-white/20">
            <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 display-heading">
            We&apos;re ready to scale when you are
          </h2>
          <p className="text-lg font-medium text-blue-100 mb-10 max-w-xl mx-auto">
            Join other service businesses already growing with P2C Growth workflows and automations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto h-12 px-8 rounded-xl bg-white text-ocean text-sm font-black shadow-xl hover:scale-105 transition-all active:scale-95">
              Contact Sales
            </button>
            <button className="w-full sm:w-auto h-12 px-8 rounded-xl bg-blue-500/20 border border-white/20 text-white text-sm font-bold backdrop-blur hover:bg-blue-500/30 transition-all">
              View demo
            </button>
          </div>
        </Reveal>
      </section>

    </main>
  );
}