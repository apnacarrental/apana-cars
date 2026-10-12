import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

import { Suspense } from 'react'
import { getBaseUrl } from '@/lib/seo'
import GoogleAnalytics from '@/components/analytics/google-analytics'

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: 'Apna Car Rental | Your journey. Your car. Your way.',
  description: 'Premium self-drive cars, chauffeur services, airport transfers, and outstation rentals across Hyderabad and beyond.',
  generator: 'v0.app',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <Suspense fallback={null}><GoogleAnalytics /></Suspense>
      </body>
    </html>
  )
}


