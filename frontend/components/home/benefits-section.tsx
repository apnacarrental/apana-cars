'use client'

import { motion } from 'motion/react'
import { Sparkles, Shield, Clock, HeartHandshake, CheckCircle2 } from 'lucide-react'
import { benefits } from '@/lib/data/home'

export function BenefitsSection() {
  return (
    <section className="dark-section overflow-hidden">
      <div className="section dark-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow light">The Apna difference</p>
          <h2>Why travel <em>with</em> Apna?</h2>
        </motion.div>

        <div className="benefit-grid">
          {benefits.map((benefit, i) => (
            <motion.div 
              className="benefit group cursor-default" 
              key={benefit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-emerald-400 font-semibold">0{i + 1}</span>
                <Sparkles size={18} className="text-amber-400 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mb-2">
                {benefit}
              </h3>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Thoughtfully designed with spotless cabs, vetted drivers, and genuine pricing for a smoother Hyderabad journey.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
