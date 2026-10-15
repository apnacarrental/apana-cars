import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { getServices } from '@/lib/data/db'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FinalCtaSection } from '@/components/home/final-cta-section'
import { buildMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const DEDICATED_ROUTES = new Set([
  'airport-cabs',
  'hourly-cabs',
  'sightseeing-cabs',
  'outstation-cabs',
  'srisailam-cabs',
  'force-urbania-rent-in-hyderabad'
])

export async function generateMetadata(): Promise<Metadata> {
  return await buildMetadata({
    fallbackTitle: 'Our Chauffeur & Cab Rental Services | Apna Cars Hyderabad',
    fallbackDescription: 'Explore premium airport transfers, hourly packages, outstation journeys, and luxury rentals across Hyderabad.',
    path: '/services',
  })
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <>
      <Header />
      <main>
        <section className="section bg-[var(--paper-subtle)]" style={{ paddingTop: '150px', paddingBottom: '90px' }}>
          <div className="section-head mb-12">
            <div>
              <p className="eyebrow">What we offer</p>
              <h1>Built around <em>your</em> journey.</h1>
            </div>
            <p className="text-sm text-[var(--soft)] max-w-sm m-0">
              Professional chauffeur solutions tailored for business travelers, families, tourists, and corporate teams across Hyderabad.
            </p>
          </div>
          
          <div className="max-w-7xl mx-auto">
            {services && services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((svc, index) => {
                  const href = DEDICATED_ROUTES.has(svc.slug) ? `/${svc.slug}` : `/services/${svc.slug}`
                  return (
                    <article key={svc.id} className="fleet-card p-7 bg-white rounded-2xl border border-[var(--line)] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-mono text-xs font-bold text-neutral-400">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-orange)] bg-[var(--brand-orange-light)] px-2.5 py-0.5 rounded-full border border-orange-200/60">
                            Verified Service
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 tracking-tight mb-2.5">
                          {svc.title}
                        </h3>
                        <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed mb-6">
                          {svc.shortDescription}
                        </p>
                      </div>
                      
                      <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between mt-auto">
                        <Link 
                          href={href} 
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-[var(--brand-orange)] transition-colors group/btn py-1"
                        >
                          <span>LEARN MORE</span>
                          <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </div>
                    </article>
                  )
                })}
              </div>
            ) : (
              <p className="text-neutral-500 py-12 text-center">No services available at the moment.</p>
            )}
          </div>
        </section>
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  )
}
