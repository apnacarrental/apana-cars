'use client'

import React from 'react'
import { ArrowRight, Phone, Users } from 'lucide-react'
import { useBookingModal } from '@/components/ui/smart-booking-modal'

export function UrbaniaHeroCta() {
  const { openBookingModal } = useBookingModal()

  return (
    <div className="space-y-6 pt-2">
      {/* Variant Selector Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() =>
            openBookingModal({
              destination: 'Force Urbania (12 Seater)',
              carType: 'Force Urbania (12 Seater Luxury)',
            })
          }
          className="inline-flex items-center gap-2 border border-neutral-900 bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all shadow-sm cursor-pointer"
        >
          <Users size={15} />
          <span>12 Seater Force Urbania</span>
        </button>

        <button
          type="button"
          onClick={() =>
            openBookingModal({
              destination: 'Force Urbania (17 Seater)',
              carType: 'Force Urbania (17 Seater Luxury)',
            })
          }
          className="inline-flex items-center gap-2 border border-neutral-900 bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all shadow-sm cursor-pointer"
        >
          <Users size={15} />
          <span>17 Seater Force Urbania</span>
        </button>
      </div>

      {/* Primary CTAs */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() =>
            openBookingModal({
              destination: 'Force Urbania Rental (Hyderabad)',
              carType: 'Force Urbania Luxury Van',
            })
          }
          className="button-dark inline-flex items-center gap-2 !bg-[#111111] !text-white hover:!bg-black px-8 py-4 text-xs font-semibold uppercase tracking-wider transition-all shadow-md group cursor-pointer"
          style={{ color: '#ffffff', backgroundColor: '#111111' }}
        >
          <span>Book Force Urbania</span>
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </button>

        <a
          href="tel:+919988123444"
          className="button-ghost inline-flex items-center gap-2 border border-neutral-900 bg-white/80 backdrop-blur-sm text-neutral-900 px-6 py-4 text-xs font-semibold uppercase tracking-wider hover:bg-neutral-900 hover:text-white transition-all shadow-sm"
        >
          <Phone size={14} />
          <span>Call Helpline: 099881 23444</span>
        </a>
      </div>
    </div>
  )
}

export function UrbaniaBookingCta({ label = 'Book Your Tempo Traveller Today!' }: { label?: string }) {
  const { openBookingModal } = useBookingModal()

  return (
    <button
      type="button"
      onClick={() =>
        openBookingModal({
          destination: 'Force Urbania / Tempo Traveller Rental',
          carType: 'Force Urbania Luxury',
        })
      }
      className="button-dark inline-flex items-center gap-2 !bg-[#111111] !text-white hover:!bg-black px-9 py-4 text-xs font-semibold uppercase tracking-wider transition-all shadow-md group cursor-pointer"
      style={{ color: '#ffffff', backgroundColor: '#111111' }}
    >
      <span>Book Now</span>
      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
    </button>
  )
}
