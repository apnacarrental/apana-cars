'use client'

import React, { createContext, useContext, useState, useTransition } from 'react'
import { X, ArrowRight, ShieldCheck, MapPin, Phone, User, Calendar, Car } from 'lucide-react'
import { submitLead } from '@/lib/actions/lead'
import { trackEvent } from '@/lib/analytics'

interface ModalBookingData {
  destination: string
  distance?: string
  carType?: string
}

interface BookingModalContextType {
  openBookingModal: (data?: Partial<ModalBookingData>) => void
  closeBookingModal: () => void
}

const BookingModalContext = createContext<BookingModalContextType>({
  openBookingModal: () => {},
  closeBookingModal: () => {},
})

export function useBookingModal() {
  return useContext(BookingModalContext)
}

export function BookingModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [bookingData, setBookingData] = useState<ModalBookingData>({
    destination: 'Outstation Trip',
    distance: '',
    carType: 'Executive Sedan (Dzire / Etios)',
  })

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [pickupDate, setPickupDate] = useState('')
  const [destination, setDestination] = useState('')
  const [carType, setCarType] = useState('Executive Sedan (Dzire / Etios)')
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const openBookingModal = (data?: Partial<ModalBookingData>) => {
    const dest = data?.destination || 'Outstation Trip'
    const car = data?.carType || 'Executive Sedan (Dzire / Etios)'
    setBookingData({
      destination: dest,
      distance: data?.distance || '',
      carType: car,
    })
    setDestination(dest)
    setCarType(car)
    setError(null)
    setIsOpen(true)
  }

  const closeBookingModal = () => {
    setIsOpen(false)
    setError(null)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    // Basic client validation
    const cleanPhone = phone.trim().replace(/[\s\-\(\)]/g, '')
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.')
      return
    }

    startTransition(async () => {
      try {
        const formData = new FormData()
        formData.append('name', name.trim())
        formData.append('phone', cleanPhone)
        formData.append('pickupCity', 'Hyderabad')
        formData.append('dropCity', destination || bookingData.destination)
        formData.append('carType', carType)
        if (pickupDate) {
          formData.append('pickupDatetime', pickupDate)
        }
        formData.append(
          'message',
          `Outstation Modal Lead | Route: Hyd to ${destination || bookingData.destination} | Vehicle: ${carType}${
            pickupDate ? ` | Date: ${pickupDate}` : ''
          }`
        )

        // 1. Submit lead to database / admin panel
        await submitLead({}, formData)
        trackEvent({ action: 'generate_lead', category: 'lead', form_type: 'smart_modal_outstation' })

        // 2. Build pre-filled WhatsApp message
        const waText = `Hi Apna Cars, my name is ${name.trim()}. I would like to get a quote for an outstation cab from Hyderabad to ${
          destination || bookingData.destination
        }${carType ? ` (${carType})` : ''}${pickupDate ? ` on ${pickupDate}` : ''}.`

        const whatsappUrl = `https://wa.me/919988123444?text=${encodeURIComponent(waText)}`

        // 3. Close modal & redirect seamlessly to WhatsApp
        setIsOpen(false)
        window.open(whatsappUrl, '_blank')
      } catch (err) {
        console.error('Lead error:', err)
        // Even if DB fails, don't block the user from reaching WhatsApp
        const waFallback = `https://wa.me/919988123444?text=${encodeURIComponent(
          `Hi Apna Cars, I would like to get a quote for a cab to ${destination || bookingData.destination}.`
        )}`
        setIsOpen(false)
        window.open(waFallback, '_blank')
      }
    })
  }

  return (
    <BookingModalContext.Provider value={{ openBookingModal, closeBookingModal }}>
      {children}

      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeBookingModal()
          }}
        >
          <div 
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8 border border-[var(--line)] animate-in zoom-in-95 duration-200"
          >
            {/* Close Button */}
            <button
              onClick={closeBookingModal}
              type="button"
              aria-label="Close booking modal"
              className="absolute right-4 top-4 rounded-full p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="mb-6">
              <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                Quick Quotation &bull; 30-Sec Response
              </span>
              <h2 className="mt-2 text-2xl font-serif font-medium tracking-tight text-neutral-900 m-0">
                Book Hyderabad &rarr; <span className="underline decoration-neutral-300">{destination || bookingData.destination}</span>
              </h2>
              <p className="mt-1 text-xs text-[var(--soft)] m-0">
                Your inquiry will be logged in our dispatch desk and connected directly to our WhatsApp travel coordinator.
              </p>
            </div>

            {error && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-xs font-medium text-red-700 border border-red-200">
                {error}
              </div>
            )}

            {/* Quick Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-neutral-700">
                  Your Full Name *
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full rounded-lg border border-[var(--line)] bg-[var(--paper)] py-2.5 pl-10 pr-3.5 text-sm outline-none transition-colors focus:border-neutral-900 focus:bg-white"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-neutral-700">
                  Mobile / WhatsApp Number *
                </label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full rounded-lg border border-[var(--line)] bg-[var(--paper)] py-2.5 pl-10 pr-3.5 text-sm outline-none transition-colors focus:border-neutral-900 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Travel Date */}
                <div>
                  <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-neutral-700">
                    Travel Date
                  </label>
                  <div className="relative">
                    <Calendar size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full rounded-lg border border-[var(--line)] bg-[var(--paper)] py-2.5 pl-10 pr-3 text-xs outline-none transition-colors focus:border-neutral-900 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Vehicle Selection */}
                <div>
                  <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-neutral-700">
                    Vehicle Type
                  </label>
                  <div className="relative">
                    <Car size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <select
                      value={carType}
                      onChange={(e) => setCarType(e.target.value)}
                      className="w-full rounded-lg border border-[var(--line)] bg-[var(--paper)] py-2.5 pl-10 pr-2 text-xs outline-none transition-colors focus:border-neutral-900 focus:bg-white"
                    >
                      <option value="Executive Sedan (Dzire / Etios)">Sedan (Dzire / Etios)</option>
                      <option value="Family MUV (Maruti Ertiga)">MUV (Maruti Ertiga)</option>
                      <option value="Premium MPV (Innova Crysta)">MPV (Innova Crysta)</option>
                      <option value="Tempo Traveller (12-26 Seater)">Tempo Traveller</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit & Redirect Button */}
              <button
                type="submit"
                disabled={isPending}
                className="group mt-2 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 disabled:opacity-50"
                style={{
                  background: '#111111',
                  color: '#ffffff',
                }}
              >
                <span style={{ color: '#ffffff' }}>
                  {isPending ? 'Logging Inquiry...' : 'Proceed to Instant Quote'}
                </span>
                <ArrowRight size={15} className="text-white transition-transform group-hover:translate-x-1" />
              </button>

              <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-neutral-500">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>Zero spam &bull; Fast transparent rate quote</span>
              </div>
            </form>
          </div>
        </div>
      )}
    </BookingModalContext.Provider>
  )
}
