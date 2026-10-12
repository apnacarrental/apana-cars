import prisma from '../prisma';
import { cache } from 'react';

export const getFeaturedCars = cache(async () => {
  return await prisma.car.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
    include: {
      images: {
        include: { media: true },
        orderBy: { sortOrder: 'asc' },
        take: 1
      },
    },
  });
})

export const getCars = cache(async () => {
  return await prisma.car.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
    include: {
      images: {
        include: { media: true },
        orderBy: { sortOrder: 'asc' },
        take: 1
      },
    },
  });
})

export const getCarBySlug = cache(async (slug: string) => {
  const decoded = decodeURIComponent(slug);
  return await prisma.car.findFirst({
    where: {
      OR: [
        { slug, isActive: true },
        { slug: decoded, isActive: true },
      ],
    },
    include: {
      images: {
        include: { media: true },
        orderBy: { sortOrder: 'asc' }
      },
      categories: true,
      faqs: true,
      brand: true
    }
  });
})

export const getServices = cache(async () => {
  return await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
  });
})

export const getServiceBySlug = cache(async (slug: string) => {
  const decoded = decodeURIComponent(slug);
  return await prisma.service.findFirst({
    where: {
      OR: [
        { slug, isActive: true },
        { slug: decoded, isActive: true },
      ],
    },
    include: {
      faqs: true
    }
  });
})

export const getLocations = cache(async () => {
  return await prisma.location.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'asc' },
  });
})

export const getLocationBySlug = cache(async (slug: string) => {
  const decoded = decodeURIComponent(slug);
  return await prisma.location.findFirst({
    where: {
      OR: [
        { slug, isActive: true },
        { slug: decoded, isActive: true },
      ],
    },
    include: {
      parent: true,
      children: true,
      faqs: true
    }
  });
})

export const getRouteBySlug = cache(async (slug: string) => {
  const decoded = decodeURIComponent(slug);
  return await prisma.route.findFirst({
    where: {
      OR: [
        { slug, isActive: true },
        { slug: decoded, isActive: true },
      ],
    },
    include: {
      faqs: true
    }
  });
})

export const getPublishedBlogs = cache(async () => {
  return await prisma.blog.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { createdAt: 'desc' },
    include: { category: true }
  });
})

export const getBlogBySlug = cache(async (slug: string) => {
  const decoded = decodeURIComponent(slug);
  return await prisma.blog.findFirst({
    where: {
      OR: [
        { slug, status: 'PUBLISHED' },
        { slug: decoded, status: 'PUBLISHED' },
      ],
    },
    include: { category: true }
  });
})

export async function getTestimonials() {
  return await prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
  });
}

export async function getGlobalFaqs() {
  return await prisma.fAQ.findMany({
    where: { isGlobal: true },
    orderBy: { sortOrder: 'asc' },
  });
}

export const getRoutes = cache(async () => {
  return await prisma.route.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' }
  });
})
