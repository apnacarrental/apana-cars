import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { 
  ArrowRight, 
  Phone, 
  Users, 
  Sparkles, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Compass, 
  Car, 
  Tv, 
  Wind, 
  Music, 
  Lightbulb, 
  BatteryCharging, 
  Luggage, 
  Armchair,
  Check,
  Building2,
  Calendar,
  Layers,
  Leaf,
  HeartHandshake
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HighwayStreamCanvas } from '@/components/motion/highway-stream-canvas'
import { TiltCard3D } from '@/components/motion/tilt-card-3d'
import { FloatingActionButtons } from '@/components/ui/floating-action-buttons'
import { BookingModalProvider } from '@/components/ui/smart-booking-modal'
import { UrbaniaHeroCta, UrbaniaBookingCta } from '@/components/motion/urbania-hero-cta'

export const metadata: Metadata = {
  title: 'Force Urbania Rental in Hyderabad | Luxury Tempo Traveller | Apna Cars',
  description: 'Explore Force Urbania rental options in Hyderabad for group travel, family outings, corporate trips and outstation journeys with Apna Cars. Premium 12 & 17 seater luxury vans with business-class comfort.',
  alternates: {
    canonical: 'https://apnacarrental.com/force-urbania-rent-in-hyderabad',
  },
  openGraph: {
    title: 'Force Urbania Rental in Hyderabad | Apna Cars',
    description: 'Book luxury 12 & 17 seater Force Urbania vans in Hyderabad for corporate events, outstation tours, airport transfers, and family celebrations.',
    url: 'https://apnacarrental.com/force-urbania-rent-in-hyderabad',
    siteName: 'Apna Car Rental',
    images: [
      {
        url: '/images/urbania/urbania-hero.jpg',
        width: 1200,
        height: 675,
        alt: 'Force Urbania Luxury Van Rental in Hyderabad - Apna Cars',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
}

// SECTION 4: POPULAR FORCE URBANIA RIDES FROM HYDERABAD
const URBANIA_ROUTES = [
  {
    id: 'route-1-local',
    title: 'Hyderabad Local Travel — Tempo Traveller',
    image: '/images/urbania/route-hyderabad.jpg',
    description: 'Perfect for local city sightseeing, wedding guest movements, shopping trips to Charminar, or corporate delegate transfers across HITEC City and Gachibowli.',
    tag: 'City & Events',
  },
  {
    id: 'route-2-srisailam',
    title: 'Hyderabad to Srisailam — Tempo Traveller',
    image: '/images/urbania/route-srisailam.jpg',
    description: 'Scenic ghat and forest route through Nallamala hills. Travel comfortably in a high-roof van for family darshan at Sri Bhramaramba Mallikarjuna Swamy Temple.',
    tag: 'Pilgrimage Circuit',
  },
  {
    id: 'route-3-tirupati',
    title: 'Hyderabad to Tirupati — Tempo Traveller',
    image: '/images/urbania/route-tirupati.jpg',
    description: 'Long-distance highway pilgrimage with plush pushback seats and individual AC vents, ensuring elderly family members arrive refreshed for Lord Venkateswara darshan.',
    tag: 'Highway Pilgrimage',
  },
  {
    id: 'route-4-vizag',
    title: 'Hyderabad to Vizag — Tempo Traveller',
    image: '/images/urbania/route-vizag.jpg',
    description: 'Coastal highway road trip connecting Hyderabad to Visakhapatnam, Araku Valley, and RK Beach with ample luggage capacity and silent cabin isolation.',
    tag: 'Coastal Vacation',
  },
]

// SECTION 5: TYPES OF FORCE URBANIA VEHICLES AVAILABLE IN HYDERABAD
const URBANIA_VARIANTS = [
  {
    id: 'variant-12',
    name: '12 Seater Force Urbania',
    category: 'Medium Wheelbase Luxury Van',
    capacity: '12 Passengers + Chauffeur',
    luggage: 'Dedicated Rear Boot Space',
    image: '/images/urbania/urbania-12-seater.jpg',
    features: [
      'Individual reclining luxury seats with armrests',
      'High-roof walkthrough cabin (6+ feet headroom)',
      'Individual overhead AC vents & reading lights',
      'Dual-tone plush executive interiors',
      'USB fast-charging sockets for all passenger rows',
      'Wide panoramic sealed windows for scenic travel',
    ],
    bestFor: 'Corporate delegations, executive airport transfers, small family vacations, and VIP guest movements.',
  },
  {
    id: 'variant-17',
    name: '17 Seater Force Urbania',
    category: 'Long Wheelbase Executive Coach',
    capacity: '17 Passengers + Chauffeur',
    luggage: 'Large Extended Luggage Bay',
    image: '/images/urbania/urbania-17-seater.jpg',
    features: [
      '17 individual pushback ergonomic seats',
      'High-capacity central climate HVAC system',
      'Advanced parabolic leaf spring & shock absorption suspension',
      'Wide central aisle for effortless movement',
      'Ambient warm LED cabin lighting',
      'ABS, EBD, and disc brakes for maximum highway safety',
    ],
    bestFor: 'Joint family pilgrimages, wedding groups, college reunions, and corporate offsite team excursions.',
  },
]

// SECTION 7: AMENITIES AVAILABLE ON A TEMPO TRAVELLER IN HYDERABAD (Exact 7 amenities from reference)
const AMENITIES = [
  {
    id: 'amenity-seats',
    name: 'Comfortable Seats',
    icon: Armchair,
    desc: 'Plush pushback and reclining seats with headrests and ample legroom for relaxed journeys.',
  },
  {
    id: 'amenity-ac',
    name: 'Air Conditioning',
    icon: Wind,
    desc: 'High-output dual AC with individual louvers to keep every seat cool during Hyderabad summers.',
  },
  {
    id: 'amenity-tv',
    name: 'TV Units',
    icon: Tv,
    desc: 'High-definition digital screens mounted overhead for group movies and corporate presentations.',
  },
  {
    id: 'amenity-music',
    name: 'Music',
    icon: Music,
    desc: 'Premium multi-speaker stereo audio system with Bluetooth and AUX connectivity.',
  },
  {
    id: 'amenity-light',
    name: 'Reading Light',
    icon: Lightbulb,
    desc: 'Personal reading spotlights positioned above each seat for nighttime convenience.',
  },
  {
    id: 'amenity-charging',
    name: 'Charging Point',
    icon: BatteryCharging,
    desc: 'Convenient USB and mobile charging points located within reach of all rows.',
  },
  {
    id: 'amenity-luggage',
    name: 'Luggage Compartment',
    icon: Luggage,
    desc: 'Spacious rear luggage boot and secure roof racks to store large travel bags safely.',
  },
]

// SECTION 8: WHY RENT A TEMPO TRAVELLER IN HYDERABAD? (All 8 subsections verbatim)
const WHY_RENT_SECTIONS = [
  {
    number: '1',
    title: 'Perfect for Group Travel',
    content:
      'Tempo Travellers are designed to accommodate groups comfortably, making them ideal for family outings, friends’ getaways, corporate trips, or pilgrimages. With seating capacities ranging from 12 to 28, you can keep everyone together and enjoy the journey as a group.',
  },
  {
    number: '2',
    title: 'Comfort and Convenience',
    content:
      'Modern Tempo Travellers are equipped with plush seating, spacious legroom, air conditioning, and other amenities like charging points and entertainment systems, ensuring a hassle-free and relaxing travel experience.',
  },
  {
    number: '3',
    title: 'Cost-Effective Option',
    content:
      'When traveling in a group, renting a Tempo Traveller is more economical than hiring multiple cabs. It allows you to share costs while enjoying premium travel features.',
  },
  {
    number: '4',
    title: 'Experienced Chauffeurs',
    content:
      'Most rentals come with skilled and professional drivers who are familiar with local and interstate routes. They ensure a smooth and safe journey, so you can relax and focus on enjoying your trip.',
  },
  {
    number: '5',
    title: 'Ideal for Short and Long Distances',
    content:
      'Whether you’re exploring Hyderabad’s attractions like Charminar, Ramoji Film City, or Golconda Fort, or traveling to destinations like Srisailam, Tirupati, or Goa, a Tempo Traveller offers the flexibility to suit both short and long-distance travel plans.',
  },
  {
    number: '6',
    title: 'Customizable Options',
    content:
      'From luxury Maharaja seat variants to budget-friendly models, you can choose a Tempo Traveller that matches your needs and budget. Customizable features ensure the best experience for your group.',
  },
  {
    number: '7',
    title: 'Stress-Free Journey',
    content:
      'With everyone in one vehicle, there’s no need to worry about coordinating multiple cars or losing track of anyone. It simplifies planning and keeps the group together.',
  },
  {
    number: '8',
    title: 'Environmentally Friendly',
    content:
      'Traveling together in a single vehicle reduces the number of cars on the road, making it a more eco-friendly option.',
  },
]

export default function ForceUrbaniaPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Force Urbania Rental in Hyderabad - Apna Cars',
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
    description: 'Luxury 12 seater and 17 seater Force Urbania and Tempo Traveller rentals in Hyderabad with professional drivers for group tours and corporate events.',
    serviceType: 'Luxury Van Rental',
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

        {/* SECTION 2: PROMOTIONAL STRIP */}
        <section className="border-b border-[var(--line)] bg-white py-3.5 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-neutral-900">
                <Sparkles size={14} className="text-amber-500" />
                Brand New Force Urbania Available
              </span>
              <span className="text-[var(--soft)] hidden sm:inline">&bull;</span>
              <span className="text-[var(--soft)] hidden sm:inline">
                12 Seater &amp; 17 Seater Luxury Variants
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[var(--soft)] hidden md:inline">
                Verified Chauffeurs &bull; Commercial Permits
              </span>
              <a
                href="tel:+919988123444"
                className="font-bold text-neutral-900 hover:underline flex items-center gap-1.5"
              >
                <Phone size={13} />
                <span>Helpline: 099881 23444</span>
              </a>
            </div>
          </div>
        </section>

        {/* HERO SECTION */}
        <section className="relative overflow-hidden border-b border-[var(--line)] bg-[var(--paper)] pt-12 pb-20 md:py-24">
          <HighwayStreamCanvas />

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Heading, Subheading, Options, CTAs */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/80 backdrop-blur-sm px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-800 shadow-sm">
                  <Car size={14} className="text-neutral-700" />
                  <span>Next-Generation Luxury Group Travel</span>
                </div>

                <div className="space-y-2">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-neutral-950 leading-[1.12]">
                    Force Urbania Rent in Hyderabad
                  </h1>
                  <h2 className="text-xl sm:text-2xl font-serif font-medium text-neutral-700 italic">
                    Premium 12 &amp; 17 Seater Executive Vans
                  </h2>
                </div>

                <p className="text-base sm:text-lg text-[var(--soft)] max-w-2xl font-normal leading-relaxed">
                  Experience business-class luxury for group travel. Featuring high-roof headroom, individual reclining leather seats, individual AC vents, and advanced highway suspension.
                </p>

                {/* Hero Variant Buttons & CTAs */}
                <UrbaniaHeroCta />

                {/* Metric Strip */}
                <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[var(--line)] max-w-xl">
                  <div>
                    <strong className="block text-xl font-serif text-neutral-900 font-semibold">12 &amp; 17</strong>
                    <span className="text-[11px] text-[var(--soft)] uppercase tracking-wider">Seater Variants</span>
                  </div>
                  <div>
                    <strong className="block text-xl font-serif text-neutral-900 font-semibold">6+ Feet</strong>
                    <span className="text-[11px] text-[var(--soft)] uppercase tracking-wider">Walk-In Height</span>
                  </div>
                  <div>
                    <strong className="block text-xl font-serif text-neutral-900 font-semibold">100%</strong>
                    <span className="text-[11px] text-[var(--soft)] uppercase tracking-wider">Verified Drivers</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Visual Card */}
              <div className="lg:col-span-5">
                <TiltCard3D maxTilt={7}>
                  <div className="relative overflow-hidden rounded-none border border-[var(--line)] bg-white p-3 shadow-xl">
                    <div className="relative h-[340px] sm:h-[400px] w-full overflow-hidden bg-neutral-900">
                      <Image
                        src="/images/urbania/urbania-hero.jpg"
                        alt="Force Urbania Luxury Van in Hyderabad - Apna Cars"
                        fill
                        priority
                        className="object-cover object-center"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-5 left-5 right-5 text-white">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                          Executive Class Travel
                        </span>
                        <h3 className="text-xl font-serif font-medium text-white m-0">
                          Force Urbania Luxury Van
                        </h3>
                        <p className="text-xs text-neutral-300 mt-1 m-0">
                          Available for weddings, corporate offsites, and interstate tours.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-[var(--paper)] flex items-center justify-between text-xs text-neutral-700 border-t border-[var(--line)]">
                      <span className="flex items-center gap-1.5 font-medium">
                        <CheckCircle2 size={14} className="text-emerald-600" /> Commercial Transport Permit
                      </span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <CheckCircle2 size={14} className="text-emerald-600" /> Doorstep Pickup
                      </span>
                    </div>
                  </div>
                </TiltCard3D>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: NEW VEHICLE ANNOUNCEMENT */}
        <section className="py-16 bg-white border-b border-[var(--line)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="border border-[var(--line)] bg-[var(--paper)] p-8 sm:p-10 shadow-sm relative">
              <span className="inline-block rounded-full bg-neutral-900 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white mb-4">
                Fleet Expansion Announcement
              </span>
              
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-neutral-900 mb-4">
                Brand New Variants in Tempo Travellers &amp; Luxury Vans
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-[var(--soft)] leading-relaxed">
                <p>
                  We’re excited to announce the addition of new variants in Tempo Travellers to our fleet! These vehicles are designed to offer ultimate comfort and style for your travel needs, whether it’s a family vacation, a group tour, or a corporate outing.
                </p>
                <p>
                  Stay tuned as we reveal more details about these new additions, crafted to ensure your journeys are memorable, safe, and seamless.
                </p>
                <p className="font-serif italic text-neutral-900 text-sm sm:text-base pt-2">
                  Choose Apna Cars — Where Every Journey Matters!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: POPULAR FORCE URBANIA RIDES FROM HYDERABAD */}
        <section id="popular-rides" className="py-20 bg-[var(--paper)] border-b border-[var(--line)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft)] block mb-2">
                Curated Travel Corridors
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-neutral-900 tracking-tight">
                Popular Force Urbania Rides From Hyderabad
              </h2>
              <p className="text-sm sm:text-base text-[var(--soft)] mt-3 leading-relaxed">
                Explore premier city and interstate travel corridors frequently booked by our corporate and family clients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {URBANIA_ROUTES.map((route) => (
                <TiltCard3D key={route.id} maxTilt={6} className="h-full">
                  <div className="fleet-card flex h-full flex-col justify-between overflow-hidden bg-white border border-[var(--line)] shadow-sm hover:shadow-xl transition-all">
                    <div className="relative h-48 w-full overflow-hidden bg-neutral-900 border-b border-[var(--line)]">
                      <Image
                        src={route.image}
                        alt={`${route.title} - Apna Cars`}
                        fill
                        className="object-cover object-center transition-transform duration-700 hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4">
                        <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-semibold mb-0.5">
                          {route.tag}
                        </span>
                        <h3 className="text-base font-serif font-medium text-white m-0 drop-shadow-sm leading-snug">
                          {route.title}
                        </h3>
                      </div>
                    </div>

                    <div className="p-4 flex flex-col justify-between flex-1 bg-[var(--paper)]">
                      <p className="text-xs text-[var(--soft)] leading-relaxed mb-4">
                        {route.description}
                      </p>

                      <UrbaniaBookingCta label="Book This Ride" />
                    </div>
                  </div>
                </TiltCard3D>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: TYPES OF FORCE URBANIA VEHICLES AVAILABLE IN HYDERABAD */}
        <section id="variants" className="py-20 bg-white border-b border-[var(--line)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft)] block mb-2">
                Seating Configurations
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-neutral-900 tracking-tight">
                Types of Force Urbania Vehicles Available in Hyderabad
              </h2>
              <p className="text-sm sm:text-base text-[var(--soft)] mt-3 leading-relaxed">
                Choose between medium-wheelbase 12-seater and long-wheelbase 17-seater configurations engineered for executive and joint-family comfort.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {URBANIA_VARIANTS.map((variant) => (
                <TiltCard3D key={variant.id} maxTilt={5} className="h-full">
                  <div className="fleet-card flex h-full flex-col justify-between overflow-hidden bg-[var(--paper)] border border-[var(--line)] shadow-sm hover:shadow-xl transition-all">
                    <div>
                      <div className="relative h-64 w-full overflow-hidden bg-neutral-900 border-b border-[var(--line)]">
                        <Image
                          src={variant.image}
                          alt={variant.name}
                          fill
                          className="object-cover object-center transition-transform duration-700 hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className="inline-block rounded-full bg-neutral-900/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white border border-white/20">
                            {variant.capacity}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <h3 className="text-2xl font-serif font-medium text-white m-0">
                            {variant.name}
                          </h3>
                          <span className="text-xs text-neutral-300 font-sans">
                            {variant.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="mb-4">
                          <span className="block text-[10px] font-bold uppercase tracking-wider text-[var(--soft)] mb-3">
                            Key Specifications &amp; Features
                          </span>
                          <ul className="space-y-2.5 text-xs text-[var(--soft)] list-none p-0">
                            {variant.features.map((feat, i) => (
                              <li key={i} className="flex items-start gap-2.5">
                                <Check size={14} className="shrink-0 text-emerald-600 mt-0.5" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 bg-white border border-[var(--line)] text-xs text-neutral-700 rounded-none mb-2">
                          <strong className="block text-neutral-900 mb-1">Recommended for:</strong>
                          <span>{variant.bestFor}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-[var(--line)]/60 bg-[var(--paper)] mt-auto">
                      <div className="flex items-center justify-between pt-4 mb-4">
                        <div>
                          <span className="block text-[10px] uppercase tracking-wider text-[var(--soft)] font-bold">
                            Rental Tariff
                          </span>
                          <div className="text-sm font-semibold text-neutral-900">
                            Quote on Request
                          </div>
                        </div>
                        <span className="text-xs text-neutral-600">
                          {variant.luggage}
                        </span>
                      </div>

                      <UrbaniaBookingCta label={`Book ${variant.name}`} />
                    </div>
                  </div>
                </TiltCard3D>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: TEMPO TRAVELLER FOR RENT IN HYDERABAD */}
        <section className="py-20 bg-[var(--paper)] border-b border-[var(--line)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft)] block mb-2">
                Executive Group Travel
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-neutral-900 tracking-tight">
                Tempo Traveller for Rent in Hyderabad
              </h2>
            </div>

            <div className="border border-[var(--line)] bg-white p-8 sm:p-10 shadow-sm">
              <p className="text-sm sm:text-base text-[var(--soft)] leading-relaxed font-normal m-0">
                Tempo travellers on rent in Hyderabad are excellent for going on short and long-distance trips in and around Hyderabad. They are luxurious and have all the facilities to make the passengers’ journey comfortable. One can go on a group tour with their family and friends or leave for an official event with their colleagues, tempo travellers have endless travel options to explore
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 7: AMENITIES AVAILABLE ON A TEMPO TRAVELLER IN HYDERABAD */}
        <section id="amenities" className="py-20 bg-white border-b border-[var(--line)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft)] block mb-2">
                Luxury Inclusions
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-neutral-900 tracking-tight">
                Amenities Available on a Tempo traveller in Hyderabad
              </h2>
              <p className="text-sm sm:text-base text-[var(--soft)] mt-3 leading-relaxed">
                Enjoy premium on-board amenities crafted for supreme passenger convenience across short city transfers and long highway tours.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {AMENITIES.map((amenity) => {
                const IconComponent = amenity.icon
                return (
                  <div
                    key={amenity.id}
                    className="p-6 bg-[var(--paper)] border border-[var(--line)] hover:border-neutral-900 transition-colors"
                  >
                    <div className="flex h-12 w-12 items-center justify-center bg-white border border-[var(--line)] text-neutral-900 mb-4 shadow-sm">
                      <IconComponent size={22} />
                    </div>
                    <h3 className="text-base font-serif font-medium text-neutral-900 mb-2">
                      {amenity.name}
                    </h3>
                    <p className="text-xs text-[var(--soft)] leading-relaxed m-0">
                      {amenity.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* SECTION 8: WHY RENT A TEMPO TRAVELLER IN HYDERABAD? */}
        <section className="py-20 bg-[var(--paper)] border-b border-[var(--line)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft)] block mb-2">
                Smart Group Mobility
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-neutral-900 tracking-tight">
                Why Rent a Tempo Traveller in Hyderabad?
              </h2>
              <div className="space-y-4 text-sm text-[var(--soft)] mt-4 leading-relaxed">
                <p>
                  Hyderabad is a progressive city with a high population, resulting in massive road traffics. And traveling in your vehicle in such situations just adds to the problem. If you are a large group of 12-18 people, booking a tempo traveller on rent in Hyderabad for your travel is a wise decision. Tempo travellers are affordable, personalized, comfortable, and quite safe to travel.
                </p>
                <p>
                  Renting a Tempo Traveller in Hyderabad is an ideal solution for group travel, whether you’re exploring the city’s iconic landmarks or heading to nearby destinations. Here’s why it’s a smart choice:
                </p>
              </div>
            </div>

            {/* All 8 subsections verbatim */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {WHY_RENT_SECTIONS.map((sec) => (
                <div key={sec.number} className="p-6 bg-white border border-[var(--line)]">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900 text-white font-mono text-xs font-bold">
                      {sec.number}
                    </span>
                    <h3 className="text-base font-serif font-medium text-neutral-900 m-0">
                      {sec.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--soft)] leading-relaxed m-0">
                    {sec.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: BOOKING CTA */}
        <section className="py-16 bg-neutral-900 text-white border-b border-neutral-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-white mb-4">
              Book Your Tempo Traveller Today!
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 mb-8 max-w-xl mx-auto leading-relaxed">
              Whether it’s a weekend getaway, a corporate retreat, or a pilgrimage, renting a Tempo Traveller in Hyderabad ensures a memorable and seamless travel experience.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <UrbaniaBookingCta label="Book Your Tempo Traveller Today!" />
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

        {/* SECTION 10: FORCE URBANIA RENT IN HYDERABAD — MAIN DESCRIPTION */}
        <section className="py-20 bg-white border-b border-[var(--line)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft)] block mb-2">
              Next-Generation Passenger Mobility
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-neutral-900 tracking-tight mb-6">
              Force Urbania Rent in Hyderabad
            </h2>

            <div className="prose prose-neutral max-w-none text-xs sm:text-sm text-[var(--soft)] leading-relaxed space-y-4">
              <p>
                Force Urbania on Rent in Hyderabad is the ultimate choice for travelers who seek a premium, business-class experience combined with the convenience of group travel. Offered by Apna Cars, the Force Urbania represents a new generation of luxury vans, perfectly suited for corporate clients, families, wedding groups, VIP movements, and long-distance travel. With seating capacities ranging from 10 to 17 passengers, Urbania offers unmatched comfort through spacious, reclining leather seats, individual AC vents, ambient LED lighting, and a high-roof design that provides extra headroom and a relaxed atmosphere.
              </p>
              <p>
                Whether you’re planning a high-profile guest pickup from Rajiv Gandhi International Airport, a corporate offsite in the outskirts, or a multi-day pilgrimage to destinations like Tirupati, Srisailam, or Shirdi, Force Urbania ensures a smooth, quiet, and comfortable journey for everyone onboard. Its modern features—including ABS, EBD, cruise control (in select models), noise-insulated interiors, and advanced suspension—make it a standout option for luxury travel in both city and highway conditions.
              </p>
              <p>
                Apna Cars provides Urbania vans that are immaculately maintained, fully insured, and driven by experienced, uniformed chauffeurs who prioritize safety, punctuality, and customer service. We offer flexible rental options—hourly, daily, and multi-day packages—tailored to your itinerary, with transparent pricing and no hidden costs. Whether you’re transporting executives to an event, welcoming international guests, or taking your family on a comfortable vacation, booking a Force Urbania in Hyderabad through us guarantees elegance, efficiency, and ease throughout your journey.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 11: FOOTER */}
        <Footer />
      </div>
    </BookingModalProvider>
  )
}
