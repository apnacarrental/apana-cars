'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight, Sparkles } from 'lucide-react'

interface ClientServicesGridProps {
  services: any[]
}

export function ClientServicesGrid({ services }: ClientServicesGridProps) {
  return (
    <div className="service-grid">
      {services.map((srv, index) => (
        <motion.div
          key={srv.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link 
            className="service-card group hover:bg-neutral-50/80 p-6 rounded-lg transition-all duration-300 relative flex items-start" 
            href={`/${srv.slug}`}
          >
            <span className="service-number font-mono text-sm text-neutral-400 group-hover:text-neutral-900 transition-colors">
              {srv.sortOrder ? srv.sortOrder.toString().padStart(2, '0') : (index + 1).toString().padStart(2, '0')}
            </span>
            <div className="flex-1 pr-4">
              <h3 className="text-lg font-bold text-neutral-900 group-hover:text-black transition-colors mb-2">
                {srv.title}
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed">
                {srv.shortDescription}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-neutral-100 group-hover:bg-neutral-900 group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0 self-center">
              <ArrowRight className="transition-transform group-hover:translate-x-1" size={16} />
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
