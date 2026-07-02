import { Mail, Phone, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin, FaTelegramPlane } from "react-icons/fa";
import type { ContactChannel } from "@/domain/value-objects/ContactChannel";
import type { SocialLink } from "@/domain/entities/Profile";
import type { ReactNode } from "react";

const CONTACT_ICON_MAP: Record<string, ReactNode> = {
  email: <Mail size={20} strokeWidth={1.5} />,
  phone: <Phone size={20} strokeWidth={1.5} />,
  telegram: <FaTelegramPlane size={20} />,
  github: <FaGithub size={20} />,
};

const SOCIAL_ICON_MAP: Record<string, ReactNode> = {
  github: <FaGithub size={20} />,
  linkedin: <FaLinkedin size={20} />,
  telegram: <FaTelegramPlane size={20} />,
};

interface ContactInfoProps {
  channels: ContactChannel[];
  socials: SocialLink[];
}

export function ContactInfo({ channels, socials }: ContactInfoProps) {
  return (
    <div className="flex flex-col gap-stack-lg">
      <div>
        <span className="text-label-caps text-primary-fixed mb-4 block">
          GET IN TOUCH
        </span>
        <h1 className="text-display text-primary mb-6">
          Let&apos;s build something together.
        </h1>
        <p className="text-body-lg text-on-surface-variant">
          Open to Junior Developer and Engineering Intern roles.
        </p>
      </div>

      {/* Contact channels */}
      <div className="flex flex-col gap-4 mt-8">
        {channels.map((channel) => {
          const content = (
            <div className="flex items-center gap-4" key={channel.type}>
              <div className="w-12 h-12 rounded-md bg-surface-container-high border border-outline-variant flex items-center justify-center text-primary-fixed">
                {CONTACT_ICON_MAP[channel.type]}
              </div>
              <div>
                <p className="text-meta text-on-surface-variant">{channel.label}</p>
                <span className="text-body-md text-primary">{channel.value}</span>
              </div>
            </div>
          );

          if (channel.href) {
            return (
              <a
                key={channel.type}
                href={channel.href}
                className="hover:opacity-80 transition-opacity"
                {...(channel.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {content}
              </a>
            );
          }

          return content;
        })}
      </div>

      {/* Social icons */}
      <div className="flex gap-4 mt-8">
        {socials.map((social) => (
          <a
            key={social.platform}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="w-12 h-12 rounded-md bg-surface-container-lowest border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary-fixed hover:border-primary-fixed transition-all"
          >
            {SOCIAL_ICON_MAP[social.platform]}
          </a>
        ))}
      </div>
    </div>
  );
}
