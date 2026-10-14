'use server'

import { requireAdmin } from '@/lib/admin-auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const Schema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
  isGlobal: z.boolean(),
  sortOrder: z.number().int(),
  carId: z.string().uuid().optional().nullable(),
  locationId: z.string().uuid().optional().nullable(),
  serviceId: z.string().uuid().optional().nullable(),
  routeId: z.string().uuid().optional().nullable(),
})

export type ActionResponse = { success: false; error: string } | undefined

function parseOptionalId(val: FormDataEntryValue | null): string | null {
  if (!val || typeof val !== 'string' || val.trim() === '' || val === 'none') return null
  return val.trim()
}

export async function createFaq(formData: FormData): Promise<ActionResponse> {
  await requireAdmin()

  const data = {
    question: (formData.get('question') as string)?.trim() || '',
    answer: (formData.get('answer') as string)?.trim() || '',
    isGlobal: formData.get('isGlobal') === 'on',
    sortOrder: parseInt((formData.get('sortOrder') as string) || '0'),
    carId: parseOptionalId(formData.get('carId')),
    locationId: parseOptionalId(formData.get('locationId')),
    serviceId: parseOptionalId(formData.get('serviceId')),
    routeId: parseOptionalId(formData.get('routeId')),
  }

  const parsed = Schema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
  }

  try {
    await prisma.fAQ.create({
      data: parsed.data
    })
  } catch (err: any) {
    console.error('Error creating FAQ:', err)
    return { success: false, error: err.message || 'Failed to create FAQ.' }
  }

  revalidatePath('/admin/faqs')
  revalidatePath('/faq')
  revalidatePath('/')
  redirect('/admin/faqs')
}

export async function updateFaq(id: string, formData: FormData): Promise<ActionResponse> {
  await requireAdmin()

  const data = {
    question: (formData.get('question') as string)?.trim() || '',
    answer: (formData.get('answer') as string)?.trim() || '',
    isGlobal: formData.get('isGlobal') === 'on',
    sortOrder: parseInt((formData.get('sortOrder') as string) || '0'),
    carId: parseOptionalId(formData.get('carId')),
    locationId: parseOptionalId(formData.get('locationId')),
    serviceId: parseOptionalId(formData.get('serviceId')),
    routeId: parseOptionalId(formData.get('routeId')),
  }

  const parsed = Schema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
  }

  try {
    await prisma.fAQ.update({
      where: { id },
      data: parsed.data
    })
  } catch (err: any) {
    console.error('Error updating FAQ:', err)
    return { success: false, error: err.message || 'Failed to update FAQ.' }
  }

  revalidatePath('/admin/faqs')
  revalidatePath(`/admin/faqs/${id}/edit`)
  revalidatePath('/faq')
  revalidatePath('/')
  redirect('/admin/faqs')
}

export async function deleteFaq(id: string): Promise<ActionResponse> {
  await requireAdmin()

  try {
    await prisma.fAQ.delete({
      where: { id }
    })

    revalidatePath('/admin/faqs')
    revalidatePath('/faq')
    revalidatePath('/')
    return undefined
  } catch (err: any) {
    console.error('Error deleting FAQ:', err)
    return { success: false, error: err.message || 'Failed to delete FAQ.' }
  }
}
