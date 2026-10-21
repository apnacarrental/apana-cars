import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getServices } from '@/lib/data/db'
import { ClientServicesGrid } from '@/components/home/client-services-grid'

export async function ServicesSection() {
  const services = await getServices()

  if (!services || services.length === 0) return null

  // Display only 6 services on the homepage to maintain a balanced 2-row x 3-col grid
  const displayedServices = services.slice(0, 6)

  return (
    <section id="services" className="section services">
      <div className="section-head">
        <div>
          <p className="eyebrow">Ways to move</p>
          <h2>Built around <em>your</em> journey.</h2>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <p className="text-sm text-[var(--soft)] max-w-xs m-0">
            Whatever the destination, there&apos;s an Apna way to get there.
          </p>
          <Link 
            className="text-button text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-[var(--brand-orange)] shrink-0" 
            href="/services"
          >
            View all services <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      <ClientServicesGrid services={displayedServices} />

      <div className="mt-12 flex justify-center">
        <Link
          href="/services"
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
        >
          <span>View All Services</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  )
}

