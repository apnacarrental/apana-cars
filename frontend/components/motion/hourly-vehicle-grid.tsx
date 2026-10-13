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
          <article className="fleet-card flex h-full flex-col justify-between overflow-hidden bg-[var(--paper)] border border-[var(--line)]">
            <div className="fleet-photo relative min-h-[260px] overflow-hidden bg-neutral-200">
              <Image
                src={v.image}
                alt={`${v.name} hourly cab in Hyderabad`}
                fill
                sizes="(max-width: 800px) 100vw, 33vw"
                className="transition-transform duration-700 hover:scale-105 object-cover"
              />
            </div>

            <div className="fleet-info flex flex-1 flex-col justify-between p-6">
              <div>
                <p className="eyebrow">{v.category}</p>
                <h3 className="text-xl font-medium">{v.name}</h3>
                <span className="fleet-meta block my-3 text-xs text-[var(--soft)]">
                  {v.seating} &bull; {v.luggage}
                </span>
                <p className="text-xs text-[var(--soft)] leading-relaxed mb-4">
                  {v.description}
                </p>
              </div>

              <div className="fleet-bottom pt-4 border-t border-[var(--line)] flex items-center justify-between">
                <strong className="text-xs font-semibold text-neutral-900">{v.hourlyPriceDisplay}</strong>

                <button
                  type="button"
                  onClick={() =>
                    openBookingModal({
                      destination: 'Hourly Rental (Hyderabad)',
                      carType: v.name,
                    })
                  }
                  className="group/btn inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 cursor-pointer"
                  style={{
                    background: '#111111',
                    color: '#ffffff',
                  }}
                >
                  <span style={{ color: '#ffffff' }}>Get Quote</span>
                  <ArrowRight size={13} className="text-white transition-transform group-hover/btn:translate-x-0.5" />
                </button>
              </div>
            </div>
          </article>
        </TiltCard3D>
      ))}
    </div>
  )
}
