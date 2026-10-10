import { MetadataRoute } from 'next'
import { getCars, getLocations, getServices, getPublishedBlogs, getRoutes } from '@/lib/data/db'
import { getBaseUrl } from '@/lib/seo'
import prisma from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl()

  // Fetch page overrides to check noindex for static pages
  const pageSeos = await prisma.pageSeo.findMany({ select: { path: true, robotsIndex: true } })
  const noindexPaths = new Set(pageSeos.filter(p => p.robotsIndex === false).map(p => p.path))

  // Base routes
  const routes = [
    '',
    '/fleet',
    '/locations',
    '/services',
    '/routes',
    '/about',
    '/contact',
    '/faq',
    '/blog'
  ].filter(route => !noindexPaths.has(route === '' ? '/' : route))
   .map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Fetch dynamic records
  const [cars, locations, services, blogs, dynamicRoutes] = await Promise.all([
    getCars(),
    getLocations(),
    getServices(),
    getPublishedBlogs(),
    getRoutes()
  ])

  // Helper to check robots_index explicitly AND thin content
  const isIndexable = (record: any) => {
    if (record.seoMetadata && typeof record.seoMetadata === 'object') {
      const seo = record.seoMetadata as { robots_index?: boolean }
      if (seo.robots_index === false) {
        return false
      }
    }
    // Thin content protection: must have some meaningful content
    const hasContent = !!(record.description || record.shortDescription || record.content || record.title)
    if (!hasContent) return false

    return true
  }

  const carUrls = cars
    .filter(isIndexable)
    .filter(car => !noindexPaths.has(`/fleet/${car.slug}`))
    .map((car) => ({
      url: `${baseUrl}/fleet/${car.slug}`,
      lastModified: car.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }))

  const locationUrls = locations
    .filter(isIndexable)
    .filter(loc => !noindexPaths.has(`/locations/${loc.slug}`))
    .map((loc) => ({
      url: `${baseUrl}/locations/${loc.slug}`,
      lastModified: loc.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  const serviceUrls = services
    .filter(isIndexable)
    .filter(srv => !noindexPaths.has(`/services/${srv.slug}`))
    .map((srv) => ({
      url: `${baseUrl}/services/${srv.slug}`,
      lastModified: srv.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
    
  const dynamicRouteUrls = dynamicRoutes
    .filter(isIndexable)
    .filter(rt => !noindexPaths.has(`/routes/${rt.slug}`))
    .map((rt) => ({
      url: `${baseUrl}/routes/${rt.slug}`,
      lastModified: rt.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  const blogUrls = blogs
    .filter(isIndexable)
    .filter(blog => !noindexPaths.has(`/blog/${blog.slug}`))
    .map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: blog.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

  return [...routes, ...carUrls, ...locationUrls, ...serviceUrls, ...dynamicRouteUrls, ...blogUrls]
}
