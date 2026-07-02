import type { TimelineEntry } from "@/domain/entities/TimelineEntry";

interface TimelineItemProps {
  entry: TimelineEntry;
}

export function TimelineItem({ entry }: TimelineItemProps) {
  return (
    <div className="relative bg-surface-container-high rounded-md p-card-padding border border-surface-bright hover:border-surface-tint transition-colors duration-300">
      {/* Glowing node */}
      <div className="absolute -left-12 top-8 w-4 h-4 rounded-md bg-surface border-2 border-primary-fixed shadow-[0_0_10px_rgba(245,226,156,0.5)] z-10 translate-x-[2px]" />

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
        <h3 className="text-headline-md text-primary font-bold">{entry.title}</h3>
        <span className="text-meta text-surface-tint bg-surface-dim px-3 py-1 rounded-sm border border-outline-variant whitespace-nowrap">
          {entry.dateRange}
        </span>
      </div>
      <h4 className="text-body-md text-primary-fixed mb-4">{entry.org}</h4>
      <p className="text-meta text-on-surface-variant">{entry.description}</p>
    </div>
  );
}
