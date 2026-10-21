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
  Navigation
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
import { HourlyHeroCta } from '@/components/motion/hourly-hero-cta'
import { HourlyPackageCards, HourlyPackageItem } from '@/components/motion/hourly-package-cards'
import { HourlyVehicleGrid, VehicleItem } from '@/components/motion/hourly-vehicle-grid'
import { getCars } from '@/lib/data/db'
import { mapCarsToVehicleItems } from '@/lib/utils/fleet'

export const metadata: Metadata = {
  title: 'Hourly Car Rental in Hyderabad | Local Cabs by the Hour | Apna Cars',
  description: 'Book hourly cabs in Hyderabad for business meetings, shopping, city sightseeing, and multi-stop errands. Choose 8 Hr / 80 Km or 12 Hr / 120 Km packages with verified chauffeurs and clean sedans, SUVs & MUVs.',
  alternates: {
    canonical: 'https://www.apnacarrental.in/hourly-cabs',
  },
  openGraph: {
    title: 'Hourly Car Rental in Hyderabad | Apna Cars',
    description: 'Book hourly cabs by the hour for local city travel, appointments, shopping, and multi-stop journeys across Hyderabad.',
    url: 'https://www.apnacarrental.in/hourly-cabs',
    siteName: 'Apna Car Rental',
    images: [
      {
        url: '/images/hero-car.png',
        width: 1200,
        height: 675,
        alt: 'Hourly Car Rental in Hyderabad - Apna Cars',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
}

const HOURLY_PACKAGES: HourlyPackageItem[] = [
  {
    id: 'pkg-8-80',
    title: '8 Hours / 80 Kilometres',
    subtitle: 'Standard Full-Day City Package',
    durationHours: 8,
    distanceKm: 80,
    badge: 'Most Popular',
    idealFor: 'Full day city meetings, multiple corporate stops in HITEC City, family shopping sprees, hospital visits, or airport plus city halts.',
    features: [
      '8 continuous hours of dedicated chauffeur & vehicle availability',
      '80 kilometres of local city running included in base quote',
      'Doorstep pickup and drop anywhere within Hyderabad municipal limits',
      'Unlimited stops & waits across Hyderabad within time and km limits',
      'Air-conditioned, clean vehicle with disciplined professional driver'
    ],
    priceDisplay: 'Price on Request',
  },
  {
    id: 'pkg-12-120',
    title: '12 Hours / 120 Kilometres',
    subtitle: 'Extended Full-Day / Sightseeing Package',
    durationHours: 12,
    distanceKm: 120,
    badge: 'Extended Coverage',
    idealFor: 'Full-day Hyderabad sightseeing (Charminar, Golconda, Ramoji Film City, Birla Mandir), wedding event transfers, or intensive business itineraries.',
    features: [
      '12 continuous hours of chauffeur & vehicle service at your disposal',
      '120 kilometres of local city travel included in package quote',
      'Flexible doorstep pickup starting as early as 6:00 AM',
      'Complete freedom for multi-location itineraries, meal breaks & client visits',
      'Transparent itemized extra-km and extra-hr rates confirmed in quotation'
    ],
    priceDisplay: 'Price on Request',
  },
]

const HOURLY_VEHICLES: VehicleItem[] = [
  {
    name: 'Swift DZire',
    category: 'Executive Sedan',
    seating: '4+1 Passengers',
    luggage: '2 Bags',
    image: '/images/srisailam/swift-dzire.jpg',
    description: 'Fuel-efficient, agile in Hyderabad city traffic, comfortable boot space, and economical choice for solo executives, shopping, and couples.',
    hourlyPriceDisplay: 'Quote on Request',
  },
  {
    name: 'Toyota Etios',
    category: 'Spacious Sedan',
    seating: '4+1 Passengers',
    luggage: '3 Bags',
    image: '/images/srisailam/toyota-etios.jpg',
    description: 'Renowned for class-leading rear legroom, plush seating, and generous boot space. Ideal for all-day client visits and city errands.',
    hourlyPriceDisplay: 'Quote on Request',
  },
  {
    name: 'Maruti Ertiga',
    category: 'Comfortable 6-Seater MUV',
    seating: '6+1 Passengers',
    luggage: '3–4 Bags',
    image: '/images/srisailam/maruti-ertiga.jpg',
    description: 'The preferred family choice balancing comfortable 3-row seating, roof AC vents, and high maneuverability for family shopping trips.',
    hourlyPriceDisplay: 'Quote on Request',
  },
  {
    name: 'Toyota Innova',
    category: 'Classic Premium MPV',
    seating: '7+1 Passengers',
    luggage: '4–5 Bags',
    image: '/images/srisailam/toyota-innova.jpg',
    description: 'Legendary city cruiser offering unmatched suspension ride quality, spacious captain rows, and superior comfort for full-day travel.',
    hourlyPriceDisplay: 'Quote on Request',
  },
  {
    name: 'Innova Crysta',
    category: 'Luxury Executive MPV',
    seating: '7+1 Passengers',
    luggage: '5 Bags',
    image: '/images/srisailam/innova-crysta.jpg',
    description: 'Plush luxury captain seating, silent cabin, tri-zone automatic climate control, and supreme executive prestige for business & events.',
    hourlyPriceDisplay: 'Quote on Request',
  },
  {
    name: 'Tempo Traveller',
    category: 'Group Minibus (12-26 Seater)',
    seating: '12 to 26 Passengers',
    luggage: 'Ample Luggage Bay',
    image: '/images/srisailam/tempo-traveller.jpg',
    description: 'Custom-configured luxury coaches with individual AC vents, pushback seats, and high roof for wedding parties, delegates, and large groups.',
    hourlyPriceDisplay: 'Quote on Request',
  },
]

const BOOKING_STEPS = [
  {
    number: '01',
    title: 'Choose Hourly Package',
    description: 'Select either 8 Hours / 80 Km or 12 Hours / 120 Km depending on your day’s schedule.',
    highlight: '8h / 80km or 12h / 120km'
  },
  {
    number: '02',
    title: 'Select Preferred Car',
    description: 'Pick from Dzire, Etios, Ertiga, Innova Crysta, or Tempo Traveller based on group size.',
    highlight: 'Sedan, SUV & Minibus'
  },
  {
    number: '03',
    title: 'Set Pickup Point & Time',
    description: 'Specify your home, office, hotel, or airport pickup address and desired start time in Hyderabad.',
    highlight: 'Doorstep Departure'
  },
  {
    number: '04',
    title: 'Confirm Quotation & Ride',
    description: 'Receive an immediate transparent quote with chauffeur details dispatched prior to trip departure.',
    highlight: 'Transparent Pricing'
  }
]

const FAQS = [
  {
    id: 'faq-1',
    question: 'What is an hourly cab package?',
    answer: 'An hourly cab package gives you a dedicated vehicle and professional chauffeur exclusively at your disposal for a pre-agreed time and distance allowance within Hyderabad. You can make unlimited stops, attend meetings, shop, or sightsee without having to book separate cabs for each leg of your day.'
  },
  {
    id: 'faq-2',
    question: 'What is included in an 8-hour package?',
    answer: 'The standard 8-hour package includes up to 8 continuous hours of service and up to 80 kilometres of local city transit from the scheduled pickup time. It covers the vehicle rental, chauffeur service, and fuel for the 80 km allowance.'
  },
  {
    id: 'faq-3',
    question: 'What is included in a 12-hour package?',
    answer: 'The 12-hour package includes up to 12 continuous hours of chauffeur service and up to 120 kilometres of city driving. It is ideal for extended sightseeing, wedding functions, or intensive business schedules spanning morning to evening.'
  },
  {
    id: 'faq-4',
    question: 'What happens if I exceed the included kilometres?',
    answer: 'If your journey exceeds the package kilometre limit (80 km or 120 km), an additional per-kilometre charge is applied based on your vehicle category. This extra-km rate will be clearly itemized and confirmed in your quotation before your trip begins.'
  },
  {
    id: 'faq-5',
    question: 'What happens if I exceed the included hours?',
    answer: 'If your trip runs past the package duration (8 hours or 12 hours), an extra-hour charge is billed for the additional time. The hourly overage rate is vehicle-specific and will be stated transparently in your initial quote.'
  },
  {
    id: 'faq-6',
    question: 'Are tolls and parking included?',
    answer: 'Standard hourly quotations cover the vehicle, driver, and fuel. City parking fees (at malls, airports, or monuments) and expressway tolls (such as PVNR Expressway or ORR stretches) are payable directly at actuals as per parking receipts.'
  },
  {
    id: 'faq-7',
    question: 'Can I choose a particular vehicle?',
    answer: 'Yes. You can select your vehicle preference from our verified fleet, including compact sedans (Dzire / Etios), comfortable family MUVs (Ertiga), premium MPVs (Innova Crysta), or luxury Tempo Travellers for larger teams.'
  },
  {
    id: 'faq-8',
    question: 'How do I get the final fare?',
    answer: 'You can tap “Instant Quote” or call our 24/7 travel desk at 099881 23444 with your travel date, start time, pickup address, and car preference. Our team will share an itemized, confirmed rate quotation with zero hidden markups.'
  },
  {
    id: 'faq-9',
    question: 'How can I contact Apna Cars?',
    answer: 'You can reach Apna Cars directly by calling 099881 23444, messaging on WhatsApp at +91 99881 23444, or visiting our Hyderabad dispatch center at Garden Colony, H. No - 4-4-123, opp. SBI ATM, Quthbullapur, Hyderabad, Telangana 500055.'
  }
]

export default async function HourlyCabsPage() {
  const cars = await getCars()
  const hourlyVehicles = cars && cars.length > 0 ? mapCarsToVehicleItems(cars) : HOURLY_VEHICLES

  const contactPhone = '+919988123444'
  const displayPhone = '099881 23444'
  const defaultWhatsAppUrl = 'https://wa.me/919988123444?text=Hi%20Apna%20Cars,%20I%20would%20like%20to%20inquire%20about%20an%20hourly%20rental%20package%20in%20Hyderabad.'

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }

  const hourlyServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Hourly Car Rental in Hyderabad',
    serviceType: 'Local Hourly Cab Rental',
    description: 'Flexible hourly car rental packages (8 Hours/80 Km & 12 Hours/120 Km) in Hyderabad by Apna Cars with experienced chauffeurs and clean fleet.',
    provider: {
      '@type': 'AutoRental',
      name: 'Apna Car Rental',
      telephone: '+919988123444',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Garden colony, H. No - 4-4-123, opp. SBI ATM, Quthbullapur Garden Colony',
        addressLocality: 'Hyderabad',
        addressRegion: 'Telangana',
        postalCode: '500055',
        addressCountry: 'IN',
      },
    },
  }

  return (
    <BookingModalProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hourlyServiceSchema) }}
      />

      <Header />

      <main id="hourly-cabs">
        {/* 1. UNIFIED SERVICE HERO */}
        <ServiceHeroSection
          eyebrow="LOCAL CAR RENTAL • HYDERABAD CITY"
          titleLine1="Chauffeur-Driven"
          titleHighlight="Hourly Cabs"
          titleLine2="in Hyderabad"
          subtitle="Book a cab by the hour for city travel, business meetings, shopping, and multiple stops around Hyderabad with 8-hour and 12-hour flexible packages."
          defaultTab="local"
          defaultCarType="Maruti Ertiga (6-Seater)"
          extraAction={
            <HourlyHeroCta 
              contactPhone={contactPhone} 
              displayPhone={displayPhone} 
            />
          }
        />

        {/* 2. TRUST BAR — 4 Interactive Columns with 3D Micro-Hover */}
        <section className="trust-bar bg-[var(--paper)]">
          <div className="trust-item">
            <Clock size={20} className="text-neutral-900" />
            <div>
              <strong>Continuous availability</strong>
              <span>Cab stays on standby while you meet</span>
            </div>
          </div>
          <div className="trust-item">
            <Compass size={20} className="text-neutral-900" />
            <div>
              <strong>Unlimited city stops</strong>
              <span>Multiple destinations at your pace</span>
            </div>
          </div>
          <div className="trust-item">
            <Car size={20} className="text-neutral-900" />
            <div>
              <strong>Sanitized fleet</strong>
              <span>Clean AC sedans, MUVs & MPVs</span>
            </div>
          </div>
          <div className="trust-item">
            <ShieldCheck size={20} className="text-neutral-900" />
            <div>
              <strong>Clear quotations</strong>
              <span>Transparent hourly & per-km terms</span>
            </div>
          </div>
        </section>

        {/* 3. HOURLY RENTAL PACKAGES (8 Hr / 80 Km & 12 Hr / 120 Km) */}
        <section id="packages" className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow">Configurable rentals</p>
              <h2>Hourly rental <em>packages.</em></h2>
            </div>
            <p>
              Choose between standard 8-hour day packages or extended 12-hour city touring options. Extra hours and kilometres billed as per verified quotation.
            </p>
          </div>

          <HourlyPackageCards packages={HOURLY_PACKAGES} />
        </section>

        {/* 4. VEHICLE SELECTION SECTION — Verified Fleet */}
        <section id="fleet" className="section fleet">
          <div className="section-head">
            <div>
              <p className="eyebrow">Vehicle selection</p>
              <h2>Choose your <em>city cab.</em></h2>
            </div>
            <p>
              Dedicated vehicles with air conditioning, experienced city chauffeurs, and comfortable seating capacities.
            </p>
          </div>

          <HourlyVehicleGrid vehicles={hourlyVehicles} />
        </section>

        {/* 5. HOW HOURLY CAB BOOKING WORKS */}
        <AnimatedHighwayJourney
          milestones={BOOKING_STEPS}
          eyebrow="Simple Process"
          heading="How hourly cab booking works in Hyderabad"
        />

        {/* 6. FARE DETAILS AND ADDITIONAL CHARGES — Transparent Breakdown */}
        <section className="corporate section">
          <div>
            <p className="eyebrow">Fair terms</p>
            <h2>Fare details &amp; <em>allowances.</em></h2>
            <p>
              We believe in honest agreements. Every quotation provided by our desk clearly distinguishes included package allowances from potential overage charges.
            </p>
            <div style={{ marginTop: '24px' }}>
              <a 
                className="button button-dark" 
                href={`tel:${contactPhone}`}
              >
                Discuss with our desk <Phone size={15} />
              </a>
            </div>
          </div>
          <div className="corporate-list">
            <div>
              <CheckCircle2 size={16} />
              <span><strong>Base Package:</strong> Includes confirmed package duration (8 or 12 hrs) and distance (80 or 120 km).</span>
            </div>
            <div>
              <CheckCircle2 size={16} />
              <span><strong>Chauffeur &amp; Fuel:</strong> Driver allowance and fuel within package limits are covered upfront.</span>
            </div>
            <div>
              <CheckCircle2 size={16} />
              <span><strong>Doorstep Pickup:</strong> Convenient pickup anywhere across Hyderabad and Secunderabad.</span>
            </div>
            <div>
              <Clock size={16} className="text-neutral-500" />
              <span><strong>Extra Hours:</strong> Billed at vehicle-specific hourly overage rates confirmed in quotation.</span>
            </div>
            <div>
              <Compass size={16} className="text-neutral-500" />
              <span><strong>Extra Kilometres:</strong> Additional kilometres beyond package allowance itemized transparently.</span>
            </div>
            <div>
              <XCircle size={16} style={{ color: 'var(--soft)' }} />
              <span><strong>Tolls &amp; Parking:</strong> Airport, mall parking, and PVNR / ORR toll receipts payable directly at actuals.</span>
            </div>
          </div>
        </section>

        {/* 7. WHY CHOOSE APNA CARS FOR HOURLY TRIPS? */}
        <section className="dark-section">
          <div className="section dark-inner">
            <p className="eyebrow light">The Apna Cars Standard</p>
            <h2>Why choose <em>Apna Cars?</em></h2>
            
            <div className="benefit-grid">
              <div className="benefit">
                <span>01</span>
                <Car size={19} />
                <h3>Multiple Vehicle Categories</h3>
                <p>From agile Dzire sedans for tight city traffic to spacious Innova Crysta MPVs and luxury Tempo Travellers.</p>
              </div>

              <div className="benefit">
                <span>02</span>
                <Clock size={19} />
                <h3>Convenient Hourly Travel</h3>
                <p>Keep your dedicated vehicle on standby throughout your meetings without booking repeated rides.</p>
              </div>

              <div className="benefit">
                <span>03</span>
                <ShieldCheck size={19} />
                <h3>Transparent Quotations</h3>
                <p>Clear, pre-confirmed rates with itemized extra hour and extra kilometre policies with zero surge markups.</p>
              </div>

              <div className="benefit">
                <span>04</span>
                <Compass size={19} />
                <h3>Flexible City Stops</h3>
                <p>Hop between offices, banks, clinics, and family gatherings at your own pace without route penalties.</p>
              </div>

              <div className="benefit">
                <span>05</span>
                <Sparkles size={19} />
                <h3>Comfortable Travel</h3>
                <p>Immaculately maintained, sanitized cabins with functional air conditioning for a peaceful journey.</p>
              </div>

              <div className="benefit">
                <span>06</span>
                <Phone size={19} />
                <h3>Verified Direct Support</h3>
                <p>Instant phone and WhatsApp assistance on 099881 23444 before, during, and after your trip.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. FREQUENTLY ASKED QUESTIONS */}
        <section className="section faq">
          <p className="eyebrow">Need to know</p>
          <h2>Frequently asked <em>questions.</em></h2>
          <FaqAccordion items={FAQS} />
        </section>

        {/* 9. FINAL CTA */}
        <section className="final-cta">
          <Image 
            src="/images/journey-road.png" 
            alt="Hourly Car Rental in Hyderabad" 
            fill 
            sizes="100vw" 
          />
          <div className="hero-overlay" />
          <div className="final-content">
            <p className="eyebrow light">Seamless City Mobility</p>
            <h2>Book Your Hourly Cab<br /><em>in Hyderabad.</em></h2>
            <p>Tell us your preferred package, date, and vehicle. We will arrange a sanitized car with a disciplined driver.</p>
            <div className="hero-buttons">
              <a 
                className="button button-light shadow-lg" 
                href={defaultWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp <ArrowRight size={17} />
              </a>
              <a 
                className="text-button light" 
                href={`tel:${contactPhone}`}
              >
                Call us {displayPhone} <Phone size={17} />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Automotive Cockpit HUD */}
      <OutstationCockpitHud 
        defaultDestination="Hyderabad (Hourly)"
        phone={contactPhone}
        displayPhone={displayPhone}
      />

      <Footer />
    </BookingModalProvider>
  )
}
