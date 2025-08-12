'use client'

import { useCallback } from 'react'

// Hook personalizado para smooth scrolling más rápido
export const useSmoothScroll = () => {
  const scrollTo = useCallback((targetId: string, offset: number = 0) => {
    const element = document.getElementById(targetId)
    if (!element) return

    const targetPosition = element.offsetTop - offset
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    const duration = 800 // Duración más rápida (0.8 segundos)
    let start: number | null = null

    // Función de easing más suave y rápida
    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    }

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime
      const timeElapsed = currentTime - start
      const progress = Math.min(timeElapsed / duration, 1)
      const ease = easeInOutCubic(progress)

      window.scrollTo(0, startPosition + distance * ease)

      if (timeElapsed < duration) {
        requestAnimationFrame(animation)
      }
    }

    requestAnimationFrame(animation)
  }, [])

  const scrollToTop = useCallback(() => {
    const startPosition = window.pageYOffset
    const duration = 600 // Más rápido para ir al top
    let start: number | null = null

    const easeOutQuart = (t: number): number => {
      return 1 - Math.pow(1 - t, 4)
    }

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime
      const timeElapsed = currentTime - start
      const progress = Math.min(timeElapsed / duration, 1)
      const ease = easeOutQuart(progress)

      window.scrollTo(0, startPosition * (1 - ease))

      if (timeElapsed < duration) {
        requestAnimationFrame(animation)
      }
    }

    requestAnimationFrame(animation)
  }, [])

  return { scrollTo, scrollToTop }
}
