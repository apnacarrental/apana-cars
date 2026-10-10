'use server'

import prisma from '@/lib/prisma'
import { requireAdmin } from '@/lib/admin-auth'
import { revalidatePath } from 'next/cache'

export async function saveNavigationAction(formData: FormData) {
  await requireAdmin()
  
  const label = formData.get('label') as string
  const href = formData.get('href') as string
  const position = parseInt(formData.get('position') as string || '0', 10)
  
  if (!label || !href) throw new Error('Label and href required')
  
  await prisma.navigationItem.create({
    data: { label, href, position }
  })
  
  revalidatePath('/', 'layout')
  revalidatePath('/admin/seo/navigation')
}

export async function deleteNavigationAction(formData: FormData) {
  await requireAdmin()
  const id = formData.get('id') as string
  if (id) {
    await prisma.navigationItem.delete({ where: { id } })
    revalidatePath('/', 'layout')
    revalidatePath('/admin/seo/navigation')
  }
}

