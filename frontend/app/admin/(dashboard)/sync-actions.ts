'use server'

import { requireAdmin } from '@/lib/admin-auth'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { Transmission, FuelType } from '@prisma/client'

export async function syncWebsiteDataAction(): Promise<{ success: boolean; message: string }> {
  await requireAdmin()

  try {
    // 1. Seed / Upsert Brands
    const maruti = await prisma.brand.upsert({
      where: { slug: 'maruti-suzuki' },
      update: { name: 'Maruti Suzuki' },
      create: { name: 'Maruti Suzuki', slug: 'maruti-suzuki' }
    })

    const toyota = await prisma.brand.upsert({
      where: { slug: 'toyota' },
      update: { name: 'Toyota' },
      create: { name: 'Toyota', slug: 'toyota' }
    })

    const forceMotors = await prisma.brand.upsert({
      where: { slug: 'force-motors' },
      update: { name: 'Force Motors' },
      create: { name: 'Force Motors', slug: 'force-motors' }
    })

    const hyundai = await prisma.brand.upsert({
      where: { slug: 'hyundai' },
      update: { name: 'Hyundai' },
      create: { name: 'Hyundai', slug: 'hyundai' }
    })

    const mahindra = await prisma.brand.upsert({
      where: { slug: 'mahindra' },
      update: { name: 'Mahindra' },
      create: { name: 'Mahindra', slug: 'mahindra' }
    })

    // 2. Media records for car assets
    const heroCarMedia = await prisma.media.upsert({
      where: { publicId: '/images/hero-car.png' },
      update: { secureUrl: '/images/hero-car.png' },
      create: {
        publicId: '/images/hero-car.png',
        secureUrl: '/images/hero-car.png',
        altText: 'Sedan rental car Hyderabad',
      }
    })

    const suvMedia = await prisma.media.upsert({
      where: { publicId: '/images/fleet-suv.png' },
      update: { secureUrl: '/images/fleet-suv.png' },
      create: {
        publicId: '/images/fleet-suv.png',
        secureUrl: '/images/fleet-suv.png',
        altText: 'SUV and MUV rental car Hyderabad',
      }
    })

    const vanMedia = await prisma.media.upsert({
      where: { publicId: '/images/journey-road.png' },
      update: { secureUrl: '/images/journey-road.png' },
      create: {
        publicId: '/images/journey-road.png',
        secureUrl: '/images/journey-road.png',
        altText: 'Force Urbania and Tempo Traveller van Hyderabad',
      }
    })

    // 3. Cars with Full Specs, Pricing, Fuel per KM, and Complete SEO
    const carData = [
      {
        name: 'Swift Dzire Sedan',
        slug: 'sedan',
        brandId: maruti.id,
        seats: 4,
        luggage: 2,
        transmission: Transmission.MANUAL,
        fuelType: FuelType.PETROL,
        pricePerDay: 1800,
        petrolPricePerKm: 14.0,
        dieselPricePerKm: 15.0,
        isActive: true,
        sortOrder: 1,
        shortDescription: 'Comfortable 4-seater AC sedan for Hyderabad airport & city travel',
        content: 'The Swift Dzire Sedan is Hyderabad\'s most preferred cab for punctual airport transfers, corporate commutes, and local sightseeing tours. Clean interiors, dual AC, and professional chauffeurs.',
        mediaId: heroCarMedia.id,
        seoMetadata: {
          title: 'Swift Dzire Sedan Cab Rental in Hyderabad | Apna Cars',
          description: 'Book Swift Dzire sedan cab in Hyderabad for airport transfers, local city rides, and outstation trips. Affordable per km rates starting at ₹14/km.',
          canonical_url: 'https://apnacars.com/fleet/sedan',
          focus_keyword: 'swift dzire car rental hyderabad',
          secondary_keywords: ['sedan cab hyderabad', 'dzire taxi hire', 'airport sedan cab'],
          og_title: 'Rent Swift Dzire Sedan in Hyderabad | Affordable ₹14/km',
          og_description: 'Best rates for Swift Dzire sedan car rentals in Hyderabad with professional chauffeurs.'
        }
      },
      {
        name: 'Maruti Ertiga',
        slug: 'ertiga',
        brandId: maruti.id,
        seats: 6,
        luggage: 3,
        transmission: Transmission.MANUAL,
        fuelType: FuelType.PETROL,
        pricePerDay: 2800,
        petrolPricePerKm: 18.0,
        dieselPricePerKm: 19.0,
        isActive: true,
        sortOrder: 2,
        shortDescription: 'Spacious 6-seater MUV ideal for family outings and outstation tours',
        content: 'Maruti Ertiga provides comfortable 6-passenger capacity with roof-mounted AC, ample luggage boot space, and smooth highway stability for Srisailam, Tirupati, and local Hyderabad packages.',
        mediaId: suvMedia.id,
        seoMetadata: {
          title: 'Maruti Ertiga Cab Rental Hyderabad | 6 Seater Car Hire',
          description: 'Hire 6-seater Maruti Ertiga in Hyderabad for family trips, airport pickup/drop, and outstation travel. Affordable rates starting at ₹18/km.',
          canonical_url: 'https://apnacars.com/fleet/ertiga',
          focus_keyword: 'ertiga car rental hyderabad',
          secondary_keywords: ['6 seater cab hyderabad', 'ertiga taxi hire', 'outstation ertiga cab'],
          og_title: 'Rent Maruti Ertiga in Hyderabad | 6-Seater Family MUV',
          og_description: 'Book Maruti Ertiga for Hyderabad local and outstation trips with verified drivers.'
        }
      },
      {
        name: 'Toyota Innova Crysta',
        slug: 'innova-crysta',
        brandId: toyota.id,
        seats: 7,
        luggage: 4,
        transmission: Transmission.MANUAL,
        fuelType: FuelType.DIESEL,
        pricePerDay: 3800,
        dieselPricePerKm: 22.0,
        isActive: true,
        sortOrder: 3,
        shortDescription: 'Premium 7-seater luxury SUV with captain seats and executive comfort',
        content: 'Toyota Innova Crysta is the undisputed king of long-distance family and corporate highway travel. Supreme legroom, reclining captain chairs, powerful climate control, and unmatched safety.',
        mediaId: suvMedia.id,
        seoMetadata: {
          title: 'Innova Crysta Car Rental Hyderabad | 7 Seater Luxury SUV',
          description: 'Rent Toyota Innova Crysta in Hyderabad with experienced driver for outstation, airport, and luxury travel. Starting at ₹22/km.',
          canonical_url: 'https://apnacars.com/fleet/innova-crysta',
          focus_keyword: 'innova crysta car rental hyderabad',
          secondary_keywords: ['innova hire hyderabad', '7 seater luxury taxi', 'outstation innova cab'],
          og_title: 'Toyota Innova Crysta Rental in Hyderabad | Premium 7-Seater',
          og_description: 'Book Toyota Innova Crysta for outstation pilgrimages and executive travel from Hyderabad.'
        }
      },
      {
        name: 'Force Urbania 12 Seater',
        slug: 'force-urbania-12-seater',
        brandId: forceMotors.id,
        seats: 12,
        luggage: 8,
        transmission: Transmission.MANUAL,
        fuelType: FuelType.DIESEL,
        pricePerDay: 6500,
        dieselPricePerKm: 34.0,
        isActive: true,
        sortOrder: 4,
        shortDescription: 'Brand new 12-seater luxury van with individual pushback seats & high roof',
        content: 'Experience next-generation group luxury with Force Urbania 12-seater. Featuring Mercedes-derived FM 2.6 CR ED diesel engine, aircraft-style AC blowers, USB ports for every seat, and generous luggage boot space.',
        mediaId: vanMedia.id,
        seoMetadata: {
          title: 'Force Urbania 12 Seater Rent in Hyderabad | Luxury Van Hire',
          description: 'Rent brand new 12 seater Force Urbania in Hyderabad for corporate events, family getaways, and outstation pilgrimages. Premium luxury van at ₹34/km.',
          canonical_url: 'https://apnacars.com/fleet/force-urbania-12-seater',
          focus_keyword: 'force urbania 12 seater rent hyderabad',
          secondary_keywords: ['urbania rental hyderabad', '12 seater luxury van hire', 'tempo traveller alternative'],
          og_title: 'Force Urbania 12-Seater Luxury Van on Rent in Hyderabad',
          og_description: 'Luxury 12-seater Force Urbania rental in Hyderabad with executive pushback seats.'
        }
      },
      {
        name: 'Force Urbania 16 Seater',
        slug: 'force-urbania-16-seater',
        brandId: forceMotors.id,
        seats: 16,
        luggage: 12,
        transmission: Transmission.MANUAL,
        fuelType: FuelType.DIESEL,
        pricePerDay: 8500,
        dieselPricePerKm: 42.0,
        isActive: true,
        sortOrder: 5,
        shortDescription: 'Grand luxury 16-seater van for wedding guests, delegations & pilgrimages',
        content: 'The 16-seater Force Urbania is Hyderabad\'s highest rated luxury van for large delegations, luxury weddings, and outstation trips to Srisailam, Tirupati, and Vizag.',
        mediaId: vanMedia.id,
        seoMetadata: {
          title: 'Force Urbania 16 Seater on Rent in Hyderabad | Luxury Traveller',
          description: 'Hire 16-seater Force Urbania luxury van in Hyderabad. Best rates for corporate outings, weddings, and group pilgrimage tours at ₹42/km.',
          canonical_url: 'https://apnacars.com/fleet/force-urbania-16-seater',
          focus_keyword: 'force urbania 16 seater rent in hyderabad',
          secondary_keywords: ['16 seater luxury tempo traveller', 'urbania van hire hyderabad', 'group tour bus hyderabad'],
          og_title: '16-Seater Force Urbania Luxury Van Hire in Hyderabad',
          og_description: 'Book 16-seater Force Urbania van for wedding guest transfers and group vacations.'
        }
      },
      {
        name: 'Tempo Traveller 12 Seater',
        slug: 'tempo-traveller-12-seater',
        brandId: forceMotors.id,
        seats: 12,
        luggage: 8,
        transmission: Transmission.MANUAL,
        fuelType: FuelType.DIESEL,
        pricePerDay: 5500,
        dieselPricePerKm: 26.0,
        isActive: true,
        sortOrder: 6,
        shortDescription: 'Reliable 12-seater Maharaja tempo traveller with pushback seats and carrier',
        content: 'Maharaja 2x1 pushback seats, surround sound music system, top luggage carrier, and chilled air conditioning for affordable group temple and sightseeing tours from Hyderabad.',
        mediaId: vanMedia.id,
        seoMetadata: {
          title: '12 Seater Tempo Traveller for Rent in Hyderabad | Apna Cars',
          description: 'Rent 12-seater Maharaja Tempo Traveller in Hyderabad for Srisailam, Tirupati, and local sightseeing. Verified chauffeurs at ₹26/km.',
          canonical_url: 'https://apnacars.com/fleet/tempo-traveller-12-seater',
          focus_keyword: 'tempo traveller 12 seater hyderabad',
          secondary_keywords: ['12 seater tempo rental', 'hyderabad to srisailam tempo traveller', 'maharaja seats tempo'],
          og_title: '12 Seater Tempo Traveller on Rent in Hyderabad',
          og_description: 'Affordable 12-seater Tempo Traveller rentals in Hyderabad with Maharaja seats.'
        }
      },
      {
        name: 'Tempo Traveller 16 Seater',
        slug: 'tempo-traveller-16-seater',
        brandId: forceMotors.id,
        seats: 16,
        luggage: 10,
        transmission: Transmission.MANUAL,
        fuelType: FuelType.DIESEL,
        pricePerDay: 7000,
        dieselPricePerKm: 30.0,
        isActive: true,
        sortOrder: 7,
        shortDescription: 'Spacious 16-seater Maharaja tempo traveller for student & corporate groups',
        content: 'Accommodates 16 passengers comfortably with individual AC vents, reading lights, high luggage clearance, and skilled highway drivers.',
        mediaId: vanMedia.id,
        seoMetadata: {
          title: '16 Seater Tempo Traveller for Rent in Hyderabad | Apna Cars',
          description: 'Hire 16-seater Tempo Traveller in Hyderabad with pushback seats and AC. Best rates for group outstation tours and pilgrimages at ₹30/km.',
          canonical_url: 'https://apnacars.com/fleet/tempo-traveller-16-seater',
          focus_keyword: '16 seater tempo traveller hyderabad',
          secondary_keywords: ['16 seater tempo hire', 'outstation tempo traveller hyderabad', 'corporate tempo rental'],
          og_title: '16-Seater Tempo Traveller Rental in Hyderabad',
          og_description: 'Reliable 16-seater Tempo Traveller in Hyderabad for group pilgrimage and tour packages.'
        }
      }
    ]

    for (const carItem of carData) {
      const { mediaId, ...carFields } = carItem
      const car = await prisma.car.upsert({
        where: { slug: carFields.slug },
        update: carFields,
        create: carFields
      })

      await prisma.carImage.upsert({
        where: {
          carId_mediaId: {
            carId: car.id,
            mediaId: mediaId
          }
        },
        update: { sortOrder: 0 },
        create: {
          carId: car.id,
          mediaId: mediaId,
          sortOrder: 0
        }
      })
    }

    // 4. Routes & Packages
    const routesData = [
      {
        origin: 'Hyderabad',
        destination: 'Srisailam',
        slug: 'hyderabad-to-srisailam',
        title: 'Hyderabad to Srisailam Temple Cab Package',
        distance: 230,
        duration: '4.5 Hours',
        startingPrice: 4500,
        content: 'Complete roundtrip and 1-day/2-day darshan packages for Mallikarjuna Jyotirlinga and Bhramaramba Devi Temple from Hyderabad.',
        inclusions: ['Driver allowance', 'Vehicle fuel', 'AC throughout journey'],
        exclusions: ['Tolls and parking fees', 'Darshan entry tickets'],
        isActive: true,
        seoMetadata: {
          title: 'Hyderabad to Srisailam Cab Packages | Same Day & 2-Day Tours',
          description: 'Book Hyderabad to Srisailam cab with Apna Cars. Clean Sedans, Innova Crysta, and Tempo Travellers. Doorstep pickup and punctual service.',
          canonical_url: 'https://apnacars.com/srisailam-cabs'
        }
      },
      {
        origin: 'Hyderabad',
        destination: 'Tirupati',
        slug: 'hyderabad-to-tirupati',
        title: 'Hyderabad to Tirupati Balaji Outstation Cab',
        distance: 560,
        duration: '9.5 Hours',
        startingPrice: 9500,
        content: 'Direct comfortable outstation cabs from Hyderabad to Tirumala Balaji Temple with seasoned highway drivers and flexible breaks.',
        inclusions: ['Driver allowance', 'Vehicle fuel', 'State highway assistance'],
        exclusions: ['Tolls and parking', 'Interstate border permit fees'],
        isActive: true,
        seoMetadata: {
          title: 'Hyderabad to Tirupati Cab Service | Roundtrip Car Rental',
          description: 'Rent Innova Crysta, Ertiga, or Tempo Traveller for Hyderabad to Tirupati Balaji pilgrimage. Affordable rates and safe night driving.',
          canonical_url: 'https://apnacars.com/outstation-cabs'
        }
      },
      {
        origin: 'Hyderabad',
        destination: 'Vijayawada',
        slug: 'hyderabad-to-vijayawada',
        title: 'Hyderabad to Vijayawada One-Way & Roundtrip Cab',
        distance: 275,
        duration: '5 Hours',
        startingPrice: 5200,
        content: 'Fast and comfortable highway transfers between Hyderabad and Vijayawada via NH65. One-way drops and return journeys available.',
        inclusions: ['Driver bata', 'Fuel costs', 'Luggage support'],
        exclusions: ['Tolls and parking fees'],
        isActive: true,
        seoMetadata: {
          title: 'Hyderabad to Vijayawada Taxi Service | One Way & Return Cabs',
          description: 'Book Hyderabad to Vijayawada taxi at competitive per km rates. Verified chauffeurs and instant confirmation.',
          canonical_url: 'https://apnacars.com/outstation-cabs'
        }
      },
      {
        origin: 'Hyderabad City',
        destination: 'Local Sightseeing',
        slug: 'hyderabad-local-sightseeing',
        title: 'Hyderabad Local 8hr/80km & 12hr/120km Sightseeing Tour',
        distance: 80,
        duration: '8 to 12 Hours',
        startingPrice: 2200,
        content: 'Explore Charminar, Golconda Fort, Ramoji Film City, Salar Jung Museum, and Hussain Sagar with full flexibility and air-conditioned comfort.',
        inclusions: ['Dedicated car and chauffeur', 'Fuel up to package limit', 'Free AC idling during wait'],
        exclusions: ['Monument entry tickets', 'Parking fees'],
        isActive: true,
        seoMetadata: {
          title: 'Hyderabad City Sightseeing Cabs | 8hr 80km Full Day Packages',
          description: 'Hire local sightseeing taxi in Hyderabad. Visit Charminar, Golconda Fort, and Ramoji Film City in comfort.',
          canonical_url: 'https://apnacars.com/sightseeing-cabs'
        }
      },
      {
        origin: 'Hyderabad',
        destination: 'RGIA Airport',
        slug: 'hyderabad-rgia-airport-cabs',
        title: 'RGIA Airport Pick and Drop Cab Service',
        distance: 35,
        duration: '45 to 60 Mins',
        startingPrice: 999,
        content: 'On-time 24/7 airport pickup and drops across Gachibowli, Hitec City, Jubilee Hills, Secunderabad, and Begumpet with flight delay monitoring.',
        inclusions: ['Doorstep pickup', 'Luggage assistance', 'Toll charges via Outer Ring Road'],
        exclusions: ['Airport waiting charges after 45 mins free period'],
        isActive: true,
        seoMetadata: {
          title: 'Hyderabad Airport Cab Service | RGIA Pickup & Drop Cabs',
          description: 'Book 24/7 airport taxi in Hyderabad. Transparent fixed pricing, zero cancellation fees, and flight tracking.',
          canonical_url: 'https://apnacars.com/airport-cabs'
        }
      }
    ]

    for (const r of routesData) {
      await prisma.route.upsert({
        where: { origin_destination: { origin: r.origin, destination: r.destination } },
        update: r,
        create: r
      })
    }

    // 5. Services
    const servicesData = [
      {
        title: 'Airport Transfers',
        slug: 'airport-cabs',
        shortDescription: '24/7 punctual pickups and drops to Rajiv Gandhi International Airport (RGIA)',
        content: 'Reliable airport taxi service connecting Hyderabad city and RGIA with zero surge pricing and flight tracking.',
        isActive: true,
        sortOrder: 1,
        seoMetadata: {
          title: 'Airport Taxi Hyderabad | RGIA Airport Cabs',
          description: 'Book reliable airport cabs in Hyderabad starting at ₹999 with zero surge and flight tracking.'
        }
      },
      {
        title: 'Hourly Rentals',
        slug: 'hourly-cabs',
        shortDescription: 'Flexible 4-hour, 8-hour, and 12-hour local packages for meetings and errands',
        content: 'Keep a car and driver at your disposal for business meetings, shopping sprees, and family functions.',
        isActive: true,
        sortOrder: 2,
        seoMetadata: {
          title: 'Hourly Car Rental Hyderabad | 4hr, 8hr, 12hr Packages',
          description: 'Rent a car with chauffeur by the hour in Hyderabad. Flexible packages for corporate and personal use.'
        }
      },
      {
        title: 'City Sightseeing',
        slug: 'sightseeing-cabs',
        shortDescription: 'Curated day tours covering Hyderabad\'s top monuments and heritage spots',
        content: 'Visit Charminar, Golconda Fort, Birla Mandir, and Ramoji Film City in supreme comfort.',
        isActive: true,
        sortOrder: 3,
        seoMetadata: {
          title: 'Hyderabad Sightseeing Cabs | Full Day City Tour Taxi',
          description: 'Explore the City of Pearls with professional tour chauffeurs. Transparent rates and customized itineraries.'
        }
      },
      {
        title: 'Outstation Travel',
        slug: 'outstation-cabs',
        shortDescription: 'One-way drops and roundtrips to Srisailam, Tirupati, Vijayawada, and Bangalore',
        content: 'Affordable per-kilometer outstation car rentals with experienced highway drivers.',
        isActive: true,
        sortOrder: 4,
        seoMetadata: {
          title: 'Outstation Cabs Hyderabad | Roundtrip & One Way Taxi',
          description: 'Book outstation cabs from Hyderabad at competitive per km rates. Verified chauffeurs and 24/7 customer support.'
        }
      },
      {
        title: 'Srisailam Pilgrimage Packages',
        slug: 'srisailam-cabs',
        shortDescription: 'Dedicated 1-day and 2-day darshan tours to Srisailam Mallikarjuna Temple',
        content: 'Comfortable temple tours through the scenic Nallamala forest ghat road with experienced hill drivers.',
        isActive: true,
        sortOrder: 5,
        seoMetadata: {
          title: 'Hyderabad to Srisailam Cab Package | Darshan Car Hire',
          description: 'Book special Srisailam pilgrimage cabs from Hyderabad with doorstep pickup and verified chauffeurs.'
        }
      },
      {
        title: 'Force Urbania Rentals',
        slug: 'force-urbania-rent-in-hyderabad',
        shortDescription: 'Ultra-luxury 12 and 16 seater Force Urbania vans for corporate & family tours',
        content: 'Brand new Force Urbania vans with individual pushback seats, dual AC, and high-roof luxury.',
        isActive: true,
        sortOrder: 6,
        seoMetadata: {
          title: 'Force Urbania on Rent in Hyderabad | 12 & 16 Seater Luxury Vans',
          description: 'Hire Force Urbania in Hyderabad for wedding guest transfers, corporate travel, and group tours.'
        }
      }
    ]

    for (const s of servicesData) {
      await prisma.service.upsert({
        where: { slug: s.slug },
        update: s,
        create: s
      })
    }

    // 6. FAQs
    const faqsData = [
      {
        question: 'How are outstation cab fares calculated?',
        answer: 'Outstation cab fares are calculated based on roundtrip distance multiplied by the vehicle\'s per-kilometer rate (e.g., ₹14/km for Sedan, ₹22/km for Innova Crysta), with a standard minimum 300 km/day charge. Tolls, state taxes, and parking are billed actuals.',
        isGlobal: true,
        sortOrder: 1
      },
      {
        question: 'Do you offer pickup directly from RGIA Airport?',
        answer: 'Yes! Our drivers pick you up directly from Rajiv Gandhi International Airport (Shamshabad) with a digital name-board. We track your flight arrival in real-time so there is zero waiting even if your flight is delayed.',
        isGlobal: true,
        sortOrder: 2
      },
      {
        question: 'What amenities are included with Force Urbania and Tempo Travellers?',
        answer: 'All our Force Urbania and Tempo Traveller vehicles include high-capacity dual AC, individual reclining pushback seats, USB charging sockets for every row, ambient reading lights, LED TV/surround sound music system, and large luggage storage.',
        isGlobal: true,
        sortOrder: 3
      },
      {
        question: 'Can I book a same-day return trip to Srisailam?',
        answer: 'Yes, same-day return packages are very popular. The driver will pick you up early morning (around 5:00 AM), reach Srisailam in approx 4.5 hours, assist with darshan timings, and bring you back to Hyderabad by late evening.',
        isGlobal: true,
        sortOrder: 4
      },
      {
        question: 'Are there any hidden charges or surge pricing during peak hours?',
        answer: 'No. Apna Cars offers 100% transparent pricing. You get a clear fare breakdown before confirming your ride, with zero surge pricing during peak hours, weekends, or festivals.',
        isGlobal: true,
        sortOrder: 5
      }
    ]

    await prisma.fAQ.deleteMany({ where: { isGlobal: true } })
    for (const f of faqsData) {
      await prisma.fAQ.create({ data: f })
    }

    // 7. Testimonials
    const testimonialsData = [
      {
        customerName: 'Raghavendra Rao',
        rating: 5,
        review: 'Booked an Innova Crysta for our family trip to Srisailam. The driver was extremely polite and drove safely through the Nallamala ghat section. The car was spotless. Highly recommend Apna Cars!',
        locationContext: 'Hyderabad to Srisailam',
        isActive: true,
        sortOrder: 1
      },
      {
        customerName: 'Priya Sharma (Corporate HR)',
        rating: 5,
        review: 'We rented two 16-seater Force Urbania vans for our annual executive offsite. The comfort was exceptional—individual AC vents, USB chargers, and very smooth ride. Our team loved the experience.',
        locationContext: 'Hitec City Corporate Tour',
        isActive: true,
        sortOrder: 2
      },
      {
        customerName: 'Karthik Reddy',
        rating: 5,
        review: 'Punctual 3:30 AM airport pickup from Gachibowli to RGIA. Driver arrived 10 minutes early and helped with all our heavy international bags. Zero surge pricing. Will definitely book again.',
        locationContext: 'RGIA Airport Drop',
        isActive: true,
        sortOrder: 3
      }
    ]

    await prisma.testimonial.deleteMany({})
    for (const t of testimonialsData) {
      await prisma.testimonial.create({ data: t })
    }

    // Revalidate paths
    revalidatePath('/admin')
    revalidatePath('/admin/cars')
    revalidatePath('/admin/routes')
    revalidatePath('/admin/services')
    revalidatePath('/admin/faqs')
    revalidatePath('/admin/testimonials')
    revalidatePath('/fleet')

    return {
      success: true,
      message: 'Successfully populated 7 cars with full SEO & fuel rates, 5 routes, 6 services, FAQs, and testimonials!'
    }
  } catch (err: any) {
    console.error('Error in syncWebsiteDataAction:', err)
    return {
      success: false,
      message: err.message || 'Failed to populate website data.'
    }
  }
}
