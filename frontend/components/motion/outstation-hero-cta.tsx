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
    <div className="hero-buttons">
      <button 
        type="button"
        onClick={() => openBookingModal({ destination: 'Outstation Trip' })}
        className="button button-light shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
        style={{
          background: '#ffffff',
          color: '#111111',
          border: '1px solid #ffffff'
        }}
      >
        <span style={{ color: '#111111', fontWeight: 700 }}>Book a Cab</span>
        <ArrowRight size={17} style={{ color: '#111111' }} />
      </button>

      <button 
        type="button"
        onClick={() => openBookingModal({ destination: 'Outstation Trip' })}
        className="text-button light cursor-pointer"
      >
        <span>Instant Quote</span>
        <ArrowRight size={15} />
      </button>

      <a 
        className="text-button light" 
        href={`tel:${contactPhone}`}
      >
        Call {displayPhone} <Phone size={16} />
      </a>
    </div>
  )
}
