import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, Users, Fuel, Sparkles, CheckCircle2 } from 'lucide-react'
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

export const dynamic = 'force-dynamic'
export const revalidate = 0

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

  const imgUrl = getSafeImageUrl(car.images[0]?.media?.secureUrl, car.name || car.slug)
  
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
        <section className="section" style={{ paddingTop: '150px', paddingBottom: '90px' }}>
          <div className="mb-6">
            <Breadcrumbs items={[
              { label: 'Home', href: '/' },
              { label: 'Fleet', href: '/fleet' },
              { label: car.name, href: `/fleet/${car.slug}` },
            ]} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Image Presentation */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-[#f5f2ea] border border-[var(--line)] shadow-sm">
              <Image 
                src={imgUrl} 
                alt={`${car.name} rental car`} 
                fill 
                className="object-contain p-4 transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 800px) 100vw, 50vw" 
                priority
              />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-neutral-900 border border-[var(--line)] shadow-xs">
                  <Sparkles size={11} className="text-[var(--brand-orange)]" />
                  {car.category?.name || 'Verified Fleet'}
                </span>
              </div>
            </div>
            
            {/* Vehicle Details Card */}
            <div>
              <p className="eyebrow mb-2">{(car.brand?.name || 'Apna Cars') + ' • ' + (car.category?.name || 'Car')}</p>
              <h1 className="text-3xl sm:text-5xl font-bold text-neutral-900 tracking-tight mb-3">
                {car.name}
              </h1>
              <p className="text-sm sm:text-base text-[var(--soft)] leading-relaxed mb-6">
                {car.shortDescription}
              </p>
              
              <div className="p-6 sm:p-7 bg-white rounded-2xl border border-[var(--line)] shadow-xs mb-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700 pb-4 border-b border-[var(--line)]">
                  <Users size={15} className="text-[var(--brand-orange)]" />
                  <span>{meta}</span>
                </div>
                
                <div className="mt-5">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-3">
                    Pricing Tariff per Kilometer
                  </h4>
                  {fuelPrices.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                      {fuelPrices.map((item) => (
                        <div key={item.type} className="bg-[var(--paper-subtle)] border border-[var(--line)] rounded-xl p-3.5">
                          <span className="text-[11px] font-medium text-[var(--soft)] block">{item.type}</span>
                          <strong className="text-lg font-bold text-neutral-900">₹{item.price.toLocaleString('en-IN')}<span className="text-xs font-normal text-neutral-500">/km</span></strong>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-base font-bold text-neutral-800 mb-5">
                      Price on request
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[var(--line)]">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block">Estimated Rate</span>
                    <strong className="text-base font-extrabold text-neutral-900">{startingPriceText}</strong>
                  </div>
                  <a className="button button-dark" href="/#book">
                    Book this car <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {car.faqs && car.faqs.length > 0 && (
          <section className="section faq bg-white border-t border-[var(--line)]">
            <p className="eyebrow">Vehicle Specifics</p>
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
