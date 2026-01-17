import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data/admin-store.json');

function getData() {
  if (!fs.existsSync(DATA_FILE)) {
    return { listings: [], trends: [] };
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function saveData(data: any) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

export async function GET() {
  return NextResponse.json(getData());
}

export async function POST(req: Request) {
  const body = await req.json();
  const data = getData();
  
  if (body.type === 'listing_status') {
    const { id, status, details } = body;
    const index = data.listings.findIndex((l: any) => l.id === id);
    if (index > -1) {
      data.listings[index].status = status;
      if (details) data.listings[index].details = details;
    } else {
      data.listings.push({ id, status, details, createdAt: new Date().toISOString() });
    }
  } else if (body.type === 'add_trend') {
    const newTrend = {
      id: Date.now().toString(),
      ...body.trend,
      active: true
    };
    data.trends.push(newTrend);
  } else if (body.type === 'delete_trend') {
    data.trends = data.trends.filter((t: any) => t.id !== body.id);
  } else if (body.type === 'toggle_trend') {
    const trend = data.trends.find((t: any) => t.id === body.id);
    if (trend) trend.active = !trend.active;
  }

  saveData(data);
  return NextResponse.json({ success: true, data });
}
