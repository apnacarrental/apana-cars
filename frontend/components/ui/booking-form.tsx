'use client'

import { useActionState } from 'react'
import { submitLead, ActionState } from '@/lib/actions/lead'
import { ArrowRight, CheckCircle } from 'lucide-react'
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
      <div className="booking-card flex flex-col items-center justify-center text-center p-8 bg-white rounded-xl shadow-lg border border-green-100">
        <CheckCircle size={36} className="text-green-600 mb-2" />
        <h3 className="text-xl font-bold mb-1">Booking Inquiry Received!</h3>
        <p className="text-gray-600 text-sm">Thank you. Our team will call you back on WhatsApp / Phone shortly.</p>
        <p className="text-xs text-gray-400 mt-2">Immediate assistance: <a href="tel:+919988123444" className="underline font-semibold text-gray-700">099881 23444</a></p>
      </div>
    )
  }

  return (
    <form className="booking-card" action={formAction}>
      <div className="booking-heading" style={{ gridColumn: '1 / -1', marginBottom: '8px' }}>
        <p className="eyebrow" style={{ marginBottom: '6px' }}>Quick Booking</p>
        <h2 style={{ fontSize: '1.65rem', fontWeight: 600, letterSpacing: '-0.03em' }}>Where to next?</h2>
      </div>

      {state.error && (
        <div style={{ gridColumn: '1/-1' }} className="text-red-600 text-sm p-2 bg-red-50 rounded border border-red-200">
          {state.error}
        </div>
      )}

      {/* Honeypot */}
      <input type="text" name="_website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

      <label>
        Name *
        <input name="name" required placeholder="Your full name" autoComplete="name" />
        {state.fieldErrors?.name && <span className="text-xs text-red-500">{state.fieldErrors.name[0]}</span>}
      </label>
      
      <label>
        Phone / WhatsApp *
        <input type="tel" name="phone" required placeholder="XXXXX-XXXXX" autoComplete="tel" />
        {state.fieldErrors?.phone && <span className="text-xs text-red-500">{state.fieldErrors.phone[0]}</span>}
      </label>

      <label>
        Pickup Location
        <input name="pickupCity" placeholder="e.g. Hyderabad / Airport" />
      </label>

      <label>
        Vehicle / Trip
        <input name="carType" placeholder="e.g. Sedan, SUV, Outstation" />
      </label>

      <button 
        className="button button-dark" 
        type="submit" 
        disabled={isPending}
        style={{ whiteSpace: 'nowrap', minHeight: '50px', padding: '14px 26px', cursor: 'pointer' }}
      >
        {isPending ? 'Sending...' : 'Book Now'} <ArrowRight size={16} />
      </button>
    </form>
  )
}

