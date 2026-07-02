import { cn } from "@/lib/cn";

interface PillProps {
  children: string;
  variant?: "default" | "proficient";
  className?: string;
}

export function Pill({ children, variant = "default", className }: PillProps) {
  return (
    <span
      className={cn(
        "text-meta px-3 py-1 rounded",
        variant === "proficient"
          ? "bg-primary-fixed border border-primary-fixed text-[#1b1b1b]"
          : "bg-card-bg border border-card-border text-body-text",
        className,
      )}
    >
      {children}
    </span>
  );
}
