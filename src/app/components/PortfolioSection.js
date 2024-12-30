'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/Card'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('TÜMÜ')
  const [artworks, setArtworks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const categories = ['TÜMÜ', 'Aile', 'Çift', 'Tek Portre', 'Karışık', 'Birleştirme Çizim', 'Duvar Resmi']

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

  useEffect(() => {
    fetchArtworks()
  }, [])

  const fetchArtworks = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/artworks')
      const data = await response.json()
      setArtworks(data)
    } catch (error) {
      console.error('Error fetching artworks:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredItems = artworks.filter(
    item => selectedCategory === 'TÜMÜ' || item.category === selectedCategory
  )

  // Swiper için breakpoint ayarları
  const swiperBreakpoints = {
    320: {  // mobil telefonlar için
      slidesPerView: 1.1,
      spaceBetween: 12,
      coverflowEffect: {
        rotate: 25,
        depth: 40,
        stretch: 0,
        modifier: 1,
      }
    },
    480: {  // büyük mobil için
      slidesPerView: 1.2,
      spaceBetween: 15,
      coverflowEffect: {
        rotate: 30,
        depth: 50,
        stretch: 0,
        modifier: 1,
      }
    },
    640: {  // tablet için
      slidesPerView: 1.5,
      spaceBetween: 20,
      coverflowEffect: {
        rotate: 35,
        depth: 80,
        stretch: 0,
        modifier: 1,
      }
    },
    768: {  // büyük tablet için
      slidesPerView: 2,
      spaceBetween: 25,
      coverflowEffect: {
        rotate: 35,
        depth: 100,
        stretch: 0,
        modifier: 1,
      }
    },
    1024: {  // laptop için
      slidesPerView: 2.5,
      spaceBetween: 30,
      coverflowEffect: {
        rotate: 40,
        depth: 120,
        stretch: 0,
        modifier: 1,
      }
    },
    1280: {  // desktop için
      slidesPerView: 3,
      spaceBetween: 35,
      coverflowEffect: {
        rotate: 45,
        depth: 140,
        stretch: 0,
        modifier: 1,
      }
    }
  }

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </section>
    )
  }

  if (artworks.length === 0) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-secondary-dark/80">Henüz eser eklenmemiş.</p>
      </section>
    )
  }

  return (
    <section id="portfolio-section" className="relative min-h-screen">
      <div className="container mx-auto px-3 sm:px-4 py-16 sm:py-24">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-24"
        >
          <h2 className="text-5xl sm:text-7xl font-serif mb-6 sm:mb-8 relative">
            <span className="absolute -inset-1 blur-2xl bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full"></span>
            <span className="relative bg-gradient-to-r from-secondary via-secondary-dark to-primary bg-clip-text text-transparent">
              PORTFÖY
            </span>
          </h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-secondary-dark/80 max-w-3xl mx-auto mb-8 sm:mb-10 text-base sm:text-lg leading-relaxed px-4"
          >
            Sanatın farklı dallarında ürettiğim eserleri keşfedin. Her bir eser, duyguları ve hikayeleri 
            tuval üzerinde hayata geçiriyor.
          </motion.p>
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="flex items-center justify-center gap-6 sm:gap-8"
          >
            <div className="h-[2px] sm:h-[3px] w-24 sm:w-32 bg-gradient-to-r from-secondary to-transparent rounded-full"></div>
            <div className="h-3 sm:h-4 w-3 sm:w-4 rounded-full bg-primary animate-pulse"></div>
            <div className="h-[2px] sm:h-[3px] w-24 sm:w-32 bg-gradient-to-l from-primary to-transparent rounded-full"></div>
          </motion.div>
        </motion.div>
        
        {/* Category Filters */}
        <div className="flex justify-center flex-wrap gap-3 sm:gap-6 md:gap-10 mb-12 sm:mb-16 px-2">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedCategory(category)}
              className={`relative text-xs sm:text-sm tracking-wider px-6 sm:px-10 py-3 sm:py-5 rounded-xl sm:rounded-2xl overflow-hidden
                transition-all duration-500 transform hover:scale-105
                ${selectedCategory === category 
                  ? 'text-white shadow-xl shadow-secondary/20'
                  : 'text-secondary-dark hover:text-white'
                }`}
            >
              <span className="relative z-10">{category}</span>
              <div className={`absolute inset-0 transition-all duration-500
                ${selectedCategory === category 
                  ? 'opacity-100 bg-gradient-to-br from-secondary via-secondary-dark to-primary'
                  : 'opacity-0 hover:opacity-100 bg-gradient-to-br from-primary via-secondary to-secondary-dark'
                }`}
              ></div>
            </motion.button>
          ))}
        </div>

        {/* Güncellenmiş Carousel Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative px-0 sm:px-4"
          >
            <style jsx global>{`
              .swiper-pagination-bullet {
                background: linear-gradient(to right, var(--secondary), var(--primary));
                opacity: 0.5;
                transition: all 0.3s;
              }
              .swiper-pagination-bullet-active {
                opacity: 1;
                transform: scale(1.25);
              }
              .swiper-button-prev,
              .swiper-button-next {
                width: 40px !important;
                height: 40px !important;
                background: rgba(255, 255, 255, 0.9) !important;
                backdrop-filter: blur(4px);
                border-radius: 50% !important;
                color: var(--secondary-dark) !important;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
                transition: all 0.3s !important;
              }
              @media (min-width: 640px) {
                .swiper-button-prev,
                .swiper-button-next {
                  width: 48px !important;
                  height: 48px !important;
                }
              }
              .swiper-button-prev:hover,
              .swiper-button-next:hover {
                background: white !important;
                transform: scale(1.1);
              }
              .swiper-button-prev:after,
              .swiper-button-next:after {
                font-size: 16px !important;
                font-weight: bold;
              }
              @media (min-width: 640px) {
                .swiper-button-prev:after,
                .swiper-button-next:after {
                  font-size: 20px !important;
                }
              }
            `}</style>
            
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              coverflowEffect={{
                rotate: 45,
                stretch: 0,
                depth: 140,
                modifier: 1,
                slideShadows: false,
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{ 
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={true}
              modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
              breakpoints={swiperBreakpoints}
              className="w-full portfolio-swiper !py-6 sm:!py-8"
            >
              {filteredItems.map((item) => (
                <SwiperSlide 
                  key={item._id} 
                  className="swiper-slide-custom"
                >
                  <div className="p-2 sm:p-3 md:p-4">
                    <Card 
                      _id={item._id}
                      title={item.title}
                      category={item.category}
                      imageUrl={item.imageUrl}
                      description={item.description}
                      size={item.size}
                      personCount={item.personCount}
                      teknik={item.teknik}
                      details={item.details}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}