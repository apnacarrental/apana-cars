'use client'

import { useTransition, useState } from 'react'
import { createLead } from '@/app/admin/(dashboard)/leads/actions'
import Link from 'next/link'
import { AlertCircle, UserPlus, ArrowLeft } from 'lucide-react'

export default function NewLeadPage() {
  const [isPending, startTransition] = useTransition()
  const [formError, setFormError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormError(null)
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const res = await createLead(formData)
      if (res?.success === false) {
        setFormError(res.error)
      }
    })
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link 
          href="/admin/leads" 
          className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manually Log Inquiry / Lead</h1>
          <p className="text-sm text-gray-500">Record a phone call, WhatsApp booking, or offline walk-in inquiry.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        {formError && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-start gap-3 border border-red-200">
            <AlertCircle size={20} className="shrink-0 mt-0.5 text-red-600" />
            <span className="text-sm font-medium">{formError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Customer Full Name <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              name="name" 
              id="name" 
              required 
              placeholder="e.g. Ramesh Chandra" 
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-900 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input 
              type="tel" 
              name="phone" 
              id="phone" 
              required 
              placeholder="e.g. +91 98765 43210" 
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-900 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address (Optional)
          </label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            placeholder="e.g. ramesh@gmail.com" 
            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-900 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-1">
              Pickup Location
            </label>
            <input 
              type="text" 
              name="pickupLocation" 
              id="pickupLocation" 
              placeholder="e.g. RGIA Shamshabad Airport" 
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-900 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
            />
          </div>

          <div>
            <label htmlFor="dropLocation" className="block text-sm font-medium text-gray-700 mb-1">
              Dropoff Location
            </label>
            <input 
              type="text" 
              name="dropLocation" 
              id="dropLocation" 
              placeholder="e.g. Hitec City Westin" 
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-900 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
            />
          </div>
        </div>

        <div>
          <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-1">
            No. of Passengers
          </label>
          <input 
            type="text" 
            name="passengers" 
            id="passengers" 
            placeholder="e.g. 1-4 Passengers, 5-7 Passengers, 8-12 Passengers" 
            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-900 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Inquiry Status
          </label>
          <select 
            name="status" 
            id="status" 
            defaultValue="NEW" 
            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-900 text-sm bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="NEW">New (Requires Follow-up)</option>
            <option value="CONTACTED">Contacted (In Discussion)</option>
            <option value="CONVERTED">Converted (Confirmed Booking)</option>
            <option value="LOST">Lost (Cancelled / No Response)</option>
          </select>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Internal Agent Notes
          </label>
          <textarea 
            name="notes" 
            id="notes" 
            rows={3} 
            placeholder="e.g. Client requested Innova Crysta for 3 days Srisailam pilgrimage. Quoted ₹22/km." 
            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-900 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <Link 
            href="/admin/leads" 
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button 
            type="submit" 
            disabled={isPending} 
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 shadow-sm"
          >
            <UserPlus size={16} />
            {isPending ? 'Logging Inquiry...' : 'Log Inquiry'}
          </button>
        </div>
      </form>
    </div>
  )
}
