'use server'

import { requireAdmin } from '@/lib/admin-auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const Schema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional().nullable(),
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

export async function createCategory(formData: FormData): Promise<ActionResponse> {
  await requireAdmin()

  const rawName = (formData.get('name') as string)?.trim() || ''
  const rawSlug = (formData.get('slug') as string) || rawName
  const slug = slugify(rawSlug)

  const data = {
    name: rawName,
    slug,
    description: (formData.get('description') as string)?.trim() || null,
  }

  const parsed = Schema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
  }

  try {
    const existing = await prisma.category.findFirst({
      where: {
        OR: [{ name: parsed.data.name }, { slug: parsed.data.slug }]
      }
    })
    if (existing) {
      return { success: false, error: `A category with this name or slug already exists.` }
    }

    await prisma.category.create({
      data: parsed.data
    })
  } catch (err: any) {
    console.error('Error creating category:', err)
    return { success: false, error: err.message || 'Failed to create category.' }
  }

  revalidatePath('/admin/categories')
  revalidatePath('/fleet')
  revalidatePath('/')
  redirect('/admin/categories')
}

export async function updateCategory(id: string, formData: FormData): Promise<ActionResponse> {
  await requireAdmin()

  const rawName = (formData.get('name') as string)?.trim() || ''
  const rawSlug = (formData.get('slug') as string) || rawName
  const slug = slugify(rawSlug)

  const data = {
    name: rawName,
    slug,
    description: (formData.get('description') as string)?.trim() || null,
  }

  const parsed = Schema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
  }

  try {
    const existing = await prisma.category.findFirst({
      where: {
        OR: [{ name: parsed.data.name }, { slug: parsed.data.slug }],
        NOT: { id }
      }
    })
    if (existing) {
      return { success: false, error: `Another category with this name or slug already exists.` }
    }

    await prisma.category.update({
      where: { id },
      data: parsed.data
    })
  } catch (err: any) {
    console.error('Error updating category:', err)
    return { success: false, error: err.message || 'Failed to update category.' }
  }

  revalidatePath('/admin/categories')
  revalidatePath('/fleet')
  revalidatePath('/')
  redirect('/admin/categories')
}

export async function deleteCategory(id: string): Promise<ActionResponse> {
  await requireAdmin()

  try {
    const carCount = await prisma.car.count({
      where: { categories: { some: { id } } }
    })
    if (carCount > 0) {
      return { success: false, error: `Cannot delete category: ${carCount} car(s) belong to this category. Remove them from the category first.` }
    }

    await prisma.category.delete({
      where: { id }
    })

    revalidatePath('/admin/categories')
    revalidatePath('/fleet')
    revalidatePath('/')
    return undefined
  } catch (err: any) {
    console.error('Error deleting category:', err)
    return { success: false, error: err.message || 'Failed to delete category.' }
  }
}
