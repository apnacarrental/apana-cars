import { notFound } from 'next/navigation'
import { ArrowRight, MapPin, Navigation, Clock, Gauge, IndianRupee } from 'lucide-react'
import { getRouteBySlug } from '@/lib/data/db'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FinalCtaSection } from '@/components/home/final-cta-section'
import { FaqAccordion } from '@/components/ui/faq-accordion'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { FaqSchema } from '@/components/seo/schemas'
import { buildMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const route = await getRouteBySlug(resolvedParams.slug)

  if (!route) {
    return {}
  }

  return await buildMetadata({
    seoMetadata: route.seoMetadata,
    fallbackTitle: `${route.origin} to ${route.destination} Cab Rental | Apna Cars`,
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
        <section className="section" style={{ paddingTop: '150px', paddingBottom: '90px' }}>
          <div className="mb-6">
            <Breadcrumbs items={[
              { label: 'Home', href: '/' },
              { label: 'Routes', href: '/routes' },
              { label: route.title, href: `/routes/${route.slug}` },
            ]} />
          </div>
          
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold uppercase tracking-wider mb-4">
              <Navigation size={12} className="text-blue-600" />
              <span>{route.origin} to {route.destination}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold text-neutral-900 tracking-tight mb-8">
              {route.title}
            </h1>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 bg-white rounded-2xl border border-[var(--line)] shadow-xs mb-8">
              {route.distance && (
                <div className="p-3 bg-[var(--paper-subtle)] rounded-xl border border-[var(--line)]">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                    <Gauge size={12} className="text-[var(--brand-orange)]" />
                    <span>Distance</span>
                  </div>
                  <span className="text-lg font-bold text-neutral-900">{route.distance} km</span>
                </div>
              )}
              {route.duration && (
                <div className="p-3 bg-[var(--paper-subtle)] rounded-xl border border-[var(--line)]">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                    <Clock size={12} className="text-[var(--brand-orange)]" />
                    <span>Est. Time</span>
                  </div>
                  <span className="text-lg font-bold text-neutral-900">{route.duration}</span>
                </div>
              )}
              {route.startingPrice && (
                <div className="p-3 bg-[var(--paper-subtle)] rounded-xl border border-[var(--line)] col-span-2 sm:col-span-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                    <IndianRupee size={12} className="text-[var(--brand-orange)]" />
                    <span>Starting Fare</span>
                  </div>
                  <span className="text-lg font-bold text-neutral-900">₹{route.startingPrice.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            {route.content && (
              <div className="prose prose-neutral max-w-none mb-10 leading-relaxed text-neutral-700" dangerouslySetInnerHTML={{ __html: route.content }} />
            )}

            <div>
              <a className="button button-dark" href="/#book">
                Book this route <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </section>

        {route.faqs && route.faqs.length > 0 && (
          <section className="section faq bg-white border-t border-[var(--line)]">
            <p className="eyebrow">Highway Route FAQ</p>
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
