'use client'

import React from 'react'
import { motion, type HTMLMotionProps } from 'motion/react'

export interface MotionSectionProps extends HTMLMotionProps<'section'> {
  children: React.ReactNode
  className?: string
  delay?: number
}

// Subtle editorial fade up with gentle dampening
export function MotionSection({
  children,
  className,
  delay = 0,
  ...props
}: MotionSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  )
}

// Fade in block with customizable directional nudge
export function FadeIn({
  children,
  delay = 0,
  y = 20,
  className,
  style,
}: {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

// Stagger container for grids, cards, benefits, steps
export function StaggerContainer({
  children,
  staggerChildren = 0.08,
  delayChildren = 0.1,
  className,
  style,
}: {
  children: React.ReactNode
  staggerChildren?: number
  delayChildren?: number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren,
          },
        },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

// Individual animated child within a StaggerContainer
export function StaggerItem({
  children,
  className,
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 22 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

// Premium subtle hover effect for cards (slight lift + hairline highlight)
export function MotionCard({
  children,
  className,
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.25, ease: 'easeOut' },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.article>
  )
}

// Hero content load animation
export function HeroEntrance({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
