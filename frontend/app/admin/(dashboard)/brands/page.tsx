import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { DeleteBrandButton } from '@/components/admin/delete-brand-button'
import { Award, Plus, Car } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminBrandsPage() {
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  const items = await prisma.brand.findMany({
    include: {
      _count: {
        select: { cars: true }
      }
    },
    orderBy: { name: 'asc' }
  })

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Award className="text-blue-600" size={28} />
            Vehicle Brands & Manufacturers
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage car brands (e.g. Maruti Suzuki, Toyota, Force Motors) associated with your rental fleet.
          </p>
        </div>
        <Link 
          href="/admin/brands/new" 
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-semibold select-none shadow-sm transition-colors"
        >
          <Plus size={16} />
          <span>Add New Brand</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Brand Name</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">URL Slug</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Cars in Fleet</th>
              <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-900">{item.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500 font-mono">{item.slug}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                    <Car size={12} />
                    {item._count.cars} vehicles
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <Link href={`/admin/brands/${item.id}/edit`} className="text-blue-600 hover:text-blue-900 font-medium">Edit</Link>
                  <DeleteBrandButton id={item.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {items.length === 0 && (
          <div className="p-12 text-center">
            <Award size={40} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-base font-semibold text-gray-900">No brands found</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
              Add manufacturer brands to organize your fleet.
            </p>
            <div className="mt-5">
              <Link 
                href="/admin/brands/new" 
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
              >
                <Plus size={16} />
                Add Your First Brand
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
