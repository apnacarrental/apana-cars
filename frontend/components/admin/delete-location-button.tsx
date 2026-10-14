'use client'

import { useTransition } from 'react'
import { deleteLocation } from '@/app/admin/(dashboard)/locations/actions'

export function DeleteLocationButton({ id, name }: { id: string; name?: string }) {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      type="button"
      onClick={() => {
        if (confirm(`Are you sure you want to permanently delete "${name || 'this location'}"?`)) {
          startTransition(async () => {
            const res = await deleteLocation(id)
            if (res?.success === false) {
              alert(res.error)
            }
          })
        }
      }}
      disabled={isPending}
      className="text-red-600 hover:text-red-900 disabled:opacity-50 text-sm font-medium"
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  )
}
