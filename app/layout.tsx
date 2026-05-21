import type { Metadata } from 'next'
import './globals.css'
import '../App.css'

export const metadata: Metadata = {
  title: 'LED SpinBox',
  description: 'Interactive LED advertising box campaign prototype',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
