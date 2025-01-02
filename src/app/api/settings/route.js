import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Settings from '@/models/Settings';

export async function GET() {
  try {
    await dbConnect();
    const settings = await Settings.getInstance();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const data = await request.json();
    const settings = await Settings.getInstance();
    
    Object.assign(settings, data);
    await settings.save();
    
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
} 