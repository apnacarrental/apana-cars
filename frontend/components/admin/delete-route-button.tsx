'use client'

import { useTransition } from 'react'
import { deleteRoute } from '@/app/admin/(dashboard)/routes/actions'

export function DeleteRouteButton({ id, title }: { id: string; title?: string }) {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      type="button"
      onClick={() => {
        if (confirm(`Are you sure you want to permanently delete "${title || 'this route'}"?`)) {
          startTransition(async () => {
            const res = await deleteRoute(id)
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
