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
  Plane,
  Building2,
  Calendar,
  Fuel,
  Luggage,
  Search,
  Navigation
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FaqAccordion } from '@/components/ui/faq-accordion'
import { HighwayStreamCanvas } from '@/components/motion/highway-stream-canvas'
import { TiltCard3D } from '@/components/motion/tilt-card-3d'
import { OutstationCockpitHud } from '@/components/motion/outstation-cockpit-hud'
import { InteractiveDestinationGrid, DestinationItem } from '@/components/motion/interactive-destination-grid'
import { AnimatedHighwayJourney } from '@/components/motion/animated-highway-journey'
import { FloatingActionButtons } from '@/components/ui/floating-action-buttons'
import { BookingModalProvider } from '@/components/ui/smart-booking-modal'
import { OutstationHeroCta } from '@/components/motion/outstation-hero-cta'

export const metadata: Metadata = {
  title: 'Outstation Cabs from Hyderabad | Intercity Car Rental | Apna Cars',
  description: 'Book premium outstation cabs from Hyderabad to 40+ destinations including Vijayawada, Tirupati, Bengaluru, Goa, Shirdi & Vizag. Transparent pricing, verified drivers, clean sedans and SUVs.',
  alternates: {
    canonical: 'https://apnacarrental.com/outstation-cabs',
  },
  openGraph: {
    title: 'Outstation Cabs from Hyderabad | Apna Cars',
    description: 'Book comfortable outstation journeys from Hyderabad for family road trips, business travel, pilgrimages, and holiday getaways.',
    url: 'https://apnacarrental.com/outstation-cabs',
    siteName: 'Apna Car Rental',
    images: [
      {
        url: '/images/hero-car.png',
        width: 1200,
        height: 675,
        alt: 'Outstation Cabs from Hyderabad - Apna Cars',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
}

const DESTINATIONS: DestinationItem[] = [
  {
    id: 'vijayawada',
    name: 'Vijayawada',
    tagline: 'Kanaka Durga Temple & Krishna River',
    distance: '~275 km',
    category: 'City',
    image: '/images/outstation/vijayawada.jpg',
    description: 'Fast 4-lane highway drive via NH65 connecting Hyderabad to Andhra Pradesh’s vibrant commercial and pilgrimage hub.'
  },
  {
    id: 'bhadrachalam',
    name: 'Bhadrachalam',
    tagline: 'Sacred Sri Sita Ramachandra Swamy',
    distance: '~310 km',
    category: 'Pilgrimage',
    image: '/images/outstation/bhadrachalam.jpg',
    description: 'Picturesque route along the Godavari river basin to the revered Rama Kshetram nestled amidst peaceful green valleys.'
  },
  {
    id: 'guntur',
    name: 'Guntur',
    tagline: 'Amaravati Stupa & Kotappakonda',
    distance: '~285 km',
    category: 'City',
    image: '/images/outstation/guntur.jpg',
    description: 'Direct highway travel suited for agricultural business trips, Amaravati Buddhist heritage exploration, and family visits.'
  },
  {
    id: 'vemulawada',
    name: 'Vemulawada',
    tagline: 'Sri Raja Rajeshwara Swamy Temple',
    distance: '~150 km',
    category: 'Pilgrimage',
    image: '/images/outstation/vemulawada.jpg',
    description: 'Short and smooth outstation journey to Dakshina Kasi, renowned for the sacred Baddi Pooja ritual and healing waters.'
  },
  {
    id: 'visakhapatnam',
    name: 'Visakhapatnam (Vizag)',
    tagline: 'Beaches, Araku Valley & Port City',
    distance: '~620 km',
    category: 'Coastal',
    image: '/images/outstation/visakhapatnam.jpg',
    description: 'Scenic coastal highway drive to the Jewel of the East Coast, featuring Rishikonda beach, Kailasagiri, and submarine museums.'
  },
  {
    id: 'warangal',
    name: 'Warangal',
    tagline: 'Thousand Pillar Temple & Kakatiya Fort',
    distance: '~150 km',
    category: 'Heritage',
    image: '/images/outstation/warangal.jpg',
    description: 'An easy day excursion or weekend heritage tour exploring 12th-century stone archways, Ramappa Temple, and Laknavaram Lake.'
  },
  {
    id: 'rajahmundry',
    name: 'Rajahmundry',
    tagline: 'Cultural Capital on the Godavari',
    distance: '~430 km',
    category: 'Heritage',
    image: '/images/outstation/rajahmundry.jpg',
    description: 'Historic city renowned for Godavari river bridges, Kotilingala temple ghats, and gateway access to Papikondalu boat tours.'
  },
  {
    id: 'wargal',
    name: 'Wargal Saraswati Temple',
    tagline: 'Goddess of Learning & Aksharabhyasam',
    distance: '~55 km',
    category: 'Pilgrimage',
    image: '/images/outstation/wargal.jpg',
    description: 'Serene hilltop shrine on the Rajiv Rahadari highway, ideal for children’s schooling ceremonies and quick half-day pilgrimages.'
  },
  {
    id: 'amalapuram',
    name: 'Amalapuram',
    tagline: 'Heart of the Konaseema Green Delta',
    distance: '~465 km',
    category: 'Coastal',
    image: '/images/outstation/amalapuram.jpg',
    description: 'Drive through lush coconut groves, backwaters, and peaceful village canopies in the scenic delta of Andhra Pradesh.'
  },
  {
    id: 'yadagirigutta',
    name: 'Yadagirigutta',
    tagline: 'Sri Lakshmi Narasimha Swamy Temple',
    distance: '~65 km',
    category: 'Pilgrimage',
    image: '/images/outstation/yadagirigutta.jpg',
    description: 'Swift 1.5-hour expressway drive via Warangal Highway to the magnificent newly sculpted Krishna-shila hill sanctuary.'
  },
  {
    id: 'kakinada',
    name: 'Kakinada',
    tagline: 'Coringa Mangroves & Deep Sea Port',
    distance: '~495 km',
    category: 'Coastal',
    image: '/images/outstation/kakinada.jpg',
    description: 'Well-planned coastal city famous for Coringa wildlife sanctuary boardwalks, pristine beaches, and traditional Kakinada sweets.'
  },
  {
    id: 'swarnagiri',
    name: 'Swarnagiri',
    tagline: 'Golden Sri Venkateswara Temple, Bhuvanagiri',
    distance: '~50 km',
    category: 'Pilgrimage',
    image: '/images/outstation/swarnagiri.jpg',
    description: 'Architectural spectacle nestled on the highway with gilded domes and illuminated evening vistas, perfect for short family trips.'
  },
  {
    id: 'tirupati',
    name: 'Tirupati',
    tagline: 'Lord Venkateswara Balaji Darshan',
    distance: '~560 km',
    category: 'Pilgrimage',
    image: '/images/outstation/tirupati.jpg',
    description: 'World-renowned sacred Seven Hills pilgrimage. Doorstep pickup in Hyderabad with experienced highway chauffeurs.'
  },
  {
    id: 'nellore',
    name: 'Nellore',
    tagline: 'Ranganathaswamy & Coastal Trade',
    distance: '~460 km',
    category: 'City',
    image: '/images/outstation/nellore.jpg',
    description: 'Traverse southbound down NH16 to the banks of the Penna River, known for ancient temples and coastal aquaculture hubs.'
  },
  {
    id: 'mantralayam',
    name: 'Mantralayam',
    tagline: 'Sri Raghavendra Swamy Matha',
    distance: '~275 km',
    category: 'Pilgrimage',
    image: '/images/outstation/mantralayam.jpg',
    description: 'Holy shrine on the banks of the Tungabhadra River attracting thousands of devotees for divine peace and Vrindavana darshan.'
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    tagline: 'Silicon Valley of India via NH44',
    distance: '~570 km',
    category: 'City',
    image: '/images/outstation/bengaluru.jpg',
    description: 'Smooth 8-hour sprint across NH44 4-lane expressway connecting Hyderabad directly to Bengaluru’s IT corridors and tech parks.'
  },
  {
    id: 'chennai',
    name: 'Chennai',
    tagline: 'Marina Beach & Southern Metropolis',
    distance: '~630 km',
    category: 'City',
    image: '/images/outstation/chennai.jpg',
    description: 'Comfortable cross-state road trip suited for corporate transfers, family functions, or gateway access to the Tamil Nadu coastline.'
  },
  {
    id: 'shirdi',
    name: 'Shirdi',
    tagline: 'Sai Baba Samadhi Mandir',
    distance: '~610 km',
    category: 'Pilgrimage',
    image: '/images/outstation/shirdi.jpg',
    description: 'Direct outstation tour from Hyderabad via Maharashtra corridors for morning Kakad Aarti and unhurried spiritual contemplation.'
  },
  {
    id: 'goa',
    name: 'Goa',
    tagline: 'Sun, Sand, Heritage Churches & Beaches',
    distance: '~660 km',
    category: 'Coastal',
    image: '/images/outstation/goa.jpg',
    description: 'Classic interstate road trip traversing Karnataka’s western ghats into North and South Goa’s palm-fringed coastal paradise.'
  },
  {
    id: 'pune',
    name: 'Pune',
    tagline: 'Cultural Hub & Automotive Center',
    distance: '~560 km',
    category: 'City',
    image: '/images/outstation/pune.jpg',
    description: 'Intercity corporate travel along NH65 connecting Hyderabad through Solapur to Pune’s Hinjewadi IT parks and educational centers.'
  },
  {
    id: 'mysuru',
    name: 'Mysuru',
    tagline: 'Mysore Palace & Chamundi Hills',
    distance: '~710 km',
    category: 'Heritage',
    image: '/images/outstation/mysuru.jpg',
    description: 'Grand royal heritage circuit featuring the illuminated Ambavilas Palace, Brindavan Gardens, and sandalwood heritage.'
  },
  {
    id: 'udupi',
    name: 'Udupi',
    tagline: 'Sri Krishna Matha & Malpe Beach',
    distance: '~790 km',
    category: 'Coastal',
    image: '/images/outstation/udupi.jpg',
    description: 'Coastal Karnataka gem combining holy Kanakana Kindi darshan with scenic Arabian Sea sunsets and St. Mary’s Island.'
  },
  {
    id: 'ooty',
    name: 'Ooty',
    tagline: 'Queen of Hill Stations, Nilgiris',
    distance: '~840 km',
    category: 'Hill Station',
    image: '/images/outstation/ooty.jpg',
    description: 'Cool mountain air, tea estates, botanical gardens, and scenic pine forests nestled 2,240 metres high in the Western Ghats.'
  },
  {
    id: 'munnar',
    name: 'Munnar',
    tagline: 'Rolling Tea Plantations & Anamudi',
    distance: '~960 km',
    category: 'Hill Station',
    image: '/images/outstation/munnar.jpg',
    description: 'God’s own country hill haven featuring endless carpeted green hills, misty waterfalls, and cool mountain weather.'
  },
  {
    id: 'coorg',
    name: 'Coorg',
    tagline: 'Coffee Plantations & Abbey Falls',
    distance: '~810 km',
    category: 'Hill Station',
    image: '/images/outstation/coorg.jpg',
    description: 'The Scotland of India; lush coffee estates, Tibetan Golden Temple at Bylakuppe, and misty homestay weekend escapes.'
  },
  {
    id: 'coimbatore',
    name: 'Coimbatore',
    tagline: 'Isha Yoga Centre & Adiyogi Statue',
    distance: '~910 km',
    category: 'Pilgrimage',
    image: '/images/outstation/coimbatore.jpg',
    description: 'Gateway to the Western Ghats, popular for meditation pilgrimages to Dhyanalinga and the iconic 112-foot Adiyogi statue.'
  },
  {
    id: 'rameswaram',
    name: 'Rameswaram',
    tagline: 'Ramanathaswamy Jyotirlinga & Dhanushkodi',
    distance: '~1,080 km',
    category: 'Pilgrimage',
    image: '/images/outstation/rameswaram.jpg',
    description: 'Sacred island temple town connecting to Dhanushkodi and Pamban Bridge at the southernmost tip of the Indian peninsula.'
  },
  {
    id: 'mahanandi',
    name: 'Mahanandi',
    tagline: 'Crystal Clear Natural Mineral Springs',
    distance: '~330 km',
    category: 'Pilgrimage',
    image: '/images/outstation/mahanandi.jpg',
    description: 'Ancient temple situated east of the Nallamala range famous for its perennially flowing crystal thermal freshwater tanks.'
  },
  {
    id: 'vellore',
    name: 'Vellore',
    tagline: 'Golden Temple Sripuram & Vellore Fort',
    distance: '~580 km',
    category: 'Heritage',
    image: '/images/outstation/vellore.jpg',
    description: 'Historic city featuring the grand Sripuram Mahalakshmi temple coated in gold foil, 16th-century moated fort, and CMC health travels.'
  },
  {
    id: 'tiruvannamalai',
    name: 'Tiruvannamalai',
    tagline: 'Annamalaiyar Temple & Girivalam',
    distance: '~670 km',
    category: 'Pilgrimage',
    image: '/images/outstation/tiruvannamalai.jpg',
    description: 'Arunachala fire element shrine, Ramana Maharshi Ashram, and sacred 14 km full-moon mountain circumambulation path.'
  },
  {
    id: 'kashi',
    name: 'Kashi (Varanasi)',
    tagline: 'Kashi Vishwanath Jyotirlinga & Ganga Ghats',
    distance: '~1,220 km',
    category: 'Pilgrimage',
    image: '/images/outstation/kashi.jpg',
    description: 'The world’s oldest living city. Long-haul pilgrimage cab packages with seasoned drivers across central and northern India.'
  },
  {
    id: 'ayodhya',
    name: 'Ayodhya',
    tagline: 'Shri Ram Janmabhoomi Mandir',
    distance: '~1,150 km',
    category: 'Pilgrimage',
    image: '/images/outstation/ayodhya.jpg',
    description: 'Historic pilgrimage to Ram Lalla’s grand consecrated temple on the sacred Sarayu River with comfortable outstation travel.'
  },
  {
    id: 'triveni-sangam',
    name: 'Triveni Sangam (Prayagraj)',
    tagline: 'Confluence of Ganga, Yamuna & Saraswati',
    distance: '~1,120 km',
    category: 'Pilgrimage',
    image: '/images/outstation/triveni-sangam.jpg',
    description: 'Holy confluence in Prayagraj for sacred ritual baths, Kumbh grounds, Anand Bhavan, and Allahabad Fort darshan.'
  },
  {
    id: 'gokarna',
    name: 'Gokarna',
    tagline: 'Mahabaleshwar Temple & Om Beach',
    distance: '~670 km',
    category: 'Coastal',
    image: '/images/outstation/gokarna.jpg',
    description: 'Atmospheric coastal town where ancient temple rituals of the Atmalinga meet pristine cliffside beaches and tranquil coves.'
  },
  {
    id: 'murudeshwar',
    name: 'Murudeshwar',
    tagline: 'Giant Shiva Statue & Coastal Rajagopura',
    distance: '~720 km',
    category: 'Coastal',
    image: '/images/outstation/murudeshwar.jpg',
    description: 'Breathtaking 123-foot Shiva statue surrounded on three sides by the Arabian Sea with a 20-storey sea-view temple tower.'
  },
  {
    id: 'nashik',
    name: 'Nashik',
    tagline: 'Trimbakeshwar Jyotirlinga & Godavari Origin',
    distance: '~690 km',
    category: 'Pilgrimage',
    image: '/images/outstation/nashik.jpg',
    description: 'Spiritual haven at the foothills of Brahmagiri hills, renowned for Trimbakeshwar Shiva temple, Panchavati, and vineyard tours.'
  },
  {
    id: 'dharmasthala',
    name: 'Dharmasthala',
    tagline: 'Manjunatha Swamy & Bahubali Monolith',
    distance: '~810 km',
    category: 'Pilgrimage',
    image: '/images/outstation/dharmasthala.jpg',
    description: 'Sacred center of communal harmony on the Netravati River, famed for Annadana charity and Lord Manjunatha darshan.'
  },
  {
    id: 'madurai',
    name: 'Madurai',
    tagline: 'Meenakshi Amman Temple & Heritage',
    distance: '~990 km',
    category: 'Heritage',
    image: '/images/outstation/madurai.jpg',
    description: 'Ancient city shaped like a lotus, celebrated for the towering gopurams of Meenakshi Temple and Thirumalai Nayakkar Mahal.'
  },
  {
    id: 'palani',
    name: 'Palani',
    tagline: 'Dhandayuthapani Swamy Murugan Temple',
    distance: '~940 km',
    category: 'Pilgrimage',
    image: '/images/outstation/palani.jpg',
    description: 'Prominent Murugan hilltop shrine accessible by winch and ropeway, set against the scenic foothills of the Palani Hills.'
  },
  {
    id: 'sabarimala',
    name: 'Sabarimala',
    tagline: 'Lord Ayyappa Sannidhanam Pilgrimage',
    distance: '~1,150 km',
    category: 'Pilgrimage',
    image: '/images/outstation/sabarimala.jpg',
    description: 'Special seasonal and mandala season group pilgrimages to Pamba and Periyar Tiger Reserve with experienced mountain drivers.'
  },
  {
    id: 'kanchipuram',
    name: 'Kanchipuram',
    tagline: 'City of Thousand Temples & Silk Weaves',
    distance: '~610 km',
    category: 'Heritage',
    image: '/images/outstation/kanchipuram.jpg',
    description: 'Ancient Pallava capital famous for Ekambareswarar, Varadharaja Perumal temple, Kamakshi Amman, and handloom silk.'
  },
  {
    id: 'velankanni',
    name: 'Velankanni',
    tagline: 'Basilica of Our Lady of Good Health',
    distance: '~840 km',
    category: 'Pilgrimage',
    image: '/images/outstation/velankanni.jpg',
    description: 'Gothic seaside basilica on the Coromandel coast welcoming millions of faithful seekers of healing, prayer, and quiet devotion.'
  }
]

const VEHICLE_CATEGORIES = [
  {
    name: 'Executive & Compact Sedans',
    models: 'Maruti Suzuki Dzire, Toyota Etios',
    seating: '4+1 Passengers',
    luggage: '2–3 Bags',
    image: '/images/hero-car.png',
    rateNote: 'Indicative base from ₹11–₹13/km',
    bestFor: 'Couples, small families, business airport runs, budget-conscious road trips.',
    quoteText: 'Hi Apna Cars, I need a quotation for a Sedan outstation cab from Hyderabad.'
  },
  {
    name: 'Family MUVs',
    models: 'Maruti Suzuki Ertiga',
    seating: '6+1 Passengers',
    luggage: '3–4 Bags',
    image: '/images/journey-road.png',
    rateNote: 'Indicative base from ₹14–₹16/km',
    bestFor: 'Medium-sized families, balanced comfort, 3-row seating, fuel efficiency.',
    quoteText: 'Hi Apna Cars, I need a quotation for an Ertiga MUV outstation cab from Hyderabad.'
  },
  {
    name: 'Premium MPVs & SUVs',
    models: 'Toyota Innova, Innova Crysta',
    seating: '7+1 Passengers',
    luggage: '4–5 Bags',
    image: '/images/fleet-suv.png',
    rateNote: 'Indicative base from ₹18–₹22/km',
    bestFor: 'VIP travel, long-distance pilgrimages, hill station trips, unmatched highway ride quality.',
    quoteText: 'Hi Apna Cars, I need a quotation for an Innova Crysta outstation cab from Hyderabad.'
  },
  {
    name: 'Group Coaches & Travellers',
    models: 'Tempo Traveller (12 to 26 Seater)',
    seating: '12 to 26 Passengers',
    luggage: 'Ample Luggage Bay',
    image: '/images/srisailam/tempo-traveller.jpg',
    rateNote: 'Custom route & daily quote',
    bestFor: 'Extended family groups, wedding parties, multi-day temple darshan circuits.',
    quoteText: 'Hi Apna Cars, I need a quotation for a Tempo Traveller outstation trip from Hyderabad.'
  }
]

const OUTSTATION_MILESTONES = [
  {
    number: '01',
    title: 'Select Destination & Car',
    description: 'Choose from 42+ verified cities with Dzire, Ertiga, Innova Crysta or Tempo Traveller.',
    highlight: 'Instant WhatsApp Quote'
  },
  {
    number: '02',
    title: 'Transparent Itemized Rate',
    description: 'Upfront quotation with clear fuel allowance, chauffeur bhatta, and zero surge hidden fees.',
    highlight: 'Clear Billing Terms'
  },
  {
    number: '03',
    title: 'Doorstep Departure',
    description: 'Punctual pickup anywhere in Hyderabad with vehicle & driver details shared in advance.',
    highlight: 'Sanitized Cabin'
  },
  {
    number: '04',
    title: 'Unhurried Journey',
    description: 'Enjoy flexible temple darshan halts, scenic photo viewpoints, and safe highway chauffeur pacing.',
    highlight: 'Experienced Highway Crew'
  }
]

const FAQS = [
  {
    id: 'faq-1',
    question: 'Which destinations can I travel to from Hyderabad?',
    answer: 'Apna Cars provides outstation cabs from Hyderabad to over 42 major destinations across Telangana, Andhra Pradesh, Karnataka, Tamil Nadu, Maharashtra, and North India. Top routes include Vijayawada, Srisailam, Tirupati, Shirdi, Bengaluru, Goa, Visakhapatnam, and Mantralayam. Custom interstate itineraries are also available upon request.'
  },
  {
    id: 'faq-2',
    question: 'Can I request a one-way trip?',
    answer: 'Yes, one-way drop services are available for key highway corridors such as Hyderabad to Vijayawada, Bengaluru, Guntur, and Warangal, subject to vehicle scheduling and route availability. Contact our travel desk on WhatsApp or call 099881 23444 for real-time one-way availability.'
  },
  {
    id: 'faq-3',
    question: 'Can I book a round trip?',
    answer: 'Absolutely. Round trips are our primary and most cost-effective offering. Your assigned car and experienced chauffeur remain dedicated exclusively to your group throughout the journey, accommodating local sightseeing, temple queues, and flexible stopovers before bringing you back to Hyderabad.'
  },
  {
    id: 'faq-4',
    question: 'Which vehicle should I choose for my journey?',
    answer: 'For 1 to 4 passengers with light luggage, a Sedan (Dzire / Etios) offers great value and comfort. For 5 to 6 passengers or families needing extra legroom, an Ertiga MUV is ideal. For long-distance interstate drives, ghat roads, or maximum comfort, the Toyota Innova Crysta is unmatched. For groups larger than 7, we recommend our luxury Tempo Travellers.'
  },
  {
    id: 'faq-5',
    question: 'How is the fare calculated?',
    answer: 'Outstation fares are calculated based on round-trip distance with a standard daily minimum kilometer allowance (typically 250–300 km/day depending on the route), plus a fixed driver daily allowance (bhatta). For fixed temple tours (such as Srisailam or Tirupati), we provide straightforward all-inclusive or fixed-package quotations.'
  },
  {
    id: 'faq-6',
    question: 'Are tolls and other charges included?',
    answer: 'Standard quotes cover the vehicle rental, fuel, and chauffeur allowance. Highway toll gates, interstate border permit taxes (for crossing into AP, Karnataka, Maharashtra, etc.), and parking fees are typically billed at actuals based on government receipts, keeping your pricing 100% transparent.'
  },
  {
    id: 'faq-7',
    question: 'How can I request a quotation?',
    answer: 'Requesting a quote takes less than a minute. Simply tap our WhatsApp button or call 099881 23444 with your travel date, pickup location, destination, group size, and vehicle preference. Our team will share an itemized, transparent quote with zero hidden charges.'
  },
  {
    id: 'faq-8',
    question: 'How do I contact Apna Cars?',
    answer: 'You can reach the Apna Cars round-the-clock booking desk by calling 099881 23444, messaging us on WhatsApp at +91 99881 23444, or visiting our office at Garden Colony, H. No - 4-4-123, opp. SBI ATM, Quthbullapur, Hyderabad, Telangana 500055.'
  }
]

export default function OutstationCabsPage() {
  const contactPhone = '+919988123444'
  const displayPhone = '099881 23444'
  const defaultWhatsAppUrl = 'https://wa.me/919988123444?text=Hi%20Apna%20Cars,%20I%20would%20like%20to%20inquire%20about%20an%20outstation%20cab%20from%20Hyderabad.'

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

  const outstationServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: 'Outstation Cabs from Hyderabad',
    description: 'Intercity and outstation car rental services from Hyderabad to 42+ destinations across India by Apna Cars.',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(outstationServiceSchema) }}
      />

      <Header />

      <main id="outstation-cabs">
        {/* 1. HERO SECTION — Cinematic with Highway Stream Canvas */}
        <section className="hero relative overflow-hidden">
          <Image
            src="/images/hero-car.png"
            alt="Outstation Cabs from Hyderabad with Apna Cars"
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
              <span>Intercity &bull; Pilgrimage &bull; Holidays</span>
            </p>
            <h1>
              Outstation Cabs<br />
              <span>from Hyderabad.</span>
            </h1>
            <p className="hero-copy">
              Book comfortable outstation journeys from Hyderabad with vehicle options for 
              family trips, business travel, pilgrimages and holidays across 40+ destinations.
            </p>
            <OutstationHeroCta 
              contactPhone={contactPhone} 
              displayPhone={displayPhone} 
            />
          </div>

          <div className="hero-note">
            <span>01</span>
            <span>42+ Destinations &bull; Clean Fleet</span>
            <span className="note-line" />
          </div>
        </section>

        {/* 2. TRUST BAR — 4 Interactive Columns with 3D Micro-Hover */}
        <section className="trust-bar bg-[var(--paper)]">
          <div className="trust-item">
            <ShieldCheck size={20} className="text-neutral-900" />
            <div>
              <strong>Verified chauffeurs</strong>
              <span>Seasoned highway & ghat drivers</span>
            </div>
          </div>
          <div className="trust-item">
            <Car size={20} className="text-neutral-900" />
            <div>
              <strong>Immaculate fleet</strong>
              <span>Clean sedans, MPVs & tempo coaches</span>
            </div>
          </div>
          <div className="trust-item">
            <Clock size={20} className="text-neutral-900" />
            <div>
              <strong>Punctual door pickup</strong>
              <span>24/7 doorstep pickup across Hyderabad</span>
            </div>
          </div>
          <div className="trust-item">
            <Compass size={20} className="text-neutral-900" />
            <div>
              <strong>Transparent billing</strong>
              <span>Zero hidden fees or surge markups</span>
            </div>
          </div>
        </section>

        {/* 3. POPULAR OUTSTATION ROUTES — Interactive Filter & 3D Cards */}
        <section id="destinations" className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow">Explore India</p>
              <h2>Popular outstation <em>routes.</em></h2>
            </div>
            <p>
              Browse 42 verified routes connecting Hyderabad to sacred pilgrimage towns, hill stations, coastal gems, and metropolitan hubs.
            </p>
          </div>

          <InteractiveDestinationGrid destinations={DESTINATIONS} />
        </section>

        {/* 4. OUTSTATION SERVICE DESCRIPTIONS (4 PILLARS) with 3D Tilt */}
        <section className="section bg-[#f0f0ec] border-y border-[var(--line)]">
          <div className="section-head">
            <div>
              <p className="eyebrow">Tailored mobility</p>
              <h2>Outstation travel <em>redefined.</em></h2>
            </div>
            <p>
              Whether you are planning a weekend break, spiritual darshan, or corporate travel, we have the right vehicle and chauffeur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TiltCard3D maxTilt={6} className="h-full">
              <div className="h-full bg-white p-8 border border-[var(--line)] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Car size={22} className="text-neutral-900" />
                    <h3 className="text-lg font-medium m-0">A. Intercity Journeys</h3>
                  </div>
                  <p className="text-xs text-[var(--soft)] leading-relaxed m-0">
                    Comfortable outstation journeys connecting Hyderabad to neighboring cities across Telangana, Andhra Pradesh, Karnataka, and Maharashtra. Round-trips and select one-way drops.
                  </p>
                </div>
              </div>
            </TiltCard3D>

            <TiltCard3D maxTilt={6} className="h-full">
              <div className="h-full bg-white p-8 border border-[var(--line)] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Plane size={22} className="text-neutral-900" />
                    <h3 className="text-lg font-medium m-0">B. Airport to Outstation</h3>
                  </div>
                  <p className="text-xs text-[var(--soft)] leading-relaxed m-0">
                    Landing at Rajiv Gandhi International Airport (RGIA, Shamshabad)? Flight-tracked pickups ensure a sanitized cab awaits you curbside for direct outstation transit without city traffic.
                  </p>
                </div>
              </div>
            </TiltCard3D>

            <TiltCard3D maxTilt={6} className="h-full">
              <div className="h-full bg-white p-8 border border-[var(--line)] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles size={22} className="text-neutral-900" />
                    <h3 className="text-lg font-medium m-0">C. Pilgrimage &amp; Holidays</h3>
                  </div>
                  <p className="text-xs text-[var(--soft)] leading-relaxed m-0">
                    Dedicated temple tours to sacred shrines including Tirupati, Srisailam, Shirdi, Mantralayam, and Yadagirigutta, alongside scenic holiday circuits to Ooty, Coorg, Munnar, and Goa.
                  </p>
                </div>
              </div>
            </TiltCard3D>

            <TiltCard3D maxTilt={6} className="h-full">
              <div className="h-full bg-white p-8 border border-[var(--line)] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 size={22} className="text-neutral-900" />
                    <h3 className="text-lg font-medium m-0">D. Personal &amp; Corporate</h3>
                  </div>
                  <p className="text-xs text-[var(--soft)] leading-relaxed m-0">
                    Professional transport solutions for corporate site visits, industrial plant inspections, client relocations, weddings, and family ceremonies. Transparent billing with official GST invoices.
                  </p>
                </div>
              </div>
            </TiltCard3D>
          </div>
        </section>

        {/* 5. VEHICLE CATEGORIES — 3D Fleet Hologram Cards */}
        <section id="fleet" className="section fleet">
          <div className="section-head">
            <div>
              <p className="eyebrow">Our fleet</p>
              <h2>Vehicle <em>categories.</em></h2>
            </div>
            <p>
              Verified, smoke-free, sanitized vehicles with spacious boot capacities and experienced highway drivers.
            </p>
          </div>

          <div className="fleet-grid">
            {VEHICLE_CATEGORIES.map((cat) => (
              <TiltCard3D key={cat.name} maxTilt={6} className="h-full">
                <article className="fleet-card flex h-full flex-col justify-between overflow-hidden bg-[var(--paper)] border border-[var(--line)]">
                  <div className="fleet-photo relative min-h-[260px] overflow-hidden bg-neutral-200">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 800px) 100vw, 50vw"
                      className="transition-transform duration-700 hover:scale-105 object-cover"
                    />
                  </div>
                  <div className="fleet-info flex flex-1 flex-col justify-between p-6">
                    <div>
                      <p className="eyebrow">{cat.models}</p>
                      <h3 className="text-xl font-medium">{cat.name}</h3>
                      <span className="fleet-meta block my-3 text-xs text-[var(--soft)]">{cat.seating} &bull; {cat.luggage}</span>
                      <p className="text-xs text-[var(--soft)] leading-relaxed mb-4">
                        {cat.bestFor}
                      </p>
                    </div>
                    <div className="fleet-bottom pt-4 border-t border-[var(--line)] flex items-center justify-between">
                      <strong className="text-xs">{cat.rateNote}</strong>
                      <a 
                        href={`https://wa.me/919988123444?text=${encodeURIComponent(cat.quoteText)}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-black"
                      >
                        Request Quote <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </article>
              </TiltCard3D>
            ))}
          </div>
        </section>

        {/* 6. WHY CHOOSE APNA CARS — Signature Dark Section */}
        <section className="dark-section">
          <div className="section dark-inner">
            <p className="eyebrow light">The Apna Cars Standard</p>
            <h2>Why choose <em>Apna Cars?</em></h2>
            
            <div className="benefit-grid">
              <div className="benefit">
                <span>01</span>
                <Car size={19} />
                <h3>Multiple Vehicle Categories</h3>
                <p>From comfortable Dzire sedans to spacious Innova Crysta MPVs and luxury Tempo Travellers for larger families.</p>
              </div>

              <div className="benefit">
                <span>02</span>
                <Clock size={19} />
                <h3>Convenient Trip Enquiries</h3>
                <p>Instant quotes over WhatsApp or telephone without lengthy registration forms or app sign-up friction.</p>
              </div>

              <div className="benefit">
                <span>03</span>
                <ShieldCheck size={19} />
                <h3>Clear Itemized Quotations</h3>
                <p>Transparent breakdown of distance allowances, driver charges, tolls, and taxes with zero surprise add-ons.</p>
              </div>

              <div className="benefit">
                <span>04</span>
                <Compass size={19} />
                <h3>Flexible Journey Planning</h3>
                <p>Customize your stopovers, darshan timings, meal halts, and scenic detours according to your family’s pace.</p>
              </div>

              <div className="benefit">
                <span>05</span>
                <Sparkles size={19} />
                <h3>Comfortable Travel</h3>
                <p>Well-maintained, clean cars with functioning AC, sanitized cabins, and luggage boot space for peace of mind.</p>
              </div>

              <div className="benefit">
                <span>06</span>
                <Phone size={19} />
                <h3>Verified Direct Support</h3>
                <p>Connect straight to our dedicated Hyderabad travel desk on 099881 23444 before, during, and after your trip.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. ROUTE BOOKING & ENQUIRY EXPERIENCE */}
        <section className="corporate section">
          <div>
            <p className="eyebrow">Booking guidance</p>
            <h2>Transparent terms &amp; <em>inclusions.</em></h2>
            <p>
              We believe in honest travel agreements. Every quote provided by our desk clearly distinguishes covered services from on-road actuals.
            </p>
            <div style={{ marginTop: '24px' }}>
              <a 
                className="button button-dark" 
                href={`tel:${contactPhone}`}
              >
                Call travel desk <Phone size={15} />
              </a>
            </div>
          </div>
          <div className="corporate-list">
            <div>
              <CheckCircle2 size={16} />
              <span><strong>Vehicle &amp; Chauffeur:</strong> Clean vehicle with experienced highway driver.</span>
            </div>
            <div>
              <CheckCircle2 size={16} />
              <span><strong>Doorstep Convenience:</strong> Punctual pickup and drop anywhere in Hyderabad.</span>
            </div>
            <div>
              <CheckCircle2 size={16} />
              <span><strong>Transparent Allowances:</strong> Clear driver bhatta and fuel allowances stated upfront.</span>
            </div>
            <div>
              <XCircle size={16} style={{ color: 'var(--soft)' }} />
              <span><strong>Toll &amp; Parking:</strong> Highway toll booths and parking tickets payable at actuals.</span>
            </div>
            <div>
              <XCircle size={16} style={{ color: 'var(--soft)' }} />
              <span><strong>Interstate Entry Tax:</strong> State border permits billed as per government receipts.</span>
            </div>
            <div>
              <XCircle size={16} style={{ color: 'var(--soft)' }} />
              <span><strong>Monument &amp; Darshan:</strong> Sightseeing tickets and special darshan passes self-arranged.</span>
            </div>
          </div>
        </section>

        {/* 8. HIGHWAY PROCESS STEPS WITH ANIMATED JOURNEY TIMELINE */}
        <AnimatedHighwayJourney
          milestones={OUTSTATION_MILESTONES}
          eyebrow="Easy Booking"
          heading="How your outstation journey to work works"
        />

        {/* 9. FREQUENTLY ASKED QUESTIONS */}
        <section className="section faq">
          <p className="eyebrow">Need to know</p>
          <h2>Frequently asked <em>questions.</em></h2>
          <FaqAccordion items={FAQS} />
        </section>

        {/* 10. FINAL CTA */}
        <section className="final-cta">
          <Image 
            src="/images/journey-road.png" 
            alt="Scenic Indian Highway outstation car rental" 
            fill 
            sizes="100vw" 
          />
          <div className="hero-overlay" />
          <div className="final-content">
            <p className="eyebrow light">Ready for the open road?</p>
            <h2>Plan your outstation<br /><em>journey today.</em></h2>
            <p>Tell us your destination, dates, and group size. We will arrange a verified car with an experienced chauffeur.</p>
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

      {/* Floating Automotive Cockpit HUD (Reveals past hero) */}
      <OutstationCockpitHud 
        destinations={DESTINATIONS.map(d => ({ id: d.id, name: d.name }))}
        defaultDestination="Vijayawada"
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
