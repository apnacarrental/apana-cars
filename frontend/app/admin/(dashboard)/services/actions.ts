'use server'

import { requireAdmin } from '@/lib/admin-auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const cleanNumber = (val: any) => {
  if (val === null || val === undefined || val === '') return null
  const num = parseFloat(String(val))
  return isNaN(num) ? null : num
}

const Schema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  shortDescription: z.string().optional().nullable(),
  startingPrice: z.number().nullable().optional(),
  priceUnit: z.string().optional().nullable(),
  sortOrder: z.number().int(),
  isActive: z.boolean(),
})

export type ActionResponse = { success: false; error: string } | undefined

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

export async function createService(formData: FormData): Promise<ActionResponse> {
  await requireAdmin()

  const rawTitle = (formData.get('title') as string)?.trim() || ''
  const rawSlug = (formData.get('slug') as string) || rawTitle
  const slug = slugify(rawSlug)

  const data = {
    title: rawTitle,
    slug,
    shortDescription: (formData.get('shortDescription') as string)?.trim() || null,
    startingPrice: cleanNumber(formData.get('startingPrice')),
    priceUnit: (formData.get('priceUnit') as string)?.trim() || null,
    sortOrder: parseInt((formData.get('sortOrder') as string) || '0'),
    isActive: formData.get('isActive') === 'on',
  }

  const parsed = Schema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
  }

  try {
    const existing = await prisma.service.findUnique({
      where: { slug: parsed.data.slug }
    })
    if (existing) {
      return { success: false, error: `A service with slug "${parsed.data.slug}" already exists.` }
    }

    await prisma.service.create({
      data: parsed.data
    })
  } catch (err: any) {
    console.error('Error creating service:', err)
    return { success: false, error: err.message || 'Failed to create service.' }
  }

  revalidatePath('/admin/services')
  revalidatePath('/services')
  revalidatePath(`/services/${parsed.data.slug}`)
  revalidatePath(`/${parsed.data.slug}`)
  revalidatePath('/', 'layout')
  revalidatePath('/')
  redirect('/admin/services')
}

export async function updateService(id: string, formData: FormData): Promise<ActionResponse> {
  await requireAdmin()

  const rawTitle = (formData.get('title') as string)?.trim() || ''
  const rawSlug = (formData.get('slug') as string) || rawTitle
  const slug = slugify(rawSlug)

  const data = {
    title: rawTitle,
    slug,
    shortDescription: (formData.get('shortDescription') as string)?.trim() || null,
    startingPrice: cleanNumber(formData.get('startingPrice')),
    priceUnit: (formData.get('priceUnit') as string)?.trim() || null,
    sortOrder: parseInt((formData.get('sortOrder') as string) || '0'),
    isActive: formData.get('isActive') === 'on',
  }

  const parsed = Schema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
  }

  try {
    const existing = await prisma.service.findFirst({
      where: {
        slug: parsed.data.slug,
        NOT: { id }
      }
    })
    if (existing) {
      return { success: false, error: `Another service with slug "${parsed.data.slug}" already exists.` }
    }

    const previous = await prisma.service.findUnique({ where: { id }, select: { slug: true } })

    await prisma.service.update({
      where: { id },
      data: parsed.data
    })

    if (previous?.slug && previous.slug !== parsed.data.slug) {
      revalidatePath(`/${previous.slug}`)
    }
  } catch (err: any) {
    console.error('Error updating service:', err)
    return { success: false, error: err.message || 'Failed to update service.' }
  }

  revalidatePath('/admin/services')
  revalidatePath(`/admin/services/${id}/edit`)
  revalidatePath('/services')
  revalidatePath(`/services/${parsed.data.slug}`)
  revalidatePath(`/${parsed.data.slug}`)
  revalidatePath('/', 'layout')
  revalidatePath('/')
  redirect('/admin/services')
}

export async function deactivateService(id: string): Promise<ActionResponse> {
  await requireAdmin()

  try {
    const srv = await prisma.service.update({
      where: { id },
      data: { isActive: false }
    })

    revalidatePath('/admin/services')
    revalidatePath('/services')
    if (srv?.slug) {
      revalidatePath(`/services/${srv.slug}`)
      revalidatePath(`/${srv.slug}`)
    }
    revalidatePath('/', 'layout')
    revalidatePath('/')
    return undefined
  } catch (err: any) {
    console.error('Error deactivating service:', err)
    return { success: false, error: err.message || 'Failed to deactivate service.' }
  }
}

export async function deleteService(id: string): Promise<ActionResponse> {
  await requireAdmin()

  try {
    const srv = await prisma.service.delete({
      where: { id }
    })

    revalidatePath('/admin/services')
    revalidatePath('/services')
    if (srv?.slug) {
      revalidatePath(`/services/${srv.slug}`)
      revalidatePath(`/${srv.slug}`)
    }
    revalidatePath('/', 'layout')
    revalidatePath('/')
    return undefined
  } catch (err: any) {
    console.error('Error deleting service:', err)
    return { success: false, error: err.message || 'Failed to delete service.' }
  }
}
