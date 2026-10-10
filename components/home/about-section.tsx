import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export function AboutSection() {
  return (
    <section id="about" className="section about">
      <div className="about-image">
        <Image 
          src="/images/journey-road.png" 
          alt="Car journey through open roads" 
          fill 
          sizes="(max-width: 800px) 100vw, 50vw" 
        />
      </div>
      <div className="about-copy">
        <p className="eyebrow">About Apna Car Rental</p>
        <h2>More than a rental.<br /><em>It&apos;s your freedom to move.</em></h2>
        <p>
          We make getting around feel simple. With carefully maintained cars, clear pricing, and support that never feels far away, Apna is the dependable choice for every kind of journey.
        </p>
        <a className="text-button" href="#services">
          Our story <ArrowRight size={17} />
        </a>
        <div className="stats">
          <div>
            <b>100<span>+</span></b>
            <small>Cars in our fleet</small>
          </div>
          <div>
            <b>24/7</b>
            <small>Customer assistance</small>
          </div>
          <div>
            <b>1k<span>+</span></b>
            <small>Happy customers</small>
          </div>
        </div>
      </div>
    </section>
  )
}
