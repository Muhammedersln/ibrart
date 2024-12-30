import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

export async function GET() {
  try {
    const conn = await connectDB();
    console.log('MongoDB Connection State:', conn.connection.readyState);
    console.log('Connected to MongoDB Database:', conn.connection.name);
    console.log('MongoDB Host:', conn.connection.host);
    
    return NextResponse.json({ 
      success: true, 
      message: 'MongoDB connected successfully',
      database: conn.connection.name,
      host: conn.connection.host,
      state: conn.connection.readyState 
    });
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
} 