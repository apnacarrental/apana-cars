import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../../../db';

const router = Router();

// GET /api/v1/categories
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true
      }
    });
    res.json({ data: categories });
  } catch (error) {
    next(error);
  }
});

export default router;
