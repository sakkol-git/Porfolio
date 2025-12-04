/**
 * Animated Text Component
 * Character-by-character text reveal animation
 */

"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { easing } from "@/config/design-tokens"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  staggerDelay?: number
  once?: boolean
}

export function AnimatedText({
  text,
  className,
  delay = 0,
  staggerDelay = 0.04,
  once = true,
}: AnimatedTextProps) {
  return (
    <motion.span className={cn("inline-block", className)}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once }}
          transition={{
            duration: 0.6,
            delay: delay + i * staggerDelay,
            ease: easing.easeOut,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Word-by-word animation variant
interface AnimatedWordsProps extends Omit<AnimatedTextProps, "staggerDelay"> {
  staggerDelay?: number
}

export function AnimatedWords({
  text,
  className,
  delay = 0,
  staggerDelay = 0.08,
  once = true,
}: AnimatedWordsProps) {
  const words = text.split(" ")

  return (
    <motion.span className={cn("inline-block", className)}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once }}
          transition={{
            duration: 0.5,
            delay: delay + i * staggerDelay,
            ease: easing.easeOut,
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Line reveal animation
interface AnimatedLineProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
}

export function AnimatedLine({
  children,
  className,
  delay = 0,
  direction = "up",
}: AnimatedLineProps) {
  const directions = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  }

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        initial={{ ...directions[direction], opacity: 0 }}
        whileInView={{ x: 0, y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay,
          ease: easing.easeOut,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
