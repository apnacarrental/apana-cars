'use server'

import { requireAdmin } from '@/lib/admin-auth'
import { fetchBackendApi } from '@/lib/backend-api'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const Schema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
  sortOrder: z.number().int().default(0),
  isGlobal: z.boolean(),
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

export async function createFaq(formData: FormData): Promise<ActionResponse> {
  await requireAdmin()

  const data = {
    question: (formData.get('question') as string)?.trim(),
    answer: (formData.get('answer') as string)?.trim(),
    sortOrder: parseInt((formData.get('sortOrder') as string) || '0'),
    isGlobal: formData.get('isGlobal') === 'on',
  }

  const parsed = Schema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  let res: Response;
  try {
    res = await fetchBackendApi('/api/v1/admin/faqs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data),
    })
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error or backend unavailable' };
  }

  const errorObj = await handleApiError(res)
  if (errorObj) return errorObj;

  revalidatePath('/faq')
  revalidatePath('/admin/faqs')
  redirect('/admin/faqs')
}

export async function updateFaq(id: string, formData: FormData): Promise<ActionResponse> {
  await requireAdmin()

  const data = {
    question: (formData.get('question') as string)?.trim(),
    answer: (formData.get('answer') as string)?.trim(),
    sortOrder: parseInt((formData.get('sortOrder') as string) || '0'),
    isGlobal: formData.get('isGlobal') === 'on',
  }

  const parsed = Schema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  let res: Response;
  try {
    res = await fetchBackendApi(`/api/v1/admin/faqs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data),
    })
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error or backend unavailable' };
  }

  const errorObj = await handleApiError(res)
  if (errorObj) return errorObj;

  revalidatePath('/faq')
  revalidatePath('/admin/faqs')
  redirect('/admin/faqs')
}

export async function deleteFaq(id: string): Promise<ActionResponse> {
  await requireAdmin()

  let res: Response;
  try {
    res = await fetchBackendApi(`/api/v1/admin/faqs/${id}`, {
      method: 'DELETE',
    })
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error or backend unavailable' };
  }

  const errorObj = await handleApiError(res)
  if (errorObj) return errorObj;

  revalidatePath('/faq')
  revalidatePath('/admin/faqs')
  return undefined;
}
