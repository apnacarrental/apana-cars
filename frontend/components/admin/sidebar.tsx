import Link from 'next/link'
import { Car, MapPin, Navigation, MessageCircle, FileText, LayoutDashboard, Settings, LogOut, Tags, HelpCircle, Star, Image as ImageIcon, Inbox, Grid } from 'lucide-react'

export function AdminSidebar() {
  const links = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/leads', label: 'Leads', icon: Inbox },
    { href: '/admin/cars', label: 'Cars', icon: Car },
    { href: '/admin/brands', label: 'Brands', icon: Tags },
    { href: '/admin/categories', label: 'Categories', icon: Grid },
    { href: '/admin/locations', label: 'Locations', icon: MapPin },
    { href: '/admin/services', label: 'Services', icon: Settings },
    { href: '/admin/routes', label: 'Routes', icon: Navigation },
    { href: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
    { href: '/admin/testimonials', label: 'Testimonials', icon: Star },
    { href: '/admin/blogs', label: 'Blogs', icon: FileText },
    { href: '/admin/media', label: 'Media', icon: ImageIcon },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col fixed inset-y-0 left-0">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <Link href="/admin" className="text-xl font-bold flex items-center gap-2 text-black">
          <div className="bg-black text-white p-1 rounded-md">
            <Car size={20} />
          </div>
          Apna Admin
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{link.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Link 
          href="/api/auth/signout" 
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50"
        >
          <LogOut size={18} />
          Sign Out
        </Link>
      </div>
    </div>
  )
}

