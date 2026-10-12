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

export async function saveEntitySeoAction(entityType: string, entityId: string, slug: string, formData: FormData) {
  await requireAdmin()
  
  const title = formData.get('title') as string || null
  const description = formData.get('description') as string || null
  
  let canonical_url = formData.get('canonicalUrl') as string || null
  if (canonical_url && !isValidUrl(canonical_url)) canonical_url = null
  
  let og_image_id = formData.get('ogImageId') as string || null
  if (og_image_id && !isValidUrl(og_image_id)) og_image_id = null

  const og_title = formData.get('ogTitle') as string || null
  const og_description = formData.get('ogDescription') as string || null
  
  const focus_keyword = formData.get('focusKeyword') as string || null
  const secondary_keywords_str = formData.get('secondaryKeywords') as string || ''
  const secondary_keywords = secondary_keywords_str ? secondary_keywords_str.split(',').map(k => k.trim()).filter(Boolean) : []
  
  const robots_index = formData.get('robotsIndex') === 'on'
  const robots_follow = formData.get('robotsFollow') === 'on'
  
  const seoMetadata = {
    title,
    description,
    canonical_url,
    robots_index,
    robots_follow,
    og_title,
    og_description,
    og_image_id,
    focus_keyword,
    secondary_keywords
  }

  let basePath = ''

  if (entityType === 'CAR') {
    await prisma.car.update({ where: { id: entityId }, data: { seoMetadata } })
    basePath = '/fleet'
  } else if (entityType === 'LOCATION') {
    await prisma.location.update({ where: { id: entityId }, data: { seoMetadata } })
    basePath = '/locations'
  } else if (entityType === 'SERVICE') {
    await prisma.service.update({ where: { id: entityId }, data: { seoMetadata } })
    basePath = '/services'
  } else if (entityType === 'ROUTE') {
    await prisma.route.update({ where: { id: entityId }, data: { seoMetadata } })
    basePath = '/routes'
  } else if (entityType === 'BLOG') {
    await prisma.blog.update({ where: { id: entityId }, data: { seoMetadata } })
    basePath = '/blog'
  } else {
    throw new Error('Unsupported entity type')
  }
  
  if (basePath) {
    revalidatePath(`${basePath}/${slug}`)
  }
}
