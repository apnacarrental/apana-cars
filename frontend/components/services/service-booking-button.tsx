'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import { useBookingModal } from '@/components/ui/smart-booking-modal'

export function ServiceBookingButton({ serviceTitle }: { serviceTitle: string }) {
  const { openBookingModal } = useBookingModal()

  return (
    <button
      type="button"
      onClick={() => openBookingModal({ destination: serviceTitle })}
      className="button button-dark cursor-pointer inline-flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform"
    >
      Book {serviceTitle.toLowerCase()} <ArrowRight size={16} />
    </button>
  )
}
