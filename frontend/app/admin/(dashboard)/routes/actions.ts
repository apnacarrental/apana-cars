'use server'

import { requireAdmin } from '@/lib/admin-auth'
import { fetchBackendApi } from '@/lib/backend-api'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const Schema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  origin: z.string().min(1, "Origin is required"),
  destination: z.string().min(1, "Destination is required"),
  isActive: z.boolean(),
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

export async function createRoute(formData: FormData): Promise<ActionResponse> {
  await requireAdmin()

  const data = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    origin: formData.get('origin') as string,
    destination: formData.get('destination') as string,
    isActive: formData.get('isActive') === 'on',
  }

  const parsed = Schema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  if (parsed.data.origin.trim().toLowerCase() === parsed.data.destination.trim().toLowerCase()) {
    return { success: false, error: 'Origin and destination cannot be the same location.' };
  }

  let res: Response;
  try {
    res = await fetchBackendApi('/api/v1/admin/routes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data),
    })
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error or backend unavailable' };
  }

  const errorObj = await handleApiError(res)
  if (errorObj) return errorObj;

  revalidatePath('/routes')
  revalidatePath('/admin/routes')
  redirect('/admin/routes')
}

export async function updateRoute(id: string, formData: FormData): Promise<ActionResponse> {
  await requireAdmin()

  const data = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    origin: formData.get('origin') as string,
    destination: formData.get('destination') as string,
    isActive: formData.get('isActive') === 'on',
  }

  const parsed = Schema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  if (parsed.data.origin.trim().toLowerCase() === parsed.data.destination.trim().toLowerCase()) {
    return { success: false, error: 'Origin and destination cannot be the same location.' };
  }

  let res: Response;
  try {
    res = await fetchBackendApi(`/api/v1/admin/routes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data),
    })
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error or backend unavailable' };
  }

  const errorObj = await handleApiError(res)
  if (errorObj) return errorObj;

  revalidatePath('/routes')
  revalidatePath(`/routes/${parsed.data.slug}`)
  revalidatePath('/admin/routes')
  redirect('/admin/routes')
}

export async function deactivateRoute(id: string): Promise<ActionResponse> {
  await requireAdmin()

  let res: Response;
  try {
    res = await fetchBackendApi(`/api/v1/admin/routes/${id}/deactivate`, {
      method: 'PATCH',
    })
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error or backend unavailable' };
  }

  const errorObj = await handleApiError(res)
  if (errorObj) return errorObj;

  revalidatePath('/routes')
  revalidatePath('/admin/routes')
  return undefined;
}

export async function deleteRoute(id: string): Promise<ActionResponse> {
  await requireAdmin()

  let res: Response;
  try {
    res = await fetchBackendApi(`/api/v1/admin/routes/${id}`, {
      method: 'DELETE',
    })
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error or backend unavailable' };
  }

  const errorObj = await handleApiError(res)
  if (errorObj) return errorObj;

  revalidatePath('/routes')
  revalidatePath('/admin/routes')
  return undefined;
}
