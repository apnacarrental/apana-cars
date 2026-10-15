'use client'

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight, Users } from 'lucide-react'

export interface FleetItem {
  id: string
  name: string
  slug: string
  seats: number
  pricePerDay?: number | null
  petrolPricePerKm?: number | null
  dieselPricePerKm?: number | null
  isActive?: boolean
  images?: Array<{ media?: { secureUrl?: string; altText?: string } | null }>
}

interface FleetShowcaseStripProps {
  cars?: FleetItem[]
}

const FALLBACK_FLEET: FleetItem[] = [
  { id: '1', name: 'Swift Dzire Sedan', slug: 'sedan', seats: 4, petrolPricePerKm: 14, pricePerDay: 1800 },
  { id: '2', name: 'Maruti Ertiga', slug: 'ertiga', seats: 6, petrolPricePerKm: 18, pricePerDay: 2800 },
  { id: '3', name: 'Toyota Innova Crysta', slug: 'innova-crysta', seats: 7, dieselPricePerKm: 22, pricePerDay: 3800 },
  { id: '4', name: 'Toyota Fortuner', slug: 'toyota-fortuner', seats: 7, dieselPricePerKm: 32, pricePerDay: 6500 },
  { id: '5', name: 'Force Urbania Luxury', slug: 'force-urbania-rent-in-hyderabad', seats: 16, dieselPricePerKm: 42, pricePerDay: 8500 },
]

function getCarImage(car: FleetItem): string {
  const name = (car.name || '').toLowerCase()
  const slug = (car.slug || '').toLowerCase()

  if (slug.includes('dzire') || name.includes('dzire') || name.includes('sedan') || slug.includes('sedan') || name.includes('etios')) {
    return '/images/fleet_showcase/dzire.png'
  }
  if (slug.includes('ertiga') || name.includes('ertiga')) {
    return '/images/fleet_showcase/ertiga.png'
  }
  if (slug.includes('crysta') || name.includes('crysta') || slug.includes('innova') || name.includes('innova')) {
    return '/images/fleet_showcase/innova_crysta.png'
  }
  if (slug.includes('fortuner') || name.includes('fortuner')) {
    return '/images/fleet_showcase/toyota_fortuner.png'
  }
  if (slug.includes('carnival') || name.includes('carnival')) {
    return '/images/fleet_showcase/kia_carnival.png'
  }
  if (slug.includes('urbania') || name.includes('urbania') || slug.includes('tempo') || name.includes('tempo')) {
    return '/images/fleet_showcase/force_urbania.png'
  }
  if (car.images?.[0]?.media?.secureUrl && !car.images[0].media.secureUrl.includes('journey-road')) {
    return car.images[0].media.secureUrl
  }
  return '/images/fleet_showcase/dzire.png'
}

export function FleetShowcaseStrip({ cars }: FleetShowcaseStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isHoveredRef = useRef(false)
  const isInteractingRef = useRef(false)
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null)

  const pauseAutoScroll = (duration = 3500) => {
    isInteractingRef.current = true
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false
    }, duration)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      pauseAutoScroll(4000)
      const el = scrollRef.current
      const halfWidth = el.scrollWidth / 2

      if (direction === 'left' && el.scrollLeft <= 10 && halfWidth > 0) {
        el.scrollLeft += halfWidth
      }

      const scrollAmount = direction === 'left' ? -420 : 420
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  // Display a curated subset of active admin cars (up to 6)
  const displayCars = (cars && cars.length > 0 ? cars.filter(c => c.isActive !== false).slice(0, 6) : FALLBACK_FLEET)

  // Smooth continuous auto-scrolling loop with zero-shiver wrapping and consistent speed on all screens (60Hz & 120Hz)
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    let animationId: number
    let lastTime = performance.now()
    let currentPos = el.scrollLeft
    const pixelsPerSecond = 85 // Consistent glide speed (~85px/sec) across mobile & desktop regardless of screen refresh rate

    const tick = (now: number) => {
      const elapsed = Math.min((now - lastTime) / 1000, 0.1)
      lastTime = now

      if (el && !isHoveredRef.current && !isInteractingRef.current) {
        const halfWidth = el.scrollWidth / 2
        if (halfWidth > 0) {
          currentPos += pixelsPerSecond * elapsed
          if (currentPos >= halfWidth) {
            currentPos -= halfWidth
          }
          el.scrollLeft = currentPos
        }
      } else if (el) {
        currentPos = el.scrollLeft
      }
      animationId = requestAnimationFrame(tick)
    }

    animationId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(animationId)
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    }
  }, [displayCars])

  return (
    <section 
      aria-label="Quick Fleet Showcase Bar"
      className="bg-[#F8F6F0] border-b border-slate-200/80 py-3.5 relative shadow-2xs"
      onMouseEnter={() => { isHoveredRef.current = true }}
      onMouseLeave={() => { isHoveredRef.current = false }}
      onTouchStart={() => pauseAutoScroll(4000)}
      onTouchMove={() => pauseAutoScroll(4000)}
      onWheel={() => pauseAutoScroll(3000)}
      onPointerDown={() => pauseAutoScroll(4000)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Left Scroll Button */}
        <button
          type="button"
          onClick={() => scroll('left')}
          aria-label="Scroll fleet left"
          className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 border border-slate-300 shadow-md items-center justify-center text-slate-700 hover:bg-[#0A2540] hover:text-white transition-all cursor-pointer"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Scrollable Container with duplicated items for seamless zero-shiver infinite loop */}
        <div
          ref={scrollRef}
          className="flex items-center gap-3 overflow-x-auto py-1 px-1 sm:px-7 select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: 'auto' }}
        >
          {[0, 1].map((setIndex) => (
            <React.Fragment key={`fleet-set-${setIndex}`}>
              {displayCars.map((car) => {
                const carImg = getCarImage(car)
                const priceLabel = car.dieselPricePerKm 
                  ? `₹${car.dieselPricePerKm}/km` 
                  : car.petrolPricePerKm 
                  ? `₹${car.petrolPricePerKm}/km` 
                  : car.pricePerDay 
                  ? `₹${car.pricePerDay.toLocaleString('en-IN')}/day` 
                  : null

                return (
                  <Link
                    key={`${car.id}-${setIndex}`}
                    href="/fleet"
                    className="group flex items-center gap-3 p-2.5 rounded-xl bg-white hover:bg-[#FFFDF9] border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all shrink-0 min-w-[220px] max-w-[250px] cursor-pointer"
                  >
                    {/* Vehicle Cutout Image */}
                    <div className="relative w-14 h-11 shrink-0 flex items-center justify-center bg-slate-50/70 rounded-lg p-1">
                      <Image
                        src={carImg}
                        alt={`${car.name} cab rental Hyderabad`}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-110"
                        sizes="56px"
                      />
                    </div>

                    {/* Details */}
                    <div className="min-w-0 flex-1">
                      <strong className="text-[12.5px] font-bold text-slate-900 group-hover:text-[#ECA00A] transition-colors block leading-tight truncate">
                        {car.name}
                      </strong>
                      
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                          <Users size={11} className="text-[#0A2540]" />
                          {car.seats} Seater
                        </span>

                        {priceLabel && (
                          <span className="inline-flex items-center text-[10.5px] font-bold text-amber-900 bg-amber-50 border border-amber-200/60 px-1.5 py-0.5 rounded leading-none font-mono">
                            {priceLabel}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              })}

              {/* Dedicated "View All Fleet →" Arrow Item */}
              <Link
                key={`view-all-${setIndex}`}
                href="/fleet"
                className="group flex items-center gap-3 p-2.5 rounded-xl bg-amber-50/80 hover:bg-[#ECA00A] border border-amber-200/90 hover:border-[#ECA00A] transition-all shrink-0 min-w-[190px] cursor-pointer shadow-xs"
              >
                <div className="w-10 h-10 rounded-full bg-[#ECA00A] group-hover:bg-[#0A2540] text-[#0A2540] group-hover:text-white flex items-center justify-center transition-all shadow-xs shrink-0">
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </div>
                <div className="min-w-0 flex-1">
                  <strong className="text-[12.5px] font-bold text-slate-900 group-hover:text-[#0A2540] transition-colors block leading-tight">
                    View All Fleet
                  </strong>
                  <span className="text-[10px] text-amber-900/80 group-hover:text-slate-900 font-bold block leading-tight mt-0.5">
                    Explore Full Fleet →
                  </span>
                </div>
              </Link>
            </React.Fragment>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          type="button"
          onClick={() => scroll('right')}
          aria-label="Scroll fleet right"
          className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 border border-slate-300 shadow-md items-center justify-center text-slate-700 hover:bg-[#0A2540] hover:text-white transition-all cursor-pointer"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  )
}
