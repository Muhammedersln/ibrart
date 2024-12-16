'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function About() {
  const fadeInUp = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 }
  }

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 bg-cream-light">
      <div className="max-w-7xl mx-auto">
        {/* Ana İçerik */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          {/* Sol Taraf - Resim */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Dekoratif arka plan elementleri */}
            <motion.div 
              className="absolute -left-4 -top-4 w-24 h-24 bg-brown-light/20 rounded-tl-3xl"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute -right-4 -bottom-4 w-24 h-24 bg-brown-light/20 rounded-br-3xl"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, -5, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Ana görsel */}
            <div className="relative h-[600px] rounded-2xl overflow-hidden group">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent z-10 
                transition-opacity duration-500 group-hover:opacity-70" />
              
              <motion.div
                className="relative w-full h-full"
                whileHover={{ 
                  scale: 1.08,
                  transition: { duration: 0.8, ease: "easeOut" }
                }}
                initial={{ scale: 1 }}
              >
                <Image
                  src="/artist-portrait.jpg"
                  alt="İbrahim Art - Sanatçı Portresi"
                  fill
                  className="object-cover transition-transform duration-700"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>

              {/* Enhanced shadow effects */}
              <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(146,104,91,0.3)] z-20 
                transition-all duration-500 group-hover:shadow-[inset_0_0_60px_rgba(146,104,91,0.4)]" />
              
              {/* Decorative corner accents */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-primary/40 
                transition-all duration-500 group-hover:w-16 group-hover:h-16 group-hover:border-primary/60" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-secondary/40 
                transition-all duration-500 group-hover:w-16 group-hover:h-16 group-hover:border-secondary/60" />
            </div>
          </motion.div>

          {/* Sağ Taraf - Bilgi */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.h2 
              className="text-4xl font-playfair font-bold text-brown-dark"
              {...fadeInUp}
            >
              Sanatla Dolu Bir Yolculuk
            </motion.h2>
            
            <div className="space-y-6 text-lg text-brown-medium/80">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                2015 yılından beri tuvallerimde hayat bulan her fırça darbesi, içimdeki sanat tutkusunun 
                bir yansıması. Doğanın muhteşem renkleri ve insan ruhunun derinliklerini eserlerimde 
                buluşturuyorum.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Güzel Sanatlar Fakültesi'ndeki eğitimim, sadece teknik becerilerimi geliştirmekle kalmadı, 
                aynı zamanda sanatın evrensel dilini daha derinden anlamamı sağladı. Her sergide, 
                izleyicilerle kurduğum duygusal bağ, sanatımın en değerli parçası haline geldi.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Modern sanatın yenilikçi yaklaşımlarını, geleneksel tekniklerin zarafetiyle 
                harmanlayarak, kendime özgü bir tarz geliştirdim. Her eserim, bir hikayenin, bir 
                duygunun, bazen de bir anın tuval üzerindeki dansı.
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Alt Kısım - Yetenekler ve İstatistikler yan yana */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Yetenekler */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-2xl font-playfair font-bold text-brown-dark mb-8">
              Uzmanlık Alanlarım
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {[
                { skill: 'Yağlı Boya', icon: '🎨' },
                { skill: 'Akrilik', icon: '🖌' },
                { skill: 'Portre', icon: '👤' },
                { skill: 'Peyzaj', icon: '🌄' }
              ].map((item, index) => (
                <motion.div
                  key={item.skill}
                  className="bg-cream-light p-6 rounded-xl hover:shadow-lg transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <p className="font-medium text-brown-dark">{item.skill}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* İstatistikler */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-2xl font-playfair font-bold text-brown-dark mb-8">
              Deneyimlerim
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: '8+', text: 'Yıllık Deneyim', icon: '⭐' },
                { number: '50+', text: 'Tamamlanan Eser', icon: '🎨' },
                { number: '15+', text: 'Sergi', icon: '🏛️' },
                { number: '100+', text: 'Mutlu Müşteri', icon: '💝' }
              ].map((stat, index) => (
                <motion.div 
                  key={stat.text}
                  className="bg-cream-light p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <span className="text-2xl mb-2 block">{stat.icon}</span>
                  <p className="text-3xl font-playfair font-bold text-brown-dark">{stat.number}</p>
                  <p className="text-brown-medium/80">{stat.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 