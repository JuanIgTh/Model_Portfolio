import Gallery from '@/components/Gallery'
import HeroBanner from '@/components/HeroBanner'
import About from '@/components/About'
import Footer from '@/components/Footer'
import { getImages, getFoldersWithImages } from '@/lib/Cloudinary'

export default async function Home() {
  const images = await getImages()
  const folders = await getFoldersWithImages()

  return (
    <>
      <HeroBanner />

      <div className="flex items-center my-10 mx-20">
        <div className="flex-grow border-t border-white/15"></div>
        <div className="px-3">
          <div className="w-3 h-3 border-t border-white/15 rounded-full"></div>
        </div>
        <div className="flex-grow border-t border-white/15"></div>
      </div>

      <main className="min-h-screen pb-6 bg-background text-foreground">
        {/* <Gallery images={images} /> */}
        <About />
        
        <Gallery images={folders} />
        
        <Footer />
      </main>
    </>
  )
}
