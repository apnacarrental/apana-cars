import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { getBaseUrl } from '@/lib/seo'

type BreadcrumbItem = {
  label: string
  href: string
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const baseUrl = getBaseUrl()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${baseUrl}${item.href}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#666' }}>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            return (
              <li key={item.href} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {isLast ? (
                  <span aria-current="page" style={{ color: '#000', fontWeight: 500 }}>
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link href={item.href} style={{ textDecoration: 'none', color: '#666' }}>
                      {item.label}
                    </Link>
                    <ChevronRight size={14} />
                  </>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
