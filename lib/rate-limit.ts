// lib/rate-limit.ts
// Local-first IP rate limiting (In-memory token bucket/timestamp map)
// Note: In a true multi-server production environment, use Redis or DB.

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

// Use global to survive Next.js HMR in development
const globalForRateLimit = globalThis as unknown as {
  rateLimitMap: Map<string, RateLimitEntry>;
};

const rateLimitMap = globalForRateLimit.rateLimitMap || new Map<string, RateLimitEntry>();

if (process.env.NODE_ENV !== 'production') {
  globalForRateLimit.rateLimitMap = rateLimitMap;
}

export function checkRateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (now > entry.resetAt) {
    // Reset window
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) {
    return false; // Rate limit exceeded
  }

  // Increment
  entry.count += 1;
  return true;
}
