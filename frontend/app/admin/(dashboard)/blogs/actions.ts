'use server'

import { requireAdmin } from '@/lib/admin-auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { BlogStatus } from '@prisma/client'

const Schema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  excerpt: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
  status: z.nativeEnum(BlogStatus),
  categoryId: z.string().uuid().optional().nullable(),
  publishedAt: z.date().optional().nullable(),
})

export type ActionResponse = { success: false; error: string } | undefined

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

function parseOptionalId(val: FormDataEntryValue | null): string | null {
  if (!val || typeof val !== 'string' || val.trim() === '' || val === 'none') return null
  return val.trim()
}

export async function createBlog(formData: FormData): Promise<ActionResponse> {
  await requireAdmin()

  const rawTitle = (formData.get('title') as string)?.trim() || ''
  const rawSlug = (formData.get('slug') as string) || rawTitle
  const slug = slugify(rawSlug)

  const status = ((formData.get('status') as string)?.toUpperCase() as BlogStatus) || BlogStatus.DRAFT

  const data = {
    title: rawTitle,
    slug,
    excerpt: (formData.get('excerpt') as string)?.trim() || null,
    content: (formData.get('content') as string)?.trim() || null,
    status,
    categoryId: parseOptionalId(formData.get('categoryId')),
    publishedAt: status === BlogStatus.PUBLISHED ? new Date() : null,
  }

  const parsed = Schema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
  }

  try {
    const existing = await prisma.blog.findUnique({
      where: { slug: parsed.data.slug }
    })
    if (existing) {
      return { success: false, error: `A blog post with slug "${parsed.data.slug}" already exists.` }
    }

    await prisma.blog.create({
      data: parsed.data
    })
  } catch (err: any) {
    console.error('Error creating blog:', err)
    return { success: false, error: err.message || 'Failed to create blog post.' }
  }

  revalidatePath('/admin/blogs')
  revalidatePath('/blog')
  revalidatePath(`/blog/${parsed.data.slug}`)
  revalidatePath('/')
  redirect('/admin/blogs')
}

export async function updateBlog(id: string, formData: FormData): Promise<ActionResponse> {
  await requireAdmin()

  const rawTitle = (formData.get('title') as string)?.trim() || ''
  const rawSlug = (formData.get('slug') as string) || rawTitle
  const slug = slugify(rawSlug)

  const status = ((formData.get('status') as string)?.toUpperCase() as BlogStatus) || BlogStatus.DRAFT

  const data = {
    title: rawTitle,
    slug,
    excerpt: (formData.get('excerpt') as string)?.trim() || null,
    content: (formData.get('content') as string)?.trim() || null,
    status,
    categoryId: parseOptionalId(formData.get('categoryId')),
    publishedAt: status === BlogStatus.PUBLISHED ? new Date() : null,
  }

  const parsed = Schema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
  }

  try {
    const existing = await prisma.blog.findFirst({
      where: {
        slug: parsed.data.slug,
        NOT: { id }
      }
    })
    if (existing) {
      return { success: false, error: `Another blog post with slug "${parsed.data.slug}" already exists.` }
    }

    const previous = await prisma.blog.findUnique({ where: { id }, select: { slug: true } })

    await prisma.blog.update({
      where: { id },
      data: parsed.data
    })

    if (previous?.slug && previous.slug !== parsed.data.slug) {
      revalidatePath(`/blog/${previous.slug}`)
    }
  } catch (err: any) {
    console.error('Error updating blog:', err)
    return { success: false, error: err.message || 'Failed to update blog post.' }
  }

  revalidatePath('/admin/blogs')
  revalidatePath(`/admin/blogs/${id}/edit`)
  revalidatePath('/blog')
  revalidatePath(`/blog/${parsed.data.slug}`)
  revalidatePath('/')
  redirect('/admin/blogs')
}

export async function deleteBlog(id: string): Promise<ActionResponse> {
  await requireAdmin()

  try {
    const b = await prisma.blog.delete({
      where: { id }
    })

    revalidatePath('/admin/blogs')
    revalidatePath('/blog')
    if (b?.slug) revalidatePath(`/blog/${b.slug}`)
    revalidatePath('/')
    return undefined
  } catch (err: any) {
    console.error('Error deleting blog:', err)
    return { success: false, error: err.message || 'Failed to delete blog post.' }
  }
}
