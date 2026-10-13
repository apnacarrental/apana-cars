import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { nav as staticNav } from '@/lib/data/home'
import { getNavigationItems } from '@/lib/data/seo'
import { HeaderWrapper } from '@/components/ui/mobile-menu'
import { HeaderNavDropdown } from '@/components/layout/header-nav-dropdown'

export async function Header() {
  const dbNav = await getNavigationItems()
  const activeNav = dbNav.length ? dbNav.map(n => ({ label: n.label, href: n.href })) : staticNav

  return (
    <HeaderWrapper navItems={activeNav}>
      <Link href="/" className="brand">
        <Image src="/images/logo-apna-car.png" alt="Apna Car Rental" width={182} height={58} priority />
      </Link>
      <HeaderNavDropdown items={activeNav} />
      <div className="header-actions">
        <a className="call-link" href="https://wa.me/919988123444" target="_blank" rel="noopener noreferrer" title="Chat on WhatsApp" style={{ color: '#25D366' }}>
          WhatsApp
        </a>
        <a className="call-link" href="tel:+919988123444">
          <Phone size={15} /> 099881 23444
        </a>
        <Link className="button button-dark" href="/#book">
          Book a car <ArrowRight size={16} />
        </Link>
      </div>
    </HeaderWrapper>
  )
}
