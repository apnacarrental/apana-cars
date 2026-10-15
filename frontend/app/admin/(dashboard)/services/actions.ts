'use server'

import { requireAdmin } from '@/lib/admin-auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const cleanNumber = (val: any) => {
  if (val === null || val === undefined || val === '') return null
  const num = parseFloat(String(val))
  return isNaN(num) ? null : num
}

const Schema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  shortDescription: z.string().optional().nullable(),
  startingPrice: z.number().nullable().optional(),
  priceUnit: z.string().optional().nullable(),
  sortOrder: z.number().int(),
  isActive: z.boolean(),
  showInQuickBar: z.boolean(),
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

export async function createService(formData: FormData): Promise<ActionResponse> {
  await requireAdmin()

  const rawTitle = (formData.get('title') as string)?.trim() || ''
  const rawSlug = (formData.get('slug') as string) || rawTitle
  const slug = slugify(rawSlug)

  const data = {
    title: rawTitle,
    slug,
    shortDescription: (formData.get('shortDescription') as string)?.trim() || null,
    startingPrice: cleanNumber(formData.get('startingPrice')),
    priceUnit: (formData.get('priceUnit') as string)?.trim() || null,
    sortOrder: parseInt((formData.get('sortOrder') as string) || '0'),
    isActive: formData.get('isActive') === 'on',
    showInQuickBar: formData.get('showInQuickBar') === 'on',
  }

  const parsed = Schema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
  }

  try {
    const existing = await prisma.service.findUnique({
      where: { slug: parsed.data.slug }
    })
    if (existing) {
      return { success: false, error: `A service with slug "${parsed.data.slug}" already exists.` }
    }

    await prisma.service.create({
      data: parsed.data
    })
  } catch (err: any) {
    console.error('Error creating service:', err)
    return { success: false, error: err.message || 'Failed to create service.' }
  }

  revalidatePath('/admin/services')
  revalidatePath('/services')
  revalidatePath(`/services/${parsed.data.slug}`)
  revalidatePath(`/${parsed.data.slug}`)
  revalidatePath('/', 'layout')
  revalidatePath('/')
  redirect('/admin/services')
}

export async function updateService(id: string, formData: FormData): Promise<ActionResponse> {
  await requireAdmin()

  const rawTitle = (formData.get('title') as string)?.trim() || ''
  const rawSlug = (formData.get('slug') as string) || rawTitle
  const slug = slugify(rawSlug)

  const data = {
    title: rawTitle,
    slug,
    shortDescription: (formData.get('shortDescription') as string)?.trim() || null,
    startingPrice: cleanNumber(formData.get('startingPrice')),
    priceUnit: (formData.get('priceUnit') as string)?.trim() || null,
    sortOrder: parseInt((formData.get('sortOrder') as string) || '0'),
    isActive: formData.get('isActive') === 'on',
    showInQuickBar: formData.get('showInQuickBar') === 'on',
  }

  const parsed = Schema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
  }

  try {
    const existing = await prisma.service.findFirst({
      where: {
        slug: parsed.data.slug,
        NOT: { id }
      }
    })
    if (existing) {
      return { success: false, error: `Another service with slug "${parsed.data.slug}" already exists.` }
    }

    const previous = await prisma.service.findUnique({ where: { id }, select: { slug: true } })

    await prisma.service.update({
      where: { id },
      data: parsed.data
    })

    if (previous?.slug && previous.slug !== parsed.data.slug) {
      revalidatePath(`/${previous.slug}`)
    }
  } catch (err: any) {
    console.error('Error updating service:', err)
    return { success: false, error: err.message || 'Failed to update service.' }
  }

  revalidatePath('/admin/services')
  revalidatePath(`/admin/services/${id}/edit`)
  revalidatePath('/services')
  revalidatePath(`/services/${parsed.data.slug}`)
  revalidatePath(`/${parsed.data.slug}`)
  revalidatePath('/', 'layout')
  revalidatePath('/')
  redirect('/admin/services')
}

export async function toggleServiceQuickBar(id: string, currentState: boolean): Promise<ActionResponse> {
  await requireAdmin()

  try {
    const updated = await prisma.service.update({
      where: { id },
      data: { showInQuickBar: !currentState }
    })

    revalidatePath('/admin/services')
    revalidatePath('/services')
    if (updated?.slug) {
      revalidatePath(`/services/${updated.slug}`)
      revalidatePath(`/${updated.slug}`)
    }
    revalidatePath('/', 'layout')
    revalidatePath('/')
    return undefined
  } catch (err: any) {
    console.error('Error toggling service quick bar status:', err)
    return { success: false, error: err.message || 'Failed to toggle quick bar status.' }
  }
}

export async function deactivateService(id: string): Promise<ActionResponse> {
  await requireAdmin()

  try {
    const srv = await prisma.service.update({
      where: { id },
      data: { isActive: false }
    })

    revalidatePath('/admin/services')
    revalidatePath('/services')
    if (srv?.slug) {
      revalidatePath(`/services/${srv.slug}`)
      revalidatePath(`/${srv.slug}`)
    }
    revalidatePath('/', 'layout')
    revalidatePath('/')
    return undefined
  } catch (err: any) {
    console.error('Error deactivating service:', err)
    return { success: false, error: err.message || 'Failed to deactivate service.' }
  }
}

export async function deleteService(id: string): Promise<ActionResponse> {
  await requireAdmin()

  try {
    const srv = await prisma.service.delete({
      where: { id }
    })

    revalidatePath('/admin/services')
    revalidatePath('/services')
    if (srv?.slug) {
      revalidatePath(`/services/${srv.slug}`)
      revalidatePath(`/${srv.slug}`)
    }
    revalidatePath('/', 'layout')
    revalidatePath('/')
    return undefined
  } catch (err: any) {
    console.error('Error deleting service:', err)
    return { success: false, error: err.message || 'Failed to delete service.' }
  }
}

export const DEFAULT_SERVICES = [
  {
    title: 'Airport Transfers',
    slug: 'airport-cabs',
    shortDescription: '24/7 punctual pickups and drops to Rajiv Gandhi International Airport (RGIA)',
    content: 'Reliable airport taxi service connecting Hyderabad city and RGIA with zero surge pricing and flight tracking.',
    startingPrice: 1499,
    priceUnit: 'onwards',
    isActive: true,
    showInQuickBar: true,
    sortOrder: 1,
    seoMetadata: {
      title: 'Airport Taxi Hyderabad | RGIA Airport Cabs',
      description: 'Book reliable airport cabs in Hyderabad starting at ₹1499 with zero surge and flight tracking.'
    }
  },
  {
    title: 'Hourly Rentals',
    slug: 'hourly-cabs',
    shortDescription: 'Flexible 4-hour, 8-hour, and 12-hour local packages for meetings and errands',
    content: 'Keep a car and driver at your disposal for business meetings, shopping sprees, and family functions.',
    startingPrice: 1800,
    priceUnit: '8 hrs / 80 km',
    isActive: true,
    showInQuickBar: true,
    sortOrder: 2,
    seoMetadata: {
      title: 'Hourly Car Rental Hyderabad | 4hr, 8hr, 12hr Packages',
      description: 'Rent a car with chauffeur by the hour in Hyderabad. Flexible packages for corporate and personal use.'
    }
  },
  {
    title: 'City Sightseeing',
    slug: 'sightseeing-cabs',
    shortDescription: "Curated day tours covering Hyderabad's top monuments and heritage spots",
    content: 'Visit Charminar, Golconda Fort, Birla Mandir, and Ramoji Film City in supreme comfort.',
    startingPrice: 2499,
    priceUnit: 'full day tour',
    isActive: true,
    showInQuickBar: true,
    sortOrder: 3,
    seoMetadata: {
      title: 'Hyderabad Sightseeing Cabs | Full Day City Tour Taxi',
      description: 'Explore the City of Pearls with professional tour chauffeurs. Transparent rates and customized itineraries.'
    }
  },
  {
    title: 'Outstation Travel',
    slug: 'outstation-cabs',
    shortDescription: 'One-way drops and roundtrips to Srisailam, Tirupati, Vijayawada, and Bangalore',
    content: 'Affordable per-kilometer outstation car rentals with experienced highway drivers.',
    startingPrice: 2999,
    priceUnit: 'round trip',
    isActive: true,
    showInQuickBar: true,
    sortOrder: 4,
    seoMetadata: {
      title: 'Outstation Cabs Hyderabad | Roundtrip & One Way Taxi',
      description: 'Book outstation cabs from Hyderabad at competitive per km rates. Verified chauffeurs and 24/7 customer support.'
    }
  },
  {
    title: 'Srisailam Pilgrimage Packages',
    slug: 'srisailam-cabs',
    shortDescription: 'Dedicated 1-day and 2-day darshan tours to Srisailam Mallikarjuna Temple',
    content: 'Comfortable temple tours through the scenic Nallamala forest ghat road with experienced hill drivers.',
    startingPrice: 4800,
    priceUnit: 'darshan roundtrip',
    isActive: true,
    showInQuickBar: true,
    sortOrder: 5,
    seoMetadata: {
      title: 'Hyderabad to Srisailam Cab Package | Darshan Car Hire',
      description: 'Book special Srisailam pilgrimage cabs from Hyderabad with doorstep pickup and verified chauffeurs.'
    }
  },
  {
    title: 'Force Urbania Rentals',
    slug: 'force-urbania-rent-in-hyderabad',
    shortDescription: 'Ultra-luxury 12 and 16 seater Force Urbania vans for corporate & family tours',
    content: 'Brand new Force Urbania vans with individual pushback seats, dual AC, and high-roof luxury.',
    startingPrice: 7500,
    priceUnit: 'per day',
    isActive: true,
    showInQuickBar: true,
    sortOrder: 6,
    seoMetadata: {
      title: 'Force Urbania on Rent in Hyderabad | 12 & 16 Seater Luxury Vans',
      description: 'Hire Force Urbania in Hyderabad for wedding guest transfers, corporate travel, and group tours.'
    }
  },
  {
    title: 'Wedding Car Service',
    slug: 'wedding-cars',
    shortDescription: 'Luxury fleet for wedding guest transfers, bride & groom entry, and family convoys',
    content: 'Premium cars and luxury vans for weddings in Hyderabad with punctual decorated vehicles and professional chauffeurs.',
    startingPrice: 4500,
    priceUnit: 'per day',
    isActive: true,
    showInQuickBar: true,
    sortOrder: 7,
    seoMetadata: {
      title: 'Wedding Car Rental Hyderabad | Luxury Wedding Cars',
      description: 'Hire luxury wedding cars and vans in Hyderabad for wedding ceremonies and guest transport.'
    }
  },
  {
    title: 'Corporate Travel',
    slug: 'corporate-travel',
    shortDescription: 'Reliable mobility for corporate delegations, client meetings, and daily staff transport',
    content: 'Executive transport solutions for corporate events, delegate pickups from RGIA, and dedicated employee commute.',
    startingPrice: 2200,
    priceUnit: 'per day',
    isActive: true,
    showInQuickBar: true,
    sortOrder: 8,
    seoMetadata: {
      title: 'Corporate Car Rental Hyderabad | Business Mobility Solutions',
      description: 'Corporate car rental and monthly cab hire for companies in Hitec City, Gachibowli, and Cyberabad.'
    }
  },
  {
    title: 'On-Demand Driver',
    slug: 'driver-service',
    shortDescription: 'Professional verified chauffeurs for your personal car on hourly or daily basis',
    content: 'Hire verified, police-background-checked personal drivers for city errands, night events, or long outstation drives in your own car.',
    startingPrice: 999,
    priceUnit: '8 hours',
    isActive: true,
    showInQuickBar: true,
    sortOrder: 9,
    seoMetadata: {
      title: 'Driver for Rent in Hyderabad | Hire Acting & On-Demand Drivers',
      description: 'Hire professional, verified drivers in Hyderabad for local and outstation trips in your own car.'
    }
  }
]

export async function syncDefaultServicesAction(): Promise<{ success: boolean; count: number }> {
  await requireAdmin()
  for (const s of DEFAULT_SERVICES) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {
        title: s.title,
        shortDescription: s.shortDescription,
        content: s.content,
        startingPrice: s.startingPrice,
        priceUnit: s.priceUnit,
        sortOrder: s.sortOrder,
        isActive: s.isActive,
        showInQuickBar: s.showInQuickBar,
        seoMetadata: s.seoMetadata,
      },
      create: s
    })
  }
  revalidatePath('/admin/services')
  revalidatePath('/services')
  revalidatePath('/')
  return { success: true, count: DEFAULT_SERVICES.length }
}

