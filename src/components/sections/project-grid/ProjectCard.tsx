import Image from "next/image";
import type { Project } from "@/domain/entities/Project";
import { ProjectCardActions } from "./ProjectCardActions";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="glass-card rounded-xl flex flex-col overflow-hidden group">
      {/* Thumbnail */}
      <div className="h-48 w-full overflow-hidden relative">
        <Image
          src={project.thumbnailUrl}
          alt={project.thumbnailAlt}
          width={600}
          height={300}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B]/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-card-padding flex flex-col flex-grow gap-stack-md relative z-10 -mt-10">
        <h3 className="font-display text-lg font-bold text-primary">
          {project.title}
        </h3>

        {/* Tech Pills */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="glass-pill px-3 py-1 rounded-full text-meta text-on-surface-variant"
            >
              {tech}
            </span>
          ))}
        </div>

        <p className="text-meta text-on-surface-variant flex-grow">
          {project.description}
        </p>

        <ProjectCardActions links={project.links} />
      </div>
    </article>
  );
}
