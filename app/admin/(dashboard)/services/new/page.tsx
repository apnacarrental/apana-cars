import { getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { ServiceForm } from '@/components/admin/service-form'

export default async function NewServicePage() {
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Add New Service</h1>
      <ServiceForm />
    </div>
  )
}

