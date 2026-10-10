import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import { BlogForm } from '@/components/admin/blog-form'
import { EntitySeoForm } from '@/components/admin/entity-seo-form'

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  const blog = await prisma.blog.findUnique({
    where: { id: resolvedParams.id }
  })

  if (!blog) notFound()

  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
      <BlogForm blog={blog} categories={categories} />
      <EntitySeoForm entityType="BLOG" entityId={blog.id} slug={blog.slug} basePath="/blog" seoMetadata={blog.seoMetadata} />
    </div>
  )
}
