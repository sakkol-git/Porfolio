import type { TimelineEntry } from "@/domain/entities/TimelineEntry";
import * as TimelineRepository from "@/infrastructure/repositories/TimelineRepository";

export function getTimeline(): TimelineEntry[] {
  return TimelineRepository.findAll();
}
