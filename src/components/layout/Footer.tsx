import Link from "next/link";
import { FaGithub, FaLinkedin, FaTelegramPlane } from "react-icons/fa";

const SOCIAL_ICONS = [
  { icon: FaGithub, href: "https://github.com/chensakkol", label: "GitHub" },
  { icon: FaLinkedin, href: "https://linkedin.com/in/chensakkol", label: "LinkedIn" },
  { icon: FaTelegramPlane, href: "https://t.me/chensakkol", label: "Telegram" },
] as const;

export function Footer() {
  return (
    <footer className="w-full py-section-v-desktop flex flex-col items-center gap-stack-lg border-t border-outline-variant bg-surface-container-lowest">
      <Link href="/" className="text-headline-md font-bold text-primary">
        SakkolDev
      </Link>
      <div className="flex gap-4">
        {SOCIAL_ICONS.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-primary-fixed hover:text-on-primary-fixed transition-all duration-200"
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
