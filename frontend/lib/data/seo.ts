import prisma from '@/lib/prisma'

export async function getGlobalSeoSettings() {
  const settings = await prisma.seoSettings.findFirst({
    orderBy: { createdAt: 'desc' }
  })
  
  if (!settings) return null
  return settings
}

export async function getPageSeo(path: string) {
  return await prisma.pageSeo.findUnique({
    where: { path }
  })
}

export async function getAllPageSeos() {
  return await prisma.pageSeo.findMany({
    orderBy: { path: 'asc' }
  })
}

export async function getActiveRedirects() {
  return await prisma.redirect.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' }
  })
}

export async function getActiveInternalLinks(path: string) {
  return await prisma.internalLink.findMany({
    where: { sourcePath: path, isActive: true },
    orderBy: { priority: 'desc' }
  })
}

export async function getNavigationItems() {
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
}

