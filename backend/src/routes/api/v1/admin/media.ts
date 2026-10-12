import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import prisma from '../../../../db';
import { requireAdminApi } from '../../../../middleware/auth';

const router = Router();

const CreateMediaSchema = z.object({
  publicId: z.string().min(1, "Public ID is required"),
  secureUrl: z.string().min(1, "Secure URL is required"),
  altText: z.string().optional().nullable(),
  width: z.number().int().optional().nullable(),
  height: z.number().int().optional().nullable(),
}).strict();

const UpdateMediaSchema = z.object({
  altText: z.string().optional().nullable(),
}).strict();

const IdSchema = z.string().uuid("Invalid ID format");

router.use(requireAdminApi);

const selectMediaFields = {
  id: true,
  publicId: true,
  secureUrl: true,
  altText: true,
  width: true,
  height: true,
  createdAt: true,
  updatedAt: true,
};

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = CreateMediaSchema.parse(req.body);

    const media = await prisma.media.create({
      data: {
        publicId: parsed.publicId,
        secureUrl: parsed.secureUrl,
        altText: parsed.altText ?? null,
        width: parsed.width ?? null,
        height: parsed.height ?? null,
      },
      select: selectMediaFields,
    });

    res.status(201).json(media);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: err.issues });
      return;
    }
    if (err && typeof err === 'object' && 'code' in err) {
      if (err.code === 'P2002') {
        res.status(409).json({ error: 'Conflict', message: 'Unique constraint failed: Media with this publicId already exists' });
        return;
      }
    }
    next(err);
  }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = IdSchema.parse(req.params.id);
    const parsed = UpdateMediaSchema.parse(req.body);

    const media = await prisma.media.update({
      where: { id },
      data: {
        altText: parsed.altText ?? null,
      },
      select: selectMediaFields,
    });

    res.json(media);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: err.issues });
      return;
    }
    if (err && typeof err === 'object' && 'code' in err) {
      if (err.code === 'P2025') {
        res.status(404).json({ error: 'Not Found', message: 'Media not found' });
        return;
      }
    }
    next(err);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = IdSchema.parse(req.params.id);

    const existing = await prisma.media.findUnique({
      where: { id },
      select: {
        id: true,
        publicId: true,
        _count: {
          select: { carImages: true },
        },
      },
    });

    if (!existing) {
      res.status(404).json({ error: 'Not Found', message: 'Media not found' });
      return;
    }

    if (existing._count.carImages > 0) {
      res.status(400).json({
        error: 'Constraint Failed',
        message: 'Cannot delete media because it is in use by one or more cars.',
      });
      return;
    }

    await prisma.media.delete({
      where: { id },
      select: { id: true },
    });

    res.json({ success: true, id: existing.id, publicId: existing.publicId });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: err.issues });
      return;
    }
    if (err && typeof err === 'object') {
      if (err.code === 'P2025') {
        res.status(404).json({ error: 'Not Found', message: 'Media not found' });
        return;
      }
      if (
        err.code === 'P2003' ||
        (typeof err.message === 'string' &&
          (err.message.includes('foreign key constraint') || err.message.includes('violates RESTRICT')))
      ) {
        res.status(400).json({
          error: 'Constraint Failed',
          message: 'Cannot delete media because it is in use by one or more cars.',
        });
        return;
      }
    }
    next(err);
  }
});

export default router;
