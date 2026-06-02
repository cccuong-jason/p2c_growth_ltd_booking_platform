"use client"

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react"
import { motion, useInView } from "framer-motion"

import { cn } from "@/lib/utils"

interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number
  startValue?: number
  direction?: "up" | "down"
  delay?: number
  decimalPlaces?: number
  duration?: number
}

export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  duration = 1600,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [displayValue, setDisplayValue] = useState(
    direction === "down" ? value : startValue
  )
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const formatter = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      }),
    [decimalPlaces]
  )

  useEffect(() => {
    if (!isInView) return

    const from = direction === "down" ? value : startValue
    const to = direction === "down" ? startValue : value
    const totalSteps = Math.max(Math.abs(to - from), 12)
    const stepDuration = duration / totalSteps
    let currentStep = 0
    let interval: ReturnType<typeof setInterval> | null = null
    let timer: ReturnType<typeof setTimeout> | null = null

    setDisplayValue(from)

    timer = setTimeout(() => {
      interval = setInterval(() => {
        currentStep += 1
        const progress = Math.min(currentStep / totalSteps, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        const nextValue = from + (to - from) * eased

        setDisplayValue(
          decimalPlaces === 0 ? Math.round(nextValue) : nextValue
        )

        if (progress >= 1 && interval !== null) {
          clearInterval(interval)
          interval = null
          setDisplayValue(to)
        }
      }, stepDuration)
    }, delay * 1000)

    return () => {
      if (timer !== null) clearTimeout(timer)
      if (interval !== null) clearInterval(interval)
    }
  }, [decimalPlaces, delay, direction, duration, isInView, startValue, value])

  return (
    <motion.span
      initial={{ opacity: 0, y: 18, scale: 0.86, filter: "blur(10px)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          : undefined
      }
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      className="inline-block"
    >
      <span
        ref={ref}
      className={cn(
        "inline-block text-black tabular-nums tracking-tight dark:text-white",
        className
      )}
      {...props}
      >
        {formatter.format(displayValue)}
      </span>
    </motion.span>
  )
}
