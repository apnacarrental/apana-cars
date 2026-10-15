'use client'

import React, { useEffect } from 'react'
import { useActionState } from 'react'
import { submitLead, ActionState } from '@/lib/actions/lead'
import { ArrowRight, CheckCircle, Phone, User, FileText, ShieldCheck, Clock, Check } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

interface BookingFormProps {
  initialTab?: string
  initialCarType?: string
  initialPassengers?: string
  className?: string
  heading?: string
  subheading?: string
}

export function BookingForm({ 
  initialTab,
  initialCarType,
  initialPassengers,
  className = '',
  heading,
  subheading
}: BookingFormProps = {}) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(submitLead, {})

  useEffect(() => {
    if (state.success) {
      trackEvent({ action: 'generate_lead', category: 'lead', form_type: 'quick_booking' })
    }
  }, [state.success])

  // Smart default description if redirected from a specific car or service
  const defaultDesc = initialCarType 
    ? `Looking for ${initialCarType} (${initialPassengers || 'Passenger travel'})`
    : initialPassengers 
    ? `Need cab for ${initialPassengers}`
    : ''

  if (state.success) {
    return (
      <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-xl border border-emerald-200 text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-xs">
          <CheckCircle size={36} />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Inquiry Received Successfully!</h3>
        <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
          Thank you. Our Hyderabad operations desk is checking live fleet availability and will contact you via WhatsApp / Phone shortly with transparent pricing.
        </p>
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-700">
          <a href="tel:+919988123444" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors">
            <Phone size={14} className="text-[#0A2540]" />
            <span>Call 099881 23444</span>
          </a>
          <a 
            href="https://wa.me/919988123444?text=Hi%20Apna%20Cars,%20I%20just%20submitted%20a%20booking%20inquiry%20on%20your%20website." 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
          >
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl border border-slate-200/90 relative overflow-hidden">
        {/* Accent top gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0A2540] via-[#ECA00A] to-[#0A2540]" />

        {/* Form Header */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-extrabold text-[#0A2540] bg-slate-100 px-3 py-1 rounded-full mb-2">
            <Clock size={12} className="text-[#ECA00A]" />
            <span>Quick Booking &amp; Instant Fare Quote</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {heading || 'Book Your Cab / Get Instant Quote'}
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-xl">
            {subheading || 'Enter your contact details and trip requirements below. We will reach out immediately with vehicle availability and best rates.'}
          </p>
        </div>

        {/* Main Form */}
        <form action={formAction} className="space-y-5">
          {state.error && (
            <div className="text-red-700 text-sm p-3.5 bg-red-50 rounded-xl border border-red-200 font-medium">
              {state.error}
            </div>
          )}

          {/* Honeypot anti-spam */}
          <input type="text" name="_website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
          {initialTab && <input type="hidden" name="tripType" value={initialTab} />}

          {/* Row 1: Name and Phone Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* 1. Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <User size={14} className="text-[#0A2540]" />
                <span>1. Your Name *</span>
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-[#FBF9F5] focus:bg-white focus:border-[#0A2540] focus:ring-2 focus:ring-slate-200 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 font-medium"
                />
              </div>
              {state.fieldErrors?.name && (
                <span className="text-xs text-red-600 font-medium">{state.fieldErrors.name[0]}</span>
              )}
            </div>

            {/* 2. Phone Number */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Phone size={14} className="text-[#0A2540]" />
                <span>2. Phone Number / WhatsApp *</span>
              </label>
              <div className="relative">
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  required
                  placeholder="e.g. 099881 23444 or 9876543210"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-[#FBF9F5] focus:bg-white focus:border-[#0A2540] focus:ring-2 focus:ring-slate-200 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 font-medium font-mono"
                />
              </div>
              {state.fieldErrors?.phone && (
                <span className="text-xs text-red-600 font-medium">{state.fieldErrors.phone[0]}</span>
              )}
            </div>
          </div>

          {/* Row 2: Description */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="description" className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <FileText size={14} className="text-[#0A2540]" />
              <span>3. Description (No. of passengers and where you want to go) *</span>
            </label>
            <div className="relative">
              <textarea
                id="description"
                name="description"
                required
                rows={3}
                defaultValue={defaultDesc}
                placeholder="e.g. 4 passengers travelling to Srisailam on Saturday morning, returning Sunday evening. Need Dzire or Ertiga."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-[#FBF9F5] focus:bg-white focus:border-[#0A2540] focus:ring-2 focus:ring-slate-200 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 font-medium resize-y leading-relaxed"
              />
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              💡 Please include no. of passengers, pickup location, destination, and travel dates/times.
            </span>
            {state.fieldErrors?.message && (
              <span className="text-xs text-red-600 font-medium">{state.fieldErrors.message[0]}</span>
            )}
          </div>

          {/* Row 3: Submit Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-4 px-8 rounded-xl bg-[#ECA00A] hover:bg-[#d89006] text-[#0F172A] font-black text-base tracking-wide flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-[0.99] cursor-pointer disabled:opacity-70"
            >
              <span>{isPending ? 'Sending Travel Request...' : 'Check Availability & Get Fare Quote'}</span>
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-center sm:justify-between gap-3 text-xs text-slate-500 font-semibold">
            <span className="inline-flex items-center gap-1.5 text-slate-700">
              <Check size={14} className="text-emerald-600 stroke-[3]" />
              Zero Cancellation Fee
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-700">
              <Check size={14} className="text-emerald-600 stroke-[3]" />
              Verified Professional Chauffeur
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-700">
              <Check size={14} className="text-emerald-600 stroke-[3]" />
              24/7 Instant Confirmation
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}
