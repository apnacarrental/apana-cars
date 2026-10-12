'use server'
import { requireAdmin } from '@/lib/admin-auth'
import { fetchBackendApi } from '@/lib/backend-api'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const Schema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  type: z.enum(['CITY', 'AIRPORT', 'NEIGHBORHOOD']),
  parentId: z.string().uuid().optional().nullable(),
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

export async function createLocation(formData: FormData): Promise<ActionResponse> {
  await requireAdmin()
  const data = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
    type: formData.get('type') as string,
    parentId: formData.get('parentId') ? (formData.get('parentId') as string) : null,
    isActive: formData.get('isActive') === 'on',
  }
  
  const parsed = Schema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }
  
  let res: Response;
  try {
    res = await fetchBackendApi('/api/v1/admin/locations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data),
    })
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error or backend unavailable' };
  }
  
  const errorObj = await handleApiError(res)
  if (errorObj) return errorObj;

  revalidatePath('/admin/locations')
  redirect('/admin/locations')
}

export async function updateLocation(id: string, formData: FormData): Promise<ActionResponse> {
  await requireAdmin()
  const data = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
    type: formData.get('type') as string,
    parentId: formData.get('parentId') ? (formData.get('parentId') as string) : null,
    isActive: formData.get('isActive') === 'on',
  }
  
  const parsed = Schema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }
  
  if (id === parsed.data.parentId) {
    return { success: false, error: 'A location cannot be its own parent.' };
  }

  let res: Response;
  try {
    res = await fetchBackendApi(`/api/v1/admin/locations/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data),
    })
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error or backend unavailable' };
  }

  const errorObj = await handleApiError(res)
  if (errorObj) return errorObj;

  revalidatePath('/admin/locations')
  redirect('/admin/locations')
}

export async function deactivateLocation(id: string): Promise<ActionResponse> {
  await requireAdmin()
  
  let res: Response;
  try {
    res = await fetchBackendApi(`/api/v1/admin/locations/${id}/deactivate`, {
      method: 'PATCH',
    })
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error or backend unavailable' };
  }
  
  const errorObj = await handleApiError(res)
  if (errorObj) return errorObj;

  revalidatePath('/admin/locations')
  return undefined;
}

export async function deleteLocation(id: string): Promise<ActionResponse> {
  await requireAdmin()
  
  let res: Response;
  try {
    res = await fetchBackendApi(`/api/v1/admin/locations/${id}`, {
      method: 'DELETE',
    })
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error or backend unavailable' };
  }
  
  const errorObj = await handleApiError(res)
  if (errorObj) return errorObj;

  revalidatePath('/admin/locations')
  return undefined;
}
