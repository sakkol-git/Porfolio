"use client"

import { useRef, useEffect, useState, useCallback, memo } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import gsap from "gsap"
import Image from "next/image"
import { ArrowRight, Sparkles, MessageCircle } from "lucide-react"

import { Scene } from "@/components/three/scene"
import { FloatingOrbs } from "@/components/three/floating-orbs"
import { Container } from "@/components/ui/container"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { AnimatedText } from "@/components/ui/animated-text"
import { StatusBadge, ExperienceBadge } from "@/components/ui/status-badge"
import { StatsGroup } from "@/components/ui/stat-counter"
import { ScrollIndicator } from "@/components/ui/scroll-indicator"

import { siteConfig } from "@/config/site"
import { animationConfig, animations } from "@/config/design-tokens"

// ============================================================================
// CONSTANTS
// ============================================================================

const ANIMATION_DELAYS = {
  imageReveal: 1.2,
  greeting: 1.6,
  firstName: 1.7,
  lastName: 2,
  title: 2.3,
  cta: 2.5,
  stats: 2.7,
  scroll: 3.2,
} as const

const SPRING_CONFIG = {
  parallax: { damping: 25, stiffness: 100 },
} as const

// ============================================================================
// PROFILE CARD COMPONENT
// ============================================================================

interface ProfileCardProps {
  isHovered: boolean
  onHoverStart: () => void
  onHoverEnd: () => void
}

const ProfileCard = memo(function ProfileCard({ 
  isHovered, 
  onHoverStart, 
  onHoverEnd 
}: ProfileCardProps) {
  return (
    <motion.div 
      className="hero-image-container relative flex-shrink-0"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      {/* Animated glow ring */}
      <div className="hero-glow absolute -inset-3 md:-inset-4">
        <motion.div 
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent via-purple-500 to-accent opacity-40 blur-xl"
          animate={{ 
            rotate: 360,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ 
            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
            scale: { duration: animationConfig.duration.fast }
          }}
        />
      </div>

      {/* Profile card */}
      <motion.div 
        className="relative group"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: animationConfig.duration.fast }}
      >
        {/* Card frame */}
        <div className="relative rounded-2xl overflow-hidden
                        bg-card border border-border/50
                        shadow-2xl shadow-black/10 dark:shadow-black/30">
          
          {/* Image container */}
          <div className="relative w-72 h-96 md:w-96 md:h-[32rem] lg:w-[28rem] lg:h-[36rem] overflow-hidden">
            <Image
              src="/profile.jpg"
              alt={`${siteConfig.author.name} - ${siteConfig.author.role}`}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              priority
              sizes="(max-width: 768px) 288px, (max-width: 1024px) 384px, 448px"
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            {/* Bottom info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <motion.div 
                className="flex items-center gap-2 text-white/90"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
              >
                <Sparkles size={14} className="text-accent" />
                <span className="text-sm font-medium">Creating since 2019</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Floating status badge */}
        <StatusBadge className="absolute -bottom-3 -right-3" />

        {/* Experience badge */}
        <ExperienceBadge 
          value={siteConfig.stats.experience} 
          className="absolute -top-2 -left-2"
        />
      </motion.div>
    </motion.div>
  )
})

// ============================================================================
// HERO CONTENT COMPONENT
// ============================================================================

const HeroContent = memo(function HeroContent() {
  const { author } = siteConfig

  return (
    <div className="flex-1 text-center lg:text-left max-w-xl">
      {/* Greeting */}
      <motion.div
        className="mb-6"
        {...animations.fadeInUp}
        transition={{ ...animations.fadeInUp.transition, delay: ANIMATION_DELAYS.greeting }}
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                       bg-accent/10 text-accent text-sm font-medium">
          <span className="w-1.5 h-1.5 bg-accent rounded-full" />
          Hello, I&apos;m
        </span>
      </motion.div>

      {/* Name */}
      <div className="overflow-hidden mb-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
          <AnimatedText 
            text={author.firstName.toUpperCase()} 
            className="text-foreground block" 
            delay={ANIMATION_DELAYS.firstName}
          />
          <AnimatedText 
            text={author.lastName.toUpperCase()} 
            className="text-accent block" 
            delay={ANIMATION_DELAYS.lastName}
          />
        </h1>
      </div>

      {/* Title */}
      <motion.div
        className="mb-6"
        {...animations.fadeInUp}
        transition={{ ...animations.fadeInUp.transition, delay: ANIMATION_DELAYS.title }}
      >
        <p className="text-lg md:text-xl text-foreground font-medium mb-2">
          {author.role}
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Crafting modern web experiences with
          <span className="text-accent font-medium"> React</span> &
          <span className="text-purple-500 dark:text-purple-400 font-medium"> Next.js</span>.
          <br />
          Automating infrastructure with
          <span className="text-cyan-500 dark:text-cyan-400 font-medium"> Docker</span>,
          <span className="text-orange-500 dark:text-orange-400 font-medium"> Kubernetes</span> &
          <span className="text-green-500 dark:text-green-400 font-medium"> CI/CD</span>.
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-10"
        {...animations.fadeInUp}
        transition={{ ...animations.fadeInUp.transition, delay: ANIMATION_DELAYS.cta }}
      >
        <MagneticButton
          href="#works"
          variant="primary"
          className="group"
        >
          <span>View My Work</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </MagneticButton>

        <MagneticButton
          href="#contact"
          variant="outline"
          className="group"
        >
          <MessageCircle size={16} />
          <span>Let&apos;s Talk</span>
        </MagneticButton>
      </motion.div>

      {/* Stats */}
      <motion.div
        {...animations.fadeIn}
        transition={{ ...animations.fadeIn.transition, delay: ANIMATION_DELAYS.stats }}
      >
        <StatsGroup
          stats={[
            { value: siteConfig.stats.projects, label: "Projects" },
            { value: siteConfig.stats.clients, label: "Clients" },
            { value: siteConfig.stats.experience, label: "Years" },
          ]}
          className="justify-center lg:justify-start"
          baseDelay={ANIMATION_DELAYS.stats}
        />
      </motion.div>
    </div>
  )
})

// ============================================================================
// BACKGROUND GRADIENTS COMPONENT
// ============================================================================

interface BackgroundGradientsProps {
  parallaxX: ReturnType<typeof useSpring>
  parallaxY: ReturnType<typeof useSpring>
}

const BackgroundGradients = memo(function BackgroundGradients({ 
  parallaxX, 
  parallaxY 
}: BackgroundGradientsProps) {
  const invertedX = useTransform(parallaxX, v => -v)
  const invertedY = useTransform(parallaxY, v => -v)

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full 
                   bg-accent/5 blur-[100px]"
        style={{ x: parallaxX, y: parallaxY }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full 
                   bg-purple-500/5 blur-[100px]"
        style={{ x: invertedX, y: invertedY }}
      />
    </div>
  )
})

// ============================================================================
// MAIN HERO SECTION
// ============================================================================

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Parallax effect for mouse movement
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const parallaxX = useSpring(mouseX, SPRING_CONFIG.parallax)
  const parallaxY = useSpring(mouseY, SPRING_CONFIG.parallax)

  // Memoized handlers
  const handleHoverStart = useCallback(() => setIsHovered(true), [])
  const handleHoverEnd = useCallback(() => setIsHovered(false), [])

  // Mouse move parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      mouseX.set((clientX - innerWidth / 2) / 50)
      mouseY.set((clientY - innerHeight / 2) / 50)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  // GSAP entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: ANIMATION_DELAYS.imageReveal })

      // Image reveal with mask effect
      tl.from(".hero-image-container", {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1,
        ease: "power4.inOut",
      })
      
      // Glow reveal
      .from(".hero-glow", {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      }, "-=0.5")

      // Floating elements animation
      gsap.to(".float-element", {
        y: -10,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
      })

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={heroRef} 
      id="hero"
      className="relative min-h-screen w-full overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-background" />

      {/* 3D Canvas with floating orbs */}
      <div className="absolute inset-0 opacity-60" aria-hidden="true">
        <Scene>
          <FloatingOrbs />
        </Scene>
      </div>

      {/* Subtle gradient overlays */}
      <BackgroundGradients parallaxX={parallaxX} parallaxY={parallaxY} />

      {/* Main Hero Content */}
      <Container 
        size="xl" 
        className="relative z-10 min-h-screen flex flex-col items-center justify-center py-20"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 w-full">
          {/* Profile Image */}
          <ProfileCard 
            isHovered={isHovered}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
          />

          {/* Content */}
          <HeroContent />
        </div>
      </Container>

      {/* Scroll Indicator */}
      <ScrollIndicator 
        targetId="about" 
        delay={ANIMATION_DELAYS.scroll}
      />
    </section>
  )
}
