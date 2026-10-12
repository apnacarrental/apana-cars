import DOMPurify from 'isomorphic-dompurify';

export function sanitizeHtml(dirty: string): string {
  if (!dirty) return '';

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
    
    // Explicitly forbid dangerous tags (defense in depth, DOMPurify strips them anyway)
    FORBID_TAGS: [
      'script', 'style', 'iframe', 'object', 'embed', 
      'form', 'meta', 'link'
    ],
    
    // DOMPurify strips js event handlers (onclick, onerror, etc.) and 'javascript:' 
    // URIs by default. 
    // We retain ALLOW_UNKNOWN_PROTOCOLS: false (the default) to ensure
    // URLs like `vbscript:` or `javascript:` in href/src are stripped,
    // while `http:`, `https:`, and relative paths are preserved.
  });
}
