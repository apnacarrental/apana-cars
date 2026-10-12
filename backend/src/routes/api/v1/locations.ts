import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../../../db';
import { getPagination, formatPaginatedResponse } from '../../../utils/pagination';

const router = Router();

const publicLocationSelect = {
  id: true,
  name: true,
  slug: true,
  type: true,
  description: true,
  content: true,
  seoMetadata: true
};

// GET /api/v1/locations
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { skip, take, page, limit } = getPagination(req);
    const [locations, total] = await Promise.all([
      prisma.location.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'asc' },
        skip,
        take,
        select: {
          ...publicLocationSelect,
          content: false,
          seoMetadata: false
        }
      }),
      prisma.location.count({ where: { isActive: true } })
    ]);
    res.json(formatPaginatedResponse(locations, total, page, limit));
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/locations/:slug
router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = req.params.slug as string;
    const location = await prisma.location.findFirst({
      where: { slug, isActive: true },
      select: {
        ...publicLocationSelect,
        parent: {
          select: { id: true, name: true, slug: true, type: true }
        },
        children: {
          select: { id: true, name: true, slug: true, type: true }
        },
        faqs: {
          select: { id: true, question: true, answer: true }
        }
      }
    });

    if (!location) {
      res.status(404).json({ error: 'Not Found', message: 'Location not found' });
      return;
    }

    res.json({ data: location });
  } catch (error) {
    next(error);
  }
});

export default router;
