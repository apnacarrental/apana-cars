'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  
  if (!items || items.length === 0) return null

  return (
    <div className="faq-list">
      {items.map((faq, i) => (
        <div className={`faq-item ${openFaq === i ? 'active' : ''}`} key={faq.id}>
          <button onClick={() => setOpenFaq(openFaq === i ? null : i)}>
            <span>{faq.question}</span>
            <ChevronDown size={19} />
          </button>
          {openFaq === i && (
            <p>{faq.answer} <a href="#contact">Talk to us</a>.</p>
          )}
        </div>
      ))}
    </div>
  )
}
