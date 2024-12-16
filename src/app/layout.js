import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata = {
  title: 'İbrahim Art - Sanat Portföyü',
  description: 'Profesyonel sanatçı portföyü ve sanat galerisi',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-cream-light">
        <Navbar />
        <main className="min-h-screen pt-5 bg-gradient-to-br from-cream-light via-white to-cream">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
