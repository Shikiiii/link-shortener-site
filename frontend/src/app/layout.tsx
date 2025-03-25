import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Link Shortener',
  description: 'Shorten your links easily',
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