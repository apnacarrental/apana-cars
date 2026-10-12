'use server'
import { requireAdmin } from '@/lib/admin-auth'
import { fetchBackendApi } from '@/lib/backend-api'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const Schema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
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

export async function createBrand(formData: FormData): Promise<ActionResponse> {
  await requireAdmin()
  const data = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
  }
  
  const parsed = Schema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }
  
  const res = await fetchBackendApi('/api/v1/admin/brands', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed.data),
  })
  
  const errorObj = await handleApiError(res)
  if (errorObj) return errorObj;

  revalidatePath('/admin/brands')
  redirect('/admin/brands')
}

export async function updateBrand(id: string, formData: FormData): Promise<ActionResponse> {
  await requireAdmin()
  const data = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
  }
  
  const parsed = Schema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }
  
  const res = await fetchBackendApi(`/api/v1/admin/brands/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed.data),
  })

  const errorObj = await handleApiError(res)
  if (errorObj) return errorObj;

  revalidatePath('/admin/brands')
  redirect('/admin/brands')
}

export async function deleteBrand(id: string): Promise<ActionResponse> {
  await requireAdmin()
  
  const res = await fetchBackendApi(`/api/v1/admin/brands/${id}`, {
    method: 'DELETE',
  })
  
  const errorObj = await handleApiError(res)
  if (errorObj) return errorObj;

  revalidatePath('/admin/brands')
  return undefined;
}

