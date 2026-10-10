import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import { CarForm } from '@/components/admin/car-form'
import { CarImageManager } from '@/components/admin/car-image-manager'
import { EntitySeoForm } from '@/components/admin/entity-seo-form'

export default async function EditCarPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  const car = await prisma.car.findUnique({
    where: { id: resolvedParams.id },
    include: {
      images: {
        include: { media: true },
        orderBy: { sortOrder: 'asc' }
      }
    }
  })

  if (!car) notFound()

  const brands = await prisma.brand.findMany({ orderBy: { name: 'asc' } })
  const availableMedia = await prisma.media.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Car</h1>
      <CarForm car={car} brands={brands} />
      <CarImageManager carId={car.id} existingImages={car.images} availableMedia={availableMedia} />
      <EntitySeoForm entityType="CAR" entityId={car.id} slug={car.slug} basePath="/fleet" seoMetadata={car.seoMetadata} />
    </div>
  )
}
