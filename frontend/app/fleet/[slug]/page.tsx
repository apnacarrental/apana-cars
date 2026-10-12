import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { getCarBySlug, getCars } from '@/lib/data/db'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FinalCtaSection } from '@/components/home/final-cta-section'
import { FaqAccordion } from '@/components/ui/faq-accordion'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { FaqSchema } from '@/components/seo/schemas'
import { getSafeImageUrl } from '@/lib/utils/image'
import { getCarFuelPrices, getCarStartingPricePerKm } from '@/lib/utils/pricing'
import { buildMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const cars = await getCars()
  return cars.map((car) => ({
    slug: car.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const car = await getCarBySlug(resolvedParams.slug)

  if (!car) {
    return {}
  }

  return await buildMetadata({
    seoMetadata: car.seoMetadata,
    fallbackTitle: `${car.name} Rental | Apna Cars`,
    fallbackDescription: car.shortDescription || `Rent a ${car.name} with Apna Cars.`,
    path: `/fleet/${car.slug}`,
  })
}

export default async function CarDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const car = await getCarBySlug(resolvedParams.slug)

  if (!car || !car.isActive) {
    notFound()
  }

  const imgUrl = getSafeImageUrl(car.images[0]?.media?.secureUrl)
  
  const metaParts = [
    car.seats ? `${car.seats} seats` : null,
    car.luggage ? `${car.luggage} bags` : null,
    car.transmission,
    car.fuelType
  ].filter(Boolean)
  const meta = metaParts.join(' • ')
  const fuelPrices = getCarFuelPrices(car)
  const startingPriceText = getCarStartingPricePerKm(car)

  return (
    <>
      <Header />
      <main>
        <section className="section" style={{ paddingTop: '160px' }}>
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Fleet', href: '/fleet' },
            { label: car.name, href: `/fleet/${car.slug}` },
          ]} />
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center', marginTop: '2rem' }}>
            <div style={{ position: 'relative', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
              <Image 
                src={imgUrl} 
                alt={`${car.name} rental car`} 
                fill 
                style={{ objectFit: 'contain' }}
                sizes="(max-width: 800px) 100vw, 50vw" 
              />
            </div>
            
            <div>
              <p className="eyebrow">{(car.brand?.name || 'Apna') + ' • ' + (car.categories[0]?.name || 'Car')}</p>
              <h1 style={{ fontSize: '3rem', margin: '0.5rem 0', letterSpacing: '-0.02em' }}>{car.name}</h1>
              <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '1.5rem' }}>{car.shortDescription}</p>
              
              <div style={{ padding: '1.5rem', backgroundColor: '#f9f9f9', borderRadius: '12px', marginBottom: '2rem' }}>
                <span className="fleet-meta" style={{ fontSize: '1rem' }}>{meta}</span>
                
                <div style={{ marginTop: '1.25rem' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                    Pricing per kilometer
                  </h4>
                  {fuelPrices.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
                      {fuelPrices.map((item) => (
                        <div key={item.type} style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '0.75rem 1rem' }}>
                          <span style={{ fontSize: '0.8rem', color: '#666', display: 'block' }}>{item.type}</span>
                          <strong style={{ fontSize: '1.2rem', color: '#000' }}>₹{item.price.toLocaleString('en-IN')}<span style={{ fontSize: '0.8rem', fontWeight: 400, color: '#666' }}>/km</span></strong>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333', marginBottom: '1.25rem' }}>
                      Price on request
                    </p>
                  )}
                </div>

                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
                  <span style={{ fontSize: '0.9rem', color: '#666' }}>Rate: <strong style={{ color: '#000' }}>{startingPriceText}</strong></span>
                  <a className="button button-dark" href="/#book">
                    Book now <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {car.faqs && car.faqs.length > 0 && (
          <section className="section faq" style={{ backgroundColor: '#f9f9f9' }}>
            <p className="eyebrow">Need to know</p>
            <h2>Frequently asked <em>questions.</em></h2>
            <FaqAccordion items={car.faqs} />
            <FaqSchema faqs={car.faqs} />
          </section>
        )}
        
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  )
}

