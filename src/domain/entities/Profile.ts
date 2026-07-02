import { z } from "zod";
import { ContactChannelSchema } from "../value-objects/ContactChannel";

export const SocialLinkSchema = z.object({
  platform: z.enum(["github", "linkedin", "telegram"]),
  href: z.string(),
  label: z.string(),
});

export type SocialLink = z.infer<typeof SocialLinkSchema>;

export const LanguageProficiencySchema = z.object({
  language: z.string(),
  level: z.string(),
  percentage: z.number().min(0).max(100),
});

export type LanguageProficiency = z.infer<typeof LanguageProficiencySchema>;

export const ProfileSchema = z.object({
  name: z.string(),
  roles: z.array(z.string()),
  summary: z.string(),
  contact: z.array(ContactChannelSchema),
  socials: z.array(SocialLinkSchema),
  languages: z.array(LanguageProficiencySchema),
  avatarUrl: z.string(),
  resumeUrl: z.string().optional(),
});

export type Profile = z.infer<typeof ProfileSchema>;
