import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

export default async function AdminDashboardPage() {
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  const [
    carsCount,
    locationsCount,
    servicesCount,
    blogsCount,
    totalLeads,
    newLeads
  ] = await Promise.all([
    prisma.car.count(),
    prisma.location.count(),
    prisma.service.count(),
    prisma.blog.count(),
    prisma.lead.count(),
    prisma.lead.count({ where: { status: 'NEW' } }),
  ])

  const stats = [
    { label: 'New Leads', value: newLeads, href: '/admin/leads' },
    { label: 'Total Leads', value: totalLeads, href: '/admin/leads' },
    { label: 'Cars', value: carsCount, href: '/admin/cars' },
    { label: 'Locations', value: locationsCount, href: '/admin/locations' },
    { label: 'Services', value: servicesCount, href: '/admin/services' },
    { label: 'Blogs', value: blogsCount, href: '/admin/blogs' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <a
            key={stat.label}
            href={stat.href}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </a>
        ))}
      </div>
    </div>
  )
}

