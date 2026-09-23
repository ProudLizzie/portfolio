import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://elizabethjanicek.com'),
  title: 'Elizabeth Janicek — Mechanical Design Engineer',
  description:
    'Aspiring mechanical design engineer specializing in robotics and manufacturing — animatronics, injection molding, and iterative product design.',
  generator: 'v0.app',
  openGraph: {
    title: 'Elizabeth Janicek — Mechanical Design Engineer',
    description:
      'Aspiring mechanical design engineer specializing in robotics and manufacturing — animatronics, injection molding, and iterative product design.',
    type: 'website',
    siteName: 'Elizabeth Janicek',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elizabeth Janicek — Mechanical Design Engineer',
    description:
      'Aspiring mechanical design engineer specializing in robotics and manufacturing — animatronics, injection molding, and iterative product design.',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f7f4ee',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
