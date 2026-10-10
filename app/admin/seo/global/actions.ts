'use server'

import prisma from '@/lib/prisma'
import { requireAdmin } from '@/lib/admin-auth'
import { revalidatePath } from 'next/cache'

export async function saveGlobalSeoAction(formData: FormData) {
  await requireAdmin()
  
  const siteName = formData.get('siteName') as string || 'Apna Car Rental'
  const homepageTitle = formData.get('homepageTitle') as string || ''
  const homepageDescription = formData.get('homepageDescription') as string || ''
  const canonicalBaseUrl = formData.get('canonicalBaseUrl') as string || ''
  
  const existing = await prisma.seoSettings.findFirst()
  
  if (existing) {
    await prisma.seoSettings.update({
      where: { id: existing.id },
      data: { siteName, homepageTitle, homepageDescription, canonicalBaseUrl }
    })
  } else {
    await prisma.seoSettings.create({
      data: { siteName, homepageTitle, homepageDescription, canonicalBaseUrl }
    })
  }
  
  revalidatePath('/', 'layout')
}

