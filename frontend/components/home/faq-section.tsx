import { FaqAccordion } from '@/components/ui/faq-accordion'
import { getGlobalFaqs } from '@/lib/data/db'

export async function FaqSection() {
  const faqs = await getGlobalFaqs()

  if (!faqs || faqs.length === 0) return null

  return (
    <section className="section faq">
      <p className="eyebrow">Need to know</p>
      <h2>Frequently asked <em>questions.</em></h2>
      <FaqAccordion items={faqs} />
    </section>
  )
}
