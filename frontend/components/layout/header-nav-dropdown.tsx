'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, Sparkles, ArrowRight } from 'lucide-react'

export interface NavItem {
  label: string
  href: string
}

const CAB_PACKAGES = [
  {
    label: 'Airport Cabs',
    href: '/airport-cabs',
    desc: 'RGIA Shamshabad pickups & drops with flight tracking',
    badge: 'Popular',
  },
  {
    label: 'Hourly Cabs',
    href: '/hourly-cabs',
    desc: '8h / 80km & 12h / 120km local city packages',
    badge: 'Flexible',
  },
  {
    label: 'Sightseeing Cabs',
    href: '/sightseeing-cabs',
    desc: 'Charminar, Golconda, Ramoji & temple circuits',
    badge: 'Day Tours',
  },
  {
    label: 'Outstation Cabs',
    href: '/outstation-cabs',
    desc: 'Inter-city one-way & round trip taxi service',
    badge: 'Interstate',
  },
  {
    label: 'Srisailam Cabs',
    href: '/srisailam-cabs',
    desc: 'Specialized temple darshan round-trip packages',
    badge: 'Pilgrimage',
  },
  {
    label: 'Force Urbania Rental',
    href: '/force-urbania-rent-in-hyderabad',
    desc: 'Luxury 12 & 17 seater executive vans for groups',
    badge: 'Luxury Van',
  },
]

export function HeaderNavDropdown({
  items,
}: {
  items: NavItem[]
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 200)
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <nav className="desktop-nav" aria-label="Main navigation" style={{ position: 'relative', zIndex: 100 }}>
      <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>

      {/* Cab Packages Dropdown */}
      <div 
        ref={dropdownRef} 
        className="relative flex items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ position: 'relative' }}
      >
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="flex items-center gap-1.5 cursor-pointer uppercase tracking-[0.1em] text-xs font-normal text-neutral-900 hover:text-black transition-colors bg-transparent border-0 p-0 select-none py-2"
        >
          <span>Cab Packages</span>
          <ChevronDown 
            size={13} 
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180 text-black' : 'text-neutral-500'}`} 
          />
        </button>

        {isOpen && (
          <div 
            className="absolute top-full left-0 mt-1 w-84 border border-[var(--line)] bg-white shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150"
            style={{
              backgroundColor: '#ffffff',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              zIndex: 9999,
              minWidth: '320px',
            }}
          >
            <div className="px-4 py-2.5 border-b border-[var(--line)] bg-[var(--paper)] flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 flex items-center gap-1.5">
                <Sparkles size={11} className="text-amber-500 fill-amber-500" />
                Featured Travel Services
              </span>
              <span className="text-[10px] text-neutral-400">Hyderabad</span>
            </div>

            <div className="p-1.5">
              {CAB_PACKAGES.map((pkg) => (
                <Link
                  key={pkg.href}
                  href={pkg.href}
                  onClick={() => setIsOpen(false)}
                  className="flex flex-col px-3.5 py-2.5 transition-colors hover:bg-[var(--paper)] group border-b border-neutral-100 last:border-0 rounded-none"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-900 group-hover:text-black normal-case tracking-normal flex items-center gap-1.5">
                      {pkg.label}
                      <ArrowRight size={11} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-neutral-900" />
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-600 bg-neutral-100 px-2 py-0.5 border border-neutral-200 font-semibold">
                      {pkg.badge}
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-500 normal-case tracking-normal mt-0.5 leading-snug">
                    {pkg.desc}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Link href="/fleet" className="hover:opacity-70 transition-opacity">Fleet</Link>
      <Link href="/services" className="hover:opacity-70 transition-opacity">Services</Link>
      <Link href="/routes" className="hover:opacity-70 transition-opacity">Routes</Link>
      <Link href="/locations" className="hover:opacity-70 transition-opacity">Locations</Link>
      <Link href="/about" className="hover:opacity-70 transition-opacity">About</Link>
      <Link href="/contact" className="hover:opacity-70 transition-opacity">Contact</Link>
    </nav>
  )
}
