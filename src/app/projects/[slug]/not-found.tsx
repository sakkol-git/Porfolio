import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/layout";
import { FadeIn } from "@/components/animations/FadeIn";

export default function ProjectNotFound() {
  return (
    <PageShell className="flex items-center justify-center pt-0 pb-0">
      <FadeIn className="max-w-md text-center flex flex-col items-center">
        <h1 className="text-display text-4xl md:text-5xl font-bold text-primary">
          Project not found
        </h1>
        <p className="mt-4 text-body-lg text-on-surface-variant">
          The project you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/projects"
          className="mt-8 glass-pill inline-flex items-center gap-2 px-6 py-3 rounded-full text-body-md text-primary hover:text-primary-fixed transition-colors"
        >
          <ArrowLeft size={18} />
          Back to projects
        </Link>
      </FadeIn>
    </PageShell>
  );
}
