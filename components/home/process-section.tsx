import { processSteps } from '@/lib/data/home'

export function ProcessSection() {
  return (
    <section className="section process">
      <p className="eyebrow">Simple from start to finish</p>
      <h2>Book your ride in <em>four</em> easy steps.</h2>
      <div className="steps">
        {processSteps.map((step, i) => (
          <div className="step" key={step}>
            <span>0{i + 1}</span>
            <div>
              <h3>{step}</h3>
              <p>We&apos;ll take care of the rest.</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
