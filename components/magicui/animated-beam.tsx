"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export function AnimatedBeam({
  className,
  reverse = false
}: {
  className?: string;
  reverse?: boolean;
}) {
  const path = reverse
    ? "M420 40 C320 38 322 190 218 190 C112 190 116 340 20 340"
    : "M20 40 C120 38 118 190 222 190 C328 190 324 340 420 340";

  return (
    <svg
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      viewBox="0 0 440 380"
      fill="none"
      preserveAspectRatio="none"
    >
      <path d={path} stroke="rgba(18,100,255,0.12)" strokeWidth="2" />
      <motion.path
        d={path}
        stroke="url(#beamGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="40 520"
        animate={{ strokeDashoffset: [0, -560] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "linear" }}
      />
      <defs>
        <linearGradient id="beamGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(18,100,255,0)" />
          <stop offset="45%" stopColor="rgba(18,100,255,0.95)" />
          <stop offset="100%" stopColor="rgba(16,185,129,0)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
