'use client';

import { useState, useEffect, use, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { HiOutlineUpload, HiOutlineSave, HiOutlineX } from 'react-icons/hi';

export default function EditArtworkPage({ params }) {
  const id = use(Promise.resolve(params.id));
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Aile',
    size: '25x35',
    personCount: 'Tekli',
    teknik: 'Karakalem',
    imageUrl: '',
    description: '',
    details: ''
  });

  const categories = ['Aile', 'Çift', 'Tek Portre', 'Karışık', 'Birleştirme Çizim', 'Duvar Resmi'];
  const sizes = ['25x35', '35x50', '50x70'];
  const teknikler = ['Karakalem', 'Renkli', 'Yağlı'];
  
  const personCountOptions = useMemo(() => ({
    '25x35': ['Tekli'],
    '35x50': ['Tekli', 'İkili', 'Üçlü'],
    '50x70': ['Tekli', 'İkili', 'Üçlü', 'Dörtlü', 'Beşli', 'Altılı']
  }), []);

  const fetchArtwork = useCallback(async () => {
    try {
      const response = await fetch(`/api/artworks?id=${id}`);
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error('Error fetching artwork:', error);
      alert('Eser bilgileri yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  }, [id, setFormData, setLoading]);

  useEffect(() => {
    fetchArtwork();
  }, [fetchArtwork]);

  useEffect(() => {
    // Boyut değiştiğinde, eğer mevcut kişi sayısı yeni boyut için geçerli değilse
    // kişi sayısını o boyut için geçerli ilk değere ayarla
    if (!personCountOptions[formData.size].includes(formData.personCount)) {
      setFormData(prev => ({
        ...prev,
        personCount: personCountOptions[formData.size][0]
      }));
    }
  }, [formData.size, formData.personCount, personCountOptions]);

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
        setFormData(prev => ({
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
    
    if (!formData.imageUrl) {
      alert('Lütfen bir resim yükleyin');
      return;
    }

    try {
      const response = await fetch(`/api/artworks?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update artwork');
      }

      alert('Eser başarıyla güncellendi!');
      router.push('/admin/artworks');
    } catch (error) {
      console.error('Error updating artwork:', error);
      alert('Hata: ' + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      imageUrl: ''
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-[1fr,400px] gap-6 lg:gap-8">
          {/* Image Upload Section */}
          <div className="bg-white rounded-lg p-4 lg:p-6 h-fit order-1 lg:order-none">
            <div className="relative">
              {formData.imageUrl ? (
                <div className="relative">
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src={formData.imageUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
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
                    required
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="aspect-[4/3] rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors">
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
            {/* Title */}
            <div>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 h-12 rounded-lg border-0 bg-white ring-1 ring-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all text-gray-800 font-medium"
                placeholder="Eser başlığı"
              />
            </div>

            {/* Category & Size */}
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="h-12 rounded-lg border-0 bg-white ring-1 ring-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all text-gray-600"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                name="size"
                value={formData.size}
                onChange={handleChange}
                required
                className="h-12 rounded-lg border-0 bg-white ring-1 ring-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all text-gray-600"
              >
                {sizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            {/* Person Count & Technique */}
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              <select
                name="personCount"
                value={formData.personCount}
                onChange={handleChange}
                required
                className="h-12 rounded-lg border-0 bg-white ring-1 ring-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all text-gray-600"
              >
                {personCountOptions[formData.size].map(count => (
                  <option key={count} value={count}>{count}</option>
                ))}
              </select>

              <select
                name="teknik"
                value={formData.teknik}
                onChange={handleChange}
                required
                className="h-12 rounded-lg border-0 bg-white ring-1 ring-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all text-gray-600"
              >
                {teknikler.map(teknik => (
                  <option key={teknik} value={teknik}>{teknik}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border-0 bg-white ring-1 ring-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                placeholder="Eser açıklaması"
              />
            </div>

            {/* Details */}
            <div>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border-0 bg-white ring-1 ring-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                placeholder="Eser detayları"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-12 bg-primary text-white rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
            >
              <HiOutlineSave className="w-5 h-5" />
              <span>Güncelle</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 