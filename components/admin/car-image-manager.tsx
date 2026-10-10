'use client'

import { useState } from 'react'
import { attachMediaToCar, removeMediaFromCar } from '@/app/admin/(dashboard)/cars/actions'
import { useRouter } from 'next/navigation'

type MediaItem = {
  id: string
  secureUrl: string
  altText: string | null
}

export function CarImageManager({ 
  carId, 
  existingImages, 
  availableMedia 
}: { 
  carId: string
  existingImages: { id: string, media: MediaItem }[]
  availableMedia: MediaItem[]
}) {
  const [selectedMediaId, setSelectedMediaId] = useState('')
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  async function handleAttach(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedMediaId) return

    setIsPending(true)
    const res = await attachMediaToCar(carId, selectedMediaId)
    if (res.error) {
      alert(res.error)
    } else {
      setSelectedMediaId('')
      router.refresh()
    }
    setIsPending(false)
  }

  async function handleRemove(mediaId: string) {
    if (!confirm('Remove this image from the car?')) return
    setIsPending(true)
    const res = await removeMediaFromCar(carId, mediaId)
    if (res.error) {
      alert(res.error)
    } else {
      router.refresh()
    }
    setIsPending(false)
  }

  return (
    <div className="mt-8 bg-white p-8 rounded-xl shadow-sm border border-gray-200 max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Car Images</h2>
      
      {existingImages.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          {existingImages.map((img) => (
            <div key={img.id} className="relative group rounded-md border border-gray-200 overflow-hidden bg-gray-50 aspect-video flex items-center justify-center">
              <img src={img.media.secureUrl} alt={img.media.altText || 'Car image'} className="object-contain w-full h-full" />
              <button 
                onClick={() => handleRemove(img.media.id)}
                disabled={isPending}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity text-xs"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-6 text-sm text-gray-500">No images attached to this car.</div>
      )}

      <form onSubmit={handleAttach} className="flex gap-4 items-end border-t border-gray-100 pt-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Attach Existing Media</label>
          <select 
            value={selectedMediaId}
            onChange={(e) => setSelectedMediaId(e.target.value)}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">Select an image from library...</option>
            {availableMedia.map(m => (
              <option key={m.id} value={m.id}>
                {m.altText || m.secureUrl.split('/').pop()}
              </option>
            ))}
          </select>
        </div>
        <button 
          type="submit" 
          disabled={!selectedMediaId || isPending}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 text-sm font-medium disabled:opacity-50"
        >
          Attach Image
        </button>
      </form>
      <p className="text-xs text-gray-400 mt-2">To upload new images, visit the Media Library first.</p>
    </div>
  )
}
