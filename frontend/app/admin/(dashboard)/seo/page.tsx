import prisma from '@/lib/prisma'
import { requireAdmin } from '@/lib/admin-auth'
import Link from 'next/link'
import { getBaseUrl } from '@/lib/seo'

type SeoIssue = {
  type: string
  entityName: string
  entityType: string
  editUrl: string
  issueDetails: string
  isStatus?: boolean
}

export default async function SeoDashboard() {
  await requireAdmin()

  const globalSeo = await prisma.seoSettings.findFirst({ orderBy: { createdAt: 'desc' } })
  const pagesCount = await prisma.pageSeo.count()
  
  const pageSeos = await prisma.pageSeo.findMany()
  const cars = await prisma.car.findMany({ select: { id: true, name: true, seoMetadata: true, isActive: true, shortDescription: true, content: true } })
  const blogs = await prisma.blog.findMany({ select: { id: true, title: true, seoMetadata: true, status: true, content: true } })
  const locations = await prisma.location.findMany({ select: { id: true, name: true, seoMetadata: true, isActive: true, description: true } })
  const services = await prisma.service.findMany({ select: { id: true, title: true, seoMetadata: true, isActive: true, shortDescription: true, content: true } })
  const routes = await prisma.route.findMany({ select: { id: true, title: true, seoMetadata: true, isActive: true, content: true } })

  const issues: SeoIssue[] = []
  
  const titleSet = new Set<string>()
  const descSet = new Set<string>()
  const focusSet = new Set<string>()
  const canonicalSet = new Set<string>()

  const trackDuplicate = (value: string | undefined | null, set: Set<string>, issueType: string, entityName: string, entityType: string, editUrl: string) => {
    if (!value) return
    const val = value.trim().toLowerCase()
    if (set.has(val)) {
      issues.push({ type: issueType, entityName, entityType, editUrl, issueDetails: `Duplicate: "${value}"` })
    } else {
      set.add(val)
    }
  }

  pageSeos.forEach(p => {
    const editUrl = '/admin/seo/pages'
    
    const effectiveTitle = p.title || globalSeo?.homepageTitle
    const effectiveDesc = p.description || globalSeo?.homepageDescription
    const effectiveCanonical = p.canonicalUrl || `${globalSeo?.canonicalBaseUrl || getBaseUrl()}${p.path}`
    const effectiveOgImage = p.ogImageId || globalSeo?.defaultOgImageId

    if (!effectiveTitle) issues.push({ type: 'Missing Title', entityName: p.path, entityType: 'Page SEO', editUrl, issueDetails: 'Missing effective title' })
    if (!effectiveDesc) issues.push({ type: 'Missing Description', entityName: p.path, entityType: 'Page SEO', editUrl, issueDetails: 'Missing effective description' })
    if (!p.focusKeyword) issues.push({ type: 'Missing Focus Keyword', entityName: p.path, entityType: 'Page SEO', editUrl, issueDetails: 'Missing focus keyword' })
    if (!effectiveCanonical) issues.push({ type: 'Missing Canonical', entityName: p.path, entityType: 'Page SEO', editUrl, issueDetails: 'Missing canonical URL' })
    if (!effectiveOgImage) issues.push({ type: 'Missing OG Image', entityName: p.path, entityType: 'Page SEO', editUrl, issueDetails: 'Missing Open Graph image' })
    
    if (p.robotsIndex === false) {
      issues.push({ type: 'Noindex Status', entityName: p.path, entityType: 'Page SEO', editUrl, issueDetails: 'Page is intentionally excluded from indexing', isStatus: true })
    }

    trackDuplicate(effectiveTitle, titleSet, 'Duplicate Title', p.path, 'Page SEO', editUrl)
    trackDuplicate(effectiveDesc, descSet, 'Duplicate Description', p.path, 'Page SEO', editUrl)
    trackDuplicate(p.focusKeyword, focusSet, 'Duplicate Focus Keyword', p.path, 'Page SEO', editUrl)
    trackDuplicate(effectiveCanonical, canonicalSet, 'Duplicate Canonical', p.path, 'Page SEO', editUrl)
  })

  const checkEntity = (e: any, isDraft: boolean, nameField: string, contentField: string, entityType: string, editUrl: string, pathPrefix: string) => {
    if (isDraft) return
    const seo = (e.seoMetadata as any) || {}
    const name = e[nameField]
    const content = e[contentField] || e.shortDescription || e.description || ''
    
    const effectiveTitle = seo.title || name || globalSeo?.homepageTitle
    const effectiveDesc = seo.description || content || globalSeo?.homepageDescription
    const effectiveCanonical = seo.canonical_url || `${globalSeo?.canonicalBaseUrl || getBaseUrl()}${pathPrefix}`
    const effectiveOgImage = seo.og_image_id || globalSeo?.defaultOgImageId

    if (!effectiveTitle) issues.push({ type: 'Missing Title', entityName: name, entityType, editUrl, issueDetails: 'Missing effective title' })
    if (!effectiveDesc) issues.push({ type: 'Missing Description', entityName: name, entityType, editUrl, issueDetails: 'Missing effective description' })
    if (!seo.focus_keyword) issues.push({ type: 'Missing Focus Keyword', entityName: name, entityType, editUrl, issueDetails: 'Missing focus keyword' })
    if (!effectiveCanonical) issues.push({ type: 'Missing Canonical', entityName: name, entityType, editUrl, issueDetails: 'Missing canonical URL' })
    if (!effectiveOgImage) issues.push({ type: 'Missing OG Image', entityName: name, entityType, editUrl, issueDetails: 'Missing Open Graph image' })
    
    if (content.length < 100) {
      issues.push({ type: 'Thin Content', entityName: name, entityType, editUrl, issueDetails: 'Content is too short (< 100 chars)' })
    }
    
    if (seo.robots_index === false) {
      issues.push({ type: 'Noindex Status', entityName: name, entityType, editUrl, issueDetails: 'Entity is intentionally excluded from indexing', isStatus: true })
    }

    trackDuplicate(effectiveTitle, titleSet, 'Duplicate Title', name, entityType, editUrl)
    trackDuplicate(effectiveDesc, descSet, 'Duplicate Description', name, entityType, editUrl)
    trackDuplicate(seo.focus_keyword, focusSet, 'Duplicate Focus Keyword', name, entityType, editUrl)
    trackDuplicate(effectiveCanonical, canonicalSet, 'Duplicate Canonical', name, entityType, editUrl)
  }

  cars.forEach(c => checkEntity(c, !c.isActive, 'name', 'content', 'Car', `/admin/cars/${c.id}/edit`, `/fleet/${c.id}`))
  locations.forEach(c => checkEntity(c, !c.isActive, 'name', 'description', 'Location', `/admin/locations/${c.id}/edit`, `/locations/${c.id}`))
  services.forEach(c => checkEntity(c, !c.isActive, 'title', 'content', 'Service', `/admin/services/${c.id}/edit`, `/services/${c.id}`))
  routes.forEach(c => checkEntity(c, !c.isActive, 'title', 'content', 'Route', `/admin/routes/${c.id}/edit`, `/routes/${c.id}`))
  blogs.forEach(b => checkEntity(b, b.status !== 'PUBLISHED', 'title', 'content', 'Blog', `/admin/blogs/${b.id}/edit`, `/blog/${b.id}`))

  const missingKeywordsCount = issues.filter(i => i.type === 'Missing Focus Keyword' && !i.isStatus).length
  const thinContentCount = issues.filter(i => i.type === 'Thin Content' && !i.isStatus).length
  const duplicatesCount = issues.filter(i => i.type.startsWith('Duplicate') && !i.isStatus).length
  const statusCount = issues.filter(i => i.isStatus).length

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">SEO Management Dashboard</h1>
      <p className="text-gray-600 mb-8">System-wide overview of your SEO structure.</p>

      <div className="bg-red-50 border border-red-200 p-6 rounded-xl mb-8">
        <h2 className="font-bold text-red-800 mb-4">SEO Health & Coverage</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-red-100">
            <div className="text-2xl font-bold text-red-600">{missingKeywordsCount}</div>
            <div className="text-sm text-gray-600">Missing Focus Keywords</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
            <div className="text-2xl font-bold text-orange-600">{thinContentCount}</div>
            <div className="text-sm text-gray-600">Thin Content Entities</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
            <div className="text-2xl font-bold text-orange-600">{duplicatesCount}</div>
            <div className="text-sm text-gray-600">Duplicate Metadata</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-gray-800">{statusCount}</div>
            <div className="text-sm text-gray-600">Intentional Statuses (e.g. Noindex)</div>
          </div>
        </div>

        {issues.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-red-100 overflow-hidden">
            <div className="max-h-[500px] overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-gray-500">Issue Type</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-500">Entity</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-500">Details</th>
                    <th className="px-4 py-2 text-right font-medium text-gray-500">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {issues.map((issue, idx) => (
                    <tr key={idx} className={`hover:bg-gray-50 ${issue.isStatus ? 'bg-gray-50 opacity-80' : ''}`}>
                      <td className={`px-4 py-2 font-medium ${issue.isStatus ? 'text-gray-600' : 'text-red-600'}`}>{issue.type}</td>
                      <td className="px-4 py-2 text-gray-900">
                        <span className="text-xs bg-gray-200 px-1.5 py-0.5 rounded mr-2">{issue.entityType}</span>
                        {issue.entityName}
                      </td>
                      <td className="px-4 py-2 text-gray-600">{issue.issueDetails}</td>
                      <td className="px-4 py-2 text-right">
                        <Link href={issue.editUrl} className="text-blue-600 hover:underline">Edit</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
