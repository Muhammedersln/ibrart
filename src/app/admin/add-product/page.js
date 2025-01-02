'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { HiOutlineUpload, HiOutlineSave, HiOutlineX, HiPlus } from 'react-icons/hi';
import Image from 'next/image';

export default function AddProduct() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [product, setProduct] = useState({
    title: '',
    category: '',
    price: '',
    imageUrl: '',
    description: '',
    stock: '',
    featured: false
  });

  const categories = [
    'Karakalem',
    'Yağlı Boya',
    'Dijital',
    'Heykel',
    'Diğer'
  ];

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.secure_url) {
        setProduct(prev => ({
          ...prev,
          imageUrl: data.secure_url
        }));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Resim yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!product.imageUrl) {
      alert('Lütfen bir resim yükleyin');
      return;
    }

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        router.push('/admin/products');
      } else {
        console.error('Ürün eklenirken hata oluştu');
      }
    } catch (error) {
      console.error('Ürün ekleme sırasında hata:', error);
    }
  };

  const removeImage = () => {
    setProduct(prev => ({
      ...prev,
      imageUrl: ''
    }));
  };

  return (
    <div className="flex min-h-screen bg-cream-light">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 animate-fade-in">
            <h1 className="text-3xl font-serif text-secondary-dark mb-6 flex items-center gap-3">
              <HiPlus className="w-8 h-8 text-primary" />
              Yeni Ürün Ekle
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sol Kolon */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Ürün Adı
                    </label>
                    <input
                      type="text"
                      value={product.title}
                      onChange={(e) => setProduct({ ...product, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-cream-dark focus:outline-none focus:ring-2 focus:ring-primary/20 bg-cream-light"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Kategori
                    </label>
                    <select
                      value={product.category}
                      onChange={(e) => setProduct({ ...product, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-cream-dark focus:outline-none focus:ring-2 focus:ring-primary/20 bg-cream-light"
                      required
                    >
                      <option value="">Kategori Seçin</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">
                        Fiyat (₺)
                      </label>
                      <input
                        type="number"
                        value={product.price}
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-cream-dark focus:outline-none focus:ring-2 focus:ring-primary/20 bg-cream-light"
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">
                        Stok Adedi
                      </label>
                      <input
                        type="number"
                        value={product.stock}
                        onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-cream-dark focus:outline-none focus:ring-2 focus:ring-primary/20 bg-cream-light"
                        required
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Sağ Kolon */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Ürün Görseli
                    </label>
                    <div className="relative">
                      {product.imageUrl ? (
                        <div className="relative">
                          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                            <Image
                              src={product.imageUrl}
                              alt="Preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-white transition-all shadow-lg"
                          >
                            <HiOutlineX className="w-6 h-6" />
                          </button>
                        </div>
                      ) : (
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            required
                          />
                          <div className="aspect-[4/3] rounded-lg border-2 border-dashed border-cream-dark flex flex-col items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors">
                            <HiOutlineUpload className="w-10 h-10 lg:w-12 lg:h-12 mb-3" />
                            <span className="text-sm font-medium text-center px-4">Resim yüklemek için tıklayın</span>
                            <span className="text-xs mt-1 hidden sm:block">veya sürükleyip bırakın</span>
                          </div>
                        </div>
                      )}
                      
                      {uploading && (
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
                          <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent"></div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Ürün Açıklaması
                    </label>
                    <textarea
                      value={product.description}
                      onChange={(e) => setProduct({ ...product, description: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-cream-dark focus:outline-none focus:ring-2 focus:ring-primary/20 bg-cream-light"
                      rows="5"
                      required
                    />
                  </div>

                  <div className="flex items-center bg-cream-light p-4 rounded-xl">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={product.featured}
                      onChange={(e) => setProduct({ ...product, featured: e.target.checked })}
                      className="w-5 h-5 rounded border-cream-dark text-primary focus:ring-primary/20"
                    />
                    <label htmlFor="featured" className="ml-3 text-sm font-medium text-secondary">
                      Öne Çıkan Ürün
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-cream-dark/10">
                <button
                  type="button"
                  onClick={() => router.push('/admin/products')}
                  className="px-6 py-3 rounded-xl bg-cream hover:bg-cream-dark/10 text-secondary-dark font-medium transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-medium transition-colors flex items-center gap-2"
                >
                  <HiOutlineSave className="w-5 h-5" />
                  Ürün Ekle
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 