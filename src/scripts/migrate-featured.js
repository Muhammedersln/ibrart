import dbConnect from '../lib/mongodb';
import Artwork from '../models/Artwork';

async function migrateFeaturedField() {
  try {
    await dbConnect();
    
    // Find all artworks without featured field
    const artworks = await Artwork.find({ featured: { $exists: false } });
    console.log(`Found ${artworks.length} artworks without featured field`);

    // Update each artwork
    for (const artwork of artworks) {
      artwork.featured = false; // Set default value
      await artwork.save();
      console.log(`Updated artwork: ${artwork._id}`);
    }

    console.log('Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateFeaturedField(); 