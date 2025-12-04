"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface TerminalLine {
  type: "normal" | "highlight" | "blank"
  content: string
}

const terminalContent: TerminalLine[] = [
  { type: "normal", content: "Hi, I'm Chen Sakkol." },
  { type: "normal", content: "Frontend Developer & DevOps Engineer." },
  { type: "blank", content: "" },
  { type: "highlight", content: "I build modern web experiences" },
  { type: "highlight", content: "and automate infrastructure—" },
  { type: "highlight", content: "bridging dev and ops seamlessly." },
  { type: "blank", content: "" },
  { type: "normal", content: "Passionate about CI/CD, containers," },
  { type: "normal", content: "cloud infrastructure, and scalable systems." },
]

export function TerminalTypewriter() {
  const [displayedLines, setDisplayedLines] = useState<{ line: TerminalLine; text: string }[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const hasStarted = useRef(false)

  // Start typing when component becomes visible
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

  // Typing effect
  useEffect(() => {
    if (!isTyping || currentLineIndex >= terminalContent.length) return

    const currentLine = terminalContent[currentLineIndex]
    
    // Blank lines - just add and move on
    if (currentLine.type === "blank") {
      setDisplayedLines((prev) => [...prev, { line: currentLine, text: "" }])
      setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1)
        setCurrentCharIndex(0)
      }, 200)
      return
    }

    const typingSpeed = 35 // Consistent typing speed
    const lineDelay = 300 // Pause between lines

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

  return (
    <motion.div
      ref={containerRef}
      className="relative h-full bg-white/60 dark:bg-[#0a0a0a]/80 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-gray-700/40 overflow-hidden shadow-lg shadow-black/5 dark:shadow-black/20"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-5 py-4 border-b border-white/30 dark:border-gray-700/30 bg-white/40 dark:bg-gray-900/40">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-3 text-sm text-muted-foreground" style={{ fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace" }}>philosophy.ts</span>
      </div>

      {/* Terminal Content */}
      <div className="p-8 md:p-10 space-y-4 text-lg md:text-xl leading-relaxed" style={{ fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace" }}>
        {displayedLines.map((item, index) => (
          <div 
            key={index} 
            className={`min-h-[1.75rem] ${
              item.line.type === "highlight" 
                ? "text-purple-500 dark:text-purple-400" 
                : "text-foreground/90"
            }`}
          >
            <span>{item.text}</span>
            {/* Blinking cursor on current line */}
            {index === displayedLines.length - 1 && currentLineIndex < terminalContent.length && item.line.type !== "blank" && (
              <motion.span
                className="inline-block w-2.5 h-6 bg-purple-500/80 dark:bg-purple-400/80 ml-0.5 align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
              />
            )}
          </div>
        ))}

        {/* Final cursor when done */}
        {currentLineIndex >= terminalContent.length && (
          <div className="min-h-[1.75rem]">
            <motion.span
              className="inline-block w-2.5 h-6 bg-purple-500/80 dark:bg-purple-400/80"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}
