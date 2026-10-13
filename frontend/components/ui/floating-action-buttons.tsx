'use client'

import React from 'react'
import { Phone, MessageCircle } from 'lucide-react'

interface FloatingActionButtonsProps {
  phone?: string
  displayPhone?: string
  whatsappNumber?: string
  whatsappDefaultMsg?: string
}

export function FloatingActionButtons({
  phone = '+919988123444',
  displayPhone = '099881 23444',
  whatsappNumber = '919988123444',
  whatsappDefaultMsg = 'Hi Apna Cars, I would like to inquire about booking an outstation cab from Hyderabad.',
}: FloatingActionButtonsProps) {
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappDefaultMsg)}`

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto"
      style={{ filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.25))' }}
      aria-label="Contact quick actions"
    >
      {/* WhatsApp Floating Pill Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#20ba59] active:scale-95"
      >
        <MessageCircle size={22} className="shrink-0 fill-white text-[#25D366]" />
        <span className="hidden font-sans text-xs font-bold uppercase tracking-wider text-white md:inline">
          WhatsApp
        </span>
      </a>

      {/* Call Floating Pill Button */}
      <a
        href={`tel:${phone}`}
        aria-label={`Call Apna Cars at ${displayPhone}`}
        className="group flex items-center gap-2.5 rounded-full bg-[#111111] border border-white/20 px-4 py-3 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-neutral-800 active:scale-95"
      >
        <Phone size={20} className="shrink-0 text-white animate-pulse" />
        <span className="hidden font-sans text-xs font-bold tracking-wider text-white md:inline">
          {displayPhone}
        </span>
      </a>
    </div>
  )
}
