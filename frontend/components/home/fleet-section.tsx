import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getFeaturedCars } from '@/lib/data/db'
import { ClientFleetGrid } from '@/components/home/client-fleet-grid'

export async function FleetSection() {
  const cars = await getFeaturedCars()

  if (!cars || cars.length === 0) return null

  return (
    <section id="fleet" className="section fleet">
      <div className="section-head">
        <div>
          <p className="eyebrow">The Apna fleet</p>
          <h2>Vehicles for <em>every</em> group.</h2>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <p className="text-sm text-[var(--soft)] max-w-xs m-0">
            Dedicated outstation vehicles with high ground clearance and generous luggage room.
          </p>
          <Link className="text-button text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-[var(--brand-orange)] shrink-0" href="/fleet">
            View all cars <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      <ClientFleetGrid cars={cars} />
    </section>
  )
}
