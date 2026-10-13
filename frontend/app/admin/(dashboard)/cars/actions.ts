'use server'

import { requireAdmin } from '@/lib/admin-auth'
import { fetchBackendApi } from '@/lib/backend-api'
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary'
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
  petrolPricePerKm: z.number().min(0, "Price must be non-negative").optional().nullable(),
  dieselPricePerKm: z.number().min(0, "Price must be non-negative").optional().nullable(),
  electricPricePerKm: z.number().min(0, "Price must be non-negative").optional().nullable(),
  hybridPricePerKm: z.number().min(0, "Price must be non-negative").optional().nullable(),
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

function parseOptionalFloat(val: FormDataEntryValue | null): number | null {
  if (!val || typeof val !== 'string' || val.trim() === '') return null;
  const num = parseFloat(val.trim());
  return isNaN(num) ? null : num;
}

export async function createCar(formData: FormData): Promise<ActionResponse> {
  await requireAdmin()

  const data = {
    name: formData.get('name') as string,
    slug: slugify((formData.get('slug') as string) || (formData.get('name') as string) || ''),
    brandId: formData.get('brandId') as string,
    shortDescription: (formData.get('shortDescription') as string)?.trim() || null,
    content: (formData.get('description') as string)?.trim() || null,
    seats: parseInt((formData.get('seats') as string) || '4'),
    luggage: parseInt((formData.get('luggage') as string) || '2'),
    transmission: ((formData.get('transmission') as string)?.toUpperCase() as Transmission) || Transmission.AUTOMATIC,
    fuelType: ((formData.get('fuelType') as string)?.toUpperCase() as FuelType) || FuelType.PETROL,
    pricePerDay: parseFloat((formData.get('pricePerDay') as string) || '1000'),
    petrolPricePerKm: parseOptionalFloat(formData.get('petrolPricePerKm')),
    dieselPricePerKm: parseOptionalFloat(formData.get('dieselPricePerKm')),
    electricPricePerKm: parseOptionalFloat(formData.get('electricPricePerKm')),
    hybridPricePerKm: parseOptionalFloat(formData.get('hybridPricePerKm')),
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

  const newCar = await res.json().catch(() => null)

  // Direct image upload support during car creation
  const imageFile = formData.get('carImage') as File | null
  if (newCar?.id && imageFile && imageFile.size > 0 && ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(imageFile.type)) {
    try {
      const arrayBuffer = await imageFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const uploadRes = await uploadToCloudinary(buffer, imageFile.type)

      const mediaRes = await fetchBackendApi('/api/v1/admin/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          publicId: uploadRes.public_id,
          secureUrl: uploadRes.secure_url,
          altText: `${parsed.data.name} Car Photo`,
        }),
      })

      if (mediaRes.ok) {
        const media = await mediaRes.json()
        await fetchBackendApi(`/api/v1/admin/cars/${newCar.id}/images`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mediaId: media.id, sortOrder: 0 }),
        })
      }
    } catch (uploadErr) {
      console.warn('Direct image upload warning during createCar:', uploadErr)
    }
  }

  revalidatePath('/fleet')
  revalidatePath('/admin/cars')
  redirect('/admin/cars')
}

export async function updateCar(id: string, formData: FormData): Promise<ActionResponse> {
  await requireAdmin()

  const data = {
    name: formData.get('name') as string,
    slug: slugify((formData.get('slug') as string) || (formData.get('name') as string) || ''),
    brandId: formData.get('brandId') as string,
    shortDescription: (formData.get('shortDescription') as string)?.trim() || null,
    content: (formData.get('description') as string)?.trim() || null,
    seats: parseInt((formData.get('seats') as string) || '4'),
    luggage: parseInt((formData.get('luggage') as string) || '2'),
    transmission: ((formData.get('transmission') as string)?.toUpperCase() as Transmission) || Transmission.AUTOMATIC,
    fuelType: ((formData.get('fuelType') as string)?.toUpperCase() as FuelType) || FuelType.PETROL,
    pricePerDay: parseFloat((formData.get('pricePerDay') as string) || '1000'),
    petrolPricePerKm: parseOptionalFloat(formData.get('petrolPricePerKm')),
    dieselPricePerKm: parseOptionalFloat(formData.get('dieselPricePerKm')),
    electricPricePerKm: parseOptionalFloat(formData.get('electricPricePerKm')),
    hybridPricePerKm: parseOptionalFloat(formData.get('hybridPricePerKm')),
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

export async function uploadAndAttachCarImage(carId: string, formData: FormData): Promise<{ error?: string; success?: boolean }> {
  await requireAdmin()

  const file = formData.get('file') as File
  const altText = (formData.get('altText') as string)?.trim() || ''

  if (!file || file.size === 0) {
    return { error: 'Please choose an image file to upload.' }
  }

  if (file.size > 5 * 1024 * 1024) {
    return { error: 'Image file size exceeds the 5MB limit.' }
  }

  if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
    return { error: 'Unsupported file format. Please upload JPG, PNG, WEBP, or GIF.' }
  }

  try {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const uploadRes = await uploadToCloudinary(buffer, file.type)

    const mediaRes = await fetchBackendApi('/api/v1/admin/media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        publicId: uploadRes.public_id,
        secureUrl: uploadRes.secure_url,
        altText: altText || null,
      }),
    })

    if (!mediaRes.ok) {
      await deleteFromCloudinary(uploadRes.public_id).catch(() => {})
      let errText = 'Failed to create media record';
      try {
        const d = await mediaRes.json();
        if (d.message) errText = d.message;
        else if (d.error) errText = d.error;
      } catch (e) {}
      return { error: errText };
    }

    const media = await mediaRes.json()

    const attachRes = await fetchBackendApi(`/api/v1/admin/cars/${carId}/images`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mediaId: media.id, sortOrder: 0 }),
    })

    if (!attachRes.ok) {
      let errText = 'Failed to link image to car';
      try {
        const d = await attachRes.json();
        if (d.message) errText = d.message;
        else if (d.error) errText = d.error;
      } catch (e) {}
      return { error: errText };
    }

    const data = await attachRes.json()
    revalidatePath('/fleet')
    if (data?.carSlug) revalidatePath(`/fleet/${data.carSlug}`)
    revalidatePath(`/admin/cars/${carId}/edit`)
    return { success: true }
  } catch (err: any) {
    console.error('Direct car image upload error:', err)
    return { error: err.message || 'Failed to upload and attach image' }
  }
}
