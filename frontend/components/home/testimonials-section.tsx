import { getTestimonials, getReviewBadgeSettings, type ReviewBadgeSettings } from '@/lib/data/db'

export async function TestimonialsSection({ settings }: { settings?: ReviewBadgeSettings } = {}) {
  const [testimonials, badgeSettings] = await Promise.all([
    getTestimonials(),
    settings ? Promise.resolve(settings) : getReviewBadgeSettings(),
  ])

  if (!testimonials || testimonials.length === 0) return null

  const ratingDisplay = badgeSettings.ratingValue.replace('/5', '')

  return (
    <section className="section testimonials">
      <div className="section-head">
        <div>
          <p className="eyebrow">Customer experiences</p>
          <h2>Loved by people who<br /><em>travel with us.</em></h2>
        </div>
        <a 
          href={badgeSettings.gmbUrl}
          target="_blank"
          rel="noopener noreferrer"
          title={`Read our ${badgeSettings.reviewCountText} Google Reviews`}
          className="rating hover:opacity-90 transition-opacity cursor-pointer group"
        >
          <strong>{ratingDisplay}</strong>
          <span>★★★★★</span>
          <small className="group-hover:underline">Google rating &rarr;</small>
        </a>
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
