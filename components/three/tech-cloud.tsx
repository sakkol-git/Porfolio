"use client"

import { useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Text, Float } from "@react-three/drei"
import * as THREE from "three"
import { useTheme } from "../theme-provider"

const techs = [
  { name: "React", position: [0, 0.5, 0] as const },
  { name: "Next.js", position: [-1.5, 0, 0.5] as const },
  { name: "Three.js", position: [1.5, 0.3, -0.3] as const },
  { name: "TypeScript", position: [-0.8, -0.8, 0.8] as const },
  { name: "WebGL", position: [0.8, -0.5, -0.5] as const },
  { name: "GSAP", position: [-0.5, 1.2, -0.2] as const },
  { name: "Tailwind", position: [1, 1, 0.3] as const },
  { name: "Node.js", position: [-1.2, 0.8, -0.5] as const },
]

function TechItem({
  name,
  position,
}: {
  name: string
  position: readonly [number, number, number]
}) {
  const meshRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const { theme } = useTheme()

  useFrame((state) => {
    if (!meshRef.current) return

    if (hovered) {
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1.3, 0.1)
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 1.3, 0.1)
    } else {
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1)
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 1, 0.1)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group
        ref={meshRef}
        position={position as unknown as THREE.Vector3}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <Text
          font="/fonts/Inter-Bold.ttf"
          fontSize={0.25}
          color={hovered ? "#ff3b30" : theme === "dark" ? "#e0e0e0" : "#1a1a1a"}
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
        {hovered && (
          <mesh position={[0, 0, -0.1]}>
            <planeGeometry args={[name.length * 0.15 + 0.3, 0.4]} />
            <meshBasicMaterial color="#ff3b30" transparent opacity={0.1} />
          </mesh>
        )}
      </group>
    </Float>
  )
}

export function TechCloud() {
  const groupRef = useRef<THREE.Group>(null)
  const { pointer } = useThree()

  useFrame((state) => {
    if (!groupRef.current) return

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.3, 0.05)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, pointer.y * 0.2, 0.05)
  })

  return (
    <group ref={groupRef}>
      {techs.map((tech) => (
        <TechItem key={tech.name} {...tech} />
      ))}
    </group>
  )
}
