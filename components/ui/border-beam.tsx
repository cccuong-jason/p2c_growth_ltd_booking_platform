"use client"

import { motion } from "motion/react"

import { cn } from "@/lib/utils"

interface BorderBeamProps {
  size?: number
  duration?: number
  delay?: number
  colorFrom?: string
  colorTo?: string
  className?: string
  style?: React.CSSProperties
  reverse?: boolean
  borderWidth?: number
}

export function BorderBeam({
  className,
  duration = 8,
  delay = 0,
  colorFrom = "#1264ff",
  colorTo = "#10b981",
  style,
  reverse = false,
  borderWidth = 1,
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]",
        className
      )}
      style={
        {
          padding: borderWidth,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          ...style,
        } as React.CSSProperties
      }
    >
      <motion.div
        className="absolute -inset-[45%] rounded-[inherit]"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, transparent 52deg, ${colorFrom} 82deg, ${colorTo} 118deg, transparent 150deg, transparent 360deg)`,
        }}
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
        }}
      />
    </div>
  )
}
