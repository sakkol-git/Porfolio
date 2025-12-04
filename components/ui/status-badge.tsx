/**
 * Status Badge Component
 * Animated status indicator badge
 */

"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status?: "available" | "busy" | "offline"
  text?: string
  className?: string
  animate?: boolean
}

const statusConfig = {
  available: {
    color: "bg-emerald-500",
    pingColor: "bg-emerald-400",
    text: "Open to work",
  },
  busy: {
    color: "bg-yellow-500",
    pingColor: "bg-yellow-400",
    text: "Currently busy",
  },
  offline: {
    color: "bg-gray-500",
    pingColor: "bg-gray-400",
    text: "Offline",
  },
}

export function StatusBadge({
  status = "available",
  text,
  className,
  animate = true,
}: StatusBadgeProps) {
  const config = statusConfig[status]
  const displayText = text || config.text

  return (
    <motion.div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5",
        "bg-card rounded-full border border-border/50 shadow-lg",
        className
      )}
      animate={animate ? { y: [0, -4, 0] } : undefined}
      transition={animate ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" } : undefined}
    >
      <span className="relative flex h-2 w-2">
        {status === "available" && (
          <span
            className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              config.pingColor
            )}
          />
        )}
        <span className={cn("relative inline-flex rounded-full h-2 w-2", config.color)} />
      </span>
      <span className="text-xs font-medium text-foreground">{displayText}</span>
    </motion.div>
  )
}

// Floating badge variant
interface FloatingBadgeProps {
  icon?: React.ReactNode
  text: string
  className?: string
  delay?: number
}

export function FloatingBadge({ icon, text, className, delay = 0 }: FloatingBadgeProps) {
  return (
    <motion.div
      className={cn(
        "flex items-center gap-2 px-4 py-2.5",
        "bg-card/80 backdrop-blur-md rounded-full",
        "border border-border/50 shadow-lg",
        className
      )}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "backOut" }}
    >
      {icon && <span className="text-accent">{icon}</span>}
      <span className="text-sm font-medium text-foreground/80">{text}</span>
    </motion.div>
  )
}

// Experience badge variant
export interface ExperienceBadgeProps {
  value: string
  label?: string
  className?: string
  delay?: number
}

export function ExperienceBadge({ 
  value, 
  label = "Years", 
  className, 
  delay = 2.2 
}: ExperienceBadgeProps) {
  return (
    <motion.div
      className={cn(
        "float-element flex items-center justify-center w-12 h-12 md:w-14 md:h-14",
        "bg-accent text-white rounded-xl shadow-lg shadow-accent/20",
        className
      )}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring" }}
    >
      <div className="text-center">
        <span className="text-base md:text-lg font-bold">{value}</span>
        <p className="text-[8px] uppercase tracking-wide opacity-90">{label}</p>
      </div>
    </motion.div>
  )
}
