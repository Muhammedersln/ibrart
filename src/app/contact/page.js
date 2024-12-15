'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Form gönderme işlemi burada gerçekleştirilecek
    console.log('Form data:', formData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <main className="bg-green-900 min-h-screen">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <h1 
            className={`text-4xl md:text-5xl text-gold-500 text-center mb-16 font-serif transition-all duration-1000
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            İLETİŞİM
          </h1>

          <div className="max-w-6xl mx-auto">
            <div 
              className={`grid grid-cols-1 md:grid-cols-2 gap-12 transition-all duration-1000 delay-300
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              {/* İletişim Bilgileri */}
              <div className="space-y-8">
                <div className="bg-green-800 p-8 rounded-2xl shadow-lg">
                  <h2 className="text-2xl text-gold-500 mb-6 font-serif">İletişim Bilgileri</h2>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-green-700 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gold-500 mb-1">Adres</h3>
                        <p className="text-cream-100">
                          Sanat Sokağı No: 123
                          <br />
                          Kadıköy, İstanbul
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-green-700 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gold-500 mb-1">Telefon</h3>
                        <p className="text-cream-100">+90 (212) 345 67 89</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-green-700 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gold-500 mb-1">E-posta</h3>
                        <p className="text-cream-100">info@ibrahimart.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sosyal Medya */}
                <div className="bg-green-800 p-8 rounded-2xl shadow-lg">
                  <h2 className="text-2xl text-gold-500 mb-6 font-serif">Sosyal Medya</h2>
                  <div className="flex space-x-6">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:bg-green-600">
                        <svg
                          className="w-6 h-6 text-gold-500 transition-colors duration-300 group-hover:text-gold-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </div>
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:bg-green-600">
                        <svg
                          className="w-6 h-6 text-gold-500 transition-colors duration-300 group-hover:text-gold-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </div>
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:bg-green-600">
                        <svg
                          className="w-6 h-6 text-gold-500 transition-colors duration-300 group-hover:text-gold-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* İletişim Formu */}
              <div className="bg-green-800 p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl text-gold-500 mb-6 font-serif">Mesaj Gönder</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-cream-200 mb-1"
                    >
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-green-700 border border-green-600 rounded-lg
                        text-cream-100 placeholder-cream-300
                        focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent
                        transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-cream-200 mb-1"
                    >
                      E-posta
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-green-700 border border-green-600 rounded-lg
                        text-cream-100 placeholder-cream-300
                        focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent
                        transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-cream-200 mb-1"
                    >
                      Konu
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-green-700 border border-green-600 rounded-lg
                        text-cream-100 placeholder-cream-300
                        focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent
                        transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-cream-200 mb-1"
                    >
                      Mesaj
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-green-700 border border-green-600 rounded-lg
                        text-cream-100 placeholder-cream-300
                        focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent
                        transition-all duration-300"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-12 py-4 border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-cream-100
                      transition-all duration-300 tracking-wider uppercase text-sm rounded-lg"
                  >
                    Gönder
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 