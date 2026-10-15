'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowRight, Users, Briefcase } from 'lucide-react'
import { TiltCard3D } from '@/components/motion/tilt-card-3d'
import { useBookingModal } from '@/components/ui/smart-booking-modal'

export interface VehicleItem {
  name: string
  category: string
  seating: string
  luggage: string
  image: string
  description: string
  hourlyPriceDisplay: string
}

export function HourlyVehicleGrid({
  vehicles,
}: {
  vehicles: VehicleItem[]
}) {
  const { openBookingModal } = useBookingModal()

  return (
    <div className="fleet-grid">
      {vehicles.map((v) => (
        <TiltCard3D key={v.name} maxTilt={6} className="h-full">
          <article className="fleet-card group flex h-full flex-col justify-between overflow-hidden bg-white rounded-2xl border border-[var(--line)] shadow-xs hover:shadow-lg transition-all duration-300">
            <div className="fleet-photo relative min-h-[240px] overflow-hidden bg-[#f5f2ea]">
              <Image
                src={v.image}
                alt={`${v.name} hourly cab in Hyderabad`}
                fill
                sizes="(max-width: 800px) 100vw, 33vw"
                className="transition-transform duration-700 group-hover:scale-105 object-cover"
              />
              <div className="absolute top-3 right-3 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-xs font-bold text-neutral-900 shadow-sm border border-neutral-100">
                {v.hourlyPriceDisplay}
              </div>
            </div>

            <div className="fleet-info flex flex-1 flex-col justify-between p-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-500 mb-1.5 block">
                  {v.category}
                </span>
                <h3 className="text-xl font-bold text-neutral-900 group-hover:text-black tracking-tight mb-1.5">
                  {v.name}
                </h3>
                <span className="fleet-meta text-xs text-neutral-500 font-medium mb-3 block">
                  {v.seating} &bull; {v.luggage}
                </span>
                <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed mb-4">
                  {v.description}
                </p>
              </div>

              <div className="fleet-bottom pt-4 border-t border-[var(--line)] flex items-center justify-between mt-auto">
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block">Tariff</span>
                  <strong className="text-sm font-bold text-neutral-900">{v.hourlyPriceDisplay}</strong>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    openBookingModal({
                      destination: 'Hourly Rental (Hyderabad)',
                      carType: v.name,
                    })
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-[var(--brand-orange)] transition-colors group/btn py-1 cursor-pointer bg-transparent border-0"
                >
                  <span>INQUIRE</span>
                  <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          </article>
        </TiltCard3D>
      ))}
    </div>
  )
}
