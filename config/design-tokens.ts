/**
 * Design Tokens
 * Centralized design system values for consistency
 */

// Animation durations (in seconds)
export const duration = {
  fast: 0.15,
  normal: 0.3,
  medium: 0.4,
  slow: 0.6,
  verySlow: 1,
} as const

// Animation delays (in seconds)
export const delay = {
  stagger: 0.05,
  section: 0.1,
  element: 0.2,
  hero: 1.2,
} as const

// Easing functions
export const easing = {
  smooth: [0.25, 0.1, 0.25, 1],
  easeOut: [0.215, 0.61, 0.355, 1],
  easeInOut: [0.645, 0.045, 0.355, 1],
  spring: { type: "spring", damping: 15, stiffness: 150 },
  bounce: { type: "spring", damping: 10, stiffness: 100 },
} as const

// Combined animation config for easy access
export const animationConfig = {
  duration,
  delay,
  easing,
} as const

// Spacing scale (in pixels for reference, use rem/Tailwind in components)
export const spacing = {
  section: {
    paddingY: "py-24 md:py-32",
    paddingX: "px-6 md:px-12",
    gap: "gap-8 lg:gap-12",
  },
  container: {
    maxWidth: "max-w-7xl",
    center: "mx-auto",
  },
} as const

// Glass morphism variants
export const glass = {
  light: {
    background: "bg-white/60 dark:bg-gray-900/60",
    border: "border-white/50 dark:border-gray-700/40",
    blur: "backdrop-blur-xl",
    shadow: "shadow-lg shadow-black/5 dark:shadow-black/20",
  },
  medium: {
    background: "bg-white/70 dark:bg-gray-900/70",
    border: "border-white/60 dark:border-gray-700/50",
    blur: "backdrop-blur-xl",
    shadow: "shadow-xl shadow-black/5 dark:shadow-black/25",
  },
  heavy: {
    background: "bg-white/80 dark:bg-[#0d0d0d]/80",
    border: "border-white/70 dark:border-gray-700/60",
    blur: "backdrop-blur-2xl",
    shadow: "shadow-2xl shadow-black/10 dark:shadow-black/30",
  },
} as const

// Terminal styling
export const terminal = {
  header: {
    dots: ["bg-[#ff5f57]", "bg-[#febc2e]", "bg-[#28c840]"],
    background: "bg-white/40 dark:bg-gray-900/50",
    border: "border-b border-white/30 dark:border-gray-700/30",
  },
  content: {
    font: "'Consolas', 'Monaco', 'Courier New', monospace",
    background: "bg-white/60 dark:bg-[#0a0a0a]/80",
  },
} as const

// Border radius variants
export const radius = {
  sm: "rounded-lg",
  md: "rounded-xl",
  lg: "rounded-2xl",
  full: "rounded-full",
} as const

// Transition presets
export const transition = {
  colors: "transition-colors duration-300",
  all: "transition-all duration-300",
  transform: "transition-transform duration-300",
  opacity: "transition-opacity duration-300",
} as const

// Z-index scale
export const zIndex = {
  background: -1,
  content: 1,
  overlay: 10,
  navigation: 50,
  modal: 100,
  toast: 200,
  cursor: 9999,
  preloader: 10001,
} as const

// Combine into glass card utility
export function getGlassStyles(variant: keyof typeof glass = "light") {
  const g = glass[variant]
  return `${g.background} ${g.blur} ${g.border} ${g.shadow} border`
}

// Animation variants for framer-motion
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
}

export const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
}

export const slideInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
}

// Combined animations object for easy imports
export const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: duration.normal },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: duration.normal },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -30 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: duration.normal },
  },
  fadeInRight: {
    initial: { opacity: 0, x: 30 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: duration.normal },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true },
    transition: { duration: duration.normal },
  },
} as const
