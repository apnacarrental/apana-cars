import { getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { TestimonialForm } from '@/components/admin/testimonial-form'

export default async function NewTestimonialPage() {
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Add New Testimonial</h1>
      <TestimonialForm />
    </div>
  )
}

