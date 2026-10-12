'use client'

import { useTransition } from 'react'
import { deleteBlog } from '@/app/admin/(dashboard)/blogs/actions'

export function DeleteBlogButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      type="button"
      onClick={() => {
        if (confirm('Are you sure you want to delete this blog post?')) {
          startTransition(async () => {
            const res = await deleteBlog(id)
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
