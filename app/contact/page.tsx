"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { PageTransition } from "@/components/page-transition"
import { Scene } from "@/components/three/scene"
import { FloatingShapes } from "@/components/three/floating-shapes"
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter, Dribbble, ArrowUpRight } from "lucide-react"

const socialLinks = [
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
  { label: "Dribbble", href: "https://dribbble.com", icon: Dribbble },
]

const contactInfo = [
  { label: "Email", value: "chensakkol1124@gmail.com", icon: Mail, href: "mailto:chensakkol1124@gmail.com" },
  { label: "Location", value: "Phnom Penh, Cambodia", icon: MapPin, href: "#" },
  { label: "Phone", value: "+855 96 474 7120", icon: Phone, href: "tel:+855964747120" },
]

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const buttonRef = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springConfig = { damping: 15, stiffness: 150 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

    if (distance < 150) {
      x.set(distanceX * 0.3)
      y.set(distanceY * 0.3)
    } else {
      x.set(0)
      y.set(0)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <PageTransition>
      <main className="relative min-h-screen bg-transparent">
        <Navigation />

        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center pt-32 px-6 md:px-12 overflow-hidden bg-transparent">
          <div className="absolute inset-0 opacity-25">
            <Scene>
              <FloatingShapes variant="contact" />
            </Scene>
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10">
            <motion.span
              className="text-accent text-sm tracking-widest uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              Get In Touch
            </motion.span>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mt-4 tracking-tighter"
              style={{ fontFamily: "Clash Display, sans-serif" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              Let&apos;s Build
              <br />
              <span className="text-outline">& Automate Together</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              Ready to discuss web development or DevOps solutions? Let&apos;s collaborate on your next project.
            </motion.p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-24 px-6 md:px-12" onMouseMove={handleMouseMove}>
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form - Terminal Style */}
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.25 }}>
                <motion.div
                  className="bg-white/60 dark:bg-[#0d0d0d]/80 backdrop-blur-xl rounded-xl border border-white/50 dark:border-gray-700/40 overflow-hidden shadow-lg shadow-black/5 dark:shadow-black/20"
                >
                  {/* Terminal header */}
                  <div className="flex items-center gap-2 px-5 py-4 border-b border-white/30 dark:border-gray-700/30 bg-white/40 dark:bg-gray-900/50">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                      <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                    </div>
                    <span className="ml-3 text-sm text-gray-500 dark:text-gray-400" style={{ fontFamily: "'Consolas', monospace" }}>
                      send_message.sh
                    </span>
                  </div>

                  <div className="p-6 md:p-8">
                    {isSubmitted ? (
                      <motion.div
                        className="p-8 text-center"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-accent/20 flex items-center justify-center">
                          <Send className="text-accent" size={24} />
                        </div>
                        <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "Clash Display, sans-serif" }}>
                          Message Sent!
                        </h3>
                        <p className="text-muted-foreground" style={{ fontFamily: "'Consolas', monospace" }}>
                          <span className="text-green-500">✓</span> Thank you for reaching out. I&apos;ll get back to you soon.
                        </p>
                        <button onClick={() => setIsSubmitted(false)} className="mt-6 text-accent hover:underline" style={{ fontFamily: "'Consolas', monospace" }}>
                          $ send --another
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm text-muted-foreground mb-2" style={{ fontFamily: "'Consolas', monospace" }}>name:</label>
                            <input
                              type="text"
                              value={formState.name}
                              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                              required
                              className="w-full px-4 py-3 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-accent focus:outline-none transition-colors"
                              placeholder="John Doe"
                              style={{ fontFamily: "'Consolas', monospace" }}
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-muted-foreground mb-2" style={{ fontFamily: "'Consolas', monospace" }}>email:</label>
                            <input
                              type="email"
                              value={formState.email}
                              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                              required
                              className="w-full px-4 py-3 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-accent focus:outline-none transition-colors"
                              placeholder="john@example.com"
                              style={{ fontFamily: "'Consolas', monospace" }}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-muted-foreground mb-2" style={{ fontFamily: "'Consolas', monospace" }}>subject:</label>
                          <input
                            type="text"
                            value={formState.subject}
                            onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                            required
                            className="w-full px-4 py-3 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-accent focus:outline-none transition-colors"
                            placeholder="Project inquiry"
                            style={{ fontFamily: "'Consolas', monospace" }}
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-muted-foreground mb-2" style={{ fontFamily: "'Consolas', monospace" }}>message:</label>
                          <textarea
                            value={formState.message}
                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                            required
                            rows={6}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-accent focus:outline-none transition-colors resize-none"
                            placeholder="Tell me about your project..."
                            style={{ fontFamily: "'Consolas', monospace" }}
                          />
                        </div>

                        <motion.button
                          ref={buttonRef}
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full md:w-auto px-8 py-4 bg-accent text-accent-foreground rounded-xl font-bold text-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg"
                          style={{
                            x: xSpring,
                            y: ySpring,
                            fontFamily: "Clash Display, sans-serif",
                          }}
                          whileTap={{ scale: 0.95 }}
                          data-cursor="pointer"
                        >
                          {isSubmitting ? (
                            <motion.div
                              className="w-6 h-6 border-2 border-accent-foreground border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            />
                          ) : (
                            <>
                              Send Message
                              <Send size={20} />
                            </>
                          )}
                        </motion.button>
                      </form>
                    )}
                  </div>
                </motion.div>
              </motion.div>

              {/* Contact Info - Terminal Style */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="space-y-8"
              >
                {/* Direct Contact - Terminal Card */}
                <div className="bg-white/60 dark:bg-[#0d0d0d]/80 backdrop-blur-xl rounded-xl border border-white/50 dark:border-gray-700/40 overflow-hidden shadow-lg shadow-black/5 dark:shadow-black/20">
                  <div className="flex items-center gap-2 px-5 py-3 border-b border-white/30 dark:border-gray-700/30 bg-white/40 dark:bg-gray-900/50">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                    </div>
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400" style={{ fontFamily: "'Consolas', monospace" }}>
                      contact_info.json
                    </span>
                  </div>
                  
                  <div className="p-5 space-y-3">
                    {contactInfo.map((item) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all group"
                        whileHover={{ x: 5 }}
                        data-cursor="pointer"
                      >
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                          <item.icon size={18} />
                        </div>
                        <div style={{ fontFamily: "'Consolas', monospace" }}>
                          <p className="text-xs text-muted-foreground">{`"${item.label}":`}</p>
                          <p className="text-sm text-green-600 dark:text-green-400">"{item.value}"</p>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Social Links - Terminal Card */}
                <div className="bg-white/60 dark:bg-[#0d0d0d]/80 backdrop-blur-xl rounded-xl border border-white/50 dark:border-gray-700/40 overflow-hidden shadow-lg shadow-black/5 dark:shadow-black/20">
                  <div className="flex items-center gap-2 px-5 py-3 border-b border-white/30 dark:border-gray-700/30 bg-white/40 dark:bg-gray-900/50">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                    </div>
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400" style={{ fontFamily: "'Consolas', monospace" }}>
                      socials.links
                    </span>
                  </div>
                  
                  <div className="p-4 grid grid-cols-2 gap-3">
                    {socialLinks.map((link, i) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50/50 dark:bg-gray-800/30 border border-gray-200/50 dark:border-gray-700/50 hover:border-accent/50 transition-all group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.35 + i * 0.05 }}
                        whileHover={{ y: -3 }}
                        data-cursor="pointer"
                      >
                        <div className="flex items-center gap-2">
                          <link.icon size={18} className="text-accent" />
                          <span className="text-sm font-medium">{link.label}</span>
                        </div>
                        <ArrowUpRight
                          size={14}
                          className="text-muted-foreground group-hover:text-accent transition-colors"
                        />
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Availability - Terminal Card */}
                <div className="bg-white/60 dark:bg-[#0d0d0d]/80 backdrop-blur-xl rounded-xl border border-accent/30 overflow-hidden shadow-lg shadow-black/5 dark:shadow-black/20">
                  <div className="flex items-center gap-2 px-5 py-3 border-b border-accent/20 bg-accent/5">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                    </div>
                    <span className="ml-2 text-xs text-accent" style={{ fontFamily: "'Consolas', monospace" }}>
                      status: available
                    </span>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-sm font-medium text-accent">Currently Available</span>
                    </div>
                    <p className="text-sm text-muted-foreground" style={{ fontFamily: "'Consolas', monospace" }}>
                      <span className="text-gray-400">// </span>Open for freelance projects and full-time opportunities
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Large CTA - Terminal Style */}
        <section className="py-32 px-6 md:px-12 bg-transparent">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-white/60 dark:bg-[#0d0d0d]/80 backdrop-blur-xl rounded-xl border border-white/50 dark:border-gray-700/40 overflow-hidden shadow-lg shadow-black/5 dark:shadow-black/20 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-200/50 dark:border-gray-700/30 bg-gray-100/50 dark:bg-gray-900/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="ml-3 text-sm text-gray-500 dark:text-gray-400" style={{ fontFamily: "'Consolas', monospace" }}>
                  lets_connect.sh
                </span>
              </div>

              <div className="p-12 md:p-16">
                <motion.h2
                  className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter"
                  style={{ fontFamily: "Clash Display, sans-serif" }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  Got a <span className="text-accent">wild idea</span>?
                </motion.h2>
                <motion.p
                  className="mt-6 text-xl text-muted-foreground"
                  style={{ fontFamily: "'Consolas', monospace" }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-green-500">$</span> collaborate --with-me
                </motion.p>

                <motion.a
                  href="mailto:chensakkol1124@gmail.com"
                  className="inline-flex items-center justify-center w-36 h-36 md:w-48 md:h-48 mt-12 rounded-xl border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors duration-300 shadow-lg"
                  style={{ fontFamily: "Clash Display, sans-serif" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-cursor="pointer"
                >
                  <span className="text-lg md:text-2xl font-bold tracking-wider">Email Me</span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 md:px-12 border-t border-gray-200/50 dark:border-gray-800/50">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© 2025 Chen Sakkol. All rights reserved.</p>
            <div className="flex items-center gap-8">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  data-cursor="pointer"
                >
                  <link.icon size={20} />
                </a>
              ))}
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
