import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Artwork from '@/models/Artwork';
import cloudinary from '@/lib/cloudinary';

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    console.log('Received artwork data:', data);

    const artwork = new Artwork(data);
    const validationError = artwork.validateSync();
    
    if (validationError) {
      console.error('Validation error:', validationError);
      return NextResponse.json(
        { error: validationError.message },
        { status: 400 }
      );
    }

    const savedArtwork = await artwork.save();
    console.log('Saved artwork:', savedArtwork);
    
    return NextResponse.json(savedArtwork, { status: 201 });
  } catch (error) {
    console.error('Error adding artwork:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const artwork = await Artwork.findById(id);
      if (!artwork) {
        return NextResponse.json(
          { error: 'Artwork not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(artwork);
    }

    const artworks = await Artwork.find({}).sort({ createdAt: -1 });
    return NextResponse.json(artworks);
  } catch (error) {
    console.error('Error fetching artworks:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    // Önce eseri bul
    const artwork = await Artwork.findById(id);
    if (!artwork) {
      return NextResponse.json(
        { error: 'Artwork not found' },
        { status: 404 }
      );
    }

    // Cloudinary'den resmi sil
    if (artwork.imageUrl) {
      const urlParts = artwork.imageUrl.split('/');
      const publicIdWithExtension = urlParts.slice(-2).join('/'); // "ibrart/filename.ext"
      const publicId = publicIdWithExtension.split('.')[0]; // Uzantıyı kaldır

      try {
        await cloudinary.uploader.destroy(publicId);
        console.log('Image deleted from Cloudinary:', publicId);
      } catch (cloudinaryError) {
        console.error('Error deleting image from Cloudinary:', cloudinaryError);
      }
    }

    // MongoDB'den eseri sil
    await Artwork.findByIdAndDelete(id);
    
    return NextResponse.json({ message: 'Artwork and image deleted successfully' });
  } catch (error) {
    console.error('Error deleting artwork:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const data = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const artwork = await Artwork.findById(id);
    if (!artwork) {
      return NextResponse.json(
        { error: 'Artwork not found' },
        { status: 404 }
      );
    }

    // If image URL has changed, delete the old image from Cloudinary
    if (artwork.imageUrl && artwork.imageUrl !== data.imageUrl) {
      const urlParts = artwork.imageUrl.split('/');
      const publicIdWithExtension = urlParts.slice(-2).join('/');
      const publicId = publicIdWithExtension.split('.')[0];

      try {
        await cloudinary.uploader.destroy(publicId);
        console.log('Old image deleted from Cloudinary:', publicId);
      } catch (cloudinaryError) {
        console.error('Error deleting old image from Cloudinary:', cloudinaryError);
      }
    }

    // Update the artwork
    const updatedArtwork = await Artwork.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );

    return NextResponse.json(updatedArtwork);
  } catch (error) {
    console.error('Error updating artwork:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
} 