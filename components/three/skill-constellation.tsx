"use client"

import { useRef, useState, useMemo, useCallback, memo } from "react"
import { useFrame, useThree, ThreeEvent, invalidate } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import * as THREE from "three"
import { useTheme } from "../theme-provider"

interface Skill {
  id: string
  name: string
  category: "frontend" | "3d" | "tools" | "design"
  level: number
  description: string
  position: [number, number, number]
}

const skills: Skill[] = [
  { id: "react", name: "React", category: "frontend", level: 5, description: "Expert in hooks, context, SSR, and performance optimization", position: [-1.8, 1.2, 0] },
  { id: "nextjs", name: "Next.js", category: "frontend", level: 5, description: "App Router, Server Components, API routes, ISR", position: [-2.2, 0, 0.5] },
  { id: "typescript", name: "TypeScript", category: "frontend", level: 5, description: "Strong typing, generics, advanced patterns", position: [-1.5, -1, 0] },
  { id: "tailwind", name: "Tailwind", category: "frontend", level: 4, description: "Utility-first CSS, custom configurations", position: [-0.5, 1.8, -0.3] },
  { id: "threejs", name: "Three.js", category: "3d", level: 4, description: "WebGL, shaders, 3D scenes, R3F ecosystem", position: [1.8, 1.0, 0.3] },
  { id: "webgl", name: "WebGL", category: "3d", level: 3, description: "Custom shaders, GPU programming", position: [2.2, -0.5, 0] },
  { id: "gsap", name: "GSAP", category: "3d", level: 5, description: "Timeline animations, ScrollTrigger, morphing", position: [1.2, -1.5, 0.2] },
  { id: "framer", name: "Framer Motion", category: "3d", level: 4, description: "React animations, gestures, layout animations", position: [0.5, -1.8, -0.2] },
  { id: "git", name: "Git", category: "tools", level: 4, description: "Version control, branching strategies, CI/CD", position: [0, 0.8, 1.2] },
  { id: "figma", name: "Figma", category: "design", level: 4, description: "UI/UX design, prototyping, dev handoff", position: [0, -0.5, 1.5] },
]

const connections: [string, string][] = [
  ["react", "nextjs"], ["react", "typescript"], ["react", "tailwind"],
  ["nextjs", "typescript"], ["threejs", "webgl"], ["threejs", "gsap"],
  ["gsap", "framer"], ["react", "framer"], ["typescript", "git"], ["figma", "tailwind"],
]

// Shared geometry for all nodes
const nodeGeometry = new THREE.IcosahedronGeometry(1, 0)
const hitboxGeometry = new THREE.SphereGeometry(1, 8, 8)

// Category colors
const categoryColors = {
  frontend: { dark: "#60a5fa", light: "#2563eb" },
  "3d": { dark: "#f472b6", light: "#db2777" },
  tools: { dark: "#4ade80", light: "#16a34a" },
  design: { dark: "#fbbf24", light: "#d97706" },
}

// Pre-compute line positions (module level)
const linePositions = connections.map(([from, to]) => {
  const fromSkill = skills.find(s => s.id === from)
  const toSkill = skills.find(s => s.id === to)
  if (!fromSkill || !toSkill) return null
  return {
    points: new Float32Array([...fromSkill.position, ...toSkill.position]),
    from,
    to,
  }
}).filter(Boolean) as { points: Float32Array; from: string; to: string }[]

interface SkillNodeProps {
  skill: Skill
  isSelected: boolean
  onSelect: (skill: Skill | null) => void
  isDark: boolean
}

const SkillNode = memo(function SkillNode({ skill, isSelected, onSelect, isDark }: SkillNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  const color = isDark ? categoryColors[skill.category].dark : categoryColors[skill.category].light
  const baseScale = 0.12 + skill.level * 0.025
  const targetScale = isSelected ? baseScale * 1.6 : hovered ? baseScale * 1.2 : baseScale

  useFrame((state) => {
    if (!meshRef.current) return
    
    const time = state.clock.elapsedTime
    const offset = skill.id.charCodeAt(0) * 0.1
    
    // Simple floating
    meshRef.current.position.y = skill.position[1] + Math.sin(time * 0.4 + offset) * 0.03
    
    // Smooth scale interpolation
    const currentScale = meshRef.current.scale.x
    const newScale = currentScale + (targetScale - currentScale) * 0.1
    meshRef.current.scale.setScalar(newScale)
    
    // Slow rotation
    meshRef.current.rotation.y += 0.003
    
    invalidate()
  })

  const handleClick = useCallback((e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    onSelect(isSelected ? null : skill)
  }, [isSelected, skill, onSelect])

  return (
    <group position={skill.position}>
      {/* Node mesh */}
      <mesh ref={meshRef} scale={baseScale} geometry={nodeGeometry}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isSelected ? 1 : 0.8}
        />
      </mesh>

      {/* Click hitbox */}
      <mesh
        scale={0.35}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        geometry={hitboxGeometry}
      >
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* HTML label - only render when not too many nodes visible */}
      {(isSelected || hovered) && (
        <Html
          position={[0, 0.4, 0]}
          center
          style={{ pointerEvents: "none" }}
        >
          <div className="bg-background/90 backdrop-blur-sm border border-border rounded px-2 py-1 whitespace-nowrap">
            <span className="text-xs font-medium text-foreground">{skill.name}</span>
          </div>
        </Html>
      )}

      {/* Detail panel when selected */}
      {isSelected && (
        <Html
          position={[0, -0.5, 0]}
          center
          style={{ pointerEvents: "none" }}
        >
          <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 w-44 shadow-lg">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <span className="font-semibold text-sm text-foreground">{skill.name}</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{skill.description}</p>
            <div className="mt-2 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-1 rounded-full"
                  style={{ backgroundColor: i < skill.level ? color : isDark ? "#333" : "#ddd" }}
                />
              ))}
            </div>
          </div>
        </Html>
      )}
    </group>
  )
})

function ConstellationLines({ selectedSkill, isDark }: { selectedSkill: Skill | null; isDark: boolean }) {
  const lineColor = isDark ? "#ffffff" : "#1a1a1a"

  return (
    <group>
      {linePositions.map((line, index) => {
        const isConnected = selectedSkill && (line.from === selectedSkill.id || line.to === selectedSkill.id)
        const opacity = selectedSkill ? (isConnected ? 0.5 : 0.05) : 0.12

        return (
          <line key={index}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[line.points, 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color={lineColor} transparent opacity={opacity} />
          </line>
        )
      })}
    </group>
  )
}

export function SkillConstellation() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const groupRef = useRef<THREE.Group>(null)
  const { theme } = useTheme()
  const { pointer } = useThree()
  const isDark = theme === "dark"

  useFrame(() => {
    if (!groupRef.current) return
    // Gentle mouse follow
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.15, 0.02)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -pointer.y * 0.08, 0.02)
    invalidate()
  })

  const handleBackgroundClick = useCallback(() => setSelectedSkill(null), [])

  // Memoize particles
  const particlePositions = useMemo(() => {
    return new Float32Array(Array.from({ length: 50 * 3 }, () => (Math.random() - 0.5) * 6))
  }, [])

  return (
    <group ref={groupRef}>
      {/* Background click catcher */}
      <mesh onClick={handleBackgroundClick} position={[0, 0, -2]}>
        <planeGeometry args={[15, 15]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <ConstellationLines selectedSkill={selectedSkill} isDark={isDark} />
      
      {skills.map((skill) => (
        <SkillNode
          key={skill.id}
          skill={skill}
          isSelected={selectedSkill?.id === skill.id}
          onSelect={setSelectedSkill}
          isDark={isDark}
        />
      ))}

      {/* Simplified particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.015} color={isDark ? "#666" : "#999"} transparent opacity={0.3} sizeAttenuation />
      </points>
    </group>
  )
}
