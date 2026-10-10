import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { BlogForm } from '@/components/admin/blog-form'

export default async function NewBlogPage() {
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Write Post</h1>
      <BlogForm categories={categories} />
    </div>
  )
}

