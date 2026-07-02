import { z } from "zod";

export const SkillSchema = z.object({
  name: z.string(),
  proficiency: z.enum(["proficient", "familiar"]).optional(),
});

export type Skill = z.infer<typeof SkillSchema>;

export const ProficiencyBarSchema = z.object({
  label: z.string(),
  percentage: z.number().min(0).max(100),
});

export type ProficiencyBar = z.infer<typeof ProficiencyBarSchema>;

export const SkillCategorySchema = z.object({
  id: z.string(),
  label: z.string(),
  icon: z.string(),
  skills: z.array(SkillSchema),
  proficiencyBars: z.array(ProficiencyBarSchema).optional(),
});

export type SkillCategory = z.infer<typeof SkillCategorySchema>;
