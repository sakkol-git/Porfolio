/**
 * Scroll Indicator Component
 * Animated scroll down indicator
 */

"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollIndicatorProps {
  targetId?: string
  className?: string
  delay?: number
}

export function ScrollIndicator({
  targetId = "about",
  className,
  delay = 3,
}: ScrollIndicatorProps) {
  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <motion.div
      className={cn("absolute bottom-8 left-1/2 -translate-x-1/2 z-20", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      <motion.button
        className="flex flex-col items-center gap-2 cursor-pointer group"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        onClick={handleClick}
        aria-label={`Scroll to ${targetId} section`}
      >
        <span className="text-xs text-muted-foreground tracking-widest uppercase group-hover:text-accent transition-colors">
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border-2 border-border flex justify-center pt-1.5 group-hover:border-accent transition-colors">
          <motion.div
            className="w-1 h-2 bg-accent rounded-full"
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.button>
    </motion.div>
  )
}
