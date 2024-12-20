'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function Card({ id, title, category, imageUrl, description, dimensions, technique, index = 0 }) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/gallery/${id}`)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8 }}
      onClick={handleClick}
      className="group relative w-full aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-50
        shadow-sm hover:shadow-2xl transition-all duration-700 ease-out cursor-pointer"
    >
      {/* Image Container */}
      <div className="absolute inset-0 transition-transform duration-1000 ease-out will-change-transform
        group-hover:scale-105">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover brightness-95 group-hover:brightness-100 transition-all duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-secondary/5 to-primary/5"></div>
        )}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/90 via-black/30 to-transparent 
        opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out"></div>

      {/* Content Container */}
      <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end z-20">
        <div className="overflow-hidden">
          {/* Category */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-4 transform translate-y-20 group-hover:translate-y-0 transition-transform duration-700"
          >
            <span className="px-4 py-1.5 bg-secondary/20 backdrop-blur-md rounded-full text-xs font-medium
              text-white/90 border border-primary/20 tracking-wide">
              {category}
            </span>
          </motion.div>

          {/* Title */}
          <h3 className="text-2xl font-serif text-white mb-3 transform translate-y-20 group-hover:translate-y-0 
            transition-transform duration-700 delay-[75ms] leading-tight">
            {title}
          </h3>

          {/* Divider */}
          <div className="h-[2px] w-16 bg-gradient-to-r from-secondary to-primary rounded-full
            transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-150 mb-4">
          </div>

          {/* Description & Details */}
          <div className="space-y-3 transform translate-y-20 group-hover:translate-y-0 
            transition-transform duration-700 delay-200">
            <p className="text-sm text-white/90 leading-relaxed line-clamp-2">
              {description}
            </p>
            <div className="flex items-center gap-3 text-xs text-white/70 font-light">
              <span>{dimensions}</span>
              <span className="w-1 h-1 rounded-full bg-white/40"></span>
              <span>{technique}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleClick}
          className="mt-8 w-full px-6 py-3 bg-gradient-to-r from-secondary/40 to-primary/40 
            backdrop-blur-md rounded-xl text-white text-sm font-medium 
            transform translate-y-20 group-hover:translate-y-0 
            transition-all duration-700 delay-300 
            hover:from-secondary/60 hover:to-primary/60 
            border border-primary/20"
        >
          Detayları Gör
        </button>

        {/* Decorative Dots */}
        <div className="absolute top-6 right-6 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 
          transition-all duration-700 delay-500">
          <div className="w-1.5 h-1.5 rounded-full bg-secondary/80 animate-pulse"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-primary/80 animate-pulse delay-150"></div>
        </div>
      </div>
    </motion.div>
  )
} 