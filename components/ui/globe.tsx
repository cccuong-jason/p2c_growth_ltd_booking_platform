"use client"

import { useEffect, useRef, useState } from "react"
import createGlobe, { type COBEOptions } from "cobe"
import { useMotionValue, useSpring } from "framer-motion"

import { cn } from "@/lib/utils"

const MOVEMENT_DAMPING = 1400

const GLOBE_CONFIG: COBEOptions = {
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
    { location: [51.5072, -0.1276], size: 0.07 }, // London, UK
    { location: [53.4808, -2.2426], size: 0.055 }, // Manchester, UK
    { location: [52.4862, -1.8904], size: 0.048 }, // Birmingham, UK
    { location: [21.0285, 105.8542], size: 0.06 }, // Hanoi, Vietnam
    { location: [10.8231, 106.6297], size: 0.06 }, // Ho Chi Minh, Vietnam
    { location: [39.9042, 116.4074], size: 0.055 }, // Beijing, China
    { location: [31.2304, 121.4737], size: 0.055 }, // Shanghai, China
    { location: [22.3193, 114.1694], size: 0.05 }, // Hong Kong
    { location: [40.7128, -74.006], size: 0.018 }, // NY (context)
    { location: [-33.8688, 151.2093], size: 0.018 }, // Sydney (context)
  ],
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isSupported, setIsSupported] = useState(true)
  const phiRef = useRef(config.phi)
  const widthRef = useRef(0)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)

  const r = useMotionValue(0)
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      r.set(r.get() + delta / MOVEMENT_DAMPING)
    }
  }

  useEffect(() => {
    const supportsCanvas = typeof HTMLCanvasElement !== "undefined" &&
      Boolean(document.createElement("canvas").getContext("2d"))
    setIsSupported(supportsCanvas)

    if (!supportsCanvas) return

    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth
      }
    }

    window.addEventListener("resize", onResize)
    onResize()

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phiRef.current += 0.003
        state.phi = phiRef.current + rs.get()
        state.width = widthRef.current * 2
        state.height = widthRef.current * 2
      },
    })

    setTimeout(() => (canvasRef.current!.style.opacity = "1"), 0)
    return () => {
      globe.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [rs, config])

  return (
    <div
      className={cn(
        "relative aspect-square w-full",
        className
      )}
    >
      {isSupported ? (
        <canvas
          className={cn(
            "size-full opacity-0 transition-opacity duration-500 contain-[layout_paint_size]"
          )}
          ref={canvasRef}
          aria-label="Interactive global dispatch coverage map"
          onPointerDown={(e) => {
            pointerInteracting.current = e.clientX
            updatePointerInteraction(e.clientX)
          }}
          onPointerUp={() => updatePointerInteraction(null)}
          onPointerOut={() => updatePointerInteraction(null)}
          onMouseMove={(e) => updateMovement(e.clientX)}
          onTouchMove={(e) =>
            e.touches[0] && updateMovement(e.touches[0].clientX)
          }
        />
      ) : (
        <div className="flex size-full items-center justify-center rounded-full border border-ocean/10 bg-white/70 p-10 text-center shadow-premium">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-ocean">Global coverage</p>
            <p className="mt-3 text-sm font-medium leading-6 text-slate-500">Canvas rendering is not available in this browser, but UK intake, language readiness, and dispatch routing remain supported.</p>
          </div>
        </div>
      )}
    </div>
  )
}
