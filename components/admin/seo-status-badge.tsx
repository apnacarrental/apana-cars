export function SeoStatusBadge({ seoMetadata, hasContent }: { seoMetadata: any, hasContent?: boolean }) {
  const seo = seoMetadata || {}
  
  // Note: Entities always have an implicit fallback title and canonical. 
  // OG Image and Focus Keyword are the ones that can effectively be missing if no global fallback exists.
  // We only warn for Focus Keyword and Thin Content at the record level for simplicity.
  const missingFocus = !seo.focus_keyword
  const isNoindex = seo.robots_index === false
  
  const issues = []
  if (missingFocus) issues.push('Focus Keyword Missing')
  if (hasContent === false) issues.push('Thin Content')
  
  const statuses = []
  if (isNoindex) statuses.push('Noindex')

  if (issues.length === 0 && statuses.length === 0) {
    return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Good</span>
  }

  if (issues.length === 0 && statuses.length > 0) {
    return (
      <span 
        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 cursor-help"
        title={statuses.join(', ')}
      >
        Status: {statuses.join(', ')}
      </span>
    )
  }

  return (
    <span 
      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium cursor-help bg-orange-100 text-orange-800"
      title={[...issues, ...statuses].join(', ')}
    >
      {issues.length} {issues.length === 1 ? 'Issue' : 'Issues'}
    </span>
  )
}
