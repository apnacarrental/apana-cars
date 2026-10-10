'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Admin Error Caught:', error)
  }, [error])

  // Determine user-friendly message
  let message = 'An unexpected error occurred.'
  
  if (error.message.includes('Foreign key constraint')) {
    message = 'This record cannot be deleted because it is currently in use by another record (e.g. a Car or Route). Please remove or reassign those relations first.'
  } else if (error.message.includes('Unique constraint failed')) {
    message = 'A record with this name or slug already exists. Please choose a unique value.'
  } else if (error.message.includes('Unauthorized')) {
    message = 'You do not have permission to perform this action.'
  } else if (error.message.includes('Invalid credentials')) {
    message = 'Invalid login credentials.'
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center bg-white rounded-xl shadow-sm border border-red-100 m-8">
      <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
        <AlertCircle size={32} />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong!</h2>
      <p className="text-gray-600 max-w-md mb-8">
        {message}
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition-colors"
        >
          Try again
        </button>
        <Link 
          href="/admin"
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md font-medium hover:bg-gray-200 transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
