'use client'
import { useTransition } from 'react'
import { createTestimonial, updateTestimonial } from '@/app/admin/testimonials/actions'
import Link from 'next/link'

export function TestimonialForm({ item }: { item?: any }) {
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(() => {
      if (item) {
        updateTestimonial(item.id, formData)
      } else {
        createTestimonial(formData)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <div className="space-y-4">
        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Customer Name</label>
          <input type="text" name="customerName" id="customerName" defaultValue={item?.customerName} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label htmlFor="review" className="block text-sm font-medium text-gray-700">Review</label>
          <textarea name="review" id="review" defaultValue={item?.review} required rows={4} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label htmlFor="locationContext" className="block text-sm font-medium text-gray-700">Location Context (e.g. 'Rented in Hyderabad')</label>
          <input type="text" name="locationContext" id="locationContext" defaultValue={item?.locationContext} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
            <input type="number" name="rating" id="rating" min="1" max="5" defaultValue={item?.rating || 5} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
          </div>
          <div className="flex-1">
            <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700">Sort Order</label>
            <input type="number" name="sortOrder" id="sortOrder" defaultValue={item?.sortOrder || 0} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
          </div>
        </div>
        <div className="flex items-center">
          <input type="checkbox" name="isActive" id="isActive" defaultChecked={item ? item.isActive : true} className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" />
          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">Active (Publicly Visible)</label>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <Link href="/admin/testimonials" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</Link>
        <button type="submit" disabled={isPending} className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-900 disabled:opacity-50">
          {isPending ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  )
}
