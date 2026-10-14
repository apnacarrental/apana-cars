'use server'

import { requireAdmin } from '@/lib/admin-auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { LocationType } from '@prisma/client'

const Schema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  type: z.nativeEnum(LocationType),
  parentId: z.string().uuid().optional().nullable(),
  description: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
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

export async function createLocation(formData: FormData): Promise<ActionResponse> {
  await requireAdmin()

  const parentIdRaw = formData.get('parentId') as string | null
  const parentId = parentIdRaw && parentIdRaw !== '' && parentIdRaw !== 'none' ? parentIdRaw : null

  const rawSlug = (formData.get('slug') as string) || (formData.get('name') as string) || ''
  const slug = slugify(rawSlug)

  const data = {
    name: (formData.get('name') as string)?.trim(),
    slug,
    type: formData.get('type') as LocationType,
    parentId,
    description: (formData.get('description') as string)?.trim() || null,
    content: (formData.get('content') as string)?.trim() || null,
    isActive: formData.get('isActive') === 'on',
  }

  const parsed = Schema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
  }

  try {
    const existing = await prisma.location.findUnique({
      where: { slug: parsed.data.slug }
    })
    if (existing) {
      return { success: false, error: `A location with slug "${parsed.data.slug}" already exists.` }
    }

    await prisma.location.create({
      data: parsed.data
    })
  } catch (err: any) {
    console.error('Error creating location in DB:', err)
    return { success: false, error: err.message || 'Failed to create location.' }
  }

  revalidatePath('/admin/locations')
  revalidatePath('/locations')
  revalidatePath(`/locations/${parsed.data.slug}`)
  revalidatePath('/')
  redirect('/admin/locations')
}

export async function updateLocation(id: string, formData: FormData): Promise<ActionResponse> {
  await requireAdmin()

  const parentIdRaw = formData.get('parentId') as string | null
  const parentId = parentIdRaw && parentIdRaw !== '' && parentIdRaw !== 'none' ? parentIdRaw : null

  if (id === parentId) {
    return { success: false, error: 'A location cannot be its own parent.' }
  }

  const rawSlug = (formData.get('slug') as string) || (formData.get('name') as string) || ''
  const slug = slugify(rawSlug)

  const data = {
    name: (formData.get('name') as string)?.trim(),
    slug,
    type: formData.get('type') as LocationType,
    parentId,
    description: (formData.get('description') as string)?.trim() || null,
    content: (formData.get('content') as string)?.trim() || null,
    isActive: formData.get('isActive') === 'on',
  }

  const parsed = Schema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
  }

  try {
    const existing = await prisma.location.findFirst({
      where: {
        slug: parsed.data.slug,
        NOT: { id }
      }
    })
    if (existing) {
      return { success: false, error: `A location with slug "${parsed.data.slug}" already exists.` }
    }

    const previous = await prisma.location.findUnique({ where: { id }, select: { slug: true } })

    await prisma.location.update({
      where: { id },
      data: parsed.data
    })

    if (previous?.slug && previous.slug !== parsed.data.slug) {
      revalidatePath(`/locations/${previous.slug}`)
    }
  } catch (err: any) {
    console.error('Error updating location in DB:', err)
    return { success: false, error: err.message || 'Failed to update location.' }
  }

  revalidatePath('/admin/locations')
  revalidatePath(`/admin/locations/${id}/edit`)
  revalidatePath('/locations')
  revalidatePath(`/locations/${parsed.data.slug}`)
  revalidatePath('/')
  redirect('/admin/locations')
}

export async function deactivateLocation(id: string): Promise<ActionResponse> {
  await requireAdmin()

  try {
    const loc = await prisma.location.update({
      where: { id },
      data: { isActive: false }
    })

    revalidatePath('/admin/locations')
    revalidatePath('/locations')
    if (loc?.slug) revalidatePath(`/locations/${loc.slug}`)
    revalidatePath('/')
    return undefined
  } catch (err: any) {
    console.error('Error deactivating location:', err)
    return { success: false, error: err.message || 'Failed to deactivate location.' }
  }
}

export async function deleteLocation(id: string): Promise<ActionResponse> {
  await requireAdmin()

  try {
    const childCount = await prisma.location.count({
      where: { parentId: id }
    })
    if (childCount > 0) {
      return { success: false, error: 'Cannot delete a location that has sub-locations. Reassign or delete child locations first.' }
    }

    const loc = await prisma.location.delete({
      where: { id }
    })

    revalidatePath('/admin/locations')
    revalidatePath('/locations')
    if (loc?.slug) revalidatePath(`/locations/${loc.slug}`)
    revalidatePath('/')
    return undefined
  } catch (err: any) {
    console.error('Error deleting location:', err)
    return { success: false, error: err.message || 'Failed to delete location.' }
  }
}
