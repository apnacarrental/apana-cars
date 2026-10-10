'use server'
import { requireAdmin } from '@/lib/admin-auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const Schema = z.object({
  customerName: z.string().min(1),
  review: z.string().min(1),
  rating: z.number().int().min(1).max(5).default(5),
  locationContext: z.string().optional(),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean(),
})

export async function createTestimonial(formData: FormData) {
  await requireAdmin()
  const data = {
    customerName: formData.get('customerName') as string,
    review: formData.get('review') as string,
    locationContext: formData.get('locationContext') as string || undefined,
    rating: parseInt((formData.get('rating') as string) || '5'),
    sortOrder: parseInt((formData.get('sortOrder') as string) || '0'),
    isActive: formData.get('isActive') === 'on',
  }
  const parsed = Schema.parse(data)
  await prisma.testimonial.create({ data: parsed })
  revalidatePath('/admin/testimonials')
  redirect('/admin/testimonials')
}

export async function updateTestimonial(id: string, formData: FormData) {
  await requireAdmin()
  const data = {
    customerName: formData.get('customerName') as string,
    review: formData.get('review') as string,
    locationContext: formData.get('locationContext') as string || undefined,
    rating: parseInt((formData.get('rating') as string) || '5'),
    sortOrder: parseInt((formData.get('sortOrder') as string) || '0'),
    isActive: formData.get('isActive') === 'on',
  }
  const parsed = Schema.parse(data)
  await prisma.testimonial.update({ where: { id }, data: parsed })
  revalidatePath('/admin/testimonials')
  redirect('/admin/testimonials')
}

export async function deactivateTestimonial(id: string) {
  await requireAdmin()
  await prisma.testimonial.update({ where: { id }, data: { isActive: false } })
  revalidatePath('/admin/testimonials')
}

export async function deleteTestimonial(id: string) {
  await requireAdmin()
  await prisma.testimonial.delete({ where: { id } })
  revalidatePath('/admin/testimonials')
}

