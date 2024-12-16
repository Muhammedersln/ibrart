import Link from 'next/link'
import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-cream-light/30 via-cream to-cream-light/50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Üst Kısım */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo ve Açıklama */}
          <div className="space-y-4 lg:col-span-2">
            <h3 className="text-2xl font-playfair font-bold text-brown-dark">İbrahim Art</h3>
            <p className="text-brown-medium/80 leading-relaxed">
              Sanat ve tasarım tutkusuyla oluşturduğum eserlerimi keşfedin. 
              Her bir çalışma, duyguları ve hikayeleri görsel bir şölene dönüştürüyor.
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h4 className="text-lg font-playfair font-semibold mb-4 text-brown-dark">Keşfet</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-brown-medium/80 hover:text-brown-dark transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-brown-medium/80 hover:text-brown-dark transition-colors">
                  Galeri
                </Link>
              </li>
              <li>
                <Link href="#portfolio" className="text-brown-medium/80 hover:text-brown-dark transition-colors">
                  Portföy
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="text-lg font-playfair font-semibold mb-4 text-brown-dark">İletişim</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:contact@ibrahimart.com" 
                  className="text-brown-medium/80 hover:text-brown-dark transition-colors"
                >
                  contact@ibrahimart.com
                </a>
              </li>
              <li>
                <div className="flex items-center space-x-4">
                  <a 
                    href="https://instagram.com/username" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brown-medium/80 hover:text-brown-dark transition-colors"
                  >
                    <FaInstagram size={20} />
                  </a>
                  <a 
                    href="https://github.com/username" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brown-medium/80 hover:text-brown-dark transition-colors"
                  >
                    <FaGithub size={20} />
                  </a>
                  <a 
                    href="https://linkedin.com/in/username" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brown-medium/80 hover:text-brown-dark transition-colors"
                  >
                    <FaLinkedinIn size={20} />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="border-t border-brown-light/20 mt-12 pt-8 text-center">
          <p className="text-brown-medium/70 text-sm">
            &copy; {new Date().getFullYear()} İbrahim Art. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 