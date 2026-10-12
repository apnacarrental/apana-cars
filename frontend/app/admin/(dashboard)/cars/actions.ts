'use server'

import { requireAdmin } from '@/lib/admin-auth'
import { fetchBackendApi } from '@/lib/backend-api'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Transmission, FuelType } from '@prisma/client'

const CarSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  brandId: z.string().uuid("Invalid Brand ID"),
  shortDescription: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
  seats: z.number().int().min(1, "At least 1 seat required").default(4),
  luggage: z.number().int().min(0, "Luggage cannot be negative").default(2),
  transmission: z.nativeEnum(Transmission).default(Transmission.AUTOMATIC),
  fuelType: z.nativeEnum(FuelType).default(FuelType.PETROL),
  pricePerDay: z.number().min(0, "Price per day must be non-negative").default(1000),
  isActive: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
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

export async function createCar(formData: FormData): Promise<ActionResponse> {
  await requireAdmin()

  const data = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
    brandId: formData.get('brandId') as string,
    shortDescription: (formData.get('shortDescription') as string)?.trim() || null,
    content: (formData.get('description') as string)?.trim() || null,
    seats: parseInt((formData.get('seats') as string) || '4'),
    luggage: parseInt((formData.get('luggage') as string) || '2'),
    transmission: ((formData.get('transmission') as string)?.toUpperCase() as Transmission) || Transmission.AUTOMATIC,
    fuelType: ((formData.get('fuelType') as string)?.toUpperCase() as FuelType) || FuelType.PETROL,
    pricePerDay: parseFloat((formData.get('pricePerDay') as string) || '1000'),
    isActive: formData.get('isActive') === 'on',
    sortOrder: parseInt((formData.get('sortOrder') as string) || '0'),
  }

  const parsed = CarSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  let res: Response;
  try {
    res = await fetchBackendApi('/api/v1/admin/cars', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data),
    })
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error or backend unavailable' };
  }

  const errorObj = await handleApiError(res)
  if (errorObj) return errorObj;

  revalidatePath('/fleet')
  revalidatePath('/admin/cars')
  redirect('/admin/cars')
}

export async function updateCar(id: string, formData: FormData): Promise<ActionResponse> {
  await requireAdmin()

  const data = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
    brandId: formData.get('brandId') as string,
    shortDescription: (formData.get('shortDescription') as string)?.trim() || null,
    content: (formData.get('description') as string)?.trim() || null,
    seats: parseInt((formData.get('seats') as string) || '4'),
    luggage: parseInt((formData.get('luggage') as string) || '2'),
    transmission: ((formData.get('transmission') as string)?.toUpperCase() as Transmission) || Transmission.AUTOMATIC,
    fuelType: ((formData.get('fuelType') as string)?.toUpperCase() as FuelType) || FuelType.PETROL,
    pricePerDay: parseFloat((formData.get('pricePerDay') as string) || '1000'),
    isActive: formData.get('isActive') === 'on',
    sortOrder: parseInt((formData.get('sortOrder') as string) || '0'),
  }

  const parsed = CarSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  let res: Response;
  try {
    res = await fetchBackendApi(`/api/v1/admin/cars/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data),
    })
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error or backend unavailable' };
  }

  const errorObj = await handleApiError(res)
  if (errorObj) return errorObj;

  revalidatePath('/fleet')
  revalidatePath(`/fleet/${parsed.data.slug}`)
  revalidatePath('/admin/cars')
  redirect('/admin/cars')
}

export async function deactivateCar(id: string): Promise<ActionResponse> {
  await requireAdmin()

  let res: Response;
  try {
    res = await fetchBackendApi(`/api/v1/admin/cars/${id}/deactivate`, {
      method: 'PATCH',
    })
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error or backend unavailable' };
  }

  const errorObj = await handleApiError(res)
  if (errorObj) return errorObj;

  revalidatePath('/fleet')
  revalidatePath('/admin/cars')
  return undefined;
}

export async function deleteCar(id: string): Promise<ActionResponse> {
  await requireAdmin()

  let res: Response;
  try {
    res = await fetchBackendApi(`/api/v1/admin/cars/${id}`, {
      method: 'DELETE',
    })
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error or backend unavailable' };
  }

  const errorObj = await handleApiError(res)
  if (errorObj) return errorObj;

  revalidatePath('/fleet')
  revalidatePath('/admin/cars')
  return undefined;
}

export async function attachMediaToCar(carId: string, mediaId: string): Promise<{ error?: string; success?: boolean }> {
  await requireAdmin()

  try {
    const res = await fetchBackendApi(`/api/v1/admin/cars/${carId}/images`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mediaId, sortOrder: 0 }),
    })

    if (!res.ok) {
      let errorMsg = 'Failed to attach media';
      try {
        const data = await res.json();
        if (data.message) errorMsg = data.message;
        else if (data.error) errorMsg = data.error;
      } catch (e) {}
      return { error: errorMsg };
    }

    const data = await res.json();
    revalidatePath('/fleet')
    if (data.carSlug) revalidatePath(`/fleet/${data.carSlug}`)
    revalidatePath(`/admin/cars/${carId}/edit`)
    return { success: true }
  } catch (err: any) {
    return { error: err.message || 'Network error or backend unavailable' }
  }
}

export async function removeMediaFromCar(carId: string, mediaId: string): Promise<{ error?: string; success?: boolean }> {
  await requireAdmin()

  try {
    const res = await fetchBackendApi(`/api/v1/admin/cars/${carId}/images/${mediaId}`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      let errorMsg = 'Failed to remove media';
      try {
        const data = await res.json();
        if (data.message) errorMsg = data.message;
        else if (data.error) errorMsg = data.error;
      } catch (e) {}
      return { error: errorMsg };
    }

    const data = await res.json().catch(() => ({}));
    revalidatePath('/fleet')
    if (data?.carSlug) revalidatePath(`/fleet/${data.carSlug}`)
    revalidatePath(`/admin/cars/${carId}/edit`)
    return { success: true }
  } catch (err: any) {
    return { error: err.message || 'Network error or backend unavailable' }
  }
}
