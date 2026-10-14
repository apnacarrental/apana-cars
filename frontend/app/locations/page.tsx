import { MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getLocations } from '@/lib/data/db'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FinalCtaSection } from '@/components/home/final-cta-section'

import { buildMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> { 
  return await buildMetadata({
    fallbackTitle: 'Car Rental Locations in Hyderabad & Outstation | Apna Cars',
    fallbackDescription: 'Explore our 24/7 car rental pickup hubs across Hyderabad, RGIA Airport Shamshabad, Hitec City, Gachibowli, Secunderabad, and Srisailam.',
    path: '/locations'
  }) 
}

export default async function LocationsPage() {
  const locations = await getLocations()

  return (
    <>
      <Header />
      <main>
        <section className="section locations" style={{ paddingTop: '160px' }}>
          <p className="eyebrow">Wherever you&apos;re going</p>
          <h1>Serving journeys across<br /><em>the city &amp; beyond.</em></h1>
          
          {locations && locations.length > 0 ? (
            <div className="location-list" style={{ marginTop: '3rem' }}>
              {locations.map((loc) => (
                <Link href={`/locations/${loc.slug}`} key={loc.id}>
                  <MapPin size={17} />
                  {loc.name}
                  <ArrowRight size={15} />
                </Link>
              ))}
            </div>
          ) : (
            <p>No locations available at the moment.</p>
          )}
        </section>
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  )
}
