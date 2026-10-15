import DOMPurify from 'isomorphic-dompurify';

export function sanitizeHtml(dirty: string): string {
  if (!dirty) return '';

  try {
    return DOMPurify.sanitize(dirty, {
      // Explicitly allow only the tags our editor uses (and structural basics)
      ALLOWED_TAGS: [
        'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'strong', 'b', 'em', 'i', 'u', 's', 'strike',
        'ul', 'ol', 'li', 'blockquote',
        'a', 'img', 'br', 'div', 'span'
      ],
      // Explicitly allow only safe attributes
      ALLOWED_ATTR: [
        'href', 'src', 'alt', 'title',
        'class', 'style', 'target', 'rel'
      ],
      // Disallow custom data- attributes which could potentially carry XSS vectors
      ALLOW_DATA_ATTR: false,
      
      // Explicitly forbid dangerous tags
      FORBID_TAGS: [
        'script', 'style', 'iframe', 'object', 'embed', 
        'form', 'meta', 'link'
      ],
    });
  } catch (err) {
    console.error('DOMPurify sanitizeHtml error:', err);
    // Return sanitized plain tags fallback if DOMPurify fails
    return dirty.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  }
}
