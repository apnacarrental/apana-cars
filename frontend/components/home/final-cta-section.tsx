import Image from 'next/image'
import { ArrowRight, Phone } from 'lucide-react'

export function FinalCtaSection() {
  return (
    <section className="final-cta">
      <Image 
        src="/images/fleet-suv.png" 
        alt="Premium SUV ready for your next journey" 
        fill 
        sizes="100vw" 
      />
      <div className="hero-overlay" />
      <div className="final-content">
        <p className="eyebrow light">Your next adventure starts here</p>
        <h2>Ready to hit<br /><em>the road?</em></h2>
        <p>Tell us where you&apos;re going. We&apos;ll help you get there.</p>
        <div className="hero-buttons">
          <a className="button button-light" href="#book">
            Book your car <ArrowRight size={17} />
          </a>
          <a className="text-button light" href="tel:+919988123444">
            Call us 099881 23444 <Phone size={17} />
          </a>
        </div>
      </div>
    </section>
  )
}
