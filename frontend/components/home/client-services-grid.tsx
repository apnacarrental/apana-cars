'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight, Sparkles } from 'lucide-react'

interface ClientServicesGridProps {
  services: any[]
}

const DEDICATED_ROUTES = new Set([
  'airport-cabs',
  'hourly-cabs',
  'sightseeing-cabs',
  'outstation-cabs',
  'srisailam-cabs',
  'force-urbania-rent-in-hyderabad'
])

export function ClientServicesGrid({ services }: ClientServicesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {services.map((srv, index) => {
        const serviceHref = DEDICATED_ROUTES.has(srv.slug) ? `/${srv.slug}` : `/services/${srv.slug}`
        const num = srv.sortOrder ? srv.sortOrder.toString().padStart(2, '0') : (index + 1).toString().padStart(2, '0')
        return (
          <motion.div
            key={srv.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link 
              className="group flex flex-col justify-between h-full bg-white rounded-2xl p-7 border border-[var(--line)] shadow-xs hover:shadow-xl hover:border-neutral-400 transition-all duration-300 relative" 
              href={serviceHref}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs font-bold tracking-wider text-neutral-400 group-hover:text-[var(--brand-orange)] transition-colors px-2 py-1 rounded bg-[#f5f1ea]">
                    {num}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-[#f5f1ea] group-hover:bg-neutral-900 group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0">
                    <ArrowRight className="transition-transform group-hover:translate-x-0.5" size={15} />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-neutral-900 group-hover:text-black tracking-tight mb-2.5">
                  {srv.title}
                </h3>

                <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3">
                  {srv.shortDescription}
                </p>
              </div>

              <div className="pt-5 mt-6 border-t border-[var(--line)] flex items-center justify-between">
                {srv.startingPrice ? (
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Starting from</span>
                    <span className="font-mono text-sm font-extrabold text-[#0F172A]">
                      ₹{Number(srv.startingPrice).toLocaleString('en-IN')}{srv.priceUnit ? <span className="font-sans font-medium text-[11px] text-slate-500 ml-1">/ {srv.priceUnit}</span> : ''}
                    </span>
                  </div>
                ) : (
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-700 group-hover:text-black">
                    Explore Service
                  </span>
                )}
                <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[var(--brand-orange)] group-hover:translate-x-1 transition-transform">
                  <span>View Details</span>
                  <span>→</span>
                </div>
              </div>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
