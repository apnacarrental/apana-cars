'use client'

import { useState, useEffect, ReactNode } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowRight } from 'lucide-react'
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
        <button className="menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>
      {menuOpen && (
        <nav className="mobile-menu">
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
