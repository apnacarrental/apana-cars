'use server'

import { requireAdmin } from '@/lib/admin-auth'
import { fetchBackendApi } from '@/lib/backend-api'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { sanitizeHtml } from '@/lib/sanitize'

const BlogSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  excerpt: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  categoryId: z.string().uuid("Invalid categoryId format").optional().nullable(),
})

export type ActionResponse = { success: false; error: string } | undefined;

async function handleApiError(res: Response): Promise<ActionResponse> {
  if (!res.ok) {
    let errorMsg = `API Error: ${res.statusText}`;
    try {
      const data = await res.json();
      if (data.message) errorMsg = data.message;
      else if (data.error) errorMsg = data.error;
    } catch (e) {}
    return { success: false, error: errorMsg };
  }
  return undefined;
}

export async function createBlog(formData: FormData): Promise<ActionResponse> {
  await requireAdmin()

  const data = {
    title: (formData.get('title') as string)?.trim(),
    slug: (formData.get('slug') as string)?.trim(),
    excerpt: (formData.get('excerpt') as string)?.trim() || null,
    content: (formData.get('content') as string) || null,
    status: (formData.get('status') as any) || 'DRAFT',
    categoryId: formData.get('categoryId') ? (formData.get('categoryId') as string) : null,
  }

  const parsed = BlogSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const payload = { ...parsed.data };
  if (payload.content) {
    payload.content = sanitizeHtml(payload.content);
  }

  let res: Response;
  try {
    res = await fetchBackendApi('/api/v1/admin/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error or backend unavailable' };
  }

  const errorObj = await handleApiError(res)
  if (errorObj) return errorObj;

  revalidatePath('/blog')
  revalidatePath('/admin/blogs')
  redirect('/admin/blogs')
}

export async function updateBlog(id: string, formData: FormData): Promise<ActionResponse> {
  await requireAdmin()

  const data = {
    title: (formData.get('title') as string)?.trim(),
    slug: (formData.get('slug') as string)?.trim(),
    excerpt: (formData.get('excerpt') as string)?.trim() || null,
    content: (formData.get('content') as string) || null,
    status: (formData.get('status') as any) || 'DRAFT',
    categoryId: formData.get('categoryId') ? (formData.get('categoryId') as string) : null,
  }

  const parsed = BlogSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const payload = { ...parsed.data };
  if (payload.content) {
    payload.content = sanitizeHtml(payload.content);
  }

  let res: Response;
  try {
    res = await fetchBackendApi(`/api/v1/admin/blogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error or backend unavailable' };
  }

  const errorObj = await handleApiError(res)
  if (errorObj) return errorObj;

  revalidatePath('/blog')
  revalidatePath(`/blog/${parsed.data.slug}`)
  revalidatePath('/admin/blogs')
  redirect('/admin/blogs')
}

export async function deleteBlog(id: string): Promise<ActionResponse> {
  await requireAdmin()

  let res: Response;
  try {
    res = await fetchBackendApi(`/api/v1/admin/blogs/${id}`, {
      method: 'DELETE',
    })
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error or backend unavailable' };
  }

  const errorObj = await handleApiError(res)
  if (errorObj) return errorObj;

  revalidatePath('/blog')
  revalidatePath('/admin/blogs')
  return undefined;
}
