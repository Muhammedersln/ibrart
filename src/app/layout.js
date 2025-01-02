import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import SocialMediaBar from '@/components/SocialMediaBar'
import { Toaster } from 'react-hot-toast'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata = {
  title: 'İbrahim Artworks',
  description: 'İbrahim Artworks - Profesyonel Portre Çizim',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable}`}>
      <body className={`${inter.className} bg-cream-light min-h-screen`}>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#FEFDFB',
              color: '#1a1a1a',
              border: '1px solid #EAE6DD',
            },
            success: {
              iconTheme: {
                primary: '#006039',
                secondary: '#FFFFFF',
              },
            },
            error: {
              style: {
                border: '1px solid #fee2e2',
                background: '#fef2f2',
              },
              iconTheme: {
                primary: '#dc2626',
                secondary: '#FFFFFF',
              },
            },
          }}
        />
        <Navbar />
        <SocialMediaBar />
        <main className="min-h-screen pt-5 bg-gradient-to-br from-cream-light via-white to-cream">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
