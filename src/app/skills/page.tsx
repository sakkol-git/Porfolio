import { PageShell } from "@/components/layout";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillGrid } from "@/components/sections/skill-grid";
import { getSkillCategories } from "@/application/services/getSkillCategories";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Explore my technical capabilities across languages, frameworks, API architecture, databases, DevOps, security, and networking.",
};

export default function SkillsPage() {
  const categories = getSkillCategories();

  return (
    <PageShell>
      <SectionHeading
        eyebrow="CAPABILITIES"
        title="My Skills"
        description="A comprehensive overview of my technical expertise and proficiency levels."
      />
      <SkillGrid categories={categories} />
    </PageShell>
  );
}
