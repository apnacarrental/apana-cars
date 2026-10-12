import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../../../db';
import { getPagination, formatPaginatedResponse } from '../../../utils/pagination';

const router = Router();

const publicBlogSelect = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  content: true,
  publishedAt: true,
  seoMetadata: true
};

// GET /api/v1/blogs
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { skip, take, page, limit } = getPagination(req);
    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where: { status: 'PUBLISHED' },
        orderBy: { publishedAt: 'desc' },
        skip,
        take,
        select: {
          ...publicBlogSelect,
          content: false,
          seoMetadata: false,
          category: {
            select: { id: true, name: true, slug: true }
          }
        }
      }),
      prisma.blog.count({ where: { status: 'PUBLISHED' } })
    ]);
    res.json(formatPaginatedResponse(blogs, total, page, limit));
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/blogs/:slug
router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = req.params.slug as string;
    const blog = await prisma.blog.findFirst({
      where: { slug, status: 'PUBLISHED' },
      select: {
        ...publicBlogSelect,
        category: {
          select: { id: true, name: true, slug: true }
        }
      }
    });

    if (!blog) {
      res.status(404).json({ error: 'Not Found', message: 'Blog not found' });
      return;
    }

    res.json({ data: blog });
  } catch (error) {
    next(error);
  }
});

export default router;
