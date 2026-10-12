import fs from 'fs'
import path from 'path'

export function getSafeImageUrl(url: string | undefined | null): string {
  const fallback = '/images/hero-car.png'
  
  if (!url) return fallback

  try {
    // Check if the image exists in the public directory
    if (url.startsWith('/')) {
      const filePath = path.join(process.cwd(), 'public', url)
      if (fs.existsSync(filePath)) {
        return url
      } else {
        return fallback
      }
    }
    return url // For external URLs (future Cloudinary)
  } catch (error) {
    return fallback
  }
}
