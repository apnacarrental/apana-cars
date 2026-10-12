'use client'

import { useState, ReactNode } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowRight } from 'lucide-react'
import { nav as staticNav } from '@/lib/data/home'

interface HeaderWrapperProps {
  navItems?: { label: string; href: string }[]
  children: ReactNode
}

export function HeaderWrapper({ children, navItems }: HeaderWrapperProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const activeNav = navItems?.length ? navItems : staticNav

  return (
    <>
      <header className="site-header">
        {children}
        <button className="menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>
      {menuOpen && (
        <nav className="mobile-menu">
          {activeNav.map((item) => (
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
