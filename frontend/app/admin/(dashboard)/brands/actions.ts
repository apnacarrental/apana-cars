'use server'

import { requireAdmin } from '@/lib/admin-auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const Schema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
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

export async function createBrand(formData: FormData): Promise<ActionResponse> {
  await requireAdmin()

  const rawName = (formData.get('name') as string)?.trim() || ''
  const rawSlug = (formData.get('slug') as string) || rawName
  const slug = slugify(rawSlug)

  const parsed = Schema.safeParse({ name: rawName, slug })
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
  }

  try {
    const existing = await prisma.brand.findFirst({
      where: {
        OR: [{ name: parsed.data.name }, { slug: parsed.data.slug }]
      }
    })
    if (existing) {
      return { success: false, error: `A brand with this name or slug already exists.` }
    }

    await prisma.brand.create({
      data: parsed.data
    })
  } catch (err: any) {
    console.error('Error creating brand:', err)
    return { success: false, error: err.message || 'Failed to create brand.' }
  }

  revalidatePath('/admin/brands')
  revalidatePath('/fleet')
  revalidatePath('/')
  redirect('/admin/brands')
}

export async function updateBrand(id: string, formData: FormData): Promise<ActionResponse> {
  await requireAdmin()

  const rawName = (formData.get('name') as string)?.trim() || ''
  const rawSlug = (formData.get('slug') as string) || rawName
  const slug = slugify(rawSlug)

  const parsed = Schema.safeParse({ name: rawName, slug })
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
  }

  try {
    const existing = await prisma.brand.findFirst({
      where: {
        OR: [{ name: parsed.data.name }, { slug: parsed.data.slug }],
        NOT: { id }
      }
    })
    if (existing) {
      return { success: false, error: `Another brand with this name or slug already exists.` }
    }

    await prisma.brand.update({
      where: { id },
      data: parsed.data
    })
  } catch (err: any) {
    console.error('Error updating brand:', err)
    return { success: false, error: err.message || 'Failed to update brand.' }
  }

  revalidatePath('/admin/brands')
  revalidatePath('/fleet')
  revalidatePath('/')
  redirect('/admin/brands')
}

export async function deleteBrand(id: string): Promise<ActionResponse> {
  await requireAdmin()

  try {
    const carCount = await prisma.car.count({
      where: { brandId: id }
    })
    if (carCount > 0) {
      return { success: false, error: `Cannot delete brand: ${carCount} car(s) belong to this brand. Please reassign or delete those cars first.` }
    }

    await prisma.brand.delete({
      where: { id }
    })

    revalidatePath('/admin/brands')
    revalidatePath('/fleet')
    revalidatePath('/')
    return undefined
  } catch (err: any) {
    console.error('Error deleting brand:', err)
    return { success: false, error: err.message || 'Failed to delete brand.' }
  }
}
