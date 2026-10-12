'use client'
import { useTransition, useState } from 'react'
import { createCategory, updateCategory } from '@/app/admin/(dashboard)/categories/actions'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

export function CategoryForm({ item }: { item?: any }) {
  const [isPending, startTransition] = useTransition()
  const [formError, setFormError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormError(null)
    const formData = new FormData(e.currentTarget)
    
    startTransition(async () => {
      const res = item 
        ? await updateCategory(item.id, formData) 
        : await createCategory(formData);
        
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
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">name</label>
          <input type="text" name="name" id="name" defaultValue={item?.name} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700">slug</label>
          <input type="text" name="slug" id="slug" defaultValue={item?.slug} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">description</label>
          <input type="text" name="description" id="description" defaultValue={item?.description} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <Link href="/admin/categories" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</Link>
        <button type="submit" disabled={isPending} className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-900 disabled:opacity-50">
          {isPending ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  )
}
