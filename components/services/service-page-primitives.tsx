"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

export interface FunnelCardItem {
  title: string;
  body: string;
}

export interface FunnelProcessItem extends FunnelCardItem {
  step: string;
}

export interface FunnelContent {
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
  request?: {
    [key: string]: unknown;
    contactChannelOptions?: readonly { value: string; label: string }[];
    automatedEmailOptions?: readonly { value: string; label: string }[];
    dashboardOptions?: readonly { value: string; label: string }[];
  };
}

export interface ServicePageProps {
  content: FunnelContent;
  primaryHref: string;
  secondaryHref: string;
  secondaryLabel: string;
}

export function MotionSafe({
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ServiceCtaLink({
  href,
  children,
  variant = "primary",
  className
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "light" | "outline" | "dark";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-black transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4EC7] focus-visible:ring-offset-2 active:translate-y-0",
        variant === "primary" && "bg-[#0B4EC7] text-white shadow-lg shadow-blue-700/20 hover:bg-blue-700",
        variant === "light" && "bg-white text-[#0B4EC7] shadow-lg shadow-black/10 hover:bg-slate-50",
        variant === "outline" && "border border-[#D8E2F0] bg-white text-[#101522] hover:bg-[#EEF5FF]",
        variant === "dark" && "border border-white/15 bg-white/10 text-white hover:bg-white/15",
        className
      )}
    >
      <span>{children}</span>
      {variant === "primary" || variant === "light" ? <ArrowRight className="h-4 w-4" aria-hidden /> : null}
    </Link>
  );
}

export function ServiceChip({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-black leading-5",
        className
      )}
    >
      {children}
    </span>
  );
}
