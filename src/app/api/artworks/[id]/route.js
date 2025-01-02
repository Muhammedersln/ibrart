import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Artwork from '@/models/Artwork';
import cloudinary from '@/lib/cloudinary';

export async function GET(request) {
  try {
    await dbConnect();
    const id = request.url.split('/').pop();
    
    const artwork = await Artwork.findById(id);
    
    if (!artwork) {
      return NextResponse.json(
        { error: 'Artwork not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(artwork);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const id = request.url.split('/').pop();
    const data = await request.json();
    
    const artwork = await Artwork.findById(id);
    if (!artwork) {
      return NextResponse.json(
        { error: 'Artwork not found' },
        { status: 404 }
      );
    }

    // If image URL has changed, delete the old image from Cloudinary
    if (artwork.imageUrl && data.imageUrl && artwork.imageUrl !== data.imageUrl) {
      const urlParts = artwork.imageUrl.split('/');
      const publicIdWithExtension = urlParts.slice(-2).join('/');
      const publicId = publicIdWithExtension.split('.')[0];

      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (cloudinaryError) {
        // Silently fail if image deletion fails
      }
    }

    // Ensure featured field is included in the update
    const updateData = {
      ...data,
      featured: data.featured !== undefined ? data.featured : artwork.featured
    };

    // Update the artwork
    const updatedArtwork = await Artwork.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    return NextResponse.json(updatedArtwork);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const id = request.url.split('/').pop();
    
    const artwork = await Artwork.findById(id);
    if (!artwork) {
      return NextResponse.json(
        { error: 'Artwork not found' },
        { status: 404 }
      );
    }

    // Delete image from Cloudinary
    if (artwork.imageUrl) {
      const urlParts = artwork.imageUrl.split('/');
      const publicIdWithExtension = urlParts.slice(-2).join('/');
      const publicId = publicIdWithExtension.split('.')[0];

      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (cloudinaryError) {
        // Silently fail if image deletion fails
      }
    }

    // Delete artwork from MongoDB
    await Artwork.findByIdAndDelete(id);
    
    return NextResponse.json({ message: 'Artwork and image deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
} 