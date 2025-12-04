"use client"

import { useState, useEffect } from "react"
import { Preloader } from "@/components/preloader"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/sections/hero"
import { AboutSection } from "@/components/sections/about"
import { RankBadge } from "@/components/sections/rank-badge"
import { WorksSection } from "@/components/sections/works"
import { FooterSection } from "@/components/sections/footer"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for mobile/touch devices
    const checkMobile = () => {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768
    }
    checkMobile()
  }, [])

  return (
    <>
      <Preloader onComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <main className="relative bg-transparent">
          <Navigation />
          <HeroSection />
          <AboutSection />
          <RankBadge />
          <WorksSection />
          <FooterSection />
        </main>
      )}
    </>
  )
}
