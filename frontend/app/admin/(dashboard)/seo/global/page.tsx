import { getGlobalSeoSettings } from '@/lib/data/seo'
import { saveGlobalSeoAction } from './actions'

export default async function GlobalSeoPage() {
  const settings = await getGlobalSeoSettings()
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Global SEO Settings</h1>
      
      <form action={saveGlobalSeoAction} className="space-y-6 max-w-2xl bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        
        <div>
          <label className="block text-sm font-medium mb-1">Site Name</label>
          <input name="siteName" defaultValue={settings?.siteName || ''} className="w-full border rounded-lg p-2" required />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Homepage Title</label>
          <input name="homepageTitle" defaultValue={settings?.homepageTitle || ''} className="w-full border rounded-lg p-2" />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Homepage Description</label>
          <textarea name="homepageDescription" defaultValue={settings?.homepageDescription || ''} className="w-full border rounded-lg p-2 h-24" />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Canonical Base URL</label>
          <input name="canonicalBaseUrl" type="url" placeholder="https://www.apnacars.com" defaultValue={settings?.canonicalBaseUrl || ''} className="w-full border rounded-lg p-2" />
          <p className="text-xs text-gray-500 mt-1">Used for absolute URLs in metadata and sitemap.</p>
        </div>
        
        <button type="submit" className="inline-block bg-black text-white px-4 py-2 rounded-lg font-medium">
          Save Settings
        </button>
      </form>
    </div>
  )
}

