'use server'

import { requireAdmin } from '@/lib/admin-auth'
import { fetchBackendApi } from '@/lib/backend-api'
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary'
import { revalidatePath } from 'next/cache'

export async function uploadMediaAction(formData: FormData) {
  await requireAdmin()

  const file = formData.get('file') as File
  const altText = formData.get('altText') as string

  if (!file || file.size === 0) {
    return { error: 'No file provided' }
  }

  // Validate size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    return { error: 'File size exceeds 5MB limit' }
  }

  // Validate type
  if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
    return { error: 'Unsupported file type. Use JPG, PNG, WEBP, or GIF' }
  }

  try {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Cloudinary
    const result = await uploadToCloudinary(buffer, file.type)

    // Persist media metadata via backend Express API
    let res: Response;
    try {
      res = await fetchBackendApi('/api/v1/admin/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          publicId: result.public_id,
          secureUrl: result.secure_url,
          altText: altText || null,
        }),
      })
    } catch (apiErr: any) {
      await deleteFromCloudinary(result.public_id).catch(() => {})
      return { error: apiErr.message || 'Failed to communicate with backend server' }
    }

    if (!res.ok) {
      await deleteFromCloudinary(result.public_id).catch(() => {})
      let errorMsg = `API Error: ${res.statusText}`
      try {
        const errorData = await res.json()
        if (errorData.message) errorMsg = errorData.message
        else if (errorData.error) errorMsg = errorData.error
      } catch (e) {}
      return { error: errorMsg }
    }

    const media = await res.json()
    revalidatePath('/admin/media')
    return { success: true, media }
  } catch (err: any) {
    console.error('Media upload error:', err)
    return { error: err.message || 'Failed to upload media' }
  }
}

export async function deleteMediaAction(id: string) {
  await requireAdmin()

  let res: Response;
  try {
    res = await fetchBackendApi(`/api/v1/admin/media/${id}`, {
      method: 'DELETE',
    })
  } catch (err: any) {
    console.error('Media deletion network error:', err)
    return { error: err.message || 'Failed to communicate with backend server' }
  }

  if (!res.ok) {
    let errorMsg = `API Error: ${res.statusText}`
    try {
      const errorData = await res.json()
      if (errorData.message) errorMsg = errorData.message
      else if (errorData.error) errorMsg = errorData.error
    } catch (e) {}
    return { error: errorMsg }
  }

  try {
    const data = await res.json()
    if (data.publicId && !data.publicId.startsWith('/')) {
      await deleteFromCloudinary(data.publicId).catch((e) => {
        console.warn('Failed to delete from Cloudinary after DB delete:', e)
      })
    }
  } catch (e) {
    // If response body parsing fails, deletion in DB already succeeded
  }

  revalidatePath('/admin/media')
  return { success: true }
}
