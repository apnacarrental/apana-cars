import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700', '800'],
})
import { getBaseUrl } from '@/lib/seo'
import GoogleAnalytics from '@/components/analytics/google-analytics'
import { BookingModalProvider } from '@/components/ui/smart-booking-modal'
import { FloatingActionButtons } from '@/components/ui/floating-action-buttons'

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: 'Apna Car Rental | Premium Cab Services & Chauffeur Travel in Hyderabad',
  description: 'Premium chauffeur-driven cabs, airport transfers, sightseeing tours, and outstation rentals across Hyderabad and beyond.',
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
    <html lang="en" className={montserrat.variable}>
      <body className={`${montserrat.className} antialiased overflow-x-hidden`}>
        <BookingModalProvider>
          {children}
          <FloatingActionButtons />
        </BookingModalProvider>
        {process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === 'true' && <Analytics />}
        <Suspense fallback={null}><GoogleAnalytics /></Suspense>
      </body>
    </html>
  )
}


