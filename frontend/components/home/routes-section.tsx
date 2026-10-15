import React from 'react'
import Link from 'next/link'
import { ArrowRight, MapPin, Navigation, Clock, Gauge, IndianRupee } from 'lucide-react'
import { getRoutes } from '@/lib/data/db'
import { RouteBookButton } from '@/components/home/route-book-button'

export async function HomeRoutesSection() {
  const routes = await getRoutes()

  if (!routes || routes.length === 0) return null

  return (
    <section id="popular-routes" className="section bg-white border-b border-[var(--line)] py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="section-head mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow mb-2">Popular Highway Corridors</p>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-neutral-950 m-0">
              Popular <em>Routes</em> &amp; Fares
            </h2>
            <p className="text-sm sm:text-base text-[var(--soft)] mt-4 leading-relaxed max-w-xl">
              Transparent upfront pricing for top one-way drops and roundtrip highway journeys from Hyderabad with verified chauffeurs.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Link
              href="/routes"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900 bg-[var(--paper)] hover:bg-neutral-900 hover:text-white px-5 py-3 border border-neutral-900 transition-all shadow-xs"
            >
              <span>View All Routes</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Dynamic Route Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {routes.slice(0, 6).map((route) => (
            <article
              key={route.id}
              className="fleet-card flex flex-col justify-between h-full bg-white border border-[var(--line)] p-6 rounded-2xl shadow-xs hover:shadow-xl transition-all duration-300 group"
            >
              <div>
                {/* Route Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    <Navigation size={12} className="text-blue-600" />
                    <span>{route.origin} → {route.destination}</span>
                  </span>
                  {route.duration && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-500">
                      <Clock size={12} />
                      {route.duration}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-neutral-900 group-hover:text-blue-600 transition-colors mb-2 leading-snug">
                  <Link href={`/routes/${route.slug}`}>
                    {route.title}
                  </Link>
                </h3>

                {/* Metrics */}
                {route.distance && (
                  <div className="flex items-center gap-2 text-xs text-neutral-500 mb-4 font-mono">
                    <Gauge size={13} className="text-neutral-400" />
                    <span>Approx. {route.distance} km highway journey</span>
                  </div>
                )}
              </div>

              {/* Price & Booking CTAs */}
              <div className="pt-5 border-t border-[var(--line)] mt-4">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[var(--soft)]">
                      Starting Fare
                    </span>
                    <span className="text-2xl font-bold text-neutral-950 font-serif">
                      {route.startingPrice ? `₹${route.startingPrice.toLocaleString('en-IN')}` : 'Custom Quote'}
                    </span>
                  </div>
                  <Link
                    href={`/routes/${route.slug}`}
                    className="text-xs font-semibold text-neutral-600 hover:text-black inline-flex items-center gap-1 underline underline-offset-4"
                  >
                    Route details <ArrowRight size={12} />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <RouteBookButton
                    origin={route.origin}
                    destination={route.destination}
                    title={route.title}
                  />

                  <a
                    href={`https://wa.me/919988123444?text=${encodeURIComponent(
                      `Hi Apna Cars, I would like to book a cab for the route "${route.title}" (${route.origin} to ${route.destination}${route.startingPrice ? `, starting fare ₹${route.startingPrice}` : ''}). Please share vehicle options.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 py-2.5 px-3 text-[11px] font-bold uppercase tracking-wider transition-colors text-center rounded-lg shadow-xs"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
