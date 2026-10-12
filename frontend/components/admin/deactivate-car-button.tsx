'use client'

import { useTransition } from 'react'
import { deactivateCar } from '@/app/admin/(dashboard)/cars/actions'

export function DeactivateCarButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      type="button"
      onClick={() => {
        if (confirm('Are you sure you want to deactivate this car?')) {
          startTransition(async () => {
            const res = await deactivateCar(id)
            if (res?.success === false) {
              alert(res.error)
            }
          })
        }
      }}
      disabled={isPending}
      className="text-red-600 hover:text-red-900 disabled:opacity-50"
    >
      {isPending ? 'Deactivating...' : 'Deactivate'}
    </button>
  )
}
