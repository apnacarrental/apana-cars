import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { 
  ArrowRight, 
  Phone, 
  Users, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Compass, 
  Car, 
  Sparkles,
  Calendar,
  Fuel,
  Briefcase,
  HelpCircle,
  Building2,
  Navigation,
  Landmark,
  Camera,
  Sun
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ServiceHeroSection } from '@/components/layout/service-hero-section'
import { FaqAccordion } from '@/components/ui/faq-accordion'
import { HighwayStreamCanvas } from '@/components/motion/highway-stream-canvas'
import { TiltCard3D } from '@/components/motion/tilt-card-3d'
import { OutstationCockpitHud } from '@/components/motion/outstation-cockpit-hud'
import { AnimatedHighwayJourney } from '@/components/motion/animated-highway-journey'
import { FloatingActionButtons } from '@/components/ui/floating-action-buttons'
import { BookingModalProvider } from '@/components/ui/smart-booking-modal'
import { SightseeingHeroCta } from '@/components/motion/sightseeing-hero-cta'
import { SightseeingPackageCards } from '@/components/motion/sightseeing-package-cards'
import { SIGHTSEEING_PACKAGES } from '@/lib/data/sightseeing'
import { HourlyVehicleGrid, VehicleItem } from '@/components/motion/hourly-vehicle-grid'
import { getCars , getReviewBadgeSettings } from '@/lib/data/db'
import { mapCarsToVehicleItems } from '@/lib/utils/fleet'

export const metadata: Metadata = {
  title: 'Hyderabad Sightseeing Cabs | Day Tours & Heritage Packages | Apna Cars',
  description: 'Book Hyderabad sightseeing cabs with verified chauffeurs. Explore Charminar, Golconda Fort, Ramoji Film City, Statue of Equality, Yadagirigutta & temple circuits. Transparent prices, clean AC cars & doorstep pickup.',
  alternates: {
    canonical: 'https://www.apnacarrental.in/sightseeing-cabs',
  },
  openGraph: {
    title: 'Hyderabad Sightseeing Cabs | Apna Cars',
    description: 'Explore Hyderabad’s iconic monuments, lakes, palaces, and spiritual temple circuits with verified chauffeured cabs.',
    url: 'https://www.apnacarrental.in/sightseeing-cabs',
    siteName: 'Apna Car Rental',
    images: [
      {
        url: '/images/sightseeing/hyderabad-hero.jpg',
        width: 1200,
        height: 675,
        alt: 'Hyderabad Sightseeing Cabs - Apna Cars',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
}

const FLEET_VEHICLES: VehicleItem[] = [
  {
    name: 'Maruti Suzuki Dzire',
    category: 'Executive Sedan',
    seating: '4+1 Passengers',
    luggage: '2 Bags',
    image: '/images/srisailam/swift-dzire.png',
    description: 'Fuel-efficient, agile in Hyderabad city traffic, comfortable boot space, and economical choice for solo executives and couples.',
    hourlyPriceDisplay: 'Price on Request',
  },
  {
    name: 'Toyota Etios',
    category: 'Spacious Sedan',
    seating: '4+1 Passengers',
    luggage: '3 Bags',
    image: '/images/srisailam/toyota-etios.png',
    description: 'Renowned for class-leading rear legroom, plush seating, and generous boot space. Ideal for all-day sightseeing visits.',
    hourlyPriceDisplay: 'Price on Request',
  },
  {
    name: 'Maruti Suzuki Ertiga',
    category: 'Comfortable MUV',
    seating: '6+1 Passengers',
    luggage: '3–4 Bags',
    image: '/images/srisailam/maruti-ertiga.jpg',
    description: 'The preferred family choice balancing comfortable 3-row seating, roof AC vents, and high maneuverability for city tours.',
    hourlyPriceDisplay: 'Price on Request',
  },
  {
    name: 'Toyota Innova',
    category: 'Premium MPV',
    seating: '7+1 Passengers',
    luggage: '4–5 Bags',
    image: '/images/srisailam/toyota-innova.png',
    description: 'Legendary cruiser offering unmatched suspension ride quality, spacious captain rows, and superior comfort for long day tours.',
    hourlyPriceDisplay: 'Price on Request',
  },
  {
    name: 'Toyota Innova Crysta',
    category: 'Luxury MPV',
    seating: '7+1 Passengers',
    luggage: '5 Bags',
    image: '/images/srisailam/innova-crysta.jpg',
    description: 'Plush luxury captain seating, silent cabin, tri-zone automatic climate control, and supreme executive comfort for heritage excursions.',
    hourlyPriceDisplay: 'Price on Request',
  },
  {
    name: 'Tempo Traveller',
    category: 'Group Minibus',
    seating: '12 to 26 Passengers',
    luggage: 'Ample Luggage Bay',
    image: '/images/srisailam/tempo-traveller.jpg',
    description: 'Custom-configured luxury coaches with individual AC vents, pushback seats, and high roof for large family & group tours.',
    hourlyPriceDisplay: 'Price on Request',
  },
]

const ATTRACTION_GUIDES = [
  {
    name: 'Charminar & Laad Bazaar',
    category: 'Iconic Monument',
    desc: 'Built in 1591 by Sultan Muhammad Quli Qutb Shah, this 430-year-old architectural jewel is the quintessential heart of Hyderabad, flanked by vibrant bangle and perfume markets.',
  },
  {
    name: 'Golconda Fort & Sound & Light',
    category: 'Acoustic Marvel',
    desc: 'The famed medieval citadel renowned for its whispering galleries, grand battlements, and the storied vault that once held the Koh-i-Noor diamond.',
  },
  {
    name: 'Salar Jung Museum',
    category: 'Art & Antiquities',
    desc: 'One of India’s largest one-man art collections, showcasing the Veiled Rebecca, the celebrated 19th-century musical clock, jade daggers, and priceless international artifacts.',
  },
  {
    name: 'Chowmahalla Palace',
    category: 'Nizami Grandeur',
    desc: 'The official residence of the Nizams of Hyderabad, featuring restored courtyards, crystalline Belgian chandeliers, vintage Rolls-Royces, and Persian architectural aesthetics.',
  },
  {
    name: 'Birla Mandir & Hussain Sagar',
    category: 'Panoramic Vantage',
    desc: 'Carved purely out of 2,000 tonnes of pristine white Rajasthani marble atop the Naubat Pahad, offering sublime views over Hussain Sagar Lake and the iconic Buddha monolith.',
  },
  {
    name: 'Nehru Zoological Park & Safari',
    category: 'Family Wildlife',
    desc: 'Spread across 380 sprawling acres, this lush park houses over 1,500 species alongside natural nocturnal habitats and guided lion and tiger safaris.',
  },
]

const WHY_CHOOSE_ITEMS = [
  {
    title: 'Customized Sightseeing Pace',
    description: 'No rushing through monuments. Spend as much time as you like with your family at each attraction with your dedicated car and driver parked nearby.',
  },
  {
    title: 'Doorstep Pickup Across Hyderabad',
    description: 'Start your trip directly from your home, hotel, Gachibowli, HITEC City, Secunderabad, or Rajiv Gandhi International Airport.',
  },
  {
    title: 'Transparent Fixed Quotes',
    description: 'Receive upfront itemized quotations with zero hidden fuel surcharges or surprise driver fees.',
  },
  {
    title: 'Knowledgeable Local Chauffeurs',
    description: 'Polite, background-verified drivers familiar with Hyderabad monuments, parking access gates, and the quickest traffic-free corridors.',
  },
  {
    title: 'Versatile Fleet Selection',
    description: 'From fuel-efficient Dzires to premium Innova Crystas and spacious 17-seater Tempo Travellers for joint families and group tours.',
  },
  {
    title: 'Instant Support & Reliable Dispatch',
    description: 'Direct phone & WhatsApp coordination before and during your journey to ensure seamless travel from sunrise to sunset.',
  },
]

const FAQS = [
  {
    id: 'faq-sightseeing-places',
    question: 'Which places can I visit in Hyderabad on a sightseeing tour?',
    answer: 'Our sightseeing cabs cover all prime attractions: Charminar, Golconda Fort, Salar Jung Museum, Chowmahalla Palace, Birla Mandir, Hussain Sagar Lake, NTR Gardens, and Nehru Zoological Park. You can also book dedicated day circuits to Ramoji Film City, the Statue of Equality, Yadagirigutta, or Wargal Saraswati Temple.',
  },
  {
    id: 'faq-customize-route',
    question: 'Can I customize my sightseeing route or alter the itinerary?',
    answer: 'Yes, absolutely. Unlike rigid bus tours, our private chauffeured cabs give you 100% flexibility. You can choose which monuments to visit, spend extra time at preferred spots, and skip places you have already seen.',
  },
  {
    id: 'faq-fleet-selection',
    question: 'Which vehicles can I book for sightseeing?',
    answer: 'You can book compact executive sedans (Maruti Dzire, Toyota Etios) for up to 4 passengers, 6-7 seater MUVs (Maruti Ertiga, Toyota Innova, Innova Crysta) for families, or 12-17 seater Tempo Travellers for larger group tours.',
  },
  {
    id: 'faq-pricing',
    question: 'How do I get the sightseeing package price?',
    answer: 'Click "Get Instant Quote / Book" on any package or vehicle card to enter your travel date and preferred car. Our team will promptly provide an upfront, transparent quotation with all terms detailed. You can also call us directly at 099881 23444.',
  },
  {
    id: 'faq-tickets',
    question: 'Are monument entry tickets included in the cab tariff?',
    answer: 'No. Monument entry tickets, camera passes, museum fees, and entertainment tickets (such as Ramoji Film City admission) are payable directly by guests at the respective ticket counters.',
  },
  {
    id: 'faq-tolls-parking',
    question: 'Are tolls, parking fees, and driver allowances included?',
    answer: 'Driver allowances are included for standard day bookings. Parking fees and toll charges (if applicable on Outer Ring Road or highway routes) are paid according to actual receipts or can be bundled into a customized quotation upon request.',
  },
  {
    id: 'faq-full-day',
    question: 'Can I book a sightseeing cab for a full day?',
    answer: 'Yes. Most Hyderabad sightseeing tours operate on full-day schedules (typically 8 to 12 hours) starting from your doorstep as early as 7:00 AM or 8:00 AM to allow ample time at all attractions.',
  },
  {
    id: 'faq-contact',
    question: 'How can I contact Apna Cars for bookings?',
    answer: 'You can call our verified helpline at 099881 23444, chat with us on WhatsApp at +91 99881 23444, or submit your enquiry through our online booking modal.',
  },
]

export default async function SightseeingCabsPage() {
  const [cars, reviewSettings] = await Promise.all([getCars(), getReviewBadgeSettings()])
  const fleetVehicles = cars && cars.length > 0 ? mapCarsToVehicleItems(cars) : FLEET_VEHICLES

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Hyderabad Sightseeing Cabs - Apna Cars',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Apna Car Rental',
      telephone: '+919988123444',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Flat no.403, saraswathi kunj, opp. Krishna Kunj Gardens, Vimana Puri, Quthbullapur',
        addressLocality: 'Hyderabad',
        addressRegion: 'Telangana',
        postalCode: '500055',
        addressCountry: 'IN',
      },
      url: 'https://www.apnacarrental.in',
    },
    areaServed: {
      '@type': 'City',
      name: 'Hyderabad',
    },
    description: 'Private chauffeured sightseeing cab rentals in Hyderabad covering Charminar, Golconda Fort, Ramoji Film City, Statue of Equality, and Yadagirigutta.',
    serviceType: 'Sightseeing Car Rental',
  }

  return (
    <BookingModalProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-[var(--paper)] text-neutral-900 flex flex-col font-sans selection:bg-neutral-900 selection:text-white">
        {/* Global Navigation Header */}
        <Header />

        {/* UNIFIED SERVICE HERO */}
        <ServiceHeroSection
          {...reviewSettings}
          eyebrow="CURATED DAY TOURS & HERITAGE CIRCUITS"
          titleLine1="Hyderabad Private"
          titleHighlight="Sightseeing Cabs"
          titleLine2="at Your Own Pace"
          subtitle="Explore Hyderabad's landmarks, historic palaces, majestic forts, and popular spiritual circuits with a private, comfortable chauffeured cab with transparent quotations and doorstep pickup."
          defaultTab="local"
          defaultCarType="Innova Crysta (7-Seater)"
          extraAction={<SightseeingHeroCta />}
        />

        {/* TRUST BADGES STRIP */}
        <section className="border-b border-[var(--line)] bg-white py-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <Compass className="h-6 w-6 text-neutral-800 mb-2" />
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-900">Private Tour Only</span>
                <span className="text-[11px] text-[var(--soft)] mt-0.5">No crowded group buses</span>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="h-6 w-6 text-neutral-800 mb-2" />
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-900">Flexible Timing</span>
                <span className="text-[11px] text-[var(--soft)] mt-0.5">Pause for meals &amp; photos</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="h-6 w-6 text-neutral-800 mb-2" />
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-900">Verified Chauffeurs</span>
                <span className="text-[11px] text-[var(--soft)] mt-0.5">Courteous &amp; city-savvy</span>
              </div>
              <div className="flex flex-col items-center">
                <Phone className="h-6 w-6 text-neutral-800 mb-2" />
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-900">Direct Helpline</span>
                <span className="text-[11px] text-[var(--soft)] mt-0.5">Call 099881 23444 anytime</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: SIGHTSEEING PACKAGES */}
        <section id="packages" className="py-20 bg-[var(--paper)] border-b border-[var(--line)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft)] block mb-2">
                Curated Travel Circuits
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-neutral-900 tracking-tight">
                Sightseeing Packages &amp; Circuits
              </h2>
              <p className="text-sm sm:text-base text-[var(--soft)] mt-3 leading-relaxed">
                Choose from our popular Hyderabad heritage tours, entertainment day-outs, and pilgrimage corridors. Custom itineraries with multi-location pickups are welcome.
              </p>
            </div>

            <SightseeingPackageCards packages={SIGHTSEEING_PACKAGES} />
          </div>
        </section>

        {/* SECTION 6: DETAILED SIGHTSEEING DESTINATIONS BREAKDOWN */}
        <section className="py-20 bg-white border-b border-[var(--line)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft)] block mb-2">
                Attraction Highlights
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-neutral-900 tracking-tight">
                Iconic Sights Covered in Hyderabad
              </h2>
              <p className="text-sm sm:text-base text-[var(--soft)] mt-3 leading-relaxed">
                Hyderabad blends four centuries of Qutb Shahi and Asaf Jahi heritage with modern landmarks. Here is what makes each stop memorable:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ATTRACTION_GUIDES.map((attraction, idx) => (
                <div 
                  key={idx}
                  className="p-6 bg-[var(--paper)] border border-[var(--line)] hover:border-neutral-900 transition-colors"
                >
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[var(--soft)] mb-2">
                    {attraction.category}
                  </span>
                  <h3 className="text-lg font-serif font-medium text-neutral-900 mb-2">
                    {attraction.name}
                  </h3>
                  <p className="text-xs text-[var(--soft)] leading-relaxed m-0">
                    {attraction.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Circuit Explanations Grid */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 pt-10 border-t border-[var(--line)]">
              <div className="p-8 bg-neutral-900 text-white">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
                  Day Excursion • 45 Km East
                </span>
                <h3 className="text-2xl font-serif font-medium mb-3 text-white">
                  Ramoji Film City + Sanghi Temple
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Start your day early heading east along Vijayawada Highway to Ramoji Film City. Enjoy world-class entertainment, thematic movie sets, amusement rides, and live stunt shows. In the late afternoon, make a serene sunset halt at the hilltop Sanghi Temple, perched majestically on Paramanand Giri hill with magnificent stone architecture.
                </p>
              </div>

              <div className="p-8 bg-neutral-900 text-white">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
                  Pilgrimage Circuit • 75 Km East
                </span>
                <h3 className="text-2xl font-serif font-medium mb-3 text-white">
                  Yadagirigutta, Swarnagiri &amp; Surendrapuri
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Experience Telangana&apos;s celebrated spiritual corridor. Visit the grand black-stone sanctum of Sri Lakshmi Narasimha Swamy at Yadagirigutta, explore the newly sculpted hilltop Swarnagiri temple, and tour the renowned Surendrapuri Mythological Awareness Museum with life-size recreations of Hindu celestial realms.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: VEHICLE FLEET SELECTION */}
        <section id="fleet" className="py-20 bg-[var(--paper)] border-b border-[var(--line)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft)] block mb-2">
                  Verified Fleet Options
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-normal text-neutral-900 tracking-tight">
                  Choose Your Sightseeing Vehicle
                </h2>
                <p className="text-sm sm:text-base text-[var(--soft)] mt-3 leading-relaxed">
                  Clean, well-maintained air-conditioned vehicles with commercial transport permits and experienced local chauffeurs.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <a
                  href="tel:+919988123444"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900 hover:underline"
                >
                  <Phone size={14} /> Need Help Choosing? Call 099881 23444
                </a>
              </div>
            </div>

            <HourlyVehicleGrid vehicles={fleetVehicles} />
          </div>
        </section>

        {/* SECTION 7: HOW SIGHTSEEING BOOKING WORKS */}
        <section className="py-20 bg-white border-b border-[var(--line)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-14 text-center mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft)] block mb-2">
                Simple Booking Workflow
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-neutral-900 tracking-tight">
                How Sightseeing Booking Works
              </h2>
              <p className="text-sm sm:text-base text-[var(--soft)] mt-3 leading-relaxed">
                Plan and confirm your private day tour across Hyderabad in 4 effortless steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              <div className="border border-[var(--line)] bg-[var(--paper)] p-6 text-center relative group hover:border-neutral-900 transition-colors">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-white font-mono text-sm font-semibold mb-4">
                  01
                </span>
                <h3 className="text-base font-serif font-medium text-neutral-900 mb-2">Select Circuit</h3>
                <p className="text-xs text-[var(--soft)] leading-relaxed">
                  Choose Hyderabad City, Ramoji Film City, Statue of Equality, or Yadagirigutta.
                </p>
              </div>

              <div className="border border-[var(--line)] bg-[var(--paper)] p-6 text-center relative group hover:border-neutral-900 transition-colors">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-white font-mono text-sm font-semibold mb-4">
                  02
                </span>
                <h3 className="text-base font-serif font-medium text-neutral-900 mb-2">Pick Vehicle</h3>
                <p className="text-xs text-[var(--soft)] leading-relaxed">
                  Select a Dzire, Etios, Ertiga, Innova Crysta, or Tempo Traveller based on group size.
                </p>
              </div>

              <div className="border border-[var(--line)] bg-[var(--paper)] p-6 text-center relative group hover:border-neutral-900 transition-colors">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-white font-mono text-sm font-semibold mb-4">
                  03
                </span>
                <h3 className="text-base font-serif font-medium text-neutral-900 mb-2">Enter Pickup Details</h3>
                <p className="text-xs text-[var(--soft)] leading-relaxed">
                  Provide your preferred pickup address, date, and morning departure time.
                </p>
              </div>

              <div className="border border-[var(--line)] bg-[var(--paper)] p-6 text-center relative group hover:border-neutral-900 transition-colors">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-white font-mono text-sm font-semibold mb-4">
                  04
                </span>
                <h3 className="text-base font-serif font-medium text-neutral-900 mb-2">Instant Dispatch</h3>
                <p className="text-xs text-[var(--soft)] leading-relaxed">
                  Receive quotation confirmation, driver details, and car number directly on WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: FARE TRANSPARENCY & CHARGES */}
        <section className="py-20 bg-[var(--paper)] border-b border-[var(--line)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft)] block mb-2">
                Transparent Policies
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-neutral-900 tracking-tight">
                Fare Inclusions &amp; Additional Charges
              </h2>
              <p className="text-sm sm:text-base text-[var(--soft)] mt-3 leading-relaxed">
                We believe in 100% upfront pricing. Here is an overview of what is included in your sightseeing package quotation:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Inclusions Card */}
              <div className="border border-[var(--line)] bg-white p-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--line)]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-medium text-neutral-900">Standard Package Inclusions</h3>
                    <span className="text-xs text-[var(--soft)]">Included in your sightseeing fare quotation</span>
                  </div>
                </div>

                <ul className="space-y-3.5 text-xs text-[var(--soft)] list-none p-0">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>Dedicated vehicle with commercial passenger permit exclusively for your group.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>Professional, uniformed chauffeur experienced with Hyderabad routes.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>Complete vehicle fuel and driver daily allowance for the booked duration.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>Doorstep pickup and return drop at any address within Hyderabad municipal limits.</span>
                  </li>
                </ul>
              </div>

              {/* Exclusions & Extras Card */}
              <div className="border border-[var(--line)] bg-white p-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--line)]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-amber-800">
                    <XCircle size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-medium text-neutral-900">Exclusions &amp; Direct Fees</h3>
                    <span className="text-xs text-[var(--soft)]">Billed directly or according to actual receipts</span>
                  </div>
                </div>

                <ul className="space-y-3.5 text-xs text-[var(--soft)] list-none p-0">
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-800 font-bold shrink-0 mt-0.5">•</span>
                    <span><strong>Monument Entry &amp; Camera Tickets:</strong> Direct payment at ticket counters (Charminar, Golconda, Salar Jung, Ramoji entry).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-800 font-bold shrink-0 mt-0.5">•</span>
                    <span><strong>Parking Fees &amp; Highway Tolls:</strong> Paid directly as per official machine receipts at monument parking plazas.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-800 font-bold shrink-0 mt-0.5">•</span>
                    <span><strong>Extra Kilometres &amp; Extra Hours:</strong> Confirmed in advance upon booking quotation if journey exceeds agreed limits.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-800 font-bold shrink-0 mt-0.5">•</span>
                    <span><strong>GST &amp; Taxes:</strong> Clearly itemized on official invoices where applicable.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: WHY CHOOSE APNA CARS */}
        <section className="py-20 bg-white border-b border-[var(--line)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft)] block mb-2">
                The Apna Cars Standard
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-neutral-900 tracking-tight">
                Why Tour Hyderabad with Apna Cars?
              </h2>
              <p className="text-sm sm:text-base text-[var(--soft)] mt-3 leading-relaxed">
                Enjoy a peaceful, personalized holiday experience without haggling on streets or waiting for crowded public tour buses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {WHY_CHOOSE_ITEMS.map((item, idx) => (
                <div key={idx} className="border-t border-[var(--line)] pt-6">
                  <h3 className="text-base font-serif font-medium text-neutral-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--soft)] leading-relaxed m-0">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 10: FAQS */}
        <section className="py-20 bg-[var(--paper)] border-b border-[var(--line)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft)] block mb-2">
                Got Questions?
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-neutral-900 tracking-tight">
                Sightseeing Cabs FAQs
              </h2>
              <p className="text-sm sm:text-base text-[var(--soft)] mt-3 leading-relaxed">
                Common questions regarding Hyderabad city tours, package limits, vehicle options, and booking steps.
              </p>
            </div>

            <div className="max-w-4xl">
              <FaqAccordion items={FAQS} />
            </div>
          </div>
        </section>

        {/* SECTION 11: FINAL CTA */}
        <section className="final-cta relative overflow-hidden bg-neutral-900 text-white py-24">
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-mono uppercase tracking-widest text-neutral-300 mb-6 border border-white/10">
              Personalized Sightseeing Experiences
            </span>

            <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-white mb-6 leading-tight">
              Plan Your Hyderabad Sightseeing Trip
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 mb-10 max-w-xl mx-auto leading-relaxed">
              Book a comfortable AC cab with a courteous driver. Get transparent rates, flexible stops, and doorstep pickup anywhere in Hyderabad.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#packages"
                className="button-dark inline-flex items-center gap-2 !bg-white !text-neutral-900 hover:!bg-neutral-100 px-8 py-4 text-xs font-semibold uppercase tracking-wider transition-all shadow-md group cursor-pointer"
                style={{ color: '#111111', backgroundColor: '#ffffff' }}
              >
                <span>View All Sightseeing Packages</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="tel:+919988123444"
                className="inline-flex items-center gap-2 border border-white/30 bg-transparent text-white px-7 py-4 text-xs font-semibold uppercase tracking-wider hover:bg-white hover:text-neutral-900 transition-all cursor-pointer"
              >
                <Phone size={14} />
                <span>Call Helpline: 099881 23444</span>
              </a>
            </div>
          </div>
        </section>

        {/* Global Footer */}
        <Footer />
      </div>
    </BookingModalProvider>
  )
}
