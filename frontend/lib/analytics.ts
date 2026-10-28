// lib/analytics.ts

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-9CSHWBSKR7'
export const IS_ANALYTICS_ENABLED = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== 'false'
export const IS_DEBUG = process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === 'true'

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}

// Track pageviews
export const pageview = (url: string) => {
  if (!IS_ANALYTICS_ENABLED || !GA_MEASUREMENT_ID) return

  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: url,
        page_title: typeof document !== 'undefined' ? document.title : '',
        page_location: window.location.href,
      })
    } else {
      window.dataLayer.push({
        event: 'page_view',
        page_path: url,
        page_title: typeof document !== 'undefined' ? document.title : '',
        page_location: window.location.href,
      })
    }
    
    if (IS_DEBUG) {
      console.log(`[Analytics:PageView] ${url}`)
    }
  }
}

// Track specific events
type GtagEvent = {
  action: string
  category?: string
  label?: string
  value?: number
  [key: string]: any
}

export const trackEvent = ({ action, category, label, value, ...rest }: GtagEvent) => {
  if (!IS_ANALYTICS_ENABLED || !GA_MEASUREMENT_ID) {
    if (IS_DEBUG) {
      console.log(`[Analytics:Disabled] ${action}`, { category, label, value, ...rest })
    }
    return
  }

  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    if (typeof window.gtag === 'function') {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
        ...rest,
      })
    } else {
      window.dataLayer.push({
        event: action,
        event_category: category,
        event_label: label,
        value: value,
        ...rest,
      })
    }
    
    if (IS_DEBUG) {
      console.log(`[Analytics:Event] ${action}`, { category, label, value, ...rest })
    }
  }
}
