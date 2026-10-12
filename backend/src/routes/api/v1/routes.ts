import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../../../db';
import { getPagination, formatPaginatedResponse } from '../../../utils/pagination';

const router = Router();

const publicRouteSelect = {
  id: true,
  origin: true,
  destination: true,
  slug: true,
  title: true,
  distance: true,
  duration: true,
  startingPrice: true,
  content: true,
  inclusions: true,
  exclusions: true,
  seoMetadata: true
};

// GET /api/v1/routes
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { skip, take, page, limit } = getPagination(req);
    const [routes, total] = await Promise.all([
      prisma.route.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
        select: {
          ...publicRouteSelect,
          content: false,
          seoMetadata: false
        }
      }),
      prisma.route.count({ where: { isActive: true } })
    ]);
    res.json(formatPaginatedResponse(routes, total, page, limit));
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/routes/:slug
router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = req.params.slug as string;
    const routeItem = await prisma.route.findFirst({
      where: { slug, isActive: true },
      select: {
        ...publicRouteSelect,
        faqs: {
          select: { id: true, question: true, answer: true }
        }
      }
    });

    if (!routeItem) {
      res.status(404).json({ error: 'Not Found', message: 'Route not found' });
      return;
    }

    res.json({ data: routeItem });
  } catch (error) {
    next(error);
  }
});

export default router;
