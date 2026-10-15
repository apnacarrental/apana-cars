import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getCars } from '@/lib/data/db'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FinalCtaSection } from '@/components/home/final-cta-section'
import { getSafeImageUrl } from '@/lib/utils/image'
import { getCarStartingPricePerKm } from '@/lib/utils/pricing'
import { buildMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> {
  return await buildMetadata({
    fallbackTitle: 'Our Fleet | Apna Car Rental',
    fallbackDescription: 'Explore our fleet of well-maintained cars for rent.',
    path: '/fleet',
  })
}

export default async function FleetPage() {
  const cars = await getCars()

  return (
    <>
      <Header />
      <main>
        <section className="section fleet" style={{ paddingTop: '150px', paddingBottom: '90px' }}>
          <div className="section-head mb-12">
            <div>
              <p className="eyebrow">The Apna fleet</p>
              <h1>Vehicles for <em>every</em> group.</h1>
            </div>
            <p className="text-sm text-[var(--soft)] max-w-sm m-0">
              Dedicated outstation vehicles with high ground clearance, generous boot space, and verified professional chauffeurs.
            </p>
          </div>
          
          {cars && cars.length > 0 ? (
            <div className="fleet-grid">
              {cars.map((car) => {
                const imgUrl = getSafeImageUrl(car.images[0]?.media?.secureUrl, car.name || car.slug)
                const metaParts = [
                  car.seats ? `${car.seats} seats` : null,
                  car.luggage ? `${car.luggage} bags` : null,
                  car.transmission || null,
                ].filter(Boolean)
                const meta = metaParts.join(' • ')
                const priceDisplay = getCarStartingPricePerKm(car)
                return (
                  <article className="fleet-card group flex flex-col justify-between" key={car.id}>
                    <div className="fleet-photo relative h-60 bg-[#f5f2ea] overflow-hidden">
                      <Image 
                        src={imgUrl} 
                        alt={`${car.name} rental car in Hyderabad`} 
                        fill 
                        sizes="(max-width: 800px) 100vw, 33vw" 
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-xs font-bold text-neutral-900 shadow-sm border border-neutral-100">
                        {priceDisplay}
                      </div>
                    </div>
                    <div className="fleet-info p-6 flex flex-col flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-500 mb-1.5 block">
                        {car.category?.name || 'Rental Cab'}
                      </span>
                      <h3 className="text-xl font-bold text-neutral-900 group-hover:text-black tracking-tight mb-1.5">
                        {car.name}
                      </h3>
                      <span className="fleet-meta text-xs text-neutral-500 font-medium mb-3">{meta}</span>
                      {car.shortDescription && (
                        <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed line-clamp-2 mb-4">
                          {car.shortDescription}
                        </p>
                      )}
                      <div className="fleet-bottom flex items-center justify-between pt-4 mt-auto border-t border-[var(--line)]">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block">Rate</span>
                          <strong className="text-sm font-bold text-neutral-900">{priceDisplay}</strong>
                        </div>
                        <Link 
                          href={`/fleet/${car.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-[var(--brand-orange)] transition-colors group/btn py-1"
                        >
                          <span>INQUIRE</span>
                          <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <p className="text-neutral-500 py-12 text-center">No cars available at the moment. Please check back later.</p>
          )}
        </section>
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  )
}
