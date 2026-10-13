'use client'

import { useTransition, useState } from 'react'
import { createCar, updateCar } from '@/app/admin/(dashboard)/cars/actions'
import Link from 'next/link'
import { AlertCircle, Fuel, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react'

export function CarForm({ car, brands }: { car?: any, brands: any[] }) {
  const [isPending, startTransition] = useTransition()
  const [formError, setFormError] = useState<string | null>(null)
  const [fuelType, setFuelType] = useState<string>(car?.fuelType || 'PETROL')
  const [showAllFuelVariants, setShowAllFuelVariants] = useState<boolean>(
    Boolean(
      (car?.petrolPricePerKm && fuelType !== 'PETROL') ||
      (car?.dieselPricePerKm && fuelType !== 'DIESEL') ||
      (car?.electricPricePerKm && fuelType !== 'ELECTRIC') ||
      (car?.hybridPricePerKm && fuelType !== 'HYBRID')
    )
  )
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
    } else {
      setImagePreview(null)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormError(null)
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const res = car
        ? await updateCar(car.id, formData)
        : await createCar(formData)

      if (res?.success === false) {
        setFormError(res.error)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
      {formError && (
        <div className="p-4 bg-red-50 text-red-700 rounded-md flex items-start gap-3 border border-red-200">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <span className="text-sm font-medium">{formError}</span>
        </div>
      )}

      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-2">Vehicle Details</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Car Name *</label>
            <input 
              type="text" 
              name="name" 
              id="name" 
              defaultValue={car?.name} 
              placeholder="e.g. Maruti Swift Dzire, Innova Crysta"
              required 
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-1 focus:ring-black focus:outline-none" 
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">URL Slug *</label>
            <input 
              type="text" 
              name="slug" 
              id="slug" 
              defaultValue={car?.slug} 
              placeholder="e.g. swift-dzire, innova-crysta"
              required 
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-1 focus:ring-black focus:outline-none" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="brandId" className="block text-sm font-medium text-gray-700 mb-1">Brand / Manufacturer *</label>
            <select 
              name="brandId" 
              id="brandId" 
              defaultValue={car?.brandId} 
              required 
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-1 focus:ring-black focus:outline-none"
            >
              <option value="">Select a brand</option>
              {brands.map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
            <input 
              type="number" 
              name="sortOrder" 
              id="sortOrder" 
              defaultValue={car?.sortOrder || 0} 
              required 
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-1 focus:ring-black focus:outline-none" 
            />
          </div>
        </div>

        <div>
          <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-1">Short Description / Subtitle</label>
          <input 
            type="text"
            name="shortDescription" 
            id="shortDescription" 
            defaultValue={car?.shortDescription} 
            placeholder="e.g. Premium 4-seater sedan for city & airport travel"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-1 focus:ring-black focus:outline-none" 
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Detailed Description & Features</label>
          <textarea 
            name="description" 
            id="description" 
            defaultValue={car?.content || car?.description} 
            rows={4} 
            placeholder="Detailed features, comfort amenities, luggage space, and rental conditions..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-1 focus:ring-black focus:outline-none" 
          />
        </div>

        {/* Specifications & Primary Pricing */}
        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-base font-semibold text-gray-900 mb-3">Specifications & Pricing</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="seats" className="block text-sm font-medium text-gray-700 mb-1">Seats (Passengers)</label>
              <input 
                type="number" 
                name="seats" 
                id="seats" 
                defaultValue={car?.seats || 4} 
                min={1} 
                max={50} 
                required 
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-1 focus:ring-black focus:outline-none" 
              />
            </div>

            <div>
              <label htmlFor="luggage" className="block text-sm font-medium text-gray-700 mb-1">Luggage Bags</label>
              <input 
                type="number" 
                name="luggage" 
                id="luggage" 
                defaultValue={car?.luggage || 2} 
                min={0} 
                required 
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-1 focus:ring-black focus:outline-none" 
              />
            </div>

            <div>
              <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
              <select 
                name="transmission" 
                id="transmission" 
                defaultValue={car?.transmission || 'MANUAL'} 
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-1 focus:ring-black focus:outline-none"
              >
                <option value="MANUAL">Manual</option>
                <option value="AUTOMATIC">Automatic</option>
              </select>
            </div>

            <div>
              <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-1">
                Primary Fuel Type *
              </label>
              <select 
                name="fuelType" 
                id="fuelType" 
                value={fuelType} 
                onChange={(e) => setFuelType(e.target.value)}
                required
                className="w-full rounded-md border-2 border-blue-500 bg-blue-50/40 px-3 py-2 text-sm font-semibold text-blue-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                <option value="PETROL">Petrol</option>
                <option value="DIESEL">Diesel</option>
                <option value="ELECTRIC">Electric</option>
                <option value="HYBRID">Hybrid</option>
              </select>
            </div>

            <div className="col-span-2 sm:col-span-2">
              <label htmlFor="pricePerDay" className="block text-sm font-medium text-gray-700 mb-1">Base Rental Price Per Day (₹) *</label>
              <input 
                type="number" 
                step="0.01" 
                name="pricePerDay" 
                id="pricePerDay" 
                defaultValue={car?.pricePerDay || 1800} 
                required 
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-1 focus:ring-black focus:outline-none" 
              />
            </div>
          </div>
        </div>

        {/* Dynamic Fuel Rate per KM Popup Area */}
        <div className="pt-4 border-t border-gray-100 bg-slate-50/70 p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <Fuel className="w-5 h-5 text-blue-600" />
            <h4 className="text-sm font-bold text-gray-900">Per Kilometer Fuel Rate (₹/km)</h4>
            <span className="text-[11px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full uppercase">
              {fuelType} Selected
            </span>
          </div>
          <p className="text-xs text-gray-500 mb-4">
            The per-kilometer rate pops up dynamically based on your selected fuel type ({fuelType}).
          </p>

          {/* Active Fuel Type Rate Input - Highlighted Dynamic Field */}
          <div className="p-4 bg-white rounded-lg border-2 border-blue-400 shadow-sm transition-all duration-200">
            {fuelType === 'PETROL' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="petrolPricePerKm" className="block text-sm font-bold text-gray-900">
                    Petrol Rate / KM (₹) *
                  </label>
                  <span className="text-xs text-blue-600 font-medium">Active Primary Fuel</span>
                </div>
                <input 
                  type="number" 
                  step="0.01" 
                  min="0" 
                  name="petrolPricePerKm" 
                  id="petrolPricePerKm" 
                  defaultValue={car?.petrolPricePerKm ?? ''} 
                  placeholder="e.g. 14.00" 
                  required
                  className="w-full text-base font-semibold rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                />
              </div>
            )}

            {fuelType === 'DIESEL' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="dieselPricePerKm" className="block text-sm font-bold text-gray-900">
                    Diesel Rate / KM (₹) *
                  </label>
                  <span className="text-xs text-blue-600 font-medium">Active Primary Fuel</span>
                </div>
                <input 
                  type="number" 
                  step="0.01" 
                  min="0" 
                  name="dieselPricePerKm" 
                  id="dieselPricePerKm" 
                  defaultValue={car?.dieselPricePerKm ?? ''} 
                  placeholder="e.g. 16.00" 
                  required
                  className="w-full text-base font-semibold rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                />
              </div>
            )}

            {fuelType === 'ELECTRIC' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="electricPricePerKm" className="block text-sm font-bold text-gray-900">
                    Electric Rate / KM (₹) *
                  </label>
                  <span className="text-xs text-blue-600 font-medium">Active Primary Fuel</span>
                </div>
                <input 
                  type="number" 
                  step="0.01" 
                  min="0" 
                  name="electricPricePerKm" 
                  id="electricPricePerKm" 
                  defaultValue={car?.electricPricePerKm ?? ''} 
                  placeholder="e.g. 18.00" 
                  required
                  className="w-full text-base font-semibold rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                />
              </div>
            )}

            {fuelType === 'HYBRID' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="hybridPricePerKm" className="block text-sm font-bold text-gray-900">
                    Hybrid Rate / KM (₹) *
                  </label>
                  <span className="text-xs text-blue-600 font-medium">Active Primary Fuel</span>
                </div>
                <input 
                  type="number" 
                  step="0.01" 
                  min="0" 
                  name="hybridPricePerKm" 
                  id="hybridPricePerKm" 
                  defaultValue={car?.hybridPricePerKm ?? ''} 
                  placeholder="e.g. 20.00" 
                  required
                  className="w-full text-base font-semibold rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                />
              </div>
            )}
          </div>

          {/* Toggle for Additional Variant Rates */}
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setShowAllFuelVariants(!showAllFuelVariants)}
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 transition"
            >
              {showAllFuelVariants ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              {showAllFuelVariants ? 'Hide other fuel variants' : 'Set rates for alternative fuel variants (Optional)'}
            </button>

            {showAllFuelVariants && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 pt-3 border-t border-slate-200">
                {fuelType !== 'PETROL' && (
                  <div>
                    <label htmlFor="petrolPricePerKm" className="block text-xs font-medium text-gray-700 mb-1">
                      Petrol Price / KM (₹)
                    </label>
                    <input 
                      type="number" 
                      step="0.01" 
                      min="0" 
                      name="petrolPricePerKm" 
                      id="petrolPricePerKm" 
                      defaultValue={car?.petrolPricePerKm ?? ''} 
                      placeholder="e.g. 14" 
                      className="w-full text-xs rounded-md border border-gray-300 px-2.5 py-1.5" 
                    />
                  </div>
                )}

                {fuelType !== 'DIESEL' && (
                  <div>
                    <label htmlFor="dieselPricePerKm" className="block text-xs font-medium text-gray-700 mb-1">
                      Diesel Price / KM (₹)
                    </label>
                    <input 
                      type="number" 
                      step="0.01" 
                      min="0" 
                      name="dieselPricePerKm" 
                      id="dieselPricePerKm" 
                      defaultValue={car?.dieselPricePerKm ?? ''} 
                      placeholder="e.g. 16" 
                      className="w-full text-xs rounded-md border border-gray-300 px-2.5 py-1.5" 
                    />
                  </div>
                )}

                {fuelType !== 'ELECTRIC' && (
                  <div>
                    <label htmlFor="electricPricePerKm" className="block text-xs font-medium text-gray-700 mb-1">
                      Electric Price / KM (₹)
                    </label>
                    <input 
                      type="number" 
                      step="0.01" 
                      min="0" 
                      name="electricPricePerKm" 
                      id="electricPricePerKm" 
                      defaultValue={car?.electricPricePerKm ?? ''} 
                      placeholder="e.g. 18" 
                      className="w-full text-xs rounded-md border border-gray-300 px-2.5 py-1.5" 
                    />
                  </div>
                )}

                {fuelType !== 'HYBRID' && (
                  <div>
                    <label htmlFor="hybridPricePerKm" className="block text-xs font-medium text-gray-700 mb-1">
                      Hybrid Price / KM (₹)
                    </label>
                    <input 
                      type="number" 
                      step="0.01" 
                      min="0" 
                      name="hybridPricePerKm" 
                      id="hybridPricePerKm" 
                      defaultValue={car?.hybridPricePerKm ?? ''} 
                      placeholder="e.g. 20" 
                      className="w-full text-xs rounded-md border border-gray-300 px-2.5 py-1.5" 
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Direct Car Photo Upload Area (for new cars) */}
        {!car && (
          <div className="pt-4 border-t border-gray-100">
            <h4 className="text-sm font-semibold text-gray-900 mb-1">Upload Car Photo (Direct)</h4>
            <p className="text-xs text-gray-500 mb-3">Upload a photo directly from your device. It will automatically upload and attach to this car.</p>
            <input 
              type="file" 
              name="carImage" 
              id="carImage"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer border border-gray-200 rounded-md p-1"
            />
            {imagePreview && (
              <div className="mt-3 flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <img src={imagePreview} alt="Selected preview" className="w-24 h-16 object-cover rounded border border-gray-200" />
                <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> Image ready to upload with car
                </span>
              </div>
            )}
          </div>
        )}

        {/* Status */}
        <div className="flex items-center pt-2">
          <input 
            type="checkbox" 
            name="isActive" 
            id="isActive" 
            defaultChecked={car ? car.isActive : true} 
            className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" 
          />
          <label htmlFor="isActive" className="ml-2 block text-sm font-medium text-gray-900">
            Active (Visible on public fleet & booking forms)
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-5 border-t border-gray-200">
        <Link href="/admin/cars" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition">
          Cancel
        </Link>
        <button 
          type="submit" 
          disabled={isPending} 
          className="px-6 py-2 text-sm font-semibold text-white bg-black rounded-md hover:bg-gray-900 disabled:opacity-50 transition shadow-sm"
        >
          {isPending ? 'Saving Car...' : (car ? 'Update Car' : 'Save Car')}
        </button>
      </div>
    </form>
  )
}
