'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowRight, MapPin, Compass } from 'lucide-react'
import { TiltCard3D } from '@/components/motion/tilt-card-3d'
import { useBookingModal } from '@/components/ui/smart-booking-modal'

export interface AirportAttractionItem {
  id: string
  name: string
  image: string
  description: string
  distanceLabel: string
}

export function AirportAttractionGrid({
  attractions,
}: {
  attractions: AirportAttractionItem[]
}) {
  const { openBookingModal } = useBookingModal()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {attractions.map((attraction) => (
        <TiltCard3D key={attraction.id} maxTilt={5} className="h-full">
          <div className="fleet-card flex h-full flex-col justify-between overflow-hidden bg-white border border-[var(--line)] shadow-sm hover:shadow-xl transition-all">
            <div className="relative h-60 w-full overflow-hidden bg-neutral-900 border-b border-[var(--line)]">
              <Image
                src={attraction.image}
                alt={`${attraction.name} near Hyderabad Airport`}
                fill
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-sm px-3 py-1 text-[11px] font-semibold text-white border border-white/20">
                  <Compass size={12} className="text-emerald-400" />
                  {attraction.distanceLabel}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-2xl font-serif font-medium text-white m-0 drop-shadow-sm">
                  {attraction.name}
                </h3>
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <p className="text-xs sm:text-sm text-[var(--soft)] leading-relaxed mb-6 font-normal">
                  {attraction.description}
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-800 bg-[var(--paper)] px-3 py-1.5 border border-[var(--line)] mb-6">
                  <MapPin size={13} className="text-neutral-500" />
                  <span>{attraction.distanceLabel}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--line)]">
                <button
                  type="button"
                  onClick={() =>
                    openBookingModal({
                      destination: `${attraction.name} (Airport Taxi)`,
                      carType: 'Executive Sedan (Dzire / Etios)',
                    })
                  }
                  className="button-dark w-full !bg-[#111111] !text-white hover:!bg-black py-3 px-4 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-md"
                  style={{ color: '#ffffff', backgroundColor: '#111111' }}
                >
                  <span>Book Airport Taxi Now</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </TiltCard3D>
      ))}
    </div>
  )
}
