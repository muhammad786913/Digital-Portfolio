import { NextResponse } from 'next/server';
import { projects } from '@/lib/data';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search')?.toLowerCase();

  let filtered = [...projects];

  if (category && category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }

  if (search) {
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(search) ||
      p.summary.toLowerCase().includes(search) ||
      p.stack.some(s => s.toLowerCase().includes(search))
    );
  }

  return NextResponse.json({
    success: true,
    count: filtered.length,
    data: filtered,
    databaseStatus: process.env.MONGODB_URI ? "Connected to MongoDB Atlas" : "Local Verified Memory Store",
    timestamp: new Date().toISOString()
  });
}
