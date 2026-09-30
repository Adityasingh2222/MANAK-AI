import { NextRequest, NextResponse } from 'next/server';
import { standardsData } from '@/lib/mockData';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const rawId = decodeURIComponent(params.id);
  const normalizedId = rawId.toLowerCase().replace(/[^a-z0-9]/g, '');

  const standard = standardsData.find(s => {
    const sId = s.id.toLowerCase().replace(/[^a-z0-9]/g, '');
    const sNum = s.standard_number.toLowerCase().replace(/[^a-z0-9]/g, '');
    return sId.includes(normalizedId) || normalizedId.includes(sId) || sNum.includes(normalizedId);
  }) || standardsData[0];

  return NextResponse.json(standard);
}
