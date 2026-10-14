import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { SeoStatusBadge } from '@/components/admin/seo-status-badge'
import { DeactivateCarButton } from '@/components/admin/deactivate-car-button'
import { DeleteCarButton } from '@/components/admin/delete-car-button'
import { Plus, Car as CarIcon, Users, Fuel, Sparkles, ExternalLink } from 'lucide-react'

export default async function AdminCarsPage() {
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  const cars = await prisma.car.findMany({
    include: { 
      brand: true,
      images: {
        include: { media: true },
        orderBy: { sortOrder: 'asc' },
        take: 1
      }
    },
    orderBy: { sortOrder: 'asc' }
  })

  const totalCars = cars.length
  const activeCars = cars.filter(c => c.isActive).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Car Fleet Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your fleet models, seating capacities, per-kilometer fuel rates, images, and SEO.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/fleet"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm transition"
          >
            <span>View Public Fleet</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <Link 
            href="/admin/cars/new" 
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-semibold select-none shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Car</span>
          </Link>
        </div>
      </div>

      {/* Quick Fleet Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Vehicles</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totalCars}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Active in Fleet</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{activeCars}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Inactive</p>
          <p className="text-2xl font-bold text-gray-400 mt-1">{totalCars - activeCars}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Direct Uploads</p>
          <p className="text-xs text-blue-600 font-semibold mt-2.5 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Enabled on forms
          </p>
        </div>
      </div>

      {/* Cars Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Vehicle</th>
                <th className="px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Brand</th>
                <th className="px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Specs</th>
                <th className="px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Pricing</th>
                <th className="px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">SEO</th>
                <th className="px-5 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cars.map((car) => {
                const primaryImage = car.images[0]?.media?.secureUrl
                const primaryFuelKm = 
                  car.fuelType === 'DIESEL' ? car.dieselPricePerKm :
                  car.fuelType === 'ELECTRIC' ? car.electricPricePerKm :
                  car.fuelType === 'HYBRID' ? car.hybridPricePerKm :
                  car.petrolPricePerKm

                return (
                  <tr key={car.id} className="hover:bg-gray-50/60 transition">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-10 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 shrink-0 flex items-center justify-center">
                          {primaryImage ? (
                            <img 
                              src={primaryImage} 
                              alt={car.name} 
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <CarIcon className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm leading-snug">{car.name}</p>
                          <p className="text-xs text-gray-500 font-mono">/{car.slug}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-xs font-medium bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md">
                        {car.brand.name}
                      </span>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-600">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1 font-medium text-gray-800">
                          <Users className="w-3.5 h-3.5 text-gray-400" /> {car.seats} Seats · {car.luggage} Bags
                        </span>
                        <span className="text-[11px] text-gray-500 uppercase font-semibold">
                          {car.transmission}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap text-xs">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold text-gray-900 text-sm">
                          ₹{car.pricePerDay.toLocaleString()}<span className="text-xs font-normal text-gray-500">/day</span>
                        </span>
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-blue-700">
                          <Fuel className="w-3 h-3 text-blue-500" />
                          {primaryFuelKm ? `₹${primaryFuelKm}/km (${car.fuelType.toLowerCase()})` : `${car.fuelType}`}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        car.isActive 
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}>
                        {car.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      <SeoStatusBadge 
                        seoMetadata={car.seoMetadata} 
                        hasContent={!!car.shortDescription && car.shortDescription.length > 30} 
                      />
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/cars/${car.id}/edit`} 
                          className="px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition"
                        >
                          Edit
                        </Link>
                        {car.isActive && (
                          <DeactivateCarButton id={car.id} />
                        )}
                        <DeleteCarButton id={car.id} name={car.name} />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        
        {cars.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <CarIcon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-base font-semibold text-gray-700">No cars in fleet yet.</p>
            <p className="text-xs text-gray-400 mt-1 mb-4">Click below to add your first car to the fleet.</p>
            <Link 
              href="/admin/cars/new" 
              className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Car</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
