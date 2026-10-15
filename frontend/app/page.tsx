import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/home/hero'
import { BookingSection } from '@/components/home/booking-section'
import { TrustBar } from '@/components/home/trust-bar'
import { AboutSection } from '@/components/home/about-section'
import { ServicesSection } from '@/components/home/services-section'
import { PopularSightseeingSection } from '@/components/home/popular-sightseeing-section'
import { HomeCabPackages } from '@/components/home/home-cab-packages'
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

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> { return await buildMetadata({
  fallbackTitle: 'Apna Cars | Hyderabad Cab Services & Chauffeur Travel',
  fallbackDescription: 'Premium chauffeur-driven cabs, airport transfers, sightseeing tours, and outstation rentals across Hyderabad and beyond.',
  path: '/',
}) }

export default function Page() {
  return (
    <>
      <Header />
      <main id="home">
        <HeroSection />
        <BookingSection />
        <TrustBar />
        <AboutSection />
        <ServicesSection />
        <PopularSightseeingSection />
        <HyderabadTravelGuideCards />
        <HomeCabPackages />
        <FleetSection />
        <BenefitsSection />
        <ProcessSection />
        <CorporateSection />
        <LocationsSection />
        <TestimonialsSection />
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
            '@type': 'AutoRental', 
            name: 'Apna Cars', 
            url: getBaseUrl(), 
            telephone: '+91 99881 23444', 
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Garden colony, H. No - 4-4-123, opp. SBI ATM, Quthbullapur Garden Colony, Bhagyalaxmi Nagar, Quthbullapur',
              addressLocality: 'Hyderabad',
              addressRegion: 'Telangana',
              postalCode: '500055',
              addressCountry: 'IN'
            },
            areaServed: 'Hyderabad' 
          }) 
        }} 
      />
    </>
  )
}

