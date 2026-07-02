import type { SkillCategory } from "@/domain/entities/SkillCategory";
import { skillCategories } from "@/infrastructure/data/skills.data";

export function findAll(): SkillCategory[] {
  return skillCategories;
}
