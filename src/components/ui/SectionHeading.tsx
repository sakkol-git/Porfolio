import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  children,
}: SectionHeadingProps) {
  return (
    <header className={cn("flex flex-col gap-stack-sm max-w-2xl", className)}>
      {eyebrow && (
        <span className="text-label-caps text-primary-fixed">{eyebrow}</span>
      )}
      <h1 className="text-display text-primary">{title}</h1>
      {description && (
        <p className="text-body-lg text-on-surface-variant mt-stack-md">{description}</p>
      )}
      {children}
    </header>
  );
}
