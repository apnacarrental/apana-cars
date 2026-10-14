'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, Sparkles, ArrowRight } from 'lucide-react'

export interface NavItem {
  label: string
  href: string
}

// 1. All Cab packages kept directly visible in the nav bar
const CAB_PACKAGES = [
  { label: 'Airport Cabs', href: '/airport-cabs' },
  { label: 'Hourly Cabs', href: '/hourly-cabs' },
  { label: 'Sightseeing', href: '/sightseeing-cabs' },
  { label: 'Outstation Cabs', href: '/outstation-cabs' },
  { label: 'Srisailam Cabs', href: '/srisailam-cabs' },
  { label: 'Force Urbania', href: '/force-urbania-rent-in-hyderabad' },
]

// 2. "More" dropdown containing Fleet, Services, Routes, Locations, About, Contact
const MORE_ITEMS = [
  {
    label: 'Fleet',
    href: '/fleet',
    desc: 'Sedans, Ertiga, Crysta & luxury tempo travellers',
    badge: 'Vehicles',
  },
  {
    label: 'Services',
    href: '/services',
    desc: 'All corporate, local & outstation travel solutions',
    badge: 'Packages',
  },
  {
    label: 'Routes',
    href: '/routes',
    desc: 'Popular highway corridors & intercity drops',
    badge: 'Highways',
  },
  {
    label: 'Locations',
    href: '/locations',
    desc: 'RGIA Airport, Hitec City, Gachibowli & city hubs',
    badge: 'Hubs',
  },
  {
    label: 'About',
    href: '/about',
    desc: 'Our journey, professional drivers & company background',
    badge: 'Company',
  },
  {
    label: 'Contact',
    href: '/contact',
    desc: '24/7 customer helpdesk, phone booking & address',
    badge: 'Support',
  },
]

export function HeaderNavDropdown({
  items,
}: {
  items?: NavItem[]
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
      <Link href="/" className="hover:opacity-70 transition-opacity py-2">
        Home
      </Link>

      {/* Visible Cab Packages */}
      {CAB_PACKAGES.map((pkg) => (
        <Link
          key={pkg.href}
          href={pkg.href}
          className="hover:opacity-70 transition-opacity py-2 whitespace-nowrap"
        >
          {pkg.label}
        </Link>
      ))}

      {/* "More" Dropdown (Fleet, Services, Routes, Locations, About, Contact) */}
      <div 
        ref={dropdownRef} 
        className="relative flex items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="flex items-center gap-1 cursor-pointer uppercase tracking-[0.08em] text-[11.5px] font-medium text-neutral-900 hover:text-black transition-colors bg-transparent border-0 p-0 select-none py-2"
        >
          <span>More</span>
          <ChevronDown 
            size={13} 
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180 text-black' : 'text-neutral-500'}`} 
          />
        </button>

        {isOpen && (
          <div 
            className="absolute top-full right-0 mt-1 border border-[var(--line)] bg-white shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150 rounded-xl overflow-hidden"
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
                Explore Apna Cars
              </span>
              <span className="text-[10px] text-neutral-400">Directory</span>
            </div>

            <div className="p-1.5">
              {MORE_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex flex-col px-3.5 py-2.5 transition-colors hover:bg-[var(--paper)] group border-b border-neutral-100 last:border-0 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-900 group-hover:text-black normal-case tracking-normal flex items-center gap-1.5">
                      {item.label}
                      <ArrowRight size={11} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-neutral-900" />
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-600 bg-neutral-100 px-2 py-0.5 border border-neutral-200 font-semibold rounded">
                      {item.badge}
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-500 normal-case tracking-normal mt-0.5 leading-snug">
                    {item.desc}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
