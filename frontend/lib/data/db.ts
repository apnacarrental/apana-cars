import prisma from '../prisma';
import { cache } from 'react';

export const FALLBACK_CARS = [
  {
    id: 'sedan-1',
    name: 'Swift Dzire Sedan',
    slug: 'sedan',
    shortDescription: 'Comfortable 4-seater AC sedan for Hyderabad airport & city travel',
    content: 'The Swift Dzire Sedan is Hyderabad\'s most preferred cab for punctual airport transfers, corporate commutes, and local sightseeing tours.',
    seats: 4,
    luggage: 2,
    transmission: 'MANUAL',
    fuelType: 'PETROL',
    pricePerDay: 1800,
    petrolPricePerKm: 14.0,
    dieselPricePerKm: 15.0,
    isActive: true,
    sortOrder: 1,
    images: [{ id: 'img-1', media: { secureUrl: '/images/hero-car.png', altText: 'Swift Dzire Sedan' } }]
  },
  {
    id: 'ertiga-2',
    name: 'Maruti Ertiga',
    slug: 'ertiga',
    shortDescription: 'Spacious 6-seater MUV ideal for family outings and outstation tours',
    content: 'Maruti Ertiga provides comfortable 6-passenger capacity with roof-mounted AC, ample luggage boot space, and smooth highway stability.',
    seats: 6,
    luggage: 3,
    transmission: 'MANUAL',
    fuelType: 'PETROL',
    pricePerDay: 2800,
    petrolPricePerKm: 18.0,
    dieselPricePerKm: 19.0,
    isActive: true,
    sortOrder: 2,
    images: [{ id: 'img-2', media: { secureUrl: '/images/fleet-suv.png', altText: 'Maruti Ertiga' } }]
  },
  {
    id: 'crysta-3',
    name: 'Toyota Innova Crysta',
    slug: 'innova-crysta',
    shortDescription: 'Premium 7-seater luxury SUV with captain seats and executive comfort',
    content: 'Toyota Innova Crysta is the undisputed king of long-distance family and corporate highway travel with reclining captain chairs and powerful climate control.',
    seats: 7,
    luggage: 4,
    transmission: 'MANUAL',
    fuelType: 'DIESEL',
    pricePerDay: 3800,
    petrolPricePerKm: null,
    dieselPricePerKm: 22.0,
    isActive: true,
    sortOrder: 3,
    images: [{ id: 'img-3', media: { secureUrl: '/images/fleet-suv.png', altText: 'Toyota Innova Crysta' } }]
  },
  {
    id: 'urbania-4',
    name: 'Force Urbania 12 Seater',
    slug: 'force-urbania-12-seater',
    shortDescription: 'Brand new 12-seater luxury van with individual pushback seats & high roof',
    content: 'Experience next-generation group luxury with Force Urbania 12-seater. Features Mercedes-derived engine and aircraft-style individual AC blowers.',
    seats: 12,
    luggage: 8,
    transmission: 'MANUAL',
    fuelType: 'DIESEL',
    pricePerDay: 6500,
    petrolPricePerKm: null,
    dieselPricePerKm: 34.0,
    isActive: true,
    sortOrder: 4,
    images: [{ id: 'img-4', media: { secureUrl: '/images/journey-road.png', altText: 'Force Urbania 12 Seater' } }]
  },
  {
    id: 'urbania-5',
    name: 'Force Urbania 16 Seater',
    slug: 'force-urbania-16-seater',
    shortDescription: 'Grand luxury 16-seater van for wedding guests, delegations & pilgrimages',
    content: 'The 16-seater Force Urbania is Hyderabad\'s highest rated luxury van for large delegations, luxury weddings, and outstation trips.',
    seats: 16,
    luggage: 12,
    transmission: 'MANUAL',
    fuelType: 'DIESEL',
    pricePerDay: 8500,
    petrolPricePerKm: null,
    dieselPricePerKm: 42.0,
    isActive: true,
    sortOrder: 5,
    images: [{ id: 'img-5', media: { secureUrl: '/images/journey-road.png', altText: 'Force Urbania 16 Seater' } }]
  },
  {
    id: 'tempo-6',
    name: 'Tempo Traveller 12 Seater',
    slug: 'tempo-traveller-12-seater',
    shortDescription: 'Reliable 12-seater Maharaja tempo traveller with pushback seats and carrier',
    content: 'Maharaja 2x1 pushback seats, surround sound music system, top luggage carrier, and chilled air conditioning.',
    seats: 12,
    luggage: 8,
    transmission: 'MANUAL',
    fuelType: 'DIESEL',
    pricePerDay: 5500,
    petrolPricePerKm: null,
    dieselPricePerKm: 26.0,
    isActive: true,
    sortOrder: 6,
    images: [{ id: 'img-6', media: { secureUrl: '/images/journey-road.png', altText: 'Tempo Traveller 12 Seater' } }]
  },
  {
    id: 'tempo-7',
    name: 'Tempo Traveller 16 Seater',
    slug: 'tempo-traveller-16-seater',
    shortDescription: 'Spacious 16-seater Maharaja tempo traveller for student & corporate groups',
    content: 'Accommodates 16 passengers comfortably with individual AC vents, reading lights, and high luggage clearance.',
    seats: 16,
    luggage: 10,
    transmission: 'MANUAL',
    fuelType: 'DIESEL',
    pricePerDay: 7000,
    petrolPricePerKm: null,
    dieselPricePerKm: 30.0,
    isActive: true,
    sortOrder: 7,
    images: [{ id: 'img-7', media: { secureUrl: '/images/journey-road.png', altText: 'Tempo Traveller 16 Seater' } }]
  }
]

export const FALLBACK_SERVICES = [
  { id: 'srv-1', sortOrder: 1, title: 'Airport Transfers', shortDescription: '24/7 punctual pickups and drops to Rajiv Gandhi International Airport (RGIA)', slug: 'airport-cabs', startingPrice: 1499, priceUnit: 'onwards', isActive: true },
  { id: 'srv-2', sortOrder: 2, title: 'Hourly Rentals', shortDescription: 'Flexible 4-hour, 8-hour, and 12-hour local packages for meetings and errands', slug: 'hourly-cabs', startingPrice: 1800, priceUnit: '8 hrs / 80 km', isActive: true },
  { id: 'srv-3', sortOrder: 3, title: 'City Sightseeing', shortDescription: 'Curated day tours covering Hyderabad\'s top monuments and heritage spots', slug: 'sightseeing-cabs', startingPrice: 2499, priceUnit: 'full day tour', isActive: true },
  { id: 'srv-4', sortOrder: 4, title: 'Outstation Travel', shortDescription: 'One-way drops and roundtrips to Srisailam, Tirupati, Vijayawada, and Bangalore', slug: 'outstation-cabs', startingPrice: 2999, priceUnit: 'round trip', isActive: true },
  { id: 'srv-5', sortOrder: 5, title: 'Srisailam Pilgrimage Packages', shortDescription: 'Dedicated 1-day and 2-day darshan tours to Srisailam Mallikarjuna Temple', slug: 'srisailam-cabs', startingPrice: 4800, priceUnit: 'darshan roundtrip', isActive: true },
  { id: 'srv-6', sortOrder: 6, title: 'Force Urbania Rentals', shortDescription: 'Ultra-luxury 12 and 16 seater Force Urbania vans for corporate & family tours', slug: 'force-urbania-rent-in-hyderabad', startingPrice: 7500, priceUnit: 'per day', isActive: true },
]

export const FALLBACK_TESTIMONIALS = [
  { id: 't-1', customerName: 'Raghavendra Rao', locationContext: 'Hyderabad to Srisailam', review: 'Booked an Innova Crysta for our family trip to Srisailam. The driver was extremely polite and drove safely through the Nallamala ghat section. The car was spotless. Highly recommend Apna Cars!', rating: 5, isActive: true },
  { id: 't-2', customerName: 'Priya Sharma (Corporate HR)', locationContext: 'Hitec City Corporate Tour', review: 'We rented two 16-seater Force Urbania vans for our annual executive offsite. The comfort was exceptional—individual AC vents, USB chargers, and very smooth ride. Our team loved the experience.', rating: 5, isActive: true },
  { id: 't-3', customerName: 'Karthik Reddy', locationContext: 'RGIA Airport Drop', review: 'Punctual 3:30 AM airport pickup from Gachibowli to RGIA. Driver arrived 10 minutes early and helped with all our heavy international bags. Zero surge pricing. Will definitely book again.', rating: 5, isActive: true },
]

export const FALLBACK_FAQS = [
  { id: 'faq-1', question: 'How are outstation cab fares calculated?', answer: 'Outstation cab fares are calculated based on roundtrip distance multiplied by the vehicle\'s per-kilometer rate (e.g., ₹14/km for Sedan, ₹22/km for Innova Crysta), with a standard minimum 300 km/day charge. Tolls, state taxes, and parking are billed actuals.', isGlobal: true, sortOrder: 1 },
  { id: 'faq-2', question: 'Do you offer pickup directly from RGIA Airport?', answer: 'Yes! Our drivers pick you up directly from Rajiv Gandhi International Airport (Shamshabad) with a digital name-board. We track your flight arrival in real-time so there is zero waiting even if your flight is delayed.', isGlobal: true, sortOrder: 2 },
  { id: 'faq-3', question: 'What amenities are included with Force Urbania and Tempo Travellers?', answer: 'All our Force Urbania and Tempo Traveller vehicles include high-capacity dual AC, individual reclining pushback seats, USB charging sockets for every row, ambient reading lights, LED TV/surround sound music system, and large luggage storage.', isGlobal: true, sortOrder: 3 },
  { id: 'faq-4', question: 'Can I book a same-day return trip to Srisailam?', answer: 'Yes, same-day return packages are very popular. The driver will pick you up early morning (around 5:00 AM), reach Srisailam in approx 4.5 hours, assist with darshan timings, and bring you back to Hyderabad by late evening.', isGlobal: true, sortOrder: 4 },
  { id: 'faq-5', question: 'Are there any hidden charges or surge pricing during peak hours?', answer: 'No. Apna Cars offers 100% transparent pricing. You get a clear fare breakdown before confirming your ride, with zero surge pricing during peak hours, weekends, or festivals.', isGlobal: true, sortOrder: 5 },
]

export const FALLBACK_LOCATIONS = [
  { id: 'loc-1', name: 'RGIA Airport (Shamshabad)', slug: 'shamshabad-airport', type: 'AIRPORT', description: 'Hyderabad Rajiv Gandhi International Airport car rental and taxi hub.', isActive: true, parent: null, children: [], faqs: [] },
  { id: 'loc-2', name: 'Gachibowli & Financial District', slug: 'gachibowli', type: 'AREA', description: 'Financial District and IT corridor car rental hub.', isActive: true, parent: null, children: [], faqs: [] },
  { id: 'loc-3', name: 'Hitec City / Madhapur', slug: 'hitec-city', type: 'AREA', description: 'Cyberabad IT hub cab services and chauffeur-driven cabs.', isActive: true, parent: null, children: [], faqs: [] },
  { id: 'loc-4', name: 'Jubilee Hills & Banjara Hills', slug: 'jubilee-hills', type: 'AREA', description: 'Luxury car rentals and premium chauffeur services in Jubilee Hills.', isActive: true, parent: null, children: [], faqs: [] },
  { id: 'loc-5', name: 'Secunderabad & Uppal', slug: 'secunderabad', type: 'CITY', description: 'Secunderabad railway station and Uppal junction taxi services.', isActive: true, parent: null, children: [], faqs: [] },
  { id: 'loc-6', name: 'Kukatpally & Miyapur', slug: 'kukatpally', type: 'AREA', description: 'Kukatpally Housing Board and Miyapur metro car rental services.', isActive: true, parent: null, children: [], faqs: [] },
  { id: 'loc-7', name: 'Begumpet & Somajiguda', slug: 'begumpet', type: 'AREA', description: 'Old airport road and central Hyderabad car hire.', isActive: true, parent: null, children: [], faqs: [] },
  { id: 'loc-8', name: 'Srisailam Highway Route', slug: 'srisailam-route', type: 'DESTINATION', description: 'Srisailam pilgrimage highway cab rentals.', isActive: true, parent: null, children: [], faqs: [] },
]

export const getFeaturedCars = cache(async () => {
  try {
    const cars = await prisma.car.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: {
        images: {
          include: { media: true },
          orderBy: { sortOrder: 'asc' },
          take: 1
        },
      },
    });
    if (cars && cars.length > 0) return cars;
  } catch (e) {
    console.warn('getFeaturedCars db error, using fallback:', e);
  }
  return FALLBACK_CARS as any[];
})

export const getCars = cache(async () => {
  try {
    const cars = await prisma.car.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: {
        images: {
          include: { media: true },
          orderBy: { sortOrder: 'asc' },
          take: 1
        },
      },
    });
    if (cars && cars.length > 0) return cars;
  } catch (e) {
    console.warn('getCars db error, using fallback:', e);
  }
  return FALLBACK_CARS as any[];
})

export const getCarBySlug = cache(async (slug: string) => {
  const decoded = decodeURIComponent(slug);
  try {
    const car = await prisma.car.findFirst({
      where: {
        OR: [
          { slug, isActive: true },
          { slug: decoded, isActive: true },
        ],
      },
      include: {
        images: {
          include: { media: true },
          orderBy: { sortOrder: 'asc' }
        },
        categories: true,
        faqs: true,
        brand: true
      }
    });
    if (car) return car;
  } catch (e) {
    console.warn('getCarBySlug db error, using fallback:', e);
  }
  return (FALLBACK_CARS.find(c => c.slug === slug || c.slug === decoded) as any) || null;
})

let serviceColumnsEnsured = false;
async function ensureDbColumns() {
  if (serviceColumnsEnsured) return;
  try {
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "startingPrice" DOUBLE PRECISION;
      ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "priceUnit" TEXT;
      ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "showInQuickBar" BOOLEAN DEFAULT true;
      ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "passengers" TEXT;
    `);
    serviceColumnsEnsured = true;
  } catch (err) {
    // safe to ignore
  }
}

export const getServices = cache(async () => {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
    if (services && services.length > 0) return services;
  } catch (e) {
    console.warn('getServices db error, attempting auto-migration:', e);
    await ensureDbColumns();
    try {
      const services = await prisma.service.findMany({
        where: { isActive: true },
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      });
      if (services && services.length > 0) return services;
    } catch (retryErr) {
      console.warn('Retry failed, using fallback:', retryErr);
    }
  }
  return FALLBACK_SERVICES as any[];
})

export const getServiceBySlug = cache(async (slug: string) => {
  const decoded = decodeURIComponent(slug);
  try {
    const service = await prisma.service.findFirst({
      where: {
        OR: [
          { slug, isActive: true },
          { slug: decoded, isActive: true },
        ],
      },
      include: {
        faqs: true
      }
    });
    if (service) return service;
  } catch (e) {
    console.warn('getServiceBySlug db error, using fallback:', e);
  }
  return (FALLBACK_SERVICES.find(s => s.slug === slug || s.slug === decoded) as any) || null;
})

export const getLocations = cache(async () => {
  try {
    const locations = await prisma.location.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'asc' },
    });
    if (locations && locations.length > 0) return locations;
  } catch (e) {
    console.warn('getLocations db error, using fallback:', e);
  }
  return FALLBACK_LOCATIONS as any[];
})

export const getLocationBySlug = cache(async (slug: string) => {
  const decoded = decodeURIComponent(slug);
  try {
    const location = await prisma.location.findFirst({
      where: {
        OR: [
          { slug, isActive: true },
          { slug: decoded, isActive: true },
        ],
      },
      include: {
        parent: true,
        children: true,
        faqs: true
      }
    });
    if (location) return location;
  } catch (e) {
    console.warn('getLocationBySlug db error, using fallback:', e);
  }
  return (FALLBACK_LOCATIONS.find(l => l.slug === slug || l.slug === decoded) as any) || null;
})

export const getRouteBySlug = cache(async (slug: string) => {
  const decoded = decodeURIComponent(slug);
  try {
    const route = await prisma.route.findFirst({
      where: {
        OR: [
          { slug, isActive: true },
          { slug: decoded, isActive: true },
        ],
      },
      include: {
        faqs: true
      }
    });
    if (route) return route;
  } catch (e) {
    console.warn('getRouteBySlug db error:', e);
  }
  return null;
})

export const FALLBACK_BLOGS = [
  {
    id: 'blog-1',
    title: 'Hyderabad to Srisailam Highway Travel Guide & Ghat Road Timings',
    slug: 'hyderabad-to-srisailam-travel-guide',
    excerpt: 'Everything you need to know about traveling from Hyderabad to Srisailam Mallikarjuna Swamy Temple—including Nallamala forest checkpost timings, ghat section tips, toll plazas, and best cab options.',
    content: '<h2>The Spiritual Journey to Mallikarjuna Jyotirlinga</h2><p>Located roughly 215 kilometers south of Hyderabad amidst the picturesque Nallamala Tiger Reserve hills, the Sri Bhramaramba Mallikarjuna Swamy Temple in Srisailam is one of the most revered pilgrimage destinations in India.</p><h3>Route & Highway Conditions</h3><p>The journey from Hyderabad to Srisailam follows NH 765 via Dindi, Kalwakurthy, and Munnanur. The highway is largely a smooth paved road before ascending into the verdant Nallamala Ghats.</p><h3>Critical Ghat Road & Forest Checkpost Timings</h3><p>The Nallamala Tiger Reserve forest gates operate between 6:00 AM and 9:00 PM with night curfew from 9:00 PM to 6:00 AM.</p>',
    status: 'PUBLISHED',
    publishedAt: new Date('2026-10-10'),
    createdAt: new Date('2026-10-10'),
    category: { name: 'Pilgrimage Guides', slug: 'pilgrimage-guides' },
  },
  {
    id: 'blog-2',
    title: 'Top 8 Must-Visit Sightseeing Places in Hyderabad for a 1-Day Cab Tour',
    slug: 'top-places-to-visit-in-hyderabad-1-day-tour',
    excerpt: 'How to explore Charminar, Golconda Fort, Chowmahalla Palace, Salar Jung Museum, and Hussain Sagar Lake seamlessly in a private air-conditioned cab without traffic stress.',
    content: '<h2>Maximizing 1 Day in the City of Pearls</h2><p>Hyderabad blends four centuries of heritage with modern cosmopolitan life. For families and business travelers, hiring a private cab is the smartest way to see the top monuments comfortably.</p><h3>Curated 1-Day Itinerary</h3><p>Start at Golconda Fort, visit Qutb Shahi Tombs, enjoy Hyderabadi Biryani, tour Chowmahalla Palace, explore Charminar, and conclude at Hussain Sagar Lake.</p>',
    status: 'PUBLISHED',
    publishedAt: new Date('2026-10-12'),
    createdAt: new Date('2026-10-12'),
    category: { name: 'Sightseeing & Heritage', slug: 'sightseeing-tours' },
  },
  {
    id: 'blog-3',
    title: 'RGIA Shamshabad Airport Cab Guide: How to Avoid Surge Pricing & Delays',
    slug: 'hyderabad-rgia-airport-cab-guide-no-surge',
    excerpt: 'Plan your airport transfers to and from Rajiv Gandhi International Airport with zero surge pricing, verified chauffeurs, 24/7 flight delay tracking, and doorstep pickup across Cyberabad.',
    content: '<h2>Punctual Airport Transfers in Hyderabad</h2><p>Rajiv Gandhi International Airport (RGIA) in Shamshabad is located between 28 km to 45 km from Hitec City, Gachibowli, and Secunderabad.</p><h3>Why Pre-Book with Apna Cars?</h3><p>Flat transparent pricing, live flight delay tracking, and verified chauffeurs with heavy luggage assistance.</p>',
    status: 'PUBLISHED',
    publishedAt: new Date('2026-10-14'),
    createdAt: new Date('2026-10-14'),
    category: { name: 'Airport & Business Travel', slug: 'airport-travel' },
  },
]

export const getPublishedBlogs = cache(async () => {
  try {
    const blogs = await prisma.blog.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
      include: { category: true }
    });
    if (blogs && blogs.length > 0) return blogs;
  } catch (e) {
    console.warn('getPublishedBlogs db error, using fallback:', e);
  }
  return FALLBACK_BLOGS as any[];
})

export const getBlogBySlug = cache(async (slug: string) => {
  const decoded = decodeURIComponent(slug);
  try {
    const blog = await prisma.blog.findFirst({
      where: {
        OR: [
          { slug, status: 'PUBLISHED' },
          { slug: decoded, status: 'PUBLISHED' },
        ],
      },
      include: { category: true }
    });
    if (blog) return blog;
  } catch (e) {
    console.warn('getBlogBySlug db error, using fallback:', e);
  }
  return (FALLBACK_BLOGS.find(b => b.slug === slug || b.slug === decoded) as any) || null;
})

export async function getTestimonials() {
  try {
    const items = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    if (items && items.length > 0) return items;
  } catch (e) {
    console.warn('getTestimonials db error, using fallback:', e);
  }
  return FALLBACK_TESTIMONIALS as any[];
}

export async function getGlobalFaqs() {
  try {
    const items = await prisma.fAQ.findMany({
      where: { isGlobal: true },
      orderBy: { sortOrder: 'asc' },
    });
    if (items && items.length > 0) return items;
  } catch (e) {
    console.warn('getGlobalFaqs db error, using fallback:', e);
  }
  return FALLBACK_FAQS as any[];
}

export const getRoutes = cache(async () => {
  try {
    return await prisma.route.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });
  } catch (e) {
    console.warn('getRoutes db error:', e);
    return [];
  }
})
