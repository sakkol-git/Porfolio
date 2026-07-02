"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { NAV_ITEMS } from "@/lib/constants";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-outline-variant">
      <div className="max-w-container-max mx-auto px-gutter py-4 flex justify-between items-center">
        <Link href="/" className="text-headline-md font-bold text-primary">
          SakkolDev
        </Link>
        <nav className="hidden md:flex gap-8" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-label-caps transition-colors duration-200",
                  isActive
                    ? "text-primary-fixed border-b-2 border-primary-fixed pb-1"
                    : "text-on-surface-variant hover:text-primary-fixed",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
