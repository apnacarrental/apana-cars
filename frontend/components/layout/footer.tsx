import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

export function Footer() {
  return (
    <>
      <footer id="contact" className="footer">
        <div className="footer-top">
          <div>
            <Image src="/images/logo-apna-car.png" alt="Apna Car Rental" width={182} height={58} />
            <p>Your trusted partner for moving freely, comfortably, and on your own terms.</p>
          </div>
          <div>
            <h3>Explore</h3>
            <Link href="/about">About us</Link>
            <Link href="/services">Services</Link>
            <Link href="/fleet">Our fleet</Link>
            <Link href="/locations">Locations</Link>
          </div>
          <div>
            <h3>Get in touch</h3>
            <a href="tel:+919000000000">+91 90000 00000</a>
            <a href="mailto:hello@apnacarrental.com">hello@apnacarrental.com</a>
            <span>Hyderabad, Telangana</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Apna Car Rental. All rights reserved.</span>
          <span>Privacy &middot; Terms &middot; Cancellation</span>
        </div>
      </footer>
      <div className="floating">
        <a href="tel:+919000000000">
          <Phone size={17} /> Call
        </a>
        <a href="https://wa.me/919000000000">
          <span className="whatsapp-dot" /> WhatsApp
        </a>
        <a href="#book">
          Book now <ArrowRight size={15} />
        </a>
      </div>
    </>
  )
}
