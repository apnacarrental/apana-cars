'use server'

import prisma from '@/lib/prisma'
import { requireAdmin } from '@/lib/admin-auth'
import { revalidatePath } from 'next/cache'

function isValidUrl(urlString: string | null): boolean {
  if (!urlString) return false
  try {
    const url = new URL(urlString)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch (e) {
    return false
  }
}

export async function savePageSeoAction(formData: FormData) {
  await requireAdmin()
  
  let path = formData.get('path') as string
  if (!path) throw new Error('Path is required')
  if (!path.startsWith('/')) path = '/' + path
  
  const title = formData.get('title') as string || null
  const description = formData.get('description') as string || null
  
  let canonicalUrl = formData.get('canonicalUrl') as string || null
  if (canonicalUrl && !isValidUrl(canonicalUrl)) canonicalUrl = null
  
  let ogImageId = formData.get('ogImageId') as string || null
  if (ogImageId && !isValidUrl(ogImageId)) ogImageId = null

  const ogTitle = formData.get('ogTitle') as string || null
  const ogDescription = formData.get('ogDescription') as string || null
  
  const focusKeyword = formData.get('focusKeyword') as string || null
  const secondaryKeywords = formData.get('secondaryKeywords') as string || null
  
  const robotsIndex = formData.get('robotsIndex') === 'on'
  const robotsFollow = formData.get('robotsFollow') === 'on'
  
  await prisma.pageSeo.upsert({
    where: { path },
    update: { title, description, canonicalUrl, robotsIndex, robotsFollow, ogTitle, ogDescription, ogImageId, focusKeyword, secondaryKeywords },
    create: { path, title, description, canonicalUrl, robotsIndex, robotsFollow, ogTitle, ogDescription, ogImageId, focusKeyword, secondaryKeywords }
  })
  
  revalidatePath(path, 'page')
  revalidatePath('/admin/seo/pages')
}

export async function deletePageSeoAction(formData: FormData) {
  await requireAdmin()
  const path = formData.get('path') as string
  if (path) {
    await prisma.pageSeo.delete({ where: { path } })
    revalidatePath('/admin/seo/pages')
  }
}
