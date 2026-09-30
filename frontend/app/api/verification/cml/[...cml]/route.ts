import { NextRequest, NextResponse } from 'next/server';
import { verificationsData } from '@/lib/mockData';

export async function GET(
  req: NextRequest,
  { params }: { params: { cml: string[] } }
) {
  const cmlParam = Array.isArray(params.cml) ? params.cml.join('/') : params.cml;
  const decoded = decodeURIComponent(cmlParam).trim();
  const normalizedCml = decoded.toUpperCase().startsWith('CM/L-') ? decoded : `CM/L-${decoded}`;

  const matched = verificationsData.isi_licenses.find(
    lic => lic.cml_number.toUpperCase() === normalizedCml.toUpperCase() || lic.cml_number.toUpperCase() === decoded.toUpperCase()
  );

  const timestamp = new Date().toISOString();

  if (matched) {
    return NextResponse.json({
      identifier_type: 'cml',
      identifier_value: decoded,
      is_valid: matched.is_valid,
      status: matched.status,
      source_authority: 'Bureau of Indian Standards (Certification Dept)',
      timestamp,
      details: matched,
      demo_mode: true,
      disclaimer: 'DEMO MODE — This result is simulated and is not an official government verification.'
    });
  }

  return NextResponse.json({
    identifier_type: 'cml',
    identifier_value: decoded,
    is_valid: false,
    status: 'Record Not Found',
    source_authority: 'Bureau of Indian Standards',
    timestamp,
    details: { searched_value: decoded },
    demo_mode: true,
    disclaimer: 'DEMO MODE — This result is simulated and is not an official government verification.'
  });
}
