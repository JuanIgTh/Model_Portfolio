import './globals.css'
import type { Metadata } from 'next'
import Cursor  from '@/components/Cursor'
import Navbar from '@/components/NavBar'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // para mejor rendimiento
})

export const metadata: Metadata = {
  title: 'Model Portfolio ',
  description: 'Personal minimalistic Portfolio',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.className}>
      
    <body className={`${inter.className} bg-background text-foreground`}>
      <Cursor />
      <Navbar />
      {children}
    </body>

      
    </html>
  )
}
