import Link from "next/link";
import { FolderOpen, BadgeCheck, Pen, Mail } from "lucide-react";
import type { ReactNode } from "react";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

interface NavCardItem {
  href: string;
  icon: ReactNode;
  label: string;
}

const NAV_CARDS: NavCardItem[] = [
  { href: "/projects", icon: <FolderOpen size={20} strokeWidth={1.5} />, label: "My Projects" },
  { href: "/about", icon: <BadgeCheck size={20} strokeWidth={1.5} />, label: "About me" },
  { href: "/skills", icon: <Pen size={20} strokeWidth={1.5} />, label: "My Skills" },
  { href: "/contact", icon: <Mail size={20} strokeWidth={1.5} />, label: "Contact me" },
];

export function NavCardGrid() {
  return (
    <StaggerContainer delayChildren={0.2} className="flex flex-col gap-4">
      {NAV_CARDS.map((card) => (
        <StaggerItem key={card.href} className="w-full">
          <Link
            href={card.href}
            className="group w-full bg-surface-variant/30 backdrop-blur-sm border border-card-border rounded-md flex items-center p-4 hover:border-primary-fixed hover:bg-surface-variant/50 transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(var(--color-primary-fixed-rgb),0.1)]"
          >
            <div className="w-10 h-10 rounded-md border border-outline-variant flex items-center justify-center mr-4 group-hover:border-primary-fixed group-hover:bg-primary-fixed/10 transition-colors">
              <span className="text-primary group-hover:text-primary-fixed">{card.icon}</span>
            </div>
            <span className="text-body-md text-primary font-medium group-hover:text-primary-fixed transition-colors">{card.label}</span>
          </Link>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}

