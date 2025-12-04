"use client"

import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useTheme } from "../theme-provider"

const PARTICLE_COUNT = 3000

export function ParticleAvatar() {
  const pointsRef = useRef<THREE.Points>(null)
  const { theme } = useTheme()
  const { pointer } = useThree()

  const { positions, originalPositions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const originalPositions = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const sizes = new Float32Array(PARTICLE_COUNT)

    // Create a humanoid silhouette shape
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3

      // Body distribution
      let x, y, z
      const section = Math.random()

      if (section < 0.3) {
        // Head
        const angle = Math.random() * Math.PI * 2
        const radius = Math.random() * 0.3
        x = Math.cos(angle) * radius
        y = 1.2 + Math.random() * 0.4
        z = Math.sin(angle) * radius * 0.3
      } else if (section < 0.7) {
        // Torso
        x = (Math.random() - 0.5) * 0.8
        y = Math.random() * 1.2
        z = (Math.random() - 0.5) * 0.3
      } else {
        // Arms and legs
        const side = Math.random() > 0.5 ? 1 : -1
        if (Math.random() > 0.5) {
          // Arms
          x = side * (0.4 + Math.random() * 0.6)
          y = 0.5 + Math.random() * 0.5
          z = (Math.random() - 0.5) * 0.2
        } else {
          // Legs
          x = side * (0.1 + Math.random() * 0.2)
          y = -Math.random() * 1
          z = (Math.random() - 0.5) * 0.2
        }
      }

      positions[i3] = x
      positions[i3 + 1] = y
      positions[i3 + 2] = z

      originalPositions[i3] = x
      originalPositions[i3 + 1] = y
      originalPositions[i3 + 2] = z

      // Colors
      colors[i3] = 1
      colors[i3 + 1] = 0.23
      colors[i3 + 2] = 0.19

      sizes[i] = Math.random() * 3 + 1
    }

    return { positions, originalPositions, colors, sizes }
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return

    const positionAttribute = pointsRef.current.geometry.getAttribute("position") as THREE.BufferAttribute
    const positions = positionAttribute.array as Float32Array

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3

      // Calculate distance from cursor in 3D space
      const dx = originalPositions[i3] - pointer.x * 2
      const dy = originalPositions[i3 + 1] - pointer.y * 2
      const distance = Math.sqrt(dx * dx + dy * dy)

      // Particles follow cursor with wave effect
      const wave = Math.sin(state.clock.elapsedTime * 2 + distance * 3) * 0.05

      positions[i3] = THREE.MathUtils.lerp(
        positions[i3],
        originalPositions[i3] + (pointer.x - originalPositions[i3]) * 0.1,
        0.02,
      )
      positions[i3 + 1] = THREE.MathUtils.lerp(
        positions[i3 + 1],
        originalPositions[i3 + 1] + (pointer.y - originalPositions[i3 + 1]) * 0.1 + wave,
        0.02,
      )
      positions[i3 + 2] = originalPositions[i3 + 2] + Math.sin(state.clock.elapsedTime + i * 0.01) * 0.02
    }

    positionAttribute.needsUpdate = true

    // Rotate the whole system
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
  })

  return (
    <points ref={pointsRef} position={[2.5, -0.5, 0]} scale={0.8}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={PARTICLE_COUNT} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={PARTICLE_COUNT} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} count={PARTICLE_COUNT} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={theme === "dark" ? 0.8 : 0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
