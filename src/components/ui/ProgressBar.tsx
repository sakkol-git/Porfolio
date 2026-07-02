"use client";

import { cn } from "@/lib/cn";
import { motion } from "framer-motion";

interface ProgressBarProps {
  label: string;
  percentage: number;
  className?: string;
}

export function ProgressBar({ label, percentage, className }: ProgressBarProps) {
  return (
    <div className={cn("", className)}>
      <div className="flex justify-between text-meta text-on-surface-variant mb-1">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full bg-surface-container-highest h-1 rounded-md overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="bg-primary-fixed h-full rounded-md"
        />
      </div>
    </div>
  );
}
