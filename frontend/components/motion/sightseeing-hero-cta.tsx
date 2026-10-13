'use client'

import React from 'react'
import { ArrowRight, Phone } from 'lucide-react'
import { useBookingModal } from '@/components/ui/smart-booking-modal'

export function SightseeingHeroCta() {
  const { openBookingModal } = useBookingModal()

  return (
    <div className="flex flex-wrap items-center gap-4 pt-2">
      <a
        href="#packages"
        className="button-dark inline-flex items-center gap-2 !bg-[#111111] !text-white hover:!bg-black px-7 py-4 text-xs font-semibold uppercase tracking-wider transition-all shadow-md group cursor-pointer"
        style={{ color: '#ffffff', backgroundColor: '#111111' }}
      >
        <span>Explore Sightseeing Packages</span>
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
      </a>

      <a
        href="tel:+919988123444"
        className="button-ghost inline-flex items-center gap-2 border border-neutral-900 bg-white/80 backdrop-blur-sm text-neutral-900 px-6 py-4 text-xs font-semibold uppercase tracking-wider hover:bg-neutral-900 hover:text-white transition-all shadow-sm"
      >
        <Phone size={14} />
        <span>Call Now: 099881 23444</span>
      </a>

      <button
        type="button"
        onClick={() => openBookingModal({ destination: 'Sightseeing Cabs Enquiry' })}
        className="text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-neutral-900 underline underline-offset-4 ml-1 cursor-pointer"
      >
        Custom Itinerary Quote &rarr;
      </button>
    </div>
  )
}
