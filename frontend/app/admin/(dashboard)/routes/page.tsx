import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { SeoStatusBadge } from '@/components/admin/seo-status-badge'
import { DeactivateRouteButton } from '@/components/admin/deactivate-route-button'
import { DeleteRouteButton } from '@/components/admin/delete-route-button'
import { Navigation, Plus, ExternalLink, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminRoutesPage() {
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  const items = await prisma.route.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Navigation className="text-blue-600" size={28} />
            Outstation Routes & Highway Corridors
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage popular one-way drops and round-trip highway corridors (e.g. Hyderabad to Srisailam, Vijayawada, Bangalore).
          </p>
        </div>
        <Link 
          href="/admin/routes/new" 
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-semibold select-none shadow-sm transition-colors"
        >
          <Plus size={16} />
          <span>Add New Route</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Route Title & Path</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Origin → Destination</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Starting Fare</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SEO Status</th>
              <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">{item.title}</div>
                  <div className="text-xs text-gray-500 font-mono mt-0.5 flex items-center gap-1">
                    <span>/routes/{item.slug}</span>
                    <Link href={`/routes/${item.slug}`} target="_blank" className="text-blue-500 hover:text-blue-700 inline-flex items-center">
                      <ExternalLink size={11} />
                    </Link>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <span className="font-medium">{item.origin}</span>
                  <ArrowRight size={14} className="inline mx-1.5 text-gray-400" />
                  <span className="font-medium">{item.destination}</span>
                  {item.distance && <div className="text-xs text-gray-500 mt-0.5 font-mono">{item.distance} km • {item.duration || 'approx'}</div>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                  {item.startingPrice ? `₹${item.startingPrice.toLocaleString()}` : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${item.isActive ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
                    {item.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <SeoStatusBadge 
                    seoMetadata={item.seoMetadata} 
                    hasContent={!!item.content && item.content.length > 30} 
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <Link href={`/admin/routes/${item.id}/edit`} className="text-blue-600 hover:text-blue-900 font-medium">Edit</Link>
                  {item.isActive && (
                    <DeactivateRouteButton id={item.id} />
                  )}
                  <DeleteRouteButton id={item.id} title={item.title} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {items.length === 0 && (
          <div className="p-12 text-center">
            <Navigation size={40} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-base font-semibold text-gray-900">No routes found</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
              Add outstation highways like Hyderabad to Srisailam or Tirupati.
            </p>
            <div className="mt-5">
              <Link 
                href="/admin/routes/new" 
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
              >
                <Plus size={16} />
                Add Your First Route
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
