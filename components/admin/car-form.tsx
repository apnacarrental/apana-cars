'use client'

import { useTransition } from 'react'
import { createCar, updateCar } from '@/app/admin/cars/actions'
import Link from 'next/link'

export function CarForm({ car, brands }: { car?: any, brands: any[] }) {
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(() => {
      if (car) {
        updateCar(car.id, formData)
      } else {
        createCar(formData)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" name="name" id="name" defaultValue={car?.name} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug</label>
          <input type="text" name="slug" id="slug" defaultValue={car?.slug} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>

        <div>
          <label htmlFor="brandId" className="block text-sm font-medium text-gray-700">Brand</label>
          <select name="brandId" id="brandId" defaultValue={car?.brandId} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
            <option value="">Select a brand</option>
            {brands.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">Short Description</label>
          <textarea name="shortDescription" id="shortDescription" defaultValue={car?.shortDescription} rows={2} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Detailed Description</label>
          <textarea name="description" id="description" defaultValue={car?.description} rows={5} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>

        <div>
          <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700">Sort Order</label>
          <input type="number" name="sortOrder" id="sortOrder" defaultValue={car?.sortOrder || 0} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-4 mt-4">
          <div>
            <label htmlFor="seats" className="block text-sm font-medium text-gray-700">Seats</label>
            <input type="number" name="seats" id="seats" defaultValue={car?.seats || 4} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
          </div>
          <div>
            <label htmlFor="luggage" className="block text-sm font-medium text-gray-700">Luggage Capacity</label>
            <input type="number" name="luggage" id="luggage" defaultValue={car?.luggage || 2} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
          </div>
          <div>
            <label htmlFor="doors" className="block text-sm font-medium text-gray-700">Doors</label>
            <input type="number" name="doors" id="doors" defaultValue={car?.doors || 4} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
          </div>
          <div>
            <label htmlFor="transmission" className="block text-sm font-medium text-gray-700">Transmission</label>
            <select name="transmission" id="transmission" defaultValue={car?.transmission || 'Automatic'} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
          <div>
            <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700">Fuel Type</label>
            <select name="fuelType" id="fuelType" defaultValue={car?.fuelType || 'Petrol'} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label htmlFor="pricePerDay" className="block text-sm font-medium text-gray-700">Price Per Day (₹)</label>
            <input type="number" step="0.01" name="pricePerDay" id="pricePerDay" defaultValue={car?.pricePerDay || 1000} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
          </div>
        </div>

        <div className="flex items-center pt-2">
          <input type="checkbox" name="isActive" id="isActive" defaultChecked={car ? car.isActive : true} className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" />
          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">Active</label>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <Link href="/admin/cars" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
          Cancel
        </Link>
        <button type="submit" disabled={isPending} className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-900 disabled:opacity-50">
          {isPending ? 'Saving...' : 'Save Car'}
        </button>
      </div>
    </form>
  )
}
