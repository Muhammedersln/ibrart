import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold text-gray-700">Sayfa Bulunamadı</h2>
          <p className="text-gray-600">Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
        </div>
        <div className="mt-8">
          <Link 
            href="/" 
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
        <div className="mt-8">
          <div className="w-24 h-24 mx-auto">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              className="w-full h-full text-gray-400"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5}
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}