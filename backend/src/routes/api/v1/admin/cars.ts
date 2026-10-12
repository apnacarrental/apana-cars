import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import prisma from '../../../../db';
import { requireAdminApi } from '../../../../middleware/auth';
import { Transmission, FuelType } from '@prisma/client';

const router = Router();

const CarSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  brandId: z.string().uuid("Invalid Brand ID"),
  shortDescription: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
  seats: z.number().int().min(1).default(4),
  luggage: z.number().int().min(0).default(2),
  transmission: z.enum(['MANUAL', 'AUTOMATIC']),
  fuelType: z.enum(['PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID']),
  pricePerDay: z.number().min(0),
  isActive: z.boolean().default(false),
  isFeatured: z.boolean().optional().default(false),
  sortOrder: z.number().int().default(0),
}).strict();

const AttachImageSchema = z.object({
  mediaId: z.string().uuid("Invalid Media ID"),
  sortOrder: z.number().int().optional().default(0),
}).strict();

const IdSchema = z.string().uuid("Invalid ID format");

router.use(requireAdminApi);

const selectCarFields = {
  id: true,
  name: true,
  slug: true,
  brandId: true,
  shortDescription: true,
  content: true,
  seats: true,
  luggage: true,
  transmission: true,
  fuelType: true,
  pricePerDay: true,
  isActive: true,
  isFeatured: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
};

const selectCarImageFields = {
  id: true,
  carId: true,
  mediaId: true,
  sortOrder: true,
};

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = CarSchema.parse(req.body);
    const car = await prisma.car.create({
      data: {
        ...parsed,
        shortDescription: parsed.shortDescription ?? null,
        content: parsed.content ?? null,
        transmission: parsed.transmission as Transmission,
        fuelType: parsed.fuelType as FuelType,
      },
      select: selectCarFields,
    });
    res.status(201).json(car);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: err.issues });
      return;
    }
    if (err && typeof err === 'object' && 'code' in err) {
      if (err.code === 'P2002') {
        res.status(409).json({ error: 'Conflict', message: 'Unique constraint failed: Car slug already exists' });
        return;
      }
      if (err.code === 'P2003') {
        res.status(400).json({ error: 'Constraint Failed', message: 'Foreign key constraint failed: Invalid brandId' });
        return;
      }
    }
    next(err);
  }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = IdSchema.parse(req.params.id);
    const parsed = CarSchema.parse(req.body);
    const car = await prisma.car.update({
      where: { id },
      data: {
        ...parsed,
        shortDescription: parsed.shortDescription ?? null,
        content: parsed.content ?? null,
        transmission: parsed.transmission as Transmission,
        fuelType: parsed.fuelType as FuelType,
      },
      select: selectCarFields,
    });
    res.json(car);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: err.issues });
      return;
    }
    if (err && typeof err === 'object' && 'code' in err) {
      if (err.code === 'P2025') {
        res.status(404).json({ error: 'Not Found', message: 'Car not found' });
        return;
      }
      if (err.code === 'P2002') {
        res.status(409).json({ error: 'Conflict', message: 'Unique constraint failed: Car slug already exists' });
        return;
      }
      if (err.code === 'P2003') {
        res.status(400).json({ error: 'Constraint Failed', message: 'Foreign key constraint failed: Invalid brandId' });
        return;
      }
    }
    next(err);
  }
});

router.patch('/:id/deactivate', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = IdSchema.parse(req.params.id);
    const car = await prisma.car.update({
      where: { id },
      data: { isActive: false },
      select: selectCarFields,
    });
    res.json(car);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: err.issues });
      return;
    }
    if (err && typeof err === 'object' && 'code' in err) {
      if (err.code === 'P2025') {
        res.status(404).json({ error: 'Not Found', message: 'Car not found' });
        return;
      }
    }
    next(err);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = IdSchema.parse(req.params.id);
    await prisma.car.delete({
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
        res.status(404).json({ error: 'Not Found', message: 'Car not found' });
        return;
      }
      if (err.code === 'P2003') {
        res.status(400).json({ error: 'Constraint Failed', message: 'Foreign key constraint failed: Cannot delete Car because it is attached to existing records' });
        return;
      }
    }
    next(err);
  }
});

router.post('/:id/images', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const carId = IdSchema.parse(req.params.id);
    const { mediaId, sortOrder } = AttachImageSchema.parse(req.body);

    const car = await prisma.car.findUnique({ where: { id: carId }, select: { id: true, slug: true } });
    if (!car) {
      res.status(404).json({ error: 'Not Found', message: 'Car not found' });
      return;
    }

    const media = await prisma.media.findUnique({ where: { id: mediaId }, select: { id: true } });
    if (!media) {
      res.status(404).json({ error: 'Not Found', message: 'Media not found' });
      return;
    }

    const carImage = await prisma.carImage.upsert({
      where: {
        carId_mediaId: {
          carId,
          mediaId,
        },
      },
      update: { sortOrder },
      create: {
        carId,
        mediaId,
        sortOrder,
      },
      select: selectCarImageFields,
    });

    res.status(201).json({ data: carImage, carSlug: car.slug });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: err.issues });
      return;
    }
    if (err && typeof err === 'object' && 'code' in err) {
      if (err.code === 'P2003') {
        res.status(400).json({ error: 'Constraint Failed', message: 'Invalid Car or Media ID' });
        return;
      }
    }
    next(err);
  }
});

router.delete('/:id/images/:mediaId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const carId = IdSchema.parse(req.params.id);
    const mediaId = IdSchema.parse(req.params.mediaId);

    const car = await prisma.car.findUnique({ where: { id: carId }, select: { id: true, slug: true } });

    await prisma.carImage.delete({
      where: {
        carId_mediaId: {
          carId,
          mediaId,
        },
      },
      select: { id: true },
    });

    res.json({ success: true, carSlug: car?.slug });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: err.issues });
      return;
    }
    if (err && typeof err === 'object' && 'code' in err) {
      if (err.code === 'P2025') {
        res.status(404).json({ error: 'Not Found', message: 'Image attachment not found' });
        return;
      }
    }
    next(err);
  }
});

export default router;
