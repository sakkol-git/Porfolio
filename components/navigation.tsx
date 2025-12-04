"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "./theme-provider"
import { Sun, Moon, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Works", href: "/works" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
]

export function Navigation() {
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  // Prevent hydration mismatch by only rendering theme icon after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-6 md:py-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Premium Glassmorphism Container - optimized for gradient background */}
        <div className="relative mx-auto max-w-5xl rounded-xl overflow-hidden
                        bg-white/50 dark:bg-black/40
                        backdrop-blur-2xl backdrop-saturate-150
                        border border-white/60 dark:border-white/[0.08]
                        shadow-[0_8px_32px_rgba(0,0,0,0.06),0_0_0_1px_rgba(255,255,255,0.6)]
                        dark:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.06)]">
          
          {/* Premium top highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent dark:via-white/25" />
          
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent dark:from-white/[0.08] pointer-events-none" />
          
          <div className="relative flex items-center justify-between px-6 py-2.5">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              href="/"
              className="text-xl font-bold tracking-tight"
              style={{ fontFamily: "Clash Display, sans-serif" }}
              data-cursor="pointer"
            >
              SAKKOL<span className="text-accent">.</span>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.div key={item.label} whileHover={{ y: -2 }}>
                <Link
                  href={item.href}
                  className={`text-sm tracking-wide transition-colors ${
                    pathname === item.href ? "text-accent" : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-cursor="pointer"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-border hover:border-accent transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="pointer"
            >
              {mounted ? (
                <AnimatePresence mode="wait">
                  {theme === "dark" ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun size={18} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              ) : (
                <div className="w-[18px] h-[18px]" />
              )}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <motion.button onClick={toggleTheme} className="p-2" whileTap={{ scale: 0.95 }}>
              {mounted ? (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />) : <div className="w-5 h-5" />}
            </motion.button>

            <motion.button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2" whileTap={{ scale: 0.95 }}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`text-4xl font-bold tracking-tight ${pathname === item.href ? "text-accent" : ""}`}
                    style={{ fontFamily: "Clash Display, sans-serif" }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
