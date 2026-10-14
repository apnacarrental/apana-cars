'use server'

import { requireAdmin } from '@/lib/admin-auth'
import prisma from '@/lib/prisma'
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Transmission, FuelType } from '@prisma/client'

const CarSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  brandId: z.string().uuid('Invalid Brand ID'),
  shortDescription: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
  seats: z.number().int().min(1, 'At least 1 seat required').default(4),
  luggage: z.number().int().min(0, 'Luggage cannot be negative').default(2),
  transmission: z.nativeEnum(Transmission).default(Transmission.AUTOMATIC),
  fuelType: z.nativeEnum(FuelType).default(FuelType.PETROL),
  pricePerDay: z.number().min(0, 'Price per day must be non-negative').default(1000),
  petrolPricePerKm: z.number().min(0, 'Price must be non-negative').optional().nullable(),
  dieselPricePerKm: z.number().min(0, 'Price must be non-negative').optional().nullable(),
  electricPricePerKm: z.number().min(0, 'Price must be non-negative').optional().nullable(),
  hybridPricePerKm: z.number().min(0, 'Price must be non-negative').optional().nullable(),
  isActive: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
})

export type ActionResponse = { success: false; error: string } | undefined

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
  if (!val || typeof val !== 'string' || val.trim() === '') return null
  const num = parseFloat(val.trim())
  return isNaN(num) ? null : num
}

export async function createCar(formData: FormData): Promise<ActionResponse> {
  await requireAdmin()

  const rawName = (formData.get('name') as string)?.trim() || ''
  const rawSlug = (formData.get('slug') as string) || rawName
  const slug = slugify(rawSlug)

  const data = {
    name: rawName,
    slug,
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
    return { success: false, error: parsed.error.issues[0].message }
  }

  let newCar: any
  try {
    const existing = await prisma.car.findUnique({
      where: { slug: parsed.data.slug }
    })
    if (existing) {
      return { success: false, error: `A vehicle with slug "${parsed.data.slug}" already exists.` }
    }

    newCar = await prisma.car.create({
      data: parsed.data
    })
  } catch (err: any) {
    console.error('Error creating car:', err)
    return { success: false, error: err.message || 'Failed to create vehicle.' }
  }

  // Direct image upload support during car creation
  const imageFile = formData.get('carImage') as File | null
  if (newCar?.id && imageFile && imageFile.size > 0 && ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(imageFile.type)) {
    try {
      const arrayBuffer = await imageFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const uploadRes = await uploadToCloudinary(buffer, imageFile.type)

      const media = await prisma.media.create({
        data: {
          publicId: uploadRes.public_id,
          secureUrl: uploadRes.secure_url,
          altText: `${parsed.data.name} Car Photo`,
        }
      })

      await prisma.carImage.create({
        data: {
          carId: newCar.id,
          mediaId: media.id,
          sortOrder: 0
        }
      })
    } catch (uploadErr) {
      console.warn('Direct image upload warning during createCar:', uploadErr)
    }
  }

  revalidatePath('/fleet')
  revalidatePath(`/fleet/${parsed.data.slug}`)
  revalidatePath('/admin/cars')
  revalidatePath('/')
  redirect('/admin/cars')
}

export async function updateCar(id: string, formData: FormData): Promise<ActionResponse> {
  await requireAdmin()

  const rawName = (formData.get('name') as string)?.trim() || ''
  const rawSlug = (formData.get('slug') as string) || rawName
  const slug = slugify(rawSlug)

  const data = {
    name: rawName,
    slug,
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
    return { success: false, error: parsed.error.issues[0].message }
  }

  try {
    const existing = await prisma.car.findFirst({
      where: {
        slug: parsed.data.slug,
        NOT: { id }
      }
    })
    if (existing) {
      return { success: false, error: `Another vehicle with slug "${parsed.data.slug}" already exists.` }
    }

    const previous = await prisma.car.findUnique({ where: { id }, select: { slug: true } })

    await prisma.car.update({
      where: { id },
      data: parsed.data
    })

    if (previous?.slug && previous.slug !== parsed.data.slug) {
      revalidatePath(`/fleet/${previous.slug}`)
    }
  } catch (err: any) {
    console.error('Error updating car:', err)
    return { success: false, error: err.message || 'Failed to update vehicle.' }
  }

  revalidatePath('/fleet')
  revalidatePath(`/fleet/${parsed.data.slug}`)
  revalidatePath('/admin/cars')
  revalidatePath('/')
  redirect('/admin/cars')
}

export async function deactivateCar(id: string): Promise<ActionResponse> {
  await requireAdmin()

  try {
    const car = await prisma.car.update({
      where: { id },
      data: { isActive: false }
    })

    revalidatePath('/fleet')
    if (car?.slug) revalidatePath(`/fleet/${car.slug}`)
    revalidatePath('/admin/cars')
    revalidatePath('/')
    return undefined
  } catch (err: any) {
    console.error('Error deactivating car:', err)
    return { success: false, error: err.message || 'Failed to deactivate car.' }
  }
}

export async function deleteCar(id: string): Promise<ActionResponse> {
  await requireAdmin()

  try {
    // Remove car image relations first
    await prisma.carImage.deleteMany({
      where: { carId: id }
    })

    const car = await prisma.car.delete({
      where: { id }
    })

    revalidatePath('/fleet')
    if (car?.slug) revalidatePath(`/fleet/${car.slug}`)
    revalidatePath('/admin/cars')
    revalidatePath('/')
    return undefined
  } catch (err: any) {
    console.error('Error deleting car:', err)
    return { success: false, error: err.message || 'Failed to delete car.' }
  }
}

export async function attachMediaToCar(carId: string, mediaId: string): Promise<{ error?: string; success?: boolean }> {
  await requireAdmin()

  try {
    const existing = await prisma.carImage.findUnique({
      where: { carId_mediaId: { carId, mediaId } }
    })
    if (!existing) {
      await prisma.carImage.create({
        data: { carId, mediaId, sortOrder: 0 }
      })
    }

    const car = await prisma.car.findUnique({ where: { id: carId }, select: { slug: true } })
    revalidatePath('/fleet')
    if (car?.slug) revalidatePath(`/fleet/${car.slug}`)
    revalidatePath(`/admin/cars/${carId}/edit`)
    return { success: true }
  } catch (err: any) {
    console.error('Error attaching media:', err)
    return { error: err.message || 'Failed to attach image to vehicle' }
  }
}

export async function removeMediaFromCar(carId: string, mediaId: string): Promise<{ error?: string; success?: boolean }> {
  await requireAdmin()

  try {
    await prisma.carImage.deleteMany({
      where: { carId, mediaId }
    })

    const car = await prisma.car.findUnique({ where: { id: carId }, select: { slug: true } })
    revalidatePath('/fleet')
    if (car?.slug) revalidatePath(`/fleet/${car.slug}`)
    revalidatePath(`/admin/cars/${carId}/edit`)
    return { success: true }
  } catch (err: any) {
    console.error('Error removing media:', err)
    return { error: err.message || 'Failed to remove media from vehicle' }
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

    const media = await prisma.media.create({
      data: {
        publicId: uploadRes.public_id,
        secureUrl: uploadRes.secure_url,
        altText: altText || null,
      }
    })

    await prisma.carImage.create({
      data: { carId, mediaId: media.id, sortOrder: 0 }
    })

    const car = await prisma.car.findUnique({ where: { id: carId }, select: { slug: true } })
    revalidatePath('/fleet')
    if (car?.slug) revalidatePath(`/fleet/${car.slug}`)
    revalidatePath(`/admin/cars/${carId}/edit`)
    return { success: true }
  } catch (err: any) {
    console.error('Direct car image upload error:', err)
    return { error: err.message || 'Failed to upload and attach image' }
  }
}
