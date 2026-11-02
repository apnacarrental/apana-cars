import Script from 'next/script'
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
  title: {
    default: 'Apna Car Rental Hyderabad | Best Cabs, Chauffeur & Fleet',
    template: '%s | Apna Car Rental',
  },
  description: 'Best Cab service in Hyderabad | Outstation Cabs in Hyderabad | Hyderabad to Srisailam Taxi Services',
  generator: 'v0.app',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '8lt9UIHtEF8Yj4YGacJAqN97mnioPFoV90gVPicFDEU',
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
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9CSHWBSKR7"
          strategy="afterInteractive"
        />
        <Script id="google-tag-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-9CSHWBSKR7');
          `}
        </Script>
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
