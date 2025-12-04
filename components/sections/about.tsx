"use client"

import { useRef, useEffect, memo } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { TerminalTypewriter } from "@/components/terminal-typewriter"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { SectionHeader } from "@/components/ui/section-header"
import { GlassCard } from "@/components/ui/glass-card"

import { skillCategories, type SkillCategory } from "@/config/skills"
import { animationConfig, animations } from "@/config/design-tokens"

gsap.registerPlugin(ScrollTrigger)

// ============================================================================
// CONSTANTS
// ============================================================================

const ANIMATION_DELAYS = {
  terminal: 0.1,
  skills: 0.2,
  skillCards: 0.25,
  skillItems: 0.4,
} as const

// ============================================================================
// SKILL CARD COMPONENT
// ============================================================================

interface SkillCardProps {
  skill: SkillCategory
  index: number
}

const SkillCard = memo(function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <motion.div
      className="group relative overflow-hidden bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl border border-white/60 dark:border-gray-700/50 p-5 shadow-lg shadow-black/5 dark:shadow-black/30 hover:shadow-2xl transition-all duration-500"
      initial={{ opacity: 0, y: 30, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: animationConfig.duration.normal, 
        delay: ANIMATION_DELAYS.skillCards + index * 0.08 
      }}
      whileHover={{ y: -6, scale: 1.02 }}
    >
      {/* Animated gradient border on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{ backgroundColor: `${skill.color}10` }}
      />
      
      {/* Glow effect */}
      <div 
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
        style={{ backgroundColor: skill.color }}
      />
      
      <div className="relative z-10">
        {/* Category header with icon */}
        <div className="flex items-center gap-3 mb-4">
          <motion.div 
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${skill.color}15` }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <div 
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: skill.color }}
            />
          </motion.div>
          <div>
            <span 
              className="text-base font-bold"
              style={{ color: skill.color }}
            >
              {skill.category}
            </span>
            <div className="text-[10px] text-muted-foreground">
              {skill.items.length} skills
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          {skill.items.map((item, idx) => (
            <motion.div
              key={item}
              className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gray-100/60 dark:bg-gray-800/60 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-300 cursor-default group/item"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: ANIMATION_DELAYS.skillItems + index * 0.08 + idx * 0.05 
              }}
              whileHover={{ x: 6, scale: 1.02 }}
            >
              <span 
                className="text-xs font-mono opacity-60 group-hover/item:opacity-100 transition-opacity"
                style={{ color: skill.color }}
              >
                0{idx + 1}
              </span>
              <span className="text-foreground/90 text-sm font-medium">
                {item}
              </span>
              <motion.div 
                className="ml-auto w-1.5 h-1.5 rounded-full opacity-0 group-hover/item:opacity-100"
                style={{ backgroundColor: skill.color }}
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
})

// ============================================================================
// SKILLS SECTION COMPONENT
// ============================================================================

const SkillsSection = memo(function SkillsSection() {
  return (
    <motion.div 
      className="about-skills lg:col-span-6"
      {...animations.fadeInRight}
      transition={{ 
        ...animations.fadeInRight.transition, 
        delay: ANIMATION_DELAYS.skills 
      }}
    >
      {/* Skills Header */}
      <div className="mb-8 relative">
        <motion.div
          className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-accent via-pink-500 to-purple-500 rounded-full"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
        <span className="text-accent text-xs tracking-[0.3em] uppercase font-medium inline-flex items-center gap-2">
          <span className="w-8 h-px bg-accent" />
          Skills & Tools
        </span>
        <h3 
          className="text-3xl md:text-4xl font-bold mt-3 bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text"
          style={{ fontFamily: "Clash Display, sans-serif" }}
        >
          My Expertise
        </h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {skillCategories.map((skill, i) => (
          <SkillCard key={skill.category} skill={skill} index={i} />
        ))}
      </div>
    </motion.div>
  )
})

// ============================================================================
// MAIN ABOUT SECTION
// ============================================================================

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax scroll for terminal
      gsap.to(".about-terminal", {
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })

      // Parallax scroll for skills (opposite direction)
      gsap.to(".about-skills", {
        y: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <Section 
      id="about" 
      ref={sectionRef}
      size="lg"
      aria-label="About section"
    >
      {/* Section Header */}
      <Container className="mb-16">
        <SectionHeader
          label="About Me"
          title="My Philosophy"
          description="Building scalable web apps and automating infrastructure. DevOps is not just deployment—it's a culture of continuous improvement."
          align="center"
        />
      </Container>

      {/* Asymmetric Split Layout */}
      <Container>
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column - Terminal */}
          <motion.div 
            className="about-terminal lg:col-span-6 min-h-[420px]"
            {...animations.fadeInLeft}
            transition={{ 
              ...animations.fadeInLeft.transition, 
              delay: ANIMATION_DELAYS.terminal 
            }}
          >
            <TerminalTypewriter />
          </motion.div>

          {/* Right Column - Skills */}
          <SkillsSection />
        </div>
      </Container>
    </Section>
  )
}
