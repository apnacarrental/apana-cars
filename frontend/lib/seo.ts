import { Metadata } from 'next'
import prisma from '@/lib/prisma'

export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000'
  }
  return 'https://www.apnacarrental.in'
}

type SeoMetadataJson = {
  title?: string
  description?: string
  focus_keyword?: string
  secondary_keywords?: string[]
  canonical_url?: string
  og_title?: string
  og_description?: string
  og_image_id?: string
  robots_index?: boolean
  robots_follow?: boolean
}

type BuildMetadataOptions = {
  seoMetadata?: unknown
  fallbackTitle: string
  fallbackDescription: string
  path: string
  fallbackOgImage?: string
}

function sanitizeSeoText(val: string | null | undefined, fallback: string): string {
  if (!val || typeof val !== 'string') return fallback
  if (/self[- ]?drive/i.test(val)) {
    return fallback
  }
  return val.replace(/https?:\/\/(www\.)?apnacars\.com/gi, 'https://www.apnacarrental.in').trim() || fallback
}

function sanitizeUrl(val: string | null | undefined, fallback: string): string {
  if (!val || typeof val !== 'string') return fallback
  return val.replace(/https?:\/\/(www\.)?apnacars\.com/gi, 'https://www.apnacarrental.in').trim() || fallback
}

export async function buildMetadata({ seoMetadata, fallbackTitle, fallbackDescription, path, fallbackOgImage }: BuildMetadataOptions): Promise<Metadata> {
  let globalSeo = null
  let pageSeo = null

  try {
    globalSeo = await prisma.seoSettings.findFirst({ orderBy: { createdAt: 'desc' } })
    pageSeo = await prisma.pageSeo.findUnique({ where: { path } })
  } catch (error) {
    // Database may be unreachable during static build or cold start; safely fallback
  }

  const entitySeo = (seoMetadata as SeoMetadataJson) || {}
  
  // Precedence: Page SEO > Entity SEO > Global SEO > Fallback
  const rawTitle = pageSeo?.title || entitySeo.title || globalSeo?.homepageTitle || fallbackTitle
  const rawDescription = pageSeo?.description || entitySeo.description || globalSeo?.homepageDescription || fallbackDescription
  const rawCanonical = pageSeo?.canonicalUrl || entitySeo.canonical_url || `${globalSeo?.canonicalBaseUrl || getBaseUrl()}${path}`

  const title = sanitizeSeoText(rawTitle, fallbackTitle)
  const description = sanitizeSeoText(rawDescription, fallbackDescription)
  const canonical = sanitizeUrl(rawCanonical, `${getBaseUrl()}${path}`)
  
  const index = pageSeo?.robotsIndex ?? entitySeo.robots_index ?? globalSeo?.defaultRobotsIndex ?? true
  const follow = pageSeo?.robotsFollow ?? entitySeo.robots_follow ?? globalSeo?.defaultRobotsFollow ?? true

  const rawOgImage = pageSeo?.ogImageId || entitySeo.og_image_id || globalSeo?.defaultOgImageId || fallbackOgImage || null
  const ogImage = rawOgImage ? sanitizeUrl(rawOgImage, rawOgImage) : null

  const siteName = globalSeo?.siteName || 'Apna Car Rental'

  const rawOgTitle = pageSeo?.ogTitle || entitySeo.og_title || rawTitle
  const rawOgDescription = pageSeo?.ogDescription || entitySeo.og_description || rawDescription

  const ogTitle = sanitizeSeoText(rawOgTitle, title)
  const ogDescription = sanitizeSeoText(rawOgDescription, description)

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: {
      index,
      follow,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName,
      type: 'website',
      ...(ogImage && { images: [{ url: ogImage }] })
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      ...(ogImage && { images: [ogImage] })
    }
  }
}
