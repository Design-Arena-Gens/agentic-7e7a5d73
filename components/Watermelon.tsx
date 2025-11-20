'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { MeshTransmissionMaterial } from '@react-three/drei'

export function Watermelon() {
  const leftHalfRef = useRef<THREE.Group>(null)
  const rightHalfRef = useRef<THREE.Group>(null)
  const [cutProgress, setCutProgress] = useState(0)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // Animate cutting
    const newCutProgress = Math.min((Math.sin(time * 0.5) + 1) * 0.5, 1)
    setCutProgress(newCutProgress)

    if (leftHalfRef.current && rightHalfRef.current) {
      const separation = cutProgress * 1.5
      leftHalfRef.current.position.x = -separation
      rightHalfRef.current.position.x = separation

      leftHalfRef.current.rotation.y = -cutProgress * 0.3
      rightHalfRef.current.rotation.y = cutProgress * 0.3
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Left Half */}
      <group ref={leftHalfRef}>
        {/* Outer Green Glass Shell */}
        <mesh castShadow receiveShadow position={[-0.1, 0, 0]}>
          <sphereGeometry args={[1.5, 64, 64, 0, Math.PI]} />
          <MeshTransmissionMaterial
            backside
            samples={16}
            resolution={512}
            transmission={0.95}
            roughness={0.1}
            thickness={0.5}
            ior={1.5}
            chromaticAberration={0.05}
            anisotropy={0.3}
            distortion={0.1}
            distortionScale={0.2}
            temporalDistortion={0.1}
            color="#2d5016"
            attenuationDistance={0.5}
            attenuationColor="#1a3d0a"
          />
        </mesh>

        {/* White Rind Layer */}
        <mesh castShadow receiveShadow position={[-0.05, 0, 0]}>
          <sphereGeometry args={[1.3, 64, 64, 0, Math.PI]} />
          <meshStandardMaterial
            color="#f0f8f0"
            transparent
            opacity={0.7}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>

        {/* Red Flesh Glass */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1.2, 64, 64, 0, Math.PI]} />
          <MeshTransmissionMaterial
            backside
            samples={16}
            resolution={512}
            transmission={0.9}
            roughness={0.15}
            thickness={1}
            ior={1.4}
            chromaticAberration={0.06}
            anisotropy={0.2}
            distortion={0.2}
            distortionScale={0.3}
            temporalDistortion={0.15}
            color="#ff3366"
            attenuationDistance={1}
            attenuationColor="#cc0033"
          />
        </mesh>

        {/* Seeds */}
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI
          const radius = 0.5 + Math.random() * 0.4
          const x = Math.cos(angle) * radius * 0.3
          const y = Math.sin(angle) * radius * 0.8 - 0.2
          const z = (Math.random() - 0.5) * 0.5

          return (
            <mesh key={i} position={[x, y, z]} rotation={[Math.random(), Math.random(), Math.random()]}>
              <capsuleGeometry args={[0.05, 0.15, 4, 8]} />
              <meshStandardMaterial
                color="#1a1a1a"
                roughness={0.4}
                metalness={0.6}
              />
            </mesh>
          )
        })}
      </group>

      {/* Right Half */}
      <group ref={rightHalfRef}>
        {/* Outer Green Glass Shell */}
        <mesh castShadow receiveShadow position={[0.1, 0, 0]}>
          <sphereGeometry args={[1.5, 64, 64, Math.PI, Math.PI]} />
          <MeshTransmissionMaterial
            backside
            samples={16}
            resolution={512}
            transmission={0.95}
            roughness={0.1}
            thickness={0.5}
            ior={1.5}
            chromaticAberration={0.05}
            anisotropy={0.3}
            distortion={0.1}
            distortionScale={0.2}
            temporalDistortion={0.1}
            color="#2d5016"
            attenuationDistance={0.5}
            attenuationColor="#1a3d0a"
          />
        </mesh>

        {/* White Rind Layer */}
        <mesh castShadow receiveShadow position={[0.05, 0, 0]}>
          <sphereGeometry args={[1.3, 64, 64, Math.PI, Math.PI]} />
          <meshStandardMaterial
            color="#f0f8f0"
            transparent
            opacity={0.7}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>

        {/* Red Flesh Glass */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1.2, 64, 64, Math.PI, Math.PI]} />
          <MeshTransmissionMaterial
            backside
            samples={16}
            resolution={512}
            transmission={0.9}
            roughness={0.15}
            thickness={1}
            ior={1.4}
            chromaticAberration={0.06}
            anisotropy={0.2}
            distortion={0.2}
            distortionScale={0.3}
            temporalDistortion={0.15}
            color="#ff3366"
            attenuationDistance={1}
            attenuationColor="#cc0033"
          />
        </mesh>

        {/* Seeds */}
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI + Math.PI
          const radius = 0.5 + Math.random() * 0.4
          const x = Math.cos(angle) * radius * 0.3
          const y = Math.sin(angle) * radius * 0.8 - 0.2
          const z = (Math.random() - 0.5) * 0.5

          return (
            <mesh key={i} position={[x, y, z]} rotation={[Math.random(), Math.random(), Math.random()]}>
              <capsuleGeometry args={[0.05, 0.15, 4, 8]} />
              <meshStandardMaterial
                color="#1a1a1a"
                roughness={0.4}
                metalness={0.6}
              />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}
