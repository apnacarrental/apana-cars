'use client'

import { useState, useEffect, ReactNode } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowRight, Phone } from 'lucide-react'
import { nav as staticNav } from '@/lib/data/home'

interface HeaderWrapperProps {
  navItems?: { label: string; href: string }[]
  children: ReactNode
}

export function HeaderWrapper({ children, navItems }: HeaderWrapperProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const activeNav = navItems?.length ? navItems : staticNav

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15)
    }
    // Check initial scroll position
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
        {children}
        <div className="header-mobile-controls flex items-center gap-2 shrink-0">
          <a
            href="tel:+919988123444"
            className="mobile-header-call inline-flex items-center gap-1.5 bg-neutral-950 hover:bg-neutral-800 text-white px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold shadow-xs border border-neutral-800 transition-colors"
            title="Call 099881 23444"
            aria-label="Call 099881 23444"
          >
            <span className="w-5 h-5 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center shrink-0">
              <Phone size={10} className="fill-current text-neutral-950" />
            </span>
            <span className="tracking-wide font-extrabold text-[12px]">099881 23444</span>
          </a>
          <button className="menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {menuOpen && (
        <nav className="mobile-menu">
          {/* Top Quick Call Banner inside mobile drawer */}
          <a
            href="tel:+919988123444"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-between w-full bg-neutral-950 hover:bg-neutral-900 text-white p-3 rounded-xl shadow-xs border border-neutral-800 mb-3 transition-colors !border-b-0"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center shrink-0">
                <Phone size={13} className="fill-current text-neutral-950" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">24/7 Cab Booking</div>
                <div className="text-sm font-extrabold text-white tracking-wide">099881 23444</div>
              </div>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider bg-white/15 px-3 py-1.5 rounded-lg text-white">Call Now</span>
          </a>

          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <div className="py-2 border-b border-[var(--line)] bg-[var(--paper)] -mx-5 px-5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-2">
              Cab Packages
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link href="/airport-cabs" onClick={() => setMenuOpen(false)} className="text-neutral-900 font-semibold !p-1 !border-0">
                ✈️ Airport Cabs
              </Link>
              <Link href="/hourly-cabs" onClick={() => setMenuOpen(false)} className="text-neutral-900 font-semibold !p-1 !border-0">
                ⏱️ Hourly Cabs
              </Link>
              <Link href="/sightseeing-cabs" onClick={() => setMenuOpen(false)} className="text-neutral-900 font-semibold !p-1 !border-0">
                🏛️ Sightseeing
              </Link>
              <Link href="/outstation-cabs" onClick={() => setMenuOpen(false)} className="text-neutral-900 font-semibold !p-1 !border-0">
                🛣️ Outstation
              </Link>
              <Link href="/srisailam-cabs" onClick={() => setMenuOpen(false)} className="text-neutral-900 font-semibold !p-1 !border-0">
                🛕 Srisailam
              </Link>
              <Link href="/force-urbania-rent-in-hyderabad" onClick={() => setMenuOpen(false)} className="text-neutral-900 font-semibold !p-1 !border-0">
                🚐 Force Urbania
              </Link>
            </div>
          </div>
          {activeNav.filter(n => n.label !== 'Home').map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link className="button button-dark" href="/#book" onClick={() => setMenuOpen(false)}>
            Book a car <ArrowRight size={16} />
          </Link>
        </nav>
      )}
    </>
  )
}
