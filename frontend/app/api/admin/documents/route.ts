import { NextRequest, NextResponse } from 'next/server';
import { documentsStoreData } from '@/lib/mockData';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status')?.toLowerCase();

  let docs = [...documentsStoreData];
  if (status) {
    docs = docs.filter(d => d.status.toLowerCase() === status);
  }

  return NextResponse.json(docs);
}
