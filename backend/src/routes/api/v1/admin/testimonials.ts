import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import prisma from '../../../../db';
import { requireAdminApi } from '../../../../middleware/auth';

const router = Router();

const TestimonialSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  review: z.string().min(1, "Review is required"),
  rating: z.number().int().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5").default(5),
  locationContext: z.string().optional().nullable(),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(false),
}).strict();

const IdSchema = z.string().uuid("Invalid ID format");

router.use(requireAdminApi);

const selectTestimonialFields = {
  id: true,
  customerName: true,
  rating: true,
  review: true,
  locationContext: true,
  isActive: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
};

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = TestimonialSchema.parse(req.body);

    const testimonial = await prisma.testimonial.create({
      data: {
        ...parsed,
        locationContext: parsed.locationContext ?? null,
      },
      select: selectTestimonialFields,
    });

    res.status(201).json(testimonial);
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
    }
    next(err);
  }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = IdSchema.parse(req.params.id);
    const parsed = TestimonialSchema.parse(req.body);

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        ...parsed,
        locationContext: parsed.locationContext ?? null,
      },
      select: selectTestimonialFields,
    });

    res.json(testimonial);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: err.issues });
      return;
    }
    if (err && typeof err === 'object' && 'code' in err) {
      if (err.code === 'P2025') {
        res.status(404).json({ error: 'Not Found', message: 'Testimonial not found' });
        return;
      }
      if (err.code === 'P2002') {
        res.status(409).json({ error: 'Conflict', message: 'Unique constraint failed' });
        return;
      }
    }
    next(err);
  }
});

router.patch('/:id/deactivate', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = IdSchema.parse(req.params.id);
    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: { isActive: false },
      select: selectTestimonialFields,
    });
    res.json(testimonial);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: err.issues });
      return;
    }
    if (err && typeof err === 'object' && 'code' in err) {
      if (err.code === 'P2025') {
        res.status(404).json({ error: 'Not Found', message: 'Testimonial not found' });
        return;
      }
    }
    next(err);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = IdSchema.parse(req.params.id);
    await prisma.testimonial.delete({
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
        res.status(404).json({ error: 'Not Found', message: 'Testimonial not found' });
        return;
      }
      if (err.code === 'P2003') {
        res.status(400).json({ error: 'Constraint Failed', message: 'Foreign key constraint failed: Cannot delete Testimonial' });
        return;
      }
    }
    next(err);
  }
});

export default router;
