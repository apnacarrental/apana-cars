import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, ArrowLeft, ArrowRight } from 'lucide-react'
import { getLocationBySlug, getLocations } from '@/lib/data/db'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FinalCtaSection } from '@/components/home/final-cta-section'
import { FaqAccordion } from '@/components/ui/faq-accordion'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { FaqSchema } from '@/components/seo/schemas'
import { InternalLinks } from '@/components/seo/internal-links'
import { buildMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0

export async function generateStaticParams() {
  const locations = await getLocations()
  return locations.map((loc) => ({
    slug: loc.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const location = await getLocationBySlug(resolvedParams.slug)

  if (!location) {
    return {}
  }

  return await buildMetadata({
    seoMetadata: location.seoMetadata,
    fallbackTitle: `Car Rental in ${location.name} | Apna Cars`,
    fallbackDescription: location.description || `Rent a premium car in ${location.name} with Apna Cars.`,
    path: `/locations/${location.slug}`,
  })
}

export default async function LocationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const location = await getLocationBySlug(resolvedParams.slug)

  if (!location || !location.isActive) {
    notFound()
  }

  return (
    <>
      <Header />
      <main>
        <section className="section bg-[var(--paper-subtle)]" style={{ paddingTop: '150px', paddingBottom: '80px' }}>
          <div className="max-w-4xl">
            <div className="mb-6">
              <Breadcrumbs items={[
                { label: 'Home', href: '/' },
                { label: 'Locations', href: '/locations' },
                { label: location.name, href: `/locations/${location.slug}` },
              ]} />
            </div>
            
            <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-neutral-900 text-white mb-3">
              {location.type ? (location.type.charAt(0) + location.type.slice(1).toLowerCase()) : 'Location'}
            </span>
            
            <h1 className="text-3xl sm:text-5xl font-bold text-neutral-900 tracking-tight flex items-center gap-3 mb-3">
              <MapPin size={36} className="text-[var(--brand-orange)] shrink-0" />
              <span>{location.name}</span>
            </h1>
            
            {location.parent && (
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4">
                Part of {location.parent.name}
              </p>
            )}
            
            {location.description && (
              <p className="text-base sm:text-lg text-[var(--soft)] leading-relaxed mb-8">
                {location.description}
              </p>
            )}

            <div>
              <a className="button button-dark" href="/#book">
                Book a cab in {location.name} <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </section>

        {location.children && location.children.length > 0 && (
          <section className="section locations bg-white border-t border-[var(--line)]">
            <p className="eyebrow">Covered Areas</p>
            <h2>Explore {location.name} &amp; Hubs</h2>
            <div className="location-list mt-8">
              {location.children.map((child: any) => (
                <Link href={`/locations/${child.slug}`} key={child.id}>
                  <MapPin size={16} />
                  <span>{child.name}</span>
                  <ArrowRight size={14} />
                </Link>
              ))}
            </div>
          </section>
        )}

        {location.faqs && location.faqs.length > 0 && (
          <section className="section faq bg-[var(--paper)] border-t border-[var(--line)]">
            <p className="eyebrow">Need to know</p>
            <h2>Frequently asked <em>questions.</em></h2>
            <FaqAccordion items={location.faqs} />
            <FaqSchema faqs={location.faqs} />
          </section>
        )}
        
        <div className="max-w-5xl mx-auto px-[5%] py-6">
          <InternalLinks path={`/locations/${location.slug}`} />
        </div>
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  )
}
