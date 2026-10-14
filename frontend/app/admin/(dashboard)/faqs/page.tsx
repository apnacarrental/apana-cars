import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { DeleteFaqButton } from '@/components/admin/delete-faq-button'
import { HelpCircle, Plus, ExternalLink } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminFAQsPage() {
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  const items = await prisma.fAQ.findMany({
    include: {
      car: { select: { name: true } },
      location: { select: { name: true } },
      service: { select: { title: true } },
      route: { select: { title: true } }
    },
    orderBy: { sortOrder: 'asc' }
  })

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <HelpCircle className="text-blue-600" size={28} />
            Frequently Asked Questions (FAQs)
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage global site questions and specific FAQs attached to cars, locations, services, and routes.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            href="/faq" 
            target="_blank" 
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors bg-white shadow-sm"
          >
            <ExternalLink size={15} />
            View Public FAQ
          </Link>
          <Link 
            href="/admin/faqs/new" 
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-semibold select-none shadow-sm transition-colors"
          >
            <Plus size={16} />
            <span>Add New FAQ</span>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Question & Snippet</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Scope / Attachment</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sort Order</th>
              <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => {
              let scopeLabel = 'Contextual'
              let scopeColor = 'bg-gray-100 text-gray-800 border-gray-200'
              if (item.isGlobal) {
                scopeLabel = 'Global FAQ'
                scopeColor = 'bg-purple-100 text-purple-800 border-purple-200'
              } else if (item.car) {
                scopeLabel = `Car: ${item.car.name}`
                scopeColor = 'bg-blue-100 text-blue-800 border-blue-200'
              } else if (item.location) {
                scopeLabel = `Location: ${item.location.name}`
                scopeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200'
              } else if (item.service) {
                scopeLabel = `Service: ${item.service.title}`
                scopeColor = 'bg-amber-100 text-amber-800 border-amber-200'
              } else if (item.route) {
                scopeLabel = `Route: ${item.route.title}`
                scopeColor = 'bg-cyan-100 text-cyan-800 border-cyan-200'
              }

              return (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{item.question}</div>
                    <div className="text-xs text-gray-500 mt-1 max-w-md truncate">{item.answer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full border ${scopeColor}`}>
                      {scopeLabel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">#{item.sortOrder}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    <Link href={`/admin/faqs/${item.id}/edit`} className="text-blue-600 hover:text-blue-900 font-medium">Edit</Link>
                    <DeleteFaqButton id={item.id} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {items.length === 0 && (
          <div className="p-12 text-center">
            <HelpCircle size={40} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-base font-semibold text-gray-900">No FAQs found</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
              Add common questions regarding booking, per-km rates, airport pickups, and cancelations.
            </p>
            <div className="mt-5">
              <Link 
                href="/admin/faqs/new" 
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
              >
                <Plus size={16} />
                Add Your First FAQ
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
