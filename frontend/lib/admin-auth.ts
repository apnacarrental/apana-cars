import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function requireAdmin() {
  const session = await getAuthSession()
  if (!session?.user?.email) {
    throw new Error('Unauthorized: No session')
  }

  const user = await prisma.user.findUnique({ 
    where: { email: session.user.email } 
  })
  
  if (!user) {
    throw new Error('Unauthorized: User not found in database')
  }
  
  if (!user.isActive) {
    throw new Error('Unauthorized: User is inactive')
  }
  
  if (user.role !== 'ADMIN') {
    throw new Error('Unauthorized: Requires ADMIN role')
  }

  return user
}
