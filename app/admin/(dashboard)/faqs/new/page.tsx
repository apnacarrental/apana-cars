import { getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { FaqForm } from '@/components/admin/faq-form'

export default async function NewFaqPage() {
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Add New Faq</h1>
      <FaqForm />
    </div>
  )
}

