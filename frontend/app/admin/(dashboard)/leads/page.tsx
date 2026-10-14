import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { deleteLead } from './actions'
import { DeleteButton } from '@/components/admin/delete-button'
import { Inbox, Plus, Phone, MapPin, CheckCircle, Clock } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminLeadsPage() {
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  const items = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' }
  })

  const totalCount = items.length
  const newCount = items.filter(l => l.status === 'NEW').length
  const contactedCount = items.filter(l => l.status === 'CONTACTED').length
  const convertedCount = items.filter(l => l.status === 'CONVERTED').length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Inbox className="text-blue-600" size={28} />
            Booking Inquiries & Leads
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Track customer booking inquiries, WhatsApp quotes, phone inquiries, and change follow-up statuses.
          </p>
        </div>
        <Link 
          href="/admin/leads/new" 
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-semibold select-none shadow-sm transition-colors"
        >
          <Plus size={16} />
          <span>Log New Inquiry</span>
        </Link>
      </div>

      {/* Quick Lead Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Inquiries</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totalCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-sm bg-blue-50/30">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider flex items-center gap-1">
            <Clock size={12} />
            New / Uncontacted
          </p>
          <p className="text-2xl font-bold text-blue-700 mt-1">{newCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-yellow-200 shadow-sm bg-yellow-50/30">
          <p className="text-xs font-semibold text-yellow-600 uppercase tracking-wider flex items-center gap-1">
            <Phone size={12} />
            In Discussion
          </p>
          <p className="text-2xl font-bold text-yellow-700 mt-1">{contactedCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-green-200 shadow-sm bg-green-50/30">
          <p className="text-xs font-semibold text-green-600 uppercase tracking-wider flex items-center gap-1">
            <CheckCircle size={12} />
            Converted Bookings
          </p>
          <p className="text-2xl font-bold text-green-700 mt-1">{convertedCount}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer Name</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact Phone</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Route / Locations</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-mono">
                  {new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">{item.phone}</td>
                <td className="px-6 py-4 text-xs text-gray-500">
                  {item.pickupLocation || item.dropLocation ? (
                    <div className="flex items-center gap-1 text-gray-700">
                      <MapPin size={12} className="text-gray-400 shrink-0" />
                      <span>{item.pickupLocation || 'Hyderabad'} → {item.dropLocation || 'City Tour'}</span>
                    </div>
                  ) : (
                    <span className="text-gray-400 italic">General inquiry</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full border ${
                    item.status === 'NEW' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                    item.status === 'CONTACTED' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                    item.status === 'CONVERTED' ? 'bg-green-100 text-green-800 border-green-200' :
                    'bg-gray-100 text-gray-800 border-gray-200'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <Link href={`/admin/leads/${item.id}/edit`} className="text-blue-600 hover:text-blue-900 font-medium">View / Edit</Link>
                  <form action={deleteLead.bind(null, item.id)} className="inline">
                    <DeleteButton />
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {items.length === 0 && (
          <div className="p-12 text-center">
            <Inbox size={40} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-base font-semibold text-gray-900">No customer inquiries yet</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
              Inquiries submitted through the website booking form or logged by agents will appear here.
            </p>
            <div className="mt-5">
              <Link 
                href="/admin/leads/new" 
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
              >
                <Plus size={16} />
                Log Your First Inquiry
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
