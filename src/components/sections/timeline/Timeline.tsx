import type { TimelineEntry } from "@/domain/entities/TimelineEntry";
import { TimelineItem } from "./TimelineItem";
import { FadeIn } from "@/components/animations/FadeIn";

interface TimelineProps {
  entries: TimelineEntry[];
}

export function Timeline({ entries }: TimelineProps) {
  return (
    <section className="col-span-1 lg:col-span-8 flex flex-col gap-stack-lg">
      <h2 className="text-headline-lg text-primary mb-4 border-b border-surface-bright pb-4 inline-block">
        Experience &amp; Education
      </h2>
      <div className="relative timeline-line pl-12 flex flex-col gap-8">
        {entries.map((entry, idx) => (
          <FadeIn key={entry.id} delay={idx * 0.1}>
            <TimelineItem entry={entry} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
