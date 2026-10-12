'use client'

import { useTransition, useState } from 'react'
import { createRoute, updateRoute } from '@/app/admin/(dashboard)/routes/actions'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

export function RouteForm({ item, locations = [] }: { item?: any, locations?: any[] }) {
  const [isPending, startTransition] = useTransition()
  const [formError, setFormError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormError(null)
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const res = item
        ? await updateRoute(item.id, formData)
        : await createRoute(formData)

      if (res?.success === false) {
        setFormError(res.error)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      {formError && (
        <div className="p-4 bg-red-50 text-red-700 rounded-md flex items-start gap-3 border border-red-200">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <span className="text-sm font-medium">{formError}</span>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">title</label>
          <input type="text" name="title" id="title" defaultValue={item?.title} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700">slug</label>
          <input type="text" name="slug" id="slug" defaultValue={item?.slug} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label htmlFor="origin" className="block text-sm font-medium text-gray-700">Origin</label>
          <input type="text" name="origin" id="origin" defaultValue={item?.origin} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destination</label>
          <input type="text" name="destination" id="destination" defaultValue={item?.destination} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div className="flex items-center">
          <input type="checkbox" name="isActive" id="isActive" defaultChecked={item ? item.isActive : true} className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" />
          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">isActive</label>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <Link href="/admin/routes" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</Link>
        <button type="submit" disabled={isPending} className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-900 disabled:opacity-50">
          {isPending ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  )
}
