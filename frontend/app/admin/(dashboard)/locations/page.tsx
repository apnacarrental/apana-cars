import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { SeoStatusBadge } from '@/components/admin/seo-status-badge'
import { DeactivateLocationButton } from '@/components/admin/deactivate-location-button'
import { DeleteLocationButton } from '@/components/admin/delete-location-button'
import { ExternalLink, MapPin, Plus } from 'lucide-react'

export const dynamic = 'force-dynamic'

function getTypeBadge(type: string) {
  switch (type) {
    case 'AIRPORT':
      return <span className="px-2.5 py-0.5 inline-flex text-xs font-semibold rounded-full bg-purple-100 text-purple-800 border border-purple-200">Airport</span>
    case 'CITY':
      return <span className="px-2.5 py-0.5 inline-flex text-xs font-semibold rounded-full bg-blue-100 text-blue-800 border border-blue-200">City Hub</span>
    case 'AREA':
      return <span className="px-2.5 py-0.5 inline-flex text-xs font-semibold rounded-full bg-cyan-100 text-cyan-800 border border-cyan-200">Area</span>
    case 'DESTINATION':
      return <span className="px-2.5 py-0.5 inline-flex text-xs font-semibold rounded-full bg-amber-100 text-amber-800 border border-amber-200">Destination</span>
    default:
      return <span className="px-2.5 py-0.5 inline-flex text-xs font-semibold rounded-full bg-gray-100 text-gray-800">{type}</span>
  }
}

export default async function AdminLocationsPage() {
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  const items = await prisma.location.findMany({
    include: { parent: true },
    orderBy: [{ parentId: 'asc' }, { name: 'asc' }]
  })

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="text-blue-600" size={28} />
            Locations & Coverage Hubs
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage operational cities, airport terminals, neighborhood hubs, and pilgrimage routes.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            href="/locations" 
            target="_blank" 
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors bg-white shadow-sm"
          >
            <ExternalLink size={15} />
            View Public Site
          </Link>
          <Link 
            href="/admin/locations/new" 
            className="inline-flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium select-none shadow-sm transition-colors"
          >
            <Plus size={16} />
            Add New Location
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Location Name & Slug</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Parent Hub</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SEO Status</th>
              <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">{item.name}</div>
                  <div className="text-xs text-gray-500 font-mono mt-0.5 flex items-center gap-1">
                    <span>/locations/{item.slug}</span>
                    <Link href={`/locations/${item.slug}`} target="_blank" className="text-blue-500 hover:text-blue-700 inline-flex items-center">
                      <ExternalLink size={11} />
                    </Link>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getTypeBadge(item.type)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {item.parent?.name || <span className="text-gray-400 italic">None (Top-Level)</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${item.isActive ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
                    {item.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <SeoStatusBadge 
                    seoMetadata={item.seoMetadata} 
                    hasContent={!!item.description && item.description.length > 30} 
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <Link 
                    href={`/admin/locations/${item.id}/edit`} 
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </Link>
                  {item.isActive && (
                    <DeactivateLocationButton id={item.id} />
                  )}
                  <DeleteLocationButton id={item.id} name={item.name} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {items.length === 0 && (
          <div className="p-12 text-center">
            <MapPin size={40} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-base font-semibold text-gray-900">No locations found</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
              Get started by adding a new coverage location, or sync the website data from the Admin dashboard.
            </p>
            <div className="mt-5">
              <Link 
                href="/admin/locations/new" 
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
              >
                <Plus size={16} />
                Add Your First Location
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
