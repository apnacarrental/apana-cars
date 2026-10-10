import { notFound } from 'next/navigation'
import { ArrowRight, MapPin } from 'lucide-react'
import { getRouteBySlug } from '@/lib/data/db'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FinalCtaSection } from '@/components/home/final-cta-section'
import { FaqAccordion } from '@/components/ui/faq-accordion'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { FaqSchema } from '@/components/seo/schemas'
import { buildMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const route = await getRouteBySlug(resolvedParams.slug)

  if (!route) {
    return {}
  }

  return await buildMetadata({
    seoMetadata: route.seoMetadata,
    fallbackTitle: `${route.origin} to ${route.destination} Car Rental | Apna Cars`,
    fallbackDescription: `Book a comfortable car from ${route.origin} to ${route.destination}. ${route.title}`,
    path: `/routes/${route.slug}`,
  })
}

export default async function RouteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const route = await getRouteBySlug(resolvedParams.slug)

  if (!route || !route.isActive) {
    notFound()
  }

  return (
    <>
      <Header />
      <main>
        <section className="section" style={{ paddingTop: '160px' }}>
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Routes', href: '/routes' },
            { label: route.title, href: `/routes/${route.slug}` },
          ]} />
          
          <div style={{ maxWidth: '800px', marginTop: '2rem' }}>
            <p className="eyebrow">Route</p>
            <h1 style={{ fontSize: '3rem', margin: '0.5rem 0', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              {route.origin} <ArrowRight size={32} /> {route.destination}
            </h1>
            
            <p style={{ fontSize: '1.5rem', color: '#666', marginTop: '1.5rem' }}>
              {route.title}
            </p>

            <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
              {route.distance && (
                <div>
                  <strong style={{ display: 'block', fontSize: '0.9rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Distance</strong>
                  <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>{route.distance} km</span>
                </div>
              )}
              {route.duration && (
                <div>
                  <strong style={{ display: 'block', fontSize: '0.9rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Est. Time</strong>
                  <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>{route.duration}</span>
                </div>
              )}
              {route.startingPrice && (
                <div>
                  <strong style={{ display: 'block', fontSize: '0.9rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Starting From</strong>
                  <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>â‚¹{route.startingPrice.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            {route.content && (
              <div style={{ marginTop: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                {route.content}
              </div>
            )}

            <div style={{ marginTop: '3rem' }}>
              <a className="button button-dark" href="/#book">
                Book this route <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {route.faqs && route.faqs.length > 0 && (
          <section className="section faq" style={{ backgroundColor: '#f9f9f9' }}>
            <p className="eyebrow">Need to know</p>
            <h2>Frequently asked <em>questions.</em></h2>
            <FaqAccordion items={route.faqs} />
            <FaqSchema faqs={route.faqs} />
          </section>
        )}
        
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  )
}

