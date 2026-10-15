'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import { useBookingModal } from '@/components/ui/smart-booking-modal'

export function RouteBookButton({
  origin,
  destination,
  title,
}: {
  origin: string
  destination: string
  title: string
}) {
  const { openBookingModal } = useBookingModal()

  return (
    <button
      type="button"
      onClick={() =>
        openBookingModal({
          destination: `${origin} to ${destination} (${title})`,
          carType: 'Executive Sedan (Dzire / Etios)',
        })
      }
      className="inline-flex items-center justify-center gap-1.5 bg-[#111111] hover:bg-black text-white py-2.5 px-3 text-[11px] font-bold uppercase tracking-wider transition-colors text-center rounded-lg shadow-xs cursor-pointer"
    >
      <span>Book Cab</span>
      <ArrowRight size={13} />
    </button>
  )
}
