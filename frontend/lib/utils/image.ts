export function getSafeImageUrl(url: string | undefined | null): string {
  const fallback = '/images/hero-car.png'
  
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return fallback
  }

  // If it's a valid relative path or absolute web URL, return it
  if (url.startsWith('/') || url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  return fallback
}
