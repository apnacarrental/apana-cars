import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { saveGlobalSeoAction } from './actions'

export default async function GlobalSeoPage() {
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  const settings = await prisma.seoSettings.findFirst({ orderBy: { createdAt: 'desc' } })

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Global SEO Settings</h1>
      
      <form action={saveGlobalSeoAction} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Site Name</label>
          <input name="siteName" defaultValue={settings?.siteName || ''} required className="w-full border rounded-lg p-2" />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Homepage Title Tag</label>
          <input name="homepageTitle" defaultValue={settings?.homepageTitle || ''} className="w-full border rounded-lg p-2" />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Homepage Description</label>
          <textarea name="homepageDescription" defaultValue={settings?.homepageDescription || ''} className="w-full border rounded-lg p-2 h-24" />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Canonical Base URL</label>
          <input name="canonicalBaseUrl" type="url" placeholder="https://www.apnacarrental.in" defaultValue={settings?.canonicalBaseUrl || ''} className="w-full border rounded-lg p-2" />
          <p className="text-xs text-gray-500 mt-1">Used for absolute URLs in metadata and sitemap.</p>
        </div>
        
        <button type="submit" className="inline-block bg-black text-white px-4 py-2 rounded-lg font-medium">
          Save Settings
        </button>
      </form>
    </div>
  )
}
