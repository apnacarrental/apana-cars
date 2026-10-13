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
          <h2>Find your <em>perfect</em> drive.</h2>
        </div>
        <Link className="text-button" href="/fleet">
          View all cars <ArrowRight size={17} />
        </Link>
      </div>

      <ClientFleetGrid cars={cars} />
    </section>
  )
}
