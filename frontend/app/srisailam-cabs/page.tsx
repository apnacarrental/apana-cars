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
  Navigation
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FaqAccordion } from '@/components/ui/faq-accordion'
import { HighwayStreamCanvas } from '@/components/motion/highway-stream-canvas'
import { TiltCard3D } from '@/components/motion/tilt-card-3d'
import { OutstationCockpitHud } from '@/components/motion/outstation-cockpit-hud'
import { AnimatedHighwayJourney } from '@/components/motion/animated-highway-journey'
import { FloatingActionButtons } from '@/components/ui/floating-action-buttons'
import { BookingModalProvider } from '@/components/ui/smart-booking-modal'
import { OutstationHeroCta } from '@/components/motion/outstation-hero-cta'

export const metadata: Metadata = {
  title: 'Hyderabad to Srisailam Cab Service | Round Trip Car Rental | Apna Cars',
  description: 'Book Hyderabad to Srisailam round-trip cabs with Apna Cars. Clean fleet of Dzire, Etios, Ertiga, Innova Crysta & Tempo Traveller with experienced ghat drivers. Get a transparent quote today.',
  alternates: {
    canonical: 'https://apnacarrental.com/srisailam-cabs',
  },
  openGraph: {
    title: 'Hyderabad to Srisailam Cab Service | Apna Cars',
    description: 'Comfortable Hyderabad to Srisailam cab service for temple darshan, sightseeing, and family road trips through Nallamala Forest.',
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
    summary: 'Ideal for pilgrims seeking a quick, focused darshan of Mallikarjuna Swamy and Bhramaramba Devi with same-evening return to Hyderabad.',
    highlights: [
      'Early morning doorstep pickup in Hyderabad (4:00 AM – 5:00 AM)',
      'Scenic highway drive via Kalwakurthy, Dindi & Nallamala Tiger Reserve ghats',
      'Dedicated time for Mallikarjuna Jyotirlinga & Bhramaramba Devi Darshan',
      'Sightseeing halts at Sakshi Ganapathi & Srisailam Dam viewpoints',
      'Comfortable evening return trip back to Hyderabad'
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
    summary: 'A leisurely, family-friendly pilgrimage covering sacred shrines, Krishna river boating, ropeway, and scenic forest attractions.',
    highlights: [
      'Flexible Hyderabad pickup with breakfast stopover en route',
      'Special darshan or evening Abhishekam at Mallikarjuna Temple',
      'Paatala Ganga ropeway & Krishna river boating experience',
      'Visits to Paladhara Panchadhara, Hatkeshwar & Octopus View Point',
      'Overnight stay in Srisailam with relaxed Day 2 return'
    ],
    priceText: 'Price on Request',
    quoteMsg: 'Hi Apna Cars, I want a quote for 2-Day Hyderabad to Srisailam relaxed tour.',
  },
]

const PLACES_TO_VISIT = [
  {
    id: 'mallikarjuna',
    num: '01',
    name: 'Mallikarjuna Swamy Temple',
    subtitle: '2nd Jyotirlinga of Lord Shiva',
    image: '/images/srisailam/mallikarjuna-temple.jpg',
    desc: 'One of the twelve sacred Jyotirlingas, ancient Dravidian stone architecture celebrated by saints and dynasties for over a millennium.',
  },
  {
    id: 'bhramaramba',
    num: '02',
    name: 'Bhramaramba Devi Temple',
    subtitle: 'Sacred Shakti Peetham',
    image: '/images/srisailam/bhramaramba-temple.jpg',
    desc: 'One of the 18 Maha Shakti Peethas located within the temple complex, enshrining Mother Parvati in her divine bee incarnation.',
  },
  {
    id: 'sakshi-ganapathi',
    num: '03',
    name: 'Sakshi Ganapathi Temple',
    subtitle: 'The Divine Witness',
    image: '/images/srisailam/sakshi-ganapathi.jpg',
    desc: 'Located about 3 km before the town; pilgrims register their holy visit before Sakshi Ganapathi, holding a sacred stylus and book.',
  },
  {
    id: 'paladhara-panchadhara',
    num: '04',
    name: 'Paladhara Panchadhara',
    subtitle: 'Pristine Natural Streams',
    image: '/images/srisailam/paladhara-panchadhara.jpg',
    desc: 'A serene valley spot where Adi Shankaracharya meditated and composed the Sivananda Lahari, flanked by perennial forest springs.',
  },
  {
    id: 'hatkeshwar',
    num: '05',
    name: 'Hatkeshwar Temple',
    subtitle: 'Ancient Shiva Shrine',
    image: '/images/srisailam/hatkeshwar-temple.jpg',
    desc: 'A tranquil stone temple en route to Srisailam dedicated to Lord Hatkeswara (Shiva), rich with local folklore and peaceful atmosphere.',
  },
  {
    id: 'srisailam-dam',
    num: '06',
    name: 'Srisailam Dam & Reservoir',
    subtitle: 'Krishna River Marvel',
    image: '/images/srisailam/srisailam-dam.jpg',
    desc: 'One of India’s largest hydroelectric dams built across the deep gorge of the Krishna River, providing magnificent canyon views.',
  },
  {
    id: 'paatala-ganga',
    num: '07',
    name: 'Paatala Ganga',
    subtitle: 'Sacred River Ghat & Boating',
    image: '/images/srisailam/paatala-ganga.jpg',
    desc: 'The holy Krishna riverbed accessible via stone steps or cable car ropeway; pilgrims take holy baths and scenic boat rides.',
  },
  {
    id: 'octopus-viewpoint',
    num: '08',
    name: 'Octopus View Point',
    subtitle: 'Panoramic Krishna Valley',
    image: '/images/srisailam/octopus-viewpoint.jpg',
    desc: 'A spectacular cliffside lookout offering panoramic bird’s-eye views of the Krishna river backwaters sprawling like octopus tentacles.',
  },
  {
    id: 'nallamala-forest',
    num: '09',
    name: 'Nallamala Tiger Reserve Ghats',
    subtitle: 'Lush Forest Wilderness',
    image: '/images/srisailam/nallamala-forest.jpg',
    desc: 'A 60-km scenic drive navigating mist-clad hills, deep hairpin curves, biodiversity corridors, and protected forest reserves.',
  },
  {
    id: 'akkamahadevi-caves',
    num: '10',
    name: 'Akkamahadevi Caves',
    subtitle: 'Historic Natural Rock Caves',
    image: '/images/srisailam/akkamahadevi-caves.jpg',
    desc: 'Naturally formed limestone caverns situated deep in the forest, reachable by motorboat along the Krishna River from Paatala Ganga.',
  },
]

const VEHICLES = [
  {
    name: 'Maruti Suzuki Dzire',
    category: 'Executive Sedan',
    seating: '4+1 seats',
    luggage: '2 bags',
    image: '/images/srisailam/swift-dzire.png',
    description: 'Fuel-efficient, comfortable, and economical choice for couples and small families visiting the shrine.',
  },
  {
    name: 'Toyota Etios',
    category: 'Spacious Sedan',
    seating: '4+1 seats',
    luggage: '3 bags',
    image: '/images/srisailam/toyota-etios.png',
    description: 'Renowned for rear seat legroom, generous boot space, and smooth highway stability on long drives.',
  },
  {
    name: 'Maruti Suzuki Ertiga',
    category: 'Comfortable MUV',
    seating: '6+1 seats',
    luggage: '3–4 bags',
    image: '/images/srisailam/maruti-ertiga.jpg',
    description: 'The preferred family vehicle balancing comfortable 3-row seating, great AC airflow, and value pricing.',
  },
  {
    name: 'Toyota Innova',
    category: 'Premium MPV',
    seating: '7+1 seats',
    luggage: '4–5 bags',
    image: '/images/srisailam/toyota-innova.png',
    description: 'Legendary Indian highway cruiser offering exceptional ride quality and supreme suspension over hill roads.',
  },
  {
    name: 'Toyota Innova Crysta',
    category: 'Luxury MPV',
    seating: '7+1 seats',
    luggage: '5 bags',
    image: '/images/srisailam/innova-crysta.jpg',
    description: 'Plush captain seating, high ground clearance, silent cabin, and unmatched prestige for pilgrimage travel.',
  },
  {
    name: 'Tempo Traveller',
    category: 'Group Minibus',
    seating: '12 to 28 seats',
    luggage: 'Ample boot space',
    image: '/images/srisailam/tempo-traveller.jpg',
    description: 'Custom-configured luxury coaches with pushback seats, individual AC vents, and high roof for family groups.',
  },
]

const SRISAILAM_MILESTONES = [
  {
    number: '01',
    title: 'ORR to NH 765',
    description: 'Smooth four-lane expressway departure via Tukkuguda heading towards Kalwakurthy.',
    highlight: '60 km fast transit'
  },
  {
    number: '02',
    title: 'Dindi Reservoir Stopover',
    description: 'Scenic water catchment viewpoint and traditional South Indian breakfast halt en route.',
    highlight: 'Breakfast & Tea Halt'
  },
  {
    number: '03',
    title: 'Mannanur Forest Checkpost',
    description: 'Entry into the dense Nallamala Tiger Reserve with mist-covered ghat curves and wildlife zones.',
    highlight: 'Day transit 6AM–9PM'
  },
  {
    number: '04',
    title: 'Srisailam Dam & Temple Town',
    description: 'Sweeping canyon panoramas descending across Krishna river into Mallikarjuna temple.',
    highlight: 'Jyotirlinga Darshan'
  }
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
    <BookingModalProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(travelServiceSchema) }}
      />

      <Header />

      <main id="srisailam-cabs">
        {/* HERO SECTION — Cinematic with Highway Stream Canvas */}
        <section className="hero relative overflow-hidden">
          <Image
            src="/images/srisailam/hero.jpg"
            alt="Hyderabad to Srisailam cab service with views of Srisailam temple and Nallamala forest"
            fill
            priority
            sizes="100vw"
            className="hero-image"
          />
          <div className="hero-overlay" />
          
          {/* Ambient 60fps Highway Light Particles Stream */}
          <HighwayStreamCanvas density={55} speedMultiplier={1.1} />

          <div className="hero-content relative z-10">
            <p className="eyebrow light flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Outstation &bull; Temple Pilgrimage</span>
            </p>
            <h1>
              Hyderabad to<br />
              <span>Srisailam cabs.</span>
            </h1>
            <p className="hero-copy">
              A serene pilgrimage to Mallikarjuna Jyotirlinga and Bhramaramba Shakti Peetham. 
              Doorstep pickup, verified ghat drivers, sanitised cars, and transparent pricing.
            </p>
            <OutstationHeroCta 
              contactPhone={contactPhone} 
              displayPhone={displayPhone} 
            />
          </div>

          <div className="hero-note">
            <span>01</span>
            <span>Pilgrimage &bull; ~215 km</span>
            <span className="note-line" />
          </div>
        </section>

        {/* TRUST BAR — 4 Interactive Columns with 3D Micro-Hover */}
        <section className="trust-bar bg-[var(--paper)]">
          <div className="trust-item">
            <ShieldCheck size={20} className="text-neutral-900" />
            <div>
              <strong>Ghat-trained drivers</strong>
              <span>Safe hill curves & forest drive</span>
            </div>
          </div>
          <div className="trust-item">
            <Car size={20} className="text-neutral-900" />
            <div>
              <strong>Well-maintained fleet</strong>
              <span>Clean AC sedans, MUVs & vans</span>
            </div>
          </div>
          <div className="trust-item">
            <Clock size={20} className="text-neutral-900" />
            <div>
              <strong>Punctual doorstep pickup</strong>
              <span>Early 4 AM door pickups on time</span>
            </div>
          </div>
          <div className="trust-item">
            <Compass size={20} className="text-neutral-900" />
            <div>
              <strong>Flexible itinerary</strong>
              <span>Custom halts for darshan & food</span>
            </div>
          </div>
        </section>

        {/* TOUR PACKAGES — 3D Tilt Experience */}
        <section id="packages" className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow">Curated journeys</p>
              <h2>Srisailam <em>tour packages.</em></h2>
            </div>
            <p>
              Choose between a focused same-day darshan or a relaxed 2-day family journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TOUR_PACKAGES.map((pkg) => (
              <TiltCard3D key={pkg.id} maxTilt={6} className="h-full">
                <article 
                  className="fleet-card flex h-full flex-col justify-between overflow-hidden bg-white border border-[var(--line)] shadow-sm hover:shadow-xl transition-shadow"
                >
                  <div>
                    <div className="fleet-photo relative min-h-[260px] overflow-hidden bg-neutral-200">
                      <Image
                        src={pkg.image}
                        alt={pkg.title}
                        fill
                        sizes="(max-width: 800px) 100vw, 50vw"
                        className="transition-transform duration-700 hover:scale-105 object-cover"
                      />
                      <span 
                        className="absolute right-4 top-4 z-10 rounded-full bg-neutral-900 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
                      >
                        {pkg.badge}
                      </span>
                    </div>

                    <div className="p-7">
                      <div className="flex gap-4 text-xs font-bold uppercase tracking-wider text-[var(--soft)] mb-3">
                        <span>{pkg.duration}</span>
                        <span>&bull;</span>
                        <span>{pkg.distance}</span>
                      </div>

                      <h3 className="text-2xl font-medium tracking-tight mb-3">
                        {pkg.title}
                      </h3>
                      
                      <p className="text-sm text-[var(--soft)] leading-relaxed mb-6">
                        {pkg.summary}
                      </p>

                      <div className="border-t border-[var(--line)] pt-5">
                        <p className="eyebrow mb-3">Trip Highlights</p>
                        <ul className="space-y-2 text-xs text-[var(--soft)]">
                          {pkg.highlights.map((h, i) => (
                            <li key={i} className="flex gap-2.5 items-start">
                              <span className="font-bold text-neutral-900">&mdash;</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-5 border-t border-[var(--line)] flex justify-between items-center bg-neutral-50/50">
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-[var(--soft)]">Package fare</span>
                      <strong className="text-base font-semibold">{pkg.priceText}</strong>
                    </div>
                    <a
                      className="button button-dark"
                      href={`https://wa.me/919988123444?text=${encodeURIComponent(pkg.quoteMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get a quote <ArrowRight size={15} />
                    </a>
                  </div>
                </article>
              </TiltCard3D>
            ))}
          </div>
        </section>

        {/* AVAILABLE VEHICLES — 3D Tilt Fleet Cards */}
        <section id="vehicles" className="section fleet">
          <div className="section-head">
            <div>
              <p className="eyebrow">Our fleet</p>
              <h2>Vehicles for <em>every</em> group.</h2>
            </div>
            <p>
              Dedicated outstation vehicles with high ground clearance and generous luggage room.
            </p>
          </div>

          <div className="fleet-grid">
            {VEHICLES.map((v) => (
              <TiltCard3D key={v.name} maxTilt={6} className="h-full">
                <article className="fleet-card flex h-full flex-col justify-between overflow-hidden bg-[var(--paper)] border border-[var(--line)]">
                  <div className="fleet-photo relative min-h-[260px] overflow-hidden bg-neutral-200">
                    <Image
                      src={v.image}
                      alt={`${v.name} cab for Srisailam`}
                      fill
                      sizes="(max-width: 800px) 100vw, 33vw"
                      className="transition-transform duration-700 hover:scale-105 object-cover"
                    />
                  </div>
                  <div className="fleet-info flex flex-1 flex-col justify-between p-6">
                    <div>
                      <p className="eyebrow">{v.category}</p>
                      <h3 className="text-xl font-medium">{v.name}</h3>
                      <span className="fleet-meta block my-3 text-xs text-[var(--soft)]">{v.seating} &bull; {v.luggage}</span>
                      <p className="text-xs text-[var(--soft)] leading-relaxed mb-4">
                        {v.description}
                      </p>
                    </div>
                    <div className="fleet-bottom pt-4 border-t border-[var(--line)] flex items-center justify-between">
                      <strong className="text-xs">Price on request</strong>
                      <a 
                        href={`https://wa.me/919988123444?text=${encodeURIComponent(`Hi Apna Cars, please provide a quote for ${v.name} (${v.seating}) for Hyderabad to Srisailam.`)}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-black"
                      >
                        Inquire <ArrowRight size={15} />
                      </a>
                    </div>
                  </div>
                </article>
              </TiltCard3D>
            ))}
          </div>
        </section>

        {/* PLACES TO VISIT — 3D Sightseeing Grid */}
        <section className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow">Sightseeing & Darshan</p>
              <h2>Places to visit in <em>Srisailam.</em></h2>
            </div>
            <p>
              Ten sacred temples, dramatic viewpoints, and Krishna river attractions to discover.
            </p>
          </div>

          <div className="fleet-grid">
            {PLACES_TO_VISIT.map((place) => (
              <TiltCard3D key={place.id} maxTilt={6} className="h-full">
                <article className="fleet-card flex h-full flex-col justify-between overflow-hidden bg-white border border-[var(--line)]">
                  <div className="fleet-photo relative min-h-[220px] overflow-hidden bg-neutral-100">
                    <Image
                      src={place.image}
                      alt={place.name}
                      fill
                      sizes="(max-width: 800px) 100vw, 33vw"
                      className="transition-transform duration-700 hover:scale-105 object-cover"
                    />
                  </div>
                  <div className="fleet-info p-6">
                    <p className="eyebrow">{place.num} &bull; {place.subtitle}</p>
                    <h3 className="text-xl font-medium">{place.name}</h3>
                    <p className="text-xs text-[var(--soft)] leading-relaxed mt-3">
                      {place.desc}
                    </p>
                  </div>
                </article>
              </TiltCard3D>
            ))}
          </div>
        </section>

        {/* TRIP SPECS & DARK SECTION */}
        <section className="dark-section">
          <div className="section dark-inner">
            <p className="eyebrow light">Trip reference</p>
            <h2>Planning your <em>journey.</em></h2>
            
            <div className="benefit-grid">
              <div className="benefit">
                <span>01</span>
                <MapPin size={19} />
                <h3>Route & Distance</h3>
                <p>~215–230 km one-way via ORR, Kalwakurthy & Dindi. Round-trip allowance standard: ~500 km.</p>
              </div>

              <div className="benefit">
                <span>02</span>
                <Clock size={19} />
                <h3>Travel Duration</h3>
                <p>Approx. 4.5 to 5.5 hours under standard traffic, with recommended start around 4:30 AM.</p>
              </div>

              <div className="benefit">
                <span>03</span>
                <ShieldCheck size={19} />
                <h3>Forest Gates</h3>
                <p>Nallamala Tiger Reserve gates strictly close from 9:00 PM to 6:00 AM. Driver plans smooth passage.</p>
              </div>
            </div>
          </div>
        </section>

        {/* INCLUSIONS & EXCLUSIONS */}
        <section className="corporate section">
          <div>
            <p className="eyebrow">Clear pricing</p>
            <h2>Inclusions &amp; <em>exclusions.</em></h2>
            <p>
              We uphold transparent pricing with zero surprise charges. Here is what is covered in your quotation and what remains payable at actuals.
            </p>
            <div style={{ marginTop: '24px' }}>
              <a 
                className="button button-dark" 
                href={`tel:${contactPhone}`}
              >
                Speak to our desk <Phone size={15} />
              </a>
            </div>
          </div>
          <div className="corporate-list">
            <div>
              <CheckCircle2 size={16} />
              <span><strong>Included:</strong> Dedicated vehicle, driver allowance, and route fuel.</span>
            </div>
            <div>
              <CheckCircle2 size={16} />
              <span><strong>Included:</strong> Doorstep pickup and drop anywhere in Hyderabad.</span>
            </div>
            <div>
              <CheckCircle2 size={16} />
              <span><strong>Included:</strong> Standard temple halts and sightseeing coverage.</span>
            </div>
            <div>
              <XCircle size={16} style={{ color: 'var(--soft)' }} />
              <span><strong>Payable:</strong> Highway tolls and temple parking receipts at actuals.</span>
            </div>
            <div>
              <XCircle size={16} style={{ color: 'var(--soft)' }} />
              <span><strong>Payable:</strong> Interstate permit tax (if applicable for non-TG plates).</span>
            </div>
            <div>
              <XCircle size={16} style={{ color: 'var(--soft)' }} />
              <span><strong>Payable:</strong> Temple Darshan / Seva tickets purchased directly.</span>
            </div>
          </div>
        </section>

        {/* ROUTE HIGHLIGHTS — Animated Highway Journey Timeline */}
        <AnimatedHighwayJourney
          milestones={SRISAILAM_MILESTONES}
          eyebrow="Highway guide"
          heading="Route from Hyderabad to Srisailam"
        />

        {/* FAQS */}
        <section className="section faq">
          <p className="eyebrow">Need to know</p>
          <h2>Frequently asked <em>questions.</em></h2>
          <FaqAccordion items={FAQS} />
        </section>

        {/* FINAL CTA */}
        <section className="final-cta">
          <Image 
            src="/images/srisailam/hero.jpg" 
            alt="Scenic Srisailam pilgrimage journey" 
            fill 
            sizes="100vw" 
          />
          <div className="hero-overlay" />
          <div className="final-content">
            <p className="eyebrow light">Your spiritual journey awaits</p>
            <h2>Plan your<br /><em>Srisailam trip.</em></h2>
            <p>Tell us your dates, group size, and pickup point. We will arrange a clean cab with an experienced driver.</p>
            <div className="hero-buttons">
              <a 
                className="button button-light" 
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
        defaultDestination="Srisailam"
        phone={contactPhone}
        displayPhone={displayPhone}
      />

      {/* Persistent Floating Call & WhatsApp Widgets */}
      <FloatingActionButtons
        phone={contactPhone}
        displayPhone={displayPhone}
      />

      <Footer />
    </BookingModalProvider>
  )
}
