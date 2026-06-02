"use client";

import { useId } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export function AnimatedBeam({
  className,
  reverse = false,
  path,
  duration = 4.2,
  strokeWidth = 3,
}: {
  className?: string;
  reverse?: boolean;
  path?: string;
  duration?: number;
  strokeWidth?: number;
}) {
  const gradientId = useId();
  const beamPath = path ?? (reverse
    ? "M420 40 C320 38 322 190 218 190 C112 190 116 340 20 340"
    : "M20 40 C120 38 118 190 222 190 C328 190 324 340 420 340");

  return (
    <svg
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      viewBox="0 0 440 380"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={beamPath} stroke="rgba(18,100,255,0.13)" strokeWidth="2" />
      <motion.path
        d={beamPath}
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray="42 520"
        animate={{ strokeDashoffset: reverse ? [0, 560] : [0, -560] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      />
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(18,100,255,0)" />
          <stop offset="45%" stopColor="rgba(18,100,255,0.98)" />
          <stop offset="72%" stopColor="rgba(16,185,129,0.78)" />
          <stop offset="100%" stopColor="rgba(16,185,129,0)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
