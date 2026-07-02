import { cn } from "@/lib/cn";
import type { ReactNode } from "react";
import { HoverScale } from "@/components/animations/HoverScale";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
  className?: string;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

const VARIANT_CLASSES: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-primary-fixed text-on-primary-fixed font-semibold hover:bg-primary-fixed-dim transition-colors duration-200",
  secondary:
    "bg-transparent border border-primary text-primary hover:bg-primary/10 transition-colors duration-200",
  ghost:
    "bg-transparent text-body-text hover:text-primary transition-colors duration-200",
};

export function Button({
  variant = "primary",
  children,
  className,
  href,
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-sm px-8 py-3 text-body-md font-medium transition-colors duration-200",
    VARIANT_CLASSES[variant],
    disabled && "opacity-50 cursor-not-allowed",
    className,
  );

  if (href) {
    return (
      <HoverScale className={className}>
        <a href={href} className={classes}>
          {children}
        </a>
      </HoverScale>
    );
  }

  return (
    <HoverScale className={className}>
      <button type={type} className={classes} disabled={disabled} onClick={onClick}>
        {children}
      </button>
    </HoverScale>
  );
}
