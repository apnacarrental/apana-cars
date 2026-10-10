'use server'

import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/admin-auth'
import { Transmission, FuelType } from '@prisma/client'

const CarSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  shortcontent: z.string().optional(),
  content: z.string().optional(),
  isActive: z.boolean(),
  sortOrder: z.number().int(),
  brandId: z.string().uuid(),
  seats: z.number().int().min(1).default(4),
  luggage: z.number().int().min(0).default(2),
  doors: z.number().int().min(1).default(4),
  transmission: z.nativeEnum(Transmission).default(Transmission.AUTOMATIC),
  fuelType: z.nativeEnum(FuelType).default(FuelType.PETROL),
  pricePerDay: z.number().min(0).default(1000)
})

export async function createCar(formData: FormData) {
  await requireAdmin()

  const data = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
    shortDescription: formData.get('shortDescription') as string,
    content: formData.get('description') as string,
    isActive: formData.get('isActive') === 'on',
    sortOrder: parseInt((formData.get('sortOrder') as string) || '0'),
    brandId: formData.get('brandId') as string,
    seats: parseInt((formData.get('seats') as string) || '4'),
    luggage: parseInt((formData.get('luggage') as string) || '2'),
    doors: parseInt((formData.get('doors') as string) || '4'),
    transmission: ((formData.get('transmission') as string)?.toUpperCase() as Transmission) || Transmission.AUTOMATIC,
    fuelType: ((formData.get('fuelType') as string)?.toUpperCase() as FuelType) || FuelType.PETROL,
    pricePerDay: parseFloat((formData.get('pricePerDay') as string) || '1000')
  }

  const parsed = CarSchema.parse(data)

  await prisma.car.create({
    data: parsed
  })

  revalidatePath('/fleet')
  revalidatePath('/admin/cars')
  redirect('/admin/cars')
}

export async function updateCar(id: string, formData: FormData) {
  await requireAdmin()

  const data = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
    shortDescription: formData.get('shortDescription') as string,
    content: formData.get('description') as string,
    isActive: formData.get('isActive') === 'on',
    sortOrder: parseInt((formData.get('sortOrder') as string) || '0'),
    brandId: formData.get('brandId') as string,
    seats: parseInt((formData.get('seats') as string) || '4'),
    luggage: parseInt((formData.get('luggage') as string) || '2'),
    doors: parseInt((formData.get('doors') as string) || '4'),
    transmission: ((formData.get('transmission') as string)?.toUpperCase() as Transmission) || Transmission.AUTOMATIC,
    fuelType: ((formData.get('fuelType') as string)?.toUpperCase() as FuelType) || FuelType.PETROL,
    pricePerDay: parseFloat((formData.get('pricePerDay') as string) || '1000')
  }

  const parsed = CarSchema.parse(data)

  await prisma.car.update({
    where: { id },
    data: parsed
  })

  revalidatePath('/fleet')
  revalidatePath(`/fleet/${parsed.slug}`)
  revalidatePath('/admin/cars')
  redirect('/admin/cars')
}

export async function deactivateCar(id: string) {
  await requireAdmin()

  await prisma.car.update({
    where: { id },
    data: { isActive: false }
  })

  revalidatePath('/fleet')
  revalidatePath('/admin/cars')
}

export async function attachMediaToCar(carId: string, mediaId: string) {
  await requireAdmin()

  // Validate server-side that both exist
  const car = await prisma.car.findUnique({ where: { id: carId } })
  const media = await prisma.media.findUnique({ where: { id: mediaId } })

  if (!car || !media) {
    return { error: 'Invalid Car or Media ID' }
  }

  try {
    // Upsert to handle potential unique constraint conflicts gracefully
    await prisma.carImage.upsert({
      where: {
        carId_mediaId: {
          carId,
          mediaId
        }
      },
      update: {},
      create: {
        carId,
        mediaId,
        sortOrder: 0
      }
    })

    revalidatePath('/fleet')
    revalidatePath(`/fleet/${car.slug}`)
    revalidatePath(`/admin/cars/${carId}/edit`)
    return { success: true }
  } catch (err: any) {
    return { error: err.message || 'Failed to attach media' }
  }
}

export async function removeMediaFromCar(carId: string, mediaId: string) {
  await requireAdmin()

  try {
    await prisma.carImage.delete({
      where: {
        carId_mediaId: {
          carId,
          mediaId
        }
      }
    })
    const car = await prisma.car.findUnique({ where: { id: carId } })
    revalidatePath('/fleet')
    if (car) revalidatePath(`/fleet/${car.slug}`)
    revalidatePath(`/admin/cars/${carId}/edit`)
    return { success: true }
  } catch (err: any) {
    return { error: 'Failed to remove media' }
  }
}


