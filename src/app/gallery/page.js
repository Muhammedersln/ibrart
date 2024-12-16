'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolioItems, categories } from '@/data/portfolioData'
import Card from '@/components/Card'
import { useRouter } from 'next/navigation'

// Animasyon varyantları
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
}

export default function GalleryPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('TÜMÜ')
  const [selectedArtwork, setSelectedArtwork] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const filteredArtworks = selectedCategory === 'TÜMÜ'
    ? portfolioItems
    : portfolioItems.filter(artwork => artwork.category === selectedCategory)

  const handleArtworkClick = (artwork) => {
    router.push(`/gallery/${artwork.id}`)
  }

  return (
    <main className="min-h-screen bg-white">      
      {/* Hero Section - Scroll Reveal Efekti */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative py-20 bg-cream-light border-b border-secondary/10"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-6xl font-serif mb-6 text-secondary-dark">
                Karakalem Portreler
              </h1>
              
              <p className="text-secondary-dark/80 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
                Özel anlarınızı ve sevdiklerinizi sanatla ölümsüzleştirin. 
                Her portre, benzersiz bir hikaye anlatır.
              </p>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8"
              >
                <a 
                  href="#siparis"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-secondary-dark text-white rounded-xl 
                    hover:bg-secondary transition-colors group"
                >
                  <span>Sipariş Ver</span>
                  <motion.svg 
                    className="w-5 h-5"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </motion.svg>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Dekoratif Elementler */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 -left-20 w-60 h-60 rounded-full bg-secondary/5 blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1.1, 1, 1.1]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 -right-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl"
        />
      </motion.section>

      {/* Sipariş Bölümü */}
      <motion.section 
        id="siparis"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-serif text-secondary-dark mb-6"
            >
              Özel Portre Siparişi
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-secondary-dark/80 mb-8 leading-relaxed"
            >
              Sevdiklerinizin fotoğraflarını benzersiz karakalem portrelere dönüştürüyorum. 
              Sipariş vermek için WhatsApp üzerinden iletişime geçebilirsiniz.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-cream rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-serif text-secondary-dark mb-4">Sipariş Süreci</h3>
                <ul className="text-left space-y-3 text-secondary-dark/80">
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm">1</span>
                    <span>WhatsApp üzerinden fotoğrafınızı gönderin</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm">2</span>
                    <span>Portre boyutu ve detayları belirleyelim</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm">3</span>
                    <span>Ödeme sonrası çalışmaya başlayalım</span>
                  </li>
                </ul>
              </div>

              <a 
                href="https://wa.me/905XXXXXXXXX" // WhatsApp numaranızı ekleyin
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white rounded-xl hover:bg-[#22c55e] transition-colors shadow-lg"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp'tan Mesaj Gönder
              </a>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Galeri Bölümü */}
      <section className="py-20 bg-cream-light relative">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif text-secondary-dark text-center mb-12"
          >
            Örnek Çalışmalarım
          </motion.h2>

          {/* Kategori Filtreleri - Stagger Efekti */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full border transition-all duration-300
                  ${selectedCategory === category 
                    ? 'border-secondary-dark bg-secondary-dark text-white' 
                    : 'border-secondary-dark/20 text-secondary-dark hover:border-secondary-dark'
                  }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Galeri Grid - Layout Animasyonu */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredArtworks.map((artwork, index) => (
                <Card
                  key={artwork.id}
                  artwork={artwork}
                  onClick={() => handleArtworkClick(artwork)}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Dekoratif Arka Plan Elementleri */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-40 -right-20 w-96 h-96 rounded-full bg-secondary/5 blur-3xl"
          />
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1.2, 1, 1.2]
            }}
            transition={{ 
              duration: 35,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-40 -left-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl"
          />
        </div>
      </section>

      {/* Geliştirilmiş Modal */}
      <AnimatePresence>
        {selectedArtwork && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-secondary-dark/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => {
              setSelectedArtwork(null)
            }}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="font-serif text-4xl text-secondary-dark">
                    {selectedArtwork.title}
                  </h2>
                  <button
                    onClick={() => {
                      setSelectedArtwork(null)
                    }}
                    className="text-secondary-dark/60 hover:text-primary transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={selectedArtwork.imageUrl}
                      alt={selectedArtwork.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-serif text-secondary-dark mb-4">Detaylar</h3>
                      <dl className="space-y-3">
                        <div>
                          <dt className="text-secondary-dark/60">Boyutlar</dt>
                          <dd className="text-secondary-dark">{selectedArtwork.dimensions}</dd>
                        </div>
                        <div>
                          <dt className="text-secondary-dark/60">Teknik</dt>
                          <dd className="text-secondary-dark">{selectedArtwork.technique}</dd>
                        </div>
                        <div>
                          <dt className="text-secondary-dark/60">Kategori</dt>
                          <dd className="text-secondary-dark">{selectedArtwork.category}</dd>
                        </div>
                      </dl>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-serif text-secondary-dark mb-4">Açıklama</h3>
                      <p className="text-secondary-dark/80 leading-relaxed">
                        {selectedArtwork.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}