export interface SightseeingPackage {
  id: string
  title: string
  packageType?: string
  badge: string
  image: string
  imageAlt: string
  description: string
  placesCovered: string[]
  vehicleRange: string
  priceNote: string
}

export const SIGHTSEEING_PACKAGES: SightseeingPackage[] = [
  {
    id: 'hyderabad-city-sightseeing',
    title: 'Hyderabad City Sightseeing',
    badge: 'Popular City Tour',
    image: '/images/sightseeing/city-tour.jpg',
    imageAlt: 'Hyderabad City Sightseeing Cab Package - Charminar and Royal Heritage',
    description: 'Experience Hyderabad’s royal Nizami heritage and vibrant landmarks in a relaxed full-day private tour with doorstep pickup and verified driver.',
    placesCovered: [
      'Charminar',
      'Salarjung Museum',
      'Chowmahalla Palace',
      'Nehru Zoological Park',
      'Golconda Fort',
      'Birla Mandir',
      'Hussain Sagar Lake',
      'NTR Garden',
      'Qutb Shahi Tombs',
      'Lumbini Park Laser Show'
    ],
    vehicleRange: '4 to 28 Seater Vehicles',
    priceNote: 'Price on Request',
  },
  {
    id: 'ramoji-film-city-sanghi',
    title: 'Ramoji Film City + Sanghi Temple',
    packageType: 'Day Tour Package',
    badge: 'Day Tour Package',
    image: '/images/sightseeing/ramoji.jpg',
    imageAlt: 'Ramoji Film City and Sanghi Temple Day Tour Cab Package',
    description: 'Spend an unforgettable day exploring the magical sets and gardens of the world’s largest integrated film studio, followed by a serene hilltop visit to Sanghi Temple.',
    placesCovered: [
      'Ramoji Film City (Grand Studio)',
      'Sanghi Temple (Hilltop Darshan)',
      'Film City Live Action Shows',
      'Eureka Palace & Filmi Duniya',
      'Japanese & Mughal Gardens',
      'Wings Bird Park & Eco Zone'
    ],
    vehicleRange: '4 to 28 Seater Vehicles',
    priceNote: 'Price on Request',
  },
  {
    id: 'statue-of-equality',
    title: 'Statue of Equality + 3 Places',
    badge: 'Spiritual Circuit',
    image: '/images/sightseeing/statue-of-equality.jpg',
    imageAlt: 'Statue of Equality and Temple Circuit Cab Package Hyderabad',
    description: 'Marvel at the awe-inspiring 216-foot golden Statue of Equality honoring Sri Ramanujacharya, alongside Hyderabad’s most celebrated sacred temple shrines.',
    placesCovered: [
      'Statue of Equality (216ft Shrine)',
      'Chilukuri Balaji Temple (Visa Balaji)',
      'Puri Jagannath Temple (Banjara Hills)',
      'Peddammathalli Temple (Jubilee Hills)',
      '108 Divya Desam Replicas',
      'Musical Laser & Fountain Show'
    ],
    vehicleRange: '4 to 28 Seater Vehicles',
    priceNote: 'Price on Request',
  },
  {
    id: 'hyderabad-yadagirigutta',
    title: 'Hyderabad to Yadagirigutta Cab Package',
    badge: 'Sacred Pilgrimage',
    image: '/images/sightseeing/yadagirigutta.jpg',
    imageAlt: 'Hyderabad to Yadagirigutta, Swarnagiri, and Surendrapuri Cab Package',
    description: 'A captivating pilgrimage journey east of Hyderabad featuring the sculpted Yadadri Lakshmi Narasimha Temple, the golden grandeur of Swarnagiri, and Surendrapuri.',
    placesCovered: [
      'Yadagirigutta (Sri Lakshmi Narasimha)',
      'Swarnagiri Temple (Golden Shrine)',
      'Surendrapuri Mythological Park',
      'Golden Shiva Lingam Temple',
      'Kunda Satyanarayana Kaladhamam',
      'Bhongir Fort Scenic Viewpoint'
    ],
    vehicleRange: '4 to 28 Seater Vehicles',
    priceNote: 'Price on Request',
  },
  {
    id: 'dakshin-badrinath-wargal',
    title: 'Dakshin Badrinath + Wargal Saraswati Temple',
    packageType: 'Day Tour Package',
    badge: 'Day Tour Package',
    image: '/images/sightseeing/dakshin-badrinath.jpg',
    imageAlt: 'Dakshin Badrinath and Wargal Saraswati Temple Day Tour Cab Package',
    description: 'Seek divine blessings at the peaceful replica of Badrinath Temple near Medchal and ascend the scenic rocky hillocks of Wargal to the sacred Sri Vidya Saraswati Temple.',
    placesCovered: [
      'Badrinath Temple Near Hyderabad',
      'Wargal Sri Vidya Saraswati Temple',
      'Sri Shani Kshetram (Hilltop Shrine)',
      'Medchal Sacred Lotus Pond',
      'Rocky Hillock Viewpoint'
    ],
    vehicleRange: '4 to 28 Seater Vehicles',
    priceNote: 'Price on Request',
  },
]
