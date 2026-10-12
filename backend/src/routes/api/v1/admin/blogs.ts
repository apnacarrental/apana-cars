import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import prisma from '../../../../db';
import { requireAdminApi } from '../../../../middleware/auth';
import { BlogStatus } from '@prisma/client';

const router = Router();

const BlogSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  excerpt: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  categoryId: z.string().uuid("Invalid categoryId format").optional().nullable(),
}).strict();

const IdSchema = z.string().uuid("Invalid ID format");

router.use(requireAdminApi);

const selectBlogFields = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  content: true,
  status: true,
  publishedAt: true,
  categoryId: true,
  createdAt: true,
  updatedAt: true,
};

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = BlogSchema.parse(req.body);

    const publishedAt = parsed.status === 'PUBLISHED' ? new Date() : null;

    const blog = await prisma.blog.create({
      data: {
        ...parsed,
        status: parsed.status as BlogStatus,
        excerpt: parsed.excerpt ?? null,
        content: parsed.content ?? null,
        categoryId: parsed.categoryId ?? null,
        publishedAt,
      },
      select: selectBlogFields,
    });

    res.status(201).json(blog);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: err.issues });
      return;
    }
    if (err && typeof err === 'object' && 'code' in err) {
      if (err.code === 'P2002') {
        res.status(409).json({ error: 'Conflict', message: 'Unique constraint failed: Blog slug already exists' });
        return;
      }
      if (err.code === 'P2003') {
        res.status(400).json({ error: 'Constraint Failed', message: 'Foreign key constraint failed: Invalid categoryId' });
        return;
      }
    }
    next(err);
  }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = IdSchema.parse(req.params.id);
    const parsed = BlogSchema.parse(req.body);

    const existing = await prisma.blog.findUnique({
      where: { id },
      select: { id: true, status: true, publishedAt: true }
    });

    if (!existing) {
      res.status(404).json({ error: 'Not Found', message: 'Blog not found' });
      return;
    }

    const publishedAt = parsed.status === 'PUBLISHED' && existing.status === 'DRAFT'
      ? new Date()
      : existing.publishedAt;

    const blog = await prisma.blog.update({
      where: { id },
      data: {
        ...parsed,
        status: parsed.status as BlogStatus,
        excerpt: parsed.excerpt ?? null,
        content: parsed.content ?? null,
        categoryId: parsed.categoryId ?? null,
        publishedAt,
      },
      select: selectBlogFields,
    });

    res.json(blog);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: err.issues });
      return;
    }
    if (err && typeof err === 'object' && 'code' in err) {
      if (err.code === 'P2025') {
        res.status(404).json({ error: 'Not Found', message: 'Blog not found' });
        return;
      }
      if (err.code === 'P2002') {
        res.status(409).json({ error: 'Conflict', message: 'Unique constraint failed: Blog slug already exists' });
        return;
      }
      if (err.code === 'P2003') {
        res.status(400).json({ error: 'Constraint Failed', message: 'Foreign key constraint failed: Invalid categoryId' });
        return;
      }
    }
    next(err);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = IdSchema.parse(req.params.id);
    await prisma.blog.delete({
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
        res.status(404).json({ error: 'Not Found', message: 'Blog not found' });
        return;
      }
      if (err.code === 'P2003') {
        res.status(400).json({ error: 'Constraint Failed', message: 'Foreign key constraint failed: Cannot delete Blog because it is referenced by other records' });
        return;
      }
    }
    next(err);
  }
});

export default router;
