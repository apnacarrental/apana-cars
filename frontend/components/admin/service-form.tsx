'use client'
import { useTransition, useState } from 'react'
import { createService, updateService } from '@/app/admin/(dashboard)/services/actions'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

export function ServiceForm({ item }: { item?: any }) {
  const [isPending, startTransition] = useTransition()
  const [formError, setFormError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormError(null)
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const res = item 
        ? await updateService(item.id, formData) 
        : await createService(formData);
        
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
          <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">Short Description</label>
          <input type="text" name="shortDescription" id="shortDescription" defaultValue={item?.shortDescription} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startingPrice" className="block text-sm font-medium text-gray-700">
              Starting Price (₹)
            </label>
            <input 
              type="number" 
              name="startingPrice" 
              id="startingPrice" 
              step="any"
              placeholder="e.g. 1499"
              defaultValue={item?.startingPrice ?? ''} 
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black" 
            />
          </div>
          <div>
            <label htmlFor="priceUnit" className="block text-sm font-medium text-gray-700">
              Price Unit / Note (Optional)
            </label>
            <input 
              type="text" 
              name="priceUnit" 
              id="priceUnit" 
              placeholder="e.g. onwards, per day, 8 hrs / 80 km"
              defaultValue={item?.priceUnit ?? ''} 
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black" 
            />
          </div>
        </div>
        <div>
          <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700">sortOrder</label>
          <input type="number" name="sortOrder" id="sortOrder" defaultValue={item?.sortOrder || 0} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div className="flex items-center">
          <input type="checkbox" name="isActive" id="isActive" defaultChecked={item ? item.isActive : true} className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" />
          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">isActive (Published on site)</label>
        </div>
        <div className="flex items-center">
          <input 
            type="checkbox" 
            name="showInQuickBar" 
            id="showInQuickBar" 
            defaultChecked={item ? item.showInQuickBar !== false : true} 
            className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500" 
          />
          <label htmlFor="showInQuickBar" className="ml-2 block text-sm font-medium text-gray-900">
            Show in Quick Services Bar (Auto-scrolling bar below Hero)
          </label>
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
