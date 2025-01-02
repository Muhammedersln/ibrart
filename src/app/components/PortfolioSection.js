'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/Card'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules'
import { toast } from 'react-hot-toast'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const [artworks, setArtworks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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
      const response = await fetch('/api/artworks?portfolio=true')
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Eserler yüklenirken bir hata oluştu')
      }
      
      console.log('Fetched portfolio artworks:', data)
      setArtworks(data)
      
      // Sadece gerçek bir hata varsa hata göster
      if (!data) {
        console.log('No portfolio data received')
        toast.error('Portfolyo verisi alınamadı')
      }
    } catch (error) {
      console.error('Error fetching artworks:', error)
      toast.error(`Eserler yüklenirken hata oluştu: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

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

  // Eğer hiç eser yoksa
  if (!artworks || artworks.length === 0) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <p className="text-secondary-dark/80 mb-4">Henüz portfolyoda eser bulunmuyor.</p>
        <p className="text-secondary-dark/60 text-sm">Portfolyoya eser eklemek için admin panelinden eserleri yönetebilirsiniz.</p>
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
        
        {/* Carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative px-0 sm:px-4"
          >
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              loop={false}
              slidesPerView={'auto'}
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
                stopOnLastSlide: true
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
              {artworks.map((item) => (
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