import { z } from "zod";
import { ProjectLinksSchema } from "../value-objects/ProjectLinks";

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  techStack: z.array(z.string()),
  year: z.number(),
  role: z.string(),
  overview: z.string(),
  highlights: z.array(z.string()),
  gallery: z.array(z.string()),
  links: ProjectLinksSchema,
  thumbnailUrl: z.string(),
  thumbnailAlt: z.string(),
});

export type Project = z.infer<typeof ProjectSchema>;
