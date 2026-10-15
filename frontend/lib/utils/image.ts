export function getSafeImageUrl(url: string | undefined | null, contextName?: string): string {
  if (url && typeof url === 'string' && url.trim() !== '') {
    if (url.startsWith('/') || url.startsWith('http://') || url.startsWith('https://')) {
      return url
    }
  }

  // Smart contextual fallback based on vehicle name / slug
  if (contextName) {
    const lower = contextName.toLowerCase()
    if (lower.includes('tempo') || lower.includes('traveller')) {
      return '/images/srisailam/tempo-traveller.jpg'
    }
    if (lower.includes('urbania')) {
      return '/images/urbania/urbania-12-seater.jpg'
    }
    if (lower.includes('innova')) {
      return '/images/srisailam/innova-crysta.jpg'
    }
    if (lower.includes('ertiga')) {
      return '/images/srisailam/maruti-ertiga.jpg'
    }
    if (lower.includes('sedan') || lower.includes('dzire') || lower.includes('etios')) {
      return '/images/srisailam/swift-dzire.jpg'
    }
  }

  return '/images/hero-car.png'
}
