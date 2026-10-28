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
      <div className="section-head mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Ways to move</p>
          <h2>Built around <em>your</em> journey.</h2>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <p className="text-sm text-[var(--soft)] max-w-xs m-0">
            Whatever the destination, there&apos;s an Apna way to get there.
          </p>
          <Link 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900 bg-white hover:bg-neutral-900 hover:text-white px-5 py-2.5 rounded-lg border border-neutral-300 transition-all shadow-xs shrink-0" 
            href="/services"
          >
            <span>View all services</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <ClientServicesGrid services={displayedServices} />

      <div className="mt-12 flex justify-center">
        <Link
          href="/services"
          className="button button-dark !text-white !bg-neutral-950 hover:!bg-neutral-800 inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
        >
          <span className="!text-white font-bold">View All Services</span>
          <ArrowRight size={15} className="!text-white" />
        </Link>
      </div>
    </section>
  )
}
