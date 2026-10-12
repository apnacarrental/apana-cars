import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../../../db';
import { getPagination, formatPaginatedResponse } from '../../../utils/pagination';

const router = Router();

const publicCarSelect = {
  id: true,
  name: true,
  slug: true,
  shortDescription: true,
  content: true,
  seats: true,
  luggage: true,
  transmission: true,
  fuelType: true,
  pricePerDay: true,
  petrolPricePerKm: true,
  dieselPricePerKm: true,
  electricPricePerKm: true,
  hybridPricePerKm: true,
  seoMetadata: true,
  images: {
    orderBy: { sortOrder: 'asc' as const },
    select: {
      media: {
        select: {
          publicId: true,
          secureUrl: true,
          altText: true,
          width: true,
          height: true
        }
      }
    }
  }
};

// GET /api/v1/cars
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { skip, take, page, limit } = getPagination(req);
    const [cars, total] = await Promise.all([
      prisma.car.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
        skip,
        take,
        select: {
          ...publicCarSelect,
          content: false, // Omit heavy content for listings
          seoMetadata: false, // Omit SEO for listings
          images: {
            orderBy: { sortOrder: 'asc' as const },
            take: 1,
            select: publicCarSelect.images.select
          }
        }
      }),
      prisma.car.count({ where: { isActive: true } })
    ]);
    res.json(formatPaginatedResponse(cars, total, page, limit));
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/cars/:slug
router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = req.params.slug as string;
    const car = await prisma.car.findFirst({
      where: { slug, isActive: true },
      select: {
        ...publicCarSelect,
        categories: {
          select: { id: true, name: true, slug: true, description: true }
        },
        faqs: {
          select: { id: true, question: true, answer: true }
        },
        brand: {
          select: { id: true, name: true, slug: true }
        }
      }
    });

    if (!car) {
      res.status(404).json({ error: 'Not Found', message: 'Car not found' });
      return;
    }

    res.json({ data: car });
  } catch (error) {
    next(error);
  }
});

export default router;
