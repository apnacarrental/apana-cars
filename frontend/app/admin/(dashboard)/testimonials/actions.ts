'use server'

import { requireAdmin } from '@/lib/admin-auth'
import { fetchBackendApi } from '@/lib/backend-api'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const Schema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  review: z.string().min(1, "Review is required"),
  rating: z.number().int().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5").default(5),
  locationContext: z.string().optional().nullable(),
  sortOrder: z.number().int().default(0),
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

export async function createTestimonial(formData: FormData): Promise<ActionResponse> {
  await requireAdmin()

  const data = {
    customerName: (formData.get('customerName') as string)?.trim(),
    review: (formData.get('review') as string)?.trim(),
    locationContext: (formData.get('locationContext') as string)?.trim() || null,
    rating: parseInt((formData.get('rating') as string) || '5'),
    sortOrder: parseInt((formData.get('sortOrder') as string) || '0'),
    isActive: formData.get('isActive') === 'on',
  }

  const parsed = Schema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  let res: Response;
  try {
    res = await fetchBackendApi('/api/v1/admin/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data),
    })
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error or backend unavailable' };
  }

  const errorObj = await handleApiError(res)
  if (errorObj) return errorObj;

  revalidatePath('/admin/testimonials')
  redirect('/admin/testimonials')
}

export async function updateTestimonial(id: string, formData: FormData): Promise<ActionResponse> {
  await requireAdmin()

  const data = {
    customerName: (formData.get('customerName') as string)?.trim(),
    review: (formData.get('review') as string)?.trim(),
    locationContext: (formData.get('locationContext') as string)?.trim() || null,
    rating: parseInt((formData.get('rating') as string) || '5'),
    sortOrder: parseInt((formData.get('sortOrder') as string) || '0'),
    isActive: formData.get('isActive') === 'on',
  }

  const parsed = Schema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  let res: Response;
  try {
    res = await fetchBackendApi(`/api/v1/admin/testimonials/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data),
    })
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error or backend unavailable' };
  }

  const errorObj = await handleApiError(res)
  if (errorObj) return errorObj;

  revalidatePath('/admin/testimonials')
  redirect('/admin/testimonials')
}

export async function deactivateTestimonial(id: string): Promise<ActionResponse> {
  await requireAdmin()

  let res: Response;
  try {
    res = await fetchBackendApi(`/api/v1/admin/testimonials/${id}/deactivate`, {
      method: 'PATCH',
    })
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error or backend unavailable' };
  }

  const errorObj = await handleApiError(res)
  if (errorObj) return errorObj;

  revalidatePath('/admin/testimonials')
  return undefined;
}

export async function deleteTestimonial(id: string): Promise<ActionResponse> {
  await requireAdmin()

  let res: Response;
  try {
    res = await fetchBackendApi(`/api/v1/admin/testimonials/${id}`, {
      method: 'DELETE',
    })
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error or backend unavailable' };
  }

  const errorObj = await handleApiError(res)
  if (errorObj) return errorObj;

  revalidatePath('/admin/testimonials')
  return undefined;
}
