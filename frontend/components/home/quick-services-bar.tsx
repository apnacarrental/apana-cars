'use client'

import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import { 
  Car, 
  Navigation, 
  Plane, 
  Compass, 
  Heart, 
  Briefcase, 
  UserCheck, 
  Clock, 
  Landmark, 
  ChevronRight, 
  ChevronLeft,
  ArrowRight,
} from 'lucide-react'

export interface ServiceItem {
  id: string
  title: string
  slug: string
  shortDescription?: string | null
  sortOrder?: number
  startingPrice?: number | null
  priceUnit?: string | null
  isActive?: boolean
  showInQuickBar?: boolean
}

interface QuickServicesBarProps {
  services?: ServiceItem[]
}

const DEDICATED_ROUTES = new Set([
  'airport-cabs',
  'hourly-cabs',
  'sightseeing-cabs',
  'outstation-cabs',
  'srisailam-cabs',
  'force-urbania-rent-in-hyderabad'
])

function getServiceIcon(slug: string, title: string) {
  const text = (slug + ' ' + title).toLowerCase()
  if (text.includes('airport') || text.includes('flight')) return Plane
  if (text.includes('driver')) return UserCheck
  if (text.includes('hourly') || text.includes('rent')) return Clock
  if (text.includes('sightseeing') || text.includes('tour') || text.includes('city')) return Compass
  if (text.includes('outstation') || text.includes('highway')) return Navigation
  if (text.includes('corporate') || text.includes('business')) return Briefcase
  if (text.includes('pilgrimage') || text.includes('temple') || text.includes('srisailam')) return Landmark
  if (text.includes('wedding') || text.includes('occasion') || text.includes('event')) return Heart
  return Car
}

export function QuickServicesBar({ services }: QuickServicesBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isHoveredRef = useRef(false)
  const isInteractingRef = useRef(false)
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Filter services that are active AND toggled on for the Quick Service Bar
  const activeQuickServices = services?.filter(s => s.isActive !== false && s.showInQuickBar !== false)

  // Use admin database services, with fallback
  const displayServices = (activeQuickServices && activeQuickServices.length > 0) ? activeQuickServices : [
    { id: '1', title: 'Airport Transfers', slug: 'airport-cabs', shortDescription: 'Pickup & Drop to RGIA', startingPrice: 1499, priceUnit: 'onwards' },
    { id: '2', title: 'Hourly Rentals', slug: 'hourly-cabs', shortDescription: 'Hourly, Daily & Weekly Packages', startingPrice: 1800, priceUnit: '8 hrs / 80 km' },
    { id: '3', title: 'City Sightseeing', slug: 'sightseeing-cabs', shortDescription: 'Curated Hyderabad Tours', startingPrice: 2499, priceUnit: 'full day tour' },
    { id: '4', title: 'Outstation Travel', slug: 'outstation-cabs', shortDescription: 'One Way & Round Trip Drops', startingPrice: 2999, priceUnit: 'round trip' },
    { id: '5', title: 'Srisailam Pilgrimage Packages', slug: 'srisailam-cabs', shortDescription: 'Mallikarjuna Temple Darshan', startingPrice: 4800, priceUnit: 'darshan roundtrip' },
    { id: '6', title: 'Force Urbania Rentals', slug: 'force-urbania-rent-in-hyderabad', shortDescription: '12 & 16 Seater Luxury Vans', startingPrice: 7500, priceUnit: 'per day' },
    { id: '7', title: 'Wedding Car Service', slug: 'wedding-cars', shortDescription: 'Travel in Luxury Style', startingPrice: 4500, priceUnit: 'per day' },
    { id: '8', title: 'Corporate Travel', slug: 'corporate-travel', shortDescription: 'Business & Staff Transport', startingPrice: 2200, priceUnit: 'per day' },
    { id: '9', title: 'On-Demand Driver', slug: 'driver-service', shortDescription: 'Temporary & Permanent Chauffeurs', startingPrice: 999, priceUnit: '8 hours' },
  ]

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

  // Smooth continuous auto-scrolling loop with zero-shiver wrapping and consistent speed on all screens (60Hz & 120Hz)
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    // Honor users who prefer reduced motion
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
  }, [displayServices])

  return (
    <section 
      aria-label="Quick Cab Services Bar"
      className="bg-white/95 backdrop-blur-md sticky top-[68px] min-[801px]:top-[78px] z-30 border-y border-slate-200/90 py-2.5 sm:py-3 shadow-xs relative transition-all duration-200"
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
          aria-label="Scroll services left"
          className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 border border-slate-300 shadow-md items-center justify-center text-slate-700 hover:bg-[#0A2540] hover:text-white transition-all cursor-pointer"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Scrollable Container with duplicated items for seamless infinite loop (NO scroll-smooth to prevent shivering on wrap) */}
        <div
          ref={scrollRef}
          className="flex items-center gap-3 overflow-x-auto py-1 px-1 sm:px-7 select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: 'auto' }}
        >
          {[0, 1].map((setIndex) => (
            <React.Fragment key={`set-${setIndex}`}>
              {displayServices.map((srv) => {
                const Icon = getServiceIcon(srv.slug, srv.title)
                const href = DEDICATED_ROUTES.has(srv.slug) ? `/${srv.slug}` : `/services/${srv.slug}`
                return (
                  <Link
                    key={`${srv.id}-${setIndex}`}
                    href={href}
                    className="group flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/70 hover:bg-[#FBF9F5] border border-slate-200/70 hover:border-slate-300 transition-all shrink-0 min-w-[220px] max-w-[260px] cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full bg-white border border-slate-200 group-hover:bg-[#0A2540] group-hover:text-white group-hover:border-[#0A2540] flex items-center justify-center text-[#0A2540] transition-all shadow-2xs shrink-0">
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <strong className="text-[12.5px] font-bold text-slate-900 group-hover:text-[#ECA00A] transition-colors block leading-tight truncate">
                        {srv.title}
                      </strong>
                      <span className="text-[10px] text-slate-500 font-medium block leading-tight mt-0.5 truncate">
                        {srv.shortDescription || 'Hyderabad Cab Service'}
                      </span>
                      {srv.startingPrice ? (
                        <div className="mt-1 flex items-center gap-1">
                          <span className="inline-flex items-center gap-1 font-mono text-[11px] font-extrabold text-[#0F172A] bg-amber-50 text-amber-900 border border-amber-200/60 px-1.5 py-0.5 rounded leading-none">
                            ₹{Number(srv.startingPrice).toLocaleString('en-IN')}{srv.priceUnit ? <span className="font-sans font-medium text-[9.5px] text-slate-600">/ {srv.priceUnit}</span> : ''}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </Link>
                )
              })}

              {/* Dedicated "More Services →" Arrow Item */}
              <Link
                key={`more-${setIndex}`}
                href="/services"
                className="group flex items-center gap-3 p-2.5 rounded-xl bg-amber-50/70 hover:bg-[#ECA00A] border border-amber-200/90 hover:border-[#ECA00A] transition-all shrink-0 min-w-[190px] cursor-pointer shadow-xs"
              >
                <div className="w-10 h-10 rounded-full bg-[#ECA00A] group-hover:bg-[#0A2540] text-[#0A2540] group-hover:text-white flex items-center justify-center transition-all shadow-xs shrink-0">
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </div>
                <div className="min-w-0 flex-1">
                  <strong className="text-[12.5px] font-bold text-slate-900 group-hover:text-[#0A2540] transition-colors block leading-tight">
                    More Services
                  </strong>
                  <span className="text-[10px] text-amber-900/80 group-hover:text-slate-900 font-bold block leading-tight mt-0.5">
                    Explore All Services →
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
          aria-label="Scroll services right"
          className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 border border-slate-300 shadow-md items-center justify-center text-slate-700 hover:bg-[#0A2540] hover:text-white transition-all cursor-pointer"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  )
}
