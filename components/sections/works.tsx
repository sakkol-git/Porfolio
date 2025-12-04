"use client"

import { memo, useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, ExternalLink, Github, Sparkles } from "lucide-react"
import Image from "next/image"

import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"

import { projects, type Project } from "@/config/projects"

// Premium easing curves
const EASE = {
  smooth: [0.6, 0.01, 0.05, 0.95] as const,
  spring: [0.43, 0.13, 0.23, 0.96] as const,
  expo: [0.16, 1, 0.3, 1] as const,
}

// Project Card Component
interface ProjectCardProps {
  project: Project
  index: number
}

const ProjectCard = memo(function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.2 })
  
  // Use modulo to create a staggered effect that resets every row (assuming 3 columns)
  // This prevents large delays for items further down the list
  const delay = (index % 3) * 0.1

  return (
    <motion.article
      ref={cardRef}
      className="group relative"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
      transition={{ duration: 0.6, delay, ease: EASE.expo }}
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute -inset-4 rounded-[32px] bg-gradient-to-r from-accent/20 via-purple-500/20 to-pink-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        initial={{ scale: 0.8 }}
        animate={isInView ? { scale: 1 } : { scale: 0.8 }}
        transition={{ duration: 1, delay: delay + 0.2 }}
      />

      {/* Card */}
      <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800/80 shadow-xl hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 hover:-translate-y-2">
        
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.3, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 1.3, opacity: 0 }}
            transition={{ duration: 1.2, delay: delay + 0.1, ease: EASE.expo }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 3}
            />
          </motion.div>

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-transparent to-purple-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Category */}
          <motion.div
            className="absolute top-4 left-4 z-10"
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -20, scale: 0.8 }}
            transition={{ duration: 0.5, delay: delay + 0.3, ease: EASE.spring }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-accent/90 backdrop-blur-md rounded-full shadow-lg shadow-accent/25">
              <Sparkles size={12} className="animate-pulse" />
              {project.category}
            </span>
          </motion.div>

          {/* Year */}
          <motion.div
            className="absolute top-4 right-4 z-10"
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 20, scale: 0.8 }}
            transition={{ duration: 0.5, delay: delay + 0.35, ease: EASE.spring }}
          >
            <span className="px-3 py-1.5 text-xs font-mono font-bold text-white/95 bg-black/50 backdrop-blur-md rounded-lg border border-white/10">
              {project.year}
            </span>
          </motion.div>

          {/* Index Number */}
          <motion.div
            className="absolute bottom-2 left-4 z-10 pointer-events-none select-none"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: delay + 0.4, ease: EASE.expo }}
          >
            <span className="text-7xl md:text-8xl font-black text-white/10 leading-none tracking-tighter">
              {String(index + 1).padStart(2, '0')}
            </span>
          </motion.div>

          {/* Hover Buttons */}
          <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
            <motion.span 
              className="inline-flex items-center justify-center w-10 h-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full text-accent shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={16} strokeWidth={2.5} />
            </motion.span>
            {project.github && (
              <motion.span 
                className="inline-flex items-center justify-center w-10 h-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full text-gray-700 dark:text-gray-300 shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={16} strokeWidth={2.5} />
              </motion.span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6 space-y-4">
          {/* Title */}
          <motion.div
            className="flex items-start justify-between gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: delay + 0.45, ease: EASE.expo }}
          >
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight group-hover:text-accent transition-colors duration-300">
              {project.title}
            </h3>
            <motion.span
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-accent group-hover:text-white transition-all duration-300"
              whileHover={{ rotate: 45 }}
            >
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </motion.span>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5, delay: delay + 0.5, ease: EASE.expo }}
          >
            {project.description}
          </motion.p>

          {/* Tech Stack */}
          <motion.div
            className="flex flex-wrap gap-2 pt-1"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5, delay: delay + 0.55, ease: EASE.expo }}
          >
            {project.technologies.slice(0, 4).map((tech, i) => (
              <motion.span
                key={tech}
                className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-accent/10 hover:text-accent hover:border-accent/30 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: delay + 0.6 + i * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-500">
                +{project.technologies.length - 4} more
              </span>
            )}
          </motion.div>
        </div>

        {/* Border on Hover */}
        <div className="absolute inset-0 rounded-2xl lg:rounded-3xl border-2 border-transparent group-hover:border-accent/50 transition-colors duration-500 pointer-events-none" />
      </div>

      {/* Link */}
      <a
        href={project.link || "#"}
        target={project.link ? "_blank" : undefined}
        rel={project.link ? "noopener noreferrer" : undefined}
        className="absolute inset-0 z-20"
        aria-label={"View " + project.title + " project"}
      />
    </motion.article>
  )
})

// Animated Header
function AnimatedHeader() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <div ref={ref} className="text-center mb-16 md:mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: EASE.expo }}
        className="mb-4"
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-accent bg-accent/10 rounded-full border border-accent/20">
          <Sparkles size={14} />
          Featured Projects
        </span>
      </motion.div>

      <motion.h2
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight mb-6"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE.expo }}
      >
        Selected{" "}
        <span className="relative inline-block">
          <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-500 to-pink-500">
            Works
          </span>
          <motion.span
            className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-accent/30 via-purple-500/30 to-pink-500/30 rounded-full blur-sm"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE.expo }}
            style={{ originX: 0 }}
          />
        </span>
      </motion.h2>

      <motion.p
        className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2, ease: EASE.expo }}
      >
        Crafted with passion, precision, and cutting-edge technology. 
        Each project tells a unique story of innovation.
      </motion.p>
    </div>
  )
}

// Main Works Section
export function WorksSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <Section 
      ref={sectionRef}
      id="works" 
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
      aria-label="Works section"
    >
      {/* Background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY, opacity: bgOpacity }}
      >
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <Container className="relative z-10">
        <AnimatedHeader />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.a
            href="/works"
            className="group inline-flex items-center gap-3 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-accent via-purple-500 to-accent bg-[length:200%_100%] rounded-full shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all duration-500"
            whileHover={{ scale: 1.02, backgroundPosition: "100% 0" }}
            whileTap={{ scale: 0.98 }}
          >
            View All Projects
            <motion.span
              className="inline-flex items-center justify-center w-6 h-6 bg-white/20 rounded-full"
              whileHover={{ x: 5 }}
            >
              <ArrowUpRight size={14} />
            </motion.span>
          </motion.a>
        </motion.div>
      </Container>
    </Section>
  )
}
