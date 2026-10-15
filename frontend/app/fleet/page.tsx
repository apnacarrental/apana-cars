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

export async function generateMetadata(): Promise<Metadata> { return await buildMetadata({
  fallbackTitle: 'Our Fleet | Apna Car Rental',
  fallbackDescription: 'Explore our fleet of well-maintained cars for rent.',
  path: '/fleet'
}) }

export default async function FleetPage() {
  const cars = await getCars()

  return (
    <>
      <Header />
      <main>
        <section className="section fleet" style={{ paddingTop: '160px' }}>
          <div className="section-head">
            <div>
              <p className="eyebrow">The Apna fleet</p>
              <h1>Find your <em>perfect</em> drive.</h1>
            </div>
          </div>
          
          {cars && cars.length > 0 ? (
            <div className="fleet-grid">
              {cars.map((car) => {
                const imgUrl = getSafeImageUrl(car.images[0]?.media?.secureUrl, car.name || car.slug)
                const metaParts = [
                  car.seats ? `${car.seats} seats` : null,
                  car.luggage ? `${car.luggage} bags` : null,
                ].filter(Boolean)
                const meta = metaParts.join(' \u2022 ')
                return (
                  <article className="fleet-card" key={car.id}>
                    <div className="fleet-photo">
                      <Image 
                        src={imgUrl} 
                        alt={`${car.name} rental car`} 
                        fill 
                        sizes="(max-width: 800px) 100vw, 33vw" 
                      />
                    </div>
                    <div className="fleet-info">
                      <p className="eyebrow">{car.name}</p>
                      <h3>{car.shortDescription}</h3>
                      <span className="fleet-meta">{meta}</span>
                      <div className="fleet-bottom">
                        <strong>{getCarStartingPricePerKm(car)}</strong>
                        <Link href={`/fleet/${car.slug}`}>
                          View details <ArrowRight size={15} />
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <p>No cars available at the moment. Please check back later.</p>
          )}
        </section>
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  )
}


