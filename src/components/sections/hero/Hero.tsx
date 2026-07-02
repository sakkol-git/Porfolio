import Image from "next/image";
import { FaGithub, FaLinkedin, FaTelegramPlane } from "react-icons/fa";
import { NavCardGrid } from "./NavCardGrid";
import type { Profile } from "@/domain/entities/Profile";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { FadeIn } from "@/components/animations/FadeIn";

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
    <div className="min-h-screen bg-background flex flex-col pt-8 pb-12 px-8 md:px-12 lg:px-16 overflow-hidden">
      {/* Top Logo */}
      <FadeIn className="w-full text-center mb-8 mt-8">
        <span className="font-display font-bold text-4xl text-primary tracking-tight">
          SakkolDev
        </span>
      </FadeIn>

      {/* Main Content Grid - 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 flex-grow items-center max-w-container-max mx-auto w-full">

        {/* Left Column (Bio) */}
        <StaggerContainer className="lg:col-span-4 flex flex-col items-start order-2 lg:order-1">
          <StaggerItem>
            <span className="inline-block text-primary-fixed text-meta uppercase tracking-widest font-bold mb-4 bg-primary-fixed/10 px-4 py-1.5 rounded-md border border-primary-fixed/20">
              Hello 👋
            </span>
          </StaggerItem>

          <StaggerItem>
            <h1 className="text-display text-4xl lg:text-5xl xl:text-6xl text-primary mb-6 leading-tight">
              I&apos;m {profile.name}
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="text-body-md lg:text-body-lg text-body-text mb-10 max-w-md leading-relaxed">
              Third-year IT Engineering student and Full-Stack Developer passionate
              about building secure, scalable web and mobile applications with
              Laravel, Spring Boot, React.js and Next.js.
            </p>
          </StaggerItem>

          <StaggerItem>
            <a
              href={profile.resumeUrl ?? "#"}
              className="inline-flex items-center bg-primary-fixed text-on-primary-fixed text-body-md font-semibold px-8 py-3.5 rounded-md hover:bg-primary-fixed-dim hover:shadow-[0_0_20px_rgba(var(--color-primary-fixed-rgb),0.3)] transition-all duration-300"
            >
              Download Resume
            </a>
          </StaggerItem>
        </StaggerContainer>

        {/* Center Column (Cinematic Portrait) */}
        <FadeIn delay={0.3} className="lg:col-span-4 flex justify-center items-center order-1 lg:order-2 relative w-full">
          <div className="relative w-full max-w-[260px] sm:max-w-[320px] aspect-[3/4] rounded-md overflow-hidden group">
            {/* Cinematic Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-fixed/40 to-transparent blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>

            {/* Glass Container */}
            <div className="absolute inset-[2px] rounded-md bg-surface-variant/20 backdrop-blur-md border border-card-border shadow-2xl z-10 overflow-hidden">
              <Image
                src={profile.avatarUrl}
                alt={`${profile.name} portrait`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />

              {/* Subtle inner shadow/gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60"></div>
            </div>
          </div>
        </FadeIn>

        {/* Right Column (Navigation) */}
        <div className="lg:col-span-4 flex flex-col justify-center order-3 lg:order-3">
          <NavCardGrid />
        </div>

      </div>

      {/* Bottom Socials */}
      <FadeIn delay={0.6} className="w-full flex justify-center gap-4 mt-12">
        {HERO_SOCIALS.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-10 h-10 flex items-center justify-center rounded-md text-on-surface-variant hover:bg-primary-fixed hover:text-on-primary-fixed transition-all duration-300 group"
          >
            <Icon size={20} className="group-hover:scale-110 transition-transform" />
          </a>
        ))}
      </FadeIn>
    </div>
  );
}

