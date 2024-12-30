import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Artwork from '@/models/Artwork';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    
    const artwork = await Artwork.findById(params.id);
    
    if (!artwork) {
      return NextResponse.json(
        { error: 'Artwork not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(artwork);
  } catch (error) {
    console.error('Error fetching artwork:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
} 