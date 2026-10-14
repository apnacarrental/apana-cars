'use client'

import { useTransition, useState } from 'react'
import { createLocation, updateLocation } from '@/app/admin/(dashboard)/locations/actions'
import Link from 'next/link'
import { AlertCircle, MapPin } from 'lucide-react'

export function LocationForm({ item, locations = [] }: { item?: any, locations?: any[] }) {
  const [isPending, startTransition] = useTransition()
  const [formError, setFormError] = useState<string | null>(null)
  const [name, setName] = useState(item?.name || '')
  const [slug, setSlug] = useState(item?.slug || '')
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(!!item?.slug)

  function slugify(text: string) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setName(val)
    if (!isSlugManuallyEdited && !item) {
      setSlug(slugify(val))
    }
  }

  function handleSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSlug(e.target.value)
    setIsSlugManuallyEdited(true)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormError(null)
    const formData = new FormData(e.currentTarget)
    
    startTransition(async () => {
      const res = item 
        ? await updateLocation(item.id, formData) 
        : await createLocation(formData)
        
      if (res?.success === false) {
        setFormError(res.error)
      }
    })
  }

  // Filter out current item from parent options to prevent cyclical parentage
  const parentOptions = locations.filter(loc => !item || loc.id !== item.id)

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      {formError && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-start gap-3 border border-red-200">
          <AlertCircle size={20} className="shrink-0 mt-0.5 text-red-600" />
          <span className="text-sm font-medium">{formError}</span>
        </div>
      )}

      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Location Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input 
                type="text" 
                name="name" 
                id="name" 
                value={name} 
                onChange={handleNameChange}
                placeholder="e.g. RGIA Airport (Shamshabad)" 
                required 
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm" 
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Official display name for website listings & cards.</p>
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
              URL Slug <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              name="slug" 
              id="slug" 
              value={slug} 
              onChange={handleSlugChange}
              placeholder="e.g. shamshabad-airport" 
              required 
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm font-mono" 
            />
            <p className="mt-1 text-xs text-gray-500">Unique URL path: /locations/{slug || '...'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Location Classification <span className="text-red-500">*</span>
            </label>
            <select 
              name="type" 
              id="type" 
              defaultValue={item?.type || 'AREA'} 
              required 
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm bg-white"
            >
              <option value="CITY">City / Major Operational Hub</option>
              <option value="AIRPORT">Airport Hub (RGIA / Terminal)</option>
              <option value="AREA">Area / Neighborhood (Hitec City, Gachibowli, etc.)</option>
              <option value="DESTINATION">Pilgrimage / Outstation Destination (Srisailam, etc.)</option>
            </select>
            <p className="mt-1 text-xs text-gray-500">Determines category badges & routing behavior.</p>
          </div>

          <div>
            <label htmlFor="parentId" className="block text-sm font-medium text-gray-700 mb-1">
              Parent Location
            </label>
            <select 
              name="parentId" 
              id="parentId" 
              defaultValue={item?.parentId || ''} 
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm bg-white"
            >
              <option value="">None (Top-Level City or Hub)</option>
              {parentOptions.map(loc => (
                <option key={loc.id} value={loc.id}>{loc.name} ({loc.type})</option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-500">Group areas under their city (e.g. under Hyderabad).</p>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Short Overview & Meta Summary
          </label>
          <textarea 
            name="description" 
            id="description" 
            rows={3} 
            defaultValue={item?.description || ''} 
            placeholder="e.g. 24/7 airport pickup and cab rentals at Rajiv Gandhi International Airport with flat pricing."
            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <p className="mt-1 text-xs text-gray-500">Shown in location overview cards and search meta snippets.</p>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Detailed Content & Guide
          </label>
          <textarea 
            name="content" 
            id="content" 
            rows={5} 
            defaultValue={item?.content || ''} 
            placeholder="Detailed guide about car rental coverage, pickup points, popular routes, and customer perks in this area..."
            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <p className="mt-1 text-xs text-gray-500">Rendered on the dedicated /locations/{slug || '...'} page.</p>
        </div>

        <div className="pt-2">
          <label className="relative flex items-start gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              name="isActive" 
              id="isActive" 
              defaultChecked={item ? item.isActive : true} 
              className="h-4 w-4 mt-0.5 rounded border-gray-300 text-black focus:ring-black" 
            />
            <div>
              <span className="text-sm font-medium text-gray-900">Active & Published</span>
              <p className="text-xs text-gray-500">When checked, this location appears on public navigation, search, and booking forms.</p>
            </div>
          </label>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-5 border-t border-gray-200">
        <Link 
          href="/admin/locations" 
          className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </Link>
        <button 
          type="submit" 
          disabled={isPending} 
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-sm"
        >
          <MapPin size={16} />
          {isPending ? 'Saving Location...' : (item ? 'Update Location' : 'Create Location')}
        </button>
      </div>
    </form>
  )
}
