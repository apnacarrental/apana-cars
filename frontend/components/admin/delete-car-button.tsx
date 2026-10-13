'use client'

import { useTransition } from 'react'
import { deleteCar } from '@/app/admin/(dashboard)/cars/actions'
import { Trash2 } from 'lucide-react'

export function DeleteCarButton({ id, name }: { id: string; name?: string }) {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      type="button"
      onClick={() => {
        if (confirm(`Permanently delete "${name || 'this car'}"? This action cannot be undone.`)) {
          startTransition(async () => {
            const res = await deleteCar(id)
            if (res?.success === false) {
              alert(res.error)
            }
          })
        }
      }}
      disabled={isPending}
      title="Delete Car"
      className="text-red-600 hover:text-red-800 disabled:opacity-50 p-1 rounded hover:bg-red-50 transition"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  )
}
