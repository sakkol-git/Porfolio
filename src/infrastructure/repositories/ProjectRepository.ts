import type { Project } from "@/domain/entities/Project";
import { projects } from "@/infrastructure/data/projects.data";

export function findAll(): Project[] {
  return projects;
}
