'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Navigation, MapPin } from 'lucide-react'
import { TiltCard3D } from '@/components/motion/tilt-card-3d'
import { useBookingModal } from '@/components/ui/smart-booking-modal'

export interface DestinationItem {
  id: string
  name: string
  tagline: string
  distance: string
  category: 'Pilgrimage' | 'City' | 'Hill Station' | 'Coastal' | 'Heritage'
  image: string
  description: string
}

const CATEGORIES = ['All', 'Pilgrimage', 'City', 'Hill Station', 'Coastal', 'Heritage'] as const
type Category = (typeof CATEGORIES)[number]

export function InteractiveDestinationGrid({
  destinations,
}: {
  destinations: DestinationItem[]
}) {
  const { openBookingModal } = useBookingModal()
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [hoveredDest, setHoveredDest] = useState<string | null>(null)

  const filtered = activeCategory === 'All'
    ? destinations
    : destinations.filter((d) => d.category === activeCategory)

  return (
    <div className="w-full">
      {/* Category Pills Switcher with Active Fluid Indicator */}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] pb-6">
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const count = cat === 'All'
              ? destinations.length
              : destinations.filter((d) => d.category === cat).length
            const isActive = activeCategory === cat

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                type="button"
                className={`group relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-neutral-900 text-white shadow-md'
                    : 'bg-white/80 text-neutral-600 border border-[var(--line)] hover:border-neutral-900 hover:text-neutral-900'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Live Route Radar indicator */}
        <div className="hidden items-center gap-2 text-xs tracking-wider text-neutral-500 md:flex">
          <Navigation size={13} className="text-neutral-900 animate-pulse" />
          <span>Showing <strong>{filtered.length}</strong> verified outstation corridors from Hyderabad</span>
        </div>
      </div>

      {/* 3D Interactive Destination Cards Grid */}
      <div className="fleet-grid">
        {filtered.map((dest) => {
          const quoteUrl = `https://wa.me/919988123444?text=${encodeURIComponent(
            `Hi Apna Cars, I would like to get a quote for a cab from Hyderabad to ${dest.name} (${dest.distance}).`
          )}`

          const isHovered = hoveredDest === dest.id

          return (
            <TiltCard3D
              key={dest.id}
              maxTilt={7}
              onMouseEnter={() => setHoveredDest(dest.id)}
              onMouseLeave={() => setHoveredDest(null)}
              className="group h-full"
            >
              <article 
                className="fleet-card flex h-full flex-col justify-between overflow-hidden bg-white shadow-sm transition-shadow duration-300 group-hover:shadow-xl"
                style={{ border: '1px solid var(--line)' }}
              >
                <div>
                  {/* Photo with zoom & Live Radar Trajectory Line */}
                  <div className="fleet-photo relative min-h-[220px] overflow-hidden bg-neutral-100">
                    <Image
                      src={dest.image}
                      alt={`Outstation cab from Hyderabad to ${dest.name}`}
                      fill
                      sizes="(max-width: 800px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Category pill */}
                    <span 
                      className="absolute right-3.5 top-3.5 z-10 rounded-full bg-neutral-900/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md"
                    >
                      {dest.category}
                    </span>

                    {/* Animated Route Radar HUD overlay when card is hovered */}
                    <div
                      className={`absolute inset-x-0 bottom-0 z-10 flex items-center justify-between bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-white transition-opacity duration-300 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide">
                        <MapPin size={12} className="text-emerald-400" />
                        <span>HYD &rarr; {dest.name.split(' ')[0]}</span>
                      </div>
                      <span className="rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-bold tracking-wider">
                        {dest.distance}
                      </span>
                    </div>
                  </div>

                  {/* Destination Information */}
                  <div className="p-6">
                    <div className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-[var(--soft)]">
                      <span>{dest.distance} from Hyd</span>
                      <span className="text-neutral-400">&bull; Direct Highway</span>
                    </div>

                    <h3 className="mb-1 text-xl font-medium tracking-tight text-neutral-900 group-hover:text-black">
                      {dest.name}
                    </h3>

                    <p className="mb-3 text-xs font-medium text-neutral-500">
                      {dest.tagline}
                    </p>

                    <p className="text-[13px] leading-relaxed text-[var(--soft)]">
                      {dest.description}
                    </p>
                  </div>
                </div>

                {/* Footer Quote Bar */}
                <div className="border-t border-[var(--line)] p-5 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                        Indicative Fare
                      </span>
                      <strong className="text-xs font-bold text-neutral-900">
                        Get Transparent Quote
                      </strong>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        openBookingModal({
                          destination: dest.name,
                          distance: dest.distance,
                        })
                      }
                      className="group/btn inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:gap-2.5 active:scale-95 cursor-pointer"
                      style={{
                        background: '#111111',
                        color: '#ffffff',
                        border: '1px solid #111111',
                      }}
                    >
                      <span style={{ color: '#ffffff' }}>Book</span>
                      <ArrowRight size={13} className="text-white transition-transform group-hover/btn:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </article>
            </TiltCard3D>
          )
        })}
      </div>
    </div>
  )
}
