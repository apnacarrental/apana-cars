const fs = require('fs')
const path = require('path')

const models = [
  { name: 'Brand', plural: 'Brands', path: 'brands' },
  { name: 'Category', plural: 'Categories', path: 'categories' },
  { name: 'Location', plural: 'Locations', path: 'locations' },
  { name: 'Service', plural: 'Services', path: 'services' },
  { name: 'Route', plural: 'Routes', path: 'routes' },
  { name: 'Faq', plural: 'FAQs', path: 'faqs' },
  { name: 'Testimonial', plural: 'Testimonials', path: 'testimonials' },
  { name: 'Blog', plural: 'Blogs', path: 'blogs' },
]

for (const model of models) {
  const dir = path.join(__dirname, '..', 'app', 'admin', model.path)
  fs.mkdirSync(dir, { recursive: true })

  // Page
  const pageContent = `import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

export default async function Admin${model.plural}Page() {
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  const items = await prisma.${model.name.toLowerCase()}.findMany()

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">${model.plural}</h1>
        <button className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium opacity-50 cursor-not-allowed">
          Add New (Coming Soon)
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-8 text-center text-gray-500">
          CRUD for ${model.plural} will follow the same pattern as Cars. {items.length} existing items.
        </div>
      </div>
    </div>
  )
}
`
  fs.writeFileSync(path.join(dir, 'page.tsx'), pageContent)
}

// Ensure media page exists too
const mediaDir = path.join(__dirname, '..', 'app', 'admin', 'media')
fs.mkdirSync(mediaDir, { recursive: true })
fs.writeFileSync(path.join(mediaDir, 'page.tsx'), `import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

export default async function AdminMediaPage() {
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')
  
  const items = await prisma.media.findMany()

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Media</h1>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
        Media is managed locally. {items.length} items referenced.
      </div>
    </div>
  )
}
`)

console.log('Generated placeholder CRUD pages')
