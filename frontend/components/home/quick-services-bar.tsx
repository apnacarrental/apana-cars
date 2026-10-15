'use client'

import React, { useRef } from 'react'
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

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  // Use admin database services, with fallback
  const displayServices = services && services.length > 0 ? services : [
    { id: '1', title: 'Chauffeur-Driven Taxi', slug: 'hourly-cabs', shortDescription: 'Hourly, Daily & Weekly' },
    { id: '2', title: 'Outstation Trips', slug: 'outstation-cabs', shortDescription: 'One Way & Round Trip' },
    { id: '3', title: 'Airport Transfers', slug: 'airport-cabs', shortDescription: 'Pickup & Drop' },
    { id: '4', title: 'Local Sightseeing', slug: 'sightseeing-cabs', shortDescription: 'Explore Hyderabad' },
    { id: '5', title: 'Wedding Car Service', slug: 'fleet', shortDescription: 'Travel in Style' },
    { id: '6', title: 'Corporate Travel', slug: 'services', shortDescription: 'Business & Staff Transport' },
    { id: '7', title: 'On-Demand Driver', slug: 'contact', shortDescription: 'Temporary & Permanent' },
  ]

  return (
    <section className="bg-white border-y border-slate-200/80 py-3.5 shadow-2xs relative">
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

        {/* Scrollable Container of Admin Services */}
        <div
          ref={scrollRef}
          className="flex items-center gap-3 overflow-x-auto scroll-smooth py-1 px-1 sm:px-7 select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayServices.map((srv) => {
            const Icon = getServiceIcon(srv.slug, srv.title)
            const href = DEDICATED_ROUTES.has(srv.slug) ? `/${srv.slug}` : `/services/${srv.slug}`
            return (
              <Link
                key={srv.id}
                href={href}
                className="group flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/70 hover:bg-[#FBF9F5] border border-slate-200/70 hover:border-slate-300 transition-all shrink-0 min-w-[210px] max-w-[240px] cursor-pointer"
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
                </div>
              </Link>
            )
          })}

          {/* Dedicated "More Services →" Arrow Item */}
          <Link
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
