/**
 * Container Component
 * Consistent max-width container with responsive padding
 */

import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full"
  noPadding?: boolean
  children: React.ReactNode
}

const sizeClasses = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-[1400px]",
  full: "max-w-full",
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = "lg", noPadding = false, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          sizeClasses[size],
          "mx-auto w-full",
          !noPadding && "px-6 md:px-12",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Container.displayName = "Container"
