import Link from 'next/link'
import { ReactNode } from 'react'

export default function SeoLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-8">
      <aside className="w-64 flex-shrink-0">
        <nav className="flex flex-col gap-2 sticky top-6">
          <h2 className="font-bold mb-2">SEO Management</h2>
          <Link href="/admin/seo" className="p-2 hover:bg-gray-100 rounded">Dashboard</Link>
          <Link href="/admin/seo/global" className="p-2 hover:bg-gray-100 rounded">Global SEO</Link>
          <Link href="/admin/seo/pages" className="p-2 hover:bg-gray-100 rounded">Pages SEO</Link>
          <Link href="/admin/seo/sitemap" className="p-2 hover:bg-gray-100 rounded">Sitemap</Link>
          <Link href="/admin/seo/robots" className="p-2 hover:bg-gray-100 rounded">Robots.txt</Link>
          <Link href="/admin/seo/redirects" className="p-2 hover:bg-gray-100 rounded">Redirects</Link>
          <Link href="/admin/seo/internal-links" className="p-2 hover:bg-gray-100 rounded">Internal Links</Link>
          <Link href="/admin/seo/navigation" className="p-2 hover:bg-gray-100 rounded">Navigation</Link>`n          <Link href="/admin/seo/analytics" className="p-2 hover:bg-gray-100 rounded">Analytics & GSC</Link>
        </nav>
      </aside>
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </div>
  )
}

