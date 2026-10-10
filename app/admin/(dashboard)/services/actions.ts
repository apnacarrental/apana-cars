'use server'
import { requireAdmin } from '@/lib/admin-auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const Schema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  shortDescription: z.string().optional().nullable(),
  sortOrder: z.number().int(),
  isActive: z.boolean(),

})

export async function createService(formData: FormData) {
  await requireAdmin()
  const data = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    shortDescription: formData.get('shortDescription') ? (formData.get('shortDescription') as string) : null,
    sortOrder: parseInt((formData.get('sortOrder') as string) || '0'),
    isActive: formData.get('isActive') === 'on',

  }
  const parsed = Schema.parse(data)
  await prisma.service.create({ data: parsed })
  revalidatePath('/admin/services')
  redirect('/admin/services')
}

export async function updateService(id: string, formData: FormData) {
  await requireAdmin()
  const data = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    shortDescription: formData.get('shortDescription') ? (formData.get('shortDescription') as string) : null,
    sortOrder: parseInt((formData.get('sortOrder') as string) || '0'),
    isActive: formData.get('isActive') === 'on',

  }
  const parsed = Schema.parse(data)
  await prisma.service.update({ where: { id }, data: parsed })
  revalidatePath('/admin/services')
  redirect('/admin/services')
}

export async function deactivateService(id: string) {
  await requireAdmin()
  await prisma.service.update({ where: { id }, data: { isActive: false } })
  revalidatePath('/admin/services')
}

export async function deleteService(id: string) {
  await requireAdmin()
  await prisma.service.delete({ where: { id } })
  revalidatePath('/admin/services')
}

