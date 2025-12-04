"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <>
      {/* Page enter/exit curtain - faster and snappier */}
      <motion.div
        className="fixed inset-0 z-[60] bg-accent origin-left pointer-events-none"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.2, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="fixed inset-0 z-[59] bg-background origin-left pointer-events-none"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.2, delay: 0.03, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Content fade - immediate with minimal delay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </>
  )
}
