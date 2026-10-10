'use server'
import { requireAdmin } from '@/lib/admin-auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const Schema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional().nullable(),
  })

export async function createCategory(formData: FormData) {
  await requireAdmin()
  const data = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
    description: formData.get('description') ? (formData.get('description') as string) : null,
    }
  const parsed = Schema.parse(data)
  await prisma.category.create({ data: parsed })
  revalidatePath('/admin/categories')
  redirect('/admin/categories')
}

export async function updateCategory(id: string, formData: FormData) {
  await requireAdmin()
  const data = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
    description: formData.get('description') ? (formData.get('description') as string) : null,
    }
  const parsed = Schema.parse(data)
  await prisma.category.update({ where: { id }, data: parsed })
  revalidatePath('/admin/categories')
  redirect('/admin/categories')
}



export async function deleteCategory(id: string) {
  await requireAdmin()
  await prisma.category.delete({ where: { id } })
  revalidatePath('/admin/categories')
}




