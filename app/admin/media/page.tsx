import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { MediaUploadForm, DeleteMediaButton } from './components'

export default async function AdminMediaPage() {
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')
  
  const items = await prisma.media.findMany({ orderBy: { createdAt: 'desc' } })

  const isCloudinaryConfigured = !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET)

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Media Library</h1>
      </div>

      {!isCloudinaryConfigured ? (
        <div className="mb-8 p-4 bg-yellow-50 text-yellow-800 rounded-md text-sm border border-yellow-200">
          <strong>Cloudinary is not configured.</strong> Local development mode is active. Images are currently served directly from <code>public/images</code> based on seed data. To enable uploads, add Cloudinary variables to your environment.
        </div>
      ) : (
        <MediaUploadForm />
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preview</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Secure URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alt Text</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => {
              const isLocal = item.publicId.startsWith('/')
              
              return (
              <tr key={item.id}>
                <td className="px-6 py-4 font-medium text-gray-900">
                  <div className="relative w-16 h-12 bg-gray-100 rounded overflow-hidden">
                    {/* For admin preview, if it's external, we need to make sure Next/Image allows it in next.config.mjs */}
                    <img src={item.secureUrl} alt={item.altText || ''} className="object-cover w-full h-full" />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs" title={item.secureUrl}>
                  {item.secureUrl}
                  {isLocal && <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">Local</span>}
                  {!isLocal && <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">Cloud</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.altText || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <DeleteMediaButton id={item.id} />
                </td>
              </tr>
            )})}
          </tbody>
        </table>
        {items.length === 0 && <div className="p-8 text-center text-gray-500">No media found.</div>}
      </div>
    </div>
  )
}
