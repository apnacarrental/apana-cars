import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getPublishedBlogs } from '@/lib/data/db'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FinalCtaSection } from '@/components/home/final-cta-section'

import { buildMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> { return await buildMetadata({
  fallbackTitle: 'Blog | Apna Car Rental',
  fallbackDescription: 'Read the latest travel tips and updates from Apna Car Rental.',
  path: '/blog'
}) }

export default async function BlogPage() {
  const blogs = await getPublishedBlogs()

  return (
    <>
      <Header />
      <main>
        <section className="section" style={{ paddingTop: '160px' }}>
          <p className="eyebrow">Journal</p>
          <h1>The Apna <em>Blog.</em></h1>
          
          {blogs && blogs.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
              {blogs.map((post) => (
                <article key={post.id} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
                  {post.category && <p className="eyebrow" style={{ marginBottom: 0 }}>{post.category.name}</p>}
                  <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{post.title}</h3>
                  <p style={{ color: '#666' }}>{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="text-button" style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                    Read more <ArrowRight size={15} />
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div style={{ marginTop: '3rem', padding: '3rem', textAlign: 'center', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
              <p style={{ fontSize: '1.2rem', color: '#666' }}>No blog posts have been published yet. Check back soon!</p>
            </div>
          )}
        </section>
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  )
}

