import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../../../db';

const router = Router();

// GET /api/v1/brands
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true
      }
    });
    res.json({ data: brands });
  } catch (error) {
    next(error);
  }
});

export default router;
