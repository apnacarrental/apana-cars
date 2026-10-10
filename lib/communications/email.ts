import { CommunicationProvider, CommunicationStatus } from '@prisma/client'

export interface SendEmailResult {
  status: CommunicationStatus
  providerMessageId?: string
  errorMessage?: string
  provider: CommunicationProvider
}

export async function sendLeadEmail(recipient: string, subject: string, message: string): Promise<SendEmailResult> {
  const isConfigured = !!process.env.EMAIL_API_KEY && !!process.env.EMAIL_PROVIDER
  
  if (!isConfigured) {
    return {
      status: CommunicationStatus.FAILED,
      errorMessage: 'Email provider not configured',
      provider: CommunicationProvider.EMAIL,
    }
  }

  try {
    // Fake sending mechanism if configured (for future expansion)
    console.log(`[EMAIL] To: ${recipient} | Subject: ${subject}\n${message}`)
    return {
      status: CommunicationStatus.SENT,
      providerMessageId: `email_${Date.now()}`,
      provider: CommunicationProvider.EMAIL,
    }
  } catch (err: any) {
    return {
      status: CommunicationStatus.FAILED,
      errorMessage: err.message || 'Unknown email error',
      provider: CommunicationProvider.EMAIL,
    }
  }
}