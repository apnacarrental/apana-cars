import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { SeoStatusBadge } from '@/components/admin/seo-status-badge'
import { DeleteBlogButton } from '@/components/admin/delete-blog-button'

export default async function AdminBlogsPage() {
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blogs</h1>
        <Link 
          href="/admin/blogs/new" 
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium select-none shadow-sm transition-colors"
        >
          Write Post
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SEO</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td className="px-6 py-4 font-medium text-gray-900">{blog.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${blog.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {blog.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <SeoStatusBadge seoMetadata={blog.seoMetadata} hasContent={!!blog.content && blog.content.length > 50} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <Link href={`/admin/blogs/${blog.id}/edit`} className="text-blue-600 hover:text-blue-900">
                    Edit
                  </Link>
                  <DeleteBlogButton id={blog.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {blogs.length === 0 && (
          <div className="p-8 text-center text-gray-500">No blog posts found.</div>
        )}
      </div>
    </div>
  )
}
