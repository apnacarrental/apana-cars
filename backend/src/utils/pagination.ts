export class ValidationError extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
    this.status = 400;
  }
}

export function getPagination(req: any) {
  const { page, limit } = req.query;

  let parsedPage = 1;
  let parsedLimit = 50;

  if (page !== undefined) {
    if (typeof page !== 'string') throw new ValidationError('Invalid page parameter');
    if (!/^\d+$/.test(page)) throw new ValidationError('Page must be a positive integer');
    parsedPage = parseInt(page, 10);
    if (parsedPage < 1) throw new ValidationError('Page must be greater than 0');
  }

  if (limit !== undefined) {
    if (typeof limit !== 'string') throw new ValidationError('Invalid limit parameter');
    if (!/^\d+$/.test(limit)) throw new ValidationError('Limit must be a positive integer');
    parsedLimit = parseInt(limit, 10);
    if (parsedLimit < 1) throw new ValidationError('Limit must be greater than 0');
    if (parsedLimit > 100) throw new ValidationError('Limit cannot exceed 100');
  }

  const skip = (parsedPage - 1) * parsedLimit;
  // Prevent insanely large skips that could cause database performance issues or overflow
  if (skip > 1000000) throw new ValidationError('Page number too large');

  return { skip, take: parsedLimit, page: parsedPage, limit: parsedLimit };
}

export function formatPaginatedResponse(data: any[], total: number, page: number, limit: number) {
  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
}
