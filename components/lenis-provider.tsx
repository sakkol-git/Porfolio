"use client"

import type React from "react"

import { useEffect, useRef, createContext, useContext } from "react"
import Lenis from "lenis"

interface LenisContextType {
  lenis: Lenis | null
}

const LenisContext = createContext<LenisContextType>({ lenis: null })

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    let rafId: number | null = null
    let stop = false

    // Estimate display refresh rate by sampling a few rAF frames.
    const estimateRefreshRate = async (samples = 8) => {
      return new Promise<number>((resolve) => {
        const intervals: number[] = []
        let last = performance.now()
        let count = 0

        function sample(t: number) {
          const now = t
          intervals.push(now - last)
          last = now
          count++
          if (count < samples) {
            rafId = requestAnimationFrame(sample)
          } else {
            const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length
            const hz = Math.round(1000 / avg)
            resolve(hz || 60)
          }
        }

        rafId = requestAnimationFrame(sample)
      })
    }

    ;(async () => {
      const measuredHz = await estimateRefreshRate()
      const targetHz = 120

      // If device already supports >=120Hz, one rAF tick is enough.
      const multiplier = measuredHz >= targetHz ? 1 : Math.round(targetHz / measuredHz)
      const artificialStep = 1000 / targetHz

      function raf(time: number) {
        // Call lenis.raf multiple times per rAF to simulate higher tick rate
        for (let i = 0; i < multiplier; i++) {
          // Advance timestamp slightly for each sub-step to give Lenis a sensible delta
          lenis.raf(time + i * artificialStep)
        }

        if (!stop) rafId = requestAnimationFrame(raf)
      }

      // start the loop
      rafId = requestAnimationFrame(raf)
    })()

    return () => {
      stop = true
      if (rafId) cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return <LenisContext.Provider value={{ lenis: lenisRef.current }}>{children}</LenisContext.Provider>
}

export function useLenis() {
  return useContext(LenisContext)
}
