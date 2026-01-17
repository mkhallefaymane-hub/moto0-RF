import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ urls: ["/placeholder.jpg"] });
}
