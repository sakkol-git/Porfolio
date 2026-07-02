import { FaGithub, FaLinkedin, FaTelegramPlane } from "react-icons/fa";
import { NavCardGrid } from "./NavCardGrid";
import type { Profile } from "@/domain/entities/Profile";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

interface HeroProps {
  profile: Profile;
}

const HERO_SOCIALS = [
  { icon: FaGithub, href: "https://github.com/chensakkol", label: "GitHub" },
  { icon: FaLinkedin, href: "https://linkedin.com/in/chensakkol", label: "LinkedIn" },
  { icon: FaTelegramPlane, href: "https://t.me/chensakkol", label: "Telegram" },
] as const;

export function Hero({ profile }: HeroProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-8 pb-12 px-8 md:px-16">
      {/* Top Logo */}
      <div className="w-full text-center mb-auto">
        <span className="font-display font-bold text-xl text-primary tracking-tight">
          SakkolDev
        </span>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-stack-lg flex-grow items-center max-w-container-max mx-auto w-full">
        {/* Left Column (Bio) */}
        <StaggerContainer className="col-span-1 md:col-span-6 md:pr-8 flex flex-col items-start">
          <StaggerItem>
            <span className="inline-block text-primary-fixed text-meta font-medium mb-4">
              Hello 👋
            </span>
          </StaggerItem>
          
          <StaggerItem>
            <h1 className="text-display text-primary mb-6">
              I&apos;m {profile.name}
            </h1>
          </StaggerItem>
          
          <StaggerItem>
            <p className="text-body-md text-body-text mb-10 max-w-md leading-relaxed">
              Third-year IT Engineering student and Full-Stack Developer passionate
              about building secure, scalable web and mobile applications with
              Laravel, Spring Boot, React.js and Next.js.
            </p>
          </StaggerItem>
          
          <StaggerItem>
            <a
              href={profile.resumeUrl ?? "#"}
              className="inline-flex items-center bg-primary-fixed text-on-primary-fixed text-body-md font-semibold px-8 py-3 rounded hover:bg-primary-fixed-dim transition-colors duration-200"
            >
              Download Resume
            </a>
          </StaggerItem>
        </StaggerContainer>

        {/* Right Column (Bento Cards) */}
        <div className="col-span-1 md:col-span-5 md:col-start-8">
          <NavCardGrid />
        </div>
      </div>

      {/* Bottom Socials */}
      <div className="w-full flex justify-center gap-4 mt-auto">
        {HERO_SOCIALS.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-10 h-10 rounded-full bg-card-bg border border-card-border flex items-center justify-center hover:bg-surface-variant transition-colors"
          >
            <Icon size={16} className="text-primary" />
          </a>
        ))}
      </div>
    </div>
  );
}
