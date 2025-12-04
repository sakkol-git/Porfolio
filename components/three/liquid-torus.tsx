"use client"

import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { TorusKnot, MeshTransmissionMaterial } from "@react-three/drei"
import * as THREE from "three"
import { useTheme } from "../theme-provider"

export function LiquidTorus() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { theme } = useTheme()
  const { pointer } = useThree()
  const targetRotation = useRef({ x: 0, y: 0 })

  // Custom shader material for liquid chrome effect
  const materialProps = useMemo(
    () => ({
      dark: {
        color: "#1a1a2e",
        transmission: 0.95,
        roughness: 0.05,
        thickness: 1.5,
        ior: 2.4,
        chromaticAberration: 0.8,
        anisotropicBlur: 0.3,
        distortion: 0.5,
        distortionScale: 0.5,
        temporalDistortion: 0.2,
      },
      light: {
        color: "#d4d4d8",
        transmission: 0.9,
        roughness: 0.1,
        thickness: 1,
        ior: 2.2,
        chromaticAberration: 0.5,
        anisotropicBlur: 0.2,
        distortion: 0.3,
        distortionScale: 0.3,
        temporalDistortion: 0.1,
      },
    }),
    [],
  )

  useFrame((state) => {
    if (!meshRef.current) return

    // Gentle floating animation
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1

    // Mouse-driven parallax tilt
    targetRotation.current.x = pointer.y * 0.3
    targetRotation.current.y = pointer.x * 0.3

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotation.current.x + state.clock.elapsedTime * 0.1,
      0.05,
    )
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetRotation.current.y + state.clock.elapsedTime * 0.15,
      0.05,
    )
  })

  const props = theme === "dark" ? materialProps.dark : materialProps.light

  return (
    <TorusKnot ref={meshRef} args={[1, 0.3, 256, 64]} scale={1.5}>
      <MeshTransmissionMaterial backside backsideThickness={0.5} samples={16} resolution={1024} {...props} />
    </TorusKnot>
  )
}
