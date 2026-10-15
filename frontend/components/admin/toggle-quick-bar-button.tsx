'use client'

import React, { useTransition } from 'react'
import { toggleServiceQuickBar } from '@/app/admin/(dashboard)/services/actions'
import { Sparkles, Check, X, Loader2 } from 'lucide-react'

interface ToggleQuickBarButtonProps {
  id: string
  showInQuickBar: boolean
}

export function ToggleQuickBarButton({ id, showInQuickBar }: ToggleQuickBarButtonProps) {
  const [isPending, startTransition] = useTransition()

  const handleToggle = () => {
    startTransition(async () => {
      const res = await toggleServiceQuickBar(id, showInQuickBar)
      if (res?.success === false) {
        alert(res.error)
      }
    })
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      title={showInQuickBar ? 'Click to hide from Quick Service Bar' : 'Click to show in Quick Service Bar'}
      className={`group relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all border select-none cursor-pointer disabled:opacity-60 ${
        showInQuickBar
          ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100 hover:border-amber-400 shadow-2xs'
          : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200 hover:text-slate-700'
      }`}
    >
      {/* Mini Toggle Pill */}
      <span
        className={`w-6 h-3.5 flex items-center rounded-full p-0.5 transition-colors ${
          showInQuickBar ? 'bg-[#0A2540] justify-end' : 'bg-slate-300 justify-start'
        }`}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-white shadow-xs transition-transform" />
      </span>

      {/* Status Label & Icon */}
      {isPending ? (
        <span className="inline-flex items-center gap-1">
          <Loader2 size={11} className="animate-spin text-slate-500" />
          <span className="text-[11px]">Updating...</span>
        </span>
      ) : showInQuickBar ? (
        <span className="inline-flex items-center gap-1">
          <Sparkles size={11} className="text-[#ECA00A]" />
          <span>In Quick Bar</span>
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 text-[11px]">
          <span>Hidden</span>
        </span>
      )}
    </button>
  )
}
