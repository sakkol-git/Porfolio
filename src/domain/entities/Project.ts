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
  
  impactStatement: z.string(),
  problemStatement: z.string(),
  solution: z.object({
    statement: z.string(),
    coreFeatures: z.array(z.string()),
    architectureStatement: z.string(),
  }),
  architectureOverview: z.object({
    explanation: z.string(),
    keyComponents: z.array(z.string()),
  }),
  techDetails: z.array(z.object({
    name: z.string(),
    reason: z.string(),
  })),
  keyFeatures: z.array(z.string()),
  engineeringHighlights: z.array(z.string()),
  challenges: z.array(z.object({
    challenge: z.string(),
    solution: z.string(),
    impact: z.string(),
  })),
  metrics: z.array(z.object({
    label: z.string(),
    value: z.string(),
  })).optional(),
  learnings: z.array(z.string()),

  highlights: z.array(z.string()),
  gallery: z.array(z.string()),
  links: ProjectLinksSchema,
  thumbnailUrl: z.string(),
  thumbnailAlt: z.string(),
});

export type Project = z.infer<typeof ProjectSchema>;
