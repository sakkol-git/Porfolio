import Link from "next/link";
import { FaGithub, FaLinkedin, FaTelegramPlane } from "react-icons/fa";

const SOCIAL_ICONS = [
  { icon: FaGithub, href: "https://github.com/sakkol-git", label: "GitHub" },
  { icon: FaLinkedin, href: "https://linkedin.com/in/chen-sakkol-542155327", label: "LinkedIn" },
  { icon: FaTelegramPlane, href: "https://t.me/sakkol", label: "Telegram" },
] as const;

export function Footer() {
  return (
    <footer className="w-full py-section-v-desktop flex flex-col items-center gap-stack-lg border-t border-outline-variant bg-surface-container-lowest">
      <div className="flex gap-4">
        {SOCIAL_ICONS.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-10 h-10 flex items-center justify-center rounded-md text-on-surface-variant hover:bg-primary-fixed hover:text-on-primary-fixed transition-all duration-200"
          >
            <Icon size={20} strokeWidth={1.5} />
          </a>
        ))}
      </div>
      <p className="text-meta text-on-surface-variant">
        © {new Date().getFullYear()} SakkolDev. Built with precision.
      </p>
    </footer>
  );
}
