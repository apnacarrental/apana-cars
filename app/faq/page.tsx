import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FaqSection } from '@/components/home/faq-section'
import { FinalCtaSection } from '@/components/home/final-cta-section'

import { buildMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> { return await buildMetadata({
  fallbackTitle: 'FAQ | Apna Car Rental',
  fallbackDescription: 'Frequently asked questions about renting a car with Apna.',
  path: '/faq'
}) }

export default function FaqPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '100px' }}>
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  )
}

