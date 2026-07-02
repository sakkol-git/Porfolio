import { PageShell } from "@/components/layout";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectGrid } from "@/components/sections/project-grid";
import { getAllProjects } from "@/application/services/getAllProjects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of full-stack systems I've architected and shipped — labs, NGO platforms, e-commerce, luxury booking.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <PageShell>
      <SectionHeading
        eyebrow="Portfolio"
        title="My Projects"
        description="A collection of full-stack systems I've architected and shipped."
      />
      <ProjectGrid projects={projects} />
    </PageShell>
  );
}
