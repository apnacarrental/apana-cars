'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowRight, MapPin } from 'lucide-react'
import { TiltCard3D } from '@/components/motion/tilt-card-3d'
import { useBookingModal } from '@/components/ui/smart-booking-modal'

export interface AirportDestinationItem {
  id: string
  title: string
  image: string
  routeSlug?: string
}

export function AirportDestinationGrid({
  destinations,
}: {
  destinations: AirportDestinationItem[]
}) {
  const { openBookingModal } = useBookingModal()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {destinations.map((dest) => (
        <TiltCard3D key={dest.id} maxTilt={6} className="h-full">
          <div className="fleet-card flex h-full flex-col justify-between overflow-hidden bg-white border border-[var(--line)] shadow-sm hover:shadow-xl transition-all">
            <div className="relative h-48 w-full overflow-hidden bg-neutral-900 border-b border-[var(--line)]">
              <Image
                src={dest.image}
                alt={`${dest.title} - Apna Cars`}
                fill
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-semibold mb-0.5">
                  Direct Highway Route
                </span>
                <h3 className="text-base font-serif font-medium text-white m-0 drop-shadow-sm leading-snug">
                  {dest.title}
                </h3>
              </div>
            </div>

            <div className="p-4 flex flex-col justify-between flex-1 bg-[var(--paper)]">
              <div className="flex items-center gap-1.5 text-xs text-[var(--soft)] mb-4">
                <MapPin size={13} className="text-neutral-500 shrink-0" />
                <span>Doorstep pickup from Rajiv Gandhi Intl Airport (RGIA)</span>
              </div>

              <button
                type="button"
                onClick={() =>
                  openBookingModal({
                    destination: dest.title,
                    carType: 'Executive Sedan (Dzire / Etios)',
                  })
                }
                className="button-dark w-full !bg-[#111111] !text-white hover:!bg-black py-2.5 px-3 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-sm"
                style={{ color: '#ffffff', backgroundColor: '#111111' }}
              >
                <span>Book This Cab</span>
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </TiltCard3D>
      ))}
    </div>
  )
}
