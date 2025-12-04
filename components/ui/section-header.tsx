/**
 * Section Header Component
 * Consistent section title styling across all sections
 */

"use client"

import { motion, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"
import { fadeInUp, duration, delay as delays } from "@/config/design-tokens"

interface SectionHeaderProps {
  label?: string
  title: string
  titleHighlight?: string
  description?: string
  align?: "left" | "center" | "right"
  className?: string
  titleClassName?: string
}

const containerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export function SectionHeader({
  label,
  title,
  titleHighlight,
  description,
  align = "center",
  className,
  titleClassName,
}: SectionHeaderProps) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className={cn("max-w-2xl mb-12 md:mb-16", alignmentClasses[align], className)}
    >
      {label && (
        <motion.span
          variants={fadeInUp}
          transition={{ duration: duration.normal }}
          className="text-accent text-sm tracking-[0.3em] uppercase font-medium inline-block"
        >
          {label}
        </motion.span>
      )}

      <motion.h2
        variants={fadeInUp}
        transition={{ duration: duration.medium, delay: delays.stagger }}
        className={cn(
          "text-3xl md:text-5xl lg:text-6xl font-bold mt-3 text-foreground tracking-tight",
          titleClassName
        )}
        style={{ fontFamily: "Clash Display, sans-serif" }}
      >
        {title}
        {titleHighlight && <span className="text-accent"> {titleHighlight}</span>}
      </motion.h2>

      {description && (
        <motion.p
          variants={fadeInUp}
          transition={{ duration: duration.normal, delay: delays.stagger * 2 }}
          className="mt-4 text-muted-foreground text-base md:text-lg max-w-xl mx-auto"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
