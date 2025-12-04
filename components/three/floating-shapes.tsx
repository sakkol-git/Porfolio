"use client"

import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Float, MeshTransmissionMaterial, MeshDistortMaterial, Sphere, Torus, Icosahedron, Dodecahedron } from "@react-three/drei"
import * as THREE from "three"
import { useTheme } from "../theme-provider"

interface FloatingShapesProps {
  variant?: "about" | "works" | "contact"
}

// Glowing particle ring
function ParticleRing({ count = 50, radius = 2, color }: { count?: number; radius?: number; color: string }) {
  const pointsRef = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const r = radius + (Math.random() - 0.5) * 0.3
      positions[i * 3] = Math.cos(angle) * r
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5
      positions[i * 3 + 2] = Math.sin(angle) * r
    }
    
    return { positions }
  }, [count, radius])

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={color}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

export function FloatingShapes({ variant = "about" }: FloatingShapesProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { pointer } = useThree()
  const { theme } = useTheme()

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.15, 0.02)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, pointer.y * 0.08, 0.02)
  })

  const isDark = theme === "dark"
  
  const colors = useMemo(() => ({
    primary: isDark ? "#ff3b30" : "#8b5cf6",
    secondary: isDark ? "#06b6d4" : "#ec4899",
    tertiary: isDark ? "#a855f7" : "#f97316",
  }), [isDark])

  if (variant === "about") {
    return (
      <group ref={groupRef}>
        {/* Main glass icosahedron */}
        <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
          <Icosahedron args={[0.9, 1]} position={[-1.8, 0.5, 0]}>
            <MeshTransmissionMaterial
              backside
              samples={8}
              resolution={256}
              transmission={0.95}
              roughness={0.05}
              thickness={0.5}
              ior={1.5}
              chromaticAberration={isDark ? 0.3 : 0.15}
              color={colors.primary}
            />
          </Icosahedron>
        </Float>
        
        {/* Distorted sphere */}
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
          <Sphere args={[0.7, 64, 64]} position={[1.8, -0.3, -0.5]}>
            <MeshDistortMaterial
              color={colors.secondary}
              roughness={0.1}
              metalness={0.8}
              distort={0.3}
              speed={3}
            />
          </Sphere>
        </Float>
        
        {/* Small accent shapes */}
        <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.4}>
          <mesh position={[0.5, 1.5, -1]}>
            <octahedronGeometry args={[0.35, 0]} />
            <meshStandardMaterial
              color={colors.tertiary}
              metalness={0.9}
              roughness={0.1}
              emissive={colors.tertiary}
              emissiveIntensity={0.2}
            />
          </mesh>
        </Float>
        
        <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.3}>
          <mesh position={[-0.8, -1.2, 0.5]}>
            <tetrahedronGeometry args={[0.4, 0]} />
            <meshStandardMaterial
              color={colors.primary}
              metalness={0.9}
              roughness={0.15}
            />
          </mesh>
        </Float>
      </group>
    )
  }

  if (variant === "works") {
    return (
      <group ref={groupRef}>
        {/* Central glass torus */}
        <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.4}>
          <Torus args={[1.1, 0.35, 32, 64]} position={[0, 0, 0]}>
            <MeshTransmissionMaterial
              backside
              samples={8}
              resolution={256}
              transmission={0.95}
              roughness={0.02}
              thickness={0.6}
              ior={2.0}
              chromaticAberration={isDark ? 0.4 : 0.2}
              color={colors.primary}
            />
          </Torus>
        </Float>
        
        {/* Particle ring around torus */}
        <ParticleRing count={60} radius={2} color={colors.secondary} />
        
        {/* Orbiting small shapes */}
        {[...Array(6)].map((_, i) => (
          <Float 
            key={i} 
            speed={1.5 + i * 0.2} 
            rotationIntensity={0.3} 
            floatIntensity={0.4}
          >
            <mesh
              position={[
                Math.cos((i / 6) * Math.PI * 2) * 2.2,
                Math.sin((i / 6) * Math.PI * 2) * 0.8,
                Math.sin((i / 6) * Math.PI * 2) * 0.5 - 0.5,
              ]}
            >
              <icosahedronGeometry args={[0.12 + Math.random() * 0.08, 0]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? colors.primary : colors.secondary}
                emissive={i % 2 === 0 ? colors.primary : colors.secondary}
                emissiveIntensity={0.4}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          </Float>
        ))}
      </group>
    )
  }

  // Contact variant - elegant dodecahedron
  return (
    <group ref={groupRef}>
      {/* Main glass dodecahedron */}
      <Float speed={1} rotationIntensity={0.4} floatIntensity={0.7}>
        <Dodecahedron args={[1.3, 0]} position={[0, 0, 0]}>
          <MeshTransmissionMaterial
            backside
            samples={8}
            resolution={256}
            transmission={0.92}
            roughness={0.05}
            thickness={0.8}
            ior={1.6}
            chromaticAberration={isDark ? 0.5 : 0.25}
            color={colors.primary}
          />
        </Dodecahedron>
      </Float>
      
      {/* Inner glowing sphere */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <Sphere args={[0.4, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color={colors.secondary}
            emissive={colors.secondary}
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.1}
          />
        </Sphere>
      </Float>
      
      {/* Orbiting particles */}
      <ParticleRing count={40} radius={1.8} color={colors.tertiary} />
    </group>
  )
}
