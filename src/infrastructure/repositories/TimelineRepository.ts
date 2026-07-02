import type { TimelineEntry } from "@/domain/entities/TimelineEntry";
import { timeline } from "@/infrastructure/data/timeline.data";

export function findAll(): TimelineEntry[] {
  return timeline;
}
