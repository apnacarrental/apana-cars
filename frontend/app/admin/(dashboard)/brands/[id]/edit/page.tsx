import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import { BrandForm } from '@/components/admin/brand-form'

export default async function EditBrandPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  const item = await prisma.brand.findUnique({ where: { id: resolvedParams.id } })
  if (!item) notFound()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Brand</h1>
      <BrandForm item={item} />
    </div>
  )
}
