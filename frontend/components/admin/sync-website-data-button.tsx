'use client'

import { useState, useTransition } from 'react'
import { syncWebsiteDataAction } from '@/app/admin/(dashboard)/sync-actions'
import { useRouter } from 'next/navigation'
import { Database, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react'

export function SyncWebsiteDataButton() {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const router = useRouter()

  function handleSync() {
    if (!confirm('Populate the database with all 7 authentic website cars (Sedan, Ertiga, Crysta, Urbania, Tempo), per-km fuel prices, full SEO, 5 routes, 6 services, and FAQs?')) {
      return
    }

    setResult(null)
    startTransition(async () => {
      const res = await syncWebsiteDataAction()
      setResult(res)
      if (res.success) {
        router.refresh()
      }
    })
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={handleSync}
        disabled={isPending}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition disabled:opacity-50"
      >
        {isPending ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Populating Database...</span>
          </>
        ) : (
          <>
            <Database className="w-4 h-4" />
            <span>Populate Website Fleet & Data</span>
          </>
        )}
      </button>

      {result && (
        <div className={`text-xs p-2.5 rounded-lg border flex items-center gap-2 ${
          result.success 
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
            : 'bg-red-50 text-red-800 border-red-200'
        }`}>
          {result.success ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{result.message}</span>
        </div>
      )}
    </div>
  )
}
