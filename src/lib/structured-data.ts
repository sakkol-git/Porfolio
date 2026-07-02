import { SITE_URL } from "./constants";
import type { Profile } from "@/domain/entities/Profile";
import type { Project } from "@/domain/entities/Project";

export function buildPersonSchema(profile: Profile) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.roles[0],
    url: SITE_URL,
    sameAs: profile.socials.map((s) => s.href),
    description: profile.summary,
    image: profile.avatarUrl,
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SakkolDev",
    url: SITE_URL,
  };
}

export function buildProjectSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.description,
    programmingLanguage: project.techStack,
    codeRepository: project.links.repoUrl,
    url: project.links.productionUrl || `${SITE_URL}${project.links.detailHref}`,
  };
}
