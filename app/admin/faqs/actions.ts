'use server'
import { requireAdmin } from '@/lib/admin-auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const Schema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  sortOrder: z.number().int().default(0),
  isGlobal: z.boolean(),
})

export async function createFaq(formData: FormData) {
  await requireAdmin()
  const data = {
    question: formData.get('question') as string,
    answer: formData.get('answer') as string,
    sortOrder: parseInt((formData.get('sortOrder') as string) || '0'),
    isGlobal: formData.get('isGlobal') === 'on',
  }
  const parsed = Schema.parse(data)
  await prisma.fAQ.create({ data: parsed })
  revalidatePath('/admin/faqs')
  redirect('/admin/faqs')
}

export async function updateFaq(id: string, formData: FormData) {
  await requireAdmin()
  const data = {
    question: formData.get('question') as string,
    answer: formData.get('answer') as string,
    sortOrder: parseInt((formData.get('sortOrder') as string) || '0'),
    isGlobal: formData.get('isGlobal') === 'on',
  }
  const parsed = Schema.parse(data)
  await prisma.fAQ.update({ where: { id }, data: parsed })
  revalidatePath('/admin/faqs')
  redirect('/admin/faqs')
}

export async function deleteFaq(id: string) {
  await requireAdmin()
  await prisma.fAQ.delete({ where: { id } })
  revalidatePath('/admin/faqs')
}

