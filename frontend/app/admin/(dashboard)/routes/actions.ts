'use server'

import { requireAdmin } from '@/lib/admin-auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const Schema = z.object({
  origin: z.string().min(1, 'Origin is required'),
  destination: z.string().min(1, 'Destination is required'),
  slug: z.string().min(1, 'Slug is required'),
  title: z.string().min(1, 'Title is required'),
  distance: z.number().nullable().optional(),
  duration: z.string().nullable().optional(),
  startingPrice: z.number().nullable().optional(),
  content: z.string().nullable().optional(),
  inclusions: z.array(z.string()).default([]),
  exclusions: z.array(z.string()).default([]),
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

function parseList(input: FormDataEntryValue | null): string[] {
  if (!input || typeof input !== 'string') return []
  return input
    .split('\n')
    .map(s => s.trim())
    .filter(Boolean)
}

export async function createRoute(formData: FormData): Promise<ActionResponse> {
  await requireAdmin()

  const rawTitle = (formData.get('title') as string)?.trim() || ''
  const origin = (formData.get('origin') as string)?.trim() || ''
  const destination = (formData.get('destination') as string)?.trim() || ''
  const rawSlug = (formData.get('slug') as string) || `${origin}-to-${destination}`
  const slug = slugify(rawSlug)

  const distanceRaw = formData.get('distance') as string | null
  const startingPriceRaw = formData.get('startingPrice') as string | null

  const data = {
    origin,
    destination,
    slug,
    title: rawTitle,
    distance: distanceRaw && !isNaN(parseFloat(distanceRaw)) ? parseFloat(distanceRaw) : null,
    duration: (formData.get('duration') as string)?.trim() || null,
    startingPrice: startingPriceRaw && !isNaN(parseFloat(startingPriceRaw)) ? parseFloat(startingPriceRaw) : null,
    content: (formData.get('content') as string)?.trim() || null,
    inclusions: parseList(formData.get('inclusions')),
    exclusions: parseList(formData.get('exclusions')),
    isActive: formData.get('isActive') === 'on',
  }

  const parsed = Schema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
  }

  try {
    const existing = await prisma.route.findUnique({
      where: { slug: parsed.data.slug }
    })
    if (existing) {
      return { success: false, error: `A route with slug "${parsed.data.slug}" already exists.` }
    }

    await prisma.route.create({
      data: parsed.data
    })
  } catch (err: any) {
    console.error('Error creating route:', err)
    return { success: false, error: err.message || 'Failed to create route.' }
  }

  revalidatePath('/admin/routes')
  revalidatePath(`/routes/${parsed.data.slug}`)
  revalidatePath('/')
  redirect('/admin/routes')
}

export async function updateRoute(id: string, formData: FormData): Promise<ActionResponse> {
  await requireAdmin()

  const rawTitle = (formData.get('title') as string)?.trim() || ''
  const origin = (formData.get('origin') as string)?.trim() || ''
  const destination = (formData.get('destination') as string)?.trim() || ''
  const rawSlug = (formData.get('slug') as string) || `${origin}-to-${destination}`
  const slug = slugify(rawSlug)

  const distanceRaw = formData.get('distance') as string | null
  const startingPriceRaw = formData.get('startingPrice') as string | null

  const data = {
    origin,
    destination,
    slug,
    title: rawTitle,
    distance: distanceRaw && !isNaN(parseFloat(distanceRaw)) ? parseFloat(distanceRaw) : null,
    duration: (formData.get('duration') as string)?.trim() || null,
    startingPrice: startingPriceRaw && !isNaN(parseFloat(startingPriceRaw)) ? parseFloat(startingPriceRaw) : null,
    content: (formData.get('content') as string)?.trim() || null,
    inclusions: parseList(formData.get('inclusions')),
    exclusions: parseList(formData.get('exclusions')),
    isActive: formData.get('isActive') === 'on',
  }

  const parsed = Schema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
  }

  try {
    const existing = await prisma.route.findFirst({
      where: {
        slug: parsed.data.slug,
        NOT: { id }
      }
    })
    if (existing) {
      return { success: false, error: `Another route with slug "${parsed.data.slug}" already exists.` }
    }

    const previous = await prisma.route.findUnique({ where: { id }, select: { slug: true } })

    await prisma.route.update({
      where: { id },
      data: parsed.data
    })

    if (previous?.slug && previous.slug !== parsed.data.slug) {
      revalidatePath(`/routes/${previous.slug}`)
    }
  } catch (err: any) {
    console.error('Error updating route:', err)
    return { success: false, error: err.message || 'Failed to update route.' }
  }

  revalidatePath('/admin/routes')
  revalidatePath(`/admin/routes/${id}/edit`)
  revalidatePath(`/routes/${parsed.data.slug}`)
  revalidatePath('/')
  redirect('/admin/routes')
}

export async function deactivateRoute(id: string): Promise<ActionResponse> {
  await requireAdmin()

  try {
    const r = await prisma.route.update({
      where: { id },
      data: { isActive: false }
    })

    revalidatePath('/admin/routes')
    if (r?.slug) revalidatePath(`/routes/${r.slug}`)
    revalidatePath('/')
    return undefined
  } catch (err: any) {
    console.error('Error deactivating route:', err)
    return { success: false, error: err.message || 'Failed to deactivate route.' }
  }
}

export async function deleteRoute(id: string): Promise<ActionResponse> {
  await requireAdmin()

  try {
    const r = await prisma.route.delete({
      where: { id }
    })

    revalidatePath('/admin/routes')
    if (r?.slug) revalidatePath(`/routes/${r.slug}`)
    revalidatePath('/')
    return undefined
  } catch (err: any) {
    console.error('Error deleting route:', err)
    return { success: false, error: err.message || 'Failed to delete route.' }
  }
}
