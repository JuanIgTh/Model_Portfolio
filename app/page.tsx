import Gallery from '@/components/Gallery'
import HeroBanner from '@/components/HeroBanner'
import About from '@/components/About'
import { getImages, getFoldersWithImages } from '@/lib/Cloudinary'

export default async function Home() {
  const images = await getImages()
  const folders = await getFoldersWithImages()

  return (
    <>
      <HeroBanner />

      <div className="flex items-center my-4 mx-10">
        <div className="flex-grow border-t border-white/15"></div>
        <div className="px-3">
          <div className="w-3 h-3 border-t border-white/15 rounded-full"></div>
        </div>
        <div className="flex-grow border-t border-white/15"></div>
      </div>

      <main className="min-h-screen p-6 bg-background text-foreground">
        <h1 className="text-4xl font-classy text-center mb-8 opacity-90">Álbumes</h1>
        {/* <Gallery images={images} /> */}
        <Gallery images={folders} />
        <About />
      </main>
    </>
  )
}
