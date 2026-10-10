import { getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { BrandForm } from '@/components/admin/brand-form'

export default async function NewBrandPage() {
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Add New Brand</h1>
      <BrandForm />
    </div>
  )
}

