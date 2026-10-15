'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { useBookingModal } from '@/components/ui/smart-booking-modal'

const FLEET_SHOWCASE = [
  {
    name: 'Dzire',
    seats: '4 Seater',
    image: '/images/fleet_showcase/dzire.png',
    slug: 'swift-dzire',
  },
  {
    name: 'Ertiga',
    seats: '7 Seater',
    image: '/images/fleet_showcase/ertiga.png',
    slug: 'maruti-ertiga',
  },
  {
    name: 'Innova Crysta',
    seats: '7 Seater',
    image: '/images/fleet_showcase/innova_crysta.png',
    slug: 'toyota-innova-crysta',
  },
  {
    name: 'Toyota Fortuner',
    seats: '7 Seater',
    image: '/images/fleet_showcase/toyota_fortuner.png',
    slug: 'toyota-fortuner',
  },
  {
    name: 'Kia Carnival',
    seats: '7 Seater',
    image: '/images/fleet_showcase/kia_carnival.png',
    slug: 'kia-carnival',
  },
  {
    name: 'Force Urbania',
    seats: '16 Seater',
    image: '/images/fleet_showcase/force_urbania.png',
    slug: 'force-urbania-rent-in-hyderabad',
  },
]

export function FleetShowcaseStrip() {
  const { openBookingModal } = useBookingModal()

  return (
    <section className="py-12 bg-[#F8F6F0] border-b border-slate-200/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading, Subtitle & Button */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight mb-2">
              Our Vehicle Fleet
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-5">
              Well-maintained vehicles with professional drivers for a comfortable journey.
            </p>
            <Link
              href="/fleet"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-900 hover:bg-[#0A2540] hover:text-white transition-all shadow-2xs"
            >
              <span>View All Vehicles</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Right Column: 6 Fleet Cards */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
              {FLEET_SHOWCASE.map((car, idx) => (
                <motion.div
                  key={car.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                >
                  <Link
                    href={`/fleet`}
                    className="group bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between items-center text-center h-full cursor-pointer"
                  >
                    {/* Vehicle Cutout Image */}
                    <div className="relative w-full h-16 sm:h-20 mb-2 flex items-center justify-center">
                      <Image
                        src={car.image}
                        alt={`${car.name} rental cab in Hyderabad`}
                        fill
                        className="object-contain transition-transform duration-500 ease-out group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 15vw"
                      />
                    </div>

                    {/* Vehicle Name & Seater info */}
                    <div className="w-full">
                      <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#ECA00A] transition-colors leading-tight">
                        {car.name}
                      </h3>
                      <span className="text-[11px] text-slate-400 font-medium block mt-0.5">
                        {car.seats}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
