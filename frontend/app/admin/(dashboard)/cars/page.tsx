import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { SeoStatusBadge } from '@/components/admin/seo-status-badge'
import { DeactivateCarButton } from '@/components/admin/deactivate-car-button'

export default async function AdminCarsPage() {
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  const cars = await prisma.car.findMany({
    include: { brand: true },
    orderBy: { sortOrder: 'asc' }
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Cars</h1>
        <Link 
          href="/admin/cars/new" 
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium select-none shadow-sm transition-colors"
        >
          Add New Car
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SEO</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cars.map((car) => (
              <tr key={car.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{car.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{car.brand.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{car.slug}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${car.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {car.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <SeoStatusBadge seoMetadata={car.seoMetadata} hasContent={!!car.shortDescription && car.shortDescription.length > 50} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <Link href={`/admin/cars/${car.id}/edit`} className="text-blue-600 hover:text-blue-900">
                    Edit
                  </Link>
                  {car.isActive && (
                    <DeactivateCarButton id={car.id} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {cars.length === 0 && (
          <div className="p-8 text-center text-gray-500">No cars found.</div>
        )}
      </div>
    </div>
  )
}
