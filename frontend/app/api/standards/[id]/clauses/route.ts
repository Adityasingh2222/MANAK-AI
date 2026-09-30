import { NextRequest, NextResponse } from 'next/server';
import { clausesData } from '@/lib/mockData';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const rawId = decodeURIComponent(params.id);
  const normalizedId = rawId.toLowerCase().replace(/[^a-z0-9]/g, '');

  const clauses = clausesData.filter(c => {
    const cStdId = c.standard_id.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cStdNum = c.standard_number.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cStdId.includes(normalizedId) || normalizedId.includes(cStdId) || cStdNum.includes(normalizedId);
  });

  return NextResponse.json(clauses.length > 0 ? clauses : clausesData);
}
