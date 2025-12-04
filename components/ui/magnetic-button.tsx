/**
 * Magnetic Button Component
 * Premium interactive button with magnetic hover effect
 */

"use client"

import { useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"
import { easing } from "@/config/design-tokens"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  magnetic?: boolean
  asChild?: boolean
}

const variantClasses = {
  primary: `
    bg-accent hover:bg-accent/90 text-white
    shadow-lg shadow-accent/25 hover:shadow-accent/35
  `,
  secondary: `
    bg-card hover:bg-muted text-foreground
    border border-border hover:border-accent/50
  `,
  outline: `
    border-2 border-accent text-accent
    hover:bg-accent hover:text-white
  `,
  ghost: `
    text-foreground hover:text-accent
    hover:bg-muted/50
  `,
}

const sizeClasses = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-sm gap-2",
  lg: "px-8 py-4 text-base gap-2.5",
}

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  variant = "primary",
  size = "md",
  magnetic = true,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = easing.spring
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!magnetic || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.2)
    y.set((e.clientY - centerY) * 0.2)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const classes = cn(
    "inline-flex items-center justify-center font-medium rounded-full",
    "transition-all duration-300",
    variantClasses[variant],
    sizeClasses[size],
    className
  )

  const motionProps = {
    ref,
    className: classes,
    style: magnetic ? { x: xSpring, y: ySpring } : undefined,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    whileTap: { scale: 0.97 },
    "data-cursor": "pointer",
  }

  if (href) {
    return (
      <motion.a href={href} {...motionProps}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button onClick={onClick} {...motionProps}>
      {children}
    </motion.button>
  )
}

// Circular magnetic button variant (for email/contact CTA)
interface MagneticCircleButtonProps extends Omit<MagneticButtonProps, "size"> {
  size?: "sm" | "md" | "lg" | number | string
}

const circleSizeClasses = {
  sm: "w-32 h-32 md:w-40 md:h-40",
  md: "w-40 h-40 md:w-52 md:h-52",
  lg: "w-48 h-48 md:w-64 md:h-64",
}

export function MagneticCircleButton({
  children,
  className,
  href,
  onClick,
  variant = "outline",
  size = "lg",
  magnetic = true,
}: MagneticCircleButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = easing.spring
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!magnetic || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

    if (distance < 150) {
      x.set(distanceX * 0.3)
      y.set(distanceY * 0.3)
    } else {
      x.set(0)
      y.set(0)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const sizeClass = typeof size === "string" && size in circleSizeClasses
    ? circleSizeClasses[size as keyof typeof circleSizeClasses]
    : typeof size === "string" ? size : undefined

  const classes = cn(
    "inline-flex items-center justify-center rounded-full",
    "transition-colors duration-300",
    variantClasses[variant],
    sizeClass,
    className
  )

  const motionProps = {
    ref,
    className: classes,
    style: {
      x: xSpring,
      y: ySpring,
      fontFamily: "Clash Display, sans-serif",
      ...(typeof size === "number" ? { width: size, height: size } : {}),
    },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    "data-cursor": "pointer",
  }

  if (href) {
    return (
      <motion.a href={href} {...motionProps}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button onClick={onClick} {...motionProps}>
      {children}
    </motion.button>
  )
}
