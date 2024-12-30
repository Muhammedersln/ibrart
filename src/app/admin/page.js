'use client';

import { useState, useEffect } from 'react';
import { HiOutlinePhotograph, HiOutlinePlus } from 'react-icons/hi';
import Link from 'next/link';

export default function AdminPage() {
  const [stats, setStats] = useState({
    totalArtworks: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/artworks');
      const data = await response.json();
      setStats({
        totalArtworks: data.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const cards = [
    {
      title: 'Eser Ekle',
      description: 'Yeni bir eser eklemek için tıklayın',
      icon: HiOutlinePlus,
      href: '/admin/add-artwork',
      color: 'bg-green-500'
    },
    {
      title: 'Mevcut Eserler',
      description: `Toplam ${stats.totalArtworks} eser`,
      icon: HiOutlinePhotograph,
      href: '/admin/artworks',
      color: 'bg-blue-500'
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-serif text-secondary-dark mb-8">
        Hoş Geldiniz
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center mb-4`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-medium text-secondary-dark mb-2">{card.title}</h2>
            <p className="text-gray-600">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
} 