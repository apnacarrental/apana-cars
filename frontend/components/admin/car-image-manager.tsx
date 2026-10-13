'use client'

import { useState, useRef } from 'react'
import { attachMediaToCar, removeMediaFromCar, uploadAndAttachCarImage } from '@/app/admin/(dashboard)/cars/actions'
import { useRouter } from 'next/navigation'
import { UploadCloud, Image as ImageIcon, Trash2, Loader2, CheckCircle2 } from 'lucide-react'

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
  const [activeTab, setActiveTab] = useState<'upload' | 'library'>('upload')
  const [selectedMediaId, setSelectedMediaId] = useState('')
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [altText, setAltText] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null
    setUploadFile(file)
    if (file) {
      setPreviewUrl(URL.createObjectURL(file))
    } else {
      setPreviewUrl(null)
    }
  }

  async function handleDirectUpload(e: React.FormEvent) {
    e.preventDefault()
    if (!uploadFile) {
      setStatusMsg({ type: 'error', text: 'Please select an image file first.' })
      return
    }

    setIsUploading(true)
    setStatusMsg(null)

    const formData = new FormData()
    formData.append('file', uploadFile)
    if (altText) formData.append('altText', altText)

    const res = await uploadAndAttachCarImage(carId, formData)
    if (res.error) {
      setStatusMsg({ type: 'error', text: res.error })
    } else {
      setStatusMsg({ type: 'success', text: 'Image uploaded and attached successfully!' })
      setUploadFile(null)
      setPreviewUrl(null)
      setAltText('')
      if (fileInputRef.current) fileInputRef.current.value = ''
      router.refresh()
    }
    setIsUploading(false)
  }

  async function handleAttachExisting(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedMediaId) return

    setIsPending(true)
    setStatusMsg(null)
    const res = await attachMediaToCar(carId, selectedMediaId)
    if (res.error) {
      setStatusMsg({ type: 'error', text: res.error })
    } else {
      setStatusMsg({ type: 'success', text: 'Image attached from library!' })
      setSelectedMediaId('')
      router.refresh()
    }
    setIsPending(false)
  }

  async function handleRemove(mediaId: string) {
    if (!confirm('Remove this image from the car?')) return
    setIsPending(true)
    setStatusMsg(null)
    const res = await removeMediaFromCar(carId, mediaId)
    if (res.error) {
      setStatusMsg({ type: 'error', text: res.error })
    } else {
      router.refresh()
    }
    setIsPending(false)
  }

  return (
    <div className="mt-8 bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200 max-w-2xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Car Images</h2>
          <p className="text-xs text-gray-500 mt-0.5">Upload photos directly from your device or choose from the existing library.</p>
        </div>
        <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">
          {existingImages.length} {existingImages.length === 1 ? 'image' : 'images'}
        </span>
      </div>

      {statusMsg && (
        <div className={`p-3.5 mb-5 rounded-lg text-sm flex items-center gap-2 border ${
          statusMsg.type === 'success' 
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
            : 'bg-red-50 text-red-800 border-red-200'
        }`}>
          {statusMsg.type === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Existing Images Gallery */}
      {existingImages.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          {existingImages.map((img, idx) => (
            <div key={img.id} className="relative group rounded-lg border border-gray-200 overflow-hidden bg-gray-50 aspect-video flex items-center justify-center">
              <img 
                src={img.media.secureUrl} 
                alt={img.media.altText || `Car image ${idx + 1}`} 
                className="object-cover w-full h-full" 
              />
              {idx === 0 && (
                <span className="absolute bottom-2 left-2 bg-black/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded tracking-wide uppercase">
                  Primary
                </span>
              )}
              <button 
                type="button"
                onClick={() => handleRemove(img.media.id)}
                disabled={isPending}
                aria-label="Remove image"
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-6 p-6 border-2 border-dashed border-gray-200 rounded-lg text-center text-sm text-gray-400">
          No images attached to this car yet. Upload one below.
        </div>
      )}

      {/* Upload Modes Tabs */}
      <div className="border-t border-gray-200 pt-5">
        <div className="flex border-b border-gray-200 mb-4">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`pb-2.5 px-4 text-sm font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'upload' 
                ? 'border-black text-black' 
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            Upload from Computer (Direct)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('library')}
            className={`pb-2.5 px-4 text-sm font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'library' 
                ? 'border-black text-black' 
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Choose from Media Library
          </button>
        </div>

        {/* Tab 1: Direct File Upload */}
        {activeTab === 'upload' && (
          <form onSubmit={handleDirectUpload} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Select Image File (JPG, PNG, WEBP, max 5MB)
              </label>
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer border border-gray-200 rounded-md p-1"
              />
            </div>

            {previewUrl && (
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-4">
                <img src={previewUrl} alt="Preview" className="w-20 h-14 object-cover rounded border border-gray-200" />
                <div className="text-xs text-gray-600 truncate">
                  <p className="font-semibold text-gray-800 truncate">{uploadFile?.name}</p>
                  <p>{(uploadFile ? uploadFile.size / 1024 : 0).toFixed(1)} KB</p>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Alt Text / Caption (Optional, good for SEO)
              </label>
              <input 
                type="text" 
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="e.g. Innova Hycross front view Hyderabad rental"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-1 focus:ring-black focus:outline-none"
              />
            </div>

            <button 
              type="submit" 
              disabled={!uploadFile || isUploading}
              className="w-full bg-black text-white px-4 py-2.5 rounded-md hover:bg-gray-800 text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2 transition"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading & Attaching...
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4" />
                  Upload & Attach Image
                </>
              )}
            </button>
          </form>
        )}

        {/* Tab 2: Attach from Existing Media */}
        {activeTab === 'library' && (
          <form onSubmit={handleAttachExisting} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Select from Previously Uploaded Media
              </label>
              <select 
                value={selectedMediaId}
                onChange={(e) => setSelectedMediaId(e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-1 focus:ring-black focus:outline-none"
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
              className="w-full bg-black text-white px-4 py-2.5 rounded-md hover:bg-gray-800 text-sm font-semibold disabled:opacity-50 transition"
            >
              {isPending ? 'Attaching...' : 'Attach Image from Library'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
