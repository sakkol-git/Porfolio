import type { Project } from "@/domain/entities/Project";
import { getAllProjects } from "./getAllProjects";

export function getFeaturedProjects(count = 2): Project[] {
  return getAllProjects().slice(0, count);
}
