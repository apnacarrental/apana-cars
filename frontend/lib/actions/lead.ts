'use server'

import { headers } from 'next/headers'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { checkRateLimit } from '@/lib/rate-limit'
import { sendLeadEmail } from '@/lib/communications/email'
import { CommunicationDirection } from '@prisma/client'

const LeadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone format (e.g., +919000000000)"),
  email: z.string().email("Invalid email").optional().or(z.literal('')),
  pickupLocation: z.string().uuid("Invalid location reference").optional().or(z.literal('')),
  dropLocation: z.string().uuid("Invalid location reference").optional().or(z.literal('')),
  pickupDatetime: z.string().optional().or(z.literal('')).refine(val => !val || !isNaN(Date.parse(val)), {
    message: "Invalid date format"
  }),
  service: z.string().uuid("Invalid service reference").optional().or(z.literal('')),
  vehicle: z.string().uuid("Invalid car reference").optional().or(z.literal('')),
  message: z.string().max(1000).optional(),
  _website: z.string().optional() // honeypot
})

export type ActionState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

export async function submitLead(prevState: ActionState, formData: FormData): Promise<ActionState> {
  try {
    // 1. IP Rate Limiting
    const headersList = await headers()
    const ip = headersList.get('x-forwarded-for') || '127.0.0.1'
    
    // Max 5 requests per 10 minutes (600,000 ms)
    if (!checkRateLimit(ip, 5, 600000)) {
      return { error: 'Too many requests. Please try again later.' }
    }

    // 2. Data Parsing & Sanitization
    let rawPhone = (formData.get('phone') as string || '').trim().replace(/[\s\-\(\)]/g, '')
    if (rawPhone.startsWith('0')) {
      rawPhone = '+91' + rawPhone.slice(1)
    } else if (!rawPhone.startsWith('+')) {
      if (rawPhone.length === 10) {
        rawPhone = '+91' + rawPhone
      } else {
        rawPhone = '+' + rawPhone
      }
    }

    const pickupCity = (formData.get('pickupCity') as string)?.trim()
    const dropCity = (formData.get('dropCity') as string)?.trim()
    const passengers = (formData.get('passengers') as string)?.trim()
    const carType = (formData.get('carType') as string)?.trim()
    const userMessage = (formData.get('message') as string)?.trim()

    const details: string[] = []
    if (pickupCity) details.push(`Pickup: ${pickupCity}`)
    if (dropCity) details.push(`Drop: ${dropCity}`)
    if (passengers) details.push(`Passengers: ${passengers}`)
    if (carType) details.push(`Vehicle: ${carType}`)
    if (userMessage) details.push(`Notes: ${userMessage}`)

    const compositeMessage = details.length > 0 ? details.join('\n') : null

    const data = {
      name: (formData.get('name') as string)?.trim() || 'Direct Inquiry',
      phone: rawPhone,
      email: (formData.get('email') as string) || '',
      pickupLocation: (formData.get('pickupLocation') as string) || '',
      dropLocation: (formData.get('dropLocation') as string) || '',
      pickupDatetime: (formData.get('pickupDatetime') as string) || '',
      service: (formData.get('service') as string) || '',
      vehicle: (formData.get('vehicle') as string) || '',
      message: compositeMessage || userMessage || undefined,
      _website: (formData.get('_website') as string) || undefined
    }

    // 3. Honeypot check
    if (data._website) {
      // Silently discard
      return { success: true }
    }

    // 4. Zod Validation
    const parsed = LeadSchema.safeParse(data)
    if (!parsed.success) {
      return { 
        error: 'Please check your input and try again.', 
        fieldErrors: parsed.error.flatten().fieldErrors 
      }
    }

    const validData = parsed.data

    // 5. Database Reference Verification (UUIDs to Active Entities)
    if (validData.vehicle) {
      const car = await prisma.car.findFirst({ where: { id: validData.vehicle, isActive: true }})
      if (!car) return { error: 'The selected vehicle is invalid or inactive.' }
    }
    if (validData.service) {
      const service = await prisma.service.findFirst({ where: { id: validData.service, isActive: true }})
      if (!service) return { error: 'The selected service is invalid or inactive.' }
    }
    if (validData.pickupLocation) {
      const loc = await prisma.location.findFirst({ where: { id: validData.pickupLocation, isActive: true }})
      if (!loc) return { error: 'The selected pickup location is invalid or inactive.' }
    }
    if (validData.dropLocation) {
      const loc = await prisma.location.findFirst({ where: { id: validData.dropLocation, isActive: true }})
      if (!loc) return { error: 'The selected drop-off location is invalid or inactive.' }
    }

    // 6. Duplicate Submission Protection (same phone within last 5 minutes)
    const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000)
    const recentDuplicate = await prisma.lead.findFirst({
      where: {
        phone: validData.phone,
        createdAt: { gte: fiveMinsAgo }
      }
    })

    if (recentDuplicate) {
      // Silently succeed to prevent double submissions but not reveal DB logic
      return { success: true }
    }

    // 7. Insert Lead
    // Convert empty strings to null for DB consistency
    const newLead = await prisma.lead.create({
      data: {
        name: validData.name,
        phone: validData.phone,
        email: validData.email || null,
        pickupLocation: validData.pickupLocation || null,
        dropLocation: validData.dropLocation || null,
        pickupDatetime: validData.pickupDatetime ? new Date(validData.pickupDatetime) : null,
        service: validData.service || null,
        vehicle: validData.vehicle || null,
        passengers: passengers || null,
        message: validData.message || null,
        status: 'NEW'
      }
    })

            // Trigger automatic notification but do not fail if it fails
    if (process.env.ADMIN_EMAIL) {
      sendLeadEmail(
        process.env.ADMIN_EMAIL, 
        `New Inquiry from ${validData.name}`, 
        `Name: ${validData.name}\nPhone: ${validData.phone}\nMessage: ${validData.message || 'No message'}`
      ).then(async (res) => {
        await prisma.leadCommunication.create({
          data: {
            leadId: newLead.id,
            channel: 'EMAIL',
            direction: CommunicationDirection.OUTBOUND,
            status: res.status,
            recipient: process.env.ADMIN_EMAIL!,
            subject: 'Automatic Admin Notification',
            message: 'System generated admin notification',
            provider: res.provider,
            providerMessageId: res.providerMessageId,
            errorMessage: res.errorMessage
          }
        })
      }).catch(console.error)
    }


    return { success: true }

  } catch (err) {
    // Suppress DB errors / stack traces
    console.error('Lead submission error:', err)
    return { error: 'An unexpected error occurred. Please try again later.' }
  }
}



