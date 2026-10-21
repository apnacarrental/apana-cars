import { PrismaClient, LocationType, Transmission, FuelType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding Apna Cars database with complete fleet, locations, and comprehensive SEO...')

  // 1. Seed Brands
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

  // 2. Seed Media Records for local car images
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

  // 3. Seed Cars with 100% Comprehensive SEO Metadata
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
        canonical_url: 'https://www.apnacarrental.in/fleet/sedan',
        robots_index: true,
        robots_follow: true,
        focus_keyword: 'swift dzire car rental hyderabad',
        secondary_keywords: ['sedan cab hyderabad', 'dzire taxi hire', 'airport sedan cab', 'hyderabad city taxi'],
        og_title: 'Rent Swift Dzire Sedan in Hyderabad | Affordable ₹14/km',
        og_description: 'Best rates for Swift Dzire sedan car rentals in Hyderabad with professional chauffeurs and spotless cars.',
        og_image_id: 'https://www.apnacarrental.in/images/hero-car.png'
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
        canonical_url: 'https://www.apnacarrental.in/fleet/ertiga',
        robots_index: true,
        robots_follow: true,
        focus_keyword: 'ertiga car rental hyderabad',
        secondary_keywords: ['6 seater cab hyderabad', 'ertiga taxi hire', 'outstation ertiga cab', 'family muv rental'],
        og_title: 'Rent Maruti Ertiga in Hyderabad | 6-Seater Family MUV',
        og_description: 'Book Maruti Ertiga for Hyderabad local and outstation trips with verified drivers and ample luggage room.',
        og_image_id: 'https://www.apnacarrental.in/images/fleet-suv.png'
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
        canonical_url: 'https://www.apnacarrental.in/fleet/innova-crysta',
        robots_index: true,
        robots_follow: true,
        focus_keyword: 'innova crysta car rental hyderabad',
        secondary_keywords: ['innova hire hyderabad', '7 seater luxury taxi', 'outstation innova cab', 'executive car hire'],
        og_title: 'Toyota Innova Crysta Rental in Hyderabad | Premium 7-Seater',
        og_description: 'Book Toyota Innova Crysta for outstation pilgrimages and executive travel from Hyderabad.',
        og_image_id: 'https://www.apnacarrental.in/images/fleet-suv.png'
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
        canonical_url: 'https://www.apnacarrental.in/fleet/force-urbania-12-seater',
        robots_index: true,
        robots_follow: true,
        focus_keyword: 'force urbania 12 seater rent hyderabad',
        secondary_keywords: ['urbania rental hyderabad', '12 seater luxury van hire', 'tempo traveller alternative', 'corporate van rental'],
        og_title: 'Force Urbania 12-Seater Luxury Van on Rent in Hyderabad',
        og_description: 'Luxury 12-seater Force Urbania rental in Hyderabad with executive pushback seats.',
        og_image_id: 'https://www.apnacarrental.in/images/urbania/urbania-hero.jpg'
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
        canonical_url: 'https://www.apnacarrental.in/fleet/force-urbania-16-seater',
        robots_index: true,
        robots_follow: true,
        focus_keyword: 'force urbania 16 seater rent in hyderabad',
        secondary_keywords: ['16 seater luxury tempo traveller', 'urbania van hire hyderabad', 'group tour bus hyderabad', 'wedding car rental'],
        og_title: '16-Seater Force Urbania Luxury Van Hire in Hyderabad',
        og_description: 'Book 16-seater Force Urbania van for wedding guest transfers and group vacations.',
        og_image_id: 'https://www.apnacarrental.in/images/urbania/urbania-17-seater.jpg'
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
        canonical_url: 'https://www.apnacarrental.in/fleet/tempo-traveller-12-seater',
        robots_index: true,
        robots_follow: true,
        focus_keyword: 'tempo traveller 12 seater hyderabad',
        secondary_keywords: ['12 seater tempo rental', 'hyderabad to srisailam tempo traveller', 'maharaja seats tempo', 'group pilgrimage bus'],
        og_title: '12 Seater Tempo Traveller on Rent in Hyderabad',
        og_description: 'Affordable 12-seater Tempo Traveller rentals in Hyderabad with Maharaja seats.',
        og_image_id: 'https://www.apnacarrental.in/images/journey-road.png'
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
        canonical_url: 'https://www.apnacarrental.in/fleet/tempo-traveller-16-seater',
        robots_index: true,
        robots_follow: true,
        focus_keyword: '16 seater tempo traveller hyderabad',
        secondary_keywords: ['16 seater tempo hire', 'outstation tempo traveller hyderabad', 'corporate tempo rental', 'shirdi yatra bus'],
        og_title: '16-Seater Tempo Traveller Rental in Hyderabad',
        og_description: 'Reliable 16-seater Tempo Traveller in Hyderabad for group pilgrimage and tour packages.',
        og_image_id: 'https://www.apnacarrental.in/images/journey-road.png'
      }
    }
  ]

  for (const carItem of carData) {
    const { mediaId, ...carFields } = carItem
    const car = await prisma.car.upsert({
      where: { slug: carFields.slug },
      update: {
        ...carFields,
      },
      create: {
        ...carFields,
      }
    })

    // Attach image
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

  // 4. Seed Routes & Packages with Full SEO Metadata
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
        canonical_url: 'https://www.apnacarrental.in/srisailam-cabs',
        robots_index: true,
        robots_follow: true,
        focus_keyword: 'hyderabad to srisailam cab package',
        secondary_keywords: ['srisailam car rental', 'mallikarjuna darshan taxi', 'srisailam tempo traveller hire'],
        og_title: 'Hyderabad to Srisailam Temple Cab Package | Apna Cars',
        og_description: 'Affordable roundtrip taxi packages to Srisailam Mallikarjuna temple with verified hill drivers.',
        og_image_id: 'https://www.apnacarrental.in/images/srisailam/hero.jpg'
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
        canonical_url: 'https://www.apnacarrental.in/outstation-cabs',
        robots_index: true,
        robots_follow: true,
        focus_keyword: 'hyderabad to tirupati cab service',
        secondary_keywords: ['tirupati outstation car rental', 'tirumala balaji taxi hyderabad', 'innova crysta tirupati'],
        og_title: 'Hyderabad to Tirupati Balaji Cab Service',
        og_description: 'Comfortable family and group cabs from Hyderabad to Tirupati with experienced highway drivers.',
        og_image_id: 'https://www.apnacarrental.in/images/outstation/tirupati.jpg'
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
        canonical_url: 'https://www.apnacarrental.in/outstation-cabs',
        robots_index: true,
        robots_follow: true,
        focus_keyword: 'hyderabad to vijayawada taxi service',
        secondary_keywords: ['vijayawada one way cab', 'hyderabad vijayawada highway taxi', 'kanaka durga temple taxi'],
        og_title: 'Hyderabad to Vijayawada Taxi Service | One Way & Return Cabs',
        og_description: 'Book fast and safe highway cabs from Hyderabad to Vijayawada on NH65.',
        og_image_id: 'https://www.apnacarrental.in/images/outstation/vijayawada.jpg'
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
        canonical_url: 'https://www.apnacarrental.in/sightseeing-cabs',
        robots_index: true,
        robots_follow: true,
        focus_keyword: 'hyderabad sightseeing cabs',
        secondary_keywords: ['hyderabad city tour taxi', 'ramoji film city cab hire', 'charminar golconda car rental'],
        og_title: 'Hyderabad Local Sightseeing Tour Cabs | Apna Cars',
        og_description: 'Full-day 8hr/80km and 12hr/120km Hyderabad city tour taxi packages with English/Hindi/Telugu speaking chauffeurs.',
        og_image_id: 'https://www.apnacarrental.in/images/sightseeing/hyderabad-hero.jpg'
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
        canonical_url: 'https://www.apnacarrental.in/airport-cabs',
        robots_index: true,
        robots_follow: true,
        focus_keyword: 'hyderabad airport cab service',
        secondary_keywords: ['rgia airport taxi', 'shamshabad airport cab booking', 'hyderabad airport drop cab'],
        og_title: 'Hyderabad RGIA Airport Cab Service | On-Time Pickup & Drop',
        og_description: '24/7 airport transfers to Shamshabad RGIA with live flight delay monitoring and zero surge pricing.',
        og_image_id: 'https://www.apnacarrental.in/images/airport/hero.jpg'
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

  // 5. Seed Services with 100% Comprehensive SEO Metadata
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
        description: 'Book reliable airport cabs in Hyderabad starting at ₹999 with zero surge and flight tracking.',
        canonical_url: 'https://www.apnacarrental.in/airport-cabs',
        robots_index: true,
        robots_follow: true,
        focus_keyword: 'airport taxi hyderabad',
        secondary_keywords: ['rgia cabs', 'hyderabad airport pickup taxi', 'shamshabad airport drop'],
        og_title: 'Airport Taxi Hyderabad | 24/7 RGIA Airport Cabs',
        og_description: 'Punctual airport transfers with zero peak surge pricing and doorstep pickup across Hyderabad.',
        og_image_id: 'https://www.apnacarrental.in/images/airport/hero.jpg'
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
        description: 'Rent a car with chauffeur by the hour in Hyderabad. Flexible packages for corporate and personal use.',
        canonical_url: 'https://www.apnacarrental.in/hourly-cabs',
        robots_index: true,
        robots_follow: true,
        focus_keyword: 'hourly car rental hyderabad',
        secondary_keywords: ['rent car by the hour', 'local cab package hyderabad', '8hr 80km car rental'],
        og_title: 'Hourly Car Rental Hyderabad | Flexible Chauffeur Packages',
        og_description: 'Keep a car and driver at your disposal with easy hourly packages starting at ₹1200.',
        og_image_id: 'https://www.apnacarrental.in/images/hero-car.png'
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
        description: 'Explore the City of Pearls with professional tour chauffeurs. Transparent rates and customized itineraries.',
        canonical_url: 'https://www.apnacarrental.in/sightseeing-cabs',
        robots_index: true,
        robots_follow: true,
        focus_keyword: 'hyderabad sightseeing cabs',
        secondary_keywords: ['hyderabad day tour cab', 'charminar golconda car tour', 'ramoji film city taxi'],
        og_title: 'Hyderabad City Sightseeing Cabs | Heritage & Culture Tours',
        og_description: 'Explore Charminar, Golconda Fort, and Ramoji Film City in air-conditioned comfort.',
        og_image_id: 'https://www.apnacarrental.in/images/sightseeing/hyderabad-hero.jpg'
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
        description: 'Book outstation cabs from Hyderabad at competitive per km rates. Verified chauffeurs and 24/7 customer support.',
        canonical_url: 'https://www.apnacarrental.in/outstation-cabs',
        robots_index: true,
        robots_follow: true,
        focus_keyword: 'outstation cabs hyderabad',
        secondary_keywords: ['roundtrip taxi hyderabad', 'one way drop cab', 'interstate car rental hyderabad'],
        og_title: 'Outstation Cabs from Hyderabad | Best Per-KM Rates',
        og_description: 'Reliable highway cabs with verified drivers for Tirupati, Srisailam, Vijayawada, and beyond.',
        og_image_id: 'https://www.apnacarrental.in/images/outstation/tirupati.jpg'
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
        description: 'Book special Srisailam pilgrimage cabs from Hyderabad with doorstep pickup and verified chauffeurs.',
        canonical_url: 'https://www.apnacarrental.in/srisailam-cabs',
        robots_index: true,
        robots_follow: true,
        focus_keyword: 'hyderabad to srisailam cab package',
        secondary_keywords: ['srisailam temple car rental', 'mallikarjuna jyotirlinga taxi', 'srisailam 2 day cab package'],
        og_title: 'Hyderabad to Srisailam Pilgrimage Cab Packages',
        og_description: 'Special 1-day and 2-day darshan tours to Srisailam with seasoned ghat section drivers.',
        og_image_id: 'https://www.apnacarrental.in/images/srisailam/hero.jpg'
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
        description: 'Hire Force Urbania in Hyderabad for wedding guest transfers, corporate travel, and group tours.',
        canonical_url: 'https://www.apnacarrental.in/force-urbania-rent-in-hyderabad',
        robots_index: true,
        robots_follow: true,
        focus_keyword: 'force urbania on rent in hyderabad',
        secondary_keywords: ['12 seater urbania hire', '16 seater luxury van hyderabad', 'corporate tempo traveller alternative'],
        og_title: 'Force Urbania on Rent in Hyderabad | 12 & 16 Seater Luxury Vans',
        og_description: 'Premium Force Urbania luxury vans with executive reclining pushback seats, dual AC, and USB sockets.',
        og_image_id: 'https://www.apnacarrental.in/images/urbania/urbania-hero.jpg'
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

  // 6. Seed Static Pages SEO into PageSeo Table
  const staticPagesSeo = [
    {
      path: '/',
      title: 'Apna Car Rental Hyderabad | Best Cabs, Chauffeur & Fleet',
      description: 'Premium chauffeur services, airport transfers, and outstation rentals across Hyderabad with transparent per-km fuel pricing.',
      canonicalUrl: 'https://www.apnacarrental.in/',
      robotsIndex: true,
      robotsFollow: true,
      focusKeyword: 'car rental hyderabad',
      secondaryKeywords: 'cab service hyderabad, chauffeur cabs hyderabad, outstation cabs, airport drop hyderabad',
      ogTitle: 'Apna Car Rental | Your journey. Your car. Your way.',
      ogDescription: 'Experience spotless cars, verified chauffeurs, and transparent fuel pricing across Hyderabad and Telangana.',
      ogImageId: 'https://www.apnacarrental.in/images/hero-car.png'
    },
    {
      path: '/fleet',
      title: 'Car Rental Fleet in Hyderabad | Sedans, SUVs & Urbania Vans',
      description: 'Explore Apna Cars full fleet: Swift Dzire, Maruti Ertiga, Toyota Innova Crysta, Force Urbania 12 & 16 Seater, and Tempo Travellers.',
      canonicalUrl: 'https://www.apnacarrental.in/fleet',
      robotsIndex: true,
      robotsFollow: true,
      focusKeyword: 'car rental fleet hyderabad',
      secondaryKeywords: 'innova crysta hire, ertiga rental hyderabad, urbania van hire, tempo traveller booking',
      ogTitle: 'Apna Cars Fleet | Sedans, Luxury SUVs & Force Urbania Vans',
      ogDescription: 'Choose from Swift Dzire, Innova Crysta, Ertiga, and Force Urbania vans with transparent per km rates.',
      ogImageId: 'https://www.apnacarrental.in/images/fleet-suv.png'
    },
    {
      path: '/about',
      title: 'About Apna Car Rental | Hyderabad Premier Cab & Rental Service',
      description: 'Learn about Apna Car Rental mission, values, and commitment to safe, punctual, and transparent travel across Hyderabad.',
      canonicalUrl: 'https://www.apnacarrental.in/about',
      robotsIndex: true,
      robotsFollow: true,
      focusKeyword: 'about apna car rental',
      secondaryKeywords: 'trusted cab company hyderabad, car hire agency telangana, reliable taxi operator',
      ogTitle: 'About Apna Car Rental | More than a rental, freedom to move',
      ogDescription: 'Learn why thousands of travelers and corporate teams trust Apna Car Rental for every journey.',
      ogImageId: 'https://www.apnacarrental.in/images/journey-road.png'
    },
    {
      path: '/contact',
      title: 'Contact Apna Car Rental | 24/7 Customer Support & Hotline',
      description: 'Get in touch with Apna Car Rental for instant bookings, inquiries, corporate partnerships, and airport emergency assistance in Hyderabad.',
      canonicalUrl: 'https://www.apnacarrental.in/contact',
      robotsIndex: true,
      robotsFollow: true,
      focusKeyword: 'contact apna car rental',
      secondaryKeywords: 'car rental customer care hyderabad, cab booking phone number, apna cars contact',
      ogTitle: 'Contact Apna Car Rental Hyderabad | 24/7 Helpline',
      ogDescription: 'Call or WhatsApp us at 099881 23444 for instant bookings and immediate dispatch.',
      ogImageId: 'https://www.apnacarrental.in/images/hero-car.png'
    },
    {
      path: '/faq',
      title: 'Frequently Asked Questions (FAQ) | Apna Car Rental',
      description: 'Find answers about per-km rates, airport pickup procedures, outstation allowances, tolls, cancellation policies, and payment terms.',
      canonicalUrl: 'https://www.apnacarrental.in/faq',
      robotsIndex: true,
      robotsFollow: true,
      focusKeyword: 'car rental faq hyderabad',
      secondaryKeywords: 'cab fare calculation, airport toll questions, outstation driver allowance rules',
      ogTitle: 'Frequently Asked Questions | Apna Car Rental Hyderabad',
      ogDescription: 'Clear answers to all your questions about car rentals, driver allowances, and transparent rates.',
      ogImageId: 'https://www.apnacarrental.in/images/hero-car.png'
    },
    {
      path: '/airport-cabs',
      title: 'Hyderabad RGIA Airport Cabs | 24/7 Fixed Fare Airport Taxi',
      description: 'Book reliable Rajiv Gandhi International Airport cabs in Hyderabad with zero surge pricing, free flight delay tracking, and doorstep pickup.',
      canonicalUrl: 'https://www.apnacarrental.in/airport-cabs',
      robotsIndex: true,
      robotsFollow: true,
      focusKeyword: 'hyderabad airport cabs',
      secondaryKeywords: 'rgia shamshabad taxi, airport pickup hyderabad, outstation airport cab',
      ogTitle: 'Hyderabad RGIA Airport Cabs | 24/7 Fixed Price Taxi Service',
      ogDescription: 'Zero surge rates, flight delay monitoring, and sanitized cars for Shamshabad airport transfers.',
      ogImageId: 'https://www.apnacarrental.in/images/airport/hero.jpg'
    },
    {
      path: '/hourly-cabs',
      title: 'Hourly Car Rental in Hyderabad | 4hr, 8hr, 12hr Packages',
      description: 'Rent chauffeur-driven cars by the hour in Hyderabad. Flexible packages for business meetings, shopping, and local city commutes.',
      canonicalUrl: 'https://www.apnacarrental.in/hourly-cabs',
      robotsIndex: true,
      robotsFollow: true,
      focusKeyword: 'hourly car rental hyderabad',
      secondaryKeywords: 'car hire by the hour, 8 hour 80 km cab hyderabad, full day local taxi',
      ogTitle: 'Hourly Car Rental in Hyderabad | Flexible Chauffeur Packages',
      ogDescription: 'Keep a car and driver at your disposal with easy hourly packages starting at ₹1200.',
      ogImageId: 'https://www.apnacarrental.in/images/hero-car.png'
    },
    {
      path: '/sightseeing-cabs',
      title: 'Hyderabad City Sightseeing Cabs | Full Day City Tour Packages',
      description: 'Customizable city sightseeing taxi tours covering Charminar, Golconda Fort, Ramoji Film City, Salar Jung Museum, and Birla Mandir.',
      canonicalUrl: 'https://www.apnacarrental.in/sightseeing-cabs',
      robotsIndex: true,
      robotsFollow: true,
      focusKeyword: 'hyderabad sightseeing cabs',
      secondaryKeywords: 'hyderabad day tour cab, charminar tour taxi, ramoji film city car package',
      ogTitle: 'Hyderabad City Sightseeing Cabs | Heritage & Culture Tours',
      ogDescription: 'Explore the best of Hyderabad in air-conditioned comfort with professional tour chauffeurs.',
      ogImageId: 'https://www.apnacarrental.in/images/sightseeing/hyderabad-hero.jpg'
    },
    {
      path: '/outstation-cabs',
      title: 'Outstation Cabs from Hyderabad | Roundtrip & One-Way Taxi',
      description: 'Book comfortable outstation cabs from Hyderabad to Srisailam, Tirupati, Vijayawada, Bangalore, and Shirdi with experienced highway drivers.',
      canonicalUrl: 'https://www.apnacarrental.in/outstation-cabs',
      robotsIndex: true,
      robotsFollow: true,
      focusKeyword: 'outstation cabs hyderabad',
      secondaryKeywords: 'interstate car rental, roundtrip taxi service, one way outstation drop',
      ogTitle: 'Outstation Cabs from Hyderabad | Best Per-KM Rates',
      ogDescription: 'Travel outstation from Hyderabad with certified highway drivers, spotless cars, and honest per-km rates.',
      ogImageId: 'https://www.apnacarrental.in/images/outstation/tirupati.jpg'
    },
    {
      path: '/srisailam-cabs',
      title: 'Hyderabad to Srisailam Cab Packages | Same Day & 2-Day Tours',
      description: 'Special pilgrimage taxi packages to Srisailam Mallikarjuna Jyotirlinga and Bhramaramba Devi Temple with experienced ghat section drivers.',
      canonicalUrl: 'https://www.apnacarrental.in/srisailam-cabs',
      robotsIndex: true,
      robotsFollow: true,
      focusKeyword: 'hyderabad to srisailam cab packages',
      secondaryKeywords: 'srisailam car rental, mallikarjuna temple darshan cab, srisailam tempo traveller',
      ogTitle: 'Hyderabad to Srisailam Temple Cab Packages | Same Day & 2-Day',
      ogDescription: 'Doorstep pickup in Hyderabad, experienced Nallamala forest drivers, and flexible darshan timings.',
      ogImageId: 'https://www.apnacarrental.in/images/srisailam/hero.jpg'
    },
    {
      path: '/force-urbania-rent-in-hyderabad',
      title: 'Force Urbania on Rent in Hyderabad | 12 & 16 Seater Luxury Vans',
      description: 'Hire ultra-luxury Force Urbania 12-seater and 16-seater vans in Hyderabad for weddings, corporate offsites, and group pilgrimages.',
      canonicalUrl: 'https://www.apnacarrental.in/force-urbania-rent-in-hyderabad',
      robotsIndex: true,
      robotsFollow: true,
      focusKeyword: 'force urbania rent in hyderabad',
      secondaryKeywords: 'urbania 12 seater rental, urbania 16 seater hire, luxury tempo traveller hyderabad',
      ogTitle: 'Force Urbania on Rent in Hyderabad | 12 & 16 Seater Luxury Vans',
      ogDescription: 'Experience luxury group travel in Hyderabad with individual pushback seats, high roof, and dual AC.',
      ogImageId: 'https://www.apnacarrental.in/images/urbania/urbania-hero.jpg'
    }
  ]

  for (const pageSeo of staticPagesSeo) {
    await prisma.pageSeo.upsert({
      where: { path: pageSeo.path },
      update: pageSeo,
      create: pageSeo
    })
  }

  // 7. Seed Global SEO Settings
  const existingGlobalSeo = await prisma.seoSettings.findFirst({ orderBy: { createdAt: 'desc' } })
  if (!existingGlobalSeo) {
    await prisma.seoSettings.create({
      data: {
        siteName: 'Apna Car Rental',
        homepageTitle: 'Apna Car Rental | Your journey. Your car. Your way.',
        homepageDescription: 'Premium chauffeur services, airport transfers, and outstation rentals across Hyderabad with transparent per-km fuel pricing.',
        organizationName: 'Apna Car Rental Private Limited',
        canonicalBaseUrl: 'https://www.apnacarrental.in',
        defaultRobotsIndex: true,
        defaultRobotsFollow: true,
        defaultOgImageId: 'https://www.apnacarrental.in/images/hero-car.png'
      }
    })
  } else {
    await prisma.seoSettings.update({
      where: { id: existingGlobalSeo.id },
      data: {
        siteName: 'Apna Car Rental',
        homepageTitle: 'Apna Car Rental | Your journey. Your car. Your way.',
        homepageDescription: 'Premium chauffeur services, airport transfers, and outstation rentals across Hyderabad with transparent per-km fuel pricing.',
        canonicalBaseUrl: 'https://www.apnacarrental.in',
        defaultOgImageId: 'https://www.apnacarrental.in/images/hero-car.png'
      }
    })
  }

  // 8. Seed Authentic FAQs
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

  // Clear older placeholder FAQs and add fresh ones
  await prisma.fAQ.deleteMany({ where: { isGlobal: true } })
  for (const f of faqsData) {
    await prisma.fAQ.create({ data: f })
  }

  // 9. Seed Testimonials
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

  // 9. Seed Authentic Locations with 100% SEO metadata
  const hyderabad = await prisma.location.upsert({
    where: { slug: 'hyderabad' },
    update: {
      name: 'Hyderabad',
      type: LocationType.CITY,
      description: 'Capital city of Telangana, cyber hub, and the primary base for Apna Car Rental operations.',
      content: 'Apna Cars provides reliable chauffeur-driven car rentals across Hyderabad, Cyberabad, and Secunderabad. We offer 24/7 service with zero surge pricing.',
      isActive: true,
      seoMetadata: {
        title: 'Car Rental & Cab Services in Hyderabad | Apna Cars',
        description: 'Rent premium chauffeur-driven and outstation cars in Hyderabad with transparent per km pricing and zero surge rates.',
        canonical_url: 'https://www.apnacarrental.in/locations/hyderabad',
        robots_index: true,
        robots_follow: true,
        focus_keyword: 'car rental hyderabad',
        secondary_keywords: ['cab service hyderabad', 'hyderabad car hire', 'outstation cabs hyderabad'],
        og_title: 'Car Rental & Cab Services in Hyderabad | Apna Cars',
        og_description: 'Rent premium chauffeur-driven and outstation cars in Hyderabad with transparent per km pricing.'
      }
    },
    create: {
      name: 'Hyderabad',
      slug: 'hyderabad',
      type: LocationType.CITY,
      description: 'Capital city of Telangana, cyber hub, and the primary base for Apna Car Rental operations.',
      content: 'Apna Cars provides reliable chauffeur-driven car rentals across Hyderabad, Cyberabad, and Secunderabad. We offer 24/7 service with zero surge pricing.',
      isActive: true,
      seoMetadata: {
        title: 'Car Rental & Cab Services in Hyderabad | Apna Cars',
        description: 'Rent premium chauffeur-driven and outstation cars in Hyderabad with transparent per km pricing and zero surge rates.',
        canonical_url: 'https://www.apnacarrental.in/locations/hyderabad',
        robots_index: true,
        robots_follow: true,
        focus_keyword: 'car rental hyderabad',
        secondary_keywords: ['cab service hyderabad', 'hyderabad car hire', 'outstation cabs hyderabad'],
        og_title: 'Car Rental & Cab Services in Hyderabad | Apna Cars',
        og_description: 'Rent premium chauffeur-driven and outstation cars in Hyderabad with transparent per km pricing.'
      }
    }
  })

  const locationsData = [
    {
      name: 'RGIA Airport (Shamshabad)',
      slug: 'shamshabad-airport',
      type: LocationType.AIRPORT,
      parentId: hyderabad.id,
      description: 'Hyderabad Rajiv Gandhi International Airport car rental and 24/7 taxi hub with flight tracking.',
      content: 'Pre-book your Rajiv Gandhi International Airport (RGIA) cab in Shamshabad with Apna Cars. On-time terminal pickups, luggage assistance, zero parking surge, and clean AC sedans and SUVs.',
      isActive: true,
      seoMetadata: {
        title: 'RGIA Airport Shamshabad Cab & Car Rental | Apna Cars',
        description: '24/7 airport pickup and drop taxi at Rajiv Gandhi International Airport (RGIA) Hyderabad. Flat transparent pricing with live flight tracking.',
        canonical_url: 'https://www.apnacarrental.in/locations/shamshabad-airport',
        robots_index: true,
        robots_follow: true,
        focus_keyword: 'hyderabad airport cab',
        secondary_keywords: ['rgia airport taxi', 'shamshabad car rental', 'airport drop hyderabad'],
        og_title: 'RGIA Airport Shamshabad Cab & Car Rental | Apna Cars',
        og_description: '24/7 airport pickup and drop taxi at Rajiv Gandhi International Airport (RGIA) Hyderabad.'
      }
    },
    {
      name: 'Gachibowli & Financial District',
      slug: 'gachibowli',
      type: LocationType.AREA,
      parentId: hyderabad.id,
      description: 'Financial District, Nanakramguda, and Gachibowli IT corridor car rental hub.',
      content: 'Reliable car hire and executive cab services in Gachibowli and Financial District. Ideal for corporate daily commutes, airport transfers via Outer Ring Road (ORR), and weekend getaways.',
      isActive: true,
      seoMetadata: {
        title: 'Car Rental in Gachibowli & Financial District | Apna Cars',
        description: 'Book corporate cabs and airport transfers in Gachibowli, Financial District, and Nanakramguda. Punctual service with top-rated drivers.',
        canonical_url: 'https://www.apnacarrental.in/locations/gachibowli',
        robots_index: true,
        robots_follow: true,
        focus_keyword: 'car rental gachibowli',
        secondary_keywords: ['financial district cabs', 'gachibowli airport taxi', 'nanakramguda car hire'],
        og_title: 'Car Rental in Gachibowli & Financial District | Apna Cars',
        og_description: 'Book corporate cabs and airport transfers in Gachibowli, Financial District, and Nanakramguda.'
      }
    },
    {
      name: 'Hitec City / Madhapur',
      slug: 'hitec-city',
      type: LocationType.AREA,
      parentId: hyderabad.id,
      description: 'Cyberabad IT hub cab services and chauffeur-driven car rentals.',
      content: 'Serving Mindspace, Cyber Towers, Inorbit Mall, and Madhapur with fast 15-minute cab dispatch. Perfect for tech employees, client delegations, and city travel.',
      isActive: true,
      seoMetadata: {
        title: 'Hitec City & Madhapur Cab Rental Services | Apna Cars',
        description: 'Rent cars in Hitec City and Madhapur for local meetings, daily rentals, and airport drops. Modern fleet of Sedans, Innova Crysta, and Urbania.',
        canonical_url: 'https://www.apnacarrental.in/locations/hitec-city',
        robots_index: true,
        robots_follow: true,
        focus_keyword: 'hitec city car rental',
        secondary_keywords: ['madhapur cab booking', 'cyberabad taxi service', 'inorbit mall car hire'],
        og_title: 'Hitec City & Madhapur Cab Rental Services | Apna Cars',
        og_description: 'Rent cars in Hitec City and Madhapur for local meetings, daily rentals, and airport drops.'
      }
    },
    {
      name: 'Jubilee Hills & Banjara Hills',
      slug: 'jubilee-hills',
      type: LocationType.AREA,
      parentId: hyderabad.id,
      description: 'Luxury car rentals and premium chauffeur services in Jubilee Hills and Banjara Hills.',
      content: 'Experience first-class car rental in Jubilee Hills Road No. 36, Film Nagar, and Banjara Hills Road No. 1 & 12. Premium luxury sedans and spacious SUVs for weddings and VIP travel.',
      isActive: true,
      seoMetadata: {
        title: 'Luxury Car Rental in Jubilee Hills & Banjara Hills | Apna Cars',
        description: 'Chauffeur-driven luxury car hire in Jubilee Hills and Banjara Hills. Premium Fortuner, Innova Crysta, and Force Urbania vans.',
        canonical_url: 'https://www.apnacarrental.in/locations/jubilee-hills',
        robots_index: true,
        robots_follow: true,
        focus_keyword: 'luxury car rental jubilee hills',
        secondary_keywords: ['banjara hills cab service', 'vip car hire hyderabad', 'wedding car rental jubilee hills'],
        og_title: 'Luxury Car Rental in Jubilee Hills & Banjara Hills | Apna Cars',
        og_description: 'Chauffeur-driven luxury car hire in Jubilee Hills and Banjara Hills.'
      }
    },
    {
      name: 'Secunderabad & Uppal',
      slug: 'secunderabad',
      type: LocationType.AREA,
      parentId: hyderabad.id,
      description: 'Secunderabad railway station and Uppal junction taxi services.',
      content: 'Seamless cab pickups from Secunderabad Railway Station, Paradise Circle, ECIL, and Uppal Rajiv Gandhi Stadium. 24/7 availability for local and outstation trips.',
      isActive: true,
      seoMetadata: {
        title: 'Secunderabad & Uppal Taxi Service | Apna Cars',
        description: 'Prompt railway station pickups and outstation cabs from Secunderabad and Uppal. Guaranteed on-time arrival with zero cancellation.',
        canonical_url: 'https://www.apnacarrental.in/locations/secunderabad',
        robots_index: true,
        robots_follow: true,
        focus_keyword: 'secunderabad railway station cab',
        secondary_keywords: ['uppal car rental', 'secunderabad taxi booking', 'ecil outstation cabs'],
        og_title: 'Secunderabad & Uppal Taxi Service | Apna Cars',
        og_description: 'Prompt railway station pickups and outstation cabs from Secunderabad and Uppal.'
      }
    },
    {
      name: 'Kukatpally & Miyapur',
      slug: 'kukatpally',
      type: LocationType.AREA,
      parentId: hyderabad.id,
      description: 'Kukatpally Housing Board and Miyapur metro car rental services.',
      content: 'Serving residential and commercial centers across KPHB Colony, Forum Sujana Mall, JNTU, and Miyapur. Economical per km rates for city errands and outstation family trips.',
      isActive: true,
      seoMetadata: {
        title: 'Car Rental in Kukatpally & Miyapur | Apna Cars',
        description: 'Reliable cab hire in Kukatpally (KPHB), JNTU, and Miyapur for family outings, airport drops, and outstation trips.',
        canonical_url: 'https://www.apnacarrental.in/locations/kukatpally',
        robots_index: true,
        robots_follow: true,
        focus_keyword: 'kukatpally car rental',
        secondary_keywords: ['kphb cab service', 'miyapur taxi hire', 'jntu car rental'],
        og_title: 'Car Rental in Kukatpally & Miyapur | Apna Cars',
        og_description: 'Reliable cab hire in Kukatpally (KPHB), JNTU, and Miyapur for family outings, airport drops, and outstation trips.'
      }
    },
    {
      name: 'Begumpet & Somajiguda',
      slug: 'begumpet',
      type: LocationType.AREA,
      parentId: hyderabad.id,
      description: 'Old airport road and central Hyderabad car hire.',
      content: 'Central Hyderabad car hire covering lifestyle hubs, hospitals, consulates, and business centers along Begumpet, Somajiguda, and Ameerpet.',
      isActive: true,
      seoMetadata: {
        title: 'Car Rental in Begumpet & Somajiguda | Apna Cars',
        description: 'Chauffeur-driven cab rentals in Begumpet, Somajiguda, and Raj Bhavan Road. Fast pickup for business and hospital visits.',
        canonical_url: 'https://www.apnacarrental.in/locations/begumpet',
        robots_index: true,
        robots_follow: true,
        focus_keyword: 'begumpet car rental',
        secondary_keywords: ['somajiguda taxi service', 'ameerpet cabs', 'central hyderabad car hire'],
        og_title: 'Car Rental in Begumpet & Somajiguda | Apna Cars',
        og_description: 'Chauffeur-driven cab rentals in Begumpet, Somajiguda, and Raj Bhavan Road.'
      }
    },
    {
      name: 'Srisailam Highway Route',
      slug: 'srisailam-route',
      type: LocationType.DESTINATION,
      parentId: hyderabad.id,
      description: 'Srisailam pilgrimage highway cab rentals via NH 765 & ORR Exit 14.',
      content: 'Specialized pilgrimage packages to Sri Bhramaramba Mallikarjuna Jyotirlinga Temple. Experienced ghat-road drivers, clean AC vehicles, and doorstep pickup across Hyderabad.',
      isActive: true,
      seoMetadata: {
        title: 'Srisailam Highway Route Cab Packages | Apna Cars',
        description: 'Dedicated car rental and cab packages for Srisailam Temple pilgrimage from Hyderabad. 1-day and 2-day darshan tours available.',
        canonical_url: 'https://www.apnacarrental.in/locations/srisailam-route',
        robots_index: true,
        robots_follow: true,
        focus_keyword: 'srisailam cab packages',
        secondary_keywords: ['hyderabad to srisailam taxi', 'mallikarjuna darshan cab', 'srisailam tempo traveller hire'],
        og_title: 'Srisailam Highway Route Cab Packages | Apna Cars',
        og_description: 'Dedicated car rental and cab packages for Srisailam Temple pilgrimage from Hyderabad.'
      }
    }
  ]

  for (const loc of locationsData) {
    await prisma.location.upsert({
      where: { slug: loc.slug },
      update: loc,
      create: loc
    })
  }

  console.log('Seeding completed successfully with 100% comprehensive SEO!')
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
