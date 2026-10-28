'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { GA_MEASUREMENT_ID, IS_ANALYTICS_ENABLED, pageview, trackEvent } from '@/lib/analytics'

export default function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lastTrackedUrl = useRef<string | null>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (!IS_ANALYTICS_ENABLED || !GA_MEASUREMENT_ID) return
    if (!pathname) return
    
    if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
      return
    }

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    
    // Skip first mount because gtag('config', ID) already fires the landing pageview
    if (isFirstRender.current) {
      isFirstRender.current = false
      lastTrackedUrl.current = url
      return
    }

    // Prevent duplicate pageview fires in React Strict Mode
    if (lastTrackedUrl.current === url) return
    lastTrackedUrl.current = url

    const timeout = setTimeout(() => {
      pageview(url)
    }, 0)
    
    return () => clearTimeout(timeout)
  }, [pathname, searchParams])

  useEffect(() => {
    if (!IS_ANALYTICS_ENABLED || !GA_MEASUREMENT_ID) return

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      
      if (!link) return
      
      const href = link.getAttribute('href')
      if (!href) return

      if (href.startsWith('tel:')) {
        trackEvent({ action: 'click_call', category: 'engagement' })
      } else if (href.includes('wa.me')) {
        trackEvent({ action: 'click_whatsapp', category: 'engagement' })
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  if (!IS_ANALYTICS_ENABLED || !GA_MEASUREMENT_ID) {
    return null
  }

  if (pathname && (pathname.startsWith('/admin') || pathname.startsWith('/api'))) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `,
        }}
      />
    </>
  )
}
