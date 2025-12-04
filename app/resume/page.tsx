"use client"

import { useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { 
  Download, 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone,
  ExternalLink,
  Star,
  Sparkles,
  Printer,
  Briefcase,
  GraduationCap,
  Code2,
  Rocket,
  Award,
  Calendar,
  Building2,
  BookOpen,
  Target,
  Users
} from "lucide-react"

import { Navigation } from "@/components/navigation"
import { PageTransition } from "@/components/page-transition"
import { Container } from "@/components/ui/container"
import { Scene } from "@/components/three/scene"
import { FloatingShapes } from "@/components/three/floating-shapes"

// Premium easing
const EASE = {
  expo: [0.16, 1, 0.3, 1] as const,
  spring: [0.43, 0.13, 0.23, 0.96] as const,
}

// Resume Data
const resumeData = {
  name: "Chen Sakkol",
  title: "Frontend Developer & DevOps Engineer",
  location: "Phnom Penh, Cambodia",
  phone: "+855 96 474 7120",
  email: "chensakkol1124@gmail.com",
  github: "https://github.com/chensakkol",
  linkedin: "https://linkedin.com/in/chensakkol",
  portfolio: "https://chensakkol.dev",
  
  summary: `Passionate 3rd-year Information Technology student at Royal University of Phnom Penh with expertise in frontend development and DevOps practices. Skilled in React, Next.js, Three.js for web development, and Docker, CI/CD pipelines, and cloud infrastructure for DevOps. Eager to apply my skills in building modern web applications with robust deployment pipelines. Looking for internship or entry-level opportunities in frontend or DevOps roles.`,
  
  skills: {
    frontend: ["JavaScript (ES6+)", "TypeScript", "React", "Next.js", "Three.js", "Tailwind CSS"],
    devops: ["Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Jenkins", "Linux"],
    cloud: ["AWS", "Google Cloud", "Nginx", "Apache", "Cloudflare"],
    tools: ["Git/GitHub", "VS Code", "Figma", "Webpack", "Vite", "Terraform"],
    soft: ["Problem Solving", "Self-Learning", "Team Collaboration", "Communication"],
  },
  
  education: {
    degree: "Bachelor of Engineering in Information Technology",
    school: "Royal University of Phnom Penh (RUPP)",
    period: "2022 – Present (3rd Year)",
    location: "Phnom Penh, Cambodia",
    highlights: [
      "Currently in 3rd year of 4-year program",
      "Focus on web development, DevOps, and cloud computing",
      "Active participant in coding workshops and tech events",
      "Learning infrastructure automation and deployment strategies",
    ],
  },
  
  projects: [
    {
      name: "Personal Portfolio Website",
      description: "Modern portfolio with 3D graphics, smooth animations, and CI/CD deployment pipeline.",
      tech: ["Next.js", "Three.js", "Framer Motion", "Vercel"],
    },
    {
      name: "Dockerized Web Application",
      description: "Full-stack application containerized with Docker and orchestrated with Docker Compose.",
      tech: ["Docker", "Node.js", "PostgreSQL", "Nginx"],
    },
    {
      name: "CI/CD Pipeline Setup",
      description: "Automated build, test, and deployment pipeline using GitHub Actions for multiple projects.",
      tech: ["GitHub Actions", "Docker", "AWS EC2", "Shell Scripts"],
    },
    {
      name: "Cloud Infrastructure Project",
      description: "Infrastructure as Code setup using Terraform to provision cloud resources on AWS.",
      tech: ["Terraform", "AWS", "Linux", "Bash"],
    },
  ],
  
  activities: [
    {
      title: "Self-Directed Learning",
      description: "Continuously learning frontend and DevOps technologies through courses, documentation, and hands-on projects.",
    },
    {
      title: "Open Source Contributions",
      description: "Contributing to open source projects on GitHub to learn best practices and collaborate with developers.",
    },
    {
      title: "Home Lab Setup",
      description: "Running personal servers and experimenting with containerization, networking, and automation.",
    },
  ],
}

// Animated Section Component
function AnimatedSection({ 
  children, 
  className = "",
  delay = 0 
}: { 
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: EASE.expo }}
    >
      {children}
    </motion.div>
  )
}

// Section Header Component
// Section Header Component
function SectionHeader({ 
  icon: Icon, 
  title,
  delay = 0
}: { 
  icon: React.ComponentType<{ size?: number; className?: string }>
  title: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <motion.div
      ref={ref}
      className="flex items-center gap-3 mb-6"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay, ease: EASE.expo }}
    >
      <div className="p-2.5 rounded-xl bg-gradient-to-br from-accent/20 to-purple-500/20 border border-accent/20">
        <Icon size={20} className="text-accent" />
      </div>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
        {title}
      </h2>
      <div className="flex-1 h-px bg-gradient-to-r from-accent/30 to-transparent" />
    </motion.div>
  )
}

// Skill Tag Component
function SkillTag({ skill, index }: { skill: string; index: number }) {
  return (
    <motion.span
      className="px-3 py-1.5 text-sm font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:border-accent/50 hover:text-accent transition-all duration-300"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      whileHover={{ scale: 1.05, y: -2 }}
    >
      {skill}
    </motion.span>
  )
}

// Project Card Component
function ProjectCard({ project, index }: { project: typeof resumeData.projects[0]; index: number }) {
  return (
    <motion.div
      className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-lg hover:shadow-xl hover:border-accent/30 hover:-translate-y-1 transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: EASE.expo }}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 rounded-lg bg-gradient-to-br from-accent/20 to-purple-500/20">
          <Rocket size={16} className="text-accent" />
        </div>
        <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-accent transition-colors">
          {project.name}
        </h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span 
            key={t}
            className="px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded-md"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function ResumePage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const containerRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })
  
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  const downloadPDF = async () => {
    if (isGenerating) return
    setIsGenerating(true)
    
    const printWindow = window.open('', '_blank', 'width=850,height=1100')
    
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Chen Sakkol - Resume</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: 'Inter', 'Segoe UI', Roboto, sans-serif;
              font-size: 11px;
              line-height: 1.5;
              color: #1f2937;
              background: #fff;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .header {
              background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
              color: white;
              padding: 28px 32px;
              text-align: center;
            }
            .header h1 { font-size: 26px; font-weight: 700; margin-bottom: 4px; letter-spacing: -0.5px; }
            .header .title { font-size: 14px; color: #a78bfa; font-weight: 600; margin-bottom: 14px; }
            .contact-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; font-size: 10px; color: #d1d5db; }
            .contact-row span, .contact-row a { display: flex; align-items: center; gap: 5px; }
            .contact-row a { color: #d1d5db; text-decoration: none; }
            .body { padding: 20px 28px; }
            .section { margin-bottom: 16px; }
            .section-title {
              font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;
              color: #111827; border-bottom: 2px solid #a78bfa; padding-bottom: 4px; margin-bottom: 10px;
              display: flex; align-items: center; gap: 6px;
            }
            .summary { color: #374151; line-height: 1.6; font-size: 10.5px; }
            .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
            .skill-item { font-size: 10px; }
            .skill-label { font-weight: 600; color: #111827; }
            .skill-value { color: #4b5563; }
            .edu-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
            .edu-degree { font-size: 12px; font-weight: 700; color: #111827; }
            .edu-school { font-size: 10px; color: #6b7280; }
            .edu-period { font-size: 9px; color: #6b7280; background: #f3f4f6; padding: 2px 8px; border-radius: 10px; }
            .edu-highlights { list-style: none; margin-top: 8px; }
            .edu-highlights li { display: flex; gap: 6px; margin-bottom: 3px; color: #374151; font-size: 10px; }
            .edu-highlights li::before { content: "▸"; color: #a78bfa; font-weight: bold; }
            .projects-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
            .project-card { background: #f9fafb; border-radius: 8px; padding: 10px; border: 1px solid #e5e7eb; }
            .project-name { font-size: 10px; font-weight: 700; color: #111827; margin-bottom: 3px; }
            .project-desc { font-size: 9px; color: #6b7280; margin-bottom: 6px; line-height: 1.4; }
            .project-tech { display: flex; gap: 3px; flex-wrap: wrap; }
            .tech-tag { font-size: 8px; background: rgba(167, 139, 250, 0.15); color: #7c3aed; padding: 2px 5px; border-radius: 3px; }
            .activities-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
            .activity-item { font-size: 10px; }
            .activity-title { font-weight: 600; color: #111827; margin-bottom: 2px; }
            .activity-desc { color: #6b7280; font-size: 9px; }
            @media print {
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              .header { background: linear-gradient(135deg, #111827 0%, #1f2937 100%) !important; }
            }
            @page { margin: 0; size: A4; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${resumeData.name}</h1>
            <div class="title">${resumeData.title}</div>
            <div class="contact-row">
              <span>📍 ${resumeData.location}</span>
              <span>📱 ${resumeData.phone}</span>
              <span>✉️ ${resumeData.email}</span>
            </div>
            <div class="contact-row" style="margin-top: 6px;">
              <a href="${resumeData.github}">🔗 GitHub</a>
              <a href="${resumeData.linkedin}">🔗 LinkedIn</a>
              <a href="${resumeData.portfolio}">🔗 Portfolio</a>
            </div>
          </div>
          <div class="body">
            <div class="section">
              <h2 class="section-title">📋 About Me</h2>
              <p class="summary">${resumeData.summary}</p>
            </div>
            <div class="section">
              <h2 class="section-title">🎓 Education</h2>
              <div class="edu-header">
                <div>
                  <div class="edu-degree">${resumeData.education.degree}</div>
                  <div class="edu-school">${resumeData.education.school} • ${resumeData.education.location}</div>
                </div>
                <span class="edu-period">${resumeData.education.period}</span>
              </div>
              <ul class="edu-highlights">
                ${resumeData.education.highlights.map(h => `<li>${h}</li>`).join('')}
              </ul>
            </div>
            <div class="section">
              <h2 class="section-title">⚡ Technical Skills</h2>
              <div class="skills-grid">
                <div class="skill-item"><span class="skill-label">Frontend: </span><span class="skill-value">${resumeData.skills.frontend.join(", ")}</span></div>
                <div class="skill-item"><span class="skill-label">DevOps: </span><span class="skill-value">${resumeData.skills.devops.join(", ")}</span></div>
                <div class="skill-item"><span class="skill-label">Cloud: </span><span class="skill-value">${resumeData.skills.cloud.join(", ")}</span></div>
                <div class="skill-item"><span class="skill-label">Tools: </span><span class="skill-value">${resumeData.skills.tools.join(", ")}</span></div>
              </div>
            </div>
            <div class="section">
              <h2 class="section-title">🚀 Personal Projects</h2>
              <div class="projects-grid">
                ${resumeData.projects.map(p => `
                  <div class="project-card">
                    <div class="project-name">${p.name}</div>
                    <div class="project-desc">${p.description}</div>
                    <div class="project-tech">${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="section">
              <h2 class="section-title">🎯 Activities & Interests</h2>
              <div class="activities-grid">
                ${resumeData.activities.map(a => `
                  <div class="activity-item">
                    <div class="activity-title">${a.title}</div>
                    <div class="activity-desc">${a.description}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </body>
        </html>
      `)
      printWindow.document.close()
      setTimeout(() => {
        printWindow.print()
        setIsGenerating(false)
      }, 500)
    } else {
      setIsGenerating(false)
      alert('Please allow popups to download the PDF')
    }
  }

  return (
    <PageTransition>
      <main ref={containerRef} className="relative min-h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
        <Navigation />

        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <motion.div style={{ y: bgY }}>
            <div className="absolute top-[-20%] right-[-15%] w-[700px] h-[700px] bg-accent/8 rounded-full blur-3xl" />
            <div className="absolute bottom-[-30%] left-[-15%] w-[600px] h-[600px] bg-purple-500/8 rounded-full blur-3xl" />
            <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] bg-pink-500/5 rounded-full blur-3xl" />
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        {/* Hero Section */}
        <section className="relative pt-32 pb-16 px-6 z-10">
          <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
            <Scene>
              <FloatingShapes variant="about" />
            </Scene>
          </div>

          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Badge */}
              <motion.span
                className="text-accent text-sm tracking-widest uppercase"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                Resume
              </motion.span>

              {/* Title */}
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold mt-4 tracking-tighter mb-6"
                style={{ fontFamily: "Clash Display, sans-serif" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE.expo }}
              >
                Professional
                <br />
                <span className="text-outline">Resume</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: EASE.expo }}
              >
                A comprehensive overview of my skills, experience, and achievements
                crafted to showcase my professional journey.
              </motion.p>

              {/* Download Button */}
              <motion.button
                onClick={downloadPDF}
                disabled={isGenerating}
                className="inline-flex items-center gap-3 px-8 py-4 text-base font-bold text-accent-foreground bg-accent rounded-xl shadow-lg hover:scale-105 transition-transform disabled:opacity-70"
                style={{ fontFamily: "Clash Display, sans-serif" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: EASE.expo }}
                whileTap={!isGenerating ? { scale: 0.95 } : {}}
                data-cursor="pointer"
              >
                {isGenerating ? (
                  <>
                    <Printer size={20} className="animate-pulse" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download size={20} />
                    Download Resume
                  </>
                )}
              </motion.button>
            </div>
          </Container>
        </section>

        {/* Resume Content */}
        <section className="relative pb-32 px-6 z-10">
          <Container>
            <div className="max-w-5xl mx-auto">
              {/* Profile Card */}
              <AnimatedSection className="mb-12">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white p-8 md:p-10 shadow-2xl">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                  
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
                      <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-2">{resumeData.name}</h2>
                        <p className="text-xl text-accent font-semibold">{resumeData.title}</p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <a href={resumeData.github} target="_blank" rel="noopener noreferrer" 
                           className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                          <Github size={18} />
                          GitHub
                        </a>
                        <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer"
                           className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                          <Linkedin size={18} />
                          LinkedIn
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-300 text-sm">
                      <span className="inline-flex items-center gap-2">
                        <MapPin size={16} className="text-accent" />
                        {resumeData.location}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Phone size={16} className="text-accent" />
                        {resumeData.phone}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Mail size={16} className="text-accent" />
                        {resumeData.email}
                      </span>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10">
                      <p className="text-gray-300 leading-relaxed">
                        {resumeData.summary}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Two Column Layout */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Skills & Education */}
                <div className="lg:col-span-1 space-y-8">
                  {/* Skills Section */}
                  <AnimatedSection delay={0.1}>
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg">
                      <SectionHeader icon={Code2} title="Skills" />
                      
                      <div className="space-y-4">
                        {Object.entries(resumeData.skills).map(([category, skills], catIndex) => (
                          <div key={category}>
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                              {category.replace(/([A-Z])/g, ' $1').trim()}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {skills.map((skill, i) => (
                                <SkillTag key={skill} skill={skill} index={catIndex * 5 + i} />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AnimatedSection>

                  {/* Activities Section */}
                  <AnimatedSection delay={0.2}>
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg">
                      <SectionHeader icon={Target} title="Activities" />
                      
                      <div className="space-y-4">
                        {resumeData.activities.map((activity, index) => (
                          <motion.div
                            key={index}
                            className="group"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                          >
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors">
                              {activity.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {activity.description}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </AnimatedSection>
                </div>

                {/* Right Column - Education & Projects */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Education Section */}
                  <AnimatedSection delay={0.1}>
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg">
                      <SectionHeader icon={GraduationCap} title="Education" />
                      
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            {resumeData.education.degree}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Building2 size={14} />
                            <span>{resumeData.education.school}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <MapPin size={14} />
                            <span>{resumeData.education.location}</span>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-accent/10 text-accent rounded-full">
                          <Calendar size={12} />
                          {resumeData.education.period}
                        </span>
                      </div>

                      {/* Education Highlights */}
                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                          Highlights
                        </h4>
                        <ul className="space-y-2">
                          {resumeData.education.highlights.map((highlight, i) => (
                            <motion.li
                              key={i}
                              className="flex gap-3 text-sm text-gray-600 dark:text-gray-400"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                            >
                              <span className="text-accent mt-0.5 flex-shrink-0">▸</span>
                              <span>{highlight}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </AnimatedSection>

                  {/* Projects Section */}
                  <AnimatedSection delay={0.2}>
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg">
                      <SectionHeader icon={Rocket} title="Personal Projects" />
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        {resumeData.projects.map((project, index) => (
                          <ProjectCard key={index} project={project} index={index} />
                        ))}
                      </div>
                    </div>
                  </AnimatedSection>
                </div>
              </div>
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
