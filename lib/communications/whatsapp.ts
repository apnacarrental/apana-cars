import { CommunicationProvider, CommunicationStatus } from '@prisma/client'

export interface SendWhatsAppResult {
  status: CommunicationStatus
  providerMessageId?: string
  errorMessage?: string
  provider: CommunicationProvider
}

export async function sendLeadWhatsApp(recipient: string, message: string): Promise<SendWhatsAppResult> {
  const isConfigured = !!process.env.WHATSAPP_API_KEY && !!process.env.WHATSAPP_PROVIDER
  
  if (!isConfigured) {
    return {
      status: CommunicationStatus.FAILED,
      errorMessage: 'WhatsApp provider not configured',
      provider: CommunicationProvider.WHATSAPP,
    }
  }

  try {
    // Fake sending mechanism if configured (for future expansion)
    console.log(`[WHATSAPP] To: ${recipient}\n${message}`)
    return {
      status: CommunicationStatus.SENT,
      providerMessageId: `wa_${Date.now()}`,
      provider: CommunicationProvider.WHATSAPP,
    }
  } catch (err: any) {
    return {
      status: CommunicationStatus.FAILED,
      errorMessage: err.message || 'Unknown whatsapp error',
      provider: CommunicationProvider.WHATSAPP,
    }
  }
}

// Simple normalizer: keep only digits, ensure 91 prefix for India if missing
export function normalizePhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) return `91${digits}`
  if (digits.startsWith('0') && digits.length === 11) return `91${digits.substring(1)}`
  return digits
}