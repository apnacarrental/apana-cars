'use server'
import { requireAdmin } from '@/lib/admin-auth'
import { LocationType } from '@prisma/client'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const Schema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  type: z.nativeEnum(LocationType),
  parentId: z.string().optional().nullable(),
  isActive: z.boolean(),

})

export async function createLocation(formData: FormData) {
  await requireAdmin()
  const data = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
    type: (formData.get('type') as string)?.toUpperCase() as LocationType,
    parentId: formData.get('parentId') ? (formData.get('parentId') as string) : null,
    isActive: formData.get('isActive') === 'on',

  }
  const parsed = Schema.parse(data)
  await prisma.location.create({ data: { ...parsed, parentId: parsed.parentId || null } })
  revalidatePath('/admin/locations')
  redirect('/admin/locations')
}

export async function updateLocation(id: string, formData: FormData) {
  await requireAdmin()
  const data = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
    type: (formData.get('type') as string)?.toUpperCase() as LocationType,
    parentId: formData.get('parentId') ? (formData.get('parentId') as string) : null,
    isActive: formData.get('isActive') === 'on',

  }
  const parsed = Schema.parse(data)
  
  if (parsed.parentId === id) {
    throw new Error('A location cannot be its own parent.')
  }

  await prisma.location.update({ where: { id }, data: { ...parsed, parentId: parsed.parentId || null } })
  revalidatePath('/admin/locations')
  redirect('/admin/locations')
}

export async function deactivateLocation(id: string) {
  await requireAdmin()
  await prisma.location.update({ where: { id }, data: { isActive: false } })
  revalidatePath('/admin/locations')
}

export async function deleteLocation(id: string) {
  await requireAdmin()
  await prisma.location.delete({ where: { id } })
  revalidatePath('/admin/locations')
}




