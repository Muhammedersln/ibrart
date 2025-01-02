'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { 
  HiOutlineSearch, 
  HiOutlineStar, 
  HiStar, 
  HiOutlineAdjustments,
  HiViewGrid,
  HiViewList,
  HiOutlinePencil,
  HiOutlineTrash
} from 'react-icons/hi'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function PortfolioPage() {
  const router = useRouter()
  const [artworks, setArtworks] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState('grid')
  const [isMobile, setIsMobile] = useState(false)
  const [filters, setFilters] = useState({
    category: '',
    size: '',
    teknik: '',
  })
  const [sortBy, setSortBy] = useState('newest')

  const itemsPerPage = viewMode === 'grid' ? 9 : 8
  const categories = ['Tümü', 'Aile', 'Çift', 'Tek Portre', 'Karışık', 'Birleştirme Çizim', 'Duvar Resmi']
  const sizes = ['Tümü', '25x35', '35x50', '50x70']
  const teknikler = ['Tümü', 'Karakalem', 'Renkli', 'Yağlı']

  useEffect(() => {
    fetchArtworks()
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
      if (window.innerWidth < 640) {
        setViewMode('list')
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const fetchArtworks = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/artworks?portfolio=true')
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Eserler yüklenirken bir hata oluştu')
      }
      
      setArtworks(data)
    } catch (error) {
      toast.error('Eserler yüklenirken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleFeatured = async (id, currentFeatured) => {
    try {
      const response = await fetch(`/api/artworks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ featured: !currentFeatured }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Portfolyo durumu güncellenirken bir hata oluştu')
      }

      toast.success(!currentFeatured ? 'Eser portfolyodan çıkarıldı' : 'Eser portfolyoya eklendi')
      fetchArtworks()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleEdit = (id) => {
    router.push(`/admin/artworks/edit/${id}`)
  }

  const filteredArtworks = artworks
    .filter(artwork => {
      const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artwork.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artwork.teknik.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = !filters.category || filters.category === 'Tümü' || artwork.category === filters.category
      const matchesSize = !filters.size || filters.size === 'Tümü' || artwork.size === filters.size
      const matchesTeknik = !filters.teknik || filters.teknik === 'Tümü' || artwork.teknik === filters.teknik

      return matchesSearch && matchesCategory && matchesSize && matchesTeknik
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt)
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt)
        case 'title':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

  const totalPages = Math.ceil(filteredArtworks.length / itemsPerPage)
  const currentArtworks = filteredArtworks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const resetFilters = () => {
    setFilters({
      category: '',
      size: '',
      teknik: '',
    })
    setSearchTerm('')
    setSortBy('newest')
    setCurrentPage(1)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-1 sm:mb-2">Portfolyo Yönetimi</h1>
        <p className="text-sm sm:text-base text-gray-600">Portfolyoda {filteredArtworks.length} eser gösteriliyor</p>
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
                placeholder="Eser ara..."
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
                  ? 'bg-primary text-white ring-0' 
                  : 'bg-white ring-1 ring-gray-200 text-gray-600 hover:ring-primary'
              }`}
            >
              <HiOutlineAdjustments className="w-5 h-5" />
              <span className="hidden sm:inline">Filtreler</span>
            </button>
          </div>
        </div>

        {/* Filter Options */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 bg-white p-4 rounded-lg ring-1 ring-gray-200">
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="h-12 px-4 rounded-lg border-0 bg-white ring-1 ring-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all text-gray-600"
                >
                  <option value="">Kategori Seçin</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                <select
                  value={filters.size}
                  onChange={(e) => setFilters(prev => ({ ...prev, size: e.target.value }))}
                  className="h-12 px-4 rounded-lg border-0 bg-white ring-1 ring-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all text-gray-600"
                >
                  <option value="">Boyut Seçin</option>
                  {sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>

                <select
                  value={filters.teknik}
                  onChange={(e) => setFilters(prev => ({ ...prev, teknik: e.target.value }))}
                  className="h-12 px-4 rounded-lg border-0 bg-white ring-1 ring-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all text-gray-600"
                >
                  <option value="">Teknik Seçin</option>
                  {teknikler.map(teknik => (
                    <option key={teknik} value={teknik}>{teknik}</option>
                  ))}
                </select>

                <button
                  onClick={resetFilters}
                  className="h-12 px-4 rounded-lg text-gray-600 hover:text-primary hover:ring-primary ring-1 ring-gray-200 transition-all sm:col-span-2 lg:col-span-3"
                >
                  Filtreleri Temizle
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Artworks */}
      {currentArtworks.length > 0 ? (
        <>
          {(!isMobile && viewMode === 'grid') ? (
            // Grid View - Only on Desktop
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {currentArtworks.map((artwork) => (
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent pointer-events-none sm:hidden" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-medium mb-1 line-clamp-1">
                        {artwork.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs text-white">
                          {artwork.category}
                        </span>
                        <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs text-white">
                          {artwork.size}
                        </span>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2 opacity-100 transition-all">
                      <button
                        onClick={() => handleToggleFeatured(artwork._id, artwork.featured)}
                        className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg transition-all transform hover:scale-110"
                      >
                        <HiStar className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(artwork._id)}
                        className="w-8 h-8 rounded-full bg-white/90 text-gray-600 hover:text-primary hover:bg-white transition-all flex items-center justify-center shadow-lg"
                      >
                        <HiOutlinePencil className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List View - Mobile Optimized
            <div className="space-y-3 sm:space-y-4">
              {currentArtworks.map((artwork) => (
                <div
                  key={artwork._id}
                  className="bg-white rounded-lg overflow-hidden group hover:ring-2 hover:ring-primary transition-all"
                >
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                      <Image
                        src={artwork.imageUrl}
                        alt={artwork.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-800 mb-1 line-clamp-1 text-sm sm:text-base">
                        {artwork.title}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                        <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 rounded text-xs text-gray-600">
                          {artwork.category}
                        </span>
                        <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 rounded text-xs text-gray-600">
                          {artwork.size}
                        </span>
                        <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 rounded text-xs text-gray-600">
                          {artwork.teknik}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500 line-clamp-1">
                        {artwork.description}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
                      <button
                        onClick={() => handleToggleFeatured(artwork._id, artwork.featured)}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary text-white flex items-center justify-center transition-all"
                      >
                        <HiStar className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <button
                        onClick={() => handleEdit(artwork._id)}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-100 text-gray-600 hover:text-primary hover:bg-gray-50 transition-all flex items-center justify-center"
                      >
                        <HiOutlinePencil className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination - Mobile Optimized */}
          {totalPages > 1 && (
            <div className="mt-6 sm:mt-8 flex justify-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 sm:px-4 h-9 sm:h-10 rounded-lg bg-white ring-1 ring-gray-200 text-gray-600 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:ring-primary transition-all"
              >
                Önceki
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 sm:w-10 h-9 sm:h-10 text-sm rounded-lg ${
                    currentPage === page
                      ? 'bg-primary text-white'
                      : 'bg-white ring-1 ring-gray-200 text-gray-600 hover:ring-primary'
                  } transition-all`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 sm:px-4 h-9 sm:h-10 rounded-lg bg-white ring-1 ring-gray-200 text-gray-600 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:ring-primary transition-all"
              >
                Sonraki
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-sm sm:text-base text-gray-500">
            {searchTerm || Object.values(filters).some(Boolean)
              ? 'Arama kriterlerine uygun eser bulunamadı.'
              : 'Henüz portfolyoda eser bulunmuyor.'}
          </p>
        </div>
      )}
    </div>
  )
} 