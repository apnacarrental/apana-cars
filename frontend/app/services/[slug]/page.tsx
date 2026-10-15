import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'
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
    fallbackTitle: `${service.title} | Apna Cars Hyderabad`,
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
        <section className="section" style={{ paddingTop: '150px', paddingBottom: '90px' }}>
          <div className="mb-6">
            <Breadcrumbs items={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: service.title, href: `/services/${service.slug}` },
            ]} />
          </div>
          
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[var(--brand-orange)] bg-[var(--brand-orange-light)] border border-orange-200/60 mb-4">
              <Sparkles size={12} />
              Apna Service Solution
            </span>

            <h1 className="text-3xl sm:text-5xl font-bold text-neutral-900 tracking-tight mb-4">
              {service.title}
            </h1>
            
            <p className="text-base sm:text-xl text-[var(--soft)] leading-relaxed mb-8">
              {service.shortDescription}
            </p>

            {service.content && (
              <div 
                className="prose prose-neutral max-w-none mb-10 p-8 bg-white rounded-2xl border border-[var(--line)] shadow-xs leading-relaxed text-neutral-700" 
                dangerouslySetInnerHTML={{ __html: service.content }} 
              />
            )}

            <div className="mt-8">
              <ServiceBookingButton serviceTitle={service.title} />
            </div>
          </div>
        </section>

        {service.faqs && service.faqs.length > 0 && (
          <section className="section faq bg-white border-t border-[var(--line)]">
            <p className="eyebrow">Service Inquiries</p>
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
