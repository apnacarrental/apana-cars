import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import { ServiceForm } from '@/components/admin/service-form'
import { EntitySeoForm } from '@/components/admin/entity-seo-form'

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  const item = await prisma.service.findUnique({ where: { id: resolvedParams.id } })
  if (!item) notFound()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Service</h1>
      <ServiceForm item={item} />
      <EntitySeoForm entityType="SERVICE" entityId={item.id} slug={item.slug} basePath="/services" seoMetadata={item.seoMetadata} />
    </div>
  )
}
