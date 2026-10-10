'use client'

import { useTransition } from 'react'
import { createBlog, updateBlog } from '@/app/admin/blogs/actions'
import Link from 'next/link'
import { RichTextEditor } from '@/components/admin/rich-text-editor'

export function BlogForm({ blog, categories }: { blog?: any, categories: any[] }) {
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(() => {
      if (blog) {
        updateBlog(blog.id, formData)
      } else {
        createBlog(formData)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" name="title" id="title" defaultValue={blog?.title} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug</label>
          <input type="text" name="slug" id="slug" defaultValue={blog?.slug} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select name="status" id="status" defaultValue={blog?.status || 'DRAFT'} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>

        <div>
          <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Category</label>
          <select name="categoryId" id="categoryId" defaultValue={blog?.categoryId || ''} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
            <option value="">No Category</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">Excerpt</label>
          <textarea name="excerpt" id="excerpt" defaultValue={blog?.excerpt} rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <RichTextEditor name="content" value={blog?.content || ''} />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <Link href="/admin/blogs" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
          Cancel
        </Link>
        <button type="submit" disabled={isPending} className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-900 disabled:opacity-50">
          {isPending ? 'Saving...' : 'Save Post'}
        </button>
      </div>
    </form>
  )
}
