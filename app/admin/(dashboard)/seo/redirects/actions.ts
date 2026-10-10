'use server'

import prisma from '@/lib/prisma'
import { requireAdmin } from '@/lib/admin-auth'
import { revalidatePath } from 'next/cache'

export async function saveRedirectAction(formData: FormData) {
  await requireAdmin()
  
  let source = formData.get('source') as string
  let destination = formData.get('destination') as string
  
  if (!source || !destination) throw new Error('Source and destination required')
  
  source = source.trim()
  destination = destination.trim()
  
  if (!source.startsWith('/')) source = '/' + source
  if (destination.toLowerCase().startsWith('javascript:')) throw new Error('Unsafe destination')
  
  if (source === destination) throw new Error('Source cannot equal destination')
  
  // Basic loop prevention: check if destination is already a source that points back
  const existingDest = await prisma.redirect.findUnique({ where: { source: destination } })
  if (existingDest && existingDest.destination === source) {
    throw new Error('Redirect loop detected')
  }
  
  await prisma.redirect.upsert({
    where: { source },
    update: { destination, isActive: true },
    create: { source, destination, isActive: true }
  })
  
  revalidatePath('/admin/seo/redirects')
}

export async function deleteRedirectAction(formData: FormData) {
  await requireAdmin()
  const source = formData.get('source') as string
  if (source) {
    await prisma.redirect.delete({ where: { source } })
    revalidatePath('/admin/seo/redirects')
  }
}
