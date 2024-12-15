'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-cream-50 to-green-50">
      <div className="h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image Section - Left Side */}
          <div className="relative h-[400px] lg:h-[80vh] w-full order-2 lg:order-1">
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <Image
                src="/hero-image.jpg"
                alt="Sanatçı Portresi"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-transparent to-gold-500/20" />
            </div>
            <div className="absolute inset-0 ring-1 ring-inset ring-gold-500/10 rounded-2xl"></div>
          </div>

          {/* Content Section - Right Side */}
          <div className="order-1 lg:order-2">
            <div 
              className={`space-y-8 transition-all duration-1000 transform
                ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-gold-200/20 via-green-200/20 to-gold-200/20 blur-lg"></div>
                <h1 className="relative text-left">
                  <span className="block text-6xl md:text-7xl xl:text-8xl font-serif text-green-700 mb-2">
                    İBRAHİM
                  </span>
                  <span className="block text-5xl md:text-6xl xl:text-7xl font-serif text-gold-500 mt-2">
                    SANAT
                  </span>
                </h1>
                <div className="relative flex items-center gap-4 mt-6">
                  <div className="h-px w-16 bg-gradient-to-r from-green-500 to-green-700"></div>
                  <div className="h-2 w-2 rounded-full bg-gold-500"></div>
                  <div className="h-px w-16 bg-gradient-to-r from-gold-400 to-gold-600"></div>
                </div>
              </div>
              
              <h2 className="text-2xl md:text-3xl text-green-600 font-light tracking-wide text-left">
                Çizim & <span className="text-gold-500">Resim</span>
              </h2>

              <p className="text-left text-green-700/80 max-w-lg">
                Sanatın büyülü dünyasında, her fırça darbesi bir hikaye anlatır. 
                Doğanın güzelliğini ve insan ruhunun derinliklerini tuvale yansıtıyorum.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <a
                  href="/portfolyo"
                  className="group relative px-8 py-4 bg-green-700 text-white overflow-hidden rounded-xl
                    transition-all duration-300 transform hover:-translate-y-1
                    shadow-[0_8px_30px_rgb(0,96,57,0.3)]"
                >
                  <span className="relative z-10 text-sm tracking-wider uppercase font-medium">
                    Portföyüm
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600 
                    transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  </div>
                </a>
                <a
                  href="/contact"
                  className="group relative px-8 py-4 border-2 border-gold-500 text-gold-500 overflow-hidden rounded-xl
                    transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span className="relative z-10 text-sm tracking-wider uppercase font-medium group-hover:text-white">
                    İletişime Geç
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 
                    transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 