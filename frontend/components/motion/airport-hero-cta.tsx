'use client'

import React from 'react'
import { ArrowRight, Phone, PlaneTakeoff, PlaneLanding } from 'lucide-react'
import { useBookingModal } from '@/components/ui/smart-booking-modal'

export function AirportHeroCta() {
  const { openBookingModal } = useBookingModal()

  return (
    <div className="space-y-6 pt-2">
      {/* Service Option Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() =>
            openBookingModal({
              destination: 'Airport Pickup (RGIA to City)',
              carType: 'Executive Sedan (Dzire / Etios)',
            })
          }
          className="inline-flex items-center gap-2 border border-neutral-900 bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all shadow-sm cursor-pointer"
        >
          <PlaneLanding size={15} />
          <span>Airport Pickup</span>
        </button>

        <button
          type="button"
          onClick={() =>
            openBookingModal({
              destination: 'Airport Drop (City to RGIA)',
              carType: 'Executive Sedan (Dzire / Etios)',
            })
          }
          className="inline-flex items-center gap-2 border border-neutral-900 bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all shadow-sm cursor-pointer"
        >
          <PlaneTakeoff size={15} />
          <span>Airport Drop</span>
        </button>
      </div>

      {/* Primary CTAs */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() =>
            openBookingModal({
              destination: 'Hyderabad Airport Transfer',
              carType: 'Executive Sedan (Dzire / Etios)',
            })
          }
          className="button-dark inline-flex items-center gap-2 !bg-[#111111] !text-white hover:!bg-black px-8 py-4 text-xs font-semibold uppercase tracking-wider transition-all shadow-md group cursor-pointer"
          style={{ color: '#ffffff', backgroundColor: '#111111' }}
        >
          <span>Book a cab</span>
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </button>

        <a
          href="tel:+919988123444"
          className="button-ghost inline-flex items-center gap-2 border border-neutral-900 bg-white/80 backdrop-blur-sm text-neutral-900 px-6 py-4 text-xs font-semibold uppercase tracking-wider hover:bg-neutral-900 hover:text-white transition-all shadow-sm"
        >
          <Phone size={14} />
          <span>Call Now: 099881 23444</span>
        </a>
      </div>
    </div>
  )
}

export function AirportFleetCta() {
  const { openBookingModal } = useBookingModal()

  return (
    <div className="mt-12 text-center">
      <button
        type="button"
        onClick={() =>
          openBookingModal({
            destination: 'Airport Cab Transfer',
            carType: 'Executive Sedan (Dzire / Etios)',
          })
        }
        className="button-dark inline-flex items-center gap-2 !bg-[#111111] !text-white hover:!bg-black px-10 py-4 text-xs font-semibold uppercase tracking-wider transition-all shadow-md group cursor-pointer"
        style={{ color: '#ffffff', backgroundColor: '#111111' }}
      >
        <span>Book a cab</span>
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  )
}
