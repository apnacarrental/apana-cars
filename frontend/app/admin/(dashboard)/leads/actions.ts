'use server'

import { requireAdmin } from '@/lib/admin-auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { LeadStatus } from '@prisma/client'

const AdminLeadCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(6, 'Valid phone number required'),
  email: z.string().email().optional().nullable(),
  pickupLocation: z.string().optional().nullable(),
  dropLocation: z.string().optional().nullable(),
  passengers: z.string().optional().nullable(),
  status: z.nativeEnum(LeadStatus).default(LeadStatus.NEW),
  notes: z.string().optional().nullable()
})

const AdminLeadUpdateSchema = z.object({
  status: z.nativeEnum(LeadStatus),
  passengers: z.string().optional().nullable(),
  notes: z.string().optional().nullable()
})

export async function createLead(formData: FormData): Promise<{ success: false; error: string } | undefined> {
  await requireAdmin()

  const rawEmail = (formData.get('email') as string)?.trim()

  const data = {
    name: (formData.get('name') as string)?.trim() || '',
    phone: (formData.get('phone') as string)?.trim() || '',
    email: rawEmail && rawEmail.includes('@') ? rawEmail : null,
    pickupLocation: (formData.get('pickupLocation') as string)?.trim() || null,
    dropLocation: (formData.get('dropLocation') as string)?.trim() || null,
    passengers: (formData.get('passengers') as string)?.trim() || null,
    status: ((formData.get('status') as string)?.toUpperCase() as LeadStatus) || LeadStatus.NEW,
    notes: (formData.get('notes') as string)?.trim() || null,
  }

  const parsed = AdminLeadCreateSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
  }

  try {
    await prisma.lead.create({
      data: parsed.data
    })
  } catch (err: any) {
    console.error('Error creating lead:', err)
    return { success: false, error: err.message || 'Failed to create lead.' }
  }

  revalidatePath('/admin/leads')
  redirect('/admin/leads')
}

export async function updateLeadStatus(id: string, formData: FormData) {
  await requireAdmin()

  const rawPassengers = formData.get('passengers')

  const data = {
    status: formData.get('status') as LeadStatus,
    passengers: typeof rawPassengers === 'string' ? rawPassengers.trim() || null : undefined,
    notes: formData.get('notes') as string,
  }

  const parsed = AdminLeadUpdateSchema.parse(data)

  await prisma.lead.update({
    where: { id },
    data: {
      status: parsed.status,
      ...(parsed.passengers !== undefined ? { passengers: parsed.passengers } : {}),
      notes: parsed.notes || null,
    }
  })

  revalidatePath('/admin/leads')
  revalidatePath(`/admin/leads/${id}/edit`)
  redirect('/admin/leads')
}

export async function deleteLead(id: string) {
  await requireAdmin()
  
  await prisma.lead.delete({
    where: { id }
  })

  revalidatePath('/admin/leads')
}
