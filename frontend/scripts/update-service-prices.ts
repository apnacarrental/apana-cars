import prisma from '../lib/prisma'

const EXISTING_PRICES: Record<string, { price: number; unit: string }> = {
  'airport-cabs': { price: 1499, unit: 'onwards' },
  'airport-transfers': { price: 1499, unit: 'onwards' },
  'hourly-cabs': { price: 1800, unit: '8 hrs / 80 km' },
  'with-driver': { price: 1499, unit: 'per day' },
  'sightseeing-cabs': { price: 2499, unit: 'full day tour' },
  'outstation-cabs': { price: 2999, unit: 'round trip' },
  'outstation': { price: 2999, unit: 'round trip' },
  'srisailam-cabs': { price: 4800, unit: 'darshan roundtrip' },
  'force-urbania-rent-in-hyderabad': { price: 7500, unit: 'per day' },
  'corporate-travel': { price: 2200, unit: 'per day' },
  'events-occasions': { price: 3500, unit: 'per day' },
}

async function main() {
  console.log('1. Adding columns to Service table if not exists...')
  await prisma.$executeRawUnsafe(`
    ALTER TABLE "Service" 
    ADD COLUMN IF NOT EXISTS "startingPrice" DOUBLE PRECISION,
    ADD COLUMN IF NOT EXISTS "priceUnit" TEXT;
  `)
  console.log('Columns added successfully!')

  console.log('2. Updating existing services with pricing...')
  const services = await prisma.service.findMany()
  for (const s of services) {
    const priceInfo = EXISTING_PRICES[s.slug] || { price: 1499, unit: 'onwards' }
    await prisma.$executeRawUnsafe(`
      UPDATE "Service" 
      SET "startingPrice" = $1, "priceUnit" = $2 
      WHERE "id"::text = $3
    `, priceInfo.price, priceInfo.unit, s.id)
    console.log(`Updated ${s.title} (${s.slug}) -> ₹${priceInfo.price} / ${priceInfo.unit}`)
  }

  console.log('3. Verification query:')
  const result: any[] = await prisma.$queryRawUnsafe(`SELECT id, title, slug, "startingPrice", "priceUnit" FROM "Service" ORDER BY "sortOrder" ASC`)
  console.table(result)
}

main()
  .catch((e) => {
    console.error('Migration error:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
