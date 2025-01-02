'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaPaintBrush, FaPalette, FaPencilAlt, FaPortrait, FaMountain, FaRegLightbulb, FaWind, FaStar } from 'react-icons/fa'

export default function About() {
  const fadeInUp = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 }
  }

  const stats = [
    { number: '8+', text: 'Yıllık Deneyim' },
    { number: '50+', text: 'Tamamlanan Eser' },
    { number: '15+', text: 'Sergi' },
    { number: '100+', text: 'Mutlu Müşteri' }
  ]

  const skills = [
    { name: 'Yağlı Boya', icon: <FaPaintBrush className="w-6 h-6" /> },
    { name: 'Akrilik', icon: <FaPalette className="w-6 h-6" /> },
    { name: 'Karakalem', icon: <FaPencilAlt className="w-6 h-6" /> },
    { name: 'Portre', icon: <FaPortrait className="w-6 h-6" /> },
    { name: 'Peyzaj', icon: <FaMountain className="w-6 h-6" /> },
    { name: 'Modern Sanat', icon: <FaRegLightbulb className="w-6 h-6" /> },
    { name: 'Soyut', icon: <FaWind className="w-6 h-6" /> },
    { name: 'Empresyonizm', icon: <FaStar className="w-6 h-6" /> }
  ]

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 bg-cream-light">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif mb-6 relative">
            <span className="absolute -inset-1 blur-2xl bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full"></span>
            <span className="relative bg-gradient-to-r from-secondary via-secondary-dark to-primary bg-clip-text text-transparent">
              HAKKIMDA
            </span>
          </h1>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative max-w-md mx-auto lg:mx-0"
          >
            <div className="relative h-[400px] rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent z-10 
                transition-opacity duration-500 group-hover:opacity-70" />
              
              <motion.div
                className="relative w-full h-full"
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.5, ease: "easeOut" }
                }}
              >
                <Image
                  src="/artist-portrait.jpg"
                  alt="İbrahim Art - Sanatçı Portresi"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>

              {/* Subtle corner accents */}
              <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-white/40" />
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-white/40" />
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="space-y-6 text-lg text-secondary-dark/80">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                2015 yılından beri tuvallerimde hayat bulan her fırça darbesi, içimdeki sanat tutkusunun 
                bir yansıması. Doğanın muhteşem renkleri ve insan ruhunun derinliklerini eserlerimde 
                buluşturuyorum.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Güzel Sanatlar Fakültesi&apos;ndeki eğitimim, sadece teknik becerilerimi geliştirmekle kalmadı, 
                aynı zamanda sanatın evrensel dilini daha derinden anlamamı sağladı.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Modern sanatın yenilikçi yaklaşımlarını, geleneksel tekniklerin zarafetiyle 
                harmanlayarak, kendime özgü bir tarz geliştirdim.
              </motion.p>
            </div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl font-serif text-primary font-bold">{stat.number}</p>
                  <p className="text-sm text-secondary-dark/60">{stat.text}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-cream-dark/10"
        >
          <h2 className="text-2xl font-serif text-secondary-dark mb-8 text-center">Uzmanlık Alanlarım</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center gap-3 p-4 rounded-xl bg-cream/50"
              >
                <div className="text-primary">
                  {skill.icon}
                </div>
                <span className="text-sm font-medium text-secondary-dark/80 text-center">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 