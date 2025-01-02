'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { HiOutlineUpload, HiOutlineSave, HiOutlineX, HiOutlineTrash, HiArrowLeft } from 'react-icons/hi';
import { motion } from 'framer-motion';

export default function EditProduct({ params }) {
  const router = useRouter();
  const { id } = params;
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({
    title: '',
    category: '',
    price: '',
    imageUrl: '',
    description: '',
    stock: '',
    featured: false
  });

  const categories = ['Karakalem', 'Yağlı Boya', 'Dijital', 'Heykel', 'Diğer'];

  const fetchProduct = useCallback(async () => {
    try {
      const response = await fetch(`/api/products/${id}`);
      if (!response.ok) {
        throw new Error('Ürün yüklenirken hata oluştu');
      }
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      toast.error(error.message);
      router.push('/admin/products');
    } finally {
      setLoading(false);
    }
  }, [id, router]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

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
        toast.success('Görsel başarıyla yüklendi');
      }
    } catch (error) {
      toast.error('Görsel yüklenirken hata oluştu');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!product.imageUrl) {
      toast.error('Lütfen bir görsel yükleyin');
      return;
    }

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Ürün güncellenirken hata oluştu');
      }

      toast.success('Ürün başarıyla güncellendi');
      router.push('/admin/products');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Bu ürünü silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Ürün silinirken hata oluştu');
      }

      toast.success('Ürün başarıyla silindi');
      router.push('/admin/products');
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-cream-light">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <button
            onClick={() => router.push('/admin/products')}
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
          >
            <HiArrowLeft className="w-5 h-5" />
            <span>Geri Dön</span>
          </button>

          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <HiOutlineTrash className="w-5 h-5" />
            <span>Ürünü Sil</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-[1fr,400px] gap-6 lg:gap-8">
          {/* Image Upload Section */}
          <div className="bg-white rounded-lg p-4 lg:p-6 h-fit order-1 lg:order-none">
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
                    onClick={() => setProduct({ ...product, imageUrl: '' })}
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
                  />
                  <div className="aspect-[4/3] rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors">
                    <HiOutlineUpload className="w-10 h-10 lg:w-12 lg:h-12 mb-3" />
                    <span className="text-sm font-medium text-center px-4">Görsel yüklemek için tıklayın</span>
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
            {/* Title */}
            <div>
              <input
                type="text"
                value={product.title}
                onChange={(e) => setProduct({ ...product, title: e.target.value })}
                required
                className="w-full px-4 h-12 rounded-lg border-0 bg-white ring-1 ring-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all text-gray-800 font-medium"
                placeholder="Ürün başlığı"
              />
            </div>

            {/* Category & Price */}
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              <select
                value={product.category}
                onChange={(e) => setProduct({ ...product, category: e.target.value })}
                required
                className="h-12 rounded-lg border-0 bg-white ring-1 ring-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all text-gray-600"
              >
                <option value="">Kategori Seçin</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <input
                type="number"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                required
                min="0"
                step="0.01"
                className="h-12 rounded-lg border-0 bg-white ring-1 ring-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all text-gray-600"
                placeholder="Fiyat"
              />
            </div>

            {/* Stock */}
            <div>
              <input
                type="number"
                value={product.stock}
                onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                required
                min="0"
                className="w-full px-4 h-12 rounded-lg border-0 bg-white ring-1 ring-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all text-gray-600"
                placeholder="Stok adedi"
              />
            </div>

            {/* Description */}
            <div className="space-y-3 lg:space-y-4">
              <textarea
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                required
                rows="3"
                className="w-full px-4 py-3 rounded-lg border-0 bg-white ring-1 ring-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all resize-none text-gray-600"
                placeholder="Ürün açıklaması"
              />

              <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg ring-1 ring-gray-200">
                <input
                  type="checkbox"
                  id="featured"
                  checked={product.featured}
                  onChange={(e) => setProduct({ ...product, featured: e.target.checked })}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="featured" className="text-sm text-gray-600">
                  Öne Çıkan Ürün
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full h-12 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
            >
              <HiOutlineSave className="w-5 h-5" />
              Değişiklikleri Kaydet
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
} 