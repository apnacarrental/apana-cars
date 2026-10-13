'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { ArrowRight, Award, Car, Users, Clock } from 'lucide-react'

export function AboutSection() {
  return (
    <section id="about" className="section about overflow-hidden">
      {/* Visual Image with parallax reveal */}
      <motion.div 
        className="about-image relative rounded-xl overflow-hidden group shadow-xl"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image 
          src="/images/journey-road.png" 
          alt="Car journey through open roads - Apna Car Rental" 
          fill 
          sizes="(max-width: 800px) 100vw, 50vw" 
          className="transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
        
        {/* Floating badge inside image */}
        <motion.div 
          className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-white/90 backdrop-blur-md border border-white/40 shadow-lg text-neutral-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
              <Award size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-800">Hyderabad&apos;s Trusted Fleet</p>
              <p className="text-[11px] text-neutral-500">Self-drive independence & verified chauffeur expertise</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Copy & Animated Counter Stats */}
      <motion.div 
        className="about-copy"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="eyebrow">About Apna Car Rental</p>
        <h2>More than a rental.<br /><em>It&apos;s your freedom to move.</em></h2>
        <p>
          We make getting around Hyderabad and interstate Telangana feel seamless. With meticulously maintained cars, guaranteed transparent per-km fuel options, and 24/7 human dispatch support, Apna is the dependable partner for city trips, airport runs, family vacations, and corporate travel.
        </p>

        <motion.a 
          className="text-button inline-flex items-center gap-2 font-semibold text-neutral-900 hover:text-black cursor-pointer" 
          href="#services"
          whileHover={{ x: 6 }}
        >
          Our story <ArrowRight size={17} />
        </motion.a>

        {/* Animated Key Metrics */}
        <div className="stats">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <b>100<span>+</span></b>
            <small>Active vehicles</small>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <b>24/7</b>
            <small>Instant Dispatch</small>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <b>15k<span>+</span></b>
            <small>Trips completed</small>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
