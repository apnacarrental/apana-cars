import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/home/hero'
import { BookingSection } from '@/components/home/booking-section'
import { QuickServicesBar } from '@/components/home/quick-services-bar'
import { FleetShowcaseStrip } from '@/components/home/fleet-showcase-strip'
import { TrustBar } from '@/components/home/trust-bar'
import { AboutSection } from '@/components/home/about-section'
import { ServicesSection } from '@/components/home/services-section'
import { PopularSightseeingSection } from '@/components/home/popular-sightseeing-section'
import { HomeCabPackages } from '@/components/home/home-cab-packages'
import { HomeRoutesSection } from '@/components/home/routes-section'
import { FleetSection } from '@/components/home/fleet-section'
import { BenefitsSection } from '@/components/home/benefits-section'
import { ProcessSection } from '@/components/home/process-section'
import { CorporateSection } from '@/components/home/corporate-section'
import { LocationsSection } from '@/components/home/locations-section'
import { TestimonialsSection } from '@/components/home/testimonials-section'
import { HyderabadTravelGuideCards } from '@/components/home/hyderabad-travel-guide-cards'
import { HomeBlogSection } from '@/components/home/home-blog-section'
import { FaqSection } from '@/components/home/faq-section'
import { FinalCtaSection } from '@/components/home/final-cta-section'
import { buildMetadata, getBaseUrl } from '@/lib/seo'
import type { Metadata } from 'next'

import { getServices, getCars, getReviewBadgeSettings } from '@/lib/data/db'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: {
    absolute: 'Best Cab service in Hyderabad | Outstation Cabs in Hyderabad | Hyderabad to Srisailam Taxi Services',
  },
  description: 'Apna Car Rental: Best Cab service in Hyderabad | Outstation Cabs in Hyderabad | Hyderabad to Srisailam Taxi Services',
  alternates: {
    canonical: 'https://www.apnacarrental.in',
  },
  openGraph: {
    title: 'Best Cab service in Hyderabad | Outstation Cabs in Hyderabad | Hyderabad to Srisailam Taxi Services',
    description: 'Apna Car Rental: Best Cab service in Hyderabad | Outstation Cabs in Hyderabad | Hyderabad to Srisailam Taxi Services',
    url: 'https://www.apnacarrental.in',
    siteName: 'Apna Car Rental',
    type: 'website',
    images: [{ url: 'https://www.apnacarrental.in/images/hero-car.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Cab service in Hyderabad | Outstation Cabs in Hyderabad | Hyderabad to Srisailam Taxi Services',
    description: 'Apna Car Rental: Best Cab service in Hyderabad | Outstation Cabs in Hyderabad | Hyderabad to Srisailam Taxi Services',
    images: ['https://www.apnacarrental.in/images/hero-car.png'],
  },
}







export default async function Page() {
  const [services, cars, reviewSettings] = await Promise.all([
    getServices(),
    getCars(),
    getReviewBadgeSettings()
  ])

  return (
    <>
      <Header />
      <main id="home">
        <HeroSection {...reviewSettings} />
        <QuickServicesBar services={services} />
        <FleetShowcaseStrip cars={cars} />
        <BookingSection />
        <AboutSection />
        <ServicesSection />
        <PopularSightseeingSection />
        <HomeRoutesSection />
        <HyderabadTravelGuideCards />
        <HomeCabPackages />
        <FleetSection />
        <BenefitsSection />
        <ProcessSection />
        <CorporateSection />
        <LocationsSection />
        <TestimonialsSection settings={reviewSettings} />
        <HomeBlogSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify({ 
            '@context': 'https://schema.org', 
            '@type': 'TaxiService', 
            name: 'Apna Car Rental', 
            description: 'Apna Car Rental: Best Cab service in Hyderabad | Outstation Cabs in Hyderabad | Hyderabad to Srisailam Taxi Services',
            url: getBaseUrl(), 
            telephone: '+91 99881 23444', 
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Flat no.403, saraswathi kunj, opp. Krishna Kunj Gardens, Vimana Puri, Quthbullapur',
              addressLocality: 'Hyderabad',
              addressRegion: 'Telangana',
              postalCode: '500055',
              addressCountry: 'IN'
            },
            hasMap: 'https://share.google/z8cDjKFU53sT1UXHv',
            sameAs: ['https://share.google/z8cDjKFU53sT1UXHv'],
            areaServed: 'Hyderabad' 
          }) 
        }} 
      />
    </>
  )
}

