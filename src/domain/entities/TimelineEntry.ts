import { z } from "zod";

export const TimelineEntrySchema = z.object({
  id: z.string(),
  kind: z.enum(["work", "education"]),
  title: z.string(),
  org: z.string(),
  dateRange: z.string(),
  description: z.string(),
});

export type TimelineEntry = z.infer<typeof TimelineEntrySchema>;
