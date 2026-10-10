import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="hero">
      <Image 
        src="/images/hero-car.png" 
        alt="Luxury car ready for a journey" 
        fill 
        priority 
        className="hero-image" 
        sizes="100vw" 
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="eyebrow light">Premium car rentals</p>
        <h1>
          Your journey.<br />
          <span>Your car. Your way.</span>
        </h1>
        <p className="hero-copy">
          From quick city escapes to journeys across the country, move freely with a car that fits your plans.
        </p>
        <div className="hero-buttons">
          <a className="button button-light" href="#book">
            Book a car <ArrowRight size={17} />
          </a>
          <a className="text-button light" href="#fleet">
            Explore our fleet <ArrowRight size={17} />
          </a>
        </div>
      </div>
      <div className="hero-note">
        <span>01</span>
        <span>Move differently</span>
        <span className="note-line" />
      </div>
    </section>
  )
}
