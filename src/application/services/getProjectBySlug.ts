import type { Project } from "@/domain/entities/Project";
import * as ProjectRepository from "@/infrastructure/repositories/ProjectRepository";

export function getProjectBySlug(slug: string): Project | null {
  const projects = ProjectRepository.findAll();
  return projects.find((p) => p.slug === slug) || null;
}
