'use client'

import React from 'react'

export interface MilestoneItem {
  number: string
  title: string
  description: string
  highlight?: string
}

export function AnimatedHighwayJourney({
  milestones,
  eyebrow = 'Highway guide',
  heading = 'Route from Hyderabad to Srisailam',
}: {
  milestones: MilestoneItem[]
  eyebrow?: string
  heading?: string
}) {
  return (
    <section className="section process relative overflow-hidden">
      <div className="mb-12">
        <p className="eyebrow">{eyebrow}</p>
        <h2>
          {heading.split('to')[0]}
          <em>to {heading.split('to')[1] || ''}.</em>
        </h2>
      </div>

      {/* Interactive Laser Highway Path Timeline */}
      <div className="relative">
        {/* Glowing road centerline */}
        <div 
          className="absolute left-6 top-8 bottom-8 hidden w-0.5 bg-gradient-to-b from-neutral-900 via-neutral-500 to-emerald-500 lg:block lg:left-1/2 lg:-translate-x-1/2" 
          style={{
            boxShadow: '0 0 12px rgba(16, 185, 129, 0.4)',
          }}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-8">
          {milestones.map((item, idx) => (
            <div
              key={item.number}
              className="group relative rounded-lg border border-[var(--line)] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-900 hover:shadow-lg"
            >
              {/* Odometer Milestone Indicator */}
              <div className="mb-4 flex items-center justify-between">
                <span className="font-serif text-2xl font-light text-neutral-400 group-hover:text-neutral-900 transition-colors">
                  {item.number}
                </span>
                <span className="flex h-2.5 w-2.5 rounded-full bg-neutral-300 group-hover:bg-emerald-500 group-hover:shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-all" />
              </div>

              <h3 className="mb-2 text-lg font-medium tracking-tight text-neutral-900">
                {item.title}
              </h3>

              <p className="text-xs leading-relaxed text-[var(--soft)]">
                {item.description}
              </p>

              {item.highlight && (
                <div className="mt-4 border-t border-neutral-100 pt-3 text-[11px] font-semibold tracking-wide text-neutral-600">
                  {item.highlight}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
