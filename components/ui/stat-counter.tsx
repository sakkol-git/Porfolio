/**
 * Stat Counter Component
 * Animated statistics display
 */

"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { fadeInUp, duration } from "@/config/design-tokens"

interface StatCounterProps {
  value: string
  label: string
  delay?: number
  className?: string
}

export function StatCounter({ value, label, delay = 0, className }: StatCounterProps) {
  return (
    <motion.div
      className={cn("text-center px-4", className)}
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      transition={{ delay, duration: duration.slow }}
    >
      <span className="text-2xl md:text-3xl font-bold text-foreground">{value}</span>
      <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{label}</p>
    </motion.div>
  )
}

// Stats group component
interface StatsGroupProps {
  stats: Array<{ value: string; label: string }>
  className?: string
  baseDelay?: number
}

export function StatsGroup({ stats, className, baseDelay = 0 }: StatsGroupProps) {
  return (
    <motion.div
      className={cn("flex items-center justify-center divide-x divide-border", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: baseDelay }}
    >
      {stats.map((stat, i) => (
        <StatCounter
          key={stat.label}
          value={stat.value}
          label={stat.label}
          delay={baseDelay + i * 0.1}
        />
      ))}
    </motion.div>
  )
}
