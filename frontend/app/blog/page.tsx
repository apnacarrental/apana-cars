import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { getPublishedBlogs } from '@/lib/data/db'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FinalCtaSection } from '@/components/home/final-cta-section'
import { buildMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> {
  return await buildMetadata({
    fallbackTitle: 'Travel Blog & Hyderabad Road Trip Guides | Apna Cars',
    fallbackDescription: 'Read the latest Hyderabad sightseeing guides, Srisailam pilgrimage tips, airport transfer advice, and highway travel updates from Apna Cars.',
    path: '/blog',
  })
}

export default async function BlogPage() {
  const blogs = await getPublishedBlogs()

  return (
    <>
      <Header />
      <main>
        <section className="section bg-[var(--paper-subtle)]" style={{ paddingTop: '150px', paddingBottom: '90px' }}>
          <div className="section-head mb-12">
            <div>
              <p className="eyebrow flex items-center gap-1.5">
                <BookOpen size={13} className="text-[var(--brand-orange)]" />
                Hyderabad Travel Journal
              </p>
              <h1>The Apna <em>Journal.</em></h1>
            </div>
            <p className="text-sm text-[var(--soft)] max-w-sm m-0">
              Expert highway itineraries, local sightseeing circuits, pilgrimage darshan tips, and airport transfer guides for Hyderabad and Telangana travelers.
            </p>
          </div>
          
          <div className="max-w-7xl mx-auto">
            {blogs && blogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((post) => {
                  const words = ((post.content || '') + ' ' + (post.excerpt || '')).replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(Boolean).length
                  const readTime = Math.max(2, Math.ceil(words / 180))
                  const displayExcerpt = post.excerpt || (post.content ? post.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 160) + '...' : 'Explore comprehensive travel insights, itinerary details, and cab options.')

                  return (
                    <article 
                      key={post.id} 
                      className="fleet-card group flex flex-col justify-between p-6 bg-white rounded-2xl border border-[var(--line)] hover:border-neutral-400 hover:shadow-lg transition-all duration-300"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          {post.category ? (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[var(--brand-orange-light)] text-[var(--brand-orange)] border border-orange-200/60">
                              {post.category.name}
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                              Guide
                            </span>
                          )}
                          <time className="text-xs text-neutral-400 font-medium">
                            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'}
                          </time>
                        </div>

                        <h3 className="text-xl font-bold text-neutral-900 group-hover:text-black line-clamp-2 leading-snug mb-2.5">
                          <Link href={`/blog/${post.slug}`} className="hover:underline">
                            {post.title}
                          </Link>
                        </h3>

                        <p className="text-xs sm:text-[13px] text-neutral-600 line-clamp-3 leading-relaxed mb-6">
                          {displayExcerpt}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between mt-auto">
                        <span className="text-xs font-semibold text-neutral-400">{readTime} min read</span>
                        <Link 
                          href={`/blog/${post.slug}`} 
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-[var(--brand-orange)] transition-colors group/btn py-1"
                        >
                          <span>READ GUIDE</span>
                          <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </div>
                    </article>
                  )
                })}
              </div>
            ) : (
              <div className="p-12 text-center bg-white rounded-2xl border border-[var(--line)]">
                <p className="text-sm text-neutral-500 m-0">No blog posts have been published yet. Check back soon!</p>
              </div>
            )}
          </div>
        </section>
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  )
}
