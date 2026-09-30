import { NextRequest, NextResponse } from 'next/server';
import { auditTrailData } from '@/lib/mockData';

export async function GET(req: NextRequest) {
  return NextResponse.json({
    valid: true,
    total_records: auditTrailData.length,
    head_hash: auditTrailData[auditTrailData.length - 1]?.event_hash || 'f4c901a1e0b573a98a09e02c6b4d372e',
    verified_at: new Date().toISOString(),
    algorithm: 'SHA-256 Merkle Chain',
    events: auditTrailData
  });
}
