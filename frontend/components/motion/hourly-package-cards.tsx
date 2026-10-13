'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowRight, Clock, Gauge, Check, ShieldCheck } from 'lucide-react'
import { TiltCard3D } from '@/components/motion/tilt-card-3d'
import { useBookingModal } from '@/components/ui/smart-booking-modal'

export interface HourlyPackageItem {
  id: string
  title: string
  subtitle: string
  durationHours: number
  distanceKm: number
  badge: string
  idealFor: string
  features: string[]
  priceDisplay: string
}

export function HourlyPackageCards({
  packages,
}: {
  packages: HourlyPackageItem[]
}) {
  const { openBookingModal } = useBookingModal()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {packages.map((pkg) => (
        <TiltCard3D key={pkg.id} maxTilt={6} className="h-full">
          <article 
            className="fleet-card flex h-full flex-col justify-between overflow-hidden bg-white border border-[var(--line)] shadow-sm hover:shadow-xl transition-all"
            style={{ borderRadius: '0px' }}
          >
            <div>
              {/* Package Header Banner */}
              <div className="relative p-8 pb-6 border-b border-[var(--line)] bg-[var(--paper)]">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block rounded-full bg-neutral-900 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    {pkg.badge}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--soft)]">
                    Local Hyderabad
                  </span>
                </div>

                <h3 className="text-2xl font-serif font-medium tracking-tight text-neutral-900 mb-1">
                  {pkg.title}
                </h3>
                <p className="text-xs text-[var(--soft)] m-0">
                  {pkg.subtitle}
                </p>

                {/* Specs Strip */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-5 border-t border-[var(--line)]">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[var(--line)] text-neutral-900 shadow-sm">
                      <Clock size={16} />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-[var(--soft)] font-bold">Duration</span>
                      <strong className="text-sm font-semibold text-neutral-900">{pkg.durationHours} Hours</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[var(--line)] text-neutral-900 shadow-sm">
                      <Gauge size={16} />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-[var(--soft)] font-bold">Included Run</span>
                      <strong className="text-sm font-semibold text-neutral-900">{pkg.distanceKm} Kilometres</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Package Feature Inclusions */}
              <div className="p-8">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--soft)] mb-4">
                  Package Inclusions &amp; Scope
                </p>
                <ul className="space-y-3 text-xs text-[var(--soft)] mb-6 list-none p-0">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check size={15} className="shrink-0 text-emerald-600 mt-0.5" />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="rounded-lg bg-[var(--paper)] p-4 border border-[var(--line)] text-xs text-neutral-600">
                  <strong className="block text-neutral-900 mb-1">Best suited for:</strong>
                  <span>{pkg.idealFor}</span>
                </div>
              </div>
            </div>

            {/* Bottom Quote & Booking Strip */}
            <div className="p-6 pt-5 border-t border-[var(--line)] flex items-center justify-between bg-neutral-50/50">
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-[var(--soft)] font-bold">Package Rate</span>
                <strong className="text-sm font-semibold text-neutral-900">{pkg.priceDisplay}</strong>
              </div>

              <button
                type="button"
                onClick={() =>
                  openBookingModal({
                    destination: `Hourly Package: ${pkg.title}`,
                    distance: `${pkg.distanceKm} km / ${pkg.durationHours} hrs`,
                  })
                }
                className="group/btn inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 cursor-pointer shadow-md"
                style={{
                  background: '#111111',
                  color: '#ffffff',
                }}
              >
                <span style={{ color: '#ffffff' }}>Book Package</span>
                <ArrowRight size={14} className="text-white transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </article>
        </TiltCard3D>
      ))}
    </div>
  )
}
