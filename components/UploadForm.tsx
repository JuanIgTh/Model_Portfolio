'use client'


import { useState } from 'react'

type UploadFormProps = {
  onUpload: (url: string) => void
}

export default function UploadForm({ onUpload }: UploadFormProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'model-portfolio') // preset UNSIGNED
    formData.append('folder', 'model-uploads') // opcional: carpeta destino

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dmnwgau7y/image/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (data.secure_url) {
        setPreview(data.secure_url)
        console.log('✅ Imagen subida:', data.secure_url)
      } else {
        console.error('❌ Cloudinary error:', data)
        alert(`Error de Cloudinary: ${data.error?.message || 'sin mensaje'}`)

        setError('Error al subir la imagen.')
      }
    } catch (err) {
      console.error('❌ Upload error:', err)
      setError('Fallo de conexión con Cloudinary.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-background rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Subir nueva imagen</h2>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {loading && <p>Subiendo imagen...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {preview && (
        <img
          src={preview}
          alt="Previsualización"
          className="mt-4 rounded-lg shadow max-h-96 object-contain"
        />
      )}
    </div>
  )
}
