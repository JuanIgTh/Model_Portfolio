'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-45 bg-black/50 backdrop-blur rounded-full shadow-lg px-8 py-3 flex items-center justify-between max-w-3xl w-[90vw]">
      <div className="text-white font-semibold text-lg tracking-wide select-none">
        <Link href="/">Portfolio</Link>
      </div>

      {/* Desktop menu */}
      <ul className="hidden md:flex space-x-8 text-white font-medium">
        <li><Link href="/" className="hover:text-gray-300 transition">Home</Link></li>
        <li><Link href="#albums" className="hover:text-gray-300 transition">Shoots</Link></li>
        <li><Link href="#about" className="hover:text-gray-300 transition">About me</Link></li>
        <li><Link href="#contact" className="hover:text-gray-300 transition">Contacto</Link></li>
      </ul>

      {/* Mobile hamburger */}
      <div className="md:hidden flex items-center">
        <motion.button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white focus:outline-none"
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: menuOpen ? 90 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <motion.svg
            key={menuOpen ? 'close' : 'open'}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </motion.svg>
        </motion.button>
      </div>

      {/* Mobile menu with animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-md rounded-xl shadow-lg py-4 w-48 flex flex-col space-y-3 text-white font-medium"
          >
            <li><Link href="/" className="block px-4 py-1 hover:bg-white/10 rounded" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link href="#albums" className="block px-4 py-1 hover:bg-white/10 rounded" onClick={() => setMenuOpen(false)}>Shoots</Link></li>
            <li><Link href="#about" className="block px-4 py-1 hover:bg-white/10 rounded" onClick={() => setMenuOpen(false)}>About me</Link></li>
            <li><Link href="#contact" className="block px-4 py-1 hover:bg-white/10 rounded" onClick={() => setMenuOpen(false)}>Contacto</Link></li>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  )
}
