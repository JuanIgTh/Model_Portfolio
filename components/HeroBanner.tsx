'use client';
import Image from 'next/image'
import { useState } from 'react'

export default function HeroBanner() {
  const [loaded, setLoaded] = useState(false)

  return (
    <section className={`relative w-full h-[80vh] flex items-center justify-center transition-opacity duration-2000 ease-in-out   ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`relative w-full h-full bg-black `}>
        <Image
          src="https://res.cloudinary.com/dmnwgau7y/image/upload/v1755013448/model-uploads/album-grunge-duo/a.png"
          alt="Hero Banner"
          fill
          className="md:object-cover"
          onLoad={() => setLoaded(true)}
          priority
        />

        {/* Overlay de texto */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 bg-gradient-to-b from-black via-transparent to-transparent">
          <h1 className="text-white text-3xl md:text-5xl font-light tracking-widest text-center">
            Test IT
          </h1>
          <p className="text-white text-sm md:text-base uppercase tracking-[0.2em] mt-2">
            Model • Port
          </p>
        </div>
      </div>
    </section>
  )
}
