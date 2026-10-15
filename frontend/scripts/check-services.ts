import prisma from '../lib/prisma'

async function main() {
  const services = await prisma.service.findMany({
    orderBy: { sortOrder: 'asc' }
  })
  console.log('Total services in DB:', services.length)
  for (const s of services) {
    console.log(`- ${s.title} (${s.slug}) | Active: ${s.isActive} | Sort: ${s.sortOrder}`)
  }
}

main().catch(console.error).finally(() => prisma.$disconnect())
