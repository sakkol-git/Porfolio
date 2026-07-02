"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface HoverScaleProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  as?: any;
}

export function HoverScale({ children, className, scale = 1.05, as = motion.div }: HoverScaleProps) {
  const Component = as;
  return (
    <Component
      whileHover={{ scale }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn("origin-center", className)}
    >
      {children}
    </Component>
  );
}
