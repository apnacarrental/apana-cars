import Link from 'next/link'
import { getActiveInternalLinks } from '@/lib/data/seo'

export async function InternalLinks({ path }: { path: string }) {
  const links = await getActiveInternalLinks(path)
  
  if (!links || links.length === 0) return null
  
  return (
    <div className="internal-links-module mt-12 pt-8 border-t border-gray-200">
      <h3 className="text-lg font-bold mb-4">Related Links</h3>
      <ul className="flex flex-wrap gap-4">
        {links.map(link => (
          <li key={link.id}>
            <Link href={link.destinationPath} className="text-blue-600 hover:underline">
              {link.anchorText}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
