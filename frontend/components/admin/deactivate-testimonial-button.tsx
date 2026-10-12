'use client'

import { useTransition } from 'react'
import { deactivateTestimonial } from '@/app/admin/(dashboard)/testimonials/actions'

export function DeactivateTestimonialButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      type="button"
      onClick={() => {
        if (confirm('Are you sure you want to deactivate this testimonial?')) {
          startTransition(async () => {
            const res = await deactivateTestimonial(id)
            if (res?.success === false) {
              alert(res.error)
            }
          })
        }
      }}
      disabled={isPending}
      className="text-orange-600 hover:text-orange-900 disabled:opacity-50"
    >
      {isPending ? 'Deactivating...' : 'Deactivate'}
    </button>
  )
}
