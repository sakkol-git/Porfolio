"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import gsap from "gsap"

export function RankBadge() {
  const badgeRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(badgeRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView || !badgeRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(".rank-glow", {
        boxShadow: "0 0 60px rgba(255, 59, 48, 0.5), 0 0 120px rgba(255, 59, 48, 0.3)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      gsap.to(".rank-rotate", {
        rotateY: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      })
    }, badgeRef)

    return () => ctx.revert()
  }, [isInView])

  return (
    <section className="py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0"
          style={{ perspective: "1000px" }}
        >
          <div className="rank-rotate relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
            {/* Front */}
            <div
              className="rank-glow absolute inset-0 rounded-full bg-gradient-to-br from-card via-muted to-card border-2 border-accent flex items-center justify-center"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{
                    type: "spring",
                    damping: 10,
                    stiffness: 100,
                    delay: 0.2,
                  }}
                >
                  <span className="text-7xl md:text-8xl">⚡</span>
                </motion.div>
                <motion.p
                  className="text-xl md:text-2xl font-bold text-accent mt-4 tracking-widest"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 }}
                  style={{ fontFamily: "Clash Display, sans-serif" }}
                >
                  MYTHIC
                </motion.p>
                <motion.p
                  className="text-sm text-muted-foreground tracking-wider"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.7 }}
                >
                  CODER
                </motion.p>
              </div>
            </div>

            {/* Orbiting particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-accent"
                style={{
                  top: "50%",
                  left: "50%",
                  transformOrigin: `0 0`,
                }}
                animate={{
                  rotate: [0, 360],
                  x: Math.cos((i * Math.PI * 2) / 12) * 140,
                  y: Math.sin((i * Math.PI * 2) / 12) * 140,
                }}
                transition={{
                  rotate: {
                    duration: 10 + i * 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  },
                }}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="flex-1">
          <motion.span
            className="text-accent text-sm tracking-widest uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Developer Rank
          </motion.span>
          <motion.h2
            className="text-4xl md:text-6xl font-bold mt-4 mb-8"
            style={{ fontFamily: "Clash Display, sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Mythic Coder
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Years Exp", value: "5+" },
              { label: "Projects", value: "50+" },
              { label: "Technologies", value: "20+" },
              { label: "Happy Clients", value: "30+" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p
                  className="text-3xl md:text-4xl font-bold text-accent"
                  style={{ fontFamily: "Clash Display, sans-serif" }}
                >
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
