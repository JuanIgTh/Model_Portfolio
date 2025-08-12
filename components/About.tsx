'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'

export default function AboutSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const yImg = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]), { stiffness: 50 })
  const yText = useSpring(useTransform(scrollYProgress, [0, 1], [0, -50]), { stiffness: 40 })

  return (
    <section
      id="about"
      ref={ref}
      className="rounded-xl min-h-screen flex items-center justify-center px-6 py-24 bg-gradient-to-b from-transparent via-black to-transparent text-white overflow-hidden"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Imagen con parallax */}
        <motion.div
          style={{ y: yImg }}
          className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl"
        >
          <Image
            src="https://res.cloudinary.com/dmnwgau7y/image/upload/v1754978430/drilldown_njg1rw.jpg"
            alt="Foto de perfil"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Texto con parallax más leve */}
        <motion.div style={{ y: yText }} className="space-y-6">
          <h2 className="text-3xl md:text-5xl font-light tracking-wide">About me</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            I am a model deeply committed to aesthetics, body expression, and conceptual photography. This portfolio is a curated selection of my most personal work, exploring light, shadow, and visual identity.
          </p>
          <p className="text-gray-400 text-base">
            Available for collaborations, editorial shoots, and creative projects. Reach out if you’re interested in working together.
          </p>

        </motion.div>
      </div>
    </section>
  )
}
