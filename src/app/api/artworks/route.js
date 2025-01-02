import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Artwork from '@/models/Artwork';
import Settings from '@/models/Settings';
import cloudinary from '@/lib/cloudinary';

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    console.log('Received artwork data:', data);

    // Ensure featured field is set
    const artworkData = {
      ...data,
      featured: data.featured !== undefined ? data.featured : false
    };

    const artwork = new Artwork(artworkData);
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
    const isPortfolio = searchParams.get('portfolio') === 'true';

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

    if (isPortfolio) {
      // Get settings for portfolio limit
      const settings = await Settings.getInstance();
      console.log('Portfolio settings:', settings);
      
      const artworks = await Artwork.find({ featured: true })
        .sort({ createdAt: -1 })
        .limit(settings.portfolioLimit)
        .lean();
      
      console.log('Found portfolio artworks:', artworks);
      return NextResponse.json(artworks);
    }

    // Normal artwork listing for admin panel
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

    console.log('Updating artwork:', { id, data });

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
        console.log('Old image deleted from Cloudinary:', publicId);
      } catch (cloudinaryError) {
        console.error('Error deleting old image from Cloudinary:', cloudinaryError);
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

    console.log('Updated artwork:', updatedArtwork);
    return NextResponse.json(updatedArtwork);
  } catch (error) {
    console.error('Error updating artwork:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
} 