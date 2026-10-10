'use client'

import { useState } from 'react'
import { uploadMediaAction, deleteMediaAction } from './actions'
import { useRouter } from 'next/navigation'

export function MediaUploadForm() {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsUploading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const result = await uploadMediaAction(formData)

    if (result.error) {
      setError(result.error)
    } else {
      ;(e.target as HTMLFormElement).reset()
      router.refresh()
    }
    
    setIsUploading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-lg font-bold mb-4">Upload New Media (Cloudinary)</h2>
      
      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded text-sm">{error}</div>}
      
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Image File</label>
          <input 
            type="file" 
            name="file" 
            accept="image/jpeg, image/png, image/webp, image/gif" 
            required
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
          <input 
            type="text" 
            name="altText" 
            placeholder="Describe the image" 
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <button 
            type="submit" 
            disabled={isUploading}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 text-sm font-medium disabled:opacity-50"
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>
    </form>
  )
}

export function DeleteMediaButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this media?')) return
    setIsDeleting(true)
    const res = await deleteMediaAction(id)
    if (res.error) {
      alert(res.error)
    } else {
      router.refresh()
    }
    setIsDeleting(false)
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-600 hover:text-red-900 text-sm font-medium disabled:opacity-50"
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  )
}
