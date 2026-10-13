'use client'

import React, { useState, useEffect } from 'react'
import { Phone, MessageSquare, ArrowRight, MapPin, ChevronDown } from 'lucide-react'
import { useBookingModal } from '@/components/ui/smart-booking-modal'

interface QuickHudProps {
  destinations?: Array<{ id: string; name: string }>
  defaultDestination?: string
  phone?: string
  displayPhone?: string
}

export function OutstationCockpitHud({
  destinations = [],
  defaultDestination = 'Srisailam',
  phone = '+919988123444',
  displayPhone = '099881 23444',
}: QuickHudProps) {
  const { openBookingModal } = useBookingModal()
  const [isVisible, setIsVisible] = useState(false)
  const [selectedDest, setSelectedDest] = useState(defaultDestination)

  useEffect(() => {
    const handleScroll = () => {
      // Reveal HUD once scrolled past 480px (below hero)
      if (window.scrollY > 480) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  const whatsappUrl = `https://wa.me/919988123444?text=${encodeURIComponent(
    `Hi Apna Cars, I would like to book a cab from Hyderabad to ${selectedDest}.`
  )}`

  return (
    <aside 
      aria-label="Quick Outstation Booking HUD"
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ease-out animate-in fade-in slide-in-from-bottom-6"
      style={{ maxWidth: 'calc(100vw - 32px)' }}
    >
      <div 
        className="flex items-center gap-3 rounded-full border border-white/20 bg-neutral-900/90 px-4 py-2.5 text-white shadow-2xl backdrop-blur-xl sm:gap-4 sm:px-6 sm:py-3"
        style={{
          boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
        }}
      >
        {/* Origin / Destination Selector */}
        <div className="flex items-center gap-2 border-r border-white/15 pr-3 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 font-medium text-neutral-300">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Hyd</span>
          </div>
          <span className="text-neutral-500">&rarr;</span>
          
          {destinations.length > 0 ? (
            <div className="relative">
              <select
                value={selectedDest}
                onChange={(e) => setSelectedDest(e.target.value)}
                className="cursor-pointer appearance-none bg-transparent pr-5 font-semibold text-white outline-none hover:text-neutral-200"
              >
                {destinations.map((d) => (
                  <option key={d.id} value={d.name} className="bg-neutral-900 text-white">
                    {d.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={13} className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-neutral-400" />
            </div>
          ) : (
            <span className="font-semibold text-white">{selectedDest}</span>
          )}
        </div>

        {/* Smart Quote Modal CTA */}
        <button
          type="button"
          onClick={() => openBookingModal({ destination: selectedDest })}
          className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 transition-transform duration-200 hover:scale-105 active:scale-95 sm:px-4 sm:text-[11px] cursor-pointer"
        >
          <span>Get Quote</span>
          <ArrowRight size={13} />
        </button>

        {/* Direct Call Button */}
        <a
          href={`tel:${phone}`}
          className="hidden items-center gap-1.5 text-xs tracking-wider text-neutral-300 transition-colors hover:text-white sm:flex"
        >
          <Phone size={13} />
          <span>{displayPhone}</span>
        </a>
      </div>
    </aside>
  )
}
