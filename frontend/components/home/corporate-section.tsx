import { ArrowRight, Check } from 'lucide-react'
import { corporateItems } from '@/lib/data/home'

export function CorporateSection() {
  return (
    <section id="corporate" className="corporate section">
      <div>
        <p className="eyebrow">For modern businesses</p>
        <h2>Moving businesses <em>forward.</em></h2>
        <p>
          From the everyday commute to the executive arrival, give your people a better way to travel.
        </p>
        <a className="button button-dark" href="mailto:corporate@apnacarrental.com">
          Talk to our corporate team <ArrowRight size={16} />
        </a>
      </div>
      <div className="corporate-list">
        {corporateItems.map((item) => (
          <div key={item}>
            <Check size={16} />
            {item}
          </div>
        ))}
      </div>
    </section>
  )
}
