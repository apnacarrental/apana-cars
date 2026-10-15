import Link from 'next/link'
import { ArrowRight, MapPin, Navigation, Clock } from 'lucide-react'
import { getRoutes } from '@/lib/data/db'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FinalCtaSection } from '@/components/home/final-cta-section'
import { buildMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> {
  return await buildMetadata({
    fallbackTitle: 'Popular Highway Routes & Outstation Cabs | Apna Cars',
    fallbackDescription: 'Explore top highway corridors, one-way drops, and outstation cab fares from Hyderabad with verified chauffeurs.',
    path: '/routes',
  })
}

export default async function RoutesPage() {
  const routes = await getRoutes()

  return (
    <>
      <Header />
      <main>
        <section className="section bg-[var(--paper-subtle)]" style={{ paddingTop: '150px', paddingBottom: '90px' }}>
          <div className="section-head mb-12">
            <div>
              <p className="eyebrow">Highway Corridors</p>
              <h1>Popular <em>Routes</em> &amp; Fares.</h1>
            </div>
            <p className="text-sm text-[var(--soft)] max-w-sm m-0">
              Reliable intercity transfers and roundtrip highway connections across Telangana, Andhra Pradesh, and South India.
            </p>
          </div>
          
          <div className="max-w-7xl mx-auto">
            {routes && routes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {routes.map((route) => (
                  <article key={route.id} className="fleet-card p-6 bg-white rounded-2xl border border-[var(--line)] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3.5">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                          <Navigation size={12} className="text-blue-600" />
                          <span>{route.origin} → {route.destination}</span>
                        </span>
                        {route.duration && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-500">
                            <Clock size={12} />
                            {route.duration}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-neutral-900 tracking-tight mb-2">
                        {route.title}
                      </h3>
                      
                      {route.content && (
                        <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed line-clamp-2 mb-4">
                          {route.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()}
                        </p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block">Starting Fare</span>
                        <strong className="text-base font-extrabold text-neutral-900">
                          {route.startingPrice ? `₹${route.startingPrice.toLocaleString('en-IN')}` : 'Price on request'}
                        </strong>
                      </div>
                      <Link 
                        href={`/routes/${route.slug}`} 
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-[var(--brand-orange)] transition-colors group/btn py-1"
                      >
                        <span>DETAILS</span>
                        <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-neutral-500 py-12 text-center">No routes available at the moment.</p>
            )}
          </div>
        </section>
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  )
}
