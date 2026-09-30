import { NextRequest, NextResponse } from 'next/server';
import { updatesNewsData } from '@/lib/mockData';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category')?.toLowerCase() || '';

  let results = [...updatesNewsData];

  if (category && category !== 'all') {
    results = results.filter(u =>
      u.category.toLowerCase().includes(category) ||
      u.type.toLowerCase().includes(category)
    );
  }

  return NextResponse.json(results);
}
