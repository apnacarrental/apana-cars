'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowRight, MapPin, Sparkles, Check, Car } from 'lucide-react'
import { TiltCard3D } from '@/components/motion/tilt-card-3d'
import { useBookingModal } from '@/components/ui/smart-booking-modal'

export interface SightseeingPackageItem {
  id: string
  title: string
  subtitle: string
  badge: string
  image: string
  places: string[]
  description: string
  priceDisplay: string
  circuitType: string
}

export function SightseeingPackageCards({
  packages,
}: {
  packages: SightseeingPackageItem[]
}) {
  const { openBookingModal } = useBookingModal()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {packages.map((pkg) => (
        <TiltCard3D key={pkg.id} maxTilt={6} className="h-full">
          <article 
            className="fleet-card flex h-full flex-col justify-between overflow-hidden bg-white border border-[var(--line)] shadow-sm hover:shadow-xl transition-all"
            style={{ borderRadius: '0px' }}
          >
            <div>
              {/* Package Image & Tag */}
              <div className="relative h-56 w-full overflow-hidden bg-neutral-900 border-b border-[var(--line)]">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="inline-block rounded-full bg-neutral-900/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white border border-white/20">
                    {pkg.badge}
                  </span>
                  <span className="inline-block rounded-full bg-black/60 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold text-neutral-300">
                    {pkg.circuitType}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-serif font-medium tracking-tight text-white m-0 drop-shadow-sm">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-neutral-200 mt-1 m-0 font-sans opacity-90">
                    {pkg.subtitle}
                  </p>
                </div>
              </div>

              {/* Package Content & Places */}
              <div className="p-6">
                <p className="text-xs text-[var(--soft)] leading-relaxed mb-5">
                  {pkg.description}
                </p>

                <div className="mb-4">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-[var(--soft)] mb-3">
                    Destinations &amp; Key Halts
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {pkg.places.map((place, idx) => (
                      <span 
                        key={idx}
                        className="inline-flex items-center gap-1 text-[11px] font-medium bg-[var(--paper)] text-neutral-800 border border-[var(--line)] px-2.5 py-1 rounded"
                      >
                        <MapPin size={11} className="text-neutral-500 shrink-0" />
                        {place}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Strip */}
            <div className="p-6 pt-0 border-t border-[var(--line)]/50 mt-auto">
              <div className="flex items-center justify-between pt-4 mb-4">
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-[var(--soft)] font-bold">
                    Trip Tariff
                  </span>
                  <div className="text-base font-serif font-semibold text-neutral-900">
                    {pkg.priceDisplay}
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <Sparkles size={11} /> Dedicated Chauffeur
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => openBookingModal({ destination: `Sightseeing: ${pkg.title}` })}
                className="button-dark w-full !bg-[#111111] !text-white hover:!bg-black py-3 px-4 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-md"
                style={{ color: '#ffffff', backgroundColor: '#111111' }}
              >
                <span>Get Instant Quote / Book</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </article>
        </TiltCard3D>
      ))}
    </div>
  )
}
