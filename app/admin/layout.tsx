import type { Metadata } from 'next'
import './admin.css'

export const metadata: Metadata = {
  title: 'Apna Cars Admin',
  robots: {
    index: false,
    follow: false
  }
}

import { getAuthSession } from '@/lib/auth'
import { AdminSidebar } from '@/components/admin/sidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getAuthSession()
  const isAuth = !!session?.user

  return (
    <div className="admin-root min-h-screen bg-gray-50 text-gray-900 font-sans">
      {isAuth ? (
        <div className="flex min-h-screen bg-gray-50">
          <AdminSidebar />
          <main className="flex-1 ml-64 p-8">
            {children}
          </main>
        </div>
      ) : (
        children
      )}
    </div>
  )
}
