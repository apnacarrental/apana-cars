import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { deleteFaq } from './actions'
import { DeleteButton } from '@/components/admin/delete-button'

export default async function AdminFAQsPage() {
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  const items = await prisma.fAQ.findMany()

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">FAQs</h1>
        <Link href="/admin/faqs/new" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium select-none shadow-sm transition-colors">
          Add New
        </Link>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Question</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Scope</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 font-medium text-gray-900">{item.question}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.isGlobal ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                    {item.isGlobal ? 'Global' : 'Contextual'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <Link href={`/admin/faqs/${item.id}/edit`} className="text-blue-600 hover:text-blue-900">Edit</Link>
                  <form action={deleteFaq.bind(null, item.id)} className="inline">
                    <DeleteButton />
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




