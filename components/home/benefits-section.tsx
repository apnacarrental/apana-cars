import { Sparkles } from 'lucide-react'
import { benefits } from '@/lib/data/home'

export function BenefitsSection() {
  return (
    <section className="dark-section">
      <div className="section dark-inner">
        <p className="eyebrow light">The Apna difference</p>
        <h2>Why travel <em>with</em> Apna?</h2>
        <div className="benefit-grid">
          {benefits.map((benefit, i) => (
            <div className="benefit" key={benefit}>
              <span>0{i + 1}</span>
              <Sparkles size={19} />
              <h3>{benefit}</h3>
              <p>Thoughtfully designed for a smoother way to move.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
