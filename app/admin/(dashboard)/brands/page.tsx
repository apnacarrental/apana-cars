import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { deleteBrand } from './actions'

export default async function AdminBrandsPage() {
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  const items = await prisma.brand.findMany()

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Brands</h1>
        <Link href="/admin/brands/new" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium select-none shadow-sm transition-colors">
          Add New
        </Link>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <Link href={`/admin/brands/${item.id}/edit`} className="text-blue-600 hover:text-blue-900">Edit</Link>
                  <form action={deleteBrand.bind(null, item.id)} className="inline">
                    <button type="submit" className="text-red-600 hover:text-red-900">Delete</button>
                  </form>
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
