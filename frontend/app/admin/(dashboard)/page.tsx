import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { SyncWebsiteDataButton } from '@/components/admin/sync-website-data-button'
import { Car, Navigation, HelpCircle, Star, Settings, Inbox, ArrowRight } from 'lucide-react'

export default async function AdminDashboardPage() {
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  const [
    carsCount,
    routesCount,
    servicesCount,
    faqsCount,
    testimonialsCount,
    totalLeads,
    newLeads
  ] = await Promise.all([
    prisma.car.count(),
    prisma.route.count(),
    prisma.service.count(),
    prisma.fAQ.count(),
    prisma.testimonial.count(),
    prisma.lead.count(),
    prisma.lead.count({ where: { status: 'NEW' } }),
  ])

  const stats = [
    { label: 'New Leads', value: newLeads, href: '/admin/leads', icon: Inbox, highlight: true },
    { label: 'Fleet Vehicles', value: carsCount, href: '/admin/cars', icon: Car },
    { label: 'Popular Routes', value: routesCount, href: '/admin/routes', icon: Navigation },
    { label: 'Services', value: servicesCount, href: '/admin/services', icon: Settings },
    { label: 'FAQs', value: faqsCount, href: '/admin/faqs', icon: HelpCircle },
    { label: 'Testimonials', value: testimonialsCount, href: '/admin/testimonials', icon: Star },
  ]

  return (
    <div className="space-y-8">
      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Admin Overview</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your fleet, per-km fuel pricing, landing page packages, SEO, and booking leads.
          </p>
        </div>
        <div>
          <SyncWebsiteDataButton />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className={`p-6 rounded-xl border transition-all duration-200 group flex items-start justify-between ${
                stat.highlight
                  ? 'bg-blue-50/70 border-blue-200 hover:border-blue-300 hover:shadow-md'
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </span>
                <p className="text-3xl font-extrabold text-gray-900 mt-2">{stat.value}</p>
                <span className="text-xs text-blue-600 font-medium inline-flex items-center gap-1 mt-3 group-hover:translate-x-0.5 transition-transform">
                  Manage section <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className={`p-3 rounded-xl ${stat.highlight ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                <Icon className="w-6 h-6" />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
