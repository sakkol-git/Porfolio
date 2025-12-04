"use client"

import type React from "react"

import { Canvas } from "@react-three/fiber"
import { Suspense, useMemo } from "react"
import { Environment, Preload, AdaptiveDpr, ContactShadows, BakeShadows } from "@react-three/drei"
import { useTheme } from "../theme-provider"

interface SceneProps {
  children: React.ReactNode
  performance?: "low" | "medium" | "high"
  showShadows?: boolean
}

export function Scene({ children, performance = "medium", showShadows = false }: SceneProps) {
  const { theme } = useTheme()

  // Memoize light settings to prevent re-renders
  const lightSettings = useMemo(() => ({
    ambient: theme === "dark" ? 0.4 : 0.6,
    directional: theme === "dark" ? 1.2 : 1.5,
    pointIntensity: theme === "dark" ? 0.6 : 0.4,
    pointColor: theme === "dark" ? "#ff3b30" : "#8b5cf6",
    fillColor: theme === "dark" ? "#06b6d4" : "#ec4899",
  }), [theme])

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        {/* Adaptive DPR based on performance */}
        <AdaptiveDpr pixelated />
        
        {/* Ambient lighting */}
        <ambientLight intensity={lightSettings.ambient} />
        
        {/* Main directional light */}
        <directionalLight 
          position={[5, 8, 5]} 
          intensity={lightSettings.directional}
          color="#ffffff"
        />
        
        {/* Secondary fill light */}
        <directionalLight 
          position={[-5, 2, -3]} 
          intensity={0.4}
          color={lightSettings.fillColor}
        />
        
        {/* Accent point lights for color */}
        <pointLight 
          position={[-3, 2, 2]} 
          intensity={lightSettings.pointIntensity}
          color={lightSettings.pointColor}
          distance={8}
        />
        <pointLight 
          position={[3, -2, 2]} 
          intensity={lightSettings.pointIntensity * 0.7}
          color={lightSettings.fillColor}
          distance={6}
        />
        
        {/* Environment for reflections */}
        <Environment preset="city" />
        
        {/* Optional contact shadows */}
        {showShadows && (
          <ContactShadows
            position={[0, -2.5, 0]}
            opacity={0.3}
            scale={10}
            blur={2}
            far={4}
          />
        )}
        
        {children}
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
