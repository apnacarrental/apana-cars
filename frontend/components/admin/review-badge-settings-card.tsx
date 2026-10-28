'use client'

import React, { useState, useTransition } from 'react'
import { Star, CheckCircle, ExternalLink, RefreshCw } from 'lucide-react'
import { updateReviewBadgeSettings } from '@/app/admin/(dashboard)/testimonials/actions'

interface ReviewBadgeSettingsCardProps {
  initialSettings: {
    reviewCountText: string
    reviewSubtext: string
    ratingValue: string
    gmbUrl: string
  }
}

export function ReviewBadgeSettingsCard({ initialSettings }: ReviewBadgeSettingsCardProps) {
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [count, setCount] = useState(initialSettings.reviewCountText || '1500+')
  const [subtext, setSubtext] = useState(initialSettings.reviewSubtext || 'Genuine Reviews')
  const [rating, setRating] = useState(initialSettings.ratingValue || '4.9/5')
  const [gmbUrl, setGmbUrl] = useState(initialSettings.gmbUrl || 'https://share.google/z8cDjKFU53sT1UXHv')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSuccess(false)
    setError(null)
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      try {
        const res = await updateReviewBadgeSettings(formData)
        if (res && 'error' in res && res.error) {
          setError(res.error)
        } else {
          setSuccess(true)
          setTimeout(() => setSuccess(false), 4000)
        }
      } catch (err: any) {
        setError(err.message || 'Failed to update review badge settings')
      }
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              Homepage &amp; Service Pages
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mt-1">Google Reviews Hero Badge</h2>
          <p className="text-xs text-gray-500 mt-1">
            Control the live review count (e.g. 1500+, 2000+), rating score, and GMB link displayed in the hero section across the entire website.
          </p>
        </div>

        {/* Live Preview Box */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex flex-col sm:flex-row items-center gap-4 shrink-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Live Preview:</span>
          <div className="flex items-center gap-3">
            {/* Badge 1 Preview */}
            <div className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200/60 shadow-xs">
              <div className="w-6 h-6 rounded-full bg-white border border-slate-100 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.15z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.15C3.25 21.37 7.31 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.27C.46 8.2.005 10.04.005 12s.46 3.8 1.27 5.42l4.01-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.63 1.27 6.58l4.01 3.15c.95-2.83 3.6-4.93 6.72-4.93z"/>
                </svg>
              </div>
              <div className="leading-tight">
                <strong className="text-xs font-bold text-[#0F172A] block">{count || '1500+'}</strong>
                <span className="text-[10px] text-slate-500 font-medium">{subtext || 'Genuine Reviews'}</span>
              </div>
            </div>

            {/* Badge 2 Preview */}
            <div className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200/60 shadow-xs">
              <div className="w-6 h-6 rounded-full bg-amber-50 border border-amber-200/60 flex items-center justify-center text-[#ECA00A] shrink-0">
                <Star size={12} className="fill-current text-[#ECA00A]" />
              </div>
              <div className="leading-tight">
                <strong className="text-xs font-bold text-[#0F172A] block">{rating || '4.9/5'}</strong>
                <span className="text-[10px] text-slate-500 font-medium">Customer Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Review Count Text
            </label>
            <input
              type="text"
              name="reviewCountText"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              placeholder="e.g. 1500+ or 2000+"
              required
              className="w-full text-sm font-semibold border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-[11px] text-gray-400 mt-1">Displayed in bold (e.g. 1500+, 2000+, 1850+).</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Badge Label / Subtext
            </label>
            <input
              type="text"
              name="reviewSubtext"
              value={subtext}
              onChange={(e) => setSubtext(e.target.value)}
              placeholder="e.g. Genuine Reviews"
              required
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-[11px] text-gray-400 mt-1">Small caption under the count.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Rating Score
            </label>
            <input
              type="text"
              name="ratingValue"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="e.g. 4.9/5"
              required
              className="w-full text-sm font-semibold border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-[11px] text-gray-400 mt-1">Customer rating display (e.g. 4.9/5).</p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
            Google Business Profile (GMB) Link
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              name="gmbUrl"
              value={gmbUrl}
              onChange={(e) => setGmbUrl(e.target.value)}
              placeholder="https://share.google/..."
              required
              className="flex-1 text-sm border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
            <a
              href={gmbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              <span>Test Link</span>
              <ExternalLink size={14} />
            </a>
          </div>
          <p className="text-[11px] text-gray-400 mt-1">
            When users click the review badge or testimonials rating, this exact Google URL is opened in a new tab.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-200 flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-600" />
            Review badge updated successfully! Changes are live across the homepage and service heros.
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-blue-700 disabled:opacity-60 transition-colors shadow-xs"
          >
            {isPending ? (
              <>
                <RefreshCw size={14} className="animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <span>Save Review Badge</span>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
