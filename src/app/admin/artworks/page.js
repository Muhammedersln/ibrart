'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { HiOutlineTrash, HiOutlinePencil, HiOutlineSearch } from 'react-icons/hi';

export default function ArtworksPage() {
  const router = useRouter();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {
      const response = await fetch('/api/artworks');
      const data = await response.json();
      setArtworks(data);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Bu eseri silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/artworks?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Eser silinirken bir hata oluştu');
      }

      fetchArtworks();
    } catch (error) {
      console.error('Error deleting artwork:', error);
      alert('Eser silinirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const handleEdit = (id) => {
    router.push(`/admin/artworks/edit/${id}`);
  };

  const filteredArtworks = artworks.filter(artwork => 
    artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artwork.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artwork.teknik.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="h-full">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Eser ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 h-12 rounded-lg border-0 bg-white ring-1 ring-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all"
          />
        </div>
      </div>

      {/* Artworks Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredArtworks.map((artwork) => (
          <div
            key={artwork._id}
            className="bg-white rounded-lg overflow-hidden group"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={artwork.imageUrl}
                alt={artwork.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-medium mb-1 line-clamp-1">
                    {artwork.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs text-white">
                      {artwork.category}
                    </span>
                    <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs text-white">
                      {artwork.size}
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(artwork._id)}
                  className="w-8 h-8 rounded-full bg-white/90 text-gray-600 hover:text-primary hover:bg-white transition-all flex items-center justify-center shadow-lg"
                >
                  <HiOutlinePencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(artwork._id)}
                  className="w-8 h-8 rounded-full bg-white/90 text-gray-600 hover:text-red-500 hover:bg-white transition-all flex items-center justify-center shadow-lg"
                >
                  <HiOutlineTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredArtworks.length === 0 && (
        <div className="text-center py-12">
          {searchTerm ? (
            <p className="text-gray-500">Arama sonucunda eser bulunamadı.</p>
          ) : (
            <p className="text-gray-500">Henüz hiç eser eklenmemiş.</p>
          )}
        </div>
      )}
    </div>
  );
} 