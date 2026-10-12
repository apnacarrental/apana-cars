'use client'
import { useTransition } from 'react'
import { deleteCategory } from '@/app/admin/(dashboard)/categories/actions'

export function DeleteCategoryButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()
  
  return (
    <button 
      type="button"
      onClick={() => {
        if (confirm('Are you sure you want to delete this category?')) {
          startTransition(async () => {
            const res = await deleteCategory(id)
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
