'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { FaWhatsapp, FaShoppingCart, FaPaintBrush, FaImage, FaRuler } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'

export default function OrderPage() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
      setIsLoading(false)
    } catch (error) {
      toast.error('Ürünler yüklenirken bir hata oluştu')
      setIsLoading(false)
    }
  }

  const handleWhatsApp = (productName = '') => {
    const message = productName 
      ? `Merhaba, ${productName} ürünü hakkında bilgi almak istiyorum.`
      : 'Merhaba, özel portre siparişi vermek istiyorum.'
    
    window.open(`https://wa.me/+905555555555?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 bg-cream-light">
      <div className="max-w-6xl mx-auto">
        {/* Custom Portrait Order Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl font-serif mb-6 relative">
            <span className="absolute -inset-1 blur-2xl bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full"></span>
            <span className="relative bg-gradient-to-r from-secondary via-secondary-dark to-primary bg-clip-text text-transparent">
              SİPARİŞ
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-cream-dark/10 mb-16"
        >
          <h2 className="text-3xl font-serif text-secondary-dark mb-8 text-center">
            Özel Portre Siparişi
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-cream/50 p-6 rounded-xl text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaImage className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl text-secondary-dark mb-2">1. Fotoğraf Seçimi</h3>
              <p className="text-secondary-dark/80">
                Çizilmesini istediğiniz fotoğrafı hazırlayın
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-cream/50 p-6 rounded-xl text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaRuler className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl text-secondary-dark mb-2">2. Boyut ve Teknik</h3>
              <p className="text-secondary-dark/80">
                İstediğiniz boyutu ve tekniği belirleyin
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-cream/50 p-6 rounded-xl text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaWhatsapp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl text-secondary-dark mb-2">3. İletişim</h3>
              <p className="text-secondary-dark/80">
                WhatsApp üzerinden detayları konuşalım
              </p>
            </motion.div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 text-center"
          >
            <button
              onClick={() => handleWhatsApp()}
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-xl
                hover:bg-primary/90 transition-colors text-lg font-medium"
            >
              <FaWhatsapp className="w-6 h-6" />
              Sipariş Ver
            </button>
          </motion.div>
        </motion.div>

        {/* Products Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-cream-dark/10"
        >
          <h2 className="text-3xl font-serif text-secondary-dark mb-8 text-center">
            Hazır Eserler
          </h2>

          {isLoading ? (
            <div className="text-center py-8">Yükleniyor...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-8 text-secondary-dark/60">Henüz ürün eklenmemiş</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  className="bg-cream/50 rounded-xl overflow-hidden group"
                >
                  <div className="relative h-64">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl text-secondary-dark mb-2">{product.name}</h3>
                    <p className="text-secondary-dark/80 mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-primary font-bold text-xl">{product.price} ₺</p>
                      <button
                        onClick={() => handleWhatsApp(product.name)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl
                          hover:bg-primary/90 transition-colors"
                      >
                        <FaWhatsapp className="w-5 h-5" />
                        Satın Al
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
} 