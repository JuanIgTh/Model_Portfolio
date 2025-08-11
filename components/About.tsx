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
      className="rounded-xl min-h-screen flex items-center justify-center px-6 py-24 bg-black text-white overflow-hidden"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Imagen con parallax */}
        <motion.div
          style={{ y: yImg }}
          className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl"
        >
          <Image
            src=""
            alt="Foto de perfil"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Texto con parallax más leve */}
        <motion.div style={{ y: yText }} className="space-y-6">
          <h2 className="text-3xl md:text-5xl font-light tracking-wide">Sobre mí</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Soy un/a modelo apasionado/a por la estética, la expresión corporal y la fotografía
            conceptual. Este portfolio es una curaduría de mi trabajo más personal, explorando la
            luz, la sombra y la identidad visual.
          </p>
          <p className="text-gray-400 text-base">
            Disponible para colaboraciones, sesiones editoriales y proyectos creativos.
            Contáctame si quieres trabajar conmigo.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
