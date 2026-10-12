'use client'

import { useActionState } from 'react'
import { submitLead, ActionState } from '@/lib/actions/lead'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

export function InquiryForm({
  locations = [],
  services = [],
  cars = [],
  preselectedService = '',
  preselectedCar = ''
}: {
  locations?: { id: string, name: string }[],
  services?: { id: string, title: string }[],
  cars?: { id: string, name: string }[],
  preselectedService?: string,
  preselectedCar?: string
}) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(submitLead, {})

  useEffect(() => {
    if (state.success) {
      trackEvent({ action: 'generate_lead', category: 'lead', form_type: 'inquiry' })
    }
  }, [state.success])

  if (state.success) {
    return (
      <div className="bg-green-50 text-green-800 p-8 rounded-xl border border-green-200 flex flex-col items-center justify-center text-center space-y-4">
        <CheckCircle2 size={48} className="text-green-600" />
        <h3 className="text-2xl font-bold">Thank you!</h3>
        <p>Your inquiry has been received. We will contact you shortly.</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
      
      {state.error && (
        <div className="bg-red-50 text-red-800 p-4 rounded-md text-sm border border-red-200">
          {state.error}
        </div>
      )}

      {/* Honeypot */}
      <input type="text" name="_website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name *</label>
          <input type="text" name="name" id="name" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-black focus:border-black" />
          {state.fieldErrors?.name && <p className="mt-1 text-xs text-red-600">{state.fieldErrors.name[0]}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone *</label>
          <input type="tel" name="phone" id="phone" placeholder="+919000000000" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-black focus:border-black" />
          {state.fieldErrors?.phone && <p className="mt-1 text-xs text-red-600">{state.fieldErrors.phone[0]}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" name="email" id="email" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-black focus:border-black" />
        {state.fieldErrors?.email && <p className="mt-1 text-xs text-red-600">{state.fieldErrors.email[0]}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700">Pickup Location</label>
          <select name="pickupLocation" id="pickupLocation" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-black focus:border-black">
            <option value="">Select location...</option>
            {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="dropLocation" className="block text-sm font-medium text-gray-700">Drop-off Location</label>
          <select name="dropLocation" id="dropLocation" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-black focus:border-black">
            <option value="">Select location...</option>
            {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="pickupDatetime" className="block text-sm font-medium text-gray-700">Pickup Date & Time</label>
          <input type="datetime-local" name="pickupDatetime" id="pickupDatetime" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-black focus:border-black" />
        </div>
        <div>
          <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700">Interested In (Car)</label>
          <select name="vehicle" id="vehicle" defaultValue={preselectedCar} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-black focus:border-black">
            <option value="">Any vehicle</option>
            {cars.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service Type</label>
          <select name="service" id="service" defaultValue={preselectedService} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-black focus:border-black">
            <option value="">Select service...</option>
            {services.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Special Requirements</label>
        <textarea name="message" id="message" rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-black focus:border-black"></textarea>
      </div>

      <button 
        type="submit" 
        disabled={isPending}
        className="w-full flex justify-center items-center gap-2 rounded-md border border-transparent bg-black px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-75 disabled:cursor-not-allowed"
      >
        {isPending ? 'Submitting...' : 'Send Inquiry'}
        {!isPending && <ArrowRight size={18} />}
      </button>

    </form>
  )
}

