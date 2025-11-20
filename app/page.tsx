'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const WatermelonScene = dynamic(() => import('../components/WatermelonScene'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '24px'
    }}>
      Loading 3D Experience...
    </div>
  )
})

export default function Home() {
  return (
    <main style={{ width: '100vw', height: '100vh' }}>
      <Suspense fallback={null}>
        <WatermelonScene />
      </Suspense>
    </main>
  )
}
