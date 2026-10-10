'use server'

import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { sanitizeHtml } from '@/lib/sanitize'

const BlogSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']),
  categoryId: z.string().uuid().optional().nullable(),
})

import { requireAdmin } from '@/lib/admin-auth'

export async function createBlog(formData: FormData) {
  await requireAdmin()

  const data = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    excerpt: formData.get('excerpt') as string,
    content: formData.get('content') as string,
    status: formData.get('status') as any,
    categoryId: formData.get('categoryId') ? (formData.get('categoryId') as string) : null,
  }

  const parsed = BlogSchema.parse(data)

  if (parsed.content) {
    parsed.content = sanitizeHtml(parsed.content)
  }

  await prisma.blog.create({
    data: {
      ...parsed,
      publishedAt: parsed.status === 'PUBLISHED' ? new Date() : null,
    }
  })

  revalidatePath('/blog')
  revalidatePath('/admin/blogs')
  redirect('/admin/blogs')
}

export async function updateBlog(id: string, formData: FormData) {
  await requireAdmin()

  const data = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    excerpt: formData.get('excerpt') as string,
    content: formData.get('content') as string,
    status: formData.get('status') as any,
    categoryId: formData.get('categoryId') ? (formData.get('categoryId') as string) : null,
  }

  const parsed = BlogSchema.parse(data)
  
  if (parsed.content) {
    parsed.content = sanitizeHtml(parsed.content)
  }

  const existing = await prisma.blog.findUnique({ where: { id } })

  await prisma.blog.update({
    where: { id },
    data: {
      ...parsed,
      publishedAt: parsed.status === 'PUBLISHED' && existing?.status === 'DRAFT' ? new Date() : existing?.publishedAt,
    }
  })

  revalidatePath('/blog')
  revalidatePath(`/blog/${parsed.slug}`)
  revalidatePath('/admin/blogs')
  redirect('/admin/blogs')
}

export async function deleteBlog(id: string) {
  await requireAdmin()

  await prisma.blog.delete({
    where: { id },
  })

  revalidatePath('/blog')
  revalidatePath('/admin/blogs')
}


