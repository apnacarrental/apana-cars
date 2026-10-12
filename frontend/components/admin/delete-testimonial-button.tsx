'use client'

import { useTransition } from 'react'
import { deleteTestimonial } from '@/app/admin/(dashboard)/testimonials/actions'

export function DeleteTestimonialButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      type="button"
      onClick={() => {
        if (confirm('Are you sure you want to delete this testimonial?')) {
          startTransition(async () => {
            const res = await deleteTestimonial(id)
            if (res?.success === false) {
              alert(res.error)
            }
          })
        }
      }}
      disabled={isPending}
      className="text-red-600 hover:text-red-900 disabled:opacity-50"
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  )
}
