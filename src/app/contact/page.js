'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaInstagram, FaTiktok, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp, FaChevronDown } from 'react-icons/fa'

export default function ContactPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null)

  const socialLinks = [
    {
      icon: <FaInstagram size={24} />,
      url: 'https://instagram.com/ibrart',
      label: 'Instagram',
      color: 'hover:text-pink-500',
      followers: '10K+'
    },
    {
      icon: <FaTiktok size={24} />,
      url: 'https://tiktok.com/@ibrart',
      label: 'TikTok',
      color: 'hover:text-black',
      followers: '5K+'
    },
    {
      icon: <FaYoutube size={24} />,
      url: 'https://youtube.com/@ibrart',
      label: 'YouTube',
      color: 'hover:text-red-600',
      subscribers: '2K+'
    }
  ]

  const faqItems = [
    {
      question: 'Portre siparişi nasıl verebilirim?',
      answer: 'WhatsApp üzerinden bizimle iletişime geçerek portre siparişi verebilirsiniz. Size özel çalışma için fotoğrafınızı paylaşabilir ve detayları konuşabiliriz.'
    },
    {
      question: 'Portre çalışması ne kadar sürer?',
      answer: 'Portre çalışması genellikle 1-2 hafta içinde tamamlanır. Yoğunluğa ve çalışmanın detaylarına göre bu süre değişebilir.'
    },
    {
      question: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
      answer: 'Banka havalesi, EFT ve kredi kartı ile ödeme yapabilirsiniz. Sipariş öncesi %50 ön ödeme alınmaktadır.'
    },
    {
      question: 'Portre için hangi fotoğraflar uygundur?',
      answer: 'Yüksek çözünürlüklü, net ve iyi aydınlatılmış fotoğraflar en iyi sonucu verir. Portre için gönderdiğiniz fotoğrafları değerlendirip size geri dönüş yapıyoruz.'
    }
  ]

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  return (
    <main className="min-h-screen bg-cream-light/30">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-64 sm:w-96 h-64 sm:h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-20 sm:-left-40 w-56 sm:w-80 h-56 sm:h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif mb-6 relative">
              <span className="absolute -inset-1 blur-2xl bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full"></span>
              <span className="relative bg-gradient-to-r from-secondary via-secondary-dark to-primary bg-clip-text text-transparent">
                İLETİŞİM
              </span>
            </h1>
            <p className="text-lg text-secondary-dark/80 max-w-2xl mx-auto">
              Sanatla ilgili tüm sorularınız için buradayız. Size en uygun iletişim kanalından ulaşabilirsiniz.
            </p>
          </motion.div>

          {/* Top Section - Contact Info & Social */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Quick Contact Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-cream-dark/10 h-full">
                <h2 className="text-2xl font-serif text-secondary-dark mb-6">Hızlı İletişim</h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <FaMapMarkerAlt className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-secondary-dark font-medium mb-1">Atölye</h3>
                      <p className="text-secondary-dark/70">Sanat Sokağı No: 123<br />Kadıköy, İstanbul</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <FaPhone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-secondary-dark font-medium mb-1">Telefon</h3>
                      <p className="text-secondary-dark/70">+90 (212) 345 67 89</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <FaEnvelope className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-secondary-dark font-medium mb-1">E-posta</h3>
                      <p className="text-secondary-dark/70">info@ibrahimart.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social Media Showcase */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-cream-dark/10 h-full">
                <h2 className="text-2xl font-serif text-secondary-dark mb-6">Sosyal Medya</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-4 rounded-xl bg-cream/30
                        transition-all duration-300 group hover:bg-cream/50 ${link.color}`}
                    >
                      <div className="transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                        {link.icon}
                      </div>
                      <div>
                        <span className="font-medium block">{link.label}</span>
                        <span className="text-sm text-secondary-dark/70">
                          {link.followers || link.subscribers}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/905555555555"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-3 p-4 rounded-xl bg-green-500 text-white
                    transition-all duration-300 group hover:bg-green-600 w-full"
                >
                  <div className="transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <FaWhatsapp size={24} />
                  </div>
                  <span className="font-medium">WhatsApp ile İletişime Geç</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-cream-dark/10">
              <h2 className="text-2xl font-serif text-secondary-dark text-center mb-8">Sıkça Sorulan Sorular</h2>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="border border-cream-dark/10 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-4 text-left bg-cream/20 hover:bg-cream/30 transition-colors"
                    >
                      <span className="font-medium text-secondary-dark">{item.question}</span>
                      <FaChevronDown
                        className={`w-5 h-5 text-primary transition-transform duration-500
                          ${openFaqIndex === index ? 'transform rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence>
                      {openFaqIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ 
                            height: 'auto', 
                            opacity: 1,
                            transition: {
                              height: { duration: 0.4, ease: 'easeOut' },
                              opacity: { duration: 0.3, delay: 0.1 }
                            }
                          }}
                          exit={{ 
                            height: 0, 
                            opacity: 0,
                            transition: {
                              height: { duration: 0.4, ease: 'easeIn' },
                              opacity: { duration: 0.3 }
                            }
                          }}
                        >
                          <div className="p-4 text-secondary-dark/70 bg-cream/10">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
} 