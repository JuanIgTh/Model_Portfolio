import './globals.css'
import type { Metadata } from 'next'
import Cursor  from '@/components/Cursor'
import Navbar from '@/components/NavBar'

export const metadata: Metadata = {
  title: 'Portfolio Modelo',
  description: 'Portfolio personal con galería dinámica',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      
      <body className="bg-background text-foreground font-classy">
        <Cursor />
        <Navbar />
        {children}
      </body>
      
    </html>
  )
}
