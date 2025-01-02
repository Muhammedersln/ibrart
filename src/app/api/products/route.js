import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'

// GET all products
export async function GET() {
  try {
    await connectDB()
    const products = await Product.find().sort({ createdAt: -1 })
    return NextResponse.json(products)
  } catch (error) {
    console.error('GET Error:', error)
    return NextResponse.json({ error: 'Ürünler yüklenirken hata oluştu' }, { status: 500 })
  }
}

// POST new product
export async function POST(request) {
  try {
    await connectDB()
    const data = await request.json()
    
    // Sayısal değerleri number tipine çevirelim
    const productData = {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock)
    }

    console.log('Creating product with data:', productData)
    const product = await Product.create(productData)
    return NextResponse.json(product)
  } catch (error) {
    console.error('POST Error:', error)
    return NextResponse.json({ 
      error: 'Ürün eklenirken hata oluştu',
      details: error.message 
    }, { status: 500 })
  }
}

// PUT update product
export async function PUT(request) {
  try {
    await connectDB()
    const data = await request.json()
    const { id, ...updateData } = data
    
    const product = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )
    
    if (!product) {
      return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 })
    }
    
    return NextResponse.json(product)
  } catch (error) {
    console.error('PUT Error:', error)
    return NextResponse.json({ error: 'Ürün güncellenirken hata oluştu' }, { status: 500 })
  }
} 