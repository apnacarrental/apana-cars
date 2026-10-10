'use server'

import prisma from '@/lib/prisma'
import { requireAdmin } from '@/lib/admin-auth'
import { revalidatePath } from 'next/cache'
import { sendLeadEmail } from '@/lib/communications/email'
import { sendLeadWhatsApp, normalizePhoneNumber } from '@/lib/communications/whatsapp'
import { CommunicationDirection } from '@prisma/client'

export async function sendEmailAction(leadId: string, formData: FormData) {
  await requireAdmin()
  
  const lead = await prisma.lead.findUnique({ where: { id: leadId } })
  if (!lead || !lead.email) throw new Error('Lead or lead email not found')

  const subject = formData.get('subject') as string
  const message = formData.get('message') as string

  if (!subject || !message) throw new Error('Subject and message are required')
  if (message.length > 5000) throw new Error('Message too long')

  const result = await sendLeadEmail(lead.email, subject, message)

  await prisma.leadCommunication.create({
    data: {
      leadId,
      channel: 'EMAIL',
      direction: CommunicationDirection.OUTBOUND,
      status: result.status,
      recipient: lead.email,
      subject,
      message,
      provider: result.provider,
      providerMessageId: result.providerMessageId,
      errorMessage: result.errorMessage
    }
  })

  revalidatePath('/admin/leads')
}

export async function sendWhatsAppAction(leadId: string, formData: FormData) {
  await requireAdmin()
  
  const lead = await prisma.lead.findUnique({ where: { id: leadId } })
  if (!lead || !lead.phone) throw new Error('Lead or lead phone not found')

  const message = formData.get('message') as string

  if (!message) throw new Error('Message is required')
  if (message.length > 5000) throw new Error('Message too long')

  const normalizedPhone = normalizePhoneNumber(lead.phone)
  const result = await sendLeadWhatsApp(normalizedPhone, message)

  await prisma.leadCommunication.create({
    data: {
      leadId,
      channel: 'WHATSAPP',
      direction: CommunicationDirection.OUTBOUND,
      status: result.status,
      recipient: normalizedPhone,
      message,
      provider: result.provider,
      providerMessageId: result.providerMessageId,
      errorMessage: result.errorMessage
    }
  })

  revalidatePath('/admin/leads')
}