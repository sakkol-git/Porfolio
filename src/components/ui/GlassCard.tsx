import { cn } from "@/lib/cn";
import type { ReactNode } from "react";
import { HoverScale } from "@/components/animations/HoverScale";

/* ---- Root ---- */
interface GlassCardProps {
  children: ReactNode;
  className?: string;
  as?: "article" | "div" | "section";
}

function GlassCardRoot({ children, className, as: Tag = "div" }: GlassCardProps) {
  return (
    <HoverScale scale={1.02} className={cn("glass-card rounded-lg overflow-hidden flex flex-col h-full min-h-[400px]", className)}>
      {children}
    </HoverScale>
  );
}

/* ---- Header ---- */
interface GlassCardHeaderProps {
  children: ReactNode;
  className?: string;
}

function GlassCardHeader({ children, className }: GlassCardHeaderProps) {
  return <div className={cn("", className)}>{children}</div>;
}

/* ---- Body ---- */
interface GlassCardBodyProps {
  children: ReactNode;
  className?: string;
}

function GlassCardBody({ children, className }: GlassCardBodyProps) {
  return (
    <div className={cn("p-card-padding flex flex-col flex-grow gap-stack-md", className)}>
      {children}
    </div>
  );
}

/* ---- Actions ---- */
interface GlassCardActionsProps {
  children: ReactNode;
  className?: string;
}

function GlassCardActions({ children, className }: GlassCardActionsProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-3 mt-stack-lg border-t border-white/5 pt-stack-md",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ---- Compound Export ---- */
export const GlassCard = Object.assign(GlassCardRoot, {
  Header: GlassCardHeader,
  Body: GlassCardBody,
  Actions: GlassCardActions,
});
