import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import { LocationForm } from '@/components/admin/location-form'
import { EntitySeoForm } from '@/components/admin/entity-seo-form'

export default async function EditLocationPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  const item = await prisma.location.findUnique({ where: { id: resolvedParams.id } })
  if (!item) notFound()
  
  const locations = await prisma.location.findMany({ orderBy: { name: 'asc' } })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Location</h1>
      <LocationForm item={item} locations={locations} />
      <EntitySeoForm entityType="LOCATION" entityId={item.id} slug={item.slug} basePath="/locations" seoMetadata={item.seoMetadata} />
    </div>
  )
}
