import { PrismaClient, LocationType, Transmission, FuelType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')
  
  const brand = await prisma.brand.upsert({
    where: { slug: 'apna' },
    update: {},
    create: { name: 'Apna', slug: 'apna' }
  })
  
  const category = await prisma.category.upsert({
    where: { slug: 'economy' },
    update: {},
    create: { name: 'Economy', slug: 'economy' }
  })
  
  const loc = await prisma.location.upsert({
    where: { slug: 'hyderabad' },
    update: {},
    create: { name: 'Hyderabad', slug: 'hyderabad', type: LocationType.CITY }
  })
  
  console.log('Seed completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
