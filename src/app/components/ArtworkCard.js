'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function ArtworkCard({ artwork }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <>
      <div
        className="group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Card */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-white shadow-md">
          <Image
            src={artwork.image}
            alt={artwork.title}
            fill
            className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Overlay */}
          <div 
            className={`absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/50 to-transparent
              transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          />
          
          {/* Content */}
          <div 
            className={`absolute inset-0 p-4 sm:p-6 flex flex-col justify-end
              transition-all duration-300 transform
              ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          >
            <h3 className="font-serif text-xl sm:text-2xl text-gold-300 mb-2">
              {artwork.title}
            </h3>
            <p className="text-cream-100 text-xs sm:text-sm mb-2 sm:mb-3">
              {artwork.dimensions} • {artwork.materials}
            </p>
            <p className="text-cream-200 text-sm line-clamp-2">
              {artwork.description}
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-green-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4
            animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-xl sm:rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto
              animate-scale-up shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 sm:p-8">
              <div className="flex justify-between items-start mb-4 sm:mb-6">
                <h2 className="font-serif text-2xl sm:text-3xl text-gold-500">
                  {artwork.title}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-green-500 hover:text-green-700 transition-colors p-2"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
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
              
              <div className="relative aspect-[4/3] w-full mb-6 sm:mb-8 rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-green-500 mb-3 sm:mb-4">
                    Detaylar
                  </h3>
                  <dl className="space-y-2 sm:space-y-3">
                    <div>
                      <dt className="text-sm sm:text-base text-green-700">Boyutlar</dt>
                      <dd className="text-sm sm:text-base text-green-900">{artwork.dimensions}</dd>
                    </div>
                    <div>
                      <dt className="text-sm sm:text-base text-green-700">Malzemeler</dt>
                      <dd className="text-sm sm:text-base text-green-900">{artwork.materials}</dd>
                    </div>
                    <div>
                      <dt className="text-sm sm:text-base text-green-700">Yıl</dt>
                      <dd className="text-sm sm:text-base text-green-900">{artwork.year}</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-green-500 mb-3 sm:mb-4">
                    Açıklama
                  </h3>
                  <p className="text-sm sm:text-base text-green-800 leading-relaxed">
                    {artwork.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 