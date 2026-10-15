'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { Star, Users, ShieldCheck } from 'lucide-react'
import { BookingForm } from '@/components/ui/booking-form'

export interface ServiceHeroProps {
  eyebrow: string
  titleLine1: string
  titleHighlight: string
  titleLine2?: string
  subtitle: string
  defaultTab?: 'local' | 'outstation' | 'airport' | 'oneway'
  defaultCarType?: string
  extraAction?: React.ReactNode
}

export function ServiceHeroSection({
  eyebrow,
  titleLine1,
  titleHighlight,
  titleLine2,
  subtitle,
  defaultTab = 'local',
  defaultCarType = 'Innova Crysta (7-Seater)',
  extraAction,
}: ServiceHeroProps) {
  return (
    <>
      {/* 1. Main Hero Visual Canvas */}
      <section className="relative min-h-[520px] lg:min-h-[580px] bg-gradient-to-r from-white via-[#FCFAF6] to-[#F5F1E8] overflow-hidden pt-8 pb-20 md:pb-28 border-b border-[var(--line)]">
        {/* Background Graphic - Daylight Charminar & Vehicle Fleet on the right side */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-[60%] lg:w-[56%] pointer-events-none select-none z-0 hidden md:block">
          <div className="relative w-full h-full">
            <Image
              src="/images/hero_charminar_perfect.png"
              alt="Apna Car Rental Fleet at Charminar Hyderabad"
              fill
              priority
              className="object-contain object-right-bottom"
              sizes="(max-width: 1024px) 60vw, 56vw"
            />
          </div>
        </div>

        {/* Hero Content Container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-4 md:pt-8">
          <div className="max-w-xl lg:max-w-2xl">
            {/* Eyebrow */}
            <div className="text-xs uppercase tracking-[0.2em] font-bold text-slate-500 mb-3">
              {eyebrow}
            </div>

            {/* Kinetic Headline with Differentiated Brand Color */}
            <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black text-[#0F172A] leading-[1.08] tracking-tight mb-4">
              {titleLine1}<br />
              <span className="text-[#ECA00A]">{titleHighlight}</span><br />
              {titleLine2 && <span>{titleLine2}</span>}
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg mb-6">
              {subtitle}
            </p>

            {/* Optional extra action / pill selectors */}
            {extraAction && (
              <div className="mb-6">
                {extraAction}
              </div>
            )}

            {/* 4 Trust Badges in a Row matching reference */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 pb-4"
            >
              {/* Badge 1: Google Reviews */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white shadow-xs border border-slate-100 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.15z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.15C3.25 21.37 7.31 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.27C.46 8.2.005 10.04.005 12s.46 3.8 1.27 5.42l4.01-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.63 1.27 6.58l4.01 3.15c.95-2.83 3.6-4.93 6.72-4.93z"/>
                  </svg>
                </div>
                <div className="leading-tight">
                  <strong className="text-xs font-bold text-[#0F172A] block">1500+</strong>
                  <span className="text-[10px] text-slate-500 font-medium">Genuine Reviews</span>
                </div>
              </div>

              {/* Badge 2: Rating */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-amber-50 border border-amber-200/60 flex items-center justify-center text-[#ECA00A] shrink-0">
                  <Star size={14} className="fill-current text-[#ECA00A]" />
                </div>
                <div className="leading-tight">
                  <strong className="text-xs font-bold text-[#0F172A] block">4.9/5</strong>
                  <span className="text-[10px] text-slate-500 font-medium">Customer Rating</span>
                </div>
              </div>

              {/* Badge 3: Trusted by Thousands */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-200/60 flex items-center justify-center text-[#0A2540] shrink-0">
                  <Users size={14} />
                </div>
                <span className="text-xs font-semibold text-slate-700">Trusted by Thousands</span>
              </div>

              {/* Badge 4: Safe & Reliable Travel */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-700 shrink-0">
                  <ShieldCheck size={14} />
                </div>
                <span className="text-xs font-semibold text-slate-700">Safe &amp; Reliable Travel</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Booking Form Container (Overlapping Hero) */}
      <section id="book" className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-30 mb-10">
        <BookingForm initialTab={defaultTab} initialCarType={defaultCarType} />
      </section>
    </>
  )
}
