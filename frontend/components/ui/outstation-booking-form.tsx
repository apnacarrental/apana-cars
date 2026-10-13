'use client'

import React, { useActionState, useEffect } from 'react'
import { submitLead, ActionState } from '@/lib/actions/lead'
import { ArrowRight, CheckCircle, ShieldCheck, MapPin, Calendar, Car, Phone, User } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

interface OutstationBookingFormProps {
  destinations?: string[]
  defaultDestination?: string
  pageSource?: string
}

export function OutstationBookingForm({
  destinations = [
    'Vijayawada',
    'Srisailam',
    'Bhadrachalam',
    'Tirupati',
    'Guntur',
    'Visakhapatnam',
    'Warangal',
    'Shirdi',
    'Bengaluru',
    'Goa',
    'Mantralayam',
    'Yadagirigutta'
  ],
  defaultDestination = 'Vijayawada',
  pageSource = 'outstation_landing_page'
}: OutstationBookingFormProps) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(submitLead, {})

  useEffect(() => {
    if (state.success) {
      trackEvent({ action: 'generate_lead', category: 'lead', form_type: 'outstation_unique_booking' })
    }
  }, [state.success])

  if (state.success) {
    return (
      <div 
        id="book"
        className="mx-auto max-w-3xl rounded-xl border border-emerald-200 bg-white p-10 text-center shadow-xl"
        style={{ scrollMarginTop: '100px' }}
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle size={36} />
        </div>
        <h3 className="mb-2 text-2xl font-serif font-medium text-neutral-900">
          Outstation Trip Inquiry Registered!
        </h3>
        <p className="mx-auto mb-6 max-w-md text-sm text-[var(--soft)] leading-relaxed">
          Thank you. Our dedicated Hyderabad travel desk has logged your itinerary into the system. We will contact you with a transparent, itemized quotation shortly.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <a
            href="tel:+919988123444"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 font-bold uppercase tracking-wider text-white hover:bg-black transition-colors"
          >
            <Phone size={14} /> Call 099881 23444
          </a>
          <a
            href="https://wa.me/919988123444?text=Hi%20Apna%20Cars,%20I%20just%20submitted%20an%20outstation%20booking%20inquiry%20on%20your%20website."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 font-bold uppercase tracking-wider text-white hover:bg-[#20ba59] transition-colors"
          >
            Instant WhatsApp Connect
          </a>
        </div>
      </div>
    )
  }

  return (
    <div 
      id="book"
      className="mx-auto max-w-5xl rounded-2xl border border-[var(--line)] bg-white p-8 shadow-xl lg:p-12"
      style={{ scrollMarginTop: '100px' }}
    >
      <div className="mb-8 border-b border-[var(--line)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-2">Instant Quotation System</p>
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-neutral-900 m-0">
            Book your outstation <em>journey.</em>
          </h2>
        </div>
        <p className="text-xs text-[var(--soft)] max-w-xs m-0">
          Direct inquiry to our 24/7 central desk. All leads registered in our verified dispatch panel.
        </p>
      </div>

      <form action={formAction} className="space-y-6">
        {state.error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {state.error}
          </div>
        )}

        {/* Hidden Honeypot */}
        <input type="text" name="_website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Full Name */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
              <User size={14} className="text-neutral-400" />
              <span>Full Name *</span>
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Ramesh Kumar"
              className="w-full rounded-md border border-[var(--line)] bg-[var(--paper)] px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-neutral-900 focus:bg-white"
            />
            {state.fieldErrors?.name && (
              <span className="text-[11px] text-red-600">{state.fieldErrors.name[0]}</span>
            )}
          </div>

          {/* 2. Phone / WhatsApp */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
              <Phone size={14} className="text-neutral-400" />
              <span>Mobile / WhatsApp *</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="10-digit number (e.g. 9876543210)"
              className="w-full rounded-md border border-[var(--line)] bg-[var(--paper)] px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-neutral-900 focus:bg-white"
            />
            {state.fieldErrors?.phone && (
              <span className="text-[11px] text-red-600">{state.fieldErrors.phone[0]}</span>
            )}
          </div>

          {/* 3. Pickup Location */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
              <MapPin size={14} className="text-neutral-400" />
              <span>Pickup City / Area *</span>
            </label>
            <input
              type="text"
              name="pickupCity"
              defaultValue="Hyderabad"
              required
              placeholder="e.g. Gachibowli, Secunderabad, RGIA Airport"
              className="w-full rounded-md border border-[var(--line)] bg-[var(--paper)] px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-neutral-900 focus:bg-white"
            />
          </div>

          {/* 4. Drop Destination */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
              <MapPin size={14} className="text-neutral-400" />
              <span>Outstation Destination *</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="dropCity"
                defaultValue={defaultDestination}
                required
                list="destination-options"
                placeholder="Select or type city"
                className="w-full rounded-md border border-[var(--line)] bg-[var(--paper)] px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-neutral-900 focus:bg-white"
              />
              <datalist id="destination-options">
                {destinations.map((d) => (
                  <option key={d} value={d} />
                ))}
              </datalist>
            </div>
          </div>

          {/* 5. Travel Date */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
              <Calendar size={14} className="text-neutral-400" />
              <span>Travel Date</span>
            </label>
            <input
              type="date"
              name="pickupDatetime"
              className="w-full rounded-md border border-[var(--line)] bg-[var(--paper)] px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-neutral-900 focus:bg-white"
            />
          </div>

          {/* 6. Vehicle Choice */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
              <Car size={14} className="text-neutral-400" />
              <span>Vehicle Category</span>
            </label>
            <select
              name="carType"
              className="w-full rounded-md border border-[var(--line)] bg-[var(--paper)] px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-neutral-900 focus:bg-white"
            >
              <option value="Executive Sedan (Dzire / Etios 4+1)">Executive Sedan (Dzire / Etios 4+1)</option>
              <option value="Family MUV (Maruti Ertiga 6+1)">Family MUV (Maruti Ertiga 6+1)</option>
              <option value="Premium MPV (Innova Crysta 7+1)">Premium MPV (Innova Crysta 7+1)</option>
              <option value="Tempo Traveller (12 to 26 Seater)">Tempo Traveller (12 to 26 Seater)</option>
            </select>
          </div>
        </div>

        {/* 7. Additional Notes */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700">
            Trip Details / Special Requests (Optional)
          </label>
          <textarea
            name="message"
            rows={2}
            placeholder="e.g. 2-day round trip, temple halts required, passenger count..."
            className="w-full rounded-md border border-[var(--line)] bg-[var(--paper)] px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-neutral-900 focus:bg-white"
          />
        </div>

        {/* Form Action Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[var(--line)]">
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <ShieldCheck size={16} className="text-emerald-600" />
            <span>Guaranteed privacy &bull; No spam &bull; Fast callback</span>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-200 hover:bg-black hover:gap-3 disabled:opacity-50"
            style={{ color: '#ffffff', background: '#111111' }}
          >
            <span style={{ color: '#ffffff' }}>{isPending ? 'Registering...' : 'Request Instant Quote'}</span>
            <ArrowRight size={15} className="text-white" />
          </button>
        </div>
      </form>
    </div>
  )
}
