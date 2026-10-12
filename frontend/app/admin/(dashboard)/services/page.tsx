import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { SeoStatusBadge } from '@/components/admin/seo-status-badge'
import { DeactivateServiceButton } from '@/components/admin/deactivate-service-button'

export default async function AdminServicesPage() {
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  const items = await prisma.service.findMany()

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Services</h1>
        <Link href="/admin/services/new" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium select-none shadow-sm transition-colors">
          Add New
        </Link>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SEO</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <SeoStatusBadge seoMetadata={item.seoMetadata} hasContent={!!item.content && item.content.length > 50} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <Link href={`/admin/services/${item.id}/edit`} className="text-blue-600 hover:text-blue-900">Edit</Link>
                  {item.isActive && (
                    <DeactivateServiceButton id={item.id} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <div className="p-8 text-center text-gray-500">No items found.</div>}
      </div>
    </div>
  )
}
