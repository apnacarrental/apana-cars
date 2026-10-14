import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { SyncWebsiteDataButton } from '@/components/admin/sync-website-data-button'
import { Car, Navigation, HelpCircle, Star, Briefcase, Inbox, ArrowRight, MapPin, Award, FolderTree, BookOpen, Plus } from 'lucide-react'

export const dynamic = 'force-dynamic'

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
    newLeads,
    locationsCount,
    brandsCount,
    categoriesCount,
    blogsCount
  ] = await Promise.all([
    prisma.car.count(),
    prisma.route.count(),
    prisma.service.count(),
    prisma.fAQ.count(),
    prisma.testimonial.count(),
    prisma.lead.count(),
    prisma.lead.count({ where: { status: 'NEW' } }),
    prisma.location.count(),
    prisma.brand.count(),
    prisma.category.count(),
    prisma.blog.count(),
  ])

  const stats = [
    { label: 'Booking Inquiries', value: totalLeads, subtext: `${newLeads} new uncontacted`, href: '/admin/leads', icon: Inbox, highlight: newLeads > 0, addHref: '/admin/leads/new', addLabel: 'Log Inquiry' },
    { label: 'Fleet Vehicles', value: carsCount, subtext: 'Cars, Sedans, SUVs & Vans', href: '/admin/cars', icon: Car, addHref: '/admin/cars/new', addLabel: 'Add Car' },
    { label: 'Locations & Hubs', value: locationsCount, subtext: 'Airports, cities & regions', href: '/admin/locations', icon: MapPin, addHref: '/admin/locations/new', addLabel: 'Add Location' },
    { label: 'Outstation Routes', value: routesCount, subtext: 'Highway travel corridors', href: '/admin/routes', icon: Navigation, addHref: '/admin/routes/new', addLabel: 'Add Route' },
    { label: 'Travel Services', value: servicesCount, subtext: 'Hourly & package rentals', href: '/admin/services', icon: Briefcase, addHref: '/admin/services/new', addLabel: 'Add Service' },
    { label: 'Car Brands', value: brandsCount, subtext: 'Vehicle manufacturers', href: '/admin/brands', icon: Award, addHref: '/admin/brands/new', addLabel: 'Add Brand' },
    { label: 'Categories', value: categoriesCount, subtext: 'Vehicle classifications', href: '/admin/categories', icon: FolderTree, addHref: '/admin/categories/new', addLabel: 'Add Category' },
    { label: 'Blog Articles', value: blogsCount, subtext: 'Travel guides & insights', href: '/admin/blogs', icon: BookOpen, addHref: '/admin/blogs/new', addLabel: 'Add Blog' },
    { label: 'Frequently Asked Questions', value: faqsCount, subtext: 'Customer answers', href: '/admin/faqs', icon: HelpCircle, addHref: '/admin/faqs/new', addLabel: 'Add FAQ' },
    { label: 'Testimonials', value: testimonialsCount, subtext: 'Customer reviews & ratings', href: '/admin/testimonials', icon: Star, addHref: '/admin/testimonials/new', addLabel: 'Add Review' },
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
        <div className="flex items-center gap-3">
          <SyncWebsiteDataButton />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className={`p-5 rounded-xl border transition-all duration-200 group flex flex-col justify-between ${
                stat.highlight
                  ? 'bg-blue-50/70 border-blue-200 hover:border-blue-300 hover:shadow-md'
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <p className="text-3xl font-extrabold text-gray-900 mt-1.5">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{stat.subtext}</p>
                </div>
                <div className={`p-2.5 rounded-xl ${stat.highlight ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100 text-xs">
                <Link 
                  href={stat.href} 
                  className="text-blue-600 font-semibold inline-flex items-center gap-1 hover:text-blue-800 transition-colors"
                >
                  Manage <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                {stat.addHref && (
                  <Link 
                    href={stat.addHref} 
                    className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 font-medium px-2 py-1 rounded bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors"
                  >
                    <Plus size={12} />
                    <span>{stat.addLabel}</span>
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
