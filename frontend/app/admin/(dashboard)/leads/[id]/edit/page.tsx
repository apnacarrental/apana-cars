import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import { updateLeadStatus } from '@/app/admin/(dashboard)/leads/actions'
import Link from 'next/link'
import { LeadCommunications } from '@/components/admin/lead-communications'

export default async function EditLeadPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  const lead = await prisma.lead.findUnique({ where: { id: resolvedParams.id }, include: { communications: { orderBy: { createdAt: 'desc' } } } })
  if (!lead) notFound()

  // Try to lookup referenced entities if they exist (ignoring invalid UUIDs safely here)
  let carName = lead.vehicle
  let serviceName = lead.service
  let pickupLocationName = lead.pickupLocation
  let dropLocationName = lead.dropLocation

  if (lead.vehicle && lead.vehicle.length === 36) {
    const c = await prisma.car.findUnique({ where: { id: lead.vehicle }})
    if (c) carName = c.name
  }
  if (lead.service && lead.service.length === 36) {
    const s = await prisma.service.findUnique({ where: { id: lead.service }})
    if (s) serviceName = s.title
  }
  if (lead.pickupLocation && lead.pickupLocation.length === 36) {
    const l = await prisma.location.findUnique({ where: { id: lead.pickupLocation }})
    if (l) pickupLocationName = l.name
  }
  if (lead.dropLocation && lead.dropLocation.length === 36) {
    const l = await prisma.location.findUnique({ where: { id: lead.dropLocation }})
    if (l) dropLocationName = l.name
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Lead Details</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Read-only Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Customer Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{lead.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <div className="flex items-center gap-2 mt-1">
                  <a href={`tel:${lead.phone}`} className="font-semibold text-blue-600 hover:underline">{lead.phone}</a>
                  <a href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded font-medium hover:bg-green-200">
                    WhatsApp
                  </a>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{lead.email || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Submitted On</p>
                <p className="font-medium">{lead.createdAt.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Inquiry Details</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Pickup Location</p>
                <p className="font-medium">{pickupLocationName || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Drop-off Location</p>
                <p className="font-medium">{dropLocationName || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date/Time</p>
                <p className="font-medium">{lead.pickupDatetime ? lead.pickupDatetime.toLocaleString() : '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Vehicle / Car</p>
                <p className="font-medium">{carName || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Service</p>
                <p className="font-medium">{serviceName || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">No. of Passengers</p>
                <p className="font-semibold text-amber-800">{lead.passengers || '-'}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-500">Message / Requirements</p>
              <div className="mt-2 p-4 bg-gray-50 rounded-md border border-gray-100 whitespace-pre-wrap">
                {lead.message || 'No message provided.'}
              </div>
            </div>
          </div>
        </div>

        {/* Action Form */}
        <div>
          <form action={updateLeadStatus.bind(null, lead.id)} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-6">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Manage Lead</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <select name="status" id="status" defaultValue={lead.status} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
                  <option value="NEW">New</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="CONVERTED">Converted</option>
                  <option value="LOST">Lost</option>
                </select>
              </div>

              <div>
                <label htmlFor="passengers" className="block text-sm font-medium text-gray-700">No. of Passengers</label>
                <input 
                  type="text" 
                  name="passengers" 
                  id="passengers" 
                  defaultValue={lead.passengers || ''} 
                  placeholder="e.g. 5-7 Passengers" 
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Internal Notes</label>
                <textarea name="notes" id="notes" rows={5} defaultValue={lead.notes || ''} placeholder="Add private notes here..." className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"></textarea>
              </div>
            </div>

            <div className="mt-6">
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                Update Lead
              </button>
            </div>
            
            <div className="mt-4 text-center">
              <Link href="/admin/leads" className="text-sm text-gray-500 hover:text-gray-900">
                &larr; Back to Leads
              </Link>
            </div>
          </form>
        </div>
        <div className="lg:col-span-3">
          <LeadCommunications leadId={lead.id} email={lead.email} phone={lead.phone} communications={lead.communications} />
        </div>

      </div>
    </div>
  )
}

