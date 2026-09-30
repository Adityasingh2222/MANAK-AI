import { NextRequest, NextResponse } from 'next/server';
import { labsData } from '@/lib/mockData';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('query')?.toLowerCase() || '';
  const standard = searchParams.get('standard')?.toLowerCase() || '';
  const accreditation = searchParams.get('accreditation')?.toLowerCase() || '';
  const state = searchParams.get('state')?.toLowerCase() || '';

  let results = [...labsData];

  if (q) {
    results = results.filter(l =>
      l.name.toLowerCase().includes(q) ||
      l.city.toLowerCase().includes(q) ||
      l.capabilities.some(c => c.toLowerCase().includes(q))
    );
  }

  if (standard) {
    results = results.filter(l =>
      l.tested_standards.some(s => s.toLowerCase().includes(standard))
    );
  }

  if (accreditation && accreditation !== 'all') {
    results = results.filter(l =>
      l.accreditation.toLowerCase().includes(accreditation)
    );
  }

  if (state && state !== 'all') {
    results = results.filter(l =>
      l.state.toLowerCase().includes(state)
    );
  }

  return NextResponse.json(results);
}
