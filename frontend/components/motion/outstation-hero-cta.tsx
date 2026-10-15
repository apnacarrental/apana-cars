'use client'

import React from 'react'
import { ArrowRight, Phone } from 'lucide-react'
import { useBookingModal } from '@/components/ui/smart-booking-modal'

interface OutstationHeroCtaProps {
  contactPhone?: string
  displayPhone?: string
}

export function OutstationHeroCta({
  contactPhone = '+919988123444',
  displayPhone = '099881 23444',
}: OutstationHeroCtaProps) {
  const { openBookingModal } = useBookingModal()

  return (
    <div className="flex flex-wrap items-center gap-4">
      <button 
        type="button"
        onClick={() => openBookingModal({ destination: 'Outstation Trip' })}
        className="button button-dark !bg-[#111111] !text-white hover:!bg-black shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer px-6 py-3.5 text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-2"
      >
        <span>Book a Cab</span>
        <ArrowRight size={15} />
      </button>

      <button 
        type="button"
        onClick={() => openBookingModal({ destination: 'Outstation Trip' })}
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0F172A] hover:text-[#ECA00A] transition-colors cursor-pointer"
      >
        <span>Instant Quote</span>
        <ArrowRight size={14} />
      </button>

      <a 
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0F172A] hover:text-[#ECA00A] transition-colors ml-2" 
        href={`tel:${contactPhone}`}
      >
        <Phone size={14} />
        <span>Call {displayPhone}</span>
      </a>
    </div>
  )
}
