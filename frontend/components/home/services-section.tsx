import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getServices } from '@/lib/data/db'

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
      <div className="service-grid">
        {services.map((srv) => (
          <Link className="service-card" href={`/${srv.slug}`} key={srv.id}>
            <span className="service-number">{srv.sortOrder.toString().padStart(2, '0')}</span>
            <div>
              <h3>{srv.title}</h3>
              <p>{srv.shortDescription}</p>
            </div>
            <ArrowRight className="service-arrow" size={21} />
          </Link>
        ))}
      </div>
    </section>
  )
}
