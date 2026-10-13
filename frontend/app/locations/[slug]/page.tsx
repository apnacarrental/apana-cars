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
        <section className="section" style={{ paddingTop: '160px' }}>
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Locations', href: '/locations' },
            { label: location.name, href: `/locations/${location.slug}` },
          ]} />
          
          <div style={{ maxWidth: '800px', marginTop: '2rem' }}>
            <p className="eyebrow">{location.type.charAt(0) + location.type.slice(1).toLowerCase()}</p>
            <h1 style={{ fontSize: '3rem', margin: '0.5rem 0', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <MapPin size={40} /> {location.name}
            </h1>
            
            {location.parent && (
              <p style={{ fontSize: '1.2rem', color: '#666' }}>Part of {location.parent.name}</p>
            )}
            
            {location.description && (
              <p style={{ fontSize: '1.2rem', marginTop: '1.5rem', lineHeight: 1.6 }}>{location.description}</p>
            )}

            <div style={{ marginTop: '3rem' }}>
              <a className="button button-dark" href="/#book">
                Book a car in {location.name} <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {location.children && location.children.length > 0 && (
          <section className="section locations" style={{ backgroundColor: '#f9f9f9' }}>
            <p className="eyebrow">Areas</p>
            <h2>Explore {location.name}</h2>
            <div className="location-list" style={{ marginTop: '2rem' }}>
              {location.children.map((child: any) => (
                <Link href={`/locations/${child.slug}`} key={child.id}>
                  <MapPin size={17} />
                  {child.name}
                  <ArrowRight size={15} />
                </Link>
              ))}
            </div>
          </section>
        )}

        {location.faqs && location.faqs.length > 0 && (
          <section className="section faq">
            <p className="eyebrow">Need to know</p>
            <h2>Frequently asked <em>questions.</em></h2>
            <FaqAccordion items={location.faqs} />
            <FaqSchema faqs={location.faqs} />
          </section>
        )}
        
        <div className="max-w-5xl mx-auto px-[5%]"><InternalLinks path={"/locations/${location.slug}"} /></div>
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  )
}



