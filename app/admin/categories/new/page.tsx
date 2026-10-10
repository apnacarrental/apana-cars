import { getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { CategoryForm } from '@/components/admin/category-form'

export default async function NewCategoryPage() {
  const session = await getAuthSession()
  if (!session) redirect('/admin/login')

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Add New Category</h1>
      <CategoryForm />
    </div>
  )
}

