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
    category: 'Compact Sedan',
    seating: '4+1 seats',
    luggage: '2 bags',
    image: '/images/srisailam/swift-dzire.jpg',
    description: 'Fuel-efficient, comfortable, and economical choice for couples and small families visiting the shrine.',
  },
  {
    name: 'Toyota Etios',
    category: 'Spacious Sedan',
    seating: '4+1 seats',
    luggage: '3 bags',
    image: '/images/srisailam/toyota-etios.jpg',
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
    image: '/images/srisailam/toyota-innova.jpg',
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

      <main id="srisailam-cabs">
        {/* HERO SECTION — Matching Apna Cars exact signature hero styling */}
        <section className="hero">
          <Image
            src="/images/srisailam/hero.jpg"
            alt="Hyderabad to Srisailam cab service with views of Srisailam temple and Nallamala forest"
            fill
            priority
            sizes="100vw"
            className="hero-image"
          />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow light">Outstation &bull; Temple Pilgrimage</p>
            <h1>
              Hyderabad to<br />
              <span>Srisailam cabs.</span>
            </h1>
            <p className="hero-copy">
              A serene pilgrimage to Mallikarjuna Jyotirlinga and Bhramaramba Shakti Peetham. 
              Doorstep pickup, verified ghat drivers, sanitised cars, and transparent pricing.
            </p>
            <div className="hero-buttons">
              <a 
                className="button button-light" 
                href={defaultWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book on WhatsApp <ArrowRight size={17} />
              </a>
              <a 
                className="text-button light" 
                href={`tel:${contactPhone}`}
              >
                Call {displayPhone} <Phone size={16} />
              </a>
            </div>
          </div>
          <div className="hero-note">
            <span>01</span>
            <span>Pilgrimage &bull; ~215 km</span>
            <span className="note-line" />
          </div>
        </section>

        {/* TRUST BAR — Matching Apna Cars exact trust-bar styling */}
        <section className="trust-bar">
          <div className="trust-item">
            <ShieldCheck size={20} />
            <div>
              <strong>Ghat-trained drivers</strong>
              <span>Safe hill curves & forest drive</span>
            </div>
          </div>
          <div className="trust-item">
            <Car size={20} />
            <div>
              <strong>Well-maintained fleet</strong>
              <span>Clean AC sedans, MUVs & vans</span>
            </div>
          </div>
          <div className="trust-item">
            <Clock size={20} />
            <div>
              <strong>Punctual doorstep pickup</strong>
              <span>Early 4 AM door pickups on time</span>
            </div>
          </div>
          <div className="trust-item">
            <Compass size={20} />
            <div>
              <strong>Flexible itinerary</strong>
              <span>Custom halts for darshan & food</span>
            </div>
          </div>
        </section>

        {/* TOUR PACKAGES — Matching Apna Cars editorial grid style */}
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {TOUR_PACKAGES.map((pkg) => (
              <article 
                key={pkg.id} 
                style={{ 
                  background: 'var(--white)', 
                  border: '1px solid var(--line)', 
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ position: 'relative', minHeight: '260px', background: '#ddd' }}>
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      sizes="(max-width: 800px) 100vw, 50vw"
                      style={{ objectFit: 'cover' }}
                    />
                    <span 
                      style={{ 
                        position: 'absolute', 
                        top: '16px', 
                        right: '16px', 
                        background: 'var(--ink)', 
                        color: 'var(--white)', 
                        padding: '6px 12px', 
                        fontSize: '10px', 
                        letterSpacing: '.12em', 
                        textTransform: 'uppercase',
                        fontWeight: 700
                      }}
                    >
                      {pkg.badge}
                    </span>
                  </div>

                  <div style={{ padding: '28px' }}>
                    <div style={{ display: 'flex', gap: '18px', color: 'var(--soft)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '14px' }}>
                      <span>{pkg.duration}</span>
                      <span>&bull;</span>
                      <span>{pkg.distance}</span>
                    </div>

                    <h3 style={{ margin: '0 0 14px', fontSize: '24px', fontWeight: 500, letterSpacing: '-.03em' }}>
                      {pkg.title}
                    </h3>
                    
                    <p style={{ color: 'var(--soft)', fontSize: '14px', lineHeight: 1.7, margin: '0 0 24px' }}>
                      {pkg.summary}
                    </p>

                    <div style={{ borderTop: '1px solid var(--line)', paddingTop: '20px' }}>
                      <p className="eyebrow" style={{ marginBottom: '12px' }}>Trip Highlights</p>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--soft)' }}>
                        {pkg.highlights.map((h, i) => (
                          <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                            <span style={{ color: 'var(--ink)', fontWeight: 700 }}>&mdash;</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '24px 28px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--soft)' }}>Package fare</span>
                    <strong style={{ fontSize: '16px' }}>{pkg.priceText}</strong>
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
            ))}
          </div>
        </section>

        {/* AVAILABLE VEHICLES — Matching Apna Cars exact .fleet-card and .fleet-grid styles */}
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
              <article className="fleet-card" key={v.name}>
                <div className="fleet-photo">
                  <Image
                    src={v.image}
                    alt={`${v.name} cab for Srisailam`}
                    fill
                    sizes="(max-width: 800px) 100vw, 33vw"
                  />
                </div>
                <div className="fleet-info">
                  <p className="eyebrow">{v.category}</p>
                  <h3>{v.name}</h3>
                  <span className="fleet-meta">{v.seating} &bull; {v.luggage}</span>
                  <p style={{ fontSize: '13px', color: 'var(--soft)', margin: '0 0 18px', lineHeight: 1.6 }}>
                    {v.description}
                  </p>
                  <div className="fleet-bottom">
                    <strong>Price on request</strong>
                    <a 
                      href={`https://wa.me/919988123444?text=${encodeURIComponent(`Hi Apna Cars, please provide a quote for ${v.name} (${v.seating}) for Hyderabad to Srisailam.`)}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Inquire <ArrowRight size={15} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* PLACES TO VISIT — Elegant service-grid styled sightseeing section */}
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
              <article className="fleet-card" key={place.id} style={{ background: 'var(--white)' }}>
                <div className="fleet-photo" style={{ minHeight: '220px' }}>
                  <Image
                    src={place.image}
                    alt={place.name}
                    fill
                    sizes="(max-width: 800px) 100vw, 33vw"
                  />
                </div>
                <div className="fleet-info">
                  <p className="eyebrow">{place.num} &bull; {place.subtitle}</p>
                  <h3>{place.name}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--soft)', margin: '14px 0 0', lineHeight: 1.6 }}>
                    {place.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* TRIP SPECS & DARK SECTION — Matching Apna Cars exact .dark-section theme */}
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

        {/* INCLUSIONS & EXCLUSIONS — Clean corporate grid design */}
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

        {/* ROUTE HIGHLIGHTS — Matching Apna Cars process steps */}
        <section className="section process">
          <p className="eyebrow">Highway guide</p>
          <h2>Route from Hyderabad <em>to Srisailam.</em></h2>
          <div className="steps">
            <div className="step">
              <span>01</span>
              <div>
                <h3>ORR to NH 765</h3>
                <p>Smooth four-lane expressway via Tukkuguda heading towards Kalwakurthy.</p>
              </div>
            </div>
            <div className="step">
              <span>02</span>
              <div>
                <h3>Dindi Reservoir</h3>
                <p>Scenic water catchment stopover and breakfast halt en route.</p>
              </div>
            </div>
            <div className="step">
              <span>03</span>
              <div>
                <h3>Mannanur Checkpost</h3>
                <p>Entry into the dense Nallamala forest with mist-covered ghat curves.</p>
              </div>
            </div>
            <div className="step">
              <span>04</span>
              <div>
                <h3>Srisailam Dam Ghats</h3>
                <p>Sweeping valley panoramas descending to the Krishna river and temple town.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQS — Using exact Apna Cars FAQ Accordion */}
        <section className="section faq">
          <p className="eyebrow">Need to know</p>
          <h2>Frequently asked <em>questions.</em></h2>
          <FaqAccordion items={FAQS} />
        </section>

        {/* FINAL CTA — Exact Apna Cars final-cta styling */}
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

      <Footer />
    </>
  )
}
