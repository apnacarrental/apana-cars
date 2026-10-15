'use client'

import React, { useState, useTransition } from 'react'
import { RefreshCw, Check } from 'lucide-react'
import { syncDefaultServicesAction } from '@/app/admin/(dashboard)/services/actions'
import { useRouter } from 'next/navigation'

export function SyncServicesButton() {
  const [isPending, startTransition] = useTransition()
  const [synced, setSynced] = useState(false)
  const router = useRouter()

  const handleSync = () => {
    startTransition(async () => {
      try {
        await syncDefaultServicesAction()
        setSynced(true)
        router.refresh()
        setTimeout(() => setSynced(false), 3000)
      } catch (err) {
        console.error('Failed to sync services:', err)
      }
    })
  }

  return (
    <button
      onClick={handleSync}
      disabled={isPending}
      type="button"
      className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 px-3.5 py-2.5 rounded-lg text-sm font-semibold select-none shadow-xs transition-colors cursor-pointer disabled:opacity-50"
      title="Populate and sync all default website services into the admin database"
    >
      {synced ? (
        <>
          <Check size={16} className="text-emerald-600" />
          <span>Services Synced!</span>
        </>
      ) : (
        <>
          <RefreshCw size={15} className={`text-emerald-700 ${isPending ? 'animate-spin' : ''}`} />
          <span>{isPending ? 'Syncing...' : 'Sync Website Services'}</span>
        </>
      )}
    </button>
  )
}
