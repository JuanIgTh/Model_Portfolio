import Image from 'next/image'

export default function HeroBanner() {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center">
      <div className="relative w-full h-full ">
        <Image
          src="" // reemplazalo por tu PNG real
          alt="Hero Banner"
          fill
          className="object-contain md:object-cover"
          priority
        />
        {/* Overlay de texto opcional */}
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
