"use client"

import type React from "react"
import { memo } from "react"
import { motion } from "framer-motion"

import { Container } from "@/components/ui/container"
import { MagneticCircleButton } from "@/components/ui/magnetic-button"

import { siteConfig } from "@/config/site"
import { animationConfig, animations } from "@/config/design-tokens"

// ============================================================================
// CONSTANTS
// ============================================================================

const currentYear = new Date().getFullYear()

// ============================================================================
// SOCIAL LINKS COMPONENT
// ============================================================================

const SocialLinks = memo(function SocialLinks() {
  const links = [
    { label: "GitHub", href: siteConfig.links.github },
    { label: "LinkedIn", href: siteConfig.links.linkedin },
    { label: "Twitter", href: siteConfig.links.twitter },
  ]

  return (
    <div className="flex items-center gap-8">
      {links.map((link, i) => (
        <motion.a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-accent transition-colors"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: animationConfig.duration.fast, 
            delay: i * 0.05 
          }}
          data-cursor="pointer"
          aria-label={`Visit ${link.label} profile`}
        >
          {link.label}
        </motion.a>
      ))}
    </div>
  )
})

// ============================================================================
// FOOTER BOTTOM COMPONENT
// ============================================================================

const FooterBottom = memo(function FooterBottom() {
  return (
    <div className="pt-16 border-t border-border">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <motion.p
          className="text-sm text-muted-foreground"
          {...animations.fadeIn}
        >
          © {currentYear} {siteConfig.author.name}. All rights reserved.
        </motion.p>

        <SocialLinks />

        <motion.p
          className="text-sm text-muted-foreground"
          {...animations.fadeIn}
        >
          Made with React + Three.js
        </motion.p>
      </div>
    </div>
  )
})

// ============================================================================
// CTA SECTION COMPONENT
// ============================================================================

const CTASection = memo(function CTASection() {
  return (
    <motion.div
      {...animations.fadeInUp}
      transition={{ ...animations.fadeInUp.transition, duration: animationConfig.duration.normal }}
      className="text-center"
    >
      <span className="text-accent text-sm tracking-widest uppercase">
        Let&apos;s Connect
      </span>
      <h2
        className="text-5xl md:text-7xl lg:text-9xl font-bold mt-8 mb-12 tracking-tighter text-foreground"
        style={{ fontFamily: "Clash Display, sans-serif" }}
      >
        Got a project?
      </h2>

      {/* Magnetic Button */}
      <MagneticCircleButton
        href={`mailto:${siteConfig.author.email}`}
        size="lg"
        aria-label="Send email to Chen Sakkol"
      >
        <span className="text-xl md:text-2xl font-bold tracking-wider">
          Email Me
        </span>
      </MagneticCircleButton>
    </motion.div>
  )
})

// ============================================================================
// MAIN FOOTER SECTION
// ============================================================================

export function FooterSection() {
  return (
    <footer
      id="contact"
      className="min-h-screen flex flex-col justify-between py-16 bg-transparent"
      aria-label="Contact section"
    >
      <Container className="flex-1 flex flex-col justify-center">
        <CTASection />
      </Container>

      <Container>
        <FooterBottom />
      </Container>
    </footer>
  )
}
