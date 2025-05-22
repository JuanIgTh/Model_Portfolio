'use client'

import { useState } from 'react'
import UploadForm from '@/components/UploadForm'
import Gallery from '@/components/Gallery'

export default function UploadPage() {
  const [images, setImages] = useState<string[]>([])

  const handleUpload = (url: string) => {
    setImages(prev => [url, ...prev])
  }

  return (
    <main className="min-h-screen px-6 py-12 bg-background text-foreground">
      <h1 className="text-4xl font-classy mb-6 text-center">Sube tus Fotos</h1>
      <UploadForm onUpload={handleUpload} />
      <Gallery images={images} />
    </main>
  )
}
