import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import prisma from '../../../../db';
import { LocationType } from '@prisma/client';
import { requireAdminApi } from '../../../../middleware/auth';

const router = Router();

const LocationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  type: z.enum(['CITY', 'AIRPORT', 'NEIGHBORHOOD']),
  parentId: z.string().uuid().optional().nullable(),
  isActive: z.boolean(),
}).strict();

const IdSchema = z.string().uuid("Invalid ID format");

router.use(requireAdminApi);

const selectFields = { id: true, name: true, slug: true, isActive: true, type: true, parentId: true };

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = LocationSchema.parse(req.body);
    const location = await prisma.location.create({ data: { ...parsed, type: parsed.type as LocationType, parentId: parsed.parentId || null }, select: selectFields });
    res.status(201).json(location);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: err.issues });
      return;
    }
    if (err && typeof err === 'object' && 'code' in err) {
      if (err.code === 'P2002') {
        res.status(409).json({ error: 'Conflict', message: 'Unique constraint failed: Location name or slug already exists' });
        return;
      }
      if (err.code === 'P2003') {
        res.status(400).json({ error: 'Constraint Failed', message: 'Foreign key constraint failed: Invalid parentId' });
        return;
      }
    }
    next(err);
  }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = IdSchema.parse(req.params.id);
    const parsed = LocationSchema.parse(req.body);
    
    if (id === parsed.parentId) {
      res.status(400).json({ error: 'Constraint Failed', message: 'A location cannot be its own parent.' });
      return;
    }

    const location = await prisma.location.update({
      where: { id },
      data: { ...parsed, type: parsed.type as LocationType, parentId: parsed.parentId || null },
      select: selectFields
    });
    res.json(location);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: err.issues });
      return;
    }
    if (err && typeof err === 'object' && 'code' in err) {
      if (err.code === 'P2025') {
        res.status(404).json({ error: 'Not Found', message: 'Location not found' });
        return;
      }
      if (err.code === 'P2002') {
        res.status(409).json({ error: 'Conflict', message: 'Unique constraint failed: Location name or slug already exists' });
        return;
      }
      if (err.code === 'P2003') {
        res.status(400).json({ error: 'Constraint Failed', message: 'Foreign key constraint failed: Invalid parentId' });
        return;
      }
    }
    next(err);
  }
});

router.patch('/:id/deactivate', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = IdSchema.parse(req.params.id);
    const location = await prisma.location.update({
      where: { id },
      data: { isActive: false },
      select: selectFields
    });
    res.json(location);
  } catch (err: any) {
    if (err && typeof err === 'object' && 'code' in err) {
      if (err.code === 'P2025') {
        res.status(404).json({ error: 'Not Found', message: 'Location not found' });
        return;
      }
    }
    next(err);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = IdSchema.parse(req.params.id);
    await prisma.location.delete({
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
        res.status(404).json({ error: 'Not Found', message: 'Location not found' });
        return;
      }
      if (err.code === 'P2003') {
        res.status(400).json({ error: 'Constraint Failed', message: 'Foreign key constraint failed: Cannot delete Location because it is attached to existing records' });
        return;
      }
    }
    next(err);
  }
});

export default router;


