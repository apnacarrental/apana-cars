'use client'

import { useActionState } from 'react'
import { submitLead, ActionState } from '@/lib/actions/lead'
import { ArrowRight } from 'lucide-react'
import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

export function BookingForm() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(submitLead, {})

  useEffect(() => {
    if (state.success) {
      trackEvent({ action: 'generate_lead', category: 'lead', form_type: 'quick_booking' })
    }
  }, [state.success])

  if (state.success) {
    return (
      <div className="booking-card flex flex-col items-center justify-center text-center p-8">
        <h3 className="text-xl font-bold mb-2">Thank you!</h3>
        <p>Your inquiry has been received. We will contact you shortly.</p>
      </div>
    )
  }

  return (
    <form className="booking-card" action={formAction}>
      <div className="booking-heading">
        <p className="eyebrow">Quick Inquiry</p>
        <h2>Where to next?</h2>
      </div>

      {state.error && (
        <div className="text-red-600 text-sm mb-4 p-2 bg-red-50 rounded">
          {state.error}
        </div>
      )}

      {/* Honeypot */}
      <input type="text" name="_website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

      <label>
        Name *
        <input name="name" required placeholder="Your name" />
        {state.fieldErrors?.name && <span className="text-xs text-red-500">{state.fieldErrors.name[0]}</span>}
      </label>
      
      <label>
        Phone *
        <input type="tel" name="phone" required placeholder="+919000000000" />
        {state.fieldErrors?.phone && <span className="text-xs text-red-500">{state.fieldErrors.phone[0]}</span>}
      </label>

      <label>
        Pickup City/Location
        {/* We use a text input but we'd normally want to map this to an ID or leave it as a message note. 
            Since our schema allows string UUIDs, but this is a text input, we should probably pass it in message 
            if we don't have the UUID, or just use the contact page for full details.
            Wait, LeadSchema strictly requires UUIDs for pickupLocation/dropLocation if provided.
            So we should leave these as text and just append them to the 'message' field before validation, 
            or change the form to use selects.
            Let's keep it simple: just Name, Phone, and a message.
        */}
      </label>
      
      <label>
        Requirement
        <textarea name="message" rows={2} placeholder="E.g., Need an SUV for airport drop tomorrow." className="w-full mt-1 p-2 border rounded"></textarea>
      </label>

      <button className="button button-dark mt-4" type="submit" disabled={isPending}>
        {isPending ? 'Sending...' : 'Send Inquiry'} <ArrowRight size={16} />
      </button>
    </form>
  )
}

