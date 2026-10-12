import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { 
  ArrowRight, 
  Phone, 
  MessageCircle, 
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
  Navigation
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FaqAccordion } from '@/components/ui/faq-accordion'

export const metadata: Metadata = {
  title: 'Hyderabad to Srisailam Cab Service | Round Trip Car Rental | Apna Cars',
  description: 'Book Hyderabad to Srisailam round-trip cabs with Apna Cars. Clean fleet of Dzire, Etios, Ertiga, Innova Crysta & Tempo Traveller with experienced ghat drivers. Get a transparent quote today.',
  alternates: {
    canonical: 'https://apnacarrental.com/srisailam-cabs',
  },
  openGraph: {
    title: 'Hyderabad to Srisailam Cab Service | Apna Cars',
    description: 'Comfortable Hyderabad to Srisailam cab service for temple darshan, sight-seeing, and family road trips through Nallamala Forest.',
    url: 'https://apnacarrental.com/srisailam-cabs',
    siteName: 'Apna Car Rental',
    images: [
      {
        url: '/images/srisailam/hero.jpg',
        width: 1200,
        height: 675,
        alt: 'Hyderabad to Srisailam cab service - Apna Cars',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
}

const TOUR_PACKAGES = [
  {
    id: '1-day',
    title: '1-Day Srisailam Same-Day Tour',
    badge: 'Same-Day Darshan',
    duration: '1 Day (approx. 14–16 hrs)',
    distance: '~460–500 km Round Trip',
    image: '/images/srisailam/mallikarjuna-temple.jpg',
    summary: 'Ideal for pilgrims seeking a quick, focused darshan of Mallikarjuna Swamy and Bhramaramba Devi with evening return to Hyderabad.',
    highlights: [
      'Early morning pickup from Hyderabad doorstep (4:00 AM – 5:00 AM)',
      'Scenic drive through Dindi & Nallamala Tiger Reserve forest ghats',
      'VIP or Special Darshan assistance window at Srisailam Temple',
      'Visits to Sakshi Ganapathi & Srisailam Dam view',
      'Same-day late evening return to Hyderabad'
    ],
    priceText: 'Price on Request',
    quoteMsg: 'Hi Apna Cars, I want a quote for 1-Day Hyderabad to Srisailam tour.',
  },
  {
    id: '2-day',
    title: '2-Day Relaxed Srisailam Pilgrimage & Sightseeing',
    badge: 'Most Popular',
    duration: '2 Days / 1 Night',
    distance: '~500–550 km Total Trip',
    image: '/images/srisailam/srisailam-dam.jpg',
    summary: 'A leisurely, family-friendly tour covering all sacred shrines, Krishna river boating, dam viewpoints, and natural forest attractions.',
    highlights: [
      'Flexible Hyderabad pickup with breakfast stopover en route',
      'Suprabhata Seva or evening Abhishekam at Mallikarjuna Temple',
      'Boat ride at Paatala Ganga & ropeway experience',
      'Excursions to Paladhara Panchadhara, Hatkeshwar & Octopus View Point',
      'Safe overnight stay in Srisailam with leisurely Day 2 return'
    ],
    priceText: 'Price on Request',
    quoteMsg: 'Hi Apna Cars, I want a quote for 2-Day Hyderabad to Srisailam relaxed tour.',
  },
]

const PLACES_TO_VISIT = [
  {
    id: 'mallikarjuna',
    name: 'Mallikarjuna Swamy Temple',
    subtitle: '2nd Jyotirlinga of Lord Shiva',
    image: '/images/srisailam/mallikarjuna-temple.jpg',
    desc: 'One of the twelve sacred Jyotirlingas, ancient Dravidian architecture celebrated by saints and dynasties for over a millennium.',
  },
  {
    id: 'bhramaramba',
    name: 'Bhramaramba Devi Temple',
    subtitle: 'Sacred Shakti Peetham',
    image: '/images/srisailam/bhramaramba-temple.jpg',
    desc: 'One of the 18 Maha Shakti Peethas situated inside the temple complex, enshrining Mother Parvati in her divine bee incarnation.',
  },
  {
    id: 'sakshi-ganapathi',
    name: 'Sakshi Ganapathi Temple',
    subtitle: 'The Divine Witness',
    image: '/images/srisailam/sakshi-ganapathi.jpg',
    desc: 'Located about 3 km before the town; pilgrims register their holy visit before Sakshi Ganapathi, holding a sacred stylus and book.',
  },
  {
    id: 'paladhara-panchadhara',
    name: 'Paladhara Panchadhara',
    subtitle: 'Pristine Natural Streams',
    image: '/images/srisailam/paladhara-panchadhara.jpg',
    desc: 'A serene valley spot where Adi Shankaracharya meditated and composed the Sivananda Lahari, flanked by natural cascading springs.',
  },
  {
    id: 'hatkeshwar',
    name: 'Hatkeshwar Temple',
    subtitle: 'Ancient Shiva Shrine',
    image: '/images/srisailam/hatkeshwar-temple.jpg',
    desc: 'A tranquil stone temple en route to Srisailam dedicated to Lord Hatkeswara (Shiva), rich with local folklore and tranquil ambience.',
  },
  {
    id: 'srisailam-dam',
    name: 'Srisailam Dam & Reservoir',
    subtitle: 'Krishna River Marvel',
    image: '/images/srisailam/srisailam-dam.jpg',
    desc: 'One of India’s largest hydroelectric dams built in a deep gorge of the Krishna River, offering breathtaking canyon panoramas.',
  },
  {
    id: 'paatala-ganga',
    name: 'Paatala Ganga',
    subtitle: 'Sacred River Ghat & Boating',
    image: '/images/srisailam/paatala-ganga.jpg',
    desc: 'The sacred Krishna riverbed accessible via steps or ropeway car; pilgrims take holy baths and embark on scenic riverboat rides.',
  },
  {
    id: 'octopus-viewpoint',
    name: 'Octopus View Point',
    subtitle: 'Panoramic Krishna Valley',
    image: '/images/srisailam/octopus-viewpoint.jpg',
    desc: 'A spectacular cliffside lookout offering sweeping bird’s-eye views of the Krishna river backwaters sprawling like octopus tentacles.',
  },
  {
    id: 'nallamala-forest',
    name: 'Nallamala Tiger Reserve Ghats',
    subtitle: 'Lush Forest Wilderness',
    image: '/images/srisailam/nallamala-forest.jpg',
    desc: 'A 60-km scenic drive navigating mist-clad hills, deep curves, biodiversity hotspots, and protected tiger reserve corridors.',
  },
  {
    id: 'akkamahadevi-caves',
    name: 'Akkamahadevi Caves',
    subtitle: 'Historic Natural Rock Caves',
    image: '/images/srisailam/akkamahadevi-caves.jpg',
    desc: 'Naturally formed limestone caverns situated deep in the forest, reachable by motorboat along the Krishna River from Paatala Ganga.',
  },
]

const VEHICLES = [
  {
    name: 'Maruti Suzuki Dzire',
    category: 'Compact Sedan',
    seating: '4+1 Passengers',
    luggage: '2 Medium Bags',
    image: '/images/srisailam/swift-dzire.jpg',
    description: 'Fuel-efficient, comfortable, and economical choice for couples and small families visiting the shrine.',
  },
  {
    name: 'Toyota Etios',
    category: 'Spacious Sedan',
    seating: '4+1 Passengers',
    luggage: '3 Large Bags',
    image: '/images/srisailam/toyota-etios.jpg',
    description: 'Renowned for rear seat legroom, generous boot space, and smooth highway stability on long drives.',
  },
  {
    name: 'Maruti Suzuki Ertiga',
    category: 'Comfortable MUV',
    seating: '6+1 Passengers',
    luggage: '3–4 Bags',
    image: '/images/srisailam/maruti-ertiga.jpg',
    description: 'The preferred family vehicle balancing comfortable 3-row seating, great AC airflow, and value pricing.',
  },
  {
    name: 'Toyota Innova',
    category: 'Premium MPV',
    seating: '7+1 Passengers',
    luggage: '4–5 Bags',
    image: '/images/srisailam/toyota-innova.jpg',
    description: 'Legendary Indian highway cruiser offering exceptional ride quality and supreme suspension over hill roads.',
  },
  {
    name: 'Toyota Innova Crysta',
    category: 'Luxury MPV',
    seating: '7+1 Passengers',
    luggage: '5 Large Bags',
    image: '/images/srisailam/innova-crysta.jpg',
    description: 'Plush captain seating, high ground clearance, silent cabin, and unmatched prestige for pilgrimage travel.',
  },
  {
    name: 'Tempo Traveller',
    category: 'Group Minibus',
    seating: '12 to 28 Seater',
    luggage: 'Ample Boot Space',
    image: '/images/srisailam/tempo-traveller.jpg',
    description: 'Custom-configured luxury coaches with pushback seats, individual AC vents, and high roof for family groups.',
  },
]

const FAQS = [
  {
    id: 'faq-1',
    question: 'What is the distance and travel time from Hyderabad to Srisailam?',
    answer: 'The one-way driving distance between Hyderabad and Srisailam is approximately 215 to 230 km depending on your city pickup location. Normal travel time is roughly 4.5 to 5.5 hours, including the scenic ghat stretch across the Nallamala forest.',
  },
  {
    id: 'faq-2',
    question: 'How does round-trip pricing and the 500 km allowance work?',
    answer: 'A standard Hyderabad to Srisailam round-trip package typically includes an indicative allowance of 500 km covering pickup, drop, and primary local temple points. Exact rates and any extra kilometer charges are custom-quoted before your trip without hidden markups.',
  },
  {
    id: 'faq-3',
    question: 'Are night entry restrictions active on the Nallamala forest road?',
    answer: 'Yes. The Andhra Pradesh / Telangana forest department restricts vehicular transit through the Mannanur / Domalapenta checkposts between 9:00 PM and 6:00 AM for wildlife safety. Our experienced drivers plan pickup and departure timings to ensure smooth passage before gates close.',
  },
  {
    id: 'faq-4',
    question: 'What is included in the cab quotation?',
    answer: 'Your custom quote clearly outlines vehicle rental, chauffeur allowance, fuel charges, and standard route kilometers. Inter-state border permit tax, toll gates, and local parking fees are transparently itemized upon request.',
  },
  {
    id: 'faq-5',
    question: 'Can we customize stops for sightseeing or special darshan timings?',
    answer: 'Absolutely. Whether you wish to halt at Dindi Reservoir, visit Sakshi Ganapathi, or synchronize with scheduled temple Abhishekam tickets, our courteous chauffeurs adjust the itinerary to match your family’s comfort.',
  },
  {
    id: 'faq-6',
    question: 'How do I book an Apna Cars cab for Srisailam?',
    answer: 'You can tap "Chat on WhatsApp" or call our 24/7 travel desk at 099881 23444. Share your pickup address, travel dates, passenger count, and preferred vehicle, and we will send an immediate, transparent quote.',
  },
]

export default function SrisailamCabsPage() {
  const contactPhone = '+919988123444'
  const displayPhone = '099881 23444'
  const defaultWhatsAppUrl = 'https://wa.me/919988123444?text=Hi%20Apna%20Cars,%20I%20would%20like%20to%20inquire%20about%20a%20Hyderabad%20to%20Srisailam%20cab.'

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

  const travelServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: 'Hyderabad to Srisailam Cab Service',
    description: 'Round-trip car rental and pilgrimage cab service from Hyderabad to Srisailam Mallikarjuna Swamy Temple by Apna Cars.',
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
    itinerary: {
      '@type': 'ItemList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Hyderabad Doorstep Pickup' },
        { '@type': 'ListItem', position: 2, name: 'Nallamala Forest & Ghat Road' },
        { '@type': 'ListItem', position: 3, name: 'Srisailam Mallikarjuna Swamy Temple' },
        { '@type': 'ListItem', position: 4, name: 'Bhramaramba Devi Temple' },
        { '@type': 'ListItem', position: 5, name: 'Srisailam Dam & Paatala Ganga' },
        { '@type': 'ListItem', position: 6, name: 'Return to Hyderabad' },
      ],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(travelServiceSchema) }}
      />

      <Header />

      <main className="min-h-screen bg-[#f7f7f5] text-[#111]">
        {/* HERO SECTION */}
        <section className="relative min-h-[640px] md:min-h-[720px] flex items-center overflow-hidden bg-[#161616] text-white">
          <Image
            src="/images/srisailam/hero.jpg"
            alt="Hyderabad to Srisailam cab service with views of Srisailam temple and Nallamala forest"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />

          <div className="relative z-10 max-w-5xl mx-auto px-6 py-28 md:py-36 w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs uppercase tracking-widest text-emerald-300 font-semibold mb-6">
              <Sparkles size={13} />
              <span>Devotional Pilgrimage & Sightseeing Tour</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] max-w-3xl mb-6">
              Hyderabad to Srisailam <span className="font-serif font-normal italic text-amber-200">Cab Service</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl leading-relaxed mb-10">
              Embark on a serene pilgrimage to the sacred Mallikarjuna Jyotirlinga and Bhramaramba Shakti Peetham. 
              Doorstep pickup, verified ghat-trained drivers, sanitised vehicles, and transparent quotes.
            </p>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <a
                href={defaultWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-transform hover:-translate-y-0.5 shadow-lg shadow-emerald-900/40"
              >
                <MessageCircle size={18} />
                <span>Book via WhatsApp</span>
              </a>

              <a
                href={`tel:${contactPhone}`}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white text-black hover:bg-neutral-100 font-bold text-xs uppercase tracking-wider rounded-sm transition-transform hover:-translate-y-0.5 shadow-md"
              >
                <Phone size={17} />
                <span>Call {displayPhone}</span>
              </a>

              <Link
                href="#packages"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-xs uppercase tracking-widest font-semibold text-neutral-300 hover:text-white transition-colors"
              >
                <span>View Packages</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Quick Trip Indicators */}
            <div className="mt-14 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-neutral-300">
              <div>
                <span className="text-neutral-400 block uppercase tracking-wider text-[10px]">Approx Distance</span>
                <strong className="text-white text-sm">~215 km (One-Way)</strong>
              </div>
              <div>
                <span className="text-neutral-400 block uppercase tracking-wider text-[10px]">Travel Time</span>
                <strong className="text-white text-sm">4.5 – 5.5 Hours</strong>
              </div>
              <div>
                <span className="text-neutral-400 block uppercase tracking-wider text-[10px]">Route Route</span>
                <strong className="text-white text-sm">Via ORR & Nallamala</strong>
              </div>
              <div>
                <span className="text-neutral-400 block uppercase tracking-wider text-[10px]">Pickup Option</span>
                <strong className="text-white text-sm">Doorstep Anywhere in Hyd</strong>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST BANNER */}
        <section className="bg-white border-b border-[#d8d8d2]">
          <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5">
              <ShieldCheck className="text-emerald-700 shrink-0" size={28} />
              <div>
                <strong className="block text-xs uppercase tracking-wider text-black">Ghat-Trained Chauffeurs</strong>
                <span className="text-xs text-neutral-500">Safe hill curves & forest drive</span>
              </div>
            </div>
            <div className="flex items-center gap-3.5">
              <Car className="text-emerald-700 shrink-0" size={28} />
              <div>
                <strong className="block text-xs uppercase tracking-wider text-black">Well-Maintained Fleet</strong>
                <span className="text-xs text-neutral-500">AC sedans, MUVs & travellers</span>
              </div>
            </div>
            <div className="flex items-center gap-3.5">
              <Clock className="text-emerald-700 shrink-0" size={28} />
              <div>
                <strong className="block text-xs uppercase tracking-wider text-black">Punctual Pickups</strong>
                <span className="text-xs text-neutral-500">Early 4 AM door pickups on time</span>
              </div>
            </div>
            <div className="flex items-center gap-3.5">
              <Compass className="text-emerald-700 shrink-0" size={28} />
              <div>
                <strong className="block text-xs uppercase tracking-wider text-black">Flexible Itinerary</strong>
                <span className="text-xs text-neutral-500">Custom halts for darshan & food</span>
              </div>
            </div>
          </div>
        </section>

        {/* TOUR PACKAGES SECTION */}
        <section id="packages" className="py-20 px-6 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-neutral-500 mb-2">Curated Itineraries</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
                Srisailam <span className="font-serif italic font-normal">Tour Packages</span>
              </h2>
            </div>
            <p className="text-sm text-neutral-600 max-w-md">
              Choose between an efficient single-day pilgrimage or a relaxed 2-day family vacation exploring both temples and natural wonders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TOUR_PACKAGES.map((pkg) => (
              <div 
                key={pkg.id} 
                className="bg-white border border-[#d8d8d2] flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="relative h-64 w-full bg-neutral-200">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-amber-300 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
                      {pkg.badge}
                    </div>
                  </div>

                  <div className="p-7">
                    <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 mb-3">
                      <span className="flex items-center gap-1.5"><Calendar size={14} /> {pkg.duration}</span>
                      <span className="flex items-center gap-1.5"><Navigation size={14} /> {pkg.distance}</span>
                    </div>

                    <h3 className="text-2xl font-medium tracking-tight text-neutral-950 mb-3">
                      {pkg.title}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                      {pkg.summary}
                    </p>

                    <div className="border-t border-[#e9e9e5] pt-5">
                      <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-500 block mb-3">Trip Highlights:</span>
                      <ul className="space-y-2 text-xs text-neutral-700">
                        {pkg.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-7 pt-0 bg-white">
                  <div className="border-t border-[#e9e9e5] pt-5 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">Package Fare</span>
                      <strong className="text-lg font-semibold text-neutral-900">{pkg.priceText}</strong>
                    </div>
                    <a
                      href={`https://wa.me/919988123444?text=${encodeURIComponent(pkg.quoteMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 bg-black hover:bg-neutral-800 text-white text-xs uppercase tracking-wider font-bold rounded-sm transition-transform hover:translate-x-0.5"
                    >
                      <span>Get a Quote</span>
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-[#f0f0ec] border border-[#d8d8d2] text-xs text-neutral-600 rounded-sm flex items-center justify-between flex-wrap gap-3">
            <span>* All tour packages are customizable according to your preferred pickup time, darshan slots, and hotel halts.</span>
            <span className="font-semibold text-neutral-900">Customized multi-day temple circuits also available on request.</span>
          </div>
        </section>

        {/* PLACES TO VISIT IN SRISAILAM */}
        <section className="py-20 px-6 bg-[#ebece8] border-y border-[#d8d8d2]">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-neutral-500 mb-2">Sacred & Scenic Spots</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
                  Places to Visit <span className="font-serif italic font-normal">in Srisailam</span>
                </h2>
              </div>
              <p className="text-sm text-neutral-600 max-w-md">
                From ancient sanctums atop the Nallamala range to misty gorges and river ghats, explore the top 10 attractions with Apna Cars.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PLACES_TO_VISIT.map((place) => (
                <div 
                  key={place.id}
                  className="bg-white border border-[#d8d8d2] overflow-hidden flex flex-col group hover:border-neutral-400 transition-colors"
                >
                  <div className="relative h-48 w-full bg-neutral-200 overflow-hidden">
                    <Image
                      src={place.image}
                      alt={place.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-emerald-800 font-bold block mb-1">
                        {place.subtitle}
                      </span>
                      <h3 className="text-lg font-medium tracking-tight text-neutral-950 mb-2">
                        {place.name}
                      </h3>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        {place.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AVAILABLE VEHICLES FLEET */}
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-neutral-500 mb-2">Our Dedicated Fleet</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
                Available <span className="font-serif italic font-normal">Vehicles</span>
              </h2>
            </div>
            <p className="text-sm text-neutral-600 max-w-md">
              Choose the ideal ride for your group size. Every vehicle is thoroughly inspected, air-conditioned, and chauffeured by courteous hill drivers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VEHICLES.map((v) => (
              <div 
                key={v.name}
                className="bg-white border border-[#d8d8d2] flex flex-col justify-between overflow-hidden shadow-sm"
              >
                <div>
                  <div className="relative h-48 w-full bg-neutral-100 p-4">
                    <Image
                      src={v.image}
                      alt={v.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm text-neutral-800">
                      {v.category}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-medium tracking-tight text-neutral-950 mb-2">
                      {v.name}
                    </h3>
                    
                    <div className="flex items-center gap-3 text-xs text-neutral-600 mb-3">
                      <span className="flex items-center gap-1 font-semibold text-neutral-800">
                        <Users size={14} className="text-emerald-700" /> {v.seating}
                      </span>
                      <span>&bull;</span>
                      <span>{v.luggage}</span>
                    </div>

                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="border-t border-[#e9e9e5] pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">Round-Trip Rate</span>
                      <span className="text-xs font-semibold text-neutral-800">Price on Request</span>
                    </div>
                    <a
                      href={`https://wa.me/919988123444?text=${encodeURIComponent(`Hi Apna Cars, please provide a quote for ${v.name} (${v.seating}) for Hyderabad to Srisailam.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-[11px] uppercase tracking-wider font-bold rounded-sm transition-transform hover:translate-x-0.5"
                    >
                      <span>Get a Quote</span>
                      <ArrowRight size={13} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-neutral-500">
            * Seating configurations and vehicle models are subject to confirmation at the time of quotation. We do not claim instant live fleet availability without booking confirmation.
          </p>
        </section>

        {/* TRIP DETAILS & REFERENCE INFORMATION */}
        <section className="py-20 px-6 bg-neutral-900 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-12">
              <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-amber-300 mb-2">Trip Specifications</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4">
                Hyderabad to Srisailam <span className="font-serif italic font-normal text-amber-200">Trip Details</span>
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Clear reference information to help you plan your pilgrimage schedule. All trip details and kilometer allocations will be verified with your Apna Cars booking representative prior to travel.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-neutral-800/80 border border-neutral-700/80 rounded-sm">
                <div className="text-emerald-400 mb-3"><MapPin size={24} /></div>
                <h3 className="text-lg font-medium mb-2">Route & Distance</h3>
                <p className="text-xs text-neutral-300 leading-relaxed mb-3">
                  Approx. 215–230 km one-way from Hyderabad via Nehru Outer Ring Road, Kalwakurthy, Dindi, and Munnanur.
                </p>
                <div className="text-[11px] font-semibold text-amber-300 border-t border-neutral-700 pt-2">
                  Reference Round-Trip Cap: ~500 km
                </div>
              </div>

              <div className="p-6 bg-neutral-800/80 border border-neutral-700/80 rounded-sm">
                <div className="text-emerald-400 mb-3"><Clock size={24} /></div>
                <h3 className="text-lg font-medium mb-2">Driving Duration</h3>
                <p className="text-xs text-neutral-300 leading-relaxed mb-3">
                  Approximately 4.5 to 5.5 hours under standard traffic conditions, with a 30-minute breakfast or refreshment break en route.
                </p>
                <div className="text-[11px] font-semibold text-amber-300 border-t border-neutral-700 pt-2">
                  Recommended Start: 4:30 AM – 5:30 AM
                </div>
              </div>

              <div className="p-6 bg-neutral-800/80 border border-neutral-700/80 rounded-sm">
                <div className="text-emerald-400 mb-3"><ShieldCheck size={24} /></div>
                <h3 className="text-lg font-medium mb-2">Forest Gate Timings</h3>
                <p className="text-xs text-neutral-300 leading-relaxed mb-3">
                  Nallamala Tiger Reserve forest gates (Mannanur / Domalapenta) close strictly for night transit between 9:00 PM and 6:00 AM.
                </p>
                <div className="text-[11px] font-semibold text-amber-300 border-t border-neutral-700 pt-2">
                  Transit Managed by Driver
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-neutral-800/50 border border-neutral-700 text-xs text-neutral-400 rounded-sm">
              <strong className="text-neutral-200">Note:</strong> Round-trip kilometer packages typically include an indicative 500 km threshold. Any extra kilometers or unforeseen detour mileage beyond agreed local sightseeing will be billed at the standard per-kilometer rate confirmed in your Apna Cars quotation.
            </div>
          </div>
        </section>

        {/* INCLUSIONS & EXCLUSIONS */}
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-neutral-500 mb-2">Clear Expectations</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
                Inclusions & <span className="font-serif italic font-normal">Exclusions</span>
              </h2>
            </div>
            <p className="text-sm text-neutral-600 max-w-md">
              We uphold transparent pricing with zero surprise charges. Here is what is covered and what remains payable as per government norms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Inclusions */}
            <div className="bg-white border border-[#d8d8d2] p-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800">
                  <CheckCircle2 size={18} />
                </div>
                <h3 className="text-xl font-medium">Standard Quotation Includes</h3>
              </div>

              <ul className="space-y-4 text-xs text-neutral-700">
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-neutral-900">Dedicated Vehicle & Fuel</strong>
                    <span>Complete fuel charges for the round trip up to agreed package kilometers.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-neutral-900">Professional Chauffeur Service</strong>
                    <span>Experienced driver allowance, food allowance, and daytime operating fees.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-neutral-900">Doorstep Pickup & Drop-Off</strong>
                    <span>Pickup directly from your residence, hotel, or Rajiv Gandhi International Airport (RGIA).</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-neutral-900">Local Sightseeing Coverage</strong>
                    <span>Visits to Mallikarjuna Temple, Bhramaramba Temple, Sakshi Ganapathi, and Srisailam Dam.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Exclusions */}
            <div className="bg-white border border-[#d8d8d2] p-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-800">
                  <XCircle size={18} />
                </div>
                <h3 className="text-xl font-medium">Payable Directly / Excluded</h3>
              </div>

              <ul className="space-y-4 text-xs text-neutral-700">
                <li className="flex items-start gap-3">
                  <XCircle size={16} className="text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-neutral-900">Highway Tolls & Parking Charges</strong>
                    <span>National Highway toll plazas and temple parking receipts are payable at actuals.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle size={16} className="text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-neutral-900">Interstate Permit Tax (If applicable)</strong>
                    <span>Commercial vehicle Andhra Pradesh entry permit fee (can be bundled into total quote on request).</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle size={16} className="text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-neutral-900">Temple Darshan Tickets & Puja Fees</strong>
                    <span>Special entry tickets, Seva passes, or ropeway charges purchased directly from Devasthanam.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle size={16} className="text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-neutral-900">Driver Night Stay Allowance</strong>
                    <span>Applicable only on multi-day itineraries where the driver halts overnight in Srisailam.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE APNA CARS */}
        <section className="py-20 px-6 bg-[#ebece8] border-y border-[#d8d8d2]">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-neutral-500 mb-2">Our Standards</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
                  Why Choose <span className="font-serif italic font-normal">Apna Cars?</span>
                </h2>
              </div>
              <p className="text-sm text-neutral-600 max-w-md">
                We combine personalized service with commercial vehicle reliability to ensure your spiritual journey is comfortable and trouble-free.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 border border-[#d8d8d2]">
                <ShieldCheck size={26} className="text-emerald-700 mb-4" />
                <h3 className="text-base font-semibold mb-2">Ghat Driving Experts</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Our chauffeurs navigate hairpin turns and foggy forest stretches on the Srisailam highway weekly with high safety records.
                </p>
              </div>

              <div className="bg-white p-6 border border-[#d8d8d2]">
                <Car size={26} className="text-emerald-700 mb-4" />
                <h3 className="text-base font-semibold mb-2">Immaculate Vehicles</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Every car is thoroughly washed, sanitized, AC-checked, and inspected before each outstation departure from Hyderabad.
                </p>
              </div>

              <div className="bg-white p-6 border border-[#d8d8d2]">
                <Sparkles size={26} className="text-emerald-700 mb-4" />
                <h3 className="text-base font-semibold mb-2">Transparent Fares</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Upfront quotes with itemized inclusions. No unexpected driver demands or unverified surcharges at the end of the trip.
                </p>
              </div>

              <div className="bg-white p-6 border border-[#d8d8d2]">
                <Phone size={26} className="text-emerald-700 mb-4" />
                <h3 className="text-base font-semibold mb-2">24/7 Dedicated Support</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Live dispatch coordinator on WhatsApp and phone to assist with morning pickup coordination, route updates, and queries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ROUTE INFORMATION */}
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-neutral-500 mb-2">Highway Guide</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-6">
                Hyderabad to Srisailam <span className="font-serif italic font-normal">Route Highlights</span>
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                The journey from Hyderabad to Srisailam transitions from modern four-lane city expressways into the dense deciduous forests of the Nallamala range. 
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-bold shrink-0">1</div>
                  <div>
                    <strong className="block text-xs uppercase tracking-wider text-neutral-900">Nehru Outer Ring Road (ORR) to Srisailam Highway (NH 765)</strong>
                    <span className="text-xs text-neutral-600">Smooth highway run via Tukkuguda exit heading south toward Kalwakurthy.</span>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-bold shrink-0">2</div>
                  <div>
                    <strong className="block text-xs uppercase tracking-wider text-neutral-900">Kalwakurthy & Dindi Reservoir</strong>
                    <span className="text-xs text-neutral-600">Popular breakfast stopover and scenic water catchment view before entering the forest zone.</span>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-bold shrink-0">3</div>
                  <div>
                    <strong className="block text-xs uppercase tracking-wider text-neutral-900">Mannanur Forest Checkpost</strong>
                    <span className="text-xs text-neutral-600">Entry into the protected Amrabad Tiger Reserve; night gate timing strictly observed.</span>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-bold shrink-0">4</div>
                  <div>
                    <strong className="block text-xs uppercase tracking-wider text-neutral-900">Domalapenta & Srisailam Dam Ghat Section</strong>
                    <span className="text-xs text-neutral-600">Scenic curves descending towards the Krishna river dam and climbing up to Srisailam temple town.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-96 lg:h-[480px] w-full bg-neutral-200 border border-[#d8d8d2] overflow-hidden">
              <Image
                src="/images/srisailam/nallamala-forest.jpg"
                alt="Scenic Nallamala Forest road on Hyderabad to Srisailam route"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-md p-4 text-white text-xs rounded-sm">
                <span className="font-semibold block text-emerald-300 mb-1">Scenic Ghat Travel Tip:</span>
                Enjoy misty mornings between July and February. Please avoid feeding wild monkeys along the forest highway.
              </div>
            </div>
          </div>
        </section>

        {/* FAQS SECTION */}
        <section className="py-20 px-6 bg-white border-t border-[#d8d8d2]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-neutral-500 mb-2">Got Questions?</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4">
                Frequently Asked <span className="font-serif italic font-normal">Questions</span>
              </h2>
              <p className="text-sm text-neutral-600 max-w-lg mx-auto">
                Everything you need to know about booking, route conditions, vehicle options, and timings for your Srisailam trip.
              </p>
            </div>

            <FaqAccordion items={FAQS} />
          </div>
        </section>

        {/* FINAL CALL TO ACTION */}
        <section className="relative py-28 px-6 bg-neutral-950 text-white overflow-hidden text-center">
          <Image
            src="/images/srisailam/roadtrip.png"
            alt="Scenic road trip visual for Srisailam pilgrimage"
            fill
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="relative z-10 max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-300 mb-4">
              Begin Your Spiritual Journey
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-6">
              Plan Your Srisailam <span className="font-serif italic font-normal text-amber-200">Trip Today</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-10 max-w-xl mx-auto">
              Contact our Hyderabad travel desk for an instant quotation. Whether for senior citizens, family groups, or corporate pilgrimages, we guarantee peaceful travel.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <a
                href={defaultWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-sm shadow-xl shadow-emerald-950/60 transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle size={18} />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${contactPhone}`}
                className="inline-flex items-center gap-2.5 px-7 py-4 bg-white text-black hover:bg-neutral-100 font-bold text-xs uppercase tracking-wider rounded-sm shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <Phone size={17} />
                <span>Call {displayPhone}</span>
              </a>
            </div>

            <p className="text-xs text-neutral-400 mt-8">
              Available 24/7 &bull; Hyderabad Doorstep Pickup &bull; Sanitized AC Vehicles
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
