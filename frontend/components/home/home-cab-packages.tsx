'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowRight, 
  Plane, 
  Clock, 
  Landmark, 
  Navigation, 
  MapPin, 
  Sparkles, 
  Car, 
  ShieldCheck, 
  Check, 
  Flame,
  Star,
  Users
} from 'lucide-react'
import { TiltCard3D } from '@/components/motion/tilt-card-3d'
import { useBookingModal } from '@/components/ui/smart-booking-modal'

interface CabPackageItem {
  id: string
  title: string
  subtitle: string
  category: 'Airport' | 'Hourly' | 'Tours' | 'Outstation' | 'Luxury'
  badge: string
  badgeColor?: string
  href: string
  image: string
  icon: React.ElementType
  tag: string
  priceNote: string
  rating: string
  highlights: string[]
  popularFor: string
}

const CATEGORIES = ['All Packages', 'Airport & City', 'Pilgrimage & Tours', 'Outstation & Luxury'] as const

const CAB_PACKAGES: CabPackageItem[] = [
  {
    id: 'airport',
    title: 'Airport Cabs',
    subtitle: 'Rajiv Gandhi Intl Airport Transfers',
    category: 'Airport',
    badge: '24/7 Flight Tracking',
    badgeColor: 'emerald',
    href: '/airport-cabs',
    image: '/images/airport/hero.jpg',
    icon: Plane,
    tag: 'RGIA Shamshabad',
    priceNote: 'Fixed Upfront Fares',
    rating: '4.9',
    popularFor: 'Flight departures & arrivals, zero surge rates, meet & greet',
    highlights: ['Doorstep pickup across Hyderabad', 'Zero surge & hidden toll charges', 'Live flight delay tracking included'],
  },
  {
    id: 'hourly',
    title: 'Hourly Car Rental',
    subtitle: 'City Travel by the Hour',
    category: 'Hourly',
    badge: '8h / 80km & 12h / 120km',
    badgeColor: 'amber',
    href: '/hourly-cabs',
    image: '/images/srisailam/swift-dzire.jpg',
    icon: Clock,
    tag: 'Local City',
    priceNote: 'Price on Request',
    rating: '4.9',
    popularFor: 'Shopping, corporate meetings, weddings & hospital visits',
    highlights: ['Unlimited stops across Hyderabad', 'Dedicated chauffeur at your disposal', 'Clean AC Sedans, SUVs & MUVs'],
  },
  {
    id: 'sightseeing',
    title: 'Sightseeing Cabs',
    subtitle: 'Hyderabad Day Tours & Heritage',
    category: 'Tours',
    badge: '5+ Curated Circuits',
    badgeColor: 'blue',
    href: '/sightseeing-cabs',
    image: '/images/sightseeing/city-tour.jpg',
    icon: Landmark,
    tag: 'Day Excursion',
    priceNote: 'Flexible Packages',
    rating: '5.0',
    popularFor: 'Charminar, Golconda Fort, Ramoji Film City, Statue of Equality',
    highlights: ['100% private car for your family', 'Flexible timing at each monument', 'Savvy local heritage chauffeurs'],
  },
  {
    id: 'outstation',
    title: 'Outstation Cabs',
    subtitle: 'Inter-City One-Way & Round Trips',
    category: 'Outstation',
    badge: 'Pan-South India',
    badgeColor: 'purple',
    href: '/outstation-cabs',
    image: '/images/journey-road.png',
    icon: Navigation,
    tag: 'Highway Travel',
    priceNote: 'Transparent Rates',
    rating: '4.8',
    popularFor: 'Vijayawada, Bengaluru, Guntur, Warangal, Goa & Pune',
    highlights: ['Doorstep pickup & direct drop', 'Comfortable long-haul suspension', 'Verified highway captains'],
  },
  {
    id: 'srisailam',
    title: 'Srisailam Tour Cabs',
    subtitle: 'Sacred Jyotirlinga Darshan Packages',
    category: 'Tours',
    badge: 'Same-Day & 2-Day',
    badgeColor: 'amber',
    href: '/srisailam-cabs',
    image: '/images/srisailam/srisailam-dam.jpg',
    icon: MapPin,
    tag: 'Pilgrimage Circuit',
    priceNote: 'Special Darshan Tour',
    rating: '5.0',
    popularFor: 'Mallikarjuna Swamy & Bhramaramba Temple, Dam view & Ghats',
    highlights: ['Nallamala forest scenic drive', 'Sakshi Ganapathi & Dam viewpoint', 'Custom timing for elderly darshan'],
  },
  {
    id: 'urbania',
    title: 'Force Urbania Luxury',
    subtitle: 'Next-Gen Business-Class Group Van',
    category: 'Luxury',
    badge: '12 & 17 Seater',
    badgeColor: 'emerald',
    href: '/force-urbania-rent-in-hyderabad',
    image: '/images/urbania/urbania-hero.jpg',
    icon: Car,
    tag: 'Executive Luxury Van',
    priceNote: 'VIP Experience',
    rating: '5.0',
    popularFor: 'Wedding guest convoys, corporate retreats & family tours',
    highlights: ['Plush leather reclining seats', '6+ ft high-roof walk-in height', 'Individual row AC & USB ports'],
  },
]

export function HomeCabPackages() {
  const [activeFilter, setActiveFilter] = useState<string>('All Packages')
  const { openBookingModal } = useBookingModal()

  const filteredPackages = CAB_PACKAGES.filter((pkg) => {
    if (activeFilter === 'All Packages') return true
    if (activeFilter === 'Airport & City') return pkg.category === 'Airport' || pkg.category === 'Hourly'
    if (activeFilter === 'Pilgrimage & Tours') return pkg.category === 'Tours'
    if (activeFilter === 'Outstation & Luxury') return pkg.category === 'Outstation' || pkg.category === 'Luxury'
    return true
  })

  return (
    <section className="relative py-28 bg-[var(--paper)] border-b border-[var(--line)] overflow-hidden">
      {/* Subtle luxury background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-gradient-to-br from-amber-200/20 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-gradient-to-tr from-emerald-200/20 to-transparent blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[var(--line)] text-xs font-semibold uppercase tracking-wider text-neutral-900 mb-3.5 shadow-sm">
              <Sparkles size={13} className="text-amber-500 fill-amber-500" />
              <span>Curated Travel Experiences</span>
              <span className="text-neutral-300">&bull;</span>
              <span className="text-[11px] text-neutral-500 font-normal">Hyderabad &amp; Beyond</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-neutral-950 tracking-tight leading-[1.08]">
              Specialized <span className="italic font-serif">Cab Packages</span> &amp; Tours
            </h2>

            <p className="text-sm sm:text-base text-[var(--soft)] mt-4 leading-relaxed max-w-2xl">
              Thoughtfully curated for every travel need—from punctual airport transfers and city hourly rentals to sacred pilgrimages and business-class luxury vans.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <button
              type="button"
              onClick={() => openBookingModal({ destination: 'Custom Cab Package' })}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900 bg-white hover:bg-neutral-900 hover:text-white px-5 py-3 border border-neutral-900 transition-all shadow-sm cursor-pointer"
            >
              <span>Get Custom Quote</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-[var(--line)] pb-5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer rounded-full ${
                activeFilter === cat
                  ? 'bg-neutral-950 text-white shadow-md'
                  : 'bg-white border border-[var(--line)] text-neutral-600 hover:text-neutral-900 hover:border-neutral-900'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="text-xs text-neutral-400 ml-auto hidden sm:inline">
            Showing {filteredPackages.length} of {CAB_PACKAGES.length} packages
          </span>
        </div>

        {/* 6-Card Interactive Motion Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => {
            const Icon = pkg.icon
            return (
              <TiltCard3D key={pkg.id} maxTilt={6} className="h-full">
                <article 
                  className="fleet-card group flex h-full flex-col justify-between overflow-hidden bg-white border border-[var(--line)] shadow-sm hover:shadow-2xl transition-all duration-300 hover:border-neutral-900"
                  style={{ borderRadius: '0px' }}
                >
                  <div>
                    {/* Visual Photo with Gradient Overlay */}
                    <div className="relative h-60 w-full overflow-hidden bg-neutral-950 border-b border-[var(--line)]">
                      <Image
                        src={pkg.image}
                        alt={`${pkg.title} - Apna Cars`}
                        fill
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-108"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-semibold text-white border border-white/20">
                          {pkg.tag}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <span className="inline-flex items-center gap-1 rounded-full bg-neutral-950/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold border border-emerald-500/40 shadow-sm">
                            <Sparkles size={10} />
                            {pkg.badge}
                          </span>
                        </div>
                      </div>

                      {/* Photo Bottom Title Area */}
                      <div className="absolute bottom-4 left-5 right-5 text-white">
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30">
                            <Icon size={14} />
                          </div>
                          <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-300">
                            Apna Cars
                          </span>
                        </div>

                        <h3 className="text-2xl font-serif font-medium text-white m-0 drop-shadow-md leading-tight">
                          {pkg.title}
                        </h3>
                        <p className="text-xs text-neutral-200 mt-1 m-0 font-sans opacity-95">
                          {pkg.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Features & Highlights */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--line)] text-xs">
                        <div className="flex items-center gap-1.5 text-amber-600 font-semibold">
                          <Star size={13} fill="currentColor" />
                          <span>{pkg.rating} rating</span>
                        </div>
                        <span className="text-neutral-500 font-medium">
                          {pkg.priceNote}
                        </span>
                      </div>

                      <div className="mb-4">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-[var(--soft)] mb-2.5">
                          Highlights Included
                        </span>
                        <ul className="space-y-2 text-xs text-neutral-700 list-none p-0 m-0">
                          {pkg.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                              <span className="leading-snug">{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 bg-[var(--paper)] border border-[var(--line)] text-[11px] text-neutral-600">
                        <strong className="block text-neutral-900 font-semibold mb-0.5">Ideal For:</strong>
                        <span>{pkg.popularFor}</span>
                      </div>
                    </div>
                  </div>

                  {/* Dual Action Bottom Bar */}
                  <div className="p-6 pt-0 border-t border-[var(--line)]/60 bg-[var(--paper)] mt-auto">
                    <div className="pt-4 grid grid-cols-2 gap-2.5">
                      <Link
                        href={pkg.href}
                        className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-neutral-100 border border-[var(--line)] text-neutral-900 py-3 px-3 text-[11px] font-semibold uppercase tracking-wider transition-colors text-center shadow-xs"
                      >
                        <span>Details</span>
                        <ArrowRight size={12} />
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          openBookingModal({
                            destination: pkg.title,
                            carType: 'Executive Sedan (Dzire / Etios)',
                          })
                        }
                        className="button-dark inline-flex items-center justify-center gap-1.5 !bg-[#111111] !text-white hover:!bg-black py-3 px-3 text-[11px] font-bold uppercase tracking-wider transition-all text-center shadow-sm cursor-pointer group/btn"
                        style={{ color: '#ffffff', backgroundColor: '#111111' }}
                      >
                        <span>Instant Quote</span>
                        <Sparkles size={11} className="transition-transform group-hover/btn:rotate-12 text-amber-400" />
                      </button>
                    </div>
                  </div>
                </article>
              </TiltCard3D>
            )
          })}
        </div>

        {/* Bottom Reassurance Banner */}
        <div className="mt-16 p-6 sm:p-8 bg-white border border-[var(--line)] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 shrink-0 border border-emerald-200">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="text-base font-serif font-semibold text-neutral-900 m-0">
                Transparent Rates &bull; Doorstep Pickup &bull; Verified Chauffeurs
              </h4>
              <p className="text-xs text-[var(--soft)] mt-0.5 m-0">
                All trips include commercial passenger permits, disciplined drivers, and continuous helpline support.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+919988123444"
              className="text-xs font-bold uppercase tracking-wider text-neutral-900 border border-neutral-900 px-5 py-3 hover:bg-neutral-900 hover:text-white transition-all"
            >
              Call 099881 23444
            </a>
            <a
              href="https://wa.me/919988123444"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-wider text-white bg-[#25D366] hover:bg-emerald-600 px-5 py-3 transition-all shadow-sm"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
