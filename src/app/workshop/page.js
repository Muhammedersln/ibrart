'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { FaWhatsapp, FaPalette, FaUsers, FaClock, FaMedal, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { galleryImages, programs, features, contactInfo } from '@/data/workshop';
import { motion } from 'framer-motion';

const WorkshopPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  const handleContact = (e) => {
    e.preventDefault();
    // Form gönderme işlemi burada yapılacak
  };

  const filteredImages = activeTab === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeTab);

  const featureIcons = {
    "Küçük Gruplar": <FaUsers className="text-4xl text-primary" />,
    "Kaliteli Malzemeler": <FaPalette className="text-4xl text-primary" />,
    "Esnek Saatler": <FaClock className="text-4xl text-primary" />,
    "Sergi İmkanı": <FaMedal className="text-4xl text-primary" />
  };

  return (
    <main className="min-h-screen bg-cream-light">
      {/* Hero Section */}
      <section className="relative h-screen">

        <div className="absolute inset-0" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-center justify-center text-center"
        >
          <div className="max-w-4xl px-4">
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
              Sanatın Kalbinde
              <br />
              <span className="text-primary-light">Bir Atölye</span>
            </h1>
            <p className="text-xl md:text-2xl text-cream-light mb-8">
              Profesyonel eğitmenler eşliğinde sanat yolculuğunuza başlayın
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg
                       text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Hemen Başlayın
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Özellikler */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                key={index}
                className="group p-8 rounded-xl hover:shadow-xl transition-all duration-300
                          bg-cream hover:bg-white border border-cream-dark/10"
              >
                <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {featureIcons[feature.title]}
                </div>
                <h3 className="text-xl font-serif text-secondary-dark mb-2 text-center">
                  {feature.title}
                </h3>
                <p className="text-secondary text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programlar */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-serif text-center text-secondary-dark mb-16"
          >
            Eğitim Programları
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                key={program.id}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl 
                          transition-all duration-300 border border-cream-dark/10"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-serif text-secondary-dark mb-2">
                    {program.title}
                  </h3>
                  <p className="text-secondary mb-4">
                    {program.description}
                  </p>
                  <div className="flex justify-between items-center text-sm text-secondary-light mb-6">
                    <span className="flex items-center gap-1">
                      <FaClock className="text-primary" /> {program.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaUsers className="text-primary" /> {program.level}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-primary">₺</span> {program.price}
                    </span>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                    className="w-full bg-secondary hover:bg-secondary-dark text-white py-3 rounded-lg
                             font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Detaylı Bilgi Al
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeri */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-serif text-center text-secondary-dark mb-16"
          >
            Galeri
          </motion.h2>
          <div className="flex justify-center gap-4 mb-12">
            {['all', 'workshop', 'student'].map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeTab === tab 
                    ? 'bg-secondary text-white shadow-lg' 
                    : 'bg-cream text-secondary hover:bg-cream-dark'
                }`}
              >
                {tab === 'all' ? 'Tümü' : tab === 'workshop' ? 'Atölye' : 'Öğrenci Çalışmaları'}
              </motion.button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((image, index) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                key={image.id}
                className="group relative h-72 rounded-xl overflow-hidden shadow-lg hover:shadow-xl"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* İletişim */}
      <section id="contact" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-serif text-center text-secondary-dark mb-16"
          >
            İletişime Geçin
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-serif text-secondary-dark mb-6">
                Bize Ulaşın
              </h3>
              <div className="space-y-6">
                {[
                  { icon: <FaPhone className="text-2xl text-primary" />, title: "Telefon", value: contactInfo.phone },
                  { icon: <FaEnvelope className="text-2xl text-primary" />, title: "E-posta", value: contactInfo.email },
                  { icon: <FaMapMarkerAlt className="text-2xl text-primary" />, title: "Adres", value: contactInfo.address }
                ].map((item, index) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    {item.icon}
                    <div>
                      <h4 className="font-medium text-secondary-dark">{item.title}</h4>
                      <p className="text-secondary">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              onSubmit={handleContact} 
              className="space-y-6 bg-white p-8 rounded-xl shadow-lg"
            >
              {[
                { label: "Ad Soyad", type: "text" },
                { label: "E-posta", type: "email" },
                { label: "Telefon", type: "tel" }
              ].map((field, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  key={field.label}
                >
                  <label className="block text-secondary-dark mb-2">{field.label}</label>
                  <input
                    type={field.type}
                    className="w-full px-4 py-3 rounded-lg bg-cream border border-cream-dark
                             focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                             transition-all duration-300"
                    required
                  />
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <label className="block text-secondary-dark mb-2">Mesajınız</label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg bg-cream border border-cream-dark
                           focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                           transition-all duration-300 h-32"
                  required
                ></textarea>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-secondary hover:bg-secondary-dark text-white py-4 rounded-lg
                         font-medium transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Gönder
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WorkshopPage; 