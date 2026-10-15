'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Car, 
  Plane, 
  Landmark, 
  Navigation, 
  MapPin, 
  Clock, 
  ArrowRight, 
  X, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  Sparkles,
  BookOpen
} from 'lucide-react'
import { useBookingModal } from '@/components/ui/smart-booking-modal'

interface GuideItem {
  id: string
  title: string
  category: string
  shortDesc: string
  paragraphs: string[]
  highlights: string[]
  recommendedFleet: string
  pageHref: string
  pageLabel: string
  Icon: React.ElementType
  badgeColor: string
}

const GUIDE_ITEMS: GuideItem[] = [
  {
    id: 'local-taxi',
    title: 'Book a Taxi Service in Hyderabad',
    category: 'City Travel & Chauffeurs',
    shortDesc: 'Effortless online cab booking for local city travel, business meetings, and family outings with well-maintained sedans, SUVs, and 24/7 verified chauffeurs.',
    paragraphs: [
      'Hyderabad is a vibrant city known for its rich history, delicious cuisine, and bustling commercial hubs. Whether you are visiting for leisure or business, a reliable taxi service can elevate your travel experience. Apna Cars offers a seamless and comfortable way to explore the city and beyond. You can book a cab for local travel, airport transfers, or long-distance trips. With a fleet of well-maintained vehicles, Apna Cars ensures a safe, punctual, and enjoyable journey.',
      'Finding and booking a cab in Hyderabad has never been easier. Apna Cars provides an effortless online booking system, allowing you to reserve a taxi in just a few clicks. Whether you need a cab for sightseeing, business meetings in Hitec City, or family outings, Apna Cars has got you covered. Choose from a range of vehicles, including Swift Dzire sedans, Maruti Ertiga, Toyota Innova Crysta, and luxury Force Urbania Tempo Travellers to suit your travel needs. With professional drivers and 24/7 availability, you can explore Hyderabad with complete peace of mind.'
    ],
    highlights: [
      '24/7 customer support & live dispatch coordination',
      'Clean, air-conditioned sedans, SUVs & tempo travellers',
      'Zero hidden charges & guaranteed transparent per-km billing'
    ],
    recommendedFleet: 'Swift Dzire (4-Seater), Maruti Ertiga (6-Seater), Innova Crysta (7-Seater)',
    pageHref: '/services',
    pageLabel: 'Explore All Services',
    Icon: Car,
    badgeColor: 'amber'
  },
  {
    id: 'airport-cabs',
    title: 'Airport Cabs in Hyderabad',
    category: 'RGIA Shamshabad Transfers',
    shortDesc: 'Punctual, stress-free transfers to and from Rajiv Gandhi International Airport with real-time flight delay tracking, meet & greet, and zero surge pricing.',
    paragraphs: [
      'Apna Cars provides reliable and punctual airport taxi services in Hyderabad, ensuring a hassle-free transfer to and from Rajiv Gandhi International Airport (RGIA Shamshabad). Whether you have an early morning 4:00 AM departure or a late-night arrival, Apna Cars guarantees on-time doorstep pickups and terminal drops.',
      'Our airport fleet includes comfortable sedans (Swift Dzire), spacious family MUVs (Ertiga, Innova Crysta), and luxury Tempo Travellers, catering to solo travelers, families, and corporate executives. With disciplined chauffeurs, real-time flight delay tracking, and competitive fixed pricing without sudden peak-hour surges, Apna Cars makes airport transfers smooth and stress-free.'
    ],
    highlights: [
      'Live incoming flight delay monitoring — zero wait charges',
      'Express PVNR Elevated Expressway & ORR speed transit',
      'Direct doorstep luggage assistance & terminal gate drops'
    ],
    recommendedFleet: 'Swift Dzire, Maruti Ertiga, Toyota Innova Crysta',
    pageHref: '/airport-cabs',
    pageLabel: 'View Airport Cabs',
    Icon: Plane,
    badgeColor: 'emerald'
  },
  {
    id: 'sightseeing-cabs',
    title: 'Sightseeing Cabs in Hyderabad',
    category: 'Heritage Day Tours',
    shortDesc: 'Curated private day tours covering Charminar, Golconda Fort, Ramoji Film City, Chowmahalla Palace, and Hussain Sagar Lake with local guide chauffeurs.',
    paragraphs: [
      'Exploring Hyderabad’s iconic attractions is effortless with Apna Cars’ sightseeing taxi services. Whether you want to visit Charminar, Golconda Fort, Ramoji Film City, Chowmahalla Palace, Salar Jung Museum, or Hussain Sagar Lake, Apna Cars offers comfortable and air-conditioned vehicles for city tours.',
      'Our experienced drivers ensure you cover all major tourist spots efficiently while providing helpful local tips and handling monument parking smoothly. You can book a cab for a half-day or full-day tour and travel at your own comfortable pace without rush, making your sightseeing experience truly memorable and relaxing for the entire family.'
    ],
    highlights: [
      '100% private car exclusively for your family or group',
      'Flexible time spent at each monument with zero hurry',
      'All-inclusive toll and parking arrangements handled'
    ],
    recommendedFleet: '4 to 28 Seater Vehicles (Dzire, Ertiga, Innova, Force Urbania)',
    pageHref: '/sightseeing-cabs',
    pageLabel: 'View Sightseeing Packages',
    Icon: Landmark,
    badgeColor: 'blue'
  },
  {
    id: 'outstation-cabs',
    title: 'Booking an Outstation Cab',
    category: 'Intercity Highway Trips',
    shortDesc: 'Reliable one-way drops and round-trip highway taxi services to Vijayawada, Bengaluru, Tirupati, Warangal, and all major cities across South India.',
    paragraphs: [
      'Planning a trip to a nearby city or neighboring state? Apna Cars offers dependable outstation taxi services from Hyderabad for both one-way drops and round-trip journeys. Whether you are heading to Vijayawada, Bengaluru, Tirupati, Guntur, Warangal, or any other destination, you can count on Apna Cars for a smooth and comfortable highway ride.',
      'Our punctual pickups, highway-trained chauffeurs, and clean, air-conditioned vehicles ensure a pleasant long-distance travel experience. Choose from verified options such as Swift Dzire, Innova Crysta, Maruti Ertiga, and Tempo Travellers, depending on your group size and luggage needs. With transparent per-km rates, all-inclusive toll options, and no hidden surcharges, you enjoy total peace of mind on the open road.'
    ],
    highlights: [
      'Verified highway captains with verified interstate experience',
      'One-way intercity drops & multi-day round-trip packages',
      'Transparent billing with actual toll and state tax clarity'
    ],
    recommendedFleet: 'Swift Dzire (Sedan), Innova Crysta (SUV), 12/16 Seater Urbania',
    pageHref: '/outstation-cabs',
    pageLabel: 'View Outstation Cabs',
    Icon: Navigation,
    badgeColor: 'purple'
  },
  {
    id: 'srisailam-cabs',
    title: 'Hyderabad to Srisailam Cab Packages',
    category: 'Pilgrimage Darshan Tours',
    shortDesc: 'Dedicated 215 km pilgrimage cab packages to Sri Mallikarjuna Swamy Temple with hill-certified drivers and forest checkpost timing compliance.',
    paragraphs: [
      'Planning a spiritual pilgrimage to Srisailam? Apna Cars offers comfortable and affordable Hyderabad to Srisailam cab packages, making your holy journey smooth and sacred. Covering a distance of approximately 215 km through the scenic Nallamala hills, our well-maintained cabs ensure a comfortable ride to one of India’s most revered Jyotirlinga and Maha Shakti Peetham temples.',
      'You can choose from a range of vehicles, including sedans, Innova Crysta, Ertiga, and Tempo Travellers, based on your family or group size. The package includes professional drivers experienced in navigating the Nallamala ghat roads, adhering strictly to the Mannanur forest checkpost timings (6:00 AM to 9:00 PM), and offering doorstep pickup across Hyderabad. Experience a deeply fulfilling and hassle-free spiritual getaway with Apna Cars.'
    ],
    highlights: [
      'Hill-certified drivers with safe ghat road experience',
      'Timely departures to clear Mannanur forest checkpost before night curfew',
      '1-day quick darshan & 2-day relaxed temple stay packages'
    ],
    recommendedFleet: 'Toyota Innova Crysta, Maruti Ertiga, Tempo Traveller',
    pageHref: '/srisailam-cabs',
    pageLabel: 'View Srisailam Packages',
    Icon: MapPin,
    badgeColor: 'amber'
  },
  {
    id: 'hourly-cabs',
    title: 'Hourly Cab Packages',
    category: 'Flexible City Rentals',
    shortDesc: 'Convenient 4-hour, 8-hour, and 12-hour local rental packages for shopping sprees, corporate meetings, doctor visits, and family celebrations.',
    paragraphs: [
      'For those who need a cab for several hours with multiple stops, Apna Cars offers flexible hourly rental packages in Hyderabad (4 Hours / 40 Km, 8 Hours / 80 Km, and 12 Hours / 120 Km). Whether you have back-to-back corporate meetings across Cyberabad, errands to run, a wedding shopping spree in Begum Bazaar, or want a dedicated chauffeur-driven car for a family function, you can keep a vehicle at your disposal.',
      'With transparent pricing and a diverse fleet of sedans and SUVs, hourly rentals give you complete freedom to move around the city without worrying about booking separate cabs for every single leg of your day.'
    ],
    highlights: [
      'Multiple stops & unlimited waiting within your chosen package',
      'Dedicated chauffeur stays with you throughout the booking',
      'Ideal for shopping, corporate client visits & family functions'
    ],
    recommendedFleet: 'Swift Dzire (Sedan), Maruti Ertiga (MUV), Innova Crysta (SUV)',
    pageHref: '/hourly-cabs',
    pageLabel: 'View Hourly Packages',
    Icon: Clock,
    badgeColor: 'blue'
  }
]

export function HyderabadTravelGuideCards() {
  const [selectedGuide, setSelectedGuide] = useState<GuideItem | null>(null)
  const { openBookingModal } = useBookingModal()

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedGuide(null)
    }
    if (selectedGuide) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedGuide])

  return (
    <section id="guide" className="section bg-[var(--paper)] border-t border-[var(--line)]" style={{ paddingTop: '90px', paddingBottom: '90px' }}>
      <div className="section-head mb-10">
        <div>
          <p className="eyebrow flex items-center gap-1.5">
            <BookOpen size={13} className="text-amber-600" />
            Hyderabad Cab & Travel Guide
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            Book a Taxi Service in Hyderabad with <span className="text-[#ECA00A] font-extrabold">Apna Cars.</span>
          </h2>
        </div>
        <p className="text-sm text-neutral-600 max-w-md">
          Explore Hyderabad’s rich culture, catch punctual airport flights, and plan smooth highway trips with our comprehensive city cab guide. Click any card to read the complete details.
        </p>
      </div>

      {/* 6-Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GUIDE_ITEMS.map((item) => {
          const ItemIcon = item.Icon
          return (
            <article
              key={item.id}
              onClick={() => setSelectedGuide(item)}
              className="group cursor-pointer flex flex-col justify-between p-6 bg-white rounded-xl border border-neutral-200/80 hover:border-neutral-900 hover:shadow-lg transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-neutral-100 group-hover:bg-neutral-900 group-hover:text-white flex items-center justify-center text-neutral-800 transition-colors">
                    <ItemIcon size={20} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-neutral-900 group-hover:text-black line-clamp-1 mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3 mb-5">
                  {item.shortDesc}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-neutral-900">
                <span className="flex items-center gap-1.5 group-hover:text-amber-700 transition-colors">
                  <Sparkles size={13} className="text-amber-500" />
                  Read Full Guide
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  View <ArrowRight size={13} />
                </span>
              </div>
            </article>
          )
        })}
      </div>

      {/* Interactive Modal Pop-up */}
      {selectedGuide && (
        <div 
          className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          style={{ zIndex: 9999 }}
          onClick={() => setSelectedGuide(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
            style={{ zIndex: 10000 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-neutral-900 text-white flex items-center justify-center shrink-0">
                  <selectedGuide.Icon size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
                    {selectedGuide.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900 leading-tight">
                    {selectedGuide.title}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedGuide(null)}
                className="w-8 h-8 rounded-full bg-white hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors border border-neutral-200 cursor-pointer shrink-0 ml-2"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="px-6 py-5 overflow-y-auto space-y-4 text-sm text-neutral-700 leading-relaxed">
              {selectedGuide.paragraphs.map((p, idx) => (
                <p key={idx} className="text-neutral-700 leading-relaxed">
                  {p}
                </p>
              ))}

              {/* Highlights */}
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-2 mt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2">
                  Key Service Highlights
                </h4>
                {selectedGuide.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                    <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Recommended Fleet */}
              <div className="flex items-center gap-2 text-xs text-neutral-600 pt-2 border-t border-neutral-100">
                <strong className="text-neutral-900">Recommended Vehicles:</strong>
                <span>{selectedGuide.recommendedFleet}</span>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="p-4 sm:px-6 sm:py-4 border-t border-neutral-100 bg-neutral-50 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const dest = selectedGuide.title
                    setSelectedGuide(null)
                    openBookingModal({ destination: dest, carType: 'Executive Sedan (Dzire)' })
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-neutral-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
                >
                  Book Cab <ArrowRight size={14} />
                </button>
                <Link
                  href={selectedGuide.pageHref}
                  onClick={() => setSelectedGuide(null)}
                  className="inline-flex items-center gap-1 px-3.5 py-2.5 rounded-lg border border-neutral-300 hover:bg-white text-neutral-800 text-xs font-semibold transition-colors"
                >
                  {selectedGuide.pageLabel}
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="tel:+919988123444"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-neutral-200 hover:border-neutral-900 text-neutral-800 text-xs font-semibold transition-colors bg-white"
                >
                  <Phone size={13} /> 099881 23444
                </a>
                <a
                  href={`https://wa.me/919988123444?text=${encodeURIComponent(
                    `Hi Apna Cars, I am interested in ${selectedGuide.title}. Please share fare details.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 text-xs font-semibold transition-colors"
                >
                  <MessageCircle size={14} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
