import { getBaseUrl } from '@/lib/seo'

export function FaqSchema({ faqs }: { faqs: { question: string, answer: string }[] }) {
  if (!faqs || faqs.length === 0) return null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BlogPostingSchema({ post }: { post: any }) {
  const baseUrl = getBaseUrl()

  let datePublished: string | undefined
  let dateModified: string | undefined

  try {
    const rawPub = post.publishedAt || post.createdAt
    if (rawPub) {
      const d = new Date(rawPub)
      if (!isNaN(d.getTime())) datePublished = d.toISOString()
    }
    if (post.updatedAt) {
      const d = new Date(post.updatedAt)
      if (!isNaN(d.getTime())) dateModified = d.toISOString()
    }
  } catch {
    // ignore
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished,
    dateModified,
    url: `${baseUrl}/blog/${post.slug}`,
    author: {
      '@type': 'Organization',
      name: 'Apna Cars',
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
