import { notFound, redirect } from 'next/navigation'
import prisma from '@/lib/prisma'

export default async function CatchAllRoute({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params
  const path = '/' + resolvedParams.slug.join('/')
  
  const redirectRule = await prisma.redirect.findUnique({
    where: { source: path }
  })
  
  if (redirectRule && redirectRule.isActive) {
    redirect(redirectRule.destination)
  }

  // Gracefully handle service slugs that don't have a top-level route
  if (resolvedParams.slug.length === 1) {
    const service = await prisma.service.findFirst({
      where: { slug: resolvedParams.slug[0], isActive: true }
    })
    if (service) {
      redirect(`/services/${service.slug}`)
    }
  }
  
  notFound()
}

