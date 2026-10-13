'use client'

import { motion } from 'motion/react'
import { ShieldCheck, Users, Check, Clock3, Sparkles } from 'lucide-react'

const trustItems = [
  { title: 'Well-maintained cars', desc: 'Sanitized & road-ready', Icon: ShieldCheck, badge: 'PDI Checked' },
  { title: 'Professional service', desc: 'Courteous verified drivers', Icon: Users, badge: '5★ Rated' },
  { title: 'Transparent pricing', desc: 'No surprise fuel tolls', Icon: Check, badge: 'Zero Hidden' },
  { title: '24/7 assistance', desc: 'Instant WhatsApp hotline', Icon: Clock3, badge: 'Live Support' }
]

export function TrustBar() {
  return (
    <section className="trust-bar overflow-hidden bg-white/70 backdrop-blur-sm">
      {trustItems.map(({ title, desc, Icon, badge }, i) => (
        <motion.div 
          className="trust-item group relative p-2 rounded-lg cursor-default" 
          key={title}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-900 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-300 shrink-0">
            <Icon size={18} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <strong className="text-neutral-900 font-semibold">{title}</strong>
            </div>
            <span className="text-neutral-500 text-xs">{desc}</span>
          </div>
        </motion.div>
      ))}
    </section>
  )
}
