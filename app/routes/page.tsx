import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { getRoutes } from '@/lib/data/db'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FinalCtaSection } from '@/components/home/final-cta-section'
import { buildMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> { return await buildMetadata({
  fallbackTitle: 'Popular Routes | Apna Car Rental',
  fallbackDescription: 'Explore our popular car rental routes and outstation journeys.',
  path: '/routes'
}) }

export default async function RoutesPage() {
  const routes = await getRoutes()

  return (
    <>
      <Header />
      <main>
        <section className="section" style={{ paddingTop: '160px', paddingBottom: '80px' }}>
          <div className="section-head">
            <div>
              <p className="eyebrow">Popular Journeys</p>
              <h1>Top <em>Routes</em>.</h1>
            </div>
          </div>
          
          <div className="max-w-5xl mx-auto px-[5%]">
            {routes && routes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {routes.map((route) => (
                  <article key={route.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                      <MapPin size={16} />
                      <span>{route.origin} to {route.destination}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{route.title}</h3>
                    {route.startingPrice && (
                      <p className="font-semibold text-lg mb-6">From â‚¹{route.startingPrice.toLocaleString('en-IN')}</p>
                    )}
                    <Link href={`/routes/${route.slug}`} className="inline-flex items-center gap-2 font-medium text-black hover:opacity-70">
                      View Route Details <ArrowRight size={16} />
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No routes available at the moment.</p>
            )}
          </div>
        </section>
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  )
}

