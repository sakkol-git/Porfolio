import type { Project } from "@/domain/entities/Project";
import { ProjectCard } from "./ProjectCard";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
      {projects.map((project) => (
        <StaggerItem key={project.id}>
          <ProjectCard project={project} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
