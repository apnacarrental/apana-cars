import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import { TestimonialForm } from '@/components/admin/testimonial-form'

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  const item = await prisma.testimonial.findUnique({ where: { id: resolvedParams.id } })
  if (!item) notFound()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Testimonial</h1>
      <TestimonialForm item={item} />
    </div>
  )
}
