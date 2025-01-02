'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { HiOutlineUpload, HiOutlinePhotograph, HiOutlineX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

export default function EditArtworkPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [artwork, setArtwork] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    size: '',
    personCount: '',
    teknik: '',
    imageUrl: '',
    description: '',
    details: '',
    featured: false,
  });
  const [previewImage, setPreviewImage] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const categories = ['Aile', 'Çift', 'Tek Portre', 'Karışık', 'Birleştirme Çizim', 'Duvar Resmi'];
  const sizes = ['25x35', '35x50', '50x70'];
  const teknikler = ['Karakalem', 'Renkli', 'Yağlı'];

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const id = window.location.pathname.split('/').pop();
        const response = await fetch(`/api/artworks/${id}`);
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.error || 'Eser yüklenirken bir hata oluştu');
        }
  
        setArtwork(data);
        setFormData({
          title: data.title,
          category: data.category,
          size: data.size,
          personCount: data.personCount,
          teknik: data.teknik,
          imageUrl: data.imageUrl,
          description: data.description,
          details: data.details,
          featured: data.featured,
        });
        setPreviewImage(data.imageUrl);
      } catch (error) {
        toast.error('Eser yüklenirken bir hata oluştu');
        router.push('/admin/artworks');
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [router]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let imageUrl = formData.imageUrl;

      // Upload new image if selected
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append('file', imageFile);
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: imageFormData,
        });

        if (!uploadResponse.ok) {
          throw new Error('Resim yüklenirken bir hata oluştu');
        }

        const uploadData = await uploadResponse.json();
        imageUrl = uploadData.url;
      }

      // Update artwork
      const id = window.location.pathname.split('/').pop();
      const response = await fetch(`/api/artworks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          imageUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Eser güncellenirken bir hata oluştu');
      }

      toast.success('Eser başarıyla güncellendi');
      router.push('/admin/artworks');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
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
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-1 sm:mb-2">Eser Düzenle</h1>
        <p className="text-sm sm:text-base text-gray-600">Eser bilgilerini güncelleyebilirsiniz</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        {/* Image Upload */}
        <div className="bg-white p-4 sm:p-6 rounded-lg ring-1 ring-gray-200">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Eser Görseli</h2>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="relative aspect-[4/3] w-full sm:w-96 bg-gray-100 rounded-lg overflow-hidden">
              {previewImage ? (
                <>
                  <Image
                    src={previewImage}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewImage('');
                      setImageFile(null);
                    }}
                    className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <HiOutlineX className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                  <HiOutlinePhotograph className="w-12 h-12 mb-2" />
                  <span className="text-sm">Görsel Yok</span>
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <label className="w-full sm:w-auto">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <div className="h-12 px-6 flex items-center justify-center gap-2 bg-white text-gray-600 hover:text-primary ring-1 ring-gray-200 hover:ring-primary rounded-lg cursor-pointer transition-all">
                  <HiOutlineUpload className="w-5 h-5" />
                  <span>Yeni Görsel Seç</span>
                </div>
              </label>
              <p className="mt-2 text-sm text-gray-500">
                PNG, JPG veya JPEG. Maksimum 5MB.
              </p>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-white p-4 sm:p-6 rounded-lg ring-1 ring-gray-200">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Temel Bilgiler</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Başlık
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full h-12 px-4 rounded-lg border-0 bg-gray-50 ring-1 ring-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kategori
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full h-12 px-4 rounded-lg border-0 bg-gray-50 ring-1 ring-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all"
                required
              >
                <option value="">Seçiniz</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Boyut
              </label>
              <select
                value={formData.size}
                onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
                className="w-full h-12 px-4 rounded-lg border-0 bg-gray-50 ring-1 ring-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all"
                required
              >
                <option value="">Seçiniz</option>
                {sizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teknik
              </label>
              <select
                value={formData.teknik}
                onChange={(e) => setFormData(prev => ({ ...prev, teknik: e.target.value }))}
                className="w-full h-12 px-4 rounded-lg border-0 bg-gray-50 ring-1 ring-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all"
                required
              >
                <option value="">Seçiniz</option>
                {teknikler.map(teknik => (
                  <option key={teknik} value={teknik}>{teknik}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kişi Sayısı
              </label>
              <input
                type="number"
                min="1"
                value={formData.personCount}
                onChange={(e) => setFormData(prev => ({ ...prev, personCount: e.target.value }))}
                className="w-full h-12 px-4 rounded-lg border-0 bg-gray-50 ring-1 ring-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all"
                required
              />
            </div>

            <div className="flex items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                <span className="ml-3 text-sm font-medium text-gray-700">Portfolyoda Göster</span>
              </label>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white p-4 sm:p-6 rounded-lg ring-1 ring-gray-200">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Açıklamalar</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kısa Açıklama
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full h-12 px-4 rounded-lg border-0 bg-gray-50 ring-1 ring-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Detaylı Açıklama
              </label>
              <textarea
                value={formData.details}
                onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
                rows={4}
                className="w-full p-4 rounded-lg border-0 bg-gray-50 ring-1 ring-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto px-6 h-12 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Kaydediliyor...</span>
              </>
            ) : (
              'Değişiklikleri Kaydet'
            )}
          </button>

          <button
            type="button"
            onClick={() => router.push('/admin/artworks')}
            className="w-full sm:w-auto px-6 h-12 bg-white text-gray-600 hover:text-primary ring-1 ring-gray-200 hover:ring-primary rounded-lg transition-all flex items-center justify-center"
          >
            İptal
          </button>
        </div>
      </form>
    </div>
  );
} 