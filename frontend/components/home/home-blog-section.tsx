import Link from 'next/link'
import { ArrowRight, BookOpen, Clock } from 'lucide-react'
import { getPublishedBlogs } from '@/lib/data/db'

export async function HomeBlogSection() {
  const blogs = await getPublishedBlogs()
  const recentBlogs = (blogs || []).slice(0, 3)

  if (!recentBlogs || recentBlogs.length === 0) return null

  return (
    <section className="section bg-[var(--paper)] border-t border-[var(--line)]" style={{ paddingTop: '90px', paddingBottom: '90px' }}>
      <div className="section-head mb-10">
        <div>
          <p className="eyebrow flex items-center gap-1.5">
            <BookOpen size={13} className="text-amber-600" />
            Travel Insights & Guides
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            Latest from our <span className="text-[#ECA00A] font-extrabold">Travel Journal.</span>
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <p className="text-sm text-neutral-600 max-w-md">
            Helpful tips, curated road trip itineraries, and darshan guide notes from our seasoned highway captains.
          </p>
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-amber-700 transition-colors shrink-0"
          >
            All Articles <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentBlogs.map((post) => {
          const words = ((post.content || '') + ' ' + (post.excerpt || '')).replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(Boolean).length
          const readTime = Math.max(2, Math.ceil(words / 180))
          const displayExcerpt = post.excerpt || (post.content ? post.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 140) + '...' : 'Explore comprehensive travel insights, itinerary details, and cab options.')

          return (
            <article 
              key={post.id}
              className="group flex flex-col justify-between p-6 bg-white rounded-2xl border border-[var(--line)] hover:border-neutral-400 hover:shadow-lg transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/60">
                    {post.category?.name || 'Guide'}
                  </span>
                  <time className="text-xs text-neutral-400 font-medium">
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'}
                  </time>
                </div>

                <h3 className="text-lg font-bold text-neutral-900 group-hover:text-black line-clamp-2 leading-snug mb-2.5">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>

                <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed mb-6">
                  {displayExcerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200 flex items-center justify-between mt-auto">
                <span className="flex items-center gap-1 text-[11px] font-semibold text-neutral-400">
                  <Clock size={12} /> {readTime} min read
                </span>
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 group-hover:translate-x-1 transition-transform"
                >
                  Read Article <ArrowRight size={13} />
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
