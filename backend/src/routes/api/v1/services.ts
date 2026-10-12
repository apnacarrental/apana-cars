import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../../../db';
import { getPagination, formatPaginatedResponse } from '../../../utils/pagination';

const router = Router();

const publicServiceSelect = {
  id: true,
  title: true,
  slug: true,
  shortDescription: true,
  content: true,
  seoMetadata: true
};

// GET /api/v1/services
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { skip, take, page, limit } = getPagination(req);
    const [services, total] = await Promise.all([
      prisma.service.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
        skip,
        take,
        select: {
          ...publicServiceSelect,
          content: false,
          seoMetadata: false
        }
      }),
      prisma.service.count({ where: { isActive: true } })
    ]);
    res.json(formatPaginatedResponse(services, total, page, limit));
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/services/:slug
router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = req.params.slug as string;
    const service = await prisma.service.findFirst({
      where: { slug, isActive: true },
      select: {
        ...publicServiceSelect,
        faqs: {
          select: { id: true, question: true, answer: true }
        }
      }
    });

    if (!service) {
      res.status(404).json({ error: 'Not Found', message: 'Service not found' });
      return;
    }

    res.json({ data: service });
  } catch (error) {
    next(error);
  }
});

export default router;
