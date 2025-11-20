import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '3D Glass Watermelon Cutting ASMR',
  description: 'Relaxing 3D glass watermelon cutting experience',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
