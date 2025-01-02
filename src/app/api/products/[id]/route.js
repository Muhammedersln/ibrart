import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'

// Tekil ürün getir
export async function GET(request, { params }) {
  try {
    await connectDB()
    const product = await Product.findById(params.id)
    
    if (!product) {
      return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 })
    }
    
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: 'Ürün yüklenirken hata oluştu' }, { status: 500 })
  }
}

// Ürün güncelle
export async function PUT(request, { params }) {
  try {
    await connectDB()
    const data = await request.json()
    const product = await Product.findByIdAndUpdate(
      params.id,
      data,
      { new: true, runValidators: true }
    )
    
    if (!product) {
      return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 })
    }
    
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: 'Ürün güncellenirken hata oluştu' }, { status: 500 })
  }
}

// Ürün sil
export async function DELETE(request, { params }) {
  try {
    await connectDB()
    const product = await Product.findByIdAndDelete(params.id)
    
    if (!product) {
      return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 })
    }
    
    return NextResponse.json({ message: 'Ürün başarıyla silindi' })
  } catch (error) {
    return NextResponse.json({ error: 'Ürün silinirken hata oluştu' }, { status: 500 })
  }
} 