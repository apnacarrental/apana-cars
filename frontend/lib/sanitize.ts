/**
 * Lightweight, zero-dependency HTML sanitizer for rich text content.
 * Does not depend on jsdom/DOMPurify which crash in Vercel serverless functions.
 */
export function sanitizeHtml(dirty: string): string {
  if (!dirty || typeof dirty !== 'string') return ''

  return dirty
    // Remove script tags and their contents
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove iframe tags and their contents
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    // Remove object/embed/applet tags
    .replace(/<(object|embed|applet)\b[^<]*(?:(?!<\/\1>)<[^<]*)*<\/\1>/gi, '')
    // Strip dangerous inline event handlers like onclick, onload, onerror
    .replace(/\s+on\w+\s*=\s*(['"]).*?\1/gi, '')
    .replace(/\s+on\w+\s*=\s*[^>\s]+/gi, '')
    // Disarm javascript: and vbscript: URIs in href or src
    .replace(/(href|src)\s*=\s*(['"])\s*(?:javascript|vbscript|data):.*?\2/gi, '$1="#"')
    .trim()
}
