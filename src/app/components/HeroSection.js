'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroSectionPng from '../../../public/utils/HeroSection.png'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative min-h-screen bg-cream-light/30">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-64 sm:w-96 h-64 sm:h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-20 sm:-left-40 w-56 sm:w-80 h-56 sm:h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-8 sm:py-12">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center justify-center min-h-[calc(100vh-4rem)]">
          {/* Image Section */}
          <div className={`relative w-full h-[250px] xs:h-[300px] sm:h-[400px] lg:h-[75vh] order-2 lg:order-1 group
            transition-all duration-1000 transform
            ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className={`absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden transform transition-all duration-500 ease-out 
              hover:shadow-2xl hover:shadow-secondary/10
              ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <Image
                src={HeroSectionPng}
                alt="Sanatçı Portresi"
                fill
                className={`object-cover transition-transform duration-700 group-hover:scale-[1.03]`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                onLoadingComplete={() => setImageLoaded(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-xl sm:rounded-2xl"></div>
            
            {/* Floating elements */}
            <div className="absolute -right-2 sm:-right-4 -bottom-2 sm:-bottom-4 w-16 sm:w-24 h-16 sm:h-24 bg-primary/10 rounded-full blur-xl animate-float"></div>
            <div className="absolute -left-2 sm:-left-4 -top-2 sm:-top-4 w-14 sm:w-20 h-14 sm:h-20 bg-secondary/10 rounded-full blur-xl animate-float-delay"></div>
          </div>

          {/* Content Section */}
          <div className="order-1 lg:order-2 w-full">
            <div 
              className={`space-y-4 sm:space-y-8 transition-all duration-1000 transform
                ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
            >
              <div className="relative">
                <h1 className="relative text-center sm:text-left">
                  <span className="block text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-serif mb-2 
                    bg-gradient-to-r from-secondary-dark to-primary bg-clip-text text-transparent
                    animate-gradient">
                    İBRAHİM
                  </span>
                  <span className="block text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-serif mt-2
                    bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent
                    animate-gradient-delay">
                    SANAT
                  </span>
                </h1>
                <div className="relative flex items-center gap-4 mt-4 sm:mt-6 justify-center sm:justify-start">
                  <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-secondary-dark/20 to-primary/20"></div>
                  <div className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-pulse"></div>
                </div>
              </div>
              
              <h2 className="text-lg sm:text-2xl md:text-3xl text-secondary-dark/90 font-light tracking-wide text-center sm:text-left">
                Çizim & <span className="text-primary/80">Resim</span>
              </h2>

              <p className="text-center sm:text-left text-secondary-dark/70 max-w-lg text-sm sm:text-base leading-relaxed mx-auto sm:mx-0">
                Sanatın büyülü dünyasında, her fırça darbesi bir hikaye anlatır. 
                Doğanın güzelliğini ve insan ruhunun derinliklerini tuvale yansıtıyorum.
              </p>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 w-full sm:w-auto">
                <a
                  href="/portfolyo"
                  className="w-full sm:w-auto relative inline-flex items-center justify-center px-5 sm:px-8 py-3 sm:py-4 overflow-hidden 
                    font-medium transition duration-300 ease-out border-2 border-primary rounded-lg 
                    shadow-md group hover:shadow-xl text-sm sm:text-base"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white 
                    duration-300 -translate-x-full bg-primary group-hover:translate-x-0 ease">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-primary 
                    transition-all duration-300 transform group-hover:translate-x-full ease">Portföyüm</span>
                  <span className="relative invisible">Portföyüm</span>
                </a>
                <a
                  href="/contact"
                  className="w-full sm:w-auto relative inline-flex items-center justify-center px-5 sm:px-8 py-3 sm:py-4 overflow-hidden 
                    font-medium transition duration-300 ease-out border-2 border-secondary rounded-lg 
                    shadow-md group hover:shadow-xl text-sm sm:text-base"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white 
                    duration-300 -translate-x-full bg-secondary group-hover:translate-x-0 ease">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                    </svg>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-secondary 
                    transition-all duration-300 transform group-hover:translate-x-full ease">İletişime Geç</span>
                  <span className="relative invisible">İletişime Geç</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}