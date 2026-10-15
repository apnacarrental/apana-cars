'use client'

import { useActionState, useEffect } from 'react'
import { submitLead, ActionState } from '@/lib/actions/lead'
import { ArrowRight, CheckCircle2, User, Phone, FileText } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

export function InquiryForm({
  title = 'Direct Booking Inquiry',
  subtitle = 'Share your travel plan with our Hyderabad central dispatch team.',
  preselectedService = '',
  preselectedCar = ''
}: {
  title?: string,
  subtitle?: string,
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
      <div>
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
      </div>

      {state.error && (
        <div className="bg-red-50 text-red-800 p-3.5 rounded-xl text-xs border border-red-200 font-medium">
          {state.error}
        </div>
      )}

      {/* Honeypot */}
      <input type="text" name="_website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
      {preselectedService && <input type="hidden" name="service" value={preselectedService} />}
      {preselectedCar && <input type="hidden" name="vehicle" value={preselectedCar} />}

      <div className="space-y-4">
        {/* 1. Name */}
        <div>
          <label htmlFor="inquiry-name" className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-1.5 flex items-center gap-1.5">
            <User size={13} className="text-[#0A2540]" />
            <span>1. Full Name *</span>
          </label>
          <input 
            type="text" 
            name="name" 
            id="inquiry-name" 
            required 
            placeholder="Your name"
            className="block w-full rounded-xl border border-[var(--line)] bg-[var(--paper-subtle)] px-3.5 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:bg-white focus:border-[#0A2540] focus:outline-none transition-colors" 
          />
          {state.fieldErrors?.name && <p className="mt-1 text-xs text-red-600">{state.fieldErrors.name[0]}</p>}
        </div>

        {/* 2. Phone Number */}
        <div>
          <label htmlFor="inquiry-phone" className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-1.5 flex items-center gap-1.5">
            <Phone size={13} className="text-[#0A2540]" />
            <span>2. Mobile / WhatsApp Number *</span>
          </label>
          <input 
            type="tel" 
            name="phone" 
            id="inquiry-phone" 
            placeholder="099881 23444 or 9876543210" 
            required 
            className="block w-full rounded-xl border border-[var(--line)] bg-[var(--paper-subtle)] px-3.5 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:bg-white focus:border-[#0A2540] focus:outline-none transition-colors font-mono" 
          />
          {state.fieldErrors?.phone && <p className="mt-1 text-xs text-red-600">{state.fieldErrors.phone[0]}</p>}
        </div>

        {/* 3. Description */}
        <div>
          <label htmlFor="inquiry-desc" className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-1.5 flex items-center gap-1.5">
            <FileText size={13} className="text-[#0A2540]" />
            <span>3. Description (No. of passengers and where you want to go) *</span>
          </label>
          <textarea 
            name="description" 
            id="inquiry-desc" 
            rows={3} 
            required 
            placeholder="e.g. 6 passengers travelling to Vijayawada / Need Innova Crysta for full day city tour" 
            className="block w-full rounded-xl border border-[var(--line)] bg-[var(--paper-subtle)] px-3.5 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:bg-white focus:border-[#0A2540] focus:outline-none transition-colors"
          />
          <p className="text-[11px] text-slate-400 mt-1">Include number of passengers, pickup &amp; drop destination, and dates.</p>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isPending} 
        className="w-full flex items-center justify-center gap-2 bg-[#ECA00A] hover:bg-[#d89006] text-[#0F172A] py-3 px-5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md active:scale-98 disabled:opacity-50 cursor-pointer"
      >
        <span>{isPending ? 'Sending Request...' : 'Get Instant Quote'}</span>
        <ArrowRight size={16} />
      </button>
    </form>
  )
}
