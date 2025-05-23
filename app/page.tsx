import Gallery from '@/components/Gallery'
import HeroBanner from '@/components/HeroBanner'
import About from '@/components/About'

import { headers } from 'next/headers'

async function getBaseUrl() {
  const headersList = await headers() // ✅ await aquí
  const host = headersList.get('host')
  const protocol = host?.includes('localhost') ? 'http' : 'https'
  return `${protocol}://${host}`
}

export async function getImages(): Promise<string[]> {
  const baseUrl = await getBaseUrl()
  const res = await fetch(`${baseUrl}/api/cloudinary`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    console.error('❌ Error al obtener imágenes:', res.status)
    return []
  }

  const data = await res.json()
  return data.urls
}

export default async function Home() {
  const images = await getImages()

  return (
    <>
      <HeroBanner />
      <main className="min-h-screen p-6 bg-background text-foreground">
        <h1 className="text-4xl font-classy text-center mb-8">Port</h1>
        <Gallery images={images} />
        <About/>
      </main>
    </>
    
  )
}
