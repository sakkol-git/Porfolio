"use client"

import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sphere, Torus, Icosahedron, Octahedron, RoundedBox } from "@react-three/drei"
import * as THREE from "three"
import { useTheme } from "../theme-provider"

interface OrbProps {
  position: [number, number, number]
  scale?: number
  shape?: "sphere" | "icosahedron" | "octahedron" | "torus" | "crystal" | "ring"
  material?: "glass" | "metallic" | "holographic" | "gradient"
  color: string
  secondaryColor?: string
  floatSpeed?: number
  floatIntensity?: number
  rotationIntensity?: number
}

// Glass-like orb with distortion
function GlassOrb({ position, scale = 0.5, color }: { position: [number, number, number]; scale: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.1
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={scale} position={position}>
        <MeshDistortMaterial
          color={color}
          roughness={0}
          metalness={0.1}
          distort={0.4}
          speed={2}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </Float>
  )
}

// Metallic geometric shape
function MetallicShape({ position, scale = 0.5, color, shape }: { 
  position: [number, number, number]; 
  scale: number; 
  color: string;
  shape: "icosahedron" | "octahedron"
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
  })

  const ShapeComponent = shape === "icosahedron" ? Icosahedron : Octahedron

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.5}>
      <ShapeComponent ref={meshRef} args={[1, 1]} scale={scale} position={position}>
        <meshStandardMaterial
          color={color}
          metalness={1}
          roughness={0.15}
          envMapIntensity={2}
        />
      </ShapeComponent>
    </Float>
  )
}

// Holographic ring
function HolographicRing({ position, scale = 0.5, color }: { 
  position: [number, number, number]; 
  scale: number; 
  color: string 
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.4
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
  })

  return (
    <Float speed={1.8} rotationIntensity={1} floatIntensity={0.6}>
      <Torus ref={meshRef} args={[1, 0.3, 32, 64]} scale={scale} position={position}>
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </Torus>
    </Float>
  )
}

// Crystal shard
function CrystalShard({ position, scale = 0.5, color }: { 
  position: [number, number, number]; 
  scale: number; 
  color: string 
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.25
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.3
  })

  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.7}>
      <mesh ref={meshRef} scale={scale} position={position}>
        <coneGeometry args={[0.5, 1.5, 6]} />
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  )
}

// Wobble sphere with gradient effect
function WobbleSphere({ position, scale = 0.5, color }: { 
  position: [number, number, number]; 
  scale: number; 
  color: string 
}) {
  return (
    <Float speed={2.5} rotationIntensity={0.3} floatIntensity={1}>
      <Sphere args={[1, 32, 32]} scale={scale} position={position}>
        <MeshWobbleMaterial
          color={color}
          factor={0.4}
          speed={2}
          metalness={0.8}
          roughness={0.2}
        />
      </Sphere>
    </Float>
  )
}

// Small particle orbiting
function OrbitingParticle({ 
  parentPosition, 
  radius, 
  speed, 
  size, 
  color, 
  offset = 0 
}: { 
  parentPosition: [number, number, number];
  radius: number;
  speed: number;
  size: number;
  color: string;
  offset?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime * speed + offset
    meshRef.current.position.x = parentPosition[0] + Math.cos(t) * radius
    meshRef.current.position.y = parentPosition[1] + Math.sin(t * 0.8) * radius * 0.5
    meshRef.current.position.z = parentPosition[2] + Math.sin(t) * radius * 0.3
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  )
}

export function FloatingOrbs() {
  const { theme } = useTheme()
  const groupRef = useRef<THREE.Group>(null)
  const { pointer } = useThree()
  
  // Theme-aware colors
  const colors = useMemo(() => ({
    primary: theme === "dark" ? "#ff3b30" : "#8b5cf6",
    secondary: theme === "dark" ? "#06b6d4" : "#ec4899",
    tertiary: theme === "dark" ? "#a855f7" : "#f97316",
    accent: theme === "dark" ? "#ff6b5b" : "#6366f1",
  }), [theme])

  // Subtle mouse follow for the entire group
  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.15,
      0.02
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pointer.y * 0.1,
      0.02
    )
  })

  return (
    <group ref={groupRef}>
      {/* Main glass orb - far top left */}
      <GlassOrb 
        position={[-3.5, 2, -0.5]} 
        scale={0.7} 
        color={colors.primary} 
      />
      
      {/* Metallic icosahedron - far top right */}
      <MetallicShape 
        position={[3.8, 1.8, -1]} 
        scale={0.65} 
        color={colors.secondary}
        shape="icosahedron"
      />
      
      {/* Holographic ring - far bottom left */}
      <HolographicRing 
        position={[-3.2, -1.8, 0.2]} 
        scale={0.55} 
        color={colors.tertiary} 
      />
      
      {/* Wobble sphere - far bottom right */}
      <WobbleSphere 
        position={[3.5, -2, -0.3]} 
        scale={0.6} 
        color={colors.accent} 
      />
      
      {/* Crystal shard - top center back */}
      <CrystalShard 
        position={[0, 2.8, -2.5]} 
        scale={0.5} 
        color={colors.primary} 
      />
      
      {/* Small metallic octahedron - left side */}
      <MetallicShape 
        position={[-4, 0, 0.5]} 
        scale={0.35} 
        color={colors.secondary}
        shape="octahedron"
      />
      
      {/* Additional shapes for balance */}
      <CrystalShard 
        position={[4, 0.5, -1]} 
        scale={0.35} 
        color={colors.tertiary} 
      />
      
      <WobbleSphere 
        position={[-2, 2.5, -1.5]} 
        scale={0.35} 
        color={colors.secondary} 
      />

      {/* Orbiting particles around main orb */}
      <OrbitingParticle 
        parentPosition={[-3.5, 2, -0.5]} 
        radius={1.2} 
        speed={1.5} 
        size={0.07} 
        color={colors.accent}
        offset={0}
      />
      <OrbitingParticle 
        parentPosition={[-3.5, 2, -0.5]} 
        radius={0.9} 
        speed={2} 
        size={0.05} 
        color={colors.secondary}
        offset={Math.PI}
      />
      
      {/* Orbiting particles around metallic shape */}
      <OrbitingParticle 
        parentPosition={[3.8, 1.8, -1]} 
        radius={1} 
        speed={1.8} 
        size={0.06} 
        color={colors.primary}
        offset={Math.PI / 2}
      />
      
      {/* Orbiting particles around bottom shapes */}
      <OrbitingParticle 
        parentPosition={[3.5, -2, -0.3]} 
        radius={0.8} 
        speed={2.2} 
        size={0.04} 
        color={colors.tertiary}
        offset={Math.PI / 4}
      />
    </group>
  )
}
