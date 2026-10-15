'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowRight, 
  MapPin, 
  Users, 
  ShieldCheck, 
  Phone, 
  Sparkles,
  Car
} from 'lucide-react'
import { useBookingModal } from '@/components/ui/smart-booking-modal'
import { SIGHTSEEING_PACKAGES } from '@/lib/data/sightseeing'

export function PopularSightseeingSection() {
  const { openBookingModal } = useBookingModal()

  return (
    <section 
      id="sightseeing-packages" 
      aria-label="Popular Sightseeing Packages"
      className="section bg-[var(--paper)] border-b border-[var(--line)] py-20 sm:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="section-head mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow mb-2">Curated City &amp; Temple Circuits</p>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-neutral-950 m-0">
              Popular <em>Sightseeing</em> Packages
            </h2>
            <p className="text-sm sm:text-base text-[var(--soft)] mt-4 leading-relaxed max-w-xl">
              Explore Hyderabad’s famous attractions, temples, and popular destinations with convenient sightseeing cab packages from Apna Cars.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Link
              href="/sightseeing-cabs"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900 bg-[var(--paper)] hover:bg-neutral-900 hover:text-white px-5 py-3 border border-neutral-900 transition-all shadow-xs"
            >
              <span>View All Circuits</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* 5 Unique Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SIGHTSEEING_PACKAGES.map((pkg) => (
            <article 
              key={pkg.id}
              className="fleet-card flex flex-col justify-between h-full bg-white border border-[var(--line)] overflow-hidden rounded-2xl shadow-xs hover:shadow-xl transition-all duration-300 group"
            >
              <div>
                {/* Destination Image Banner */}
                <div className="relative h-56 w-full overflow-hidden bg-neutral-900 border-b border-[var(--line)]">
                  <Image
                    src={pkg.image}
                    alt={pkg.imageAlt}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
                    <span className="inline-flex items-center gap-1 rounded-full bg-neutral-950/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white border border-white/20 shadow-xs">
                      <Sparkles size={11} className="text-amber-400" />
                      {pkg.badge}
                    </span>
                    {pkg.packageType && (
                      <span className="inline-flex items-center rounded-full bg-white/95 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neutral-900 shadow-xs">
                        {pkg.packageType}
                      </span>
                    )}
                  </div>

                  {/* Bottom Vehicle Range Tag */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white z-10">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-white/20 text-neutral-100">
                      <Users size={12} className="text-amber-400" />
                      {pkg.vehicleRange}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-300">
                      Private Vehicle
                    </span>
                  </div>
                </div>

                {/* Card Main Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-serif font-medium text-neutral-900 tracking-tight leading-snug m-0">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-[var(--soft)] mt-2 leading-relaxed m-0">
                    {pkg.description}
                  </p>

                  {/* Animated & Increased Places Covered Section */}
                  <div className="mt-5 pt-4 border-t border-[var(--line)]">
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 font-sans">
                          Places Covered
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <Sparkles size={10} className="text-emerald-600" />
                        {pkg.placesCovered.length} Key Stops
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {pkg.placesCovered.map((place, idx) => (
                        <span
                          key={idx}
                          className="place-badge group/badge inline-flex items-center gap-1.5 text-xs font-semibold bg-[var(--paper)] hover:bg-neutral-950 text-neutral-800 hover:text-white border border-[var(--line)] hover:border-neutral-950 px-3 py-1.5 rounded-lg shadow-2xs transition-all duration-200 cursor-default"
                        >
                          <MapPin size={12} className="text-amber-600 group-hover/badge:text-amber-400 transition-transform duration-200 group-hover/badge:scale-125 shrink-0" />
                          <span>{place}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Strip & Booking CTAs */}
              <div className="p-5 sm:p-6 pt-0 mt-auto">
                <div className="pt-4 border-t border-[var(--line)] flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-[var(--soft)]">
                        Trip Tariff
                      </span>
                      <span className="text-sm font-bold text-neutral-900 font-serif">
                        {pkg.priceNote}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] text-neutral-600 bg-neutral-100 px-2 py-1 rounded border border-neutral-200 font-medium">
                      <Car size={12} className="text-neutral-700" />
                      Sedans to Mini Buses
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        openBookingModal({
                          destination: `Sightseeing: ${pkg.title}`,
                          carType: '4 to 28 Seater Vehicles',
                        })
                      }
                      className="button-dark inline-flex items-center justify-center gap-1.5 !bg-[#111111] !text-white hover:!bg-black py-3 px-3 text-[11px] font-bold uppercase tracking-wider transition-all text-center rounded shadow-sm cursor-pointer group/btn"
                      style={{ color: '#ffffff', backgroundColor: '#111111' }}
                    >
                      <span>Book a Cab</span>
                      <ArrowRight size={13} className="transition-transform group-hover/btn:translate-x-1" />
                    </button>

                    <a
                      href={`https://wa.me/919988123444?text=${encodeURIComponent(
                        `Hi Apna Cars, I would like to book the "${pkg.title}" sightseeing cab package (${pkg.vehicleRange}). Please provide the best quote and vehicle options.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-neutral-50 border border-[var(--line)] text-neutral-900 hover:text-emerald-700 py-3 px-3 text-[11px] font-bold uppercase tracking-wider transition-colors text-center rounded shadow-xs"
                    >
                      <Phone size={12} className="text-emerald-600" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Reassurance & Verified Helpline Banner */}
        <div className="mt-14 p-6 sm:p-8 bg-[var(--paper)] border border-[var(--line)] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 shrink-0 border border-emerald-200">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="text-base font-serif font-semibold text-neutral-900 m-0">
                Punctual Doorstep Pickup &bull; Verified Drivers &bull; Flexible Stops
              </h4>
              <p className="text-xs text-[var(--soft)] mt-0.5 m-0">
                Enjoy hassle-free sightseeing with experienced local drivers, disciplined timing at monuments, and air-conditioned vehicles (4 to 28 seaters).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+919988123444"
              className="text-xs font-bold uppercase tracking-wider text-neutral-900 border border-neutral-900 px-5 py-3 hover:bg-neutral-900 hover:text-white transition-all bg-white"
            >
              Call 099881 23444
            </a>
            <a
              href="https://wa.me/919988123444?text=Hi%20Apna%20Cars,%20I%20would%20like%20to%20inquire%20about%20sightseeing%20cab%20packages%20in%20Hyderabad."
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-wider text-white bg-[#25D366] hover:bg-emerald-600 px-5 py-3 transition-all shadow-sm"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
