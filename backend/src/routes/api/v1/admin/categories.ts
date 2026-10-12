import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import prisma from '../../../../db';
import { requireAdminApi } from '../../../../middleware/auth';

const router = Router();

const CategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional().nullable(),
}).strict();

const IdSchema = z.string().uuid("Invalid ID format");

router.use(requireAdminApi);

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = CategorySchema.parse(req.body);
    const category = await prisma.category.create({ data: parsed });
    res.status(201).json(category);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: err.issues });
      return;
    }
    if (err.code === 'P2002') {
      res.status(409).json({ error: 'Conflict', message: 'Unique constraint failed: Category name or slug already exists' });
      return;
    }
    next(err);
  }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = IdSchema.parse(req.params.id);
    const parsed = CategorySchema.parse(req.body);
    const category = await prisma.category.update({
      where: { id },
      data: parsed,
    });
    res.json(category);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: err.issues });
      return;
    }
    if (err.code === 'P2025') {
      res.status(404).json({ error: 'Not Found', message: 'Category not found' });
      return;
    }
    if (err.code === 'P2002') {
      res.status(409).json({ error: 'Conflict', message: 'Unique constraint failed: Category name or slug already exists' });
      return;
    }
    next(err);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = IdSchema.parse(req.params.id);
    await prisma.category.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: err.issues });
      return;
    }
    if (err.code === 'P2025') {
      res.status(404).json({ error: 'Not Found', message: 'Category not found' });
      return;
    }
    if (err.code === 'P2003') {
      res.status(400).json({ error: 'Constraint Failed', message: 'Foreign key constraint failed: Cannot delete Category because it is attached to existing cars' });
      return;
    }
    next(err);
  }
});

export default router;
