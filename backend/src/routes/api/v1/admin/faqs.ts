import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import prisma from '../../../../db';
import { requireAdminApi } from '../../../../middleware/auth';

const router = Router();

const FaqSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
  sortOrder: z.number().int().default(0),
  isGlobal: z.boolean().default(false),
  carId: z.string().uuid("Invalid carId format").optional().nullable(),
  locationId: z.string().uuid("Invalid locationId format").optional().nullable(),
  serviceId: z.string().uuid("Invalid serviceId format").optional().nullable(),
  routeId: z.string().uuid("Invalid routeId format").optional().nullable(),
}).strict();

const IdSchema = z.string().uuid("Invalid ID format");

router.use(requireAdminApi);

const selectFaqFields = {
  id: true,
  question: true,
  answer: true,
  sortOrder: true,
  isGlobal: true,
  carId: true,
  locationId: true,
  serviceId: true,
  routeId: true,
  createdAt: true,
  updatedAt: true,
};

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = FaqSchema.parse(req.body);

    const faq = await prisma.fAQ.create({
      data: {
        ...parsed,
        carId: parsed.carId ?? null,
        locationId: parsed.locationId ?? null,
        serviceId: parsed.serviceId ?? null,
        routeId: parsed.routeId ?? null,
      },
      select: selectFaqFields,
    });

    res.status(201).json(faq);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: err.issues });
      return;
    }
    if (err && typeof err === 'object' && 'code' in err) {
      if (err.code === 'P2002') {
        res.status(409).json({ error: 'Conflict', message: 'Unique constraint failed' });
        return;
      }
      if (err.code === 'P2003') {
        res.status(400).json({ error: 'Constraint Failed', message: 'Foreign key constraint failed: Invalid related entity ID' });
        return;
      }
    }
    next(err);
  }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = IdSchema.parse(req.params.id);
    const parsed = FaqSchema.parse(req.body);

    const faq = await prisma.fAQ.update({
      where: { id },
      data: {
        ...parsed,
        carId: parsed.carId ?? null,
        locationId: parsed.locationId ?? null,
        serviceId: parsed.serviceId ?? null,
        routeId: parsed.routeId ?? null,
      },
      select: selectFaqFields,
    });

    res.json(faq);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: err.issues });
      return;
    }
    if (err && typeof err === 'object' && 'code' in err) {
      if (err.code === 'P2025') {
        res.status(404).json({ error: 'Not Found', message: 'FAQ not found' });
        return;
      }
      if (err.code === 'P2002') {
        res.status(409).json({ error: 'Conflict', message: 'Unique constraint failed' });
        return;
      }
      if (err.code === 'P2003') {
        res.status(400).json({ error: 'Constraint Failed', message: 'Foreign key constraint failed: Invalid related entity ID' });
        return;
      }
    }
    next(err);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = IdSchema.parse(req.params.id);
    await prisma.fAQ.delete({
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
        res.status(404).json({ error: 'Not Found', message: 'FAQ not found' });
        return;
      }
      if (err.code === 'P2003') {
        res.status(400).json({ error: 'Constraint Failed', message: 'Foreign key constraint failed: Cannot delete FAQ' });
        return;
      }
    }
    next(err);
  }
});

export default router;

