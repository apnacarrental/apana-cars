'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight, Sparkles, Fuel, Users, Gauge } from 'lucide-react'
import { getSafeImageUrl } from '@/lib/utils/image'
import { getCarStartingPricePerKm } from '@/lib/utils/pricing'

interface ClientFleetGridProps {
  cars: any[]
}

export function ClientFleetGrid({ cars }: ClientFleetGridProps) {
  return (
    <div className="fleet-grid">
      {cars.map((car, index) => {
        const imgUrl = getSafeImageUrl(car.images?.[0]?.media?.secureUrl)
        const metaParts = [
          car.seats ? `${car.seats} seats` : null,
          car.luggage ? `${car.luggage} bags` : null,
          car.transmission || null
        ].filter(Boolean)
        const meta = metaParts.join(' • ')
        const priceDisplay = getCarStartingPricePerKm(car)

        return (
          <motion.article 
            className="fleet-card group relative bg-white rounded-xl overflow-hidden border border-neutral-200/80 hover:border-neutral-400 transition-all duration-300 shadow-sm hover:shadow-xl" 
            key={car.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
          >
            {/* Image Container with zoom physics */}
            <div className="fleet-photo relative h-64 overflow-hidden bg-neutral-100">
              <Image 
                src={imgUrl} 
                alt={`${car.name} rental car in Hyderabad`} 
                fill 
                sizes="(max-width: 800px) 100vw, 33vw" 
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

              {/* Category pill */}
              <div className="absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-[11px] font-semibold text-white tracking-wider uppercase border border-white/10 flex items-center gap-1.5">
                <Sparkles size={11} className="text-amber-400" />
                <span>{car.category?.name || 'Cab / Rental'}</span>
              </div>

              {/* Price badge floating top right */}
              <div className="absolute top-3 right-3 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-xs font-bold text-neutral-900 shadow-md">
                {priceDisplay}
              </div>
            </div>

            {/* Car Details */}
            <div className="fleet-info p-6">
              <p className="eyebrow !text-xs !mb-1 text-neutral-500">{car.name}</p>
              <h3 className="text-xl font-bold text-neutral-900 group-hover:text-black line-clamp-1 mb-2">
                {car.shortDescription || car.name}
              </h3>
              
              <div className="flex items-center gap-2 text-xs text-neutral-500 mb-5 py-2 border-y border-neutral-100">
                <Users size={14} className="text-neutral-400 shrink-0" />
                <span>{meta}</span>
              </div>

              <div className="fleet-bottom flex items-center justify-between pt-2">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Starting Rate</span>
                  <strong className="text-base font-extrabold text-neutral-900">{priceDisplay}</strong>
                </div>

                <Link 
                  href={`/fleet/${car.slug}`} 
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-black active:scale-95 transition-all shadow-sm group-hover:shadow"
                >
                  <span>Book</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.article>
        )
      })}
    </div>
  )
}
