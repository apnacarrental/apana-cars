'use client'

import { useTransition, useState } from 'react'
import { createRoute, updateRoute } from '@/app/admin/(dashboard)/routes/actions'
import Link from 'next/link'
import { AlertCircle, IndianRupee, MapPin, Clock, Gauge, FileText, CheckCircle2 } from 'lucide-react'

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
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
      {formError && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-start gap-3 border border-red-200">
          <AlertCircle size={20} className="shrink-0 mt-0.5 text-red-600" />
          <div className="text-sm font-medium">{formError}</div>
        </div>
      )}

      {/* Datalist for location auto-complete */}
      <datalist id="route-locations">
        {locations.map((loc) => (
          <option key={loc.id || loc.name} value={loc.name} />
        ))}
      </datalist>

      {/* Section 1: Route Basics */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
          <MapPin size={18} className="text-blue-600" />
          Route Information
        </h2>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Route Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={item?.title || ''}
            required
            placeholder="e.g. Hyderabad to Srisailam Taxi Service"
            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
            URL Slug <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center rounded-lg border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
            <span className="bg-gray-50 text-gray-500 px-3 py-2.5 text-xs sm:text-sm border-r border-gray-300 select-none">
              /routes/
            </span>
            <input
              type="text"
              name="slug"
              id="slug"
              defaultValue={item?.slug || ''}
              required
              placeholder="hyderabad-to-srisailam"
              className="w-full px-3 py-2.5 text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-1">
              Origin City / Hub <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="origin"
              id="origin"
              list="route-locations"
              defaultValue={item?.origin || ''}
              required
              placeholder="e.g. Hyderabad"
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
              Destination City / Town <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="destination"
              id="destination"
              list="route-locations"
              defaultValue={item?.destination || ''}
              required
              placeholder="e.g. Srisailam"
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Pricing & Metrics */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
          <IndianRupee size={18} className="text-emerald-600" />
          Pricing & Travel Metrics
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="startingPrice" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <span>Starting Fare (₹)</span>
            </label>
            <div className="relative rounded-lg">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 font-semibold">
                ₹
              </span>
              <input
                type="number"
                step="1"
                min="0"
                name="startingPrice"
                id="startingPrice"
                defaultValue={item?.startingPrice ?? ''}
                placeholder="5200"
                className="w-full pl-8 pr-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium text-gray-900"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Displayed in route cards & tables.</p>
          </div>

          <div>
            <label htmlFor="distance" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Gauge size={14} className="text-gray-400" />
              <span>Distance (km)</span>
            </label>
            <input
              type="number"
              step="any"
              min="0"
              name="distance"
              id="distance"
              defaultValue={item?.distance ?? ''}
              placeholder="e.g. 215"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <p className="text-xs text-gray-500 mt-1">Approx highway distance.</p>
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Clock size={14} className="text-gray-400" />
              <span>Travel Time</span>
            </label>
            <input
              type="text"
              name="duration"
              id="duration"
              defaultValue={item?.duration ?? ''}
              placeholder="e.g. 4.5 Hours"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <p className="text-xs text-gray-500 mt-1">Estimated driving duration.</p>
          </div>
        </div>
      </div>

      {/* Section 3: Overview & Content */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
          <FileText size={18} className="text-indigo-600" />
          Route Overview & Travel Content
        </h2>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Route Description & Highlights
          </label>
          <textarea
            name="content"
            id="content"
            rows={5}
            defaultValue={item?.content ?? ''}
            placeholder="Describe the highway corridor, road conditions, scenic stopovers, Ghat roads, toll gates, and pilgrimage/tourist tips for travelers..."
            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <p className="text-xs text-gray-500 mt-1">Rich content helps SEO rankings and route authority.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="inclusions" className="block text-sm font-medium text-gray-700 mb-1">
              Inclusions <span className="text-xs font-normal text-gray-500">(One per line)</span>
            </label>
            <textarea
              name="inclusions"
              id="inclusions"
              rows={4}
              defaultValue={item?.inclusions?.join('\n') || ''}
              placeholder="AC Vehicle & Fuel&#10;Toll Gates Included&#10;Driver Daily Bata"
              className="w-full font-mono text-xs sm:text-sm rounded-lg border border-gray-300 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="exclusions" className="block text-sm font-medium text-gray-700 mb-1">
              Exclusions <span className="text-xs font-normal text-gray-500">(One per line)</span>
            </label>
            <textarea
              name="exclusions"
              id="exclusions"
              rows={4}
              defaultValue={item?.exclusions?.join('\n') || ''}
              placeholder="State Border Taxes (if any)&#10;Parking Charges&#10;Night Halt Allowance"
              className="w-full font-mono text-xs sm:text-sm rounded-lg border border-gray-300 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* Section 4: Publishing Status */}
      <div className="pt-2 border-t border-gray-100">
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            name="isActive"
            id="isActive"
            defaultChecked={item ? item.isActive : true}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <div>
            <span className="block text-sm font-medium text-gray-900">Active & Published</span>
            <span className="block text-xs text-gray-500">
              When checked, this route will be publicly searchable, indexed, and available for instant booking.
            </span>
          </div>
        </label>
      </div>

      {/* Actions */}
      <div className="flex justify-end items-center gap-3 pt-6 border-t border-gray-200">
        <Link
          href="/admin/routes"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm disabled:opacity-50 transition-colors"
        >
          {isPending ? 'Saving Route...' : item ? 'Update Route' : 'Create Route'}
        </button>
      </div>
    </form>
  )
}
