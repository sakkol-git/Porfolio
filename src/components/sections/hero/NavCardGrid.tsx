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
  { href: "/projects", icon: <FolderOpen size={24} strokeWidth={1.5} />, label: "My Projects" },
  { href: "/about", icon: <BadgeCheck size={24} strokeWidth={1.5} />, label: "About me" },
  { href: "/skills", icon: <Pen size={24} strokeWidth={1.5} />, label: "My Skills" },
  { href: "/contact", icon: <Mail size={24} strokeWidth={1.5} />, label: "Contact me" },
];

export function NavCardGrid() {
  return (
    <StaggerContainer delayChildren={0.2} className="grid grid-cols-2 gap-6">
      {NAV_CARDS.map((card) => (
        <StaggerItem key={card.href} className="aspect-square">
          <Link
            href={card.href}
            className="group w-full h-full bg-card-bg border border-card-border rounded-lg flex flex-col items-center justify-center hover:border-primary-fixed transition-colors duration-300"
          >
            <div className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center mb-4 group-hover:border-primary-fixed transition-colors">
              <span className="text-primary">{card.icon}</span>
            </div>
            <span className="text-body-md text-primary">{card.label}</span>
          </Link>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
