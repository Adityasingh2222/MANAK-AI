import { NextRequest, NextResponse } from 'next/server';
import { standardsData } from '@/lib/mockData';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q')?.toLowerCase() || '';
  const category = searchParams.get('category')?.toLowerCase() || '';

  let results = [...standardsData];

  if (category && category !== 'all') {
    results = results.filter(s => s.category.toLowerCase().includes(category));
  }

  if (q) {
    results = results.filter(s =>
      s.standard_number.toLowerCase().includes(q) ||
      s.title.toLowerCase().includes(q) ||
      s.scope.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q)
    );
  }

  return NextResponse.json(results);
}
