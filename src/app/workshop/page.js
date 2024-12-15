import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

const WorkshopPage = () => {
  const workshops = [
    {
      id: 1,
      title: "Doğa Fotoğrafçılığı",
      description: "Doğanın muhteşem anlarını yakalamayı öğrenin. Işık, kompozisyon ve ekipman kullanımı hakkında detaylı eğitim.",
      date: "15 Haziran 2024",
      duration: "2 Gün",
      level: "Başlangıç - Orta",
      image: "/images/workshops/nature.jpg"
    },
    {
      id: 2,
      title: "Portre Fotoğrafçılığı",
      description: "Portre çekimlerinde ışık kullanımı, poz verme teknikleri ve post-processing eğitimi.",
      date: "22 Haziran 2024",
      duration: "3 Gün",
      level: "Orta - İleri",
      image: "/images/workshops/portrait.jpg"
    },
    {
      id: 3,
      title: "Gece Fotoğrafçılığı",
      description: "Gece çekimlerinde uzun pozlama teknikleri, yıldız fotoğrafçılığı ve şehir ışıkları.",
      date: "1 Temmuz 2024",
      duration: "2 Gün",
      level: "İleri",
      image: "/images/workshops/night.jpg"
    }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-green-900">
        {/* Hero Section */}
        <div className="relative h-[60vh] w-full">
          <Image
            src="/images/workshop-hero.jpg"
            alt="Workshop Hero"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-serif text-gold-500 mb-4">
                Fotoğraf Atölyeleri
              </h1>
              <p className="text-cream-100 text-lg max-w-2xl mx-auto px-4">
                Fotoğrafçılık tutkunuzu profesyonel seviyeye taşıyın
              </p>
            </div>
          </div>
        </div>

        {/* Workshops Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workshops.map((workshop) => (
              <div 
                key={workshop.id}
                className="group relative bg-green-800/30 backdrop-blur-sm rounded-xl overflow-hidden 
                          border border-green-700/30 hover:border-gold-500/50
                          hover:shadow-xl hover:shadow-black/20 transition-all duration-300"
              >
                <div className="relative h-72">
                  <Image
                    src={workshop.image}
                    alt={workshop.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/95 to-transparent" />
                </div>
                
                <div className="absolute bottom-0 w-full p-6 text-cream-100">
                  <h3 className="text-2xl font-serif text-gold-500 mb-2">
                    {workshop.title}
                  </h3>
                  <p className="text-cream-100/90 text-sm mb-4 line-clamp-2">
                    {workshop.description}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
                    <div className="text-center p-2 bg-green-800/40 rounded-lg backdrop-blur-sm">
                      <div className="font-medium text-gold-500">{workshop.date}</div>
                      <div className="text-xs text-cream-100/70">Tarih</div>
                    </div>
                    <div className="text-center p-2 bg-green-800/40 rounded-lg backdrop-blur-sm">
                      <div className="font-medium text-gold-500">{workshop.duration}</div>
                      <div className="text-xs text-cream-100/70">Süre</div>
                    </div>
                    <div className="text-center p-2 bg-green-800/40 rounded-lg backdrop-blur-sm">
                      <div className="font-medium text-gold-500">{workshop.level}</div>
                      <div className="text-xs text-cream-100/70">Seviye</div>
                    </div>
                  </div>

                  <button className="w-full bg-gold-500 hover:bg-gold-600 text-green-950 
                                   font-medium py-3 rounded-lg transition-colors duration-300">
                    Detaylı Bilgi ve Kayıt
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default WorkshopPage; 