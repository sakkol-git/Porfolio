import { Eye, ExternalLink, Code } from "lucide-react";
import Link from "next/link";
import type { ProjectLinks } from "@/domain/value-objects/ProjectLinks";

interface ProjectCardActionsProps {
  links: ProjectLinks;
}

export function ProjectCardActions({ links }: ProjectCardActionsProps) {
  const actions = [
    { icon: Eye, label: "View Detail", href: links.detailHref, external: false },
    { icon: ExternalLink, label: "Production", href: links.productionUrl, external: true },
    { icon: Code, label: "Source", href: links.repoUrl, external: true },
  ] as const;

  return (
    <div className="flex flex-wrap gap-3 mt-2">
      {actions.map(({ icon: Icon, label, href, external }) => {
        if (!href) return null;
        
        const className = "glass-button flex items-center gap-2 px-4 py-2 rounded-md text-meta text-primary hover:text-primary-fixed";
        
        if (external) {
          return (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              <Icon size={18} strokeWidth={1.5} />
              {label}
            </a>
          );
        }

        return (
          <Link
            key={label}
            href={href}
            className={className}
          >
            <Icon size={18} strokeWidth={1.5} />
            {label}
          </Link>
        );
      })}
    </div>
  );
}
