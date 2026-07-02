"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ExternalLink, Code2, Mail } from "lucide-react";
import type { Project } from "@/domain/entities/Project";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { HoverScale } from "@/components/animations/HoverScale";
import { getAllProjects } from "@/application/services/getAllProjects";

interface ProjectDetailClientProps {
  project: Project;
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [activeImg, setActiveImg] = useState(
    project.gallery[0] ?? project.thumbnailUrl
  );

  // Fetch all projects and filter out the current one to show "More projects"
  // Note: Since this is a client component, we just call the static data service
  // but in a real app with dynamic data, we might pass this as a prop from Server Component.
  const allProjects = getAllProjects();
  const others = allProjects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <main className="max-w-container-max mx-auto px-6 md:px-10 pt-32 pb-24 flex flex-col gap-14">
      <FadeIn direction="right">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-body-sm text-on-surface-variant hover:text-primary-fixed transition-colors w-fit"
        >
          <ArrowLeft size={18} />
          All projects
        </Link>
      </FadeIn>

      <StaggerContainer className="flex flex-col gap-4 max-w-3xl">
        <StaggerItem>
          <span className="text-primary-fixed text-label-caps uppercase">
            {project.year} · {project.role}
          </span>
        </StaggerItem>
        <StaggerItem>
          <h1 className="text-display text-4xl md:text-5xl lg:text-6xl text-primary leading-tight">
            {project.title}
          </h1>
        </StaggerItem>
        <StaggerItem>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.techStack.map((t) => (
              <span
                key={t}
                className="glass-pill px-3 py-1 rounded-full text-meta text-on-surface-variant"
              >
                {t}
              </span>
            ))}
          </div>
        </StaggerItem>
      </StaggerContainer>

      <FadeIn delay={0.2} className="flex flex-col gap-4">
        {/* Main Featured Image */}
        <div className="glass-card rounded-2xl overflow-hidden aspect-[16/9] w-full border border-card-border">
          <img
            src={activeImg}
            alt={`${project.title} — feature view`}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
        </div>
        
        {/* Gallery Thumbnails */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {project.gallery.map((src) => {
            const isActive = src === activeImg;
            return (
              <button
                key={src}
                type="button"
                onClick={() => setActiveImg(src)}
                className={`glass-card rounded-xl overflow-hidden aspect-[4/3] group ring-1 transition-all ${
                  isActive
                    ? "ring-primary-fixed opacity-100"
                    : "ring-transparent hover:ring-outline-variant opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={src}
                  alt={`${project.title} gallery thumbnail`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>
            );
          })}
        </div>
      </FadeIn>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-8">
        {/* Left Column: Overview & Highlights */}
        <StaggerContainer delayChildren={0.2} className="md:col-span-2 flex flex-col gap-10">
          <StaggerItem className="flex flex-col gap-4">
            <h2 className="text-headline-md font-bold text-primary">Overview</h2>
            <p className="text-body-lg text-body-text leading-relaxed">
              {project.overview}
            </p>
          </StaggerItem>
          
          <StaggerItem className="flex flex-col gap-4">
            <h2 className="text-headline-md font-bold text-primary">Highlights</h2>
            <ul className="flex flex-col gap-3">
              {project.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 text-body-md text-on-surface-variant"
                >
                  <CheckCircle2 size={20} className="text-primary-fixed shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </StaggerItem>
        </StaggerContainer>

        {/* Right Column: Metadata & Links Aside */}
        <FadeIn delay={0.4} direction="left">
          <aside className="glass-card border border-card-border rounded-2xl p-6 flex flex-col gap-6 h-fit sticky top-24">
            <div className="flex flex-col gap-1">
              <span className="text-meta uppercase tracking-wider text-primary-fixed font-semibold">
                Role
              </span>
              <span className="text-body-md text-primary">{project.role}</span>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-meta uppercase tracking-wider text-primary-fixed font-semibold">
                Year
              </span>
              <span className="text-body-md text-primary">{project.year}</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="text-meta uppercase tracking-wider text-primary-fixed font-semibold">
                Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((t) => (
                  <span
                    key={t}
                    className="glass-pill px-3 py-1 rounded-full text-meta text-on-surface-variant"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Call to Actions */}
            <div className="flex flex-col gap-3 border-t border-outline-variant pt-6 mt-2">
              {project.links.productionUrl && project.links.productionUrl !== "#" && (
                <HoverScale>
                  <a
                    href={project.links.productionUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-primary-fixed text-on-primary-fixed px-4 py-3 rounded-full text-body-md font-bold hover:bg-primary-fixed-dim transition-colors"
                  >
                    <ExternalLink size={18} strokeWidth={2} />
                    Visit production
                  </a>
                </HoverScale>
              )}
              
              {project.links.repoUrl && project.links.repoUrl !== "#" && (
                <HoverScale>
                  <a
                    href={project.links.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full glass-card border border-card-border flex items-center justify-center gap-2 px-4 py-3 rounded-full text-body-md text-primary hover:text-primary-fixed hover:border-primary-fixed transition-colors"
                  >
                    <Code2 size={18} />
                    View source
                  </a>
                </HoverScale>
              )}
              
              <HoverScale>
                <Link
                  href="/contact"
                  className="w-full glass-card border border-card-border flex items-center justify-center gap-2 px-4 py-3 rounded-full text-body-md text-primary hover:text-primary-fixed hover:border-primary-fixed transition-colors"
                >
                  <Mail size={18} />
                  Discuss a project
                </Link>
              </HoverScale>
            </div>
          </aside>
        </FadeIn>
      </section>

      {/* More Projects Section */}
      {others.length > 0 && (
        <FadeIn delay={0.2} className="flex flex-col gap-6 border-t border-outline-variant pt-12 mt-8">
          <h2 className="text-headline-md font-bold text-primary">More projects</h2>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {others.map((o) => (
              <StaggerItem key={o.slug}>
                <Link
                  href={`/projects/${o.slug}`}
                  className="glass-card border border-card-border rounded-2xl overflow-hidden group flex flex-col h-full hover:border-primary-fixed transition-colors"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={o.thumbnailUrl}
                      alt={`${o.title} preview`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-2 flex-grow">
                    <h3 className="text-headline-sm font-bold text-primary group-hover:text-primary-fixed transition-colors">
                      {o.title}
                    </h3>
                    <p className="text-body-sm text-on-surface-variant line-clamp-2">
                      {o.description}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </FadeIn>
      )}
    </main>
  );
}
