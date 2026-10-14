import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getBlogBySlug, getPublishedBlogs } from '@/lib/data/db'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FinalCtaSection } from '@/components/home/final-cta-section'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { BlogPostingSchema } from '@/components/seo/schemas'
import { buildMetadata } from '@/lib/seo'
import { sanitizeHtml } from '@/lib/sanitize'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const blogs = await getPublishedBlogs()
  return blogs.map((b) => ({
    slug: b.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
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
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const post = await getBlogBySlug(resolvedParams.slug)

  if (!post || post.status !== 'PUBLISHED') {
    notFound()
  }

  return (
    <>
      <Header />
      <main>
        <section className="section" style={{ paddingTop: '160px', paddingBottom: '40px' }}>
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: post.title, href: `/blog/${post.slug}` },
          ]} />
          
          <div style={{ maxWidth: '800px', margin: '2rem auto 0' }}>
            {post.category && <p className="eyebrow">{post.category.name}</p>}
            <h1 style={{ fontSize: '3rem', margin: '0.5rem 0', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              {post.title}
            </h1>
            
            <div style={{ display: 'flex', gap: '1rem', color: '#666', marginTop: '1.5rem', paddingBottom: '2rem', borderBottom: '1px solid #eee' }}>
              <span>&bull;</span>
              <time dateTime={post.publishedAt?.toISOString() || post.createdAt.toISOString()}>
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recently'}
              </time>
            </div>

            {post.content && (
              <div 
                className="prose prose-lg max-w-none mt-12 mb-12"
                style={{ lineHeight: 1.8 }}
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
              />
            )}
            <BlogPostingSchema post={post} />
          </div>
        </section>
        
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  )
}




