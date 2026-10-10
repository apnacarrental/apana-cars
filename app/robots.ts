import { MetadataRoute } from 'next'
import { getBaseUrl } from '@/lib/seo'
import prisma from '@/lib/prisma'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const globalSeo = await prisma.seoSettings.findFirst({ orderBy: { createdAt: 'desc' } })
  const baseUrl = globalSeo?.canonicalBaseUrl || getBaseUrl()

  const allowRoot = globalSeo?.defaultRobotsIndex !== false

  return {
    rules: {
      userAgent: '*',
      allow: allowRoot ? '/' : '',
      disallow: allowRoot ? ['/admin', '/api/private/'] : ['/'],
    },
    sitemap: baseUrl + '/sitemap.xml',
  }
}
