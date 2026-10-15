import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getServiceBySlug, getServices } from '@/lib/data/db'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FinalCtaSection } from '@/components/home/final-cta-section'
import { FaqAccordion } from '@/components/ui/faq-accordion'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { FaqSchema } from '@/components/seo/schemas'
import { buildMetadata } from '@/lib/seo'
import { ServiceBookingButton } from '@/components/services/service-booking-button'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const services = await getServices()
  return services.map((s) => ({
    slug: s.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const service = await getServiceBySlug(resolvedParams.slug)

  if (!service) {
    return {}
  }

  return await buildMetadata({
    seoMetadata: service.seoMetadata,
    fallbackTitle: `${service.title} | Apna Cars`,
    fallbackDescription: service.shortDescription || `Experience our ${service.title.toLowerCase()} service with Apna Cars.`,
    path: `/services/${service.slug}`,
  })
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const service = await getServiceBySlug(resolvedParams.slug)

  if (!service || !service.isActive) {
    notFound()
  }

  return (
    <>
      <Header />
      <main>
        <section className="section" style={{ paddingTop: '160px' }}>
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/#services' },
            { label: service.title, href: `/services/${service.slug}` },
          ]} />
          
          <div style={{ maxWidth: '800px', marginTop: '2rem' }}>
            <p className="eyebrow">Service</p>
            <h1 style={{ fontSize: '3.5rem', margin: '0.5rem 0', letterSpacing: '-0.02em' }}>
              {service.title}
            </h1>
            
            <p style={{ fontSize: '1.5rem', color: '#666', marginTop: '1.5rem', lineHeight: 1.4 }}>
              {service.shortDescription}
            </p>

            {service.content && (
              <div style={{ marginTop: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                {service.content}
              </div>
            )}

            <div style={{ marginTop: '3rem' }}>
              <ServiceBookingButton serviceTitle={service.title} />
            </div>
          </div>
        </section>

        {service.faqs && service.faqs.length > 0 && (
          <section className="section faq" style={{ backgroundColor: '#f9f9f9' }}>
            <p className="eyebrow">Need to know</p>
            <h2>Frequently asked <em>questions.</em></h2>
            <FaqAccordion items={service.faqs} />
            <FaqSchema faqs={service.faqs} />
          </section>
        )}
        
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  )
}

