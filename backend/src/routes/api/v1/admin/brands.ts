import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import prisma from '../../../../db';
import { requireAdminApi } from '../../../../middleware/auth';

const router = Router();

const BrandSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
}).strict(); // Enforce strict contract as requested

const IdSchema = z.string().uuid("Invalid ID format");

// Protect all routes
router.use(requireAdminApi);

// POST /api/v1/admin/brands
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = BrandSchema.parse(req.body);
    const brand = await prisma.brand.create({ data: parsed });
    res.status(201).json(brand);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: err.issues });
      return;
    }
    if (err.code === 'P2002') {
      res.status(409).json({ error: 'Conflict', message: 'Unique constraint failed: Brand name or slug already exists' });
      return;
    }
    next(err);
  }
});

// PUT /api/v1/admin/brands/:id
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = IdSchema.parse(req.params.id);
    const parsed = BrandSchema.parse(req.body);
    const brand = await prisma.brand.update({
      where: { id },
      data: parsed,
    });
    res.json(brand);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: err.issues });
      return;
    }
    if (err.code === 'P2025') {
      res.status(404).json({ error: 'Not Found', message: 'Brand not found' });
      return;
    }
    if (err.code === 'P2002') {
      res.status(409).json({ error: 'Conflict', message: 'Unique constraint failed: Brand name or slug already exists' });
      return;
    }
    next(err);
  }
});

// DELETE /api/v1/admin/brands/:id
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = IdSchema.parse(req.params.id);
    await prisma.brand.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: err.issues });
      return;
    }
    if (err.code === 'P2025') {
      res.status(404).json({ error: 'Not Found', message: 'Brand not found' });
      return;
    }
    if (err.code === 'P2003') {
      res.status(400).json({ error: 'Constraint Failed', message: 'Foreign key constraint failed: Cannot delete Brand because it is attached to existing cars' });
      return;
    }
    next(err);
  }
});

export default router;
