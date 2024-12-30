'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '../../components/Card'

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('TÜMÜ')
  const [selectedSize, setSelectedSize] = useState('TÜMÜ')
  const [selectedPersonCount, setSelectedPersonCount] = useState('TÜMÜ')
  const [artworks, setArtworks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  const categories = ['TÜMÜ', 'Aile', 'Çift', 'Tek Portre', 'Karışık', 'Birleştirme Çizim', 'Duvar Resmi']
  const sizes = ['TÜMÜ', '25x35', '35x50', '50x70']
  const personCounts = ['TÜMÜ', 'Tekli', 'İkili', 'Üçlü', 'Dörtlü', 'Beşli', 'Altılı']

  useEffect(() => {
    fetchArtworks()
  }, [])

  const fetchArtworks = async () => {
    try {
      const response = await fetch('/api/artworks')
      const data = await response.json()
      setArtworks(data)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching artworks:', error)
      setIsLoading(false)
    }
  }

  const filteredItems = artworks
    .filter(item => selectedCategory === 'TÜMÜ' || item.category === selectedCategory)
    .filter(item => selectedSize === 'TÜMÜ' || item.size === selectedSize)
    .filter(item => selectedPersonCount === 'TÜMÜ' || item.personCount === selectedPersonCount)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (artworks.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">Henüz eser eklenmemiş.</div>
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-64 sm:w-96 h-64 sm:h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-20 sm:-left-40 w-56 sm:w-80 h-56 sm:h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative">
        <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif mb-6 relative">
              <span className="absolute -inset-1 blur-2xl bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full"></span>
              <span className="relative bg-gradient-to-r from-secondary via-secondary-dark to-primary bg-clip-text text-transparent">
                GALERİ
              </span>
            </h1>
            <p className="text-lg text-secondary-dark/80 max-w-2xl mx-auto mb-12">
              Özel anlarınızı ve sevdiklerinizi sanatla ölümsüzleştirin. Her portre, benzersiz bir hikaye anlatır.
            </p>

            {/* Sipariş Bölümü - Unchanged */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-cream-dark/10 mb-16"
            >
              {/* Existing order section content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left side content */}
                <div className="space-y-6 text-left">
                  <h2 className="text-3xl font-serif text-secondary-dark">Sipariş Vermek İster Misiniz?</h2>
                  <p className="text-secondary-dark/80">
                    Size özel portre çalışması için aşağıdaki adımları takip edebilirsiniz:
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">1</span>
                      <div>
                        <h3 className="font-medium text-secondary-dark">Fotoğraf Seçimi</h3>
                        <p className="text-sm text-secondary-dark/70">Çizmemi istediğiniz net ve kaliteli bir fotoğraf seçin</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">2</span>
                      <div>
                        <h3 className="font-medium text-secondary-dark">Boyut ve Teknik</h3>
                        <p className="text-sm text-secondary-dark/70">İstediğiniz boyutu ve tekniği belirleyin</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">3</span>
                      <div>
                        <h3 className="font-medium text-secondary-dark">WhatsApp İletişim</h3>
                        <p className="text-sm text-secondary-dark/70">Detayları konuşmak için WhatsApp&apos;tan mesaj gönderin</p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Right side content */}
                <div className="space-y-6">
                  <div className="bg-cream/30 rounded-2xl p-6 space-y-4">
                    <h3 className="text-xl font-serif text-secondary-dark">Neden Portre?</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-sm text-secondary-dark/80">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Benzersiz ve kişiye özel sanat eseri
                      </li>
                      <li className="flex items-center gap-2 text-sm text-secondary-dark/80">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Özel anılarınızı ölümsüzleştirin
                      </li>
                      <li className="flex items-center gap-2 text-sm text-secondary-dark/80">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Mükemmel bir hediye seçeneği
                      </li>
                    </ul>
                    <a
                      href="https://wa.me/905555555555"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 
                        bg-[#25D366] hover:bg-[#22c55e] text-white rounded-xl transition-all duration-300 
                        transform hover:scale-105 font-medium"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp ile Sipariş Ver
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Modern Filter Bar */}
          <div className="sticky top-4 z-10 mb-8">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-4 max-w-7xl mx-auto"
            >
              <div className="flex flex-wrap gap-4 items-center justify-between">
                {/* Filter Groups */}
                <div className="flex flex-wrap gap-4 items-center flex-1">
                  {/* Category Dropdown */}
                  <div className="relative group">
                    <button className="px-4 py-2 rounded-xl bg-cream hover:bg-cream-dark transition-colors text-secondary-dark flex items-center gap-2">
                      <span>Kategori: {selectedCategory}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {categories.map((category, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedCategory(category)}
                          className={`w-full text-left px-4 py-2 hover:bg-cream first:rounded-t-xl last:rounded-b-xl transition-colors
                            ${selectedCategory === category ? 'bg-primary/10 text-primary' : 'text-secondary-dark'}`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size Dropdown */}
                  <div className="relative group">
                    <button className="px-4 py-2 rounded-xl bg-cream hover:bg-cream-dark transition-colors text-secondary-dark flex items-center gap-2">
                      <span>Boyut: {selectedSize}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {sizes.map((size, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedSize(size)}
                          className={`w-full text-left px-4 py-2 hover:bg-cream first:rounded-t-xl last:rounded-b-xl transition-colors
                            ${selectedSize === size ? 'bg-primary/10 text-primary' : 'text-secondary-dark'}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Person Count Dropdown */}
                  <div className="relative group">
                    <button className="px-4 py-2 rounded-xl bg-cream hover:bg-cream-dark transition-colors text-secondary-dark flex items-center gap-2">
                      <span>Kişi Sayısı: {selectedPersonCount}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {personCounts.map((count, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedPersonCount(count)}
                          className={`w-full text-left px-4 py-2 hover:bg-cream first:rounded-t-xl last:rounded-b-xl transition-colors
                            ${selectedPersonCount === count ? 'bg-primary/10 text-primary' : 'text-secondary-dark'}`}
                        >
                          {count}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Results Count & Clear Filters */}
                <div className="flex items-center gap-4">
                  <span className="text-sm text-secondary-dark/80">
                    <span className="font-medium text-secondary-dark">{filteredItems.length}</span> eser
                  </span>
                  {(selectedCategory !== 'TÜMÜ' || selectedSize !== 'TÜMÜ' || selectedPersonCount !== 'TÜMÜ') && (
                    <button
                      onClick={() => {
                        setSelectedCategory('TÜMÜ')
                        setSelectedSize('TÜMÜ')
                        setSelectedPersonCount('TÜMÜ')
                      }}
                      className="text-sm text-primary hover:text-primary-dark flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Filtreleri Temizle
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Gallery Grid */}
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <AnimatePresence>
                {filteredItems.map((artwork, index) => (
                  <Card
                    key={artwork._id}
                    _id={artwork._id}
                    title={artwork.title}
                    category={artwork.category}
                    imageUrl={artwork.imageUrl}
                    description={artwork.description}
                    size={artwork.size}
                    teknik={artwork.teknik}
                    personCount={artwork.personCount}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}