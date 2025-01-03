import Image from 'next/image'
import Link from 'next/link'
import dbConnect from '@/lib/mongodb'
import Artwork from '@/models/Artwork'

export default async function ArtworkDetail({ params }) {
  await dbConnect()
  const artwork = await Artwork.findById(params.id)

  if (!artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Eser bulunamadı.
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-cream-light py-20">
      <div className="container mx-auto px-4">
        <Link 
          href="/gallery"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-sm
            text-secondary-dark/60 hover:text-secondary-dark transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Galeriye Dön</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
          {/* Sol Kolon - Görsel */}
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl group">
            <Image
              src={artwork.imageUrl}
              alt={artwork.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Sağ Kolon - Detaylar */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {artwork.category}
                </span>
                <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
                  {artwork.personCount} Kişilik
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-secondary-dark mb-4">
                {artwork.title}
              </h1>
              <p className="text-secondary-dark/80 text-lg leading-relaxed">
                {artwork.description}
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
                    </svg>
                    <h3 className="font-medium">Boyut</h3>
                  </div>
                  <p className="text-secondary-dark">{artwork.size}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <h3 className="font-medium">Teknik</h3>
                  </div>
                  <p className="text-secondary-dark">{artwork.teknik}</p>
                </div>
              </div>

              {artwork.details && (
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center gap-2 text-primary mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="font-medium">Detaylar</h3>
                  </div>
                  <div className="text-secondary-dark whitespace-pre-line">
                    {artwork.details}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6">
              <a 
                href={`https://wa.me/905555555555?text=Merhaba, ${artwork.title} çalışmanız hakkında bilgi almak istiyorum.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 w-full px-8 py-4 bg-[#25D366] text-white 
                  rounded-xl hover:bg-[#22c55e] transition-all duration-300 shadow-lg justify-center
                  hover:shadow-xl hover:shadow-[#25D366]/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="font-medium">WhatsApp ile Sipariş Ver</span>
                <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}