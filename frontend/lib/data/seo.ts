import prisma from '@/lib/prisma'

export async function getGlobalSeoSettings() {
  try {
    const settings = await prisma.seoSettings.findFirst({
      orderBy: { createdAt: 'desc' }
    })
    return settings || null
  } catch (error) {
    console.error('Failed to getGlobalSeoSettings:', error)
    return null
  }
}

export async function getPageSeo(path: string) {
  try {
    return await prisma.pageSeo.findUnique({
      where: { path }
    })
  } catch (error) {
    console.error(`Failed to getPageSeo for ${path}:`, error)
    return null
  }
}

export async function getAllPageSeos() {
  try {
    return await prisma.pageSeo.findMany({
      orderBy: { path: 'asc' }
    })
  } catch (error) {
    console.error('Failed to getAllPageSeos:', error)
    return []
  }
}

export async function getActiveRedirects() {
  try {
    return await prisma.redirect.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    })
  } catch (error) {
    console.error('Failed to getActiveRedirects:', error)
    return []
  }
}

export async function getActiveInternalLinks(path: string) {
  try {
    return await prisma.internalLink.findMany({
      where: { sourcePath: path, isActive: true },
      orderBy: { priority: 'desc' }
    })
  } catch (error) {
    console.error(`Failed to getActiveInternalLinks for ${path}:`, error)
    return []
  }
}

export async function getNavigationItems() {
  try {
    return await prisma.navigationItem.findMany({
      where: { isVisible: true, parentId: null },
      orderBy: { position: 'asc' },
      include: {
        children: {
          where: { isVisible: true },
          orderBy: { position: 'asc' }
        }
      }
    })
  } catch (error) {
    console.error('Failed to getNavigationItems from db, returning empty fallback:', error)
    return []
  }
}

