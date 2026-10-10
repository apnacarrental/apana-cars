'use server'
import { requireAdmin } from '@/lib/admin-auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const Schema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  })

export async function createBrand(formData: FormData) {
  await requireAdmin()
  const data = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
    }
  const parsed = Schema.parse(data)
  await prisma.brand.create({ data: parsed })
  revalidatePath('/admin/brands')
  redirect('/admin/brands')
}

export async function updateBrand(id: string, formData: FormData) {
  await requireAdmin()
  const data = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
    }
  const parsed = Schema.parse(data)
  await prisma.brand.update({ where: { id }, data: parsed })
  revalidatePath('/admin/brands')
  redirect('/admin/brands')
}



export async function deleteBrand(id: string) {
  await requireAdmin()
  await prisma.brand.delete({ where: { id } })
  revalidatePath('/admin/brands')
}




