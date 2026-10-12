import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import prisma from '../../../../db';
import { requireAdminApi } from '../../../../middleware/auth';

const router = Router();

const ServiceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  shortDescription: z.string().optional().nullable(),
  sortOrder: z.number().int(),
  isActive: z.boolean(),
}).strict();

const IdSchema = z.string().uuid("Invalid ID format");

router.use(requireAdminApi);

const selectFields = { id: true, title: true, slug: true, isActive: true };

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = ServiceSchema.parse(req.body);
    const service = await prisma.service.create({ data: parsed, select: selectFields });
    res.status(201).json(service);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: err.issues });
      return;
    }
    if (err && typeof err === 'object' && 'code' in err) {
      if (err.code === 'P2002') {
        res.status(409).json({ error: 'Conflict', message: 'Unique constraint failed: Service title or slug already exists' });
        return;
      }
    }
    next(err);
  }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = IdSchema.parse(req.params.id);
    const parsed = ServiceSchema.parse(req.body);
    const service = await prisma.service.update({
      where: { id },
      data: parsed,
      select: selectFields
    });
    res.json(service);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: err.issues });
      return;
    }
    if (err && typeof err === 'object' && 'code' in err) {
      if (err.code === 'P2025') {
        res.status(404).json({ error: 'Not Found', message: 'Service not found' });
        return;
      }
      if (err.code === 'P2002') {
        res.status(409).json({ error: 'Conflict', message: 'Unique constraint failed: Service title or slug already exists' });
        return;
      }
    }
    next(err);
  }
});

router.patch('/:id/deactivate', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = IdSchema.parse(req.params.id);
    const service = await prisma.service.update({
      where: { id },
      data: { isActive: false },
      select: selectFields
    });
    res.json(service);
  } catch (err: any) {
    if (err && typeof err === 'object' && 'code' in err) {
      if (err.code === 'P2025') {
        res.status(404).json({ error: 'Not Found', message: 'Service not found' });
        return;
      }
    }
    next(err);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = IdSchema.parse(req.params.id);
    await prisma.service.delete({
      where: { id },
      select: { id: true }
    });
    res.status(204).send();
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: err.issues });
      return;
    }
    if (err && typeof err === 'object' && 'code' in err) {
      if (err.code === 'P2025') {
        res.status(404).json({ error: 'Not Found', message: 'Service not found' });
        return;
      }
      if (err.code === 'P2003') {
        res.status(400).json({ error: 'Constraint Failed', message: 'Foreign key constraint failed: Cannot delete Service because it is attached to existing records' });
        return;
      }
    }
    next(err);
  }
});

export default router;
