'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Knife() {
  const knifeRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (knifeRef.current) {
      const time = state.clock.getElapsedTime()
      const cutCycle = Math.sin(time * 0.5) * 0.5 + 0.5

      // Move knife down through watermelon
      knifeRef.current.position.y = 3 - cutCycle * 6
      knifeRef.current.position.z = 2 - cutCycle * 1.5

      // Slight rotation for realism
      knifeRef.current.rotation.x = -Math.PI / 6 + cutCycle * 0.1
    }
  })

  return (
    <group ref={knifeRef} position={[0, 3, 2]} rotation={[-Math.PI / 6, 0, 0]}>
      {/* Blade */}
      <mesh castShadow>
        <boxGeometry args={[0.15, 3, 0.02]} />
        <meshStandardMaterial
          color="#e8e8e8"
          metalness={0.95}
          roughness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Blade Edge Highlight */}
      <mesh position={[0, 0, 0.011]}>
        <boxGeometry args={[0.02, 3, 0.001]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={1}
          roughness={0.05}
          emissive="#ffffff"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Handle */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <boxGeometry args={[0.25, 0.8, 0.15]} />
        <meshStandardMaterial
          color="#2a2a2a"
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>

      {/* Handle Grip Lines */}
      {[-0.2, -0.1, 0, 0.1, 0.2].map((offset, i) => (
        <mesh key={i} position={[0, 1.6 + offset, 0.076]}>
          <boxGeometry args={[0.26, 0.02, 0.001]} />
          <meshStandardMaterial
            color="#1a1a1a"
            roughness={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}
