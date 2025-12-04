"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"

interface PreloaderProps {
  onComplete: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // Much faster loading - 1.2 seconds total
    const duration = 1.2
    const startTime = Date.now()

    const updateProgress = () => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / (duration * 1000)) * 100, 100)
      setProgress(Math.floor(newProgress))

      if (newProgress < 100) {
        requestAnimationFrame(updateProgress)
      } else {
        // Faster completion - reduced delays
        setTimeout(() => {
          setIsComplete(true)
          setTimeout(onComplete, 400)
        }, 100)
      }
    }

    requestAnimationFrame(updateProgress)
  }, [onComplete])

  useEffect(() => {
    if (counterRef.current) {
      gsap.to(counterRef.current, {
        scale: 1 + progress * 0.002,
        duration: 0.1,
      })
    }
  }, [progress])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[10001] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="relative">
            {/* Background text */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.05 }}
            >
              <span
                className="text-[20vw] font-bold tracking-tighter text-foreground"
                style={{ fontFamily: "Clash Display, sans-serif" }}
              >
                SAKKOL
              </span>
            </motion.div>

            {/* Counter */}
            <motion.div
              className="relative flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span
                ref={counterRef}
                className="text-[15vw] md:text-[10vw] font-bold tracking-tighter text-foreground"
                style={{ fontFamily: "Clash Display, sans-serif" }}
              >
                {progress}
                <span className="text-accent">%</span>
              </span>

              <motion.div
                className="mt-4 h-[2px] bg-accent"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                style={{ maxWidth: "200px" }}
              />

              <motion.p
                className="mt-6 text-sm text-muted-foreground tracking-widest uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Loading Experience
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
