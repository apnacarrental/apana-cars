import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Phone, MessageCircle } from 'lucide-react'

export function Footer() {
  return (
    <>
      <footer id="contact" className="footer">
        <div className="footer-top">
          <div>
            <Image src="/images/logo_clean_dark.png" alt="Apna Car Rental" width={180} height={40} className="h-9 w-auto object-contain" />
            <p>Your trusted partner for moving freely, comfortably, and on your own terms.</p>
          </div>
          <div>
            <h3>Explore</h3>
            <Link href="/about">About us</Link>
            <Link href="/services">Services</Link>
            <Link href="/fleet">Our fleet</Link>
            <Link href="/locations">Locations</Link>
            <Link href="/blog">Travel Blog</Link>
          </div>
          <div>
            <h3>Cab Packages</h3>
            <Link href="/airport-cabs">Airport Cabs</Link>
            <Link href="/hourly-cabs">Hourly Cabs</Link>
            <Link href="/sightseeing-cabs">Sightseeing Cabs</Link>
            <Link href="/outstation-cabs">Outstation Cabs</Link>
            <Link href="/srisailam-cabs">Srisailam Tour</Link>
            <Link href="/force-urbania-rent-in-hyderabad">Force Urbania</Link>
          </div>
          <div>
            <h3>Get in touch</h3>
            <a href="tel:+919988123444" style={{ fontWeight: 600 }}>099881 23444</a>
            <a href="https://wa.me/919988123444" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontWeight: 600 }}>Chat on WhatsApp</a>
            <a href="mailto:hello@apnacarrental.com">hello@apnacarrental.com</a>
            <span style={{ fontSize: '0.85rem', lineHeight: '1.4', marginTop: '0.5rem', display: 'block', color: '#888' }}>
              Garden colony, H. No - 4-4-123, opp. SBI ATM, Quthbullapur Garden Colony, Bhagyalaxmi Nagar, Quthbullapur, Hyderabad, Telangana 500055
            </span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Apna Cars. All rights reserved.</span>
          <span>Privacy &middot; Terms &middot; Cancellation</span>
        </div>
      </footer>
      <div className="floating">
        <a href="tel:+919988123444" aria-label="Call Apna Cars">
          <Phone size={17} /> Call
        </a>
        <a href="https://wa.me/919988123444" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" style={{ color: '#25D366' }}>
          <MessageCircle size={17} /> WhatsApp
        </a>
        <a href="/#book">
          Book now <ArrowRight size={15} />
        </a>
      </div>
    </>
  )
}
