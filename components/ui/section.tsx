/**
 * Section Component
 * Consistent section wrapper with standardized spacing
 */

import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article"
  size?: "sm" | "md" | "lg" | "full"
  noPadding?: boolean
  children: React.ReactNode
}

const sizeClasses = {
  sm: "py-16 md:py-20",
  md: "py-24 md:py-32",
  lg: "py-32 md:py-40",
  full: "min-h-screen py-20",
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ as: Component = "section", size = "md", noPadding = false, className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "relative overflow-hidden bg-transparent",
          !noPadding && sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Section.displayName = "Section"
