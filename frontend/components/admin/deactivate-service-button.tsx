'use client'
import { useTransition } from 'react'
import { deactivateService } from '@/app/admin/(dashboard)/services/actions'

export function DeactivateServiceButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()
  
  return (
    <button 
      type="button"
      onClick={() => {
        if (confirm('Are you sure you want to deactivate this service?')) {
          startTransition(async () => {
            const res = await deactivateService(id)
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
