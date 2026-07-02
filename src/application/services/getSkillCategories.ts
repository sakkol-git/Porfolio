import type { SkillCategory } from "@/domain/entities/SkillCategory";
import * as SkillRepository from "@/infrastructure/repositories/SkillRepository";

export function getSkillCategories(): SkillCategory[] {
  return SkillRepository.findAll();
}
