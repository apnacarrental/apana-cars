import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { SeoStatusBadge } from '@/components/admin/seo-status-badge'
import { DeleteBlogButton } from '@/components/admin/delete-blog-button'
import { BookOpen, Plus, ExternalLink } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminBlogsPage() {
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  const blogs = await prisma.blog.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <BookOpen className="text-blue-600" size={28} />
            Blog & Travel Articles
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Publish highway travel guides, fleet spotlights, and Hyderabad tourist destination articles.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            href="/blog" 
            target="_blank" 
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors bg-white shadow-sm"
          >
            <ExternalLink size={15} />
            View Public Blog
          </Link>
          <Link 
            href="/admin/blogs/new" 
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-semibold select-none shadow-sm transition-colors"
          >
            <Plus size={16} />
            <span>Add New Blog Post</span>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Article Title & Slug</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Publish Status</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SEO Status</th>
              <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {blogs.map((blog) => (
              <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">{blog.title}</div>
                  <div className="text-xs text-gray-500 font-mono mt-0.5 flex items-center gap-1">
                    <span>/blog/{blog.slug}</span>
                    <Link href={`/blog/${blog.slug}`} target="_blank" className="text-blue-500 hover:text-blue-700 inline-flex items-center">
                      <ExternalLink size={11} />
                    </Link>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {blog.category?.name || <span className="text-gray-400 italic">General</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    blog.status === 'PUBLISHED' 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                  }`}>
                    {blog.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <SeoStatusBadge seoMetadata={blog.seoMetadata} hasContent={!!blog.content && blog.content.length > 50} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <Link href={`/admin/blogs/${blog.id}/edit`} className="text-blue-600 hover:text-blue-900 font-medium">
                    Edit
                  </Link>
                  <DeleteBlogButton id={blog.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {blogs.length === 0 && (
          <div className="p-12 text-center">
            <BookOpen size={40} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-base font-semibold text-gray-900">No blog posts found</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
              Start content marketing by publishing guides and travel insights.
            </p>
            <div className="mt-5">
              <Link 
                href="/admin/blogs/new" 
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
              >
                <Plus size={16} />
                Write Your First Post
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
