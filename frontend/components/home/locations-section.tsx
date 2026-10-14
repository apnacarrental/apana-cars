import { MapPin, ArrowRight } from 'lucide-react'
import { getLocations } from '@/lib/data/db'
import Link from 'next/link'

export async function LocationsSection() {
  const locations = await getLocations()

  if (!locations || locations.length === 0) return null

  return (
    <section id="locations" className="section locations">
      <p className="eyebrow">Wherever you&apos;re going</p>
      <h2>Serving journeys across<br /><em>the city &amp; beyond.</em></h2>
      <div className="location-list">
        {locations.map((loc) => (
          <Link href={`/locations/${loc.slug}`} key={loc.id}>
            <MapPin size={17} />
            {loc.name}
            <ArrowRight size={15} />
          </Link>
        ))}
      </div>
    </section>
  )
}
