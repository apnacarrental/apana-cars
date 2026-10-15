'use client'

import React, { useState, useEffect } from 'react'
import { useActionState } from 'react'
import { submitLead, ActionState } from '@/lib/actions/lead'
import { MapPin, Calendar, Users, ArrowRight, CheckCircle, ChevronDown, Phone, User } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

const TABS = [
  { id: 'local', label: 'Local Trip' },
  { id: 'outstation', label: 'Outstation Trip' },
  { id: 'airport', label: 'Airport Transfer' },
  { id: 'oneway', label: 'One Way Trip' },
]

function mapVehicleToPassengers(val?: string): string {
  if (!val) return '1-4 Passengers (Executive Sedan)'
  const str = val.toLowerCase()
  if (str.includes('dzire') || str.includes('etios') || str.includes('4-seater') || str.includes('sedan') || str.includes('1-4')) {
    return '1-4 Passengers (Executive Sedan)'
  }
  if (str.includes('ertiga') || str.includes('6-seater') || str.includes('5-6') || str.includes('muv')) {
    return '5-6 Passengers (Family MUV / Ertiga)'
  }
  if (str.includes('crysta') || str.includes('innova') || str.includes('7-seater') || str.includes('fortuner') || str.includes('carnival')) {
    return '7 Passengers (Luxury SUV / Innova Crysta)'
  }
  if (str.includes('urbania') || str.includes('8-12') || str.includes('12-seater')) {
    return '8-12 Passengers (Force Urbania / Minivan)'
  }
  if (str.includes('tempo') || str.includes('traveller') || str.includes('13-17') || str.includes('16-seater') || str.includes('17-seater')) {
    return '13-17 Passengers (Tempo Traveller / Van)'
  }
  if (str.includes('18+') || str.includes('bus') || str.includes('coach')) {
    return '18+ Passengers (Group Bus / Coach)'
  }
  return val
}

interface BookingFormProps {
  initialTab?: string
  initialCarType?: string
  initialPassengers?: string
}

export function BookingForm({ 
  initialTab = 'local',
  initialCarType,
  initialPassengers,
}: BookingFormProps = {}) {
  const [activeTab, setActiveTab] = useState(initialTab)
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(submitLead, {})

  useEffect(() => {
    if (state.success) {
      trackEvent({ action: 'generate_lead', category: 'lead', form_type: 'quick_booking' })
    }
  }, [state.success])

  if (state.success) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-xl border border-emerald-200 text-center max-w-xl mx-auto">
        <CheckCircle size={44} className="text-emerald-600 mx-auto mb-3" />
        <h3 className="text-2xl font-bold text-slate-900 mb-1">Check Availability Request Received!</h3>
        <p className="text-slate-600 text-sm">Our 24/7 Hyderabad dispatch team is checking live fleet availability and will call/WhatsApp you immediately.</p>
        <p className="text-xs text-slate-400 mt-3">Immediate assistance: <a href="tel:+919988123444" className="underline font-semibold text-slate-700">099881 23444</a></p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* 4 Tabs above the Booking Box */}
      <div className="flex flex-wrap items-center gap-2 mb-2 px-2">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer ${
                isActive
                  ? 'bg-[#0A2540] text-white shadow-md'
                  : 'bg-white/90 text-slate-700 hover:bg-white hover:text-[#0A2540] border-t border-x border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Main Booking Panel Box */}
      <form 
        action={formAction}
        className="bg-white rounded-2xl rounded-tl-none p-4 sm:p-6 shadow-2xl border border-slate-200/90"
      >
        {state.error && (
          <div className="text-red-600 text-sm p-3 bg-red-50 rounded-lg border border-red-200 mb-4">
            {state.error}
          </div>
        )}

        {/* Hidden Form Fields for trip type & anti-spam */}
        <input type="hidden" name="tripType" value={activeTab} />
        <input type="text" name="_website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* 1. Pickup Location */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <MapPin size={13} className="text-[#0A2540]" />
              Pickup Location
            </label>
            <div className="relative">
              <input
                name="pickupCity"
                required
                placeholder="Enter pickup location"
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-[#FBF9F5] focus:bg-white focus:border-[#ECA00A] focus:ring-2 focus:ring-amber-200 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 font-medium"
              />
            </div>
          </div>

          {/* 2. Travel Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Calendar size={13} className="text-[#0A2540]" />
              Travel Date
            </label>
            <div className="relative">
              <input
                type="date"
                name="pickupDate"
                defaultValue={new Date().toISOString().split('T')[0]}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-[#FBF9F5] focus:bg-white focus:border-[#ECA00A] focus:ring-2 focus:ring-amber-200 text-sm text-slate-900 outline-none transition-all font-medium"
              />
            </div>
          </div>

          {/* 3. No. of Passengers */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Users size={13} className="text-[#0A2540]" />
              No. of Passengers
            </label>
            <div className="relative">
              <select
                name="passengers"
                defaultValue={mapVehicleToPassengers(initialPassengers || initialCarType)}
                className="w-full appearance-none px-3.5 py-3 rounded-xl border border-slate-200 bg-[#FBF9F5] focus:bg-white focus:border-[#ECA00A] focus:ring-2 focus:ring-amber-200 text-sm text-slate-900 outline-none transition-all font-medium cursor-pointer pr-9"
              >
                <option value="1-4 Passengers (Executive Sedan)">1-4 Passengers (Executive Sedan)</option>
                <option value="5-6 Passengers (Family MUV / Ertiga)">5-6 Passengers (Family MUV / Ertiga)</option>
                <option value="7 Passengers (Luxury SUV / Innova Crysta)">7 Passengers (Luxury SUV / Innova Crysta)</option>
                <option value="8-12 Passengers (Force Urbania / Minivan)">8-12 Passengers (Force Urbania / Minivan)</option>
                <option value="13-17 Passengers (Tempo Traveller / Van)">13-17 Passengers (Tempo Traveller / Van)</option>
                <option value="18+ Passengers (Group Bus / Coach)">18+ Passengers (Group Bus / Coach)</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* 4. Action Button */}
          <div className="flex flex-col gap-1.5">
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3.5 px-6 rounded-xl bg-[#ECA00A] hover:bg-[#d89006] text-[#0F172A] font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer disabled:opacity-70"
            >
              <span>{isPending ? 'Checking...' : 'Check Availability'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Quick Contact Input bar below for seamless lead booking */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[280px]">
            <div className="flex items-center gap-1.5 flex-1 min-w-[140px] max-w-[180px]">
              <User size={13} className="text-[#0A2540] shrink-0" />
              <input
                name="name"
                placeholder="Your Name (Optional)"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 outline-none focus:border-[#ECA00A]"
              />
            </div>
            <div className="flex items-center gap-1.5 flex-1 min-w-[190px] max-w-sm">
              <Phone size={13} className="text-[#0A2540] shrink-0" />
              <input
                name="phone"
                required
                placeholder="Your Phone / WhatsApp"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 outline-none focus:border-[#ECA00A]"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium">
            <span>✓ Zero Cancellation Fee</span>
            <span>✓ Verified Chauffeur</span>
            <span>✓ 24/7 Instant Confirmation</span>
          </div>
        </div>
      </form>
    </div>
  )
}
