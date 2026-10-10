'use server'
import { requireAdmin } from '@/lib/admin-auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const Schema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  origin: z.string().min(1),
  destination: z.string().min(1),
  isActive: z.boolean(),

})

export async function createRoute(formData: FormData) {
  await requireAdmin()
  const data = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    origin: formData.get('origin') as string,
    destination: formData.get('destination') as string,
    isActive: formData.get('isActive') === 'on',

  }
  const parsed = Schema.parse(data)

  if (parsed.origin.toLowerCase() === parsed.destination.toLowerCase()) {
    throw new Error('Origin and destination cannot be the same location.')
  }

  await prisma.route.create({ data: parsed })
  revalidatePath('/admin/routes')
  redirect('/admin/routes')
}

export async function updateRoute(id: string, formData: FormData) {
  await requireAdmin()
  const data = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    origin: formData.get('origin') as string,
    destination: formData.get('destination') as string,
    isActive: formData.get('isActive') === 'on',

  }
  const parsed = Schema.parse(data)
  
  if (parsed.origin.toLowerCase() === parsed.destination.toLowerCase()) {
    throw new Error('Origin and destination cannot be the same location.')
  }

  await prisma.route.update({ where: { id }, data: parsed })
  revalidatePath('/admin/routes')
  redirect('/admin/routes')
}

export async function deactivateRoute(id: string) {
  await requireAdmin()
  await prisma.route.update({ where: { id }, data: { isActive: false } })
  revalidatePath('/admin/routes')
}

export async function deleteRoute(id: string) {
  await requireAdmin()
  await prisma.route.delete({ where: { id } })
  revalidatePath('/admin/routes')
}


