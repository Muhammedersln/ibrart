'use client'

import { useState, useEffect } from 'react'
import Card from './Card'
import { motion, AnimatePresence } from 'framer-motion'

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('TÜMÜ')
  const [visibleItems, setVisibleItems] = useState(8)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('portfolio-section')
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  const categories = ['TÜMÜ', 'DOĞA', 'PORTRE', 'NATÜRMORT', 'SOKAK']

  // Örnek portfolyo öğeleri - Gerçek projede API'den gelecek
  const portfolioItems = [
    { 
      id: 1, 
      title: 'Doğanın Ritmi', 
      category: 'DOĞA', 
      imageUrl: '/portfolio/nature1.jpg',
      description: 'Doğanın muhteşem renklerini ve dokularını yansıtan bir eser.',
      dimensions: '60x80 cm',
      technique: 'Yağlı Boya'
    },
    { 
      id: 2, 
      title: 'Şehrin Ruhu', 
      category: 'SOKAK', 
      imageUrl: '/portfolio/street1.jpg', 
      description: 'Modern şehir yaşamının dinamik yapısını yansıtan bir çalışma.',
      dimensions: '50x70 cm',
      technique: 'Akrilik'
    },
    { 
      id: 3, 
      title: 'Sonbahar Portresi', 
      category: 'PORTRE', 
      imageUrl: '/portfolio/portrait1.jpg',
      description: 'Sonbaharın sıcak tonlarıyla harmanlanmış duygusal bir portre.',
      dimensions: '40x60 cm', 
      technique: 'Karışık Teknik'
    },
    { 
      id: 4, 
      title: 'Natürmort Kompozisyon', 
      category: 'NATÜRMORT', 
      imageUrl: '/portfolio/still1.jpg',
      description: 'Klasik natürmort anlayışına modern bir yorum.',
      dimensions: '45x65 cm',
      technique: 'Yağlı Boya'
    },
    // ... diğer öğeler
  ]

  const filteredItems = portfolioItems.filter(
    item => selectedCategory === 'TÜMÜ' || item.category === selectedCategory
  ).slice(0, visibleItems)

  const handleLoadMore = () => {
    setVisibleItems(prev => prev + 4)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <section id="portfolio-section" className="relative min-h-screen bg-gradient-to-r from-cream-50 to-green-50">
      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl font-serif mb-6">
            <span className="bg-gradient-to-r from-green-700 to-gold-600 bg-clip-text text-transparent">
              PORTFÖY
            </span>
          </h2>
          <p className="text-green-800/90 max-w-3xl mx-auto mb-8 text-lg">
            Sanatın farklı dallarında ürettiğim eserleri keşfedin. Her bir eser, duyguları ve hikayeleri 
            tuval üzerinde hayata geçiriyor.
          </p>
          <div className="flex items-center justify-center gap-6">
            <div className="h-[2px] w-24 bg-gradient-to-r from-green-600 to-green-700"></div>
            <div className="h-3 w-3 rounded-full bg-gold-500"></div>
            <div className="h-[2px] w-24 bg-gradient-to-r from-gold-500 to-gold-600"></div>
          </div>
        </motion.div>
        
        {/* Category Filters */}
        <div className="flex justify-center flex-wrap gap-5 md:gap-8 mb-20">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => {
                setSelectedCategory(category)
                setVisibleItems(8)
              }}
              className={`text-sm tracking-wider transition-all duration-500 px-8 py-4 rounded-2xl backdrop-blur-sm
                ${selectedCategory === category 
                  ? 'bg-gradient-to-r from-green-700 to-gold-600 text-white shadow-xl transform -translate-y-1'
                  : 'bg-white/80 text-green-800 hover:text-gold-600 shadow-lg hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Gallery Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
          >
            {filteredItems.map((item, index) => (
              <Card
                key={item.id}
                {...item}
                delay={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Show More Button */}
        {filteredItems.length < portfolioItems.length && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <button 
              onClick={handleLoadMore}
              className="group relative px-10 py-5 bg-white/90 backdrop-blur-sm text-green-800 overflow-hidden rounded-2xl
                transition-all duration-500 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              <span className="relative z-10 text-sm tracking-wider uppercase font-medium group-hover:text-white">
                Daha Fazla Göster
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-gold-600 
                transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              </div>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
} 