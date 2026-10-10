'use client'
import { useTransition } from 'react'
import { createService, updateService } from '@/app/admin/services/actions'
import Link from 'next/link'

export function ServiceForm({ item }: { item?: any }) {
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(() => {
      if (item) {
        updateService(item.id, formData)
      } else {
        createService(formData)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-8 rounded-xl shadow-sm border border-gray-200">
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
          <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">shortDescription</label>
          <input type="text" name="shortDescription" id="shortDescription" defaultValue={item?.shortDescription} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700">sortOrder</label>
          <input type="number" name="sortOrder" id="sortOrder" defaultValue={item?.sortOrder || 0} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div className="flex items-center">
          <input type="checkbox" name="isActive" id="isActive" defaultChecked={item ? item.isActive : true} className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" />
          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">isActive</label>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <Link href="/admin/services" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</Link>
        <button type="submit" disabled={isPending} className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-900 disabled:opacity-50">
          {isPending ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  )
}
