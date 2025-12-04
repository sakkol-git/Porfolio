"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, ExternalLink, Github, Linkedin, Mail } from "lucide-react"
import Image from "next/image"

import { Navigation } from "@/components/navigation"
import { PageTransition } from "@/components/page-transition"
import { Scene } from "@/components/three/scene"
import { FloatingShapes } from "@/components/three/floating-shapes"
import { Container } from "@/components/ui/container"
import { projects } from "@/config/projects"

// Premium easing curves (matching works.tsx)
const EASE = {
  expo: [0.16, 1, 0.3, 1] as const,
  spring: [0.43, 0.13, 0.23, 0.96] as const,
}

export default function WorksPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

  return (
    <PageTransition>
      <main ref={containerRef} className="relative min-h-screen bg-background overflow-hidden">
        <Navigation />

        {/* Background Elements */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 md:px-12 overflow-hidden z-10">
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <Scene>
              <FloatingShapes variant="works" />
            </Scene>
          </div>

          <Container className="relative z-10">
            <motion.span
              className="text-accent text-sm tracking-widest uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              Portfolio
            </motion.span>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mt-4 tracking-tighter mb-8"
              style={{ fontFamily: "Clash Display, sans-serif" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE.expo }}
            >
              Featured
              <br />
              <span className="text-outline">Projects</span>
            </motion.h1>

            <motion.p
              className="max-w-xl text-lg md:text-xl text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE.expo }}
            >
              A curated selection of projects showcasing my expertise in frontend development, 
              3D graphics, and creative coding.
            </motion.p>
          </Container>
        </section>

        {/* Projects Grid */}
        <section className="py-20 px-6 md:px-12 relative z-10">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.article
                  key={project.id}
                  className="group relative flex flex-col h-full"
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: (index % 3) * 0.1, 
                    ease: EASE.expo 
                  }}
                >
                  {/* Card Content */}
                  <div className="relative flex-1 overflow-hidden rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800/80 shadow-xl hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 hover:-translate-y-2">
                    
                    {/* Image Container */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <motion.div
                        className="absolute inset-0"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.7, ease: EASE.expo }}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </motion.div>
                      
                      {/* Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                        <span className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-accent/90 backdrop-blur-md rounded-full shadow-lg">
                          {project.category}
                        </span>
                        <span className="px-3 py-1.5 text-xs font-mono font-bold text-white/90 bg-black/40 backdrop-blur-md rounded-lg border border-white/10">
                          {project.year}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col gap-4">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-accent hover:text-white transition-colors"
                            >
                              <Github size={16} />
                            </a>
                          )}
                          <a
                            href={project.link || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-accent hover:text-white transition-colors"
                          >
                            <ExternalLink size={16} />
                          </a>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-muted-foreground rounded-md border border-gray-200 dark:border-gray-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </Container>
        </section>

        {/* Footer */}
        <footer className="relative z-10 py-8 px-6 md:px-12 border-t border-gray-200/50 dark:border-gray-800/50">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© 2025 Chen Sakkol. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/chensakkol" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/chensakkol" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:chensakkol1124@gmail.com" className="text-muted-foreground hover:text-accent transition-colors">
                <Mail size={20} />
              </a>
            </div>
            <p className="text-sm text-muted-foreground" style={{ fontFamily: "'Consolas', monospace" }}>
              Made with React + Three.js
            </p>
          </div>
        </footer>
      </main>
    </PageTransition>
  )
}
