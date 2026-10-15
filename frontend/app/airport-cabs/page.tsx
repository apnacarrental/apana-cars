import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { 
  ArrowRight, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Compass, 
  Plane,
  PlaneTakeoff,
  PlaneLanding,
  Star,
  Building2,
  Clock,
  Car
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ServiceHeroSection } from '@/components/layout/service-hero-section'
import { HighwayStreamCanvas } from '@/components/motion/highway-stream-canvas'
import { TiltCard3D } from '@/components/motion/tilt-card-3d'
import { FloatingActionButtons } from '@/components/ui/floating-action-buttons'
import { BookingModalProvider } from '@/components/ui/smart-booking-modal'
import { AirportHeroCta, AirportFleetCta } from '@/components/motion/airport-hero-cta'
import { HourlyVehicleGrid, VehicleItem } from '@/components/motion/hourly-vehicle-grid'
import { AirportDestinationGrid, AirportDestinationItem } from '@/components/motion/airport-destination-grid'
import { AirportAttractionGrid, AirportAttractionItem } from '@/components/motion/airport-attraction-grid'
import { getCars } from '@/lib/data/db'
import { mapCarsToVehicleItems } from '@/lib/utils/fleet'

export const metadata: Metadata = {
  title: 'Airport Cabs in Hyderabad | Airport Taxi Service | Apna Cars',
  description: 'Book airport pickup and drop cabs in Hyderabad with Apna Cars. Enjoy punctual transfers, clean executive sedans, spacious SUVs and outstation routes from Rajiv Gandhi International Airport.',
  alternates: {
    canonical: 'https://apnacarrental.com/airport-cabs',
  },
  openGraph: {
    title: 'Airport Cabs in Hyderabad | Airport Taxi Service | Apna Cars',
    description: 'Ensure a hassle-free airport journey by booking your cab ahead of time. Enjoy economical fares and punctual service for all your airport travel needs in Hyderabad.',
    url: 'https://apnacarrental.com/airport-cabs',
    siteName: 'Apna Car Rental',
    images: [
      {
        url: '/images/airport/hero.jpg',
        width: 1200,
        height: 675,
        alt: 'Airport Cabs in Hyderabad - Apna Cars',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
}

// SECTION 4: OUR FLEET (Exact 6 vehicles in required order)
const FLEET_VEHICLES: VehicleItem[] = [
  {
    name: 'Swift DZire',
    category: 'Executive Sedan',
    seating: '4+1 Passengers',
    luggage: '2 Standard Bags',
    image: '/images/srisailam/swift-dzire.jpg',
    description: 'Fuel-efficient, agile in Hyderabad traffic, comfortable boot space, and economical choice for solo airport travelers and couples.',
    hourlyPriceDisplay: 'Quote on Request',
  },
  {
    name: 'Toyota Etios',
    category: 'Spacious Sedan',
    seating: '4+1 Passengers',
    luggage: '3 Standard Bags',
    image: '/images/srisailam/toyota-etios.jpg',
    description: 'Renowned for class-leading rear legroom, plush seating, and generous boot capacity. Ideal for airport luggage and business transfers.',
    hourlyPriceDisplay: 'Quote on Request',
  },
  {
    name: 'Maruti Ertiga',
    category: 'Comfortable 6-Seater MUV',
    seating: '6+1 Passengers',
    luggage: '3–4 Bags',
    image: '/images/srisailam/maruti-ertiga.jpg',
    description: 'The preferred family choice balancing comfortable 3-row seating, roof AC vents, and high maneuverability for airport groups.',
    hourlyPriceDisplay: 'Quote on Request',
  },
  {
    name: 'Toyota Innova',
    category: 'Classic Premium MPV',
    seating: '7+1 Passengers',
    luggage: '4–5 Bags',
    image: '/images/srisailam/toyota-innova.jpg',
    description: 'Legendary touring ride comfort offering unmatched suspension quality, spacious captain rows, and superior comfort for airport transfers.',
    hourlyPriceDisplay: 'Quote on Request',
  },
  {
    name: 'Innova Crysta',
    category: 'Luxury Executive MPV',
    seating: '7+1 Passengers',
    luggage: '5 Large Bags',
    image: '/images/srisailam/innova-crysta.jpg',
    description: 'Plush luxury captain seating, silent cabin, tri-zone automatic climate control, and supreme executive prestige for VIP and corporate airport guests.',
    hourlyPriceDisplay: 'Quote on Request',
  },
  {
    name: 'Tempo Traveller',
    category: 'Group Minibus (12-26 Seater)',
    seating: '12 to 26 Passengers',
    luggage: 'Ample Luggage Bay',
    image: '/images/srisailam/tempo-traveller.jpg',
    description: 'Custom-configured luxury coaches with individual AC vents, pushback seats, and high roof for family delegations, wedding parties, and corporate flights.',
    hourlyPriceDisplay: 'Quote on Request',
  },
]

// SECTION 5: POPULAR OUTSTATION DESTINATIONS FROM HYDERABAD AIRPORT (Exact 8 destinations in order)
const OUTSTATION_DESTINATIONS: AirportDestinationItem[] = [
  {
    id: 'dest-1-srisailam',
    title: 'Hyderabad Airport To Srisailam Cab',
    image: '/images/airport/srisailam.jpg',
    routeSlug: '/srisailam-cabs',
  },
  {
    id: 'dest-2-vijayawada',
    title: 'Hyderabad Airport To Vijayawada Cab',
    image: '/images/airport/vijayawada.jpg',
  },
  {
    id: 'dest-3-guntur',
    title: 'Hyderabad Airport To Guntur Cab',
    image: '/images/airport/guntur.jpg',
  },
  {
    id: 'dest-4-nanded',
    title: 'Hyderabad Airport To Nanded Cab',
    image: '/images/airport/nanded.jpg',
  },
  {
    id: 'dest-5-bidar',
    title: 'Hyderabad Airport To Bidar Cab',
    image: '/images/airport/bidar.jpg',
  },
  {
    id: 'dest-6-gulbarga',
    title: 'Hyderabad Airport To Gulbarga Cab',
    image: '/images/airport/gulbarga.jpg',
  },
  {
    id: 'dest-7-warangal',
    title: 'Hyderabad Airport To Warangal Cab',
    image: '/images/airport/warangal.jpg',
  },
  {
    id: 'dest-8-karimnagar',
    title: 'Hyderabad Airport To Karimnagar Cab',
    image: '/images/airport/karimnagar.jpg',
  },
]

// SECTION 6: PLACES TO VISIT NEAR HYDERABAD AIRPORT (Exact 4 attractions in order with verbatim descriptions and distances)
const LOCAL_ATTRACTIONS: AirportAttractionItem[] = [
  {
    id: 'attraction-1-charminar',
    name: 'Charminar',
    image: '/images/airport/charminar.jpg',
    description:
      'Charminar is the heart of Hyderabad City and your visitor stays in Hyderabad will be incomplete if you don’t visit Charminar. The magnificent 4 pillar mosque has been sitting for over 400 years and it still to this day is an important medieval monument not only in Hyderabad but in India as well.',
    distanceLabel: 'Distance from Airport: 19km',
  },
  {
    id: 'attraction-2-ramoji',
    name: 'Ramoji Film City',
    image: '/images/airport/ramoji.jpg',
    description:
      'If you are a Film person then Ramoji Film City will be a paradise for you. The area spreads over 1666 acres and touring the entire place may take an entire day. Famous movies like Baahubali, KGF, Chennai Express, and Acharya were all filmed at the Ramoji film festival.',
    distanceLabel: 'Distance from Airport: 39km',
  },
  {
    id: 'attraction-3-pragati',
    name: 'Pragati Resort',
    image: '/images/airport/pragati-resort.jpg',
    description:
      'The resort is one of a kind as it is a man-made eco-village. And it is made on non-reusable land without the use of any chemicals. The resort has a very good practice of being environmentally friendly and it is ideal for anyone who wants to relax and spend time in nature.',
    distanceLabel: 'Distance from the Airport: 40km',
  },
  {
    id: 'attraction-4-palm-exotica',
    name: 'Palm Exotica Resort',
    image: '/images/airport/palm-exotica.jpg',
    description:
      'If you are travelling with your family then this is the best option. The resort is compatible with both children and adults as well. With spas, theme parks, good ambience and a comfortable stay you get both the experience of luxury and a fun time here.',
    distanceLabel: 'Distance from Airport: 55km',
  },
]

export default async function AirportCabsPage() {
  const cars = await getCars()
  const fleetVehicles = cars && cars.length > 0 ? mapCarsToVehicleItems(cars) : FLEET_VEHICLES

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Airport Cabs in Hyderabad - Apna Cars',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Apna Car Rental',
      telephone: '+919988123444',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Garden colony, H. No - 4-4-123, opp. SBI ATM, Quthbullapur Garden Colony, Bhagyalaxmi Nagar',
        addressLocality: 'Hyderabad',
        addressRegion: 'Telangana',
        postalCode: '500055',
        addressCountry: 'IN',
      },
      url: 'https://apnacarrental.com',
    },
    areaServed: {
      '@type': 'City',
      name: 'Hyderabad',
    },
    description: 'Punctual airport pickup and airport drop taxi service in Hyderabad covering Rajiv Gandhi International Airport (RGIA) and outstation routes.',
    serviceType: 'Airport Taxi Service',
  }

  return (
    <BookingModalProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-[var(--paper)] text-neutral-900 flex flex-col font-sans selection:bg-neutral-900 selection:text-white">
        
        {/* SECTION 1: HEADER AND NAVIGATION */}
        <Header />

        {/* SECTION 2: BUSINESS AND REVIEWS AREA */}
        <section className="border-b border-[var(--line)] bg-white py-3.5 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 font-semibold text-neutral-900">
                <Building2 size={14} className="text-neutral-700" />
                Verified Commercial Operator
              </span>
              <span className="text-[var(--soft)] hidden sm:inline">&bull;</span>
              <span className="text-[var(--soft)] hidden sm:inline">
                Apna Car Rental &bull; Hyderabad, Telangana
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-500">
                  <Star size={13} fill="currentColor" />
                  <Star size={13} fill="currentColor" />
                  <Star size={13} fill="currentColor" />
                  <Star size={13} fill="currentColor" />
                  <Star size={13} fill="currentColor" />
                </div>
                <strong className="font-semibold text-neutral-900">4.9 / 5.0</strong>
                <span className="text-[var(--soft)]">Google Reviews Rating</span>
              </div>
              <a
                href="tel:+919988123444"
                className="font-semibold text-neutral-900 hover:underline hidden md:inline"
              >
                Helpline: 099881 23444
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 3: UNIFIED SERVICE HERO */}
        <ServiceHeroSection
          eyebrow="HYDERABAD'S MOST TRUSTED AIRPORT TAXI"
          titleLine1="Punctual & Reliable"
          titleHighlight="Airport Cabs"
          titleLine2="in Hyderabad"
          subtitle="Ensure a hassle-free airport journey with 24/7 flight tracking, doorstep pickup, zero surge pricing, and sanitized cabs connecting RGIA Shamshabad across Hyderabad."
          defaultTab="airport"
          defaultCarType="Swift Dzire (4-Seater)"
          extraAction={<AirportHeroCta />}
        />

        {/* SECTION 4: OUR FLEET */}
        <section id="fleet" className="py-20 bg-[var(--paper)] border-b border-[var(--line)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft)] block mb-2">
                Verified Vehicles
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-neutral-900 tracking-tight">
                Our Fleet
              </h2>
              <p className="text-sm sm:text-base text-[var(--soft)] mt-3 leading-relaxed">
                Choose from our well-maintained sedans, family MUVs, executive SUVs, and group minibuses for your airport journey.
              </p>
            </div>

            <HourlyVehicleGrid vehicles={fleetVehicles} />

            {/* Second Book a cab CTA required after Our Fleet */}
            <AirportFleetCta />
          </div>
        </section>

        {/* SECTION 5: POPULAR OUTSTATION DESTINATIONS FROM HYDERABAD AIRPORT */}
        <section id="outstation-destinations" className="py-20 bg-white border-b border-[var(--line)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft)] block mb-2">
                Direct Highway Transfers
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-neutral-900 tracking-tight">
                Popular Outstation Destinations From Hyderabad Airport
              </h2>
              <p className="text-sm sm:text-base text-[var(--soft)] mt-3 leading-relaxed">
                Landing at Rajiv Gandhi International Airport and traveling beyond Hyderabad? Book a comfortable direct highway cab to top pilgrimage and city destinations across Telangana, Andhra Pradesh, Maharashtra, and Karnataka.
              </p>
            </div>

            <AirportDestinationGrid destinations={OUTSTATION_DESTINATIONS} />
          </div>
        </section>

        {/* REPEATED DESTINATION HEADING AS SPECIFIED IN REFERENCE */}
        <section className="bg-[var(--paper)] pt-16 pb-4 border-b border-[var(--line)]/40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft)] block mb-2">
                Nearby Attractions &amp; Resorts
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-neutral-900 tracking-tight">
                Popular Outstation Destinations From Hyderabad Airport
              </h2>
              <p className="text-sm text-[var(--soft)] mt-2">
                Explore premier heritage landmarks and relaxing weekend resorts located conveniently within reach of Hyderabad Airport.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 6: PLACES TO VISIT NEAR HYDERABAD AIRPORT */}
        <section id="attractions" className="py-16 bg-[var(--paper)] border-b border-[var(--line)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <h3 className="text-2xl sm:text-3xl font-serif font-medium text-neutral-900 tracking-tight">
                Places To Visit Near Hyderabad Airport
              </h3>
            </div>

            <AirportAttractionGrid attractions={LOCAL_ATTRACTIONS} />
          </div>
        </section>

        {/* SECTION 7: MAP */}
        <section id="location-map" className="py-20 bg-white border-b border-[var(--line)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft)] block mb-2">
                Service Hub &amp; Operations
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-neutral-900 tracking-tight">
                Hyderabad Airport Cab Operations Map
              </h2>
              <p className="text-sm sm:text-base text-[var(--soft)] mt-2 leading-relaxed">
                Operating 24/7 across Rajiv Gandhi International Airport (RGIA Shamshabad), Gachibowli, HITEC City, Jubilee Hills, Secunderabad, and all surrounding corridors.
              </p>
            </div>

            <div className="overflow-hidden border border-[var(--line)] bg-[var(--paper)] shadow-sm">
              <iframe
                title="Apna Car Rental Hyderabad Service Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.3160416955!2d78.26795861113824!3d17.24049806461994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcba28ee3e2c3fb%3A0xb351a9e88d22384a!2sRajiv%20Gandhi%20International%20Airport!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </section>

        {/* SECTION 8: FOOTER */}
        <Footer />
      </div>
    </BookingModalProvider>
  )
}
