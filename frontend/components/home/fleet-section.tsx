import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getFeaturedCars } from '@/lib/data/db'
import { getSafeImageUrl } from '@/lib/utils/image'
import { getCarStartingPricePerKm } from '@/lib/utils/pricing'

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
      <div className="fleet-grid">
        {cars.map((car) => {
          const imgUrl = getSafeImageUrl(car.images[0]?.media?.secureUrl)
          const metaParts = [
            car.seats ? `${car.seats} seats` : null,
            car.luggage ? `${car.luggage} bags` : null,
          ].filter(Boolean)
          const meta = metaParts.join(' \u2022 ')
          return (
            <article className="fleet-card" key={car.id}>
              <div className="fleet-photo">
                <Image 
                  src={imgUrl} 
                  alt={`${car.name} rental car`} 
                  fill 
                  sizes="(max-width: 800px) 100vw, 33vw" 
                />
              </div>
              <div className="fleet-info">
                <p className="eyebrow">{car.name}</p>
                <h3>{car.shortDescription}</h3>
                <span className="fleet-meta">{meta}</span>
                <div className="fleet-bottom">
                  <strong>{getCarStartingPricePerKm(car)}</strong>
                  <Link href={`/fleet/${car.slug}`}>
                    Book now <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

