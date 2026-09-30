import { NextRequest, NextResponse } from 'next/server';
import { verificationsData } from '@/lib/mockData';

export async function GET(
  req: NextRequest,
  { params }: { params: { huid: string } }
) {
  const huid = decodeURIComponent(params.huid).trim().toUpperCase();
  const matched = verificationsData.huid_records.find(
    h => h.huid.toUpperCase() === huid
  );

  const timestamp = new Date().toISOString();

  if (matched) {
    return NextResponse.json({
      identifier_type: 'huid',
      identifier_value: huid,
      is_valid: matched.is_valid,
      status: matched.status,
      source_authority: 'BIS Hallmarking Registration Centre (AHC)',
      timestamp,
      details: matched,
      demo_mode: true,
      disclaimer: 'DEMO MODE — This result is simulated and is not an official government verification.'
    });
  }

  return NextResponse.json({
    identifier_type: 'huid',
    identifier_value: huid,
    is_valid: false,
    status: 'HUID Not Found in Registry',
    source_authority: 'Bureau of Indian Standards Hallmarking Division',
    timestamp,
    details: { searched_value: huid },
    demo_mode: true,
    disclaimer: 'DEMO MODE — This result is simulated and is not an official government verification.'
  });
}
