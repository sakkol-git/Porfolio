import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface IconCircleProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const SIZE_CLASSES = {
  sm: "w-10 h-10",
  md: "w-12 h-12",
  lg: "w-14 h-14",
} as const;

export function IconCircle({ children, className, size = "md" }: IconCircleProps) {
  return (
    <div
      className={cn(
        "rounded-full border border-outline-variant flex items-center justify-center",
        SIZE_CLASSES[size],
        className,
      )}
    >
      {children}
    </div>
  );
}
