import { getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { RouteForm } from '@/components/admin/route-form'
import prisma from '@/lib/prisma'

export default async function NewRoutePage() {
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')
  
  const locations = await prisma.location.findMany({ orderBy: { name: 'asc' } })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Add New Route</h1>
      <RouteForm locations={locations} />
    </div>
  )
}

