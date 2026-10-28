import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { DeactivateTestimonialButton } from '@/components/admin/deactivate-testimonial-button'
import { DeleteTestimonialButton } from '@/components/admin/delete-testimonial-button'
import { ReviewBadgeSettingsCard } from '@/components/admin/review-badge-settings-card'
import { Star, Plus, Quote } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminTestimonialsPage() {
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  const [items, seoSettings] = await Promise.all([
    prisma.testimonial.findMany({
      orderBy: { sortOrder: 'asc' }
    }),
    prisma.seoSettings.findFirst({
      select: {
        reviewCountText: true,
        reviewSubtext: true,
        ratingValue: true,
        gmbUrl: true,
      }
    })
  ])

  const initialBadgeSettings = {
    reviewCountText: seoSettings?.reviewCountText || '1500+',
    reviewSubtext: seoSettings?.reviewSubtext || 'Genuine Reviews',
    ratingValue: seoSettings?.ratingValue || '4.9/5',
    gmbUrl: seoSettings?.gmbUrl || 'https://share.google/z8cDjKFU53sT1UXHv',
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Quote className="text-blue-600" size={28} />
            Customer Reviews & Testimonials
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Showcase verified client feedback for airport runs, corporate Force Urbania hires, and Srisailam pilgrimages.
          </p>
        </div>
        <Link 
          href="/admin/testimonials/new" 
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-semibold select-none shadow-sm transition-colors"
        >
          <Plus size={16} />
          <span>Add New Review</span>
        </Link>
      </div>

      <ReviewBadgeSettingsCard initialSettings={initialBadgeSettings} />

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer & Location</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Review Snippet</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">{item.customerName}</div>
                  {item.locationContext && (
                    <div className="text-xs text-gray-500 mt-0.5">{item.locationContext}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                    <span className="text-xs font-bold text-gray-700 ml-1">({item.rating}.0)</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-sm truncate">
                  &ldquo;{item.review}&rdquo;
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${item.isActive ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
                    {item.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <Link href={`/admin/testimonials/${item.id}/edit`} className="text-blue-600 hover:text-blue-900 font-medium">Edit</Link>
                  {item.isActive && (
                    <DeactivateTestimonialButton id={item.id} />
                  )}
                  <DeleteTestimonialButton id={item.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {items.length === 0 && (
          <div className="p-12 text-center">
            <Quote size={40} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-base font-semibold text-gray-900">No testimonials found</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
              Add reviews from corporate clients and pilgrimage travelers.
            </p>
            <div className="mt-5">
              <Link 
                href="/admin/testimonials/new" 
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
              >
                <Plus size={16} />
                Add Your First Review
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
