import Image from "next/image";
import { RolePills } from "./RolePills";
import { ContactMeta } from "./ContactMeta";
import type { Profile } from "@/domain/entities/Profile";
import { FadeIn } from "@/components/animations/FadeIn";

interface AboutHeaderProps {
  profile: Profile;
}

export function AboutHeader({ profile }: AboutHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center md:items-start w-full">
      {/* Profile Photo */}
      <FadeIn delay={0.1} direction="right" className="shrink-0 relative w-full max-w-[240px] aspect-[3/4] rounded-md overflow-hidden border border-outline-variant group">
        <Image
          src={profile.avatarUrl}
          alt={`Photo of ${profile.name}`}
          fill
          sizes="(max-width: 768px) 100vw, 240px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
      </FadeIn>

      {/* Bio & Meta */}
      <FadeIn delay={0.2} className="flex flex-col gap-6 flex-grow">
        <header className="flex flex-col gap-2">
          <span className="text-label-caps text-primary-fixed">ABOUT ME</span>
          <h1 className="text-display text-primary">{profile.name}</h1>
        </header>

        <RolePills roles={profile.roles} />

        <p className="text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
          {profile.summary}
        </p>

        <div className="mt-4">
          <ContactMeta channels={profile.contact} />
        </div>
      </FadeIn>
    </div>
  );
}
