'use client'

import React from 'react';
import Image from 'next/image';
import { FaWhatsapp, FaPalette, FaUsers, FaClock, FaMedal } from 'react-icons/fa';

const WorkshopPage = () => {
  const workshops = [
    {
      id: 1,
      title: "Temel Resim Eğitimi",
      description: "Çizim tekniklerinin temelleri, ışık-gölge çalışmaları ve kompozisyon kurallarını öğrenin. Başlangıç seviyesi için ideal bir atölye deneyimi.",
      duration: "8 Hafta",
      schedule: "Her Cumartesi",
      level: "Başlangıç",
      image: "/images/workshops/basic-art.jpg"
    },
    {
      id: 2,
      title: "Yağlı Boya Atölyesi",
      description: "Yağlı boya tekniklerini keşfedin. Renk teorisi, fırça teknikleri ve profesyonel yaklaşımlarla eserler yaratın.",
      duration: "12 Hafta",
      schedule: "Her Pazar",
      level: "Orta",
      image: "/images/workshops/oil-painting.jpg"
    },
    {
      id: 3,
      title: "Portre Resim",
      description: "İnsan yüzünün anatomisi, portre teknikleri ve karakter çizimi üzerine detaylı eğitim.",
      duration: "10 Hafta",
      schedule: "Her Çarşamba",
      level: "İleri",
      image: "/images/workshops/portrait-art.jpg"
    }
  ];

  const handleWhatsApp = () => {
    window.open('https://wa.me/905XXXXXXXXX?text=Merhaba,%20atölye%20çalışmaları%20hakkında%20bilgi%20almak%20istiyorum.', '_blank');
  };

  return (
    <main className="min-h-screen ">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full">
        <Image
          src="/images/art-studio.jpg"
          alt="Sanat Atölyesi"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-serif text-cream-100 mb-6">
              Sanat Atölyesi
            </h1>
            <p className="text-cream-50 text-xl max-w-2xl mx-auto px-4 mb-8">
              Resim sanatının inceliklerini keşfedin, yaratıcılığınızı özgür bırakın
            </p>
            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-2 mx-auto bg-gold-500 hover:bg-gold-600 
                       text-green-950 px-8 py-4 rounded-lg transition-all duration-300
                       shadow-lg hover:shadow-xl font-medium"
            >
              <FaWhatsapp className="text-2xl" />
              <span>Bilgi Al</span>
            </button>
          </div>
        </div>
      </div>

      {/* Atölye Bilgileri */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-green-950 mb-6">Atölye Programları</h2>
          <p className="text-green-800 max-w-3xl mx-auto">
            Her seviyeye uygun, profesyonel eğitmen eşliğinde küçük gruplarla resim dersleri. 
            Sizin için en uygun programı seçin ve sanat yolculuğunuza başlayın.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workshops.map((workshop) => (
            <div 
              key={workshop.id}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl 
                        transition-all duration-300 border border-green-100"
            >
              <div className="relative h-64">
                <Image
                  src={workshop.image}
                  alt={workshop.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-serif text-green-950 mb-3">
                  {workshop.title}
                </h3>
                <p className="text-green-800 text-sm mb-6">
                  {workshop.description}
                </p>
                
                <div className="grid grid-cols-3 gap-3 mb-6 text-sm">
                  <div className="text-center p-2 bg-cream-100 rounded-lg">
                    <div className="font-medium text-green-950">{workshop.duration}</div>
                    <div className="text-xs text-green-800">Süre</div>
                  </div>
                  <div className="text-center p-2 bg-cream-100 rounded-lg">
                    <div className="font-medium text-green-950">{workshop.schedule}</div>
                    <div className="text-xs text-green-800">Program</div>
                  </div>
                  <div className="text-center p-2 bg-cream-100 rounded-lg">
                    <div className="font-medium text-green-950">{workshop.level}</div>
                    <div className="text-xs text-green-800">Seviye</div>
                  </div>
                </div>

                <button 
                  onClick={handleWhatsApp}
                  className="w-full flex items-center justify-center gap-2 bg-gold-500 
                           hover:bg-gold-600 text-green-950 font-medium py-3 rounded-lg 
                           transition-colors duration-300"
                >
                  <FaWhatsapp className="text-xl" />
                  <span>İletişime Geç</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Atölye Özellikleri */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <FaUsers className="text-3xl text-gold-500" />,
              title: "Küçük Gruplar",
              description: "Maksimum 6 kişilik gruplarla birebir ilgilenme imkanı"
            },
            {
              icon: <FaPalette className="text-3xl text-gold-500" />,
              title: "Tüm Malzemeler Dahil",
              description: "Profesyonel kalitede malzemelerle çalışma fırsatı"
            },
            {
              icon: <FaClock className="text-3xl text-gold-500" />,
              title: "Esnek Program",
              description: "Size uygun programda ders planlama imkanı"
            },
            {
              icon: <FaMedal className="text-3xl text-gold-500" />,
              title: "Sergi İmkanı",
              description: "Dönem sonu öğrenci sergisinde eser sergileme fırsatı"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-white rounded-xl shadow-md border border-green-100"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-serif text-green-950 mb-3">{feature.title}</h3>
              <p className="text-green-800">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default WorkshopPage; 