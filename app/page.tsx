import Gallery from '@/components/Gallery'
import HeroBanner from '@/components/HeroBanner'
import About from '@/components/About'

async function getImages(): Promise<string[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const res = await fetch(`${baseUrl}/api/cloudinary`, {
    cache: 'no-store',
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch images: ${res.status}`)
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
