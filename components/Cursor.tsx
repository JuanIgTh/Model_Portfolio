'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const cursor = cursorRef.current
      if (cursor) {
        cursor.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`
      }
    }

    document.addEventListener('mousemove', moveCursor)
    return () => document.removeEventListener('mousemove', moveCursor)
  }, [])

  return (
    <div  
      ref={cursorRef}
      className="pointer-events-none fixed z-[9999] top-0 left-0 w-10 h-10 rounded-full mix-blend-difference bg-white opacity-80 transition-transform duration-150 ease-out hidden md:block"
    />
  )
}
