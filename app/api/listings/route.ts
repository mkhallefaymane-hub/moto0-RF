import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data/listings.json');

function getListings() {
  if (!fs.existsSync(DATA_FILE)) {
    return { listings: [] };
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function saveListings(data: any) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

export async function GET() {
  return NextResponse.json(getListings());
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = getListings();
    
    const newListing = {
      id: crypto.randomUUID(),
      ...body,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    
    data.listings.push(newListing);
    saveListings(data);
    
    return NextResponse.json(newListing);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create listing' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;
    const data = getListings();
    
    const index = data.listings.findIndex((l: any) => l.id === id);
    if (index > -1) {
      data.listings[index].status = status;
      saveListings(data);
      return NextResponse.json(data.listings[index]);
    }
    
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
