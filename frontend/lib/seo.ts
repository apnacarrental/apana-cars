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
  const title = pageSeo?.title || entitySeo.title || globalSeo?.homepageTitle || fallbackTitle
  const description = pageSeo?.description || entitySeo.description || globalSeo?.homepageDescription || fallbackDescription
  const canonical = pageSeo?.canonicalUrl || entitySeo.canonical_url || `${globalSeo?.canonicalBaseUrl || getBaseUrl()}${path}`
  
  const index = pageSeo?.robotsIndex ?? entitySeo.robots_index ?? globalSeo?.defaultRobotsIndex ?? true
  const follow = pageSeo?.robotsFollow ?? entitySeo.robots_follow ?? globalSeo?.defaultRobotsFollow ?? true

  const ogImage = pageSeo?.ogImageId || entitySeo.og_image_id || globalSeo?.defaultOgImageId || fallbackOgImage || null

  const siteName = globalSeo?.siteName || 'Apna Car Rental'

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
      title: pageSeo?.ogTitle || entitySeo.og_title || title,
      description: pageSeo?.ogDescription || entitySeo.og_description || description,
      url: canonical,
      siteName,
      type: 'website',
      ...(ogImage && { images: [{ url: ogImage }] })
    },
    twitter: {
      card: 'summary_large_image',
      title: pageSeo?.ogTitle || entitySeo.og_title || title,
      description: pageSeo?.ogDescription || entitySeo.og_description || description,
      ...(ogImage && { images: [ogImage] })
    }
  }
}
