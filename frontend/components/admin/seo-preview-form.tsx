'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="inline-block bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50"
    >
      {pending ? 'Saving...' : 'Save Page SEO'}
    </button>
  )
}

export function SeoPreviewForm({ 
  saveAction, 
  initialData = {} 
}: { 
  saveAction: (formData: FormData) => void,
  initialData?: any
}) {
  const [title, setTitle] = useState(initialData.title || '')
  const [description, setDescription] = useState(initialData.description || '')
  const [path, setPath] = useState(initialData.path || '')
  const [canonical, setCanonical] = useState(initialData.canonicalUrl || '')
  const [ogTitle, setOgTitle] = useState(initialData.ogTitle || '')
  const [ogDescription, setOgDescription] = useState(initialData.ogDescription || '')
  const [ogImage, setOgImage] = useState(initialData.ogImageId || '')
  const [focusKeyword, setFocusKeyword] = useState(initialData.focusKeyword || '')
  const [secondaryKeywords, setSecondaryKeywords] = useState(initialData.secondaryKeywords || '')

  const titleLength = title.length
  const descLength = description.length

  const serpTitle = title || 'Default Page Title | Apna Cars'
  const serpDesc = description || 'This is how your page description will appear in search results.'
  const serpUrl = canonical || `https://apnacars.com${path || '/your-page'}`

  const socialTitle = ogTitle || title || serpTitle
  const socialDesc = ogDescription || description || serpDesc

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
      <form action={saveAction} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
        <h2 className="font-bold text-lg border-b pb-2">Page SEO Settings</h2>
        
        <div>
          <label className="block text-sm font-medium mb-1">Path (e.g. /about) *</label>
          <input name="path" value={path} onChange={e => setPath(e.target.value)} required className="w-full border rounded-lg p-2 focus:ring-1 focus:ring-black" />
        </div>

        <div className="space-y-4 border-t pt-4">
          <h3 className="font-semibold text-gray-800">Search Engine (SERP)</h3>
          <div>
            <div className="flex justify-between">
              <label className="block text-sm font-medium mb-1">Title Tag</label>
              <span className={`text-xs ${titleLength > 60 ? 'text-orange-500 font-medium' : 'text-gray-400'}`}>
                {titleLength} / 60 {titleLength > 60 && '(Too long)'}
              </span>
            </div>
            <input name="title" value={title} onChange={e => setTitle(e.target.value)} className="w-full border rounded-lg p-2 focus:ring-1 focus:ring-black" />
          </div>

          <div>
            <div className="flex justify-between">
              <label className="block text-sm font-medium mb-1">Meta Description</label>
              <span className={`text-xs ${descLength > 160 ? 'text-orange-500 font-medium' : 'text-gray-400'}`}>
                {descLength} / 160 {descLength > 160 && '(Too long)'}
              </span>
            </div>
            <textarea name="description" value={description} onChange={e => setDescription(e.target.value)} className="w-full border rounded-lg p-2 h-20 focus:ring-1 focus:ring-black" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Canonical URL (Optional)</label>
            <input name="canonicalUrl" type="url" value={canonical} onChange={e => setCanonical(e.target.value)} placeholder="https://..." className="w-full border rounded-lg p-2 focus:ring-1 focus:ring-black" />
            <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate.</p>
          </div>
          
          <div className="flex gap-6 pt-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" name="robotsIndex" defaultChecked={initialData.robotsIndex ?? true} className="rounded" /> Index (Allow indexing)
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" name="robotsFollow" defaultChecked={initialData.robotsFollow ?? true} className="rounded" /> Follow (Allow link following)
            </label>
          </div>
        </div>
        
        <div className="space-y-4 border-t pt-4">
          <h3 className="font-semibold text-gray-800">Keywords (Editorial Guidance)</h3>
          <p className="text-xs text-gray-500">Note: These are for internal health checks. They do not generate HTML meta-keywords.</p>
          <div>
            <label className="block text-sm font-medium mb-1">Focus Keyword</label>
            <input name="focusKeyword" value={focusKeyword} onChange={e => setFocusKeyword(e.target.value)} className="w-full border rounded-lg p-2 focus:ring-1 focus:ring-black" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Secondary Keywords (comma separated)</label>
            <input name="secondaryKeywords" value={secondaryKeywords} onChange={e => setSecondaryKeywords(e.target.value)} className="w-full border rounded-lg p-2 focus:ring-1 focus:ring-black" />
          </div>
        </div>

        <div className="space-y-4 border-t pt-4">
          <h3 className="font-semibold text-gray-800">Social (Open Graph)</h3>
          <div>
            <label className="block text-sm font-medium mb-1">OG Title (Defaults to Title)</label>
            <input name="ogTitle" value={ogTitle} onChange={e => setOgTitle(e.target.value)} className="w-full border rounded-lg p-2 focus:ring-1 focus:ring-black" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">OG Description (Defaults to Description)</label>
            <textarea name="ogDescription" value={ogDescription} onChange={e => setOgDescription(e.target.value)} className="w-full border rounded-lg p-2 h-16 focus:ring-1 focus:ring-black" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">OG Image URL (Optional)</label>
            <input name="ogImageId" type="url" value={ogImage} onChange={e => setOgImage(e.target.value)} placeholder="https://..." className="w-full border rounded-lg p-2 focus:ring-1 focus:ring-black" />
          </div>
        </div>

        <div className="border-t pt-4">
          <SubmitButton />
        </div>
      </form>

      <div className="space-y-6 sticky top-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-600 text-sm mb-4">Google Search Preview</h3>
          <div className="max-w-[600px]">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">AC</div>
              <div>
                <div className="text-sm text-[#202124] leading-tight">Apna Cars</div>
                <div className="text-xs text-[#4d5156] leading-tight">{serpUrl}</div>
              </div>
            </div>
            <h4 className="text-xl text-[#1a0dab] font-medium truncate mb-1 hover:underline cursor-pointer">{serpTitle}</h4>
            <p className="text-sm text-[#4d5156] line-clamp-2">{serpDesc}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-600 text-sm mb-4">Social Media Preview (Facebook / LinkedIn)</h3>
          <div className="max-w-[500px] border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
            <div className="w-full h-[260px] bg-gray-200 flex items-center justify-center overflow-hidden">
              {ogImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={ogImage} alt="OG Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400">No Image Provided</span>
              )}
            </div>
            <div className="p-4 bg-[#f2f3f5] border-t border-gray-200">
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">apnacars.com</div>
              <h4 className="font-bold text-gray-900 mb-1 truncate">{socialTitle}</h4>
              <p className="text-sm text-gray-600 line-clamp-1">{socialDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
