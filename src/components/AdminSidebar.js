'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { HiOutlinePhotograph, HiOutlinePlus, HiOutlineHome, HiOutlineMenu, HiOutlineX, HiOutlineLogout, HiOutlineStar, HiOutlineShoppingCart } from 'react-icons/hi';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Ekran genişliği değiştiğinde sidebar'ı otomatik kapat
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    {
      title: 'Ana Sayfa',
      href: '/admin',
      icon: HiOutlineHome
    },
    {
      title: 'Eserler',
      href: '/admin/artworks',
      icon: HiOutlinePhotograph
    },
    {
      title: 'Portfolyo',
      href: '/admin/portfolio',
      icon: HiOutlineStar
    },
    {
      title: 'Ürünler',
      href: '/admin/products',
      icon: HiOutlineShoppingCart
    }
  ];

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <>
      {/* Hamburger Menu Button - Mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-3 left-4 z-50 w-10 h-10 bg-transparent flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
      >
        {!isOpen && <HiOutlineMenu className="w-6 h-6" />}
      </button>

      {/* Overlay - Mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen bg-white z-40 transition-all duration-300 shadow-xl
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:shadow-none lg:z-30
          w-64 flex flex-col
        `}
      >
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-2xl font-serif text-secondary-dark">Admin Panel</h2>
          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
            >
              <HiOutlineX className="w-6 h-6" />
            </button>
          )}
        </div>
        
        <nav className="mt-6 flex-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-primary bg-primary/5 border-r-2 border-primary'
                    : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center px-6 py-4 text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary/5 transition-colors border-t border-gray-100"
        >
          <HiOutlineLogout className="w-5 h-5 mr-3" />
          Çıkış Yap
        </button>
      </div>
    </>
  );
} 