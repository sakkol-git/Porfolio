import { z } from "zod";

export const ProjectLinksSchema = z.object({
  detailHref: z.string(),
  productionUrl: z.string().optional(),
  repoUrl: z.string().optional(),
  architectureDiagram: z.string().optional(),
});

export type ProjectLinks = z.infer<typeof ProjectLinksSchema>;
