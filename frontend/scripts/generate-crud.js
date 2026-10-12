const fs = require('fs')
const path = require('path')

const models = [
  { 
    name: 'Brand', plural: 'Brands', path: 'brands', titleField: 'name',
    fields: [ {name: 'name', type: 'string'}, {name: 'slug', type: 'string'}, {name: 'isActive', type: 'boolean'} ]
  },
  { 
    name: 'Category', plural: 'Categories', path: 'categories', titleField: 'name',
    fields: [ {name: 'name', type: 'string'}, {name: 'slug', type: 'string'}, {name: 'description', type: 'string_optional'}, {name: 'isActive', type: 'boolean'} ]
  },
  {
    name: 'Service', plural: 'Services', path: 'services', titleField: 'title',
    fields: [ {name: 'title', type: 'string'}, {name: 'slug', type: 'string'}, {name: 'shortDescription', type: 'string_optional'}, {name: 'sortOrder', type: 'number'}, {name: 'isActive', type: 'boolean'} ]
  },
  {
    name: 'Location', plural: 'Locations', path: 'locations', titleField: 'name',
    fields: [ {name: 'name', type: 'string'}, {name: 'slug', type: 'string'}, {name: 'type', type: 'string'}, {name: 'parentId', type: 'string_optional'}, {name: 'isActive', type: 'boolean'} ]
  },
  {
    name: 'Route', plural: 'Routes', path: 'routes', titleField: 'title',
    fields: [ {name: 'title', type: 'string'}, {name: 'slug', type: 'string'}, {name: 'originId', type: 'string'}, {name: 'destinationId', type: 'string'}, {name: 'isActive', type: 'boolean'} ]
  },
  {
    name: 'Faq', plural: 'FAQs', path: 'faqs', titleField: 'question',
    fields: [ {name: 'question', type: 'string'}, {name: 'answer', type: 'string'}, {name: 'sortOrder', type: 'number'}, {name: 'isActive', type: 'boolean'} ]
  },
  {
    name: 'Testimonial', plural: 'Testimonials', path: 'testimonials', titleField: 'authorName',
    fields: [ {name: 'authorName', type: 'string'}, {name: 'content', type: 'string'}, {name: 'rating', type: 'number'}, {name: 'isActive', type: 'boolean'} ]
  }
]

for (const model of models) {
  const dir = path.join(__dirname, '..', 'app', 'admin', model.path)
  const compDir = path.join(__dirname, '..', 'components', 'admin')
  
  fs.mkdirSync(dir, { recursive: true })
  fs.mkdirSync(path.join(dir, 'new'), { recursive: true })
  fs.mkdirSync(path.join(dir, '[id]', 'edit'), { recursive: true })

  // 1. Generate Form Component
  let formInputs = ''
  let zodFields = ''
  let formDataParsing = ''

  for (const f of model.fields) {
    if (f.type === 'string') {
      zodFields += `  ${f.name}: z.string().min(1),\n`
      formDataParsing += `    ${f.name}: formData.get('${f.name}') as string,\n`
      formInputs += `
        <div>
          <label htmlFor="${f.name}" className="block text-sm font-medium text-gray-700">${f.name}</label>
          <input type="text" name="${f.name}" id="${f.name}" defaultValue={item?.${f.name}} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>`
    } else if (f.type === 'string_optional') {
      zodFields += `  ${f.name}: z.string().optional().nullable(),\n`
      formDataParsing += `    ${f.name}: formData.get('${f.name}') ? (formData.get('${f.name}') as string) : null,\n`
      formInputs += `
        <div>
          <label htmlFor="${f.name}" className="block text-sm font-medium text-gray-700">${f.name}</label>
          <input type="text" name="${f.name}" id="${f.name}" defaultValue={item?.${f.name}} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>`
    } else if (f.type === 'number') {
      zodFields += `  ${f.name}: z.number().int(),\n`
      formDataParsing += `    ${f.name}: parseInt((formData.get('${f.name}') as string) || '0'),\n`
      formInputs += `
        <div>
          <label htmlFor="${f.name}" className="block text-sm font-medium text-gray-700">${f.name}</label>
          <input type="number" name="${f.name}" id="${f.name}" defaultValue={item?.${f.name} || 0} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>`
    } else if (f.type === 'boolean') {
      zodFields += `  ${f.name}: z.boolean(),\n`
      formDataParsing += `    ${f.name}: formData.get('${f.name}') === 'on',\n`
      formInputs += `
        <div className="flex items-center">
          <input type="checkbox" name="${f.name}" id="${f.name}" defaultChecked={item ? item.${f.name} : true} className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" />
          <label htmlFor="${f.name}" className="ml-2 block text-sm text-gray-900">${f.name}</label>
        </div>`
    }
  }

  const formComponent = `'use client'
import { useTransition } from 'react'
import { create${model.name}, update${model.name} } from '@/app/admin/${model.path}/actions'
import Link from 'next/link'

export function ${model.name}Form({ item }: { item?: any }) {
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(() => {
      if (item) {
        update${model.name}(item.id, formData)
      } else {
        create${model.name}(formData)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <div className="space-y-4">
        ${formInputs}
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <Link href="/admin/${model.path}" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</Link>
        <button type="submit" disabled={isPending} className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-900 disabled:opacity-50">
          {isPending ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  )
}
`
  fs.writeFileSync(path.join(compDir, `${model.name.toLowerCase()}-form.tsx`), formComponent)

  // 2. Generate Actions
  const actionsContent = `'use server'
import { requireAdmin } from '@/lib/admin-auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const Schema = z.object({
${zodFields}
})

export async function create${model.name}(formData: FormData) {
  await requireAdmin()
  const data = {
${formDataParsing}
  }
  const parsed = Schema.parse(data)
  await prisma.${model.name.toLowerCase()}.create({ data: parsed })
  revalidatePath('/admin/${model.path}')
  redirect('/admin/${model.path}')
}

export async function update${model.name}(id: string, formData: FormData) {
  await requireAdmin()
  const data = {
${formDataParsing}
  }
  const parsed = Schema.parse(data)
  await prisma.${model.name.toLowerCase()}.update({ where: { id }, data: parsed })
  revalidatePath('/admin/${model.path}')
  redirect('/admin/${model.path}')
}

export async function deactivate${model.name}(id: string) {
  await requireAdmin()
  await prisma.${model.name.toLowerCase()}.update({ where: { id }, data: { isActive: false } })
  revalidatePath('/admin/${model.path}')
}

export async function delete${model.name}(id: string) {
  await requireAdmin()
  await prisma.${model.name.toLowerCase()}.delete({ where: { id } })
  revalidatePath('/admin/${model.path}')
}
`
  fs.writeFileSync(path.join(dir, 'actions.ts'), actionsContent)

  // 3. Generate List Page
  const listPage = `import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { deactivate${model.name}, delete${model.name} } from './actions'

export default async function Admin${model.plural}Page() {
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  const items = await prisma.${model.name.toLowerCase()}.findMany()

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">${model.plural}</h1>
        <Link href="/admin/${model.path}/new" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 text-sm font-medium">
          Add New
        </Link>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">${model.titleField}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 font-medium text-gray-900">{item.${model.titleField}}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={\`px-2 inline-flex text-xs leading-5 font-semibold rounded-full \${item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}\`}>
                    {item.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <Link href={\`/admin/${model.path}/\${item.id}/edit\`} className="text-blue-600 hover:text-blue-900">Edit</Link>
                  {item.isActive && (
                    <form action={deactivate${model.name}.bind(null, item.id)} className="inline">
                      <button type="submit" className="text-orange-600 hover:text-orange-900">Deactivate</button>
                    </form>
                  )}
                  <form action={delete${model.name}.bind(null, item.id)} className="inline">
                    <button type="submit" className="text-red-600 hover:text-red-900" onClick={(e) => { if(!confirm('Are you sure?')) e.preventDefault() }}>Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <div className="p-8 text-center text-gray-500">No items found.</div>}
      </div>
    </div>
  )
}
`
  fs.writeFileSync(path.join(dir, 'page.tsx'), listPage)

  // 4. Generate New Page
  const newPage = `import { getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { ${model.name}Form } from '@/components/admin/${model.name.toLowerCase()}-form'

export default async function New${model.name}Page() {
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Add New ${model.name}</h1>
      <${model.name}Form />
    </div>
  )
}
`
  fs.writeFileSync(path.join(dir, 'new', 'page.tsx'), newPage)

  // 5. Generate Edit Page
  const editPage = `import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import { ${model.name}Form } from '@/components/admin/${model.name.toLowerCase()}-form'

export default async function Edit${model.name}Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  const item = await prisma.${model.name.toLowerCase()}.findUnique({ where: { id: resolvedParams.id } })
  if (!item) notFound()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit ${model.name}</h1>
      <${model.name}Form item={item} />
    </div>
  )
}
`
  fs.writeFileSync(path.join(dir, '[id]', 'edit', 'page.tsx'), editPage)
}

console.log('CRUD generation complete.')
