import prisma from '@/lib/prisma'

export default async function RobotsDashboard() {
  const globalSeo = await prisma.seoSettings.findFirst({ orderBy: { createdAt: 'desc' } })
  const index = globalSeo?.defaultRobotsIndex ?? true
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Robots.txt Configuration</h1>
      <p className="text-gray-600 mb-8">This is a live preview of the generated robots.txt file based on Global SEO settings.</p>
      
      <div className="bg-gray-900 text-green-400 p-6 rounded-xl font-mono whitespace-pre-wrap">
User-agent: *{'\n'}
{index ? 'Allow: /\nDisallow: /admin\nDisallow: /api/private/' : 'Disallow: /'}{'\n\n'}
Sitemap: {globalSeo?.canonicalBaseUrl || 'http://localhost:3000'}/sitemap.xml
      </div>
    </div>
  )
}
