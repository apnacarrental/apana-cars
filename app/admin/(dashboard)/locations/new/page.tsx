import { getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { LocationForm } from '@/components/admin/location-form'
import prisma from '@/lib/prisma'

export default async function NewLocationPage() {
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')
  
  const locations = await prisma.location.findMany({ orderBy: { name: 'asc' } })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Add New Location</h1>
      <LocationForm locations={locations} />
    </div>
  )
}

