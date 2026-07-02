import type { Project } from "@/domain/entities/Project";
import * as ProjectRepository from "@/infrastructure/repositories/ProjectRepository";

export function getAllProjects(): Project[] {
  const projects = ProjectRepository.findAll();
  return [...projects].sort((a, b) => b.year - a.year);
}
