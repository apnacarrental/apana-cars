import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import prisma from '../../../../db';
import { requireAdminApi } from '../../../../middleware/auth';

const router = Router();

const RouteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  origin: z.string().min(1, "Origin is required"),
  destination: z.string().min(1, "Destination is required"),
  distance: z.number().nullable().optional(),
  duration: z.string().nullable().optional(),
  startingPrice: z.number().nullable().optional(),
  content: z.string().nullable().optional(),
  inclusions: z.array(z.string()).optional(),
  exclusions: z.array(z.string()).optional(),
  isActive: z.boolean().default(false),
}).strict();

const IdSchema = z.string().uuid("Invalid ID format");

router.use(requireAdminApi);

const selectRouteFields = {
  id: true,
  title: true,
  slug: true,
  origin: true,
  destination: true,
  distance: true,
  duration: true,
  startingPrice: true,
  content: true,
  inclusions: true,
  exclusions: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
};

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = RouteSchema.parse(req.body);

    if (parsed.origin.trim().toLowerCase() === parsed.destination.trim().toLowerCase()) {
      res.status(400).json({ error: 'Validation Error', message: 'Origin and destination cannot be the same location.' });
      return;
    }

    const routeItem = await prisma.route.create({
      data: parsed,
      select: selectRouteFields,
    });
    res.status(201).json(routeItem);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: err.issues });
      return;
    }
    if (err && typeof err === 'object' && 'code' in err) {
      if (err.code === 'P2002') {
        const target = Array.isArray(err.meta?.target) ? err.meta.target.join(', ') : (err.meta?.target || '');
        if (target.includes('slug')) {
          res.status(409).json({ error: 'Conflict', message: 'Unique constraint failed: Route slug already exists' });
          return;
        }
        res.status(409).json({ error: 'Conflict', message: 'Unique constraint failed: A route between these locations already exists' });
        return;
      }
    }
    next(err);
  }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = IdSchema.parse(req.params.id);
    const parsed = RouteSchema.parse(req.body);

    if (parsed.origin.trim().toLowerCase() === parsed.destination.trim().toLowerCase()) {
      res.status(400).json({ error: 'Validation Error', message: 'Origin and destination cannot be the same location.' });
      return;
    }

    const routeItem = await prisma.route.update({
      where: { id },
      data: parsed,
      select: selectRouteFields,
    });
    res.json(routeItem);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: err.issues });
      return;
    }
    if (err && typeof err === 'object' && 'code' in err) {
      if (err.code === 'P2025') {
        res.status(404).json({ error: 'Not Found', message: 'Route not found' });
        return;
      }
      if (err.code === 'P2002') {
        const target = Array.isArray(err.meta?.target) ? err.meta.target.join(', ') : (err.meta?.target || '');
        if (target.includes('slug')) {
          res.status(409).json({ error: 'Conflict', message: 'Unique constraint failed: Route slug already exists' });
          return;
        }
        res.status(409).json({ error: 'Conflict', message: 'Unique constraint failed: A route between these locations already exists' });
        return;
      }
    }
    next(err);
  }
});

router.patch('/:id/deactivate', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = IdSchema.parse(req.params.id);
    const routeItem = await prisma.route.update({
      where: { id },
      data: { isActive: false },
      select: selectRouteFields,
    });
    res.json(routeItem);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: err.issues });
      return;
    }
    if (err && typeof err === 'object' && 'code' in err) {
      if (err.code === 'P2025') {
        res.status(404).json({ error: 'Not Found', message: 'Route not found' });
        return;
      }
    }
    next(err);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = IdSchema.parse(req.params.id);
    await prisma.route.delete({
      where: { id },
      select: { id: true },
    });
    res.status(204).send();
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: err.issues });
      return;
    }
    if (err && typeof err === 'object' && 'code' in err) {
      if (err.code === 'P2025') {
        res.status(404).json({ error: 'Not Found', message: 'Route not found' });
        return;
      }
      if (err.code === 'P2003') {
        res.status(400).json({ error: 'Constraint Failed', message: 'Foreign key constraint failed: Cannot delete Route because it is attached to existing records' });
        return;
      }
    }
    next(err);
  }
});

export default router;
