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

export async function updateReviewBadgeSettings(formData: FormData): Promise<{ success: boolean; error?: string }> {
  await requireAdmin()

  const reviewCountText = ((formData.get('reviewCountText') as string) || '1500+').trim()
  const reviewSubtext = ((formData.get('reviewSubtext') as string) || 'Genuine Reviews').trim()
  const ratingValue = ((formData.get('ratingValue') as string) || '4.9/5').trim()
  const gmbUrl = ((formData.get('gmbUrl') as string) || 'https://share.google/z8cDjKFU53sT1UXHv').trim()

  try {
    const existing = await prisma.seoSettings.findFirst()
    if (existing) {
      await prisma.seoSettings.update({
        where: { id: existing.id },
        data: { reviewCountText, reviewSubtext, ratingValue, gmbUrl }
      })
    } else {
      await prisma.seoSettings.create({
        data: { reviewCountText, reviewSubtext, ratingValue, gmbUrl }
      })
    }

    revalidatePath('/', 'layout')
    revalidatePath('/admin/testimonials')
    return { success: true }
  } catch (err: any) {
    console.error('Error updating review badge settings:', err)
    return { success: false, error: err.message || 'Failed to update review badge settings.' }
  }
}
