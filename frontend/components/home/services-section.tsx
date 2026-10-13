import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getServices } from '@/lib/data/db'
import { ClientServicesGrid } from '@/components/home/client-services-grid'

export async function ServicesSection() {
  const services = await getServices()

  if (!services || services.length === 0) return null

  return (
    <section id="services" className="section services">
      <div className="section-head">
        <div>
          <p className="eyebrow">Ways to move</p>
          <h2>Built around <em>your</em> journey.</h2>
        </div>
        <p>Whatever the destination, there&apos;s an Apna way to get there.</p>
      </div>

      <ClientServicesGrid services={services} />
    </section>
  )
}
