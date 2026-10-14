'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowRight, MapPin, Sparkles, Users, Car, Phone } from 'lucide-react'
import { TiltCard3D } from '@/components/motion/tilt-card-3d'
import { useBookingModal } from '@/components/ui/smart-booking-modal'
import { SightseeingPackage } from '@/lib/data/sightseeing'

// Export legacy interface alias for backward compatibility
export type SightseeingPackageItem = SightseeingPackage

export function SightseeingPackageCards({
  packages,
}: {
  packages: SightseeingPackage[]
}) {
  const { openBookingModal } = useBookingModal()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {packages.map((pkg) => (
        <TiltCard3D key={pkg.id} maxTilt={6} className="h-full">
          <article 
            className="fleet-card flex h-full flex-col justify-between overflow-hidden bg-white border border-[var(--line)] shadow-xs hover:shadow-xl transition-all duration-300 group"
            style={{ borderRadius: '0px' }}
          >
            <div>
              {/* Package Image & Tag */}
              <div className="relative h-56 w-full overflow-hidden bg-neutral-900 border-b border-[var(--line)]">
                <Image
                  src={pkg.image}
                  alt={pkg.imageAlt || pkg.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                
                {/* Top Badges */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
                  <span className="inline-flex items-center gap-1 rounded-full bg-neutral-950/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white border border-white/20 shadow-xs">
                    <Sparkles size={11} className="text-amber-400" />
                    {pkg.badge}
                  </span>
                  {pkg.packageType && (
                    <span className="inline-flex items-center rounded-full bg-white/95 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neutral-900 shadow-xs">
                      {pkg.packageType}
                    </span>
                  )}
                </div>

                {/* Bottom Vehicle Range */}
                <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white z-10">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-white/20 text-neutral-100">
                    <Users size={12} className="text-amber-400" />
                    {pkg.vehicleRange}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-300">
                    Private Vehicle
                  </span>
                </div>
              </div>

              {/* Package Content & Places */}
              <div className="p-5 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-serif font-medium text-neutral-900 tracking-tight leading-snug m-0">
                  {pkg.title}
                </h3>
                <p className="text-xs text-[var(--soft)] mt-2 leading-relaxed m-0">
                  {pkg.description}
                </p>

                {/* Animated & Increased Places Covered Section */}
                <div className="mt-5 pt-4 border-t border-[var(--line)]">
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 font-sans">
                        Places Covered
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <Sparkles size={10} className="text-emerald-600" />
                      {pkg.placesCovered.length} Key Stops
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {pkg.placesCovered.map((place, idx) => (
                      <span 
                        key={idx}
                        className="place-badge group/badge inline-flex items-center gap-1.5 text-xs font-semibold bg-[var(--paper)] hover:bg-neutral-950 text-neutral-800 hover:text-white border border-[var(--line)] hover:border-neutral-950 px-3 py-1.5 rounded-lg shadow-2xs transition-all duration-200 cursor-default"
                      >
                        <MapPin size={12} className="text-amber-600 group-hover/badge:text-amber-400 transition-transform duration-200 group-hover/badge:scale-125 shrink-0" />
                        <span>{place}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Card Strip & Booking CTAs */}
            <div className="p-5 sm:p-6 pt-0 mt-auto">
              <div className="pt-4 border-t border-[var(--line)] flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[var(--soft)]">
                      Trip Tariff
                    </span>
                    <div className="text-sm font-bold text-neutral-900 font-serif">
                      {pkg.priceNote}
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] text-neutral-600 bg-neutral-100 px-2 py-1 rounded border border-neutral-200 font-medium">
                    <Car size={12} className="text-neutral-700" />
                    Sedans to Mini Buses
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => openBookingModal({ destination: `Sightseeing: ${pkg.title}`, carType: '4 to 28 Seater Vehicles' })}
                    className="button-dark inline-flex items-center justify-center gap-1.5 !bg-[#111111] !text-white hover:!bg-black py-3 px-3 text-[11px] font-bold uppercase tracking-wider transition-all text-center rounded shadow-sm cursor-pointer group/btn"
                    style={{ color: '#ffffff', backgroundColor: '#111111' }}
                  >
                    <span>Book a Cab</span>
                    <ArrowRight size={13} className="transition-transform group-hover/btn:translate-x-1" />
                  </button>

                  <a
                    href={`https://wa.me/919988123444?text=${encodeURIComponent(
                      `Hi Apna Cars, I would like to book the "${pkg.title}" sightseeing cab package (${pkg.vehicleRange}). Please provide the best quote and vehicle options.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-neutral-50 border border-[var(--line)] text-neutral-900 hover:text-emerald-700 py-3 px-3 text-[11px] font-bold uppercase tracking-wider transition-colors text-center rounded shadow-xs"
                  >
                    <Phone size={12} className="text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </article>
        </TiltCard3D>
      ))}
    </div>
  )
}
