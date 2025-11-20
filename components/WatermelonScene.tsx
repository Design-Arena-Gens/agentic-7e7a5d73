'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'
import { Watermelon } from './Watermelon'
import { Knife } from './Knife'
import { useEffect, useState } from 'react'

export default function WatermelonScene() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)'
    }}>
      <div style={{
        width: 'min(56.25vh, 100vw)',
        height: 'min(177.78vw, 100vh)',
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
      }}>
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

          <ambientLight intensity={0.3} />
          <directionalLight
            position={[5, 10, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <pointLight position={[-5, 5, -5]} intensity={0.5} color="#ff6b9d" />
          <pointLight position={[5, -5, 5]} intensity={0.5} color="#4ecdc4" />

          <Environment preset="sunset" />

          <Watermelon />
          <Knife />

          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={5}
            maxDistance={15}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Canvas>

        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'white',
          fontSize: '14px',
          textAlign: 'center',
          opacity: 0.7,
          pointerEvents: 'none',
          textShadow: '0 2px 10px rgba(0,0,0,0.5)'
        }}>
          Click and drag to rotate • Scroll to zoom
        </div>
      </div>
    </div>
  )
}
