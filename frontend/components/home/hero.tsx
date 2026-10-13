'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { ArrowRight, ShieldCheck, Sparkles, PhoneCall } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="hero relative overflow-hidden">
      {/* Background with subtle Ken Burns zoom */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image 
          src="/images/hero-car.png" 
          alt="Luxury car ready for a journey - Apna Car Rental Hyderabad" 
          fill 
          priority 
          className="hero-image" 
          sizes="100vw" 
        />
      </motion.div>

      {/* Atmospheric lighting overlay */}
      <div className="hero-overlay" />

      {/* Hero content container with staggered kinetic entry */}
      <div className="hero-content relative z-10">
        {/* Live Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[11px] font-semibold tracking-wider uppercase mb-5"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Verified Chauffeurs • 24/7 Hyderabad Dispatch</span>
        </motion.div>

        {/* Eyebrow */}
        <motion.p 
          className="eyebrow light !tracking-[0.22em] !text-white/70"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >
          Premium Hyderabad Car & Cab Rentals
        </motion.p>

        {/* Kinetic Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Your journey.<br />
          <motion.span 
            className="inline-block bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, filter: 'blur(8px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Your car. Your way.
          </motion.span>
        </motion.h1>

        {/* Copy */}
        <motion.p 
          className="hero-copy"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
        >
          From quick city transfers and Shamshabad airport drop-offs to luxury outstation road trips in Ertiga, Crysta & Force Urbania. Transparent per-km rates with zero surprise charges.
        </motion.p>

        {/* Buttons with magnetic hover and click feedback */}
        <motion.div 
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: 'easeOut' }}
        >
          <motion.a 
            className="button button-light shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all !cursor-pointer" 
            href="#book"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Book a car <ArrowRight size={17} />
          </motion.a>
          <motion.a 
            className="text-button light hover:opacity-100 transition-opacity !cursor-pointer" 
            href="#fleet"
            whileHover={{ x: 4 }}
          >
            Explore our fleet <ArrowRight size={17} />
          </motion.a>
        </motion.div>
      </div>

      {/* Editorial floating note at bottom right */}
      <motion.div 
        className="hero-note"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <span className="font-mono text-emerald-400">01</span>
        <span>Move differently</span>
        <span className="note-line" />
      </motion.div>
    </section>
  )
}
