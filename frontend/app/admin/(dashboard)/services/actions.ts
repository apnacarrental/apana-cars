'use server'
import { requireAdmin } from '@/lib/admin-auth'
import { fetchBackendApi } from '@/lib/backend-api'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const Schema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  shortDescription: z.string().optional().nullable(),
  sortOrder: z.number().int(),
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

export async function createService(formData: FormData): Promise<ActionResponse> {
  await requireAdmin()
  const data = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    shortDescription: formData.get('shortDescription') ? (formData.get('shortDescription') as string) : null,
    sortOrder: parseInt((formData.get('sortOrder') as string) || '0'),
    isActive: formData.get('isActive') === 'on',
  }
  
  const parsed = Schema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }
  
  let res: Response;
  try {
    res = await fetchBackendApi('/api/v1/admin/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data),
    })
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error or backend unavailable' };
  }
  
  const errorObj = await handleApiError(res)
  if (errorObj) return errorObj;

  revalidatePath('/admin/services')
  redirect('/admin/services')
}

export async function updateService(id: string, formData: FormData): Promise<ActionResponse> {
  await requireAdmin()
  const data = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    shortDescription: formData.get('shortDescription') ? (formData.get('shortDescription') as string) : null,
    sortOrder: parseInt((formData.get('sortOrder') as string) || '0'),
    isActive: formData.get('isActive') === 'on',
  }
  
  const parsed = Schema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }
  
  let res: Response;
  try {
    res = await fetchBackendApi(`/api/v1/admin/services/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data),
    })
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error or backend unavailable' };
  }

  const errorObj = await handleApiError(res)
  if (errorObj) return errorObj;

  revalidatePath('/admin/services')
  redirect('/admin/services')
}

export async function deactivateService(id: string): Promise<ActionResponse> {
  await requireAdmin()
  
  let res: Response;
  try {
    res = await fetchBackendApi(`/api/v1/admin/services/${id}/deactivate`, {
      method: 'PATCH',
    })
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error or backend unavailable' };
  }
  
  const errorObj = await handleApiError(res)
  if (errorObj) return errorObj;

  revalidatePath('/admin/services')
  return undefined;
}

export async function deleteService(id: string): Promise<ActionResponse> {
  await requireAdmin()
  
  let res: Response;
  try {
    res = await fetchBackendApi(`/api/v1/admin/services/${id}`, {
      method: 'DELETE',
    })
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error or backend unavailable' };
  }
  
  const errorObj = await handleApiError(res)
  if (errorObj) return errorObj;

  revalidatePath('/admin/services')
  return undefined;
}
