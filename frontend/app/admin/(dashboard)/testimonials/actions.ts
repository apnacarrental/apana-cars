'use server'

import { requireAdmin } from '@/lib/admin-auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const Schema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  rating: z.number().int().min(1).max(5),
  review: z.string().min(1, 'Review text is required'),
  locationContext: z.string().optional().nullable(),
  isActive: z.boolean(),
  sortOrder: z.number().int(),
})

export type ActionResponse = { success: false; error: string } | undefined

export async function createTestimonial(formData: FormData): Promise<ActionResponse> {
  await requireAdmin()

  const data = {
    customerName: (formData.get('customerName') as string)?.trim() || '',
    rating: parseInt((formData.get('rating') as string) || '5'),
    review: (formData.get('review') as string)?.trim() || '',
    locationContext: (formData.get('locationContext') as string)?.trim() || null,
    isActive: formData.get('isActive') === 'on',
    sortOrder: parseInt((formData.get('sortOrder') as string) || '0'),
  }

  const parsed = Schema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
  }

  try {
    await prisma.testimonial.create({
      data: parsed.data
    })
  } catch (err: any) {
    console.error('Error creating testimonial:', err)
    return { success: false, error: err.message || 'Failed to create testimonial.' }
  }

  revalidatePath('/admin/testimonials')
  revalidatePath('/')
  redirect('/admin/testimonials')
}

export async function updateTestimonial(id: string, formData: FormData): Promise<ActionResponse> {
  await requireAdmin()

  const data = {
    customerName: (formData.get('customerName') as string)?.trim() || '',
    rating: parseInt((formData.get('rating') as string) || '5'),
    review: (formData.get('review') as string)?.trim() || '',
    locationContext: (formData.get('locationContext') as string)?.trim() || null,
    isActive: formData.get('isActive') === 'on',
    sortOrder: parseInt((formData.get('sortOrder') as string) || '0'),
  }

  const parsed = Schema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
  }

  try {
    await prisma.testimonial.update({
      where: { id },
      data: parsed.data
    })
  } catch (err: any) {
    console.error('Error updating testimonial:', err)
    return { success: false, error: err.message || 'Failed to update testimonial.' }
  }

  revalidatePath('/admin/testimonials')
  revalidatePath(`/admin/testimonials/${id}/edit`)
  revalidatePath('/')
  redirect('/admin/testimonials')
}

export async function deactivateTestimonial(id: string): Promise<ActionResponse> {
  await requireAdmin()

  try {
    await prisma.testimonial.update({
      where: { id },
      data: { isActive: false }
    })

    revalidatePath('/admin/testimonials')
    revalidatePath('/')
    return undefined
  } catch (err: any) {
    console.error('Error deactivating testimonial:', err)
    return { success: false, error: err.message || 'Failed to deactivate testimonial.' }
  }
}

export async function deleteTestimonial(id: string): Promise<ActionResponse> {
  await requireAdmin()

  try {
    await prisma.testimonial.delete({
      where: { id }
    })

    revalidatePath('/admin/testimonials')
    revalidatePath('/')
    return undefined
  } catch (err: any) {
    console.error('Error deleting testimonial:', err)
    return { success: false, error: err.message || 'Failed to delete testimonial.' }
  }
}
