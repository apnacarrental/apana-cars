'use client'
import { useTransition } from 'react'
import { createFaq, updateFaq } from '@/app/admin/faqs/actions'
import Link from 'next/link'

export function FaqForm({ item }: { item?: any }) {
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(() => {
      if (item) {
        updateFaq(item.id, formData)
      } else {
        createFaq(formData)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-8 rounded-xl shadow-sm border border-gray-200">
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
