import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import { getBlogBySlug, getPublishedBlogs } from '@/lib/data/db'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FinalCtaSection } from '@/components/home/final-cta-section'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { BlogPostingSchema } from '@/components/seo/schemas'
import { buildMetadata } from '@/lib/seo'
import { sanitizeHtml } from '@/lib/sanitize'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const resolvedParams = await params
    const post = await getBlogBySlug(resolvedParams.slug)

    if (!post) {
      return {}
    }

    return await buildMetadata({
      seoMetadata: post.seoMetadata,
      fallbackTitle: `${post.title} | Apna Cars Blog`,
      fallbackDescription: post.excerpt || `Read ${post.title} on the Apna Cars blog.`,
      path: `/blog/${post.slug}`,
    })
  } catch (err) {
    console.error('generateMetadata error in blog detail:', err)
    return {}
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  let post: any = null
  try {
    post = await getBlogBySlug(resolvedParams.slug)
  } catch (err) {
    console.error('getBlogBySlug error in blog detail page:', err)
  }

  if (!post || post.status !== 'PUBLISHED') {
    notFound()
  }

  const rawDate = post.publishedAt || post.createdAt
  let displayDate = 'Recently'
  let isoDate = ''
  if (rawDate) {
    try {
      const d = new Date(rawDate)
      if (!isNaN(d.getTime())) {
        displayDate = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        isoDate = d.toISOString()
      }
    } catch {
      // fallback
    }
  }

  return (
    <>
      <Header />
      <main>
        <section className="section bg-[var(--paper-subtle)]" style={{ paddingTop: '150px', paddingBottom: '70px' }}>
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Breadcrumbs items={[
                { label: 'Home', href: '/' },
                { label: 'Blog', href: '/blog' },
                { label: post.title || 'Guide', href: `/blog/${post.slug}` },
              ]} />
            </div>
            
            <article className="p-6 sm:p-10 bg-white rounded-3xl border border-[var(--line)] shadow-xs">
              {post.category && (
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[var(--brand-orange-light)] text-[var(--brand-orange)] border border-orange-200/60 mb-3">
                  {post.category.name}
                </span>
              )}
              
              <h1 className="text-3xl sm:text-5xl font-bold text-neutral-900 tracking-tight leading-tight mb-4">
                {post.title}
              </h1>
              
              <div className="flex items-center gap-2 text-xs text-neutral-500 pb-6 border-b border-[var(--line)] mb-8">
                <Calendar size={13} className="text-neutral-400" />
                <time dateTime={isoDate}>{displayDate}</time>
              </div>

              {post.content ? (
                <div 
                  className="prose prose-neutral max-w-none leading-relaxed text-neutral-700"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
                />
              ) : post.excerpt ? (
                <div className="prose prose-neutral max-w-none leading-relaxed">
                  <p className="text-base sm:text-lg text-neutral-700 leading-relaxed">{post.excerpt}</p>
                </div>
              ) : null}
            </article>

            <BlogPostingSchema post={post} />
          </div>
        </section>
        
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  )
}
