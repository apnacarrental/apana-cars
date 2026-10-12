'use client'

import { useTransition, useState } from 'react'
import { createFaq, updateFaq } from '@/app/admin/(dashboard)/faqs/actions'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

export function FaqForm({ item }: { item?: any }) {
  const [isPending, startTransition] = useTransition()
  const [formError, setFormError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormError(null)
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const res = item
        ? await updateFaq(item.id, formData)
        : await createFaq(formData)

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
          <label htmlFor="question" className="block text-sm font-medium text-gray-700">Question</label>
          <input type="text" name="question" id="question" defaultValue={item?.question} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label htmlFor="answer" className="block text-sm font-medium text-gray-700">Answer</label>
          <textarea name="answer" id="answer" defaultValue={item?.answer} required rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700">Sort Order</label>
          <input type="number" name="sortOrder" id="sortOrder" defaultValue={item?.sortOrder || 0} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div className="flex items-center">
          <input type="checkbox" name="isGlobal" id="isGlobal" defaultChecked={item ? item.isGlobal : true} className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" />
          <label htmlFor="isGlobal" className="ml-2 block text-sm text-gray-900">Global FAQ (shows on main FAQ page)</label>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <Link href="/admin/faqs" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</Link>
        <button type="submit" disabled={isPending} className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-900 disabled:opacity-50">
          {isPending ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  )
}
