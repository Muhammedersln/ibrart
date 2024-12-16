'use client'

import { useState, useEffect } from 'react'
import Card from './Card'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolioItems, categories } from '@/data/portfolioData'
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

  const filteredItems = portfolioItems.filter(
    item => selectedCategory === 'TÜMÜ' || item.category === selectedCategory
  )

  // Swiper için breakpoint ayarları
  const swiperBreakpoints = {
    320: {  // mobil telefonlar için
      slidesPerView: 1,
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

  return (
    <section id="portfolio-section" className="relative min-h-screen">
      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-7xl font-serif mb-8 relative">
            <span className="absolute -inset-1 blur-2xl bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full"></span>
            <span className="relative bg-gradient-to-r from-secondary via-secondary-dark to-primary bg-clip-text text-transparent">
              PORTFÖY
            </span>
          </h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-secondary-dark/80 max-w-3xl mx-auto mb-10 text-lg leading-relaxed"
          >
            Sanatın farklı dallarında ürettiğim eserleri keşfedin. Her bir eser, duyguları ve hikayeleri 
            tuval üzerinde hayata geçiriyor.
          </motion.p>
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="flex items-center justify-center gap-8"
          >
            <div className="h-[3px] w-32 bg-gradient-to-r from-secondary to-transparent rounded-full"></div>
            <div className="h-4 w-4 rounded-full bg-primary animate-pulse"></div>
            <div className="h-[3px] w-32 bg-gradient-to-l from-primary to-transparent rounded-full"></div>
          </motion.div>
        </motion.div>
        
        {/* Category Filters */}
        <div className="flex justify-center flex-wrap gap-6 md:gap-10 mb-16">
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
              className={`relative text-sm tracking-wider px-10 py-5 rounded-2xl overflow-hidden
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
                width: 48px !important;
                height: 48px !important;
                background: rgba(255, 255, 255, 0.9) !important;
                backdrop-filter: blur(4px);
                border-radius: 50% !important;
                color: var(--secondary-dark) !important;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
                transition: all 0.3s !important;
              }
              .swiper-button-prev:hover,
              .swiper-button-next:hover {
                background: white !important;
                transform: scale(1.1);
              }
              .swiper-button-prev:after,
              .swiper-button-next:after {
                font-size: 20px !important;
                font-weight: bold;
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
              className="w-full portfolio-swiper !py-8"
            >
              {filteredItems.map((item) => (
                <SwiperSlide 
                  key={item.id} 
                  className="swiper-slide-custom"
                >
                  <div className="p-2 sm:p-3 md:p-4">
                    <Card 
                      id={item.id}
                      title={item.title}
                      category={item.category}
                      imageUrl={item.imageUrl}
                      description={item.description}
                      dimensions={item.dimensions}
                      technique={item.technique}
                      index={item.id}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </AnimatePresence>

        {/* Gallery Link bölümü */}
        <div className="flex justify-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link href="/gallery"
              className="group relative px-12 py-6 overflow-hidden rounded-2xl
                transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-primary/20
                bg-gradient-to-br from-primary via-secondary to-secondary-dark"
            >
              <span className="relative z-10 text-sm tracking-wider uppercase font-medium text-white">
                Tüm Galeriyi Görüntüle
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}