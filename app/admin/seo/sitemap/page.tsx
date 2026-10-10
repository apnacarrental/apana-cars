import prisma from '@/lib/prisma'

export default async function SitemapDashboard() {
  const globalSeo = await prisma.seoSettings.findFirst({ orderBy: { createdAt: 'desc' } })
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Sitemap Information</h1>
      <p className="text-gray-600 mb-8">The sitemap is dynamically generated in real-time. No static files are kept on disk.</p>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-lg mb-4">Sitemap URL</h3>
        <a href="/sitemap.xml" target="_blank" className="text-blue-600 underline break-all">
          {globalSeo?.canonicalBaseUrl || 'http://localhost:3000'}/sitemap.xml
        </a>
        
        <div className="mt-8">
          <h4 className="font-medium mb-2">Rules</h4>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>/admin and /api routes are strictly excluded.</li>
            <li>Pages marked with 'Noindex' in Pages SEO are excluded.</li>
            <li>Dynamic routes (Cars, Blogs) respect their individual 'isActive' or 'Status' flags.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

