'use server'

import { requireAdmin } from '@/lib/admin-auth'
import prisma from '@/lib/prisma'
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

    // Save to Prisma
    const media = await prisma.media.create({
      data: {
        publicId: result.public_id,
        secureUrl: result.secure_url,
        altText: altText || null,
      }
    })

    revalidatePath('/admin/media')
    return { success: true, media }
  } catch (err: any) {
    console.error('Media upload error:', err)
    return { error: err.message || 'Failed to upload media' }
  }
}

export async function deleteMediaAction(id: string) {
  await requireAdmin()

  const media = await prisma.media.findUnique({ where: { id } })
  if (!media) return { error: 'Media not found' }

  try {
    // We do not delete local seeds automatically (they start with '/')
    if (!media.publicId.startsWith('/')) {
      await deleteFromCloudinary(media.publicId)
    }

    await prisma.media.delete({
      where: { id }
    })

    revalidatePath('/admin/media')
    return { success: true }
  } catch (err: any) {
    console.error('Media deletion error:', err)
    return { error: 'Failed to delete media. It might be in use.' } // Prisma throws if in use (Restrict constraint)
  }
}
