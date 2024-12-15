'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Image from 'next/image'

// Örnek veri - gerçek projede bir API'den veya CMS'den gelecek
const artworks = [
  {
    id: 1,
    title: 'Bahar Esintisi',
    image: '/artwork1.jpg',
    dimensions: '100x80 cm',
    materials: 'Yağlı Boya',
    year: '2023',
    category: 'DOĞA',
    description:
      'Bahar mevsiminin tüm canlılığını ve enerjisini yansıtan bu eser, doğanın uyanışını kutluyor.',
  },
  {
    id: 2,
    title: 'Şehir Işıkları',
    image: '/artwork2.jpg',
    dimensions: '120x100 cm',
    materials: 'Akrilik',
    year: '2023',
    category: 'SOKAK',
    description:
      'Modern şehir yaşamının gece manzarasını yansıtan bu eser, ışıkların dans eden yansımalarını konu alıyor.',
  },
  // Daha fazla eser eklenebilir
]

const categories = ['TÜMÜ', 'DOĞA', 'PORTRE', 'NATÜRMORT', 'SOKAK']

export default function GalleryPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('TÜMÜ')
  const [selectedArtwork, setSelectedArtwork] = useState(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredArtworks = selectedCategory === 'TÜMÜ'
    ? artworks
    : artworks.filter(artwork => artwork.category === selectedCategory)

  return (
    <main className="bg-green-900 min-h-screen">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <h1 
            className={`text-4xl md:text-5xl text-gold-500 text-center mb-16 font-serif transition-all duration-1000
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            GALERİ
          </h1>

          {/* Kategori Filtreleri */}
          <div 
            className={`flex flex-wrap justify-center gap-4 mb-16 transition-all duration-1000 delay-300
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-sm tracking-widest transition-colors duration-300
                  ${selectedCategory === category 
                    ? 'text-gold-500' 
                    : 'text-cream-100 hover:text-gold-500'}`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Eser Galerisi */}
          <div 
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-1000 delay-500
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Şimdilik örnek kutular */}
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="aspect-square bg-green-800 relative overflow-hidden group cursor-pointer"
                onClick={() => setSelectedArtwork(artworks[0])} // Örnek olarak ilk eseri gösteriyoruz
              >
                {/* Resim eklendiğinde kullanılacak */}
                {/* <Image
                  src={`/artwork${index + 1}.jpg`}
                  alt={`Eser ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                /> */}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-green-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-gold-500 text-lg mb-2">Eser Başlığı</h3>
                      <p className="text-cream-100 text-sm">Kategori</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal */}
          {selectedArtwork && (
            <div 
              className="fixed inset-0 bg-green-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedArtwork(null)}
            >
              <div 
                className="bg-green-800 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-scale-up shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="font-serif text-3xl text-gold-500">
                      {selectedArtwork.title}
                    </h2>
                    <button
                      onClick={() => setSelectedArtwork(null)}
                      className="text-cream-100 hover:text-gold-500 transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="relative aspect-[4/3] w-full mb-8 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={selectedArtwork.image}
                      alt={selectedArtwork.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-medium text-gold-500 mb-4">
                        Detaylar
                      </h3>
                      <dl className="space-y-3">
                        <div>
                          <dt className="text-cream-200">Boyutlar</dt>
                          <dd className="text-cream-100">{selectedArtwork.dimensions}</dd>
                        </div>
                        <div>
                          <dt className="text-cream-200">Malzemeler</dt>
                          <dd className="text-cream-100">{selectedArtwork.materials}</dd>
                        </div>
                        <div>
                          <dt className="text-cream-200">Yıl</dt>
                          <dd className="text-cream-100">{selectedArtwork.year}</dd>
                        </div>
                      </dl>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gold-500 mb-4">
                        Açıklama
                      </h3>
                      <p className="text-cream-100 leading-relaxed">
                        {selectedArtwork.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
} 