import { PrismaClient } from '@prisma/client';

// Use a singleton Prisma client appropriate for backend runtime
const prisma = new PrismaClient();

export default prisma;
