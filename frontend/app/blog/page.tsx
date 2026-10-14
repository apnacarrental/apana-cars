import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getPublishedBlogs } from '@/lib/data/db'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FinalCtaSection } from '@/components/home/final-cta-section'

import { buildMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> { return await buildMetadata({
  fallbackTitle: 'Travel Blog & Hyderabad Road Trip Guides | Apna Cars',
  fallbackDescription: 'Read the latest Hyderabad sightseeing guides, Srisailam pilgrimage tips, airport transfer advice, and highway travel updates from Apna Cars.',
  path: '/blog'
}) }

export default async function BlogPage() {
  const blogs = await getPublishedBlogs()

  return (
    <>
      <Header />
      <main>
        <section className="section" style={{ paddingTop: '160px' }}>
          <p className="eyebrow">Hyderabad Travel Journal</p>
          <h1>The Apna <em>Journal.</em></h1>
          <p className="text-neutral-600 max-w-2xl mt-4 text-base">
            Expert highway itineraries, local sightseeing circuits, pilgrimage darshan tips, and airport transfer guides for Hyderabad and Telangana travelers.
          </p>
          
          {blogs && blogs.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem', marginTop: '3.5rem' }}>
              {blogs.map((post) => (
                <article 
                  key={post.id} 
                  className="group flex flex-col justify-between p-6 bg-white rounded-2xl border border-neutral-200 hover:border-neutral-300 hover:shadow-xl transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      {post.category ? (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/60">
                          {post.category.name}
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600">
                          Guide
                        </span>
                      )}
                      <time className="text-xs text-neutral-400 font-medium">
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'}
                      </time>
                    </div>

                    <h3 className="text-xl font-bold text-neutral-900 group-hover:text-black line-clamp-2 leading-snug mb-3">
                      <Link href={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-sm text-neutral-600 line-clamp-3 leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 flex items-center justify-between mt-auto">
                    <span className="text-xs font-semibold text-neutral-400">5 min read</span>
                    <Link 
                      href={`/blog/${post.slug}`} 
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 group-hover:translate-x-1 transition-transform"
                    >
                      Read Guide <ArrowRight size={14} />
                    </Link>
                  </div>
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

