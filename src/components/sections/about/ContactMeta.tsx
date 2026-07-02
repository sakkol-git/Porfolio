import { Mail, Phone, MapPin } from "lucide-react";
import type { ContactChannel } from "@/domain/value-objects/ContactChannel";
import type { ReactNode } from "react";

const META_ICON_MAP: Record<string, ReactNode> = {
  email: <Mail size={16} strokeWidth={1.5} />,
  phone: <Phone size={16} strokeWidth={1.5} />,
  location: <MapPin size={16} strokeWidth={1.5} />,
};

interface ContactMetaProps {
  channels: ContactChannel[];
}

export function ContactMeta({ channels }: ContactMetaProps) {
  // Only show email, phone, location in this meta row
  const metaChannels = channels.filter((c) =>
    ["email", "phone", "location"].includes(c.type),
  );

  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-x-8 gap-y-4 pt-6 border-t border-white/5">
      {metaChannels.map((channel) => {
        const content = (
          <div className="flex items-center gap-3" key={channel.type}>
            <div className="text-on-surface-variant bg-surface-container p-2 rounded-md border border-outline-variant">
              {META_ICON_MAP[channel.type]}
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
                {channel.label}
              </span>
              <span className="text-meta text-primary">{channel.value}</span>
            </div>
          </div>
        );

        if (channel.href) {
          return (
            <a
              key={channel.type}
              href={channel.href}
              className="hover:opacity-80 transition-opacity"
            >
              {content}
            </a>
          );
        }

        return content;
      })}
    </div>
  );
}
