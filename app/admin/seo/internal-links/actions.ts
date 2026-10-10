'use server'

import prisma from '@/lib/prisma'
import { requireAdmin } from '@/lib/admin-auth'
import { revalidatePath } from 'next/cache'

export async function saveInternalLinkAction(formData: FormData) {
  await requireAdmin()
  
  let sourcePath = formData.get('sourcePath') as string
  let destinationPath = formData.get('destinationPath') as string
  const anchorText = formData.get('anchorText') as string
  
  if (!sourcePath || !destinationPath || !anchorText) throw new Error('All fields required')
  
  // Basic URL safety validation
  if (!sourcePath.startsWith('/')) sourcePath = '/' + sourcePath
  if (destinationPath.toLowerCase().startsWith('javascript:')) throw new Error('Unsafe destination')
  
  await prisma.internalLink.upsert({
    where: {
      sourcePath_destinationPath_anchorText: {
        sourcePath, destinationPath, anchorText
      }
    },
    update: { isActive: true },
    create: { sourcePath, destinationPath, anchorText, isActive: true }
  })
  
  revalidatePath(sourcePath, 'page')
  revalidatePath('/admin/seo/internal-links')
}

export async function deleteInternalLinkAction(formData: FormData) {
  await requireAdmin()
  const id = formData.get('id') as string
  if (id) {
    const link = await prisma.internalLink.findUnique({ where: { id } })
    await prisma.internalLink.delete({ where: { id } })
    if (link) revalidatePath(link.sourcePath, 'page')
    revalidatePath('/admin/seo/internal-links')
  }
}
