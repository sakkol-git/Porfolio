import { getAllProjects } from "@/application/services/getAllProjects";
import { getProjectBySlug } from "@/application/services/getProjectBySlug";
import { notFound } from "next/navigation";
import { ProjectDetailClient } from "@/components/sections/project-detail/ProjectDetailClient";
import { buildPageMetadata } from "@/lib/metadata";

// Required for Next.js static export (output: "export")
export function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  
  if (!project) {
    return buildPageMetadata("Project Not Found", "Project not found.", `/projects/${slug}`);
  }

  const metadata = buildPageMetadata(
    project.title,
    project.overview,
    `/projects/${project.slug}`
  );

  // Add OpenGraph image if available
  if (metadata.openGraph && project.thumbnailUrl) {
    metadata.openGraph.images = [{ url: project.thumbnailUrl }];
  }

  return metadata;
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
