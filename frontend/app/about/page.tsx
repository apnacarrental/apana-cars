import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { AboutSection } from '@/components/home/about-section'
import { CorporateSection } from '@/components/home/corporate-section'
import { TestimonialsSection } from '@/components/home/testimonials-section'
import { FinalCtaSection } from '@/components/home/final-cta-section'

import { buildMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> { return await buildMetadata({
  fallbackTitle: 'About Us | Apna Car Rental',
  fallbackDescription: 'Learn about our journey and why we are the best choice for your car rental needs.',
  path: '/about'
}) }

export default function AboutPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '100px' }}>
        <AboutSection />
        <CorporateSection />
        <TestimonialsSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  )
}

