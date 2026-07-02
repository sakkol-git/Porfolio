import Image from "next/image";
import type { Project } from "@/domain/entities/Project";
import { ProjectCardActions } from "./ProjectCardActions";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="relative glass-card rounded-md overflow-hidden group aspect-square flex flex-col justify-end">
      {/* Full-bleed Background Image */}
      <Image
        src={project.thumbnailUrl}
        alt={project.thumbnailAlt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110 z-0"
      />

      {/* Cinematic Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/90 to-transparent opacity-95 z-10 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500 z-10" />

      {/* Content */}
      <div className="relative z-20 p-5 sm:p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-primary line-clamp-1 group-hover:text-primary-fixed transition-colors">
            {project.title}
          </h3>
          <p className="text-body-sm text-on-surface-variant line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech Pills (Constrained to prevent overflow) */}
        <div className="flex flex-wrap gap-2 overflow-hidden max-h-[26px]">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] tracking-wide font-semibold px-2.5 py-1 rounded-sm bg-primary-fixed/20 text-primary-fixed border border-primary-fixed/30 backdrop-blur-md whitespace-nowrap shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="pt-2">
          <ProjectCardActions links={project.links} />
        </div>
      </div>
    </article>
  );
}
