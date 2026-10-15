import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getServices } from '@/lib/data/db'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FinalCtaSection } from '@/components/home/final-cta-section'
import { buildMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> { return await buildMetadata({
  fallbackTitle: 'Our Services | Apna Cars',
  fallbackDescription: 'Explore the premium cab and travel services we offer across Hyderabad.',
  path: '/services'
}) }

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <>
      <Header />
      <main>
        <section className="section" style={{ paddingTop: '160px', paddingBottom: '80px' }}>
          <div className="section-head">
            <div>
              <p className="eyebrow">What we offer</p>
              <h1>Premium <em>Services</em>.</h1>
            </div>
          </div>
          
          <div className="max-w-5xl mx-auto px-[5%]">
            {services && services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map((svc) => (
                  <article key={svc.id} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-2xl font-bold mb-4">{svc.title}</h3>
                    <p className="text-gray-600 mb-6">{svc.shortDescription}</p>
                    <Link href={`/services/${svc.slug}`} className="inline-flex items-center gap-2 font-medium text-black hover:opacity-70">
                      Learn more <ArrowRight size={16} />
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No services available at the moment.</p>
            )}
          </div>
        </section>
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  )
}

