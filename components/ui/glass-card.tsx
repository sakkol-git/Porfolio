/**
 * Glass Card Component
 * Premium glassmorphism card with consistent styling
 */

"use client"

import { forwardRef } from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"
import { getGlassStyles, radius, duration } from "@/config/design-tokens"

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  variant?: "light" | "medium" | "heavy"
  rounded?: keyof typeof radius
  hover?: boolean
  children: React.ReactNode
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ variant = "light", rounded = "lg", hover = true, className, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          getGlassStyles(variant),
          radius[rounded],
          hover && "transition-all duration-300 hover:shadow-2xl",
          className
        )}
        whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
        transition={{ duration: duration.normal }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

GlassCard.displayName = "GlassCard"

// Terminal variant with macOS-style header
interface TerminalCardProps extends GlassCardProps {
  title?: string
}

export const TerminalCard = forwardRef<HTMLDivElement, TerminalCardProps>(
  ({ title = "terminal", variant = "medium", className, children, ...props }, ref) => {
    return (
      <GlassCard
        ref={ref}
        variant={variant}
        hover={false}
        className={cn("overflow-hidden", className)}
        {...props}
      >
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-5 py-4 border-b border-white/30 dark:border-gray-700/30 bg-white/40 dark:bg-gray-900/50">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span
            className="ml-3 text-sm text-muted-foreground"
            style={{ fontFamily: "'Consolas', 'Monaco', monospace" }}
          >
            {title}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">{children}</div>
      </GlassCard>
    )
  }
)

TerminalCard.displayName = "TerminalCard"
