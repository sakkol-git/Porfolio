"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle2, ExternalLink, Code2, Mail, Layout, Network, Flame, Lightbulb, Target, Wrench, ShieldAlert, Zap, Activity } from "lucide-react";
import type { Project } from "@/domain/entities/Project";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { HoverScale } from "@/components/animations/HoverScale";
import { getAllProjects } from "@/application/services/getAllProjects";
import { ProjectSnapshotCard } from "./ProjectSnapshotCard";

interface ProjectDetailClientProps {
  project: Project;
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const allProjects = getAllProjects();
  const others = allProjects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <main className="max-w-container-max mx-auto px-6 md:px-10 pt-32 pb-24 flex flex-col gap-16">
      <FadeIn direction="right">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-body-sm text-on-surface-variant hover:text-primary-fixed transition-colors w-fit"
        >
          <ArrowLeft size={18} />
          All projects
        </Link>
      </FadeIn>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column (Main details) */}
        <div className="lg:col-span-8 flex flex-col gap-16 md:gap-20">
          <HeroContent project={project} />
          <BusinessContext project={project} />
          <SolutionSection project={project} />
          <ArchitectureSection project={project} />
          <TechStackSection project={project} />
          <KeyFeaturesSection project={project} />
          <EngineeringHighlights project={project} />
          <ChallengesSection project={project} />
        </div>

        {/* Right Column (Snapshot, Metrics & Learnings) */}
        <div className="lg:col-span-4 flex flex-col gap-12 lg:sticky lg:top-24 h-fit z-10">
          <FadeIn delay={0.3}>
            <ProjectSnapshotCard project={project} />
          </FadeIn>
          <MetricsSection project={project} />
          <LearningsSection project={project} />
        </div>
      </section>

      {/* 10. Screenshots / Demo Preview */}
      <SystemInterfaceSection project={project} />

      {/* 12. Footer CTA (More Projects) */}
      <FooterCTA others={others} />
    </main>
  );
}

// --- Sub-components (Optimized for performance and readability) ---

function HeroContent({ project }: { project: Project }) {
  return (
    <StaggerContainer className="flex flex-col gap-6">
      <StaggerItem>
        <div className="flex flex-col gap-2">
          <span className="text-primary-fixed text-label-caps uppercase tracking-wider font-semibold">
            {project.year} · {project.role}
          </span>
          <h1 className="text-display text-4xl md:text-5xl lg:text-6xl text-primary leading-tight font-bold">
            {project.title}
          </h1>
        </div>
      </StaggerItem>

      <StaggerItem>
        <p className="text-headline-sm text-on-surface-variant font-medium border-l-4 border-primary-fixed pl-4 italic">
          {project.impactStatement}
        </p>
      </StaggerItem>

      <StaggerItem>
        <div className="flex flex-wrap gap-2 mt-2">
          {project.techStack.map((t) => (
            <span
              key={t}
              className="glass-pill px-3 py-1.5 rounded-md text-meta text-primary-fixed font-medium bg-primary-fixed/10 border border-primary-fixed/20 shadow-[0_0_10px_rgba(var(--color-primary-fixed-rgb),0.1)]"
            >
              {t}
            </span>
          ))}
        </div>
      </StaggerItem>

      {(
        (project.links.productionUrl && project.links.productionUrl !== "#") ||
        (project.links.repoUrl && project.links.repoUrl !== "#") ||
        (project.links.architectureDiagram && project.links.architectureDiagram !== "#")
      ) && (
        <StaggerItem>
          <div className="flex flex-wrap gap-4 mt-4">
            {project.links.productionUrl && project.links.productionUrl !== "#" && (
              <HoverScale>
                <a
                  href={project.links.productionUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-primary-fixed text-on-primary-fixed px-6 py-3 rounded-md text-body-md font-bold hover:bg-primary-fixed-dim transition-colors shadow-lg shadow-primary-fixed/20"
                >
                  <ExternalLink size={18} strokeWidth={2} />
                  Live Demo
                </a>
              </HoverScale>
            )}
            
            {project.links.repoUrl && project.links.repoUrl !== "#" && (
              <HoverScale>
                <a
                  href={project.links.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-card border border-card-border flex items-center justify-center gap-2 px-6 py-3 rounded-md text-body-md text-primary hover:text-primary-fixed hover:border-primary-fixed transition-colors"
                >
                  <Code2 size={18} />
                  Source Code
                </a>
              </HoverScale>
            )}

            {project.links.architectureDiagram && project.links.architectureDiagram !== "#" && (
              <HoverScale>
                <a
                  href={project.links.architectureDiagram}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-card border border-card-border flex items-center justify-center gap-2 px-6 py-3 rounded-md text-body-md text-primary hover:text-primary-fixed hover:border-primary-fixed transition-colors"
                >
                  <Network size={18} />
                  Architecture Diagram
                </a>
              </HoverScale>
            )}
          </div>
        </StaggerItem>
      )}
    </StaggerContainer>
  );
}

function BusinessContext({ project }: { project: Project }) {
  return (
    <FadeIn>
      <div className="flex flex-col gap-4">
        <h2 className="text-headline-md font-bold text-primary flex items-center gap-3">
          <Target className="text-primary-fixed" /> Business Context
        </h2>
        <div className="glass-card border border-outline-variant rounded-md p-6 md:p-8 bg-surface-variant/30">
          <p className="text-body-lg text-body-text leading-relaxed">
            {project.problemStatement}
          </p>
        </div>
      </div>
    </FadeIn>
  );
}

function SolutionSection({ project }: { project: Project }) {
  return (
    <FadeIn>
      <div className="flex flex-col gap-4">
        <h2 className="text-headline-md font-bold text-primary flex items-center gap-3">
          <Lightbulb className="text-primary-fixed" /> The Solution
        </h2>
        <p className="text-body-lg text-body-text leading-relaxed mb-2">
          {project.solution.statement}
        </p>
        <ul className="flex flex-col gap-3">
          {project.solution.coreFeatures.map((h, i) => (
            <li key={i} className="flex items-start gap-3 text-body-md text-on-surface-variant bg-surface rounded-md p-4 border border-card-border shadow-sm">
              <CheckCircle2 size={20} className="text-primary-fixed shrink-0 mt-0.5" />
              <span className="font-medium">{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </FadeIn>
  );
}

function ArchitectureSection({ project }: { project: Project }) {
  return (
    <FadeIn>
      <div className="flex flex-col gap-6">
        <h2 className="text-headline-md font-bold text-primary flex items-center gap-3">
          <Network className="text-primary-fixed" /> Architecture Overview
        </h2>
        <p className="text-body-lg text-body-text leading-relaxed">
          {project.architectureOverview.explanation}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          {project.architectureOverview.keyComponents.map((comp, i) => (
            <div key={i} className="glass-card p-4 rounded-md border border-primary-fixed/20 flex items-center gap-3 shadow-[0_0_15px_rgba(var(--color-primary-fixed-rgb),0.05)]">
              <Layout className="text-primary-fixed shrink-0" size={20} />
              <span className="text-body-md text-primary font-semibold">{comp}</span>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

function TechStackSection({ project }: { project: Project }) {
  return (
    <FadeIn>
      <div className="flex flex-col gap-6">
        <h2 className="text-headline-md font-bold text-primary flex items-center gap-3">
          <Wrench className="text-primary-fixed" /> Tech Stack & Reasoning
        </h2>
        <div className="overflow-hidden rounded-md border border-card-border glass-card">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-variant/50 border-b border-card-border">
                <th className="p-4 text-meta uppercase tracking-wider text-primary-fixed font-bold w-1/3">Technology</th>
                <th className="p-4 text-meta uppercase tracking-wider text-primary-fixed font-bold">Why it was used</th>
              </tr>
            </thead>
            <tbody>
              {project.techDetails.map((tech, i) => (
                <tr key={i} className="border-b border-card-border/50 last:border-b-0 hover:bg-surface-variant/20 transition-colors">
                  <td className="p-4 text-body-md text-primary font-semibold align-top">{tech.name}</td>
                  <td className="p-4 text-body-md text-on-surface-variant leading-relaxed">{tech.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </FadeIn>
  );
}

function KeyFeaturesSection({ project }: { project: Project }) {
  return (
    <FadeIn>
      <div className="flex flex-col gap-4">
        <h2 className="text-headline-md font-bold text-primary flex items-center gap-3">
          <Flame className="text-primary-fixed" /> Key Features
        </h2>
        <ul className="flex flex-col gap-3">
          {project.keyFeatures.map((f, i) => (
            <li key={i} className="flex items-start gap-3 text-body-md text-on-surface-variant">
              <CheckCircle2 size={20} className="text-primary-fixed shrink-0 mt-0.5" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </FadeIn>
  );
}

function EngineeringHighlights({ project }: { project: Project }) {
  return (
    <FadeIn>
      <div className="flex flex-col gap-4">
        <h2 className="text-headline-md font-bold text-primary flex items-center gap-3">
          <Code2 className="text-primary-fixed" /> Engineering Highlights
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {project.engineeringHighlights.map((highlight, i) => {
            const parts = highlight.split("**");
            return (
              <div key={i} className="glass-card rounded-md p-5 border-l-4 border-l-primary-fixed flex flex-col gap-2 shadow-sm bg-gradient-to-r from-primary-fixed/5 to-transparent">
                <p className="text-body-md text-primary leading-relaxed">
                  {parts.map((part, index) => 
                    index % 2 === 1 ? <strong key={index} className="text-primary-fixed font-bold">{part}</strong> : <span key={index}>{part}</span>
                  )}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </FadeIn>
  );
}

function ChallengesSection({ project }: { project: Project }) {
  if (!project.challenges || project.challenges.length === 0) return null;
  return (
    <FadeIn>
      <div className="flex flex-col gap-6">
        <h2 className="text-headline-md font-bold text-primary flex items-center gap-3">
          <ShieldAlert className="text-primary-fixed" /> Challenges & Solutions
        </h2>
        <div className="flex flex-col gap-6">
          {project.challenges.map((item, i) => (
            <div key={i} className="glass-card border border-card-border rounded-md p-6 flex flex-col md:flex-row gap-6 bg-surface-variant/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-error/80"></div>
              <div className="flex-1 flex flex-col gap-2">
                <span className="text-label-caps text-error font-bold uppercase tracking-widest">Challenge</span>
                <p className="text-body-md text-primary font-medium">{item.challenge}</p>
              </div>
              
              <div className="hidden md:block w-px bg-outline-variant self-stretch"></div>
              <div className="md:hidden h-px w-full bg-outline-variant"></div>
              
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-label-caps text-primary-fixed font-bold uppercase tracking-widest">Solution</span>
                  <p className="text-body-md text-on-surface-variant">{item.solution}</p>
                </div>
                <div className="bg-primary-fixed/10 border border-primary-fixed/20 p-3 rounded-md flex gap-2 items-start mt-2">
                  <Zap size={16} className="text-primary-fixed shrink-0 mt-0.5" />
                  <p className="text-body-sm font-semibold text-primary"><span className="text-primary-fixed">Impact:</span> {item.impact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

function MetricsSection({ project }: { project: Project }) {
  if (!project.metrics || project.metrics.length === 0) return null;
  return (
    <FadeIn delay={0.2} direction="left">
      <div className="glass-card border border-card-border rounded-md p-6 flex flex-col gap-4 bg-gradient-to-br from-surface to-surface-variant">
        <h3 className="text-headline-sm font-bold text-primary flex items-center gap-2">
          <Activity size={20} className="text-primary-fixed" />
          Performance Metrics
        </h3>
        <div className="grid grid-cols-1 gap-6 mt-2">
          {project.metrics.map((m, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-display text-3xl lg:text-4xl text-primary-fixed font-bold leading-none break-words">{m.value}</span>
              <span className="text-meta uppercase tracking-wider text-on-surface-variant font-semibold">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

function LearningsSection({ project }: { project: Project }) {
  if (!project.learnings || project.learnings.length === 0) return null;
  return (
    <FadeIn delay={0.3} direction="left">
      <div className="glass-card border border-card-border rounded-md p-6 flex flex-col gap-4 bg-surface-variant/20">
        <h3 className="text-headline-sm font-bold text-primary flex items-center gap-2">
          <Lightbulb size={20} className="text-primary-fixed" />
          What I Learned
        </h3>
        <ul className="flex flex-col gap-3">
          {project.learnings.map((l, i) => (
            <li key={i} className="flex items-start gap-2 text-body-sm text-on-surface-variant">
              <span className="text-primary-fixed font-bold">•</span>
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </div>
    </FadeIn>
  );
}

function SystemInterfaceSection({ project }: { project: Project }) {
  const [activeImg, setActiveImg] = useState(
    project.gallery[0] ?? project.thumbnailUrl
  );

  return (
    <section className="flex flex-col gap-8 mt-8 border-t border-outline-variant pt-16">
      <FadeIn>
        <h2 className="text-headline-md font-bold text-primary flex items-center gap-3">
          <Layout className="text-primary-fixed" /> System Interface
        </h2>
      </FadeIn>
      <FadeIn delay={0.2} className="flex flex-col gap-4">
        {/* Main Featured Image */}
        <div className="glass-card rounded-md overflow-hidden aspect-[16/9] w-full border border-card-border shadow-2xl relative">
          <Image
            src={activeImg}
            alt={`${project.title} — feature view`}
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
        </div>
        
        {/* Gallery Thumbnails */}
        {project.gallery.length > 1 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
            {project.gallery.map((src, index) => {
              const isActive = src === activeImg;
              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImg(src)}
                  className={`relative glass-card rounded-md overflow-hidden aspect-[4/3] group ring-2 transition-all ${
                    isActive
                      ? "ring-primary-fixed opacity-100 shadow-[0_0_15px_rgba(var(--color-primary-fixed-rgb),0.3)]"
                      : "ring-transparent hover:ring-outline-variant opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`View image ${index + 1}`}
                >
                  <Image
                    src={src}
                    alt={`${project.title} gallery thumbnail ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </button>
              );
            })}
          </div>
        )}
      </FadeIn>
    </section>
  );
}

function FooterCTA({ others }: { others: Project[] }) {
  return (
    <FadeIn delay={0.2} className="flex flex-col gap-8 border-t border-outline-variant pt-16 mt-8">
      <div className="flex flex-col md:flex-row gap-6 md:items-end justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-headline-md font-bold text-primary">Want to see more projects?</h2>
          <p className="text-body-md text-on-surface-variant max-w-lg">
            Explore my other recent work to see a broader range of system architectures and full-stack solutions.
          </p>
        </div>
        <div className="flex gap-4">
          <HoverScale>
            <Link
              href="/projects"
              className="glass-card border border-card-border flex items-center justify-center px-6 py-3 rounded-md text-body-md text-primary font-bold hover:text-primary-fixed hover:border-primary-fixed transition-colors"
            >
              View all projects
            </Link>
          </HoverScale>
          <HoverScale>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 bg-primary-fixed text-on-primary-fixed px-6 py-3 rounded-md text-body-md font-bold hover:bg-primary-fixed-dim transition-colors shadow-lg shadow-primary-fixed/20"
            >
              <Mail size={18} />
              Discuss a role
            </Link>
          </HoverScale>
        </div>
      </div>
      
      {others.length > 0 && (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {others.map((o) => (
            <StaggerItem key={o.slug}>
              <Link
                href={`/projects/${o.slug}`}
                className="glass-card border border-card-border rounded-md overflow-hidden group flex flex-col h-full hover:border-primary-fixed hover:shadow-[0_0_20px_rgba(var(--color-primary-fixed-rgb),0.1)] transition-all duration-300 bg-surface-variant/10 hover:bg-surface-variant/30"
              >
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary-fixed/10 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                  <Image
                    src={o.thumbnailUrl}
                    alt={`${o.title} preview`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5 flex flex-col gap-2 flex-grow">
                  <span className="text-meta uppercase tracking-wider text-primary-fixed font-bold">{o.year}</span>
                  <h3 className="text-headline-sm font-bold text-primary group-hover:text-primary-fixed transition-colors">
                    {o.title}
                  </h3>
                  <p className="text-body-sm text-on-surface-variant line-clamp-2 mt-1">
                    {o.impactStatement}
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </FadeIn>
  );
}

