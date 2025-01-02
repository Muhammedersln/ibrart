'use client';

import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const getPageTitle = () => {
    switch (pathname) {
      case '/admin':
        return 'Yönetim Paneli';
      case '/admin/add-artwork':
        return 'Yeni Eser Ekle';
      case '/admin/artworks':
        return 'Mevcut Eserler';
      case '/admin/products':
        return 'Ürün Yönetimi';
      default:
        return 'Yönetim Paneli';
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-gray-50" style={{ zIndex: 9999 }}>
      <AdminSidebar />
      <div className="lg:pl-64 h-full">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 lg:px-8">
          <div className="w-16 lg:hidden"></div>
          <h1 className="text-xl lg:text-2xl font-medium text-gray-800">
            {getPageTitle()}
          </h1>
          <div className="flex-1"></div>
        </header>

        {/* Main Content */}
        <div className="h-[calc(100%-4rem)] overflow-auto">
          <main className="h-full p-4 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
} 