import Gallery from '@/components/Gallery'
import HeroBanner from '@/components/HeroBanner'
import About from '@/components/About'

async function getImages(): Promise<string[]> {
  const res = await fetch(`/api/cloudinary`, {
    cache: 'no-store',
  })
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
