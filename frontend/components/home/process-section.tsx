'use client'

import { motion } from 'motion/react'
import { processSteps } from '@/lib/data/home'
import { CheckCircle2 } from 'lucide-react'

export function ProcessSection() {
  return (
    <section className="section process overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6 }}
      >
        <p className="eyebrow">Simple from start to finish</p>
        <h2>Book your ride in <em>four</em> easy steps.</h2>
      </motion.div>

      <div className="steps">
        {processSteps.map((step, i) => (
          <motion.div 
            className="step group cursor-default" 
            key={step}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ x: 6, transition: { duration: 0.2 } }}
          >
            <span className="font-mono text-neutral-400 group-hover:text-neutral-900 transition-colors font-bold">
              0{i + 1}
            </span>
            <div>
              <h3 className="text-base font-bold text-neutral-900 group-hover:text-black transition-colors mb-1">
                {step}
              </h3>
              <p className="text-neutral-500 text-xs">We&apos;ll take care of the rest.</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
