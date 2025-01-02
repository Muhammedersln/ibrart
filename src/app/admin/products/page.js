'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  HiOutlineTrash, 
  HiOutlinePencil, 
  HiOutlineSearch, 
  HiOutlinePlus,
  HiOutlineStar,
  HiStar,
  HiOutlineAdjustments,
  HiViewGrid,
  HiViewList
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [isMobile, setIsMobile] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    featured: '',
  });
  const [sortBy, setSortBy] = useState('newest');

  const itemsPerPage = viewMode === 'grid' ? 9 : 8;
  const categories = ['Tümü', 'Karakalem', 'Yağlı Boya', 'Dijital', 'Heykel', 'Diğer'];
  const featuredOptions = [
    { value: '', label: 'Tümü' },
    { value: 'true', label: 'Öne Çıkan' },
    { value: 'false', label: 'Öne Çıkmayan' }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
      if (window.innerWidth < 640) {
        setViewMode('list');
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      toast.error('Ürünler yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Bu ürünü silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Ürün silinirken bir hata oluştu');
      }

      toast.success('Ürün başarıyla silindi');
      fetchProducts();
    } catch (error) {
      toast.error('Ürün silinirken bir hata oluştu');
    }
  };

  const handleEdit = (id) => {
    router.push(`/admin/products/edit/${id}`);
  };

  const handleToggleFeatured = async (id, currentFeatured) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ featured: !currentFeatured }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Öne çıkan durumu güncellenirken bir hata oluştu');
      }

      toast.success(
        !currentFeatured 
          ? 'Ürün öne çıkarıldı' 
          : 'Ürün öne çıkarılanlardan kaldırıldı'
      );
      fetchProducts();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = !filters.category || filters.category === 'Tümü' || product.category === filters.category;
      const matchesFeatured = !filters.featured || product.featured === (filters.featured === 'true');

      return matchesSearch && matchesCategory && matchesFeatured;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setFilters({
      category: '',
      featured: '',
    });
    setSearchTerm('');
    setSortBy('newest');
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-1 sm:mb-2">Ürünler</h1>
          <p className="text-sm sm:text-base text-gray-600">Toplam {filteredProducts.length} ürün bulundu</p>
        </div>
        
        <Link 
          href="/admin/add-product"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <HiOutlinePlus className="w-5 h-5" />
          Yeni Ürün Ekle
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {/* Search */}
          <div className="w-full sm:flex-1 min-w-[200px]">
            <div className="relative">
              <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Ürün ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 h-12 rounded-lg border-0 bg-white ring-1 ring-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex gap-2 sm:gap-4">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 sm:flex-none h-12 px-4 rounded-lg border-0 bg-white ring-1 ring-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all text-gray-600 text-sm sm:text-base"
            >
              <option value="newest">En Yeni</option>
              <option value="oldest">En Eski</option>
              <option value="title">İsme Göre</option>
              <option value="price-asc">Fiyat (Artan)</option>
              <option value="price-desc">Fiyat (Azalan)</option>
            </select>

            {/* View Mode Toggle - Hide on Mobile */}
            {!isMobile && (
              <div className="hidden sm:flex rounded-lg overflow-hidden ring-1 ring-gray-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`h-12 px-4 flex items-center gap-2 transition-all ${
                    viewMode === 'grid'
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-600 hover:text-primary'
                  }`}
                >
                  <HiViewGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`h-12 px-4 flex items-center gap-2 transition-all ${
                    viewMode === 'list'
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-600 hover:text-primary'
                  }`}
                >
                  <HiViewList className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`h-12 px-4 rounded-lg flex items-center gap-2 transition-all ${
                showFilters
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 hover:text-primary ring-1 ring-gray-200'
              }`}
            >
              <HiOutlineAdjustments className="w-5 h-5" />
              <span className="hidden sm:inline">Filtrele</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 bg-white rounded-lg ring-1 ring-gray-200 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                    <select
                      value={filters.category}
                      onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border-0 bg-cream-light ring-1 ring-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all"
                    >
                      {categories.map(category => (
                        <option key={category} value={category === 'Tümü' ? '' : category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Featured Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Öne Çıkan</label>
                    <select
                      value={filters.featured}
                      onChange={(e) => setFilters({ ...filters, featured: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border-0 bg-cream-light ring-1 ring-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all"
                    >
                      {featuredOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={resetFilters}
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    Filtreleri Temizle
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Products Grid/List */}
      {currentProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Ürün bulunamadı</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {currentProducts.map((product) => (
            <motion.div
              key={product._id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-lg ring-1 ring-gray-200 overflow-hidden group"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleEdit(product._id)}
                    className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
                  >
                    <HiOutlinePencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <HiOutlineTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{product.title}</h3>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>
                  <button
                    onClick={() => handleToggleFeatured(product._id, product.featured)}
                    className={`text-2xl ${product.featured ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'} transition-colors`}
                  >
                    {product.featured ? <HiStar /> : <HiOutlineStar />}
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-primary font-semibold">{product.price} ₺</p>
                  <p className="text-sm text-gray-600">Stok: {product.stock}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {currentProducts.map((product) => (
            <motion.div
              key={product._id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-lg ring-1 ring-gray-200 overflow-hidden"
            >
              <div className="flex items-center gap-4 p-4">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{product.title}</h3>
                      <p className="text-sm text-gray-600">{product.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleFeatured(product._id, product.featured)}
                        className={`text-2xl ${product.featured ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'} transition-colors`}
                      >
                        {product.featured ? <HiStar /> : <HiOutlineStar />}
                      </button>
                      <button
                        onClick={() => handleEdit(product._id)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
                      >
                        <HiOutlinePencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors"
                      >
                        <HiOutlineTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-primary font-semibold">{product.price} ₺</p>
                    <p className="text-sm text-gray-600">Stok: {product.stock}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                currentPage === page
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 hover:text-primary ring-1 ring-gray-200'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 