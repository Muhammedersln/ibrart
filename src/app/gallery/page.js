'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolioItems, categories } from '@/data/portfolioData'

export default function GalleryPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('TÜMÜ')
  const [selectedArtwork, setSelectedArtwork] = useState(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredArtworks = selectedCategory === 'TÜMÜ'
    ? portfolioItems
    : portfolioItems.filter(artwork => artwork.category === selectedCategory)

  return (
    <main className="min-h-screen bg-cream-light">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden bg-gradient-to-b from-cream-light via-white to-cream">
        {/* Animated Background Elements */}
        <motion.div 
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-secondary/5 to-primary/5 blur-3xl"
        />
        
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1.2, 1, 1.2]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-primary/5 to-secondary/5 blur-3xl"
        />
        
        <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center">
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <h1 className="text-8xl md:text-9xl font-serif mb-8">
              <span className="relative inline-block">
                <span className="absolute -inset-2 blur-2xl bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full"></span>
                <span className="relative bg-gradient-to-r from-secondary via-secondary-dark to-primary bg-clip-text text-transparent">
                  Sanat Galerisi
                </span>
              </span>
            </h1>
          </motion.div>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-secondary-dark/90 max-w-2xl text-xl md:text-2xl leading-relaxed font-light"
          >
            Sanatın büyülü dünyasında bir yolculuğa çıkın. Her eser, benzersiz bir hikaye anlatıyor.
          </motion.p>

          {/* Animated Decorative Elements */}
          <motion.div className="mt-16 flex items-center justify-center gap-8">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="h-[3px] w-32 bg-gradient-to-r from-secondary to-transparent rounded-full"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ 
                delay: 1,
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="h-4 w-4 rounded-full bg-primary"
            />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="h-[3px] w-32 bg-gradient-to-l from-primary to-transparent rounded-full"
            />
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-24">
        {/* Kategori Filtreleri */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center gap-6 mb-20"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedCategory(category)}
              className={`relative px-10 py-4 rounded-xl overflow-hidden transition-all duration-500
                ${selectedCategory === category 
                  ? 'text-white shadow-xl shadow-secondary/20' 
                  : 'text-secondary-dark hover:text-white'}`}
            >
              <span className="relative z-10">{category}</span>
              <div className={`absolute inset-0 transition-all duration-500
                ${selectedCategory === category 
                  ? 'opacity-100 bg-gradient-to-br from-secondary via-secondary-dark to-primary'
                  : 'opacity-0 hover:opacity-100 bg-gradient-to-br from-primary via-secondary to-secondary-dark'
                }`}
              />
            </motion.button>
          ))}
        </motion.div>

        {/* Eser Galerisi */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredArtworks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500"
                onClick={() => setSelectedArtwork(artwork)}
              >
                <Image
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white text-2xl font-serif mb-3">{artwork.title}</h3>
                    <p className="text-cream-light text-sm">{artwork.category}</p>
                    <p className="text-cream-light/80 text-sm mt-2">{artwork.technique}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedArtwork && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-secondary-dark/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedArtwork(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-cream rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                <div className="p-10">
                  <div className="flex justify-between items-start mb-8">
                    <h2 className="font-serif text-5xl text-secondary-dark">
                      {selectedArtwork.title}
                    </h2>
                    <button
                      onClick={() => setSelectedArtwork(null)}
                      className="text-secondary-dark/60 hover:text-primary transition-colors p-2"
                    >
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="relative aspect-[16/9] w-full mb-10 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={selectedArtwork.imageUrl}
                      alt={selectedArtwork.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                      <h3 className="text-2xl font-serif text-secondary-dark mb-6">
                        Detaylar
                      </h3>
                      <dl className="space-y-4">
                        <div className="flex flex-col">
                          <dt className="text-secondary-dark/60 mb-1">Boyutlar</dt>
                          <dd className="text-secondary-dark text-lg">{selectedArtwork.dimensions}</dd>
                        </div>
                        <div className="flex flex-col">
                          <dt className="text-secondary-dark/60 mb-1">Teknik</dt>
                          <dd className="text-secondary-dark text-lg">{selectedArtwork.technique}</dd>
                        </div>
                        <div className="flex flex-col">
                          <dt className="text-secondary-dark/60 mb-1">Kategori</dt>
                          <dd className="text-secondary-dark text-lg">{selectedArtwork.category}</dd>
                        </div>
                      </dl>
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif text-secondary-dark mb-6">
                        Açıklama
                      </h3>
                      <p className="text-secondary-dark/80 text-lg leading-relaxed">
                        {selectedArtwork.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}