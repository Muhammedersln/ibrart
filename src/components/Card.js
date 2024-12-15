'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Card({ 
  title, 
  category, 
  imageUrl, 
  description,
  dimensions,
  technique,
  delay = 0 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-white
        shadow-lg hover:shadow-xl transition-all duration-500"
    >
      {/* Card Inner Shadow */}
      <div className="absolute inset-0 shadow-inner-lg z-10"></div>

      {/* Image */}
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-green-100 to-gold-50"></div>
        )}
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent 
        opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

      {/* Content Container */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
        <div className="overflow-hidden">
          {/* Category Badge */}
          <div className="mb-4 transform translate-y-20 group-hover:translate-y-0 transition-transform duration-500">
            <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/90
              border border-white/20">
              {category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-serif text-white mb-2 transform translate-y-20 group-hover:translate-y-0 
            transition-transform duration-500 delay-[50ms]">
            {title}
          </h3>

          {/* Divider */}
          <div className="h-0.5 w-12 bg-gradient-to-r from-gold-400 to-gold-600 
            transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100">
          </div>

          {/* Details */}
          <div className="mt-3 space-y-2 transform translate-y-20 group-hover:translate-y-0 
            transition-transform duration-500 delay-150">
            <p className="text-sm text-white/80">
              {description}
            </p>
            <div className="flex items-center gap-4 text-xs text-white/60">
              <span>{dimensions}</span>
              <span>•</span>
              <span>{technique}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 w-full px-4 py-2.5 bg-gradient-to-r from-green-600 to-gold-500 rounded-lg
            text-white text-sm transform translate-y-20 group-hover:translate-y-0 transition-transform duration-500 delay-200
            hover:shadow-lg hover:shadow-gold-500/20 backdrop-blur-sm"
        >
          Detayları Gör
        </motion.button>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 
          transition-opacity duration-500 delay-300">
          <div className="w-1 h-1 rounded-full bg-gold-400 animate-pulse"></div>
          <div className="w-1 h-1 rounded-full bg-green-400 animate-pulse delay-75"></div>
          <div className="w-1 h-1 rounded-full bg-gold-400 animate-pulse delay-150"></div>
        </div>
      </div>
    </motion.div>
  )
} 