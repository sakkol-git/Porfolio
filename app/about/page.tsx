"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Navigation } from "@/components/navigation"
import { PageTransition } from "@/components/page-transition"
import { Scene } from "@/components/three/scene"
import { TechCloud } from "@/components/three/tech-cloud"
import { FloatingShapes } from "@/components/three/floating-shapes"
import { SkillConstellation } from "@/components/three/skill-constellation"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin, Briefcase, GraduationCap, Code2, Github, Linkedin, Mail, Download } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

// Terminal lines for about me
interface TerminalLine {
  type: "comment" | "code" | "string" | "keyword" | "blank"
  content: string
}

const terminalBio: TerminalLine[] = [
  { type: "comment", content: "// about_me.ts" },
  { type: "blank", content: "" },
  { type: "keyword", content: "const developer = {" },
  { type: "string", content: '  name: "Chen Sakkol",' },
  { type: "string", content: '  role: "Frontend Dev & DevOps Engineer",' },
  { type: "string", content: '  location: "Phnom Penh, Cambodia",' },
  { type: "blank", content: "" },
  { type: "comment", content: "  // What drives me" },
  { type: "code", content: "  passion: [" },
  { type: "string", content: '    "Building immersive web experiences",' },
  { type: "string", content: '    "Automating CI/CD pipelines",' },
  { type: "string", content: '    "Cloud infrastructure & containers",' },
  { type: "string", content: '    "Infrastructure as Code (IaC)",' },
  { type: "string", content: '    "Kubernetes orchestration",' },
  { type: "code", content: "  ]," },
  { type: "blank", content: "" },
  { type: "comment", content: "  // DevOps Philosophy" },
  { type: "code", content: "  approach: [" },
  { type: "string", content: '    "Automate everything possible",' },
  { type: "string", content: '    "Monitor, measure, improve",' },
  { type: "string", content: '    "Build scalable systems",' },
  { type: "code", content: "  ]," },
  { type: "blank", content: "" },
  { type: "code", content: "  available: true," },
  { type: "keyword", content: "};" },
]

const timeline = [
  {
    year: "2024 - Present",
    title: "Frontend Developer & DevOps Engineer",
    company: "Freelance / Open to Opportunities",
    description: "Building modern web applications and automating deployment pipelines with Docker and CI/CD",
    icon: Briefcase,
  },
  {
    year: "2022 - Present",
    title: "Information Technology Engineering",
    company: "Royal University of Phnom Penh",
    description: "3rd year student focusing on web development, DevOps, and cloud computing",
    icon: GraduationCap,
  },
]

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"], color: "text-blue-500" },
  { category: "DevOps & CI/CD", items: ["Docker", "Kubernetes", "Jenkins", "GitHub Actions"], color: "text-orange-500" },
  { category: "Cloud & IaC", items: ["AWS", "Terraform", "Linux Server", "Nginx"], color: "text-green-500" },
  { category: "Monitoring & Tools", items: ["Prometheus", "Grafana", "Git", "VS Code"], color: "text-purple-500" },
]

// Terminal typewriter component for about page
function AboutTerminal() {
  const [displayedLines, setDisplayedLines] = useState<{ line: TerminalLine; text: string }[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const hasStarted = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted.current) {
          hasStarted.current = true
          setIsTyping(true)
        }
      },
      { threshold: 0.3 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isTyping || currentLineIndex >= terminalBio.length) return

    const currentLine = terminalBio[currentLineIndex]
    
    if (currentLine.type === "blank") {
      setDisplayedLines((prev) => [...prev, { line: currentLine, text: "" }])
      setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1)
        setCurrentCharIndex(0)
      }, 150)
      return
    }

    const typingSpeed = 25
    const lineDelay = 200

    if (currentCharIndex === 0) {
      setDisplayedLines((prev) => [...prev, { line: currentLine, text: "" }])
    }

    if (currentCharIndex < currentLine.content.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = {
            line: currentLine,
            text: currentLine.content.slice(0, currentCharIndex + 1),
          }
          return updated
        })
        setCurrentCharIndex((prev) => prev + 1)
      }, typingSpeed)

      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1)
        setCurrentCharIndex(0)
      }, lineDelay)

      return () => clearTimeout(timeout)
    }
  }, [isTyping, currentLineIndex, currentCharIndex])

  const getLineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "comment": return "text-gray-500"
      case "keyword": return "text-purple-500 dark:text-purple-400"
      case "string": return "text-green-600 dark:text-green-400"
      case "code": return "text-blue-500 dark:text-blue-400"
      default: return "text-foreground"
    }
  }

  return (
    <motion.div
      ref={containerRef}
      className="relative h-full bg-white/60 dark:bg-[#0d0d0d]/80 backdrop-blur-xl rounded-xl border border-white/50 dark:border-gray-700/40 overflow-hidden shadow-lg shadow-black/5 dark:shadow-black/20"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-5 py-4 border-b border-white/30 dark:border-gray-700/30 bg-white/40 dark:bg-gray-900/50">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-3 text-sm text-gray-500 dark:text-gray-400" style={{ fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace" }}>
          about_me.ts
        </span>
      </div>

      {/* Terminal Content */}
      <div className="p-6 md:p-8 space-y-1 text-sm md:text-base leading-relaxed overflow-auto max-h-[400px]" style={{ fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace" }}>
        {displayedLines.map((item, index) => (
          <div 
            key={index} 
            className={`min-h-[1.5rem] ${getLineColor(item.line.type)}`}
          >
            <span>{item.text}</span>
            {index === displayedLines.length - 1 && currentLineIndex < terminalBio.length && item.line.type !== "blank" && (
              <motion.span
                className="inline-block w-2 h-5 bg-purple-500/80 dark:bg-purple-400/80 ml-0.5 align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
              />
            )}
          </div>
        ))}

        {currentLineIndex >= terminalBio.length && (
          <div className="min-h-[1.5rem]">
            <motion.span
              className="inline-block w-2 h-5 bg-purple-500/80 dark:bg-purple-400/80"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effects
      gsap.to(".about-terminal", {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: ".bio-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })

      gsap.to(".about-3d", {
        y: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ".bio-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <PageTransition>
      <main ref={sectionRef} className="relative min-h-screen bg-transparent">
        <Navigation />

        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center pt-32 px-6 md:px-12 overflow-hidden bg-transparent">
          {/* 3D Background */}
          <div className="absolute inset-0 opacity-30">
            <Scene>
              <FloatingShapes variant="about" />
            </Scene>
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10">
            <motion.span
              className="text-accent text-sm tracking-widest uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              About Me
            </motion.span>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mt-4 tracking-tighter"
              style={{ fontFamily: "Clash Display, sans-serif" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              Building & Automating
              <br />
              <span className="text-outline">Digital Solutions</span>
            </motion.h1>

            <motion.div
              className="flex items-center gap-2 mt-8 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <MapPin size={16} className="text-accent" />
              <span>Phnom Penh, Cambodia</span>
            </motion.div>
          </div>
        </section>

        {/* Bio Section with Terminal Design */}
        <section className="bio-section py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-accent text-sm tracking-[0.3em] uppercase font-medium">Get to Know Me</span>
              <h2 
                className="text-3xl md:text-5xl font-bold mt-4 text-foreground"
                style={{ fontFamily: "Clash Display, sans-serif" }}
              >
                Who I Am
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                A passionate developer bridging the gap between beautiful UIs and robust infrastructure.
                I build, deploy, and automate with equal enthusiasm.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-10 items-start">
              {/* Left - Terminal with code */}
              <div className="about-terminal lg:col-span-7 min-h-[450px]">
                <AboutTerminal />
              </div>

              {/* Right - Portrait image photo */}
              <motion.div 
                className="lg:col-span-5 flex justify-center"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative p-1.5 rounded-xl
                                bg-gradient-to-br from-white/95 via-gray-50/90 to-slate-100/85 
                                dark:from-white/15 dark:via-gray-200/10 dark:to-white/5
                                backdrop-blur-2xl backdrop-saturate-150
                                border border-white/80 dark:border-white/20
                                shadow-[0_8px_40px_-8px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.5),inset_0_1px_0_rgba(255,255,255,0.8)]
                                dark:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1),inset_0_1px_0_rgba(255,255,255,0.15)]">
                  
                  {/* Holographic shine overlay */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/60 to-transparent dark:via-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/90 to-transparent dark:via-white/40" />
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-300/50 to-transparent dark:via-white/10" />
                    <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-white/90 via-gray-200/50 to-transparent dark:from-white/30 dark:via-white/10" />
                    <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-white/60 via-gray-200/30 to-transparent dark:from-white/20 dark:via-white/5" />
                  </div>
      
                  {/* Inner card with refined border */}
                  <div className="relative rounded-lg overflow-hidden
                                  ring-1 ring-black/5 dark:ring-white/10
                                  shadow-inner shadow-white/50 dark:shadow-black/20">
                    
                    {/* Portrait image container */}
                    <div className="relative w-64 h-80 md:w-72 md:h-96 lg:w-80 lg:h-[28rem]">
                      <Image
                        src="/profile.jpg"
                        alt="Sakkol Dev"
                        fill
                        className="object-cover object-top"
                        priority
                      />
                      
                      {/* Premium gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10" />
                    </div>
                  </div>
      
                  {/* Premium status indicator */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 
                                  flex items-center gap-2 
                                  bg-gradient-to-r from-white/95 via-gray-50/95 to-white/95 
                                  dark:from-gray-900/95 dark:via-gray-800/95 dark:to-gray-900/95
                                  backdrop-blur-xl px-4 py-1.5 rounded-full 
                                  border border-white/60 dark:border-white/15
                                  shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.5)]
                                  dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1)]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-xs font-semibold tracking-wide text-gray-700 dark:text-gray-200">
                      Available for work
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Grid - Terminal Style */}
        <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50 dark:from-gray-900/30 dark:via-transparent dark:to-gray-900/30">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-accent text-sm tracking-[0.3em] uppercase font-medium">Tech Stack</span>
              <h2
                className="text-3xl md:text-5xl font-bold mt-4"
                style={{ fontFamily: "Clash Display, sans-serif" }}
              >
                Skills & <span className="text-accent">Expertise</span>
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                From React frontends to Kubernetes clusters. I architect, develop, and deploy full-stack solutions.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.category}
                  className="group relative bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-xl border border-white/50 dark:border-gray-700/40 p-6 shadow-lg shadow-black/5 dark:shadow-black/20 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  {/* Terminal-style header */}
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/30 dark:border-gray-700/30">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                      <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                      <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                    </div>
                    <span className={`text-sm font-semibold ml-2 ${skill.color}`} style={{ fontFamily: "'Consolas', monospace" }}>
                      {skill.category.toLowerCase()}.ts
                    </span>
                  </div>
                  
                  <div className="space-y-2" style={{ fontFamily: "'Consolas', 'Monaco', monospace" }}>
                    {skill.items.map((item, idx) => (
                      <motion.div
                        key={item}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200/60 dark:hover:bg-gray-700/60 transition-colors cursor-default text-sm"
                        whileHover={{ x: 5 }}
                      >
                        <span className="text-gray-400">{idx + 1}</span>
                        <span className="text-foreground/90">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline - Classic Style */}
        <section className="py-24 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-16 text-center"
              style={{ fontFamily: "Clash Display, sans-serif" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              My <span className="text-accent">Journey</span>
            </motion.h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  className={`relative flex gap-8 mb-12 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  {/* Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-accent rounded-full -translate-x-1/2 mt-2 z-10" />

                  {/* Content */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <span className="text-accent text-sm font-medium">{item.year}</span>
                    <h3
                      className="text-xl md:text-2xl font-bold mt-2"
                      style={{ fontFamily: "Clash Display, sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mt-1">{item.company}</p>
                    <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA - Terminal Style */}
        <section className="py-24 px-6 md:px-12 bg-transparent">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="relative bg-white/60 dark:bg-[#0d0d0d]/80 backdrop-blur-xl rounded-xl border border-white/50 dark:border-gray-700/40 overflow-hidden shadow-lg shadow-black/5 dark:shadow-black/20 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-5 py-4 border-b border-white/30 dark:border-gray-700/30 bg-white/40 dark:bg-gray-900/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="ml-3 text-sm text-gray-500 dark:text-gray-400" style={{ fontFamily: "'Consolas', monospace" }}>
                  next_step.sh
                </span>
              </div>
              
              <div className="p-10 md:p-14">
                <h2
                  className="text-3xl md:text-5xl font-bold mb-4"
                  style={{ fontFamily: "Clash Display, sans-serif" }}
                >
                  Ready to see my work?
                </h2>
                <p className="text-muted-foreground mb-8" style={{ fontFamily: "'Consolas', monospace" }}>
                  <span className="text-green-500">$</span> explore --projects
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/works"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg"
                    style={{ fontFamily: "Clash Display, sans-serif" }}
                    data-cursor="pointer"
                  >
                    View Projects
                    <ArrowRight size={20} />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gray-100 dark:bg-gray-800 text-foreground rounded-xl font-bold text-lg hover:scale-105 transition-transform border border-gray-200 dark:border-gray-700"
                    style={{ fontFamily: "Clash Display, sans-serif" }}
                    data-cursor="pointer"
                  >
                    Get in Touch
                    <Mail size={20} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 md:px-12 border-t border-gray-200/50 dark:border-gray-800/50">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© 2025 Chen Sakkol. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:chensakkol1124@gmail.com" className="text-muted-foreground hover:text-accent transition-colors">
                <Mail size={20} />
              </a>
            </div>
            <p className="text-sm text-muted-foreground" style={{ fontFamily: "'Consolas', monospace" }}>
              Made with React + DevOps Tools
            </p>
          </div>
        </footer>
      </main>
    </PageTransition>
  )
}
