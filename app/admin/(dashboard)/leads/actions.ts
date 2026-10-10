'use server'

import { requireAdmin } from '@/lib/admin-auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const AdminLeadUpdateSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'CONVERTED', 'LOST']),
  notes: z.string().optional().nullable()
})

export async function updateLeadStatus(id: string, formData: FormData) {
  await requireAdmin()

  const data = {
    status: formData.get('status') as string,
    notes: formData.get('notes') as string,
  }

  const parsed = AdminLeadUpdateSchema.parse(data)

  await prisma.lead.update({
    where: { id },
    data: {
      status: parsed.status,
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
