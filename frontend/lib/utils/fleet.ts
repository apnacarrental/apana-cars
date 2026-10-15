import { VehicleItem } from '@/components/motion/hourly-vehicle-grid'

export function mapCarsToVehicleItems(cars: any[], defaultPrice = 'Quote on Request'): VehicleItem[] {
  if (!cars || cars.length === 0) return []

  return cars.map((car) => {
    // 1. Resolve image from Prisma relation or fallback
    const secureUrl = car.images?.[0]?.media?.secureUrl
    let imageUrl = secureUrl || '/images/hero-car.png'

    if (!secureUrl) {
      const lower = (car.slug + ' ' + car.name).toLowerCase()
      if (lower.includes('dzire') || lower.includes('sedan') || lower.includes('etios')) {
        imageUrl = '/images/hero-car.png'
      } else if (lower.includes('urbania') || lower.includes('tempo') || lower.includes('traveller')) {
        imageUrl = '/images/journey-road.png'
      } else {
        imageUrl = '/images/fleet-suv.png'
      }
    }

    // 2. Resolve category
    const category = car.categories?.[0]?.name || (
      car.seats >= 12 ? 'Luxury Executive Van' :
      car.seats >= 6 ? 'Family & Group MUV' :
      'Executive AC Sedan'
    )

    // 3. Format transparent pricing
    let priceDisplay = defaultPrice
    if (car.pricePerDay && Number(car.pricePerDay) > 0) {
      priceDisplay = `₹${Number(car.pricePerDay).toLocaleString('en-IN')}/day`
    } else if (car.dieselPricePerKm && Number(car.dieselPricePerKm) > 0) {
      priceDisplay = `₹${Number(car.dieselPricePerKm)}/km`
    } else if (car.petrolPricePerKm && Number(car.petrolPricePerKm) > 0) {
      priceDisplay = `₹${Number(car.petrolPricePerKm)}/km`
    }

    // 4. Description
    const description = car.shortDescription || car.content || `${car.name} with air conditioning, generous luggage space, and experienced verified chauffeur.`

    return {
      name: car.name,
      category,
      seating: `${car.seats || 4}+1 Passengers`,
      luggage: `${car.luggage || 2} Bags`,
      image: imageUrl,
      description,
      hourlyPriceDisplay: priceDisplay,
    }
  })
}
