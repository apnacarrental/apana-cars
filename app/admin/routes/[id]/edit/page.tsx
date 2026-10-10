import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import { RouteForm } from '@/components/admin/route-form'
import { EntitySeoForm } from '@/components/admin/entity-seo-form'

export default async function EditRoutePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  const item = await prisma.route.findUnique({ where: { id: resolvedParams.id } })
  if (!item) notFound()
  
  const locations = await prisma.location.findMany({ orderBy: { name: 'asc' } })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Route</h1>
      <RouteForm item={item} locations={locations} />
      <EntitySeoForm entityType="ROUTE" entityId={item.id} slug={item.slug} basePath="/routes" seoMetadata={item.seoMetadata} />
    </div>
  )
}
