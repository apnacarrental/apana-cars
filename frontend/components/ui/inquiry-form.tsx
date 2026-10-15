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
      <div className="bg-emerald-50 text-emerald-900 p-8 rounded-2xl border border-emerald-200 flex flex-col items-center justify-center text-center space-y-3">
        <CheckCircle2 size={44} className="text-emerald-600" />
        <h3 className="text-xl font-bold tracking-tight">Inquiry Received!</h3>
        <p className="text-xs sm:text-sm text-emerald-800 max-w-sm">
          Thank you. Our Hyderabad operations desk will contact you via WhatsApp / phone shortly.
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-[var(--line)] space-y-5">
      
      {state.error && (
        <div className="bg-red-50 text-red-800 p-3.5 rounded-xl text-xs border border-red-200">
          {state.error}
        </div>
      )}

      {/* Honeypot */}
      <input type="text" name="_website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
            Full Name *
          </label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            required 
            placeholder="Your name"
            className="block w-full rounded-xl border border-[var(--line)] bg-[var(--paper-subtle)] px-3.5 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:bg-white focus:border-neutral-900 focus:outline-none transition-colors" 
          />
          {state.fieldErrors?.name && <p className="mt-1 text-xs text-red-600">{state.fieldErrors.name[0]}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
            Mobile / WhatsApp *
          </label>
          <input 
            type="tel" 
            name="phone" 
            id="phone" 
            placeholder="099881 23444" 
            required 
            className="block w-full rounded-xl border border-[var(--line)] bg-[var(--paper-subtle)] px-3.5 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:bg-white focus:border-neutral-900 focus:outline-none transition-colors" 
          />
          {state.fieldErrors?.phone && <p className="mt-1 text-xs text-red-600">{state.fieldErrors.phone[0]}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
          Email (Optional)
        </label>
        <input 
          type="email" 
          name="email" 
          id="email" 
          placeholder="your.email@example.com"
          className="block w-full rounded-xl border border-[var(--line)] bg-[var(--paper-subtle)] px-3.5 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:bg-white focus:border-neutral-900 focus:outline-none transition-colors" 
        />
        {state.fieldErrors?.email && <p className="mt-1 text-xs text-red-600">{state.fieldErrors.email[0]}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="pickupLocation" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
            Pickup City / Hub
          </label>
          <select 
            name="pickupLocation" 
            id="pickupLocation" 
            className="block w-full rounded-xl border border-[var(--line)] bg-[var(--paper-subtle)] px-3.5 py-2.5 text-sm text-neutral-900 focus:bg-white focus:border-neutral-900 focus:outline-none transition-colors"
          >
            <option value="">Select location...</option>
            {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="dropLocation" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
            Drop-off Destination
          </label>
          <select 
            name="dropLocation" 
            id="dropLocation" 
            className="block w-full rounded-xl border border-[var(--line)] bg-[var(--paper-subtle)] px-3.5 py-2.5 text-sm text-neutral-900 focus:bg-white focus:border-neutral-900 focus:outline-none transition-colors"
          >
            <option value="">Select destination...</option>
            {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="pickupDatetime" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
            Pickup Date &amp; Time
          </label>
          <input 
            type="datetime-local" 
            name="pickupDatetime" 
            id="pickupDatetime" 
            className="block w-full rounded-xl border border-[var(--line)] bg-[var(--paper-subtle)] px-3.5 py-2.5 text-sm text-neutral-900 focus:bg-white focus:border-neutral-900 focus:outline-none transition-colors" 
          />
        </div>
        <div>
          <label htmlFor="passengers" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
            No. of Passengers
          </label>
          {preselectedCar && <input type="hidden" name="vehicle" value={preselectedCar} />}
          <select 
            name="passengers" 
            id="passengers" 
            className="block w-full rounded-xl border border-[var(--line)] bg-[var(--paper-subtle)] px-3.5 py-2.5 text-sm text-neutral-900 focus:bg-white focus:border-neutral-900 focus:outline-none transition-colors"
          >
            <option value="1-4 Passengers (Executive Sedan)">1-4 Passengers (Executive Sedan)</option>
            <option value="5-6 Passengers (Family MUV / Ertiga)">5-6 Passengers (Family MUV / Ertiga)</option>
            <option value="7 Passengers (Luxury SUV / Innova Crysta)">7 Passengers (Luxury SUV / Innova Crysta)</option>
            <option value="8-12 Passengers (Force Urbania / Minivan)">8-12 Passengers (Force Urbania / Minivan)</option>
            <option value="13-17 Passengers (Tempo Traveller / Van)">13-17 Passengers (Tempo Traveller / Van)</option>
            <option value="18+ Passengers (Group Bus / Coach)">18+ Passengers (Group Bus / Coach)</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="service" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
          Service Category
        </label>
        <select 
          name="service" 
          id="service" 
          defaultValue={preselectedService} 
          className="block w-full rounded-xl border border-[var(--line)] bg-[var(--paper-subtle)] px-3.5 py-2.5 text-sm text-neutral-900 focus:bg-white focus:border-neutral-900 focus:outline-none transition-colors"
        >
          <option value="">Select service...</option>
          {services.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
          Special Requirements / Route Notes
        </label>
        <textarea 
          name="message" 
          id="message" 
          rows={3} 
          placeholder="e.g. Flight number, extra luggage space, child seat request..."
          className="block w-full rounded-xl border border-[var(--line)] bg-[var(--paper-subtle)] px-3.5 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:bg-white focus:border-neutral-900 focus:outline-none transition-colors"
        ></textarea>
      </div>

      <button 
        type="submit" 
        disabled={isPending}
        className="w-full flex justify-center items-center gap-2 rounded-xl bg-neutral-950 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-black focus:outline-none transition-all disabled:opacity-60 cursor-pointer"
      >
        {isPending ? 'Submitting...' : 'Send Inquiry'}
        {!isPending && <ArrowRight size={15} />}
      </button>

    </form>
  )
}
