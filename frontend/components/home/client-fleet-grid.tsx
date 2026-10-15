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
        const imgUrl = getSafeImageUrl(car.images?.[0]?.media?.secureUrl, car.name || car.slug)
        const metaParts = [
          car.seats ? `${car.seats} seats` : null,
          car.luggage ? `${car.luggage} bags` : null,
          car.transmission || null
        ].filter(Boolean)
        const meta = metaParts.join(' • ')
        const priceDisplay = getCarStartingPricePerKm(car)

        return (
          <motion.article 
            className="fleet-card group relative bg-white rounded-xl overflow-hidden border border-[var(--line)] hover:border-neutral-400 transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col justify-between" 
            key={car.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
          >
            {/* Image Container with natural vehicle photography framing */}
            <div className="fleet-photo relative h-56 sm:h-64 overflow-hidden bg-[#f5f2ea]">
              <Image 
                src={imgUrl} 
                alt={`${car.name} rental car in Hyderabad`} 
                fill 
                sizes="(max-width: 800px) 100vw, 33vw" 
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

              {/* Price badge floating top right */}
              <div className="absolute top-3 right-3 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-xs font-bold text-neutral-900 shadow-sm border border-neutral-100">
                {priceDisplay}
              </div>
            </div>

            {/* Car Details matching Reference Image */}
            <div className="fleet-info p-6 flex flex-col flex-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-500 mb-1.5 block">
                {car.category?.name || 'Rental Cab'}
              </span>
              
              <h3 className="text-xl font-bold text-neutral-900 group-hover:text-black tracking-tight mb-1.5">
                {car.name}
              </h3>
              
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-3 font-medium">
                <span>{meta}</span>
              </div>

              {car.shortDescription && (
                <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed line-clamp-2 mb-4">
                  {car.shortDescription}
                </p>
              )}

              {/* Card Footer matching Reference Image: "Price on request / Starting rate" on left, "INQUIRE →" on right */}
              <div className="fleet-bottom flex items-center justify-between pt-4 mt-auto border-t border-[var(--line)]">
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block">Rate</span>
                  <strong className="text-sm font-bold text-neutral-900">{priceDisplay}</strong>
                </div>

                <Link 
                  href={`/fleet/${car.slug}`} 
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-[var(--brand-orange)] transition-colors group/btn py-1"
                >
                  <span>INQUIRE</span>
                  <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.article>
        )
      })}
    </div>
  )
}
