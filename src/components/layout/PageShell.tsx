import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export function PageShell({ children, className, containerClassName }: PageShellProps) {
  return (
    <main
      className={cn(
        "min-h-screen pt-32 pb-section-v-desktop",
        className,
      )}
    >
      <div
        className={cn(
          "max-w-container-max mx-auto px-6 md:px-10 flex flex-col gap-16",
          containerClassName,
        )}
      >
        {children}
      </div>
    </main>
  );
}
