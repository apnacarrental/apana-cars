import { getTestimonials } from '@/lib/data/db'

export async function TestimonialsSection() {
  const testimonials = await getTestimonials()

  if (!testimonials || testimonials.length === 0) return null

  return (
    <section className="section testimonials">
      <div className="section-head">
        <div>
          <p className="eyebrow">Customer experiences</p>
          <h2>Loved by people who<br /><em>travel with us.</em></h2>
        </div>
        <div className="rating">
          <strong>4.9</strong>
          <span>★★★★★</span>
          <small>Google rating</small>
        </div>
      </div>
      <div className="testimonial-grid">
        {testimonials.map((t) => (
          <blockquote key={t.id}>
            <span>★★★★★</span>
            <p>{`“${t.review}”`}</p>
            <footer>
              {t.customerName} <small>— {t.locationContext}</small>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  )
}
