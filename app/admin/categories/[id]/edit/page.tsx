import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import { CategoryForm } from '@/components/admin/category-form'

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  const item = await prisma.category.findUnique({ where: { id: resolvedParams.id } })
  if (!item) notFound()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Category</h1>
      <CategoryForm item={item} />
    </div>
  )
}
