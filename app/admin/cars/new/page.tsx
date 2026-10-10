import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { CarForm } from '@/components/admin/car-form'

export default async function NewCarPage() {
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  const brands = await prisma.brand.findMany({ orderBy: { name: 'asc' } })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Add New Car</h1>
      <CarForm brands={brands} />
    </div>
  )
}

